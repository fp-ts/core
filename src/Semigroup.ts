/**
 * @since 3.0.0
 */
import type { Compare } from "@fp-ts/core/Compare"
import * as compare from "@fp-ts/core/Compare"

/**
 * @category model
 * @since 3.0.0
 */
export interface Semigroup<A> {
  readonly combineAll: (head: A, ...tail: ReadonlyArray<A>) => A
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromCombine = <A>(combine: (x: A, y: A) => A): Semigroup<A> => ({
  combineAll: (head, ...tail) => tail.reduce((acc, a) => combine(acc, a), head)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const sum: Semigroup<number> = fromCombine((x, y) => x + y)

/**
 * @category instances
 * @since 3.0.0
 */
export const string: Semigroup<string> = fromCombine((x, y) => x + y)

/**
 * Get a semigroup where `combine` will return the minimum, based on the provided order.
 *
 * @category constructors
 * @since 3.0.0
 */
export const min = <A>(Compare: Compare<A>): Semigroup<A> => {
  const min = compare.min(Compare)
  return fromCombine((x, y) => min(y)(x))
}

/**
 * Get a semigroup where `combine` will return the maximum, based on the provided order.
 *
 * @category constructors
 * @since 3.0.0
 */
export const max = <A>(Compare: Compare<A>): Semigroup<A> => {
  const max = compare.max(Compare)
  return fromCombine((x, y) => max(y)(x))
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const constant = <A>(a: A): Semigroup<A> => ({
  combineAll: () => a
})

/**
 * The dual of a `Semigroup`, obtained by flipping the arguments of `combine`.
 *
 * @since 3.0.0
 */
export const reverse = <A>(Semigroup: Semigroup<A>): Semigroup<A> =>
  fromCombine((x, y) => Semigroup.combineAll(y, x))

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
  fromCombine((x, y) => {
    const r: A = {} as any
    for (const k in semigroups) {
      if (Object.prototype.hasOwnProperty.call(semigroups, k)) {
        r[k] = semigroups[k].combineAll(x[k], y[k])
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
  fromCombine((x: any, y: any) =>
    semigroups.map((Semigroup, i) => Semigroup.combineAll(x[i], y[i]))
  ) as any

/**
 * You can glue items between and stay associative.
 *
 * @since 3.0.0
 */
export const intercalate = <A>(separator: A) =>
  (Semigroup: Semigroup<A>): Semigroup<A> =>
    fromCombine(
      (x, y) => Semigroup.combineAll(x, separator, y)
    )

/**
 * Always return the first argument.
 *
 * @category instances
 * @since 3.0.0
 */
export const first = <A>(): Semigroup<A> => ({
  combineAll: (head) => head
})

/**
 * Always return the last argument.
 *
 * @category instances
 * @since 3.0.0
 */
export const last = <A>(): Semigroup<A> => ({
  combineAll: (_, ...rest) => rest[rest.length - 1]
})
