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
  readonly empty: A
  readonly combineAll: (collection: Iterable<A>) => A
}

/**
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
 * @category combinators
 * @since 1.0.0
 */
export const reverse = <A>(M: Monoid<A>): Monoid<A> => fromSemigroup(semigroup.reverse(M), M.empty)

/**
 * @category instances
 * @since 1.0.0
 */
export const string: Monoid<string> = {
  ...semigroup.string,
  combineAll: (collection) => semigroup.string.combineMany(collection)(""),
  empty: ""
}

/**
 * Given a tuple of `Monoid`s returns a `Monoid` for the tuple.
 *
 * @category combinators
 * @since 1.0.0
 */
export const tuple = <A extends ReadonlyArray<any>>(
  ...monoids: { [K in keyof A]: Monoid<A[K]> }
): Monoid<A> => {
  const empty: A = monoids.map((m) => m.empty) as any
  return fromSemigroup(semigroup.tuple<A>(...monoids), empty)
}

/**
 * Given a type `A`, this function creates and returns a `Monoid` for `Array<A>`.
 * The returned `Monoid`'s empty value is the empty array.
 *
 * @category combinators
 * @since 1.0.0
 */
export const array = <A>(): Monoid<Array<A>> => {
  const S = semigroup.array<A>()
  return ({
    combine: S.combine,
    combineMany: S.combineMany,
    combineAll: (collection) => S.combineMany(collection)([]),
    empty: []
  })
}

/**
 * Given a type `A`, this function creates and returns a `Semigroup` for `ReadonlyArray<A>`.
 * The returned `Monoid`'s empty value is the empty array.
 *
 * @category combinators
 * @since 1.0.0
 */
export const readonlyArray: <A>() => Monoid<ReadonlyArray<A>> = array as any

/**
 * Given a struct of `Monoid`s returns a `Monoid` for the struct.
 *
 * @category combinators
 * @since 1.0.0
 */
export const struct = <A>(
  monoids: { readonly [K in keyof A]: Monoid<A[K]> }
): Monoid<{ readonly [K in keyof A]: A[K] }> => {
  const empty: A = {} as any
  for (const k in monoids) {
    if (Object.prototype.hasOwnProperty.call(monoids, k)) {
      empty[k] = monoids[k].empty
    }
  }
  return fromSemigroup(semigroup.struct(monoids), empty)
}
