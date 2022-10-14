/**
 * @since 3.0.0
 */
import { identity } from "@fp-ts/core/Function"
import type { Sortable } from "@fp-ts/core/Sortable"

/**
 * @category type class
 * @since 3.0.0
 */
export interface Semigroup<A> {
  readonly combine2: (a1: A, a2: A) => A
  readonly combine: (start: A, all: Iterable<A>) => A
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromBinary = <A>(combine2: (a1: A, a2: A) => A): Semigroup<A> => ({
  combine2,
  combine: (start, all) => {
    let out: A = start
    for (const a of all) {
      out = combine2(out, a)
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
  fromBinary((a1, a2) => Sortable.compare(a1, a2) === -1 ? a1 : a2)

/**
 * Get a semigroup where `combine` will return the maximum, based on the provided order.
 *
 * @category constructors
 * @since 3.0.0
 */
export const max = <A>(Sortable: Sortable<A>): Semigroup<A> =>
  fromBinary((a1, a2) => Sortable.compare(a1, a2) === 1 ? a1 : a2)

/**
 * @category constructors
 * @since 3.0.0
 */
export const constant = <A>(a: A): Semigroup<A> => ({
  combine2: () => a,
  combine: () => a
})

/**
 * The dual of a `Semigroup`, obtained by flipping the arguments of `combine`.
 *
 * @since 3.0.0
 */
export const reverse = <A>(Semigroup: Semigroup<A>): Semigroup<A> => ({
  combine2: (a1, a2) => Semigroup.combine2(a2, a1),
  combine: (start, all) => {
    const reversed = Array.from(all).reverse()
    return reversed.length === 0 ?
      start :
      Semigroup.combine2(reversed.reduceRight((a1, a2) => Semigroup.combine2(a1, a2)), start)
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
  fromBinary((a1, a2) => {
    const r: A = {} as any
    for (const k in semigroups) {
      if (Object.prototype.hasOwnProperty.call(semigroups, k)) {
        r[k] = semigroups[k].combine2(a1[k], a2[k])
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
  fromBinary((a1: any, a2: any) =>
    semigroups.map((Semigroup, i) => Semigroup.combine2(a1[i], a2[i]))
  ) as any

/**
 * @since 3.0.0
 */
export const intercalate = <A>(separator: A) =>
  (Semigroup: Semigroup<A>): Semigroup<A> =>
    fromBinary(
      (a1, a2) => Semigroup.combine(a1, [separator, a2])
    )

/**
 * Always return the first argument.
 *
 * @category instances
 * @since 3.0.0
 */
export const first = <A = never>(): Semigroup<A> => ({
  combine2: identity,
  combine: identity
})

/**
 * Always return the last argument.
 *
 * @category instances
 * @since 3.0.0
 */
export const last = <A = never>(): Semigroup<A> => ({
  combine2: (_, a2) => a2,
  combine: (start, all) => {
    let out: A = start
    // eslint-disable-next-line no-empty
    for (out of all) {}
    return out
  }
})
