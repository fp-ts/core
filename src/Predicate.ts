/**
 * @since 1.0.0
 */
import { constFalse, constTrue, pipe } from "@fp-ts/core/Function"
import type { TypeLambda } from "@fp-ts/core/HKT"
import * as readonlyArray from "@fp-ts/core/internal/ReadonlyArray"
import * as contravariant from "@fp-ts/core/typeclass/Contravariant"
import * as invariant from "@fp-ts/core/typeclass/Invariant"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import * as of_ from "@fp-ts/core/typeclass/Of"
import * as product_ from "@fp-ts/core/typeclass/Product"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"
import type { Semigroup } from "@fp-ts/core/typeclass/Semigroup"
import * as semiProduct from "@fp-ts/core/typeclass/SemiProduct"

/**
 * @category models
 * @since 1.0.0
 */
export interface Predicate<A> {
  (a: A): boolean
}

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface PredicateTypeLambda extends TypeLambda {
  readonly type: Predicate<this["Target"]>
}

/**
 * @since 1.0.0
 */
export interface Refinement<A, B extends A> {
  (a: A): a is B
}

/**
 * @category guards
 * @since 1.0.0
 */
export const isString: Refinement<unknown, string> = (u: unknown): u is string =>
  typeof u === "string"

/**
 * @category guards
 * @since 1.0.0
 */
export const isNumber: Refinement<unknown, number> = (u: unknown): u is number =>
  typeof u === "number"

/**
 * @category guards
 * @since 1.0.0
 */
export const isBoolean: Refinement<unknown, boolean> = (u: unknown): u is boolean =>
  typeof u === "boolean"

/**
 * @category guards
 * @since 1.0.0
 */
export const isBigInt = (u: unknown): u is bigint => typeof u === "bigint"

/**
 * @category guards
 * @since 1.0.0
 */
export const isSymbol = (u: unknown): u is symbol => typeof u === "symbol"

/**
 * @category constructors
 * @since 1.0.0
 */
export const id = <A>(): Refinement<A, A> => (_): _ is A => true

/**
 * @since 1.0.0
 */
export const compose = <A, B extends A, C extends B>(bc: Refinement<B, C>) =>
  (ab: Refinement<A, B>): Refinement<A, C> => (i): i is C => ab(i) && bc(i)

/**
 * @since 1.0.0
 */
export const contramap = <B, A>(f: (b: B) => A) =>
  (self: Predicate<A>): Predicate<B> => (b) => self(f(b))

const imap = contravariant.imap<PredicateTypeLambda>(contramap)

/**
 * @category instances
 * @since 1.0.0
 */
