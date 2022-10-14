/**
 * @since 3.0.0
 */
import type { Bounded } from "@fp-ts/core/Bounded"
import type { Semigroup } from "@fp-ts/core/Semigroup"
import * as semigroup from "@fp-ts/core/Semigroup"

/**
 * @category type class
 * @since 3.0.0
 */
export interface Monoid<A> extends Semigroup<A> {
  readonly empty: A
  readonly combineAll: (all: Iterable<A>) => A
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromSemigroup = <A>(Semigroup: Semigroup<A>, empty: A): Monoid<A> => ({
  ...Semigroup,
  empty,
  combineAll: (all) => Semigroup.combine(empty, all)
})

/**
 * Get a monoid where `combine` will return the minimum, based on the provided bounded order.
 *
 * The `empty` value is the `top` value.
 *
 * @category constructors
 * @since 3.0.0
 */
export const min = <A>(Bounded: Bounded<A>): Monoid<A> =>
  fromSemigroup(semigroup.min(Bounded), Bounded.top)

/**
 * Get a monoid where `combine` will return the maximum, based on the provided bounded order.
 *
 * The `empty` value is the `bottom` value.
 *
 * @category constructors
 * @since 3.0.0
 */
export const max = <A>(Bounded: Bounded<A>): Monoid<A> =>
  fromSemigroup(semigroup.max(Bounded), Bounded.bottom)

/**
 * The dual of a `Monoid`, obtained by swapping the arguments of `combine`.
 *
 * @since 3.0.0
 */
export const reverse = <A>(Monoid: Monoid<A>): Monoid<A> =>
  fromSemigroup(semigroup.reverse(Monoid), Monoid.empty)

/**
 * Given a struct of monoids returns a monoid for the struct.
 *
 * @since 3.0.0
 */
export const struct = <A>(
  monoids: { [K in keyof A]: Monoid<A[K]> }
): Monoid<{ readonly [K in keyof A]: A[K] }> => {
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
 * @since 3.0.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(
  ...monoids: { [K in keyof A]: Monoid<A[K]> }
): Monoid<Readonly<A>> => {
  const empty: A = monoids.map((m) => m.empty) as any
  return fromSemigroup(semigroup.tuple(...monoids), empty)
}
