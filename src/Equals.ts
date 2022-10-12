/**
 * @since 3.0.0
 */
import type { Compare } from "@fp-ts/core/Compare"
import type * as contravariant from "@fp-ts/core/Contravariant"
import { flow } from "@fp-ts/core/Function"
import type { TypeLambda } from "@fp-ts/core/HKT"
import type { Monoid } from "@fp-ts/core/Monoid"
import type { Semigroup } from "@fp-ts/core/Semigroup"

/**
 * @category model
 * @since 3.0.0
 */
export interface Equals<A> {
  readonly equals: (that: A) => (self: A) => boolean
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromEquals = <A>(equals: Equals<A>["equals"]): Equals<A> => ({
  equals: (that) => {
    const predicate = equals(that)
    return (self) => self === that || predicate(self)
  }
})

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromOrd = <A>(Ord: Compare<A>): Equals<A> =>
  fromEquals((that) => (self) => Ord.compare(that)(self) === 0)

/**
 * @since 3.0.0
 */
export const struct = <A>(
  eqs: { [K in keyof A]: Equals<A[K]> }
): Equals<{ readonly [K in keyof A]: A[K] }> =>
  fromEquals((that) =>
    (self) => {
      for (const key in eqs) {
        if (!eqs[key].equals(that[key])(self[key])) {
          return false
        }
      }
      return true
    }
  )

/**
 * Given a tuple of `Eq`s returns a `Eq` for the tuple
 *
 * @since 3.0.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(
  ...eqs: { [K in keyof A]: Equals<A[K]> }
): Equals<Readonly<Readonly<A>>> =>
  fromEquals((that) => (self) => eqs.every((E, i) => E.equals(that[i])(self[i])))

/**
 * @category Contravariant
 * @since 3.0.0
 */
export const contramap: <B, A>(f: (b: B) => A) => (self: Equals<A>) => Equals<B> = (f) =>
  (self) => fromEquals((that) => flow(f, self.equals(f(that))))

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface EqTypeLambda extends TypeLambda {
  readonly type: Equals<this["In1"]>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const EqStrict: Equals<unknown> = {
  equals: (that) => (self) => self === that
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getSemigroup = <A>(): Semigroup<Equals<A>> => ({
  combine: (that) => (self) => fromEquals((b) => (a) => self.equals(b)(a) && that.equals(b)(a))
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonoid = <A>(): Monoid<Equals<A>> => ({
  combine: getSemigroup<A>().combine,
  empty: {
    equals: () => () => true
  }
})

/**
 * @category instances
 * @since 3.0.0
 */
export const Contravariant: contravariant.Contravariant<EqTypeLambda> = {
  contramap
}
