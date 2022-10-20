/**
 * `Associative<A>` describes a way of combining two values of type `A` that is associative.
 *
 * ```ts
 * export interface Associative<A> {
 *   readonly combine: (that: A) => (self: A) => A
 *   readonly combineMany: (collection: Iterable<A>) => (self: A) => A
 * }
 * ```
 *
 * The combine operator must be associative, meaning that if we combine `a` with `b` and then combine the result
 * with `c` we must get the same value as if we combine `b` with `c` and then combine `a` with the result.
 *
 * ```
 * (a <> b) <> c === a <> (b <> c)
 * ```
 *
 * The `Associative` abstraction allows us to combine values of a data type to build a new value of that data type
 * with richer structure.
 *
 * @since 1.0.0
 */
import { identity } from "@fp-ts/core/internal/Function"
import type { TotalOrder } from "@fp-ts/core/typeclass/TotalOrder"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Associative<A> {
  readonly combine: (that: A) => (self: A) => A
  readonly combineMany: (collection: Iterable<A>) => (self: A) => A
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const fromCombine = <A>(combine: Associative<A>["combine"]): Associative<A> => ({
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
 * `Associative` that returns last minimum of elements.
 *
 * @category constructors
 * @since 1.0.0
 */
export const min = <A>(TotalOrder: TotalOrder<A>): Associative<A> =>
  fromCombine((that) => (self) => TotalOrder.compare(that)(self) === -1 ? self : that)

/**
 * `Associative` that returns last maximum of elements.
 *
 * @category constructors
 * @since 1.0.0
 */
export const max = <A>(TotalOrder: TotalOrder<A>): Associative<A> =>
  fromCombine((that) => (self) => TotalOrder.compare(that)(self) === 1 ? self : that)

/**
 * @category constructors
 * @since 1.0.0
 */
export const constant = <A>(a: A): Associative<A> => ({
  combine: () => () => a,
  combineMany: () => () => a
})

/**
 * The dual of an `Associative`, obtained by flipping the arguments of `combine`.
 *
 * @since 1.0.0
 */
export const reverse = <A>(Associative: Associative<A>): Associative<A> => ({
  combine: (that) => (self) => Associative.combine(self)(that),
  combineMany: (collection) =>
    (self) => {
      const reversed = Array.from(collection).reverse()
      return reversed.length === 0 ?
        self :
        Associative.combine(self)(Associative.combineMany(reversed.slice(1))(reversed[0]))
    }
})

/**
 * Given a struct of associatives returns an associative for the struct.
 *
 * @since 1.0.0
 */
export const struct = <A>(associatives: { [K in keyof A]: Associative<A[K]> }): Associative<
  {
    readonly [K in keyof A]: A[K]
  }
> =>
  fromCombine((that) =>
    (self) => {
      const r = {} as any
      for (const k in associatives) {
        if (Object.prototype.hasOwnProperty.call(associatives, k)) {
          r[k] = associatives[k].combine(that[k])(self[k])
        }
      }
      return r
    }
  )

/**
 * Given a tuple of associatives returns an associative for the tuple.
 *
 * @since 1.0.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(
  ...associatives: { [K in keyof A]: Associative<A[K]> }
): Associative<Readonly<A>> =>
  fromCombine((that) =>
    (self) => associatives.map((Associative, i) => Associative.combine(that[i])(self[i])) as any
  )

/**
 * @since 1.0.0
 */
export const intercalate = <A>(separator: A) =>
  (Associative: Associative<A>): Associative<A> =>
    fromCombine(
      (that) => Associative.combineMany([separator, that])
    )

/**
 * Always return the first argument.
 *
 * @category instances
 * @since 1.0.0
 */
export const first = <A = never>(): Associative<A> => ({
  combine: () => identity,
  combineMany: () => identity
})

/**
 * Always return the last argument.
 *
 * @category instances
 * @since 1.0.0
 */
export const last = <A = never>(): Associative<A> => ({
  combine: (second) => () => second,
  combineMany: (collection) =>
    (self) => {
      let a: A = self
      // eslint-disable-next-line no-empty
      for (a of collection) {}
      return a
    }
})
