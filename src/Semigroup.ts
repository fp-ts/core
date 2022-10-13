/**
 * @since 3.0.0
 */
import type { Compare } from "@fp-ts/core/Compare"
import * as compare from "@fp-ts/core/Compare"

/**
 * @category type class
 * @since 3.0.0
 */
export interface Semigroup<A> {
  readonly combine: (a1: A, a2: A) => A
  readonly combineAll: (startWith: A, collection: Iterable<A>) => A
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromCombine = <A>(combine: (a1: A, a2: A) => A): Semigroup<A> => ({
  combine,
  combineAll: (startWith, collection) =>
    Array.from(collection).reduce(
      (accumulator, element) => combine(accumulator, element),
      startWith
    )
})

/**
 * Get a semigroup where `combine` will return the minimum, based on the provided order.
 *
 * @category constructors
 * @since 3.0.0
 */
export const min = <A>(Compare: Compare<A>): Semigroup<A> => {
  const min = compare.min(Compare)
  return fromCombine((a1, a2) => min(a2)(a1))
}

/**
 * Get a semigroup where `combine` will return the maximum, based on the provided order.
 *
 * @category constructors
 * @since 3.0.0
 */
export const max = <A>(Compare: Compare<A>): Semigroup<A> => {
  const max = compare.max(Compare)
  return fromCombine((a1, a2) => max(a2)(a1))
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const constant = <A>(a: A): Semigroup<A> => fromCombine(() => a)

/**
 * The dual of a `Semigroup`, obtained by flipping the arguments of `combine`.
 *
 * @since 3.0.0
 */
export const reverse = <A>(Semigroup: Semigroup<A>): Semigroup<A> =>
  fromCombine((a1, a2) => Semigroup.combine(a2, a1))

/**
 * Given a struct of semigroups returns a semigroup for the struct.
 *
 * @since 3.0.0
 */
export const struct = <A>(semigroups: { [K in keyof A]: Semigroup<A[K]> }): Semigroup<
  {
    readonly [K in keyof A]: A[K]
  }
> =>
  fromCombine((a1, a2) => {
    const r: A = {} as any
    for (const k in semigroups) {
      if (Object.prototype.hasOwnProperty.call(semigroups, k)) {
        r[k] = semigroups[k].combine(a1[k], a2[k])
      }
    }
    return r
  })

/**
 * Given a tuple of semigroups returns a semigroup for the tuple.
 *
 * @since 3.0.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(
  ...semigroups: { [K in keyof A]: Semigroup<A[K]> }
): Semigroup<Readonly<A>> =>
  fromCombine((a1: any, a2: any) =>
    semigroups.map((Semigroup, i) => Semigroup.combine(a1[i], a2[i]))
  ) as any

/**
 * You can glue items between and stay associative.
 *
 * @since 3.0.0
 */
export const intercalate = <A>(separator: A) =>
  (Semigroup: Semigroup<A>): Semigroup<A> =>
    fromCombine(
      (a1, a2) => Semigroup.combineAll(a1, [separator, a2])
    )

/**
 * Always return the first argument.
 *
 * @category instances
 * @since 3.0.0
 */
export const first = <A>(): Semigroup<A> => ({
  combine: (a1, _) => a1,
  combineAll: (startWith) => startWith
})

/**
 * Always return the last argument.
 *
 * @category instances
 * @since 3.0.0
 */
export const last = <A>(): Semigroup<A> => ({
  combine: (_, a2) => a2,
  combineAll: (_, collection) => {
    const as = Array.from(collection)
    return as[as.length - 1]
  }
})