export const Contravariant: contravariant.Contravariant<PredicateTypeLambda> = {
  imap,
  contramap
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant: invariant.Invariant<PredicateTypeLambda> = {
  imap
}

/**
 * @since 1.0.0
 */
// @ts-expect-error
export const tupled: <A>(self: Predicate<A>) => Predicate<readonly [A]> = invariant.tupled(
  Invariant
)

/**
 * @category do notation
 * @since 1.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <A>(self: Predicate<A>) => Predicate<{ readonly [K in N]: A }> = invariant.bindTo(
  Invariant
)

/**
 * @since 1.0.0
 */
export const of = <A>(_: A): Predicate<A> => id()

/**
 * @category instances
 * @since 1.0.0
 */
export const Of: of_.Of<PredicateTypeLambda> = {
  of
}

/**
 * @since 1.0.0
 */
export const Do: Predicate<{}> = of_.Do(Of)

/**
 * @since 1.0.0
 */
export const unit: Predicate<void> = of_.unit(Of)

const product = <A, B>(
  self: Predicate<A>,
  that: Predicate<B>
): Predicate<[A, B]> => ([a, b]) => self(a) && that(b)

const productMany = <A>(
  self: Predicate<A>,
  collection: Iterable<Predicate<A>>
): Predicate<readonly [A, ...Array<A>]> => {
  return ([head, ...tail]) => {
    if (self(head) === false) {
      return false
    }
    const predicates = readonlyArray.fromIterable(collection)
    for (let i = 0; i < predicates.length; i++) {
      if (predicates[i](tail[i]) === false) {
        return false
      }
    }
    return true
  }
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiProduct: semiProduct.SemiProduct<PredicateTypeLambda> = {
  imap,
  product,
  productMany
}

const productAll = <A>(
  collection: Iterable<Predicate<A>>
): Predicate<ReadonlyArray<A>> =>
  (as) => {
    const predicates = readonlyArray.fromIterable(collection)
    for (let i = 0; i < predicates.length; i++) {
      if (predicates[i](as[i]) === false) {
        return false
      }
    }
    return true
  }

/**
 * @category instances
 * @since 1.0.0
 */
export const Product: product_.Product<PredicateTypeLambda> = {
  of,
  imap,
  product,
  productMany,
  productAll
}

/**
 * @since 1.0.0
 */
export const andThenBind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  that: Predicate<B>
) => (
  self: Predicate<A>
) => Predicate<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = semiProduct
  .andThenBind(
    SemiProduct
  )

/**
 * Appends an element to the end of a tuple.
 *
 * @since 1.0.0
 */
export const appendElement: {
  <A extends ReadonlyArray<any>, B>(
    self: Predicate<A>,
    that: Predicate<B>
  ): Predicate<readonly [...A, B]>
  <B>(
    that: Predicate<B>
  ): <A extends ReadonlyArray<any>>(self: Predicate<A>) => Predicate<readonly [...A, B]>
} = semiProduct.appendElement(SemiProduct) as any

/**
 * @since 1.0.0
 */
export const tuple: <T extends ReadonlyArray<Predicate<any>>>(
  ...predicates: T
) => Predicate<Readonly<{ [I in keyof T]: [T[I]] extends [Predicate<infer A>] ? A : never }>> =
  product_.tuple(Product)

/**
 * @since 1.0.0
 */
export const struct: <R extends Record<string, Predicate<any>>>(
  predicates: R
) => Predicate<{ readonly [K in keyof R]: [R[K]] extends [Predicate<infer A>] ? A : never }> =
  product_.struct(Product)

/**
 * @since 1.0.0
 */
export const not = <A>(self: Predicate<A>): Predicate<A> => (a) => !self(a)

/**
 * @since 1.0.0
 */
export const or = <A>(that: Predicate<A>) =>
  (self: Predicate<A>): Predicate<A> => (a) => self(a) || that(a)

/**
 * @since 1.0.0
 */
export const and = <A>(that: Predicate<A>) =>
  (self: Predicate<A>): Predicate<A> => (a) => self(a) && that(a)

/**
 * @category instances
 * @since 1.0.0
 */
export const getSemigroupAny = <A>(): Semigroup<Predicate<A>> =>
  semigroup.make(
    (self, that) => pipe(self, or(that)),
    (self, collection) =>
      a => {
        if (self(a)) {
          return true
        }
        for (const p of collection) {
          if (p(a)) {
            return true
          }
        }
        return false
      }
  )

/**
 * @category instances
 * @since 1.0.0
 */
export const getMonoidAny = <A>(): monoid.Monoid<Predicate<A>> =>
  monoid.fromSemigroup(getSemigroupAny<A>(), constFalse)

/**
 * @category instances
 * @since 1.0.0
 */
export const getSemigroupAll = <A>(): Semigroup<Predicate<A>> =>
  semigroup.make(
    (self, that) => pipe(self, and(that)),
    (self, collection) =>
      a => {
        if (!self(a)) {
          return false
        }
        for (const p of collection) {
          if (!p(a)) {
            return false
          }
        }
        return true
      }
  )

/**
 * @category instances
 * @since 1.0.0
 */
export const getMonoidAll = <A>(): monoid.Monoid<Predicate<A>> =>
  monoid.fromSemigroup(getSemigroupAll<A>(), constTrue)

/**
 * @since 1.0.0
 */
export const all = <A>(collection: Iterable<Predicate<A>>): Predicate<A> =>
  getMonoidAll<A>().combineAll(collection)

/**
 * @since 1.0.0
 */
export const any = <A>(collection: Iterable<Predicate<A>>): Predicate<A> =>
  getMonoidAny<A>().combineAll(collection)
