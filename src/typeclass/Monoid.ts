/**
 * @since 1.0.0
 */
import type { Bounded } from "@fp-ts/core/typeclass/Bounded"
import type { Semigroup } from "@fp-ts/core/typeclass/Semigroup"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Monoid<A> extends Semigroup<A> {
  empty: A
  combineAll: (collection: Iterable<A>) => A
}

/**
 * Optimised.
 *
 * @category constructors
 * @since 1.0.0
 */
export const fromSemigroup = <A>(S: Semigroup<A>, empty: Monoid<A>["empty"]): Monoid<A> => ({
  ...S,
  empty,
  combineAll: collection => S.combineMany(collection)(empty)
})

/**
 * Get a monoid where `combine` will return the minimum, based on the provided bounded order.
 *
 * The `empty` value is the `maxBound` value.
 *
 * @category constructors
 * @since 1.0.0
 */
export const min = <A>(B: Bounded<A>): Monoid<A> => fromSemigroup(semigroup.min(B), B.maxBound)

/**
 * Get a monoid where `combine` will return the maximum, based on the provided bounded order.
 *
 * The `empty` value is the `minimum` value.
 *
 * @category constructors
 * @since 1.0.0
 */
export const max = <A>(B: Bounded<A>): Monoid<A> => fromSemigroup(semigroup.max(B), B.minBound)

/**
 * The dual of a `Monoid`, obtained by swapping the arguments of `combine`.
 *
 * @since 1.0.0
 */
export const reverse = <A>(M: Monoid<A>): Monoid<A> => fromSemigroup(semigroup.reverse(M), M.empty)

/**
 * Given a struct of monoids returns a monoid for the struct.
 *
 * @since 1.0.0
 */
export const struct = <A>(
  monoids: { [K in keyof A]: Monoid<A[K]> }
): Monoid<{ [K in keyof A]: A[K] }> => {
  const empty: A = {} as any
  for (const k in monoids) {
    if (Object.prototype.hasOwnProperty.call(monoids, k)) {
      empty[k] = monoids[k].empty
    }
  }
  return fromSemigroup(semigroup.struct(monoids), empty)
}

/**
 * Given a tuple of monoids returns a monoid for the tuple.
 *
 * @since 1.0.0
 */
export const tuple = <A extends Array<any>>(
  ...monoids: { [K in keyof A]: Monoid<A[K]> }
): Monoid<A> => {
  const empty: A = monoids.map((m) => m.empty) as any
  return fromSemigroup(semigroup.tuple<A>(...monoids), empty)
}
