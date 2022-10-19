/**
 * @since 1.0.0
 */
import type { Associative } from "@fp-ts/core/typeclass/Associative"
import * as associative from "@fp-ts/core/typeclass/Associative"
import type { BoundedTotalOrder } from "@fp-ts/core/typeclass/BoundedTotalOrder"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Monoid<A> extends Associative<A> {
  readonly empty: A
  readonly combineAll: (collection: Iterable<A>) => A
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const fromAssociative = <A>(Associative: Associative<A>, empty: A): Monoid<A> => ({
  ...Associative,
  empty,
  combineAll: (collection) => Associative.combineMany(collection)(empty)
})

/**
 * Get a monoid where `combine` will return the minimum, based on the provided bounded order.
 *
 * The `empty` value is the `maximum` value.
 *
 * @category constructors
 * @since 1.0.0
 */
export const min = <A>(BoundedTotalOrder: BoundedTotalOrder<A>): Monoid<A> =>
  fromAssociative(associative.min(BoundedTotalOrder), BoundedTotalOrder.maximum)

/**
 * Get a monoid where `combine` will return the maximum, based on the provided bounded order.
 *
 * The `empty` value is the `minimum` value.
 *
 * @category constructors
 * @since 1.0.0
 */
export const max = <A>(BoundedTotalOrder: BoundedTotalOrder<A>): Monoid<A> =>
  fromAssociative(associative.max(BoundedTotalOrder), BoundedTotalOrder.minimum)

/**
 * The dual of a `Monoid`, obtained by swapping the arguments of `combine`.
 *
 * @since 1.0.0
 */
export const reverse = <A>(Monoid: Monoid<A>): Monoid<A> =>
  fromAssociative(associative.reverse(Monoid), Monoid.empty)

/**
 * Given a struct of monoids returns a monoid for the struct.
 *
 * @since 1.0.0
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
  return fromAssociative(associative.struct(monoids), empty)
}

/**
 * Given a tuple of monoids returns a monoid for the tuple.
 *
 * @since 1.0.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(
  ...monoids: { [K in keyof A]: Monoid<A[K]> }
): Monoid<Readonly<A>> => {
  const empty: A = monoids.map((m) => m.empty) as any
  return fromAssociative(associative.tuple(...monoids), empty)
}
