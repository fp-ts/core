/**
 * @since 1.0.0
 */
import { identity } from "@fp-ts/core/data/Function"
import type { Sortable } from "@fp-ts/core/typeclass/Sortable"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Semigroup<A> {
  readonly combine: (that: A) => (self: A) => A
  readonly combineMany: (collection: Iterable<A>) => (self: A) => A
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const fromCombine = <A>(combine: Semigroup<A>["combine"]): Semigroup<A> => ({
  combine,
  combineMany: (collection) =>
    (self) => {
      let out: A = self
      for (const a of collection) {
        out = combine(a)(out)
      }
      return out
    }
})

/**
 * `Semigroup` that returns last minimum of elements.
 *
 * @category constructors
 * @since 1.0.0
 */
export const min = <A>(Sortable: Sortable<A>): Semigroup<A> =>
  fromCombine((that) => (self) => Sortable.compare(that)(self) === -1 ? self : that)

/**
 * `Semigroup` that returns last maximum of elements.
 *
 * @category constructors
 * @since 1.0.0
 */
export const max = <A>(Sortable: Sortable<A>): Semigroup<A> =>
  fromCombine((that) => (self) => Sortable.compare(that)(self) === 1 ? self : that)

/**
 * @category constructors
 * @since 1.0.0
 */
export const constant = <A>(a: A): Semigroup<A> => ({
  combine: () => () => a,
  combineMany: () => () => a
})

/**
 * The dual of a `Semigroup`, obtained by flipping the arguments of `combine`.
 *
 * @since 1.0.0
 */
export const reverse = <A>(Semigroup: Semigroup<A>): Semigroup<A> => ({
  combine: (that) => (self) => Semigroup.combine(self)(that),
  combineMany: (collection) =>
    (self) => {
      const reversed = Array.from(collection).reverse()
      return reversed.length === 0 ?
        self :
        Semigroup.combine(self)(Semigroup.combineMany(reversed.slice(1))(reversed[0]))
    }
})

/**
 * Given a struct of semigroups returns a semigroup for the struct.
 *
 * @since 1.0.0
 */
export const struct = <A>(semigroups: { [K in keyof A]: Semigroup<A[K]> }): Semigroup<
  {
    readonly [K in keyof A]: A[K]
  }
> =>
  fromCombine((that) =>
    (self) => {
      const r = {} as any
      for (const k in semigroups) {
        if (Object.prototype.hasOwnProperty.call(semigroups, k)) {
          r[k] = semigroups[k].combine(that[k])(self[k])
        }
      }
      return r
    }
  )

/**
 * Given a tuple of semigroups returns a semigroup for the tuple.
 *
 * @since 1.0.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(
  ...semigroups: { [K in keyof A]: Semigroup<A[K]> }
): Semigroup<Readonly<A>> =>
  fromCombine((that) =>
    (self) => semigroups.map((Semigroup, i) => Semigroup.combine(that[i])(self[i])) as any
  )

/**
 * @since 1.0.0
 */
export const intercalate = <A>(separator: A) =>
  (Semigroup: Semigroup<A>): Semigroup<A> =>
    fromCombine(
      (that) => Semigroup.combineMany([separator, that])
    )

/**
 * Always return the first argument.
 *
 * @category instances
 * @since 1.0.0
 */
export const first = <A = never>(): Semigroup<A> => ({
  combine: () => identity,
  combineMany: () => identity
})

/**
 * Always return the last argument.
 *
 * @category instances
 * @since 1.0.0
 */
export const last = <A = never>(): Semigroup<A> => ({
  combine: (second) => () => second,
  combineMany: (collection) =>
    (self) => {
      let a: A = self
      // eslint-disable-next-line no-empty
      for (a of collection) {}
      return a
    }
})
