/**
 * @since 3.0.0
 */
import { constFalse, constTrue, flow } from "@fp-ts/core/data/Function"
import type { TypeLambda } from "@fp-ts/core/HKT"
import type * as contravariant from "@fp-ts/core/typeclasses/Contravariant"
import * as monoid from "@fp-ts/core/typeclasses/Monoid"
import type * as semigroup from "@fp-ts/core/typeclasses/Semigroup"

/**
 * @category model
 * @since 3.0.0
 */
export interface Predicate<A> {
  (a: A): boolean
}

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface PredicateTypeLambda extends TypeLambda {
  readonly type: Predicate<this["In1"]>
}

/**
 * @since 3.0.0
 */
export const not = <A>(predicate: Predicate<A>): Predicate<A> => (a) => !predicate(a)

/**
 * @since 3.0.0
 */
export const or = <A>(that: Predicate<A>) =>
  (self: Predicate<A>): Predicate<A> => (a) => self(a) || that(a)

/**
 * @since 3.0.0
 */
export const and = <A>(that: Predicate<A>) =>
  (self: Predicate<A>): Predicate<A> => (a) => self(a) && that(a)

/**
 * @category instances
 * @since 3.0.0
 */
export const getSemigroupAny = <A>(): semigroup.Semigroup<Predicate<A>> => ({
  combine: or
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonoidAny = <A>(): monoid.Monoid<Predicate<A>> => ({
  combine: getSemigroupAny<A>().combine,
  empty: constFalse
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getSemigroupAll = <A>(): semigroup.Semigroup<Predicate<A>> => ({
  combine: and
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonoidAll = <A>(): monoid.Monoid<Predicate<A>> => ({
  combine: getSemigroupAll<A>().combine,
  empty: constTrue
})

/**
 * @since 3.0.0
 */
export const contramap = <B, A>(f: (b: B) => A) =>
  (self: Predicate<A>): Predicate<B> => flow(f, self)

/**
 * @category instances
 * @since 3.0.0
 */
export const Contravariant: contravariant.Contravariant<PredicateTypeLambda> = {
  contramap
}

/**
 * @since 3.0.0
 */
export const all: <A>(collection: Iterable<Predicate<A>>) => Predicate<A> = monoid.combineAll(
  getMonoidAll()
)

/**
 * @since 3.0.0
 */
export const any: <A>(collection: Iterable<Predicate<A>>) => Predicate<A> = monoid.combineAll(
  getMonoidAny()
)
