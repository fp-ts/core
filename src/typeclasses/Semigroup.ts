/**
 * If a type `A` can form a `Semigroup` it has an **associative** binary operation.
 *
 * ```ts
 * interface Semigroup<A> {
 *   readonly combine: (that: A) => (self: A) => A
 * }
 * ```
 *
 * Associativity means the following equality must hold for any choice of `x`, `y`, and `z`.
 *
 * ```ts
 * (x |> combine(y)) |> combine(z) <-> x |> combine(y |> combine(z))
 * ```
 *
 * @since 3.0.0
 */
import { identity } from "@fp-ts/core/Function"
import * as internal from "@fp-ts/core/internal"
import type { Ord } from "@fp-ts/core/typeclasses/Ord"
import * as ord from "@fp-ts/core/typeclasses/Ord"

/**
 * @category model
 * @since 3.0.0
 */
export interface Semigroup<A> {
  readonly combine: (that: A) => (self: A) => A
}

/**
 * Get a semigroup where `combine` will return the minimum, based on the provided order.
 *
 * @category constructors
 * @since 3.0.0
 */
export const min = <A>(Ord: Ord<A>): Semigroup<A> => ({
  combine: ord.min(Ord)
})

/**
 * Get a semigroup where `combine` will return the maximum, based on the provided order.
 *
 * @category constructors
 * @since 3.0.0
 */
export const max = <A>(Ord: Ord<A>): Semigroup<A> => ({
  combine: ord.max(Ord)
})

/**
 * @category constructors
 * @since 3.0.0
 */
export const constant = <S>(s: S): Semigroup<S> => ({
  combine: () => () => s
})

/**
 * The dual of a `Semigroup`, obtained by flipping the arguments of `combine`.
 *
 * @since 3.0.0
 */
export const reverse = <S>(Semigroup: Semigroup<S>): Semigroup<S> => ({
  combine: (that) => (self) => Semigroup.combine(self)(that)
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
> => ({
  combine: (that) =>
    (self) => {
      const r: A = {} as any
      for (const k in semigroups) {
        if (internal.has.call(semigroups, k)) {
          r[k] = semigroups[k].combine(that[k])(self[k])
        }
      }
      return r
    }
})

/**
 * Given a tuple of semigroups returns a semigroup for the tuple.
 *
 * @since 3.0.0
 */
export const tuple = <A extends ReadonlyArray<unknown>>(
  ...semigroups: { [K in keyof A]: Semigroup<A[K]> }
): Semigroup<Readonly<A>> => ({
  combine: (that) => (self) => semigroups.map((s, i) => s.combine(that[i])(self[i])) as any
})

/**
 * You can glue items between and stay associative.
 *
 * @since 3.0.0
 */
export const intercalate = <A>(separator: A) =>
  (Semigroup: Semigroup<A>): Semigroup<A> => ({
    combine: (that) => (self) => Semigroup.combine(Semigroup.combine(that)(separator))(self)
  })

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * Always return the first argument.
 *
 * @category instances
 * @since 3.0.0
 */
export const first = <A>(): Semigroup<A> => ({
  combine: () => identity
})

/**
 * Always return the last argument.
 *
 * @category instances
 * @since 3.0.0
 */
export const last = <A>(): Semigroup<A> => ({
  combine: (a) => () => a
})

/**
 * Given a sequence of `as`, combine them and return the total.
 *
 * If `as` is empty, return the provided `startWith` value.
 *
 * @since 3.0.0
 */
export const combineAll = <S>(Semigroup: Semigroup<S>) =>
  (startWith: S) =>
    (collection: Iterable<S>): S => {
      let out: S = startWith
      for (const s of collection) {
        out = Semigroup.combine(s)(out)
      }
      return out
    }
