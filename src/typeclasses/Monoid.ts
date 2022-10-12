/**
 * `Monoid` extends the power of `Semigroup` by providing an additional `empty` value.
 *
 * ```ts
 * interface Monoid<A> extends Semigroup<A> {
 *   readonly empty: A
 * }
 * ```
 *
 * This `empty` value should be an identity for the `combine` operation, which means the following equalities hold for any choice of `a`.
 *
 * ```ts
 * a |> combine(empty) = empty |> combine(a) <-> a
 * ```
 *
 * @since 3.0.0
 */
import * as internal from "@fp-ts/core/internal"
import type { Bounded } from "@fp-ts/core/typeclasses/Bounded"
import type { Semigroup } from "@fp-ts/core/typeclasses/Semigroup"
import * as semigroup from "@fp-ts/core/typeclasses/Semigroup"

/**
 * @category model
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
  combine: semigroup.min(Bounded).combine,
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
  combine: semigroup.max(Bounded).combine,
  empty: Bounded.bottom
})

/**
 * The dual of a `Monoid`, obtained by swapping the arguments of `combine`.
 *
 * @since 3.0.0
 */
export const reverse = <A>(Monoid: Monoid<A>): Monoid<A> => ({
  combine: semigroup.reverse(Monoid).combine,
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
    if (internal.has.call(monoids, k)) {
      empty[k] = monoids[k].empty
    }
  }
  return {
    combine: semigroup.struct(monoids).combine,
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
  combine: semigroup.tuple(...monoids).combine,
  empty: monoids.map((m) => m.empty)
} as any)

/**
 * Given a sequence of `as`, combine them and return the total.
 *
 * If `as` is empty, return the monoid `empty` value.
 *
 * @since 3.0.0
 */
export const combineAll = <A>(Monoid: Monoid<A>): ((collection: Iterable<A>) => A) =>
  semigroup.combineAll(Monoid)(Monoid.empty)
