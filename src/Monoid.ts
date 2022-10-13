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
}

/**
 * Get a monoid where `combine` will return the minimum, based on the provided bounded order.
 *
 * The `empty` value is the `top` value.
 *
 * @category constructors
 * @since 3.0.0
 */
export const min = <A>(Bounded: Bounded<A>): Monoid<A> => ({
  ...semigroup.fromBinary(semigroup.min(Bounded).combine),
  empty: Bounded.top
})

/**
 * Get a monoid where `combine` will return the maximum, based on the provided bounded order.
 *
 * The `empty` value is the `bottom` value.
 *
 * @category constructors
 * @since 3.0.0
 */
export const max = <A>(Bounded: Bounded<A>): Monoid<A> => ({
  ...semigroup.fromBinary(semigroup.max(Bounded).combine),
  empty: Bounded.bottom
})

/**
 * The dual of a `Monoid`, obtained by swapping the arguments of `combine`.
 *
 * @since 3.0.0
 */
export const reverse = <A>(Monoid: Monoid<A>): Monoid<A> => ({
  ...semigroup.fromBinary((a1, a2) => Monoid.combine(a2, a1)),
  empty: Monoid.empty
})

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
  return {
    ...semigroup.fromBinary(semigroup.struct(monoids).combine),
    empty
  }
}

/**
 * Given a tuple of monoids returns a monoid for the tuple.
 *
 * @since 3.0.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(
  ...monoids: { [K in keyof A]: Monoid<A[K]> }
): Monoid<Readonly<A>> => ({
  ...semigroup.fromBinary(semigroup.tuple(...monoids).combine),
  empty: monoids.map((m) => m.empty)
} as any)

/**
 * @since 3.0.0
 */
export const combineAll = <A>(Monoid: Monoid<A>) =>
  (collection: Iterable<A>): A => Monoid.combineAll(Monoid.empty, collection)
