/**
 * @since 3.0.0
 */
import { identity } from "@fp-ts/core/internal/Function"
import type { Sortable } from "@fp-ts/core/Sortable"

/**
 * @category type class
 * @since 3.0.0
 */
export interface Semigroup<A> {
  readonly combine: (first: A, second: A) => A
  readonly combineMany: (start: A, others: Iterable<A>) => A
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromCombine = <A>(combine: Semigroup<A>["combine"]): Semigroup<A> => ({
  combine,
  combineMany: (start, others) => {
    let out: A = start
    for (const a of others) {
      out = combine(out, a)
    }
    return out
  }
})

/**
 * Get a semigroup where `combine` will return the minimum, based on the provided order.
 *
 * @category constructors
 * @since 3.0.0
 */
export const min = <A>(Sortable: Sortable<A>): Semigroup<A> =>
  fromCombine((first, second) => Sortable.compare(first, second) === -1 ? first : second)

/**
 * Get a semigroup where `combine` will return the maximum, based on the provided order.
 *
 * @category constructors
 * @since 3.0.0
 */
export const max = <A>(Sortable: Sortable<A>): Semigroup<A> =>
  fromCombine((first, second) => Sortable.compare(first, second) === 1 ? first : second)

/**
 * @category constructors
 * @since 3.0.0
 */
export const constant = <A>(a: A): Semigroup<A> => ({
  combine: () => a,
  combineMany: () => a
})

/**
 * The dual of a `Semigroup`, obtained by flipping the arguments of `combine`.
 *
 * @since 3.0.0
 */
export const reverse = <A>(Semigroup: Semigroup<A>): Semigroup<A> => ({
  combine: (first, second) => Semigroup.combine(second, first),
  combineMany: (start, others) => {
    const reversed = Array.from(others).reverse()
    return reversed.length === 0 ?
      start :
      Semigroup.combine(
        reversed.reduceRight((first, second) => Semigroup.combine(first, second)),
        start
      )
  }
})

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
  fromCombine((first, second) => {
    const r = {} as any
    for (const k in semigroups) {
      if (Object.prototype.hasOwnProperty.call(semigroups, k)) {
        r[k] = semigroups[k].combine(first[k], second[k])
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
  fromCombine((first, second) =>
    semigroups.map((Semigroup, i) => Semigroup.combine(first[i], second[i])) as any
  )

/**
 * @since 3.0.0
 */
export const intercalate = <A>(separator: A) =>
  (Semigroup: Semigroup<A>): Semigroup<A> =>
    fromCombine(
      (first, second) => Semigroup.combineMany(first, [separator, second])
    )

/**
 * Always return the first argument.
 *
 * @category instances
 * @since 3.0.0
 */
export const first = <A = never>(): Semigroup<A> => ({
  combine: identity,
  combineMany: identity
})

/**
 * Always return the last argument.
 *
 * @category instances
 * @since 3.0.0
 */
export const last = <A = never>(): Semigroup<A> => ({
  combine: (_, second) => second,
  combineMany: (start, others) => {
    let a: A = start
    // eslint-disable-next-line no-empty
    for (a of others) {}
    return a
  }
})
