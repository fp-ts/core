/**
 * @since 1.0.0
 */
import type { Ordering } from "@fp-ts/core/Ordering"
import type { Refinement } from "@fp-ts/core/Predicate"
import type * as bounded from "@fp-ts/core/typeclass/Bounded"
import type * as monoid from "@fp-ts/core/typeclass/Monoid"
import type * as order from "@fp-ts/core/typeclass/Order"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"

/**
 * @category refinements
 * @since 1.0.0
 */
export const isNumber: Refinement<unknown, number> = (u: unknown): u is number =>
  typeof u === "number"

/**
 * @since 1.0.0
 */
export const sum = (that: number) => (self: number): number => self + that

/**
 * @since 1.0.0
 */
export const multiply = (that: number) => (self: number): number => self * that

/**
 * @since 1.0.0
 */
export const sub = (that: number) => (self: number): number => self - that

/**
 * @since 1.0.0
 */
export const increment = (n: number): number => n + 1

/**
 * @since 1.0.0
 */
export const decrement = (n: number): number => n - 1

/**
 * @category instances
 * @since 1.0.0
 */
export const Order: order.Order<number> = {
  compare: (that) => (self) => self < that ? -1 : self > that ? 1 : 0
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Bounded: bounded.Bounded<number> = {
  compare: Order.compare,
  maxBound: Infinity,
  minBound: -Infinity
}

/**
 * `number` semigroup under addition.
 *
 * @example
 * import { SemigroupSum } from '@fp-ts/data/Number'
 * import { pipe } from '@fp-ts/data/Function'
 *
 * assert.deepStrictEqual(pipe(2, SemigroupSum.combine(3)), 5)
 *
 * @category instances
 * @since 1.0.0
 */
export const SemigroupSum: semigroup.Semigroup<number> = semigroup.fromCombine(sum)

/**
 * `number` semigroup under multiplication.
 *
 * @example
 * import { SemigroupMultiply } from '@fp-ts/data/Number'
 * import { pipe } from '@fp-ts/data/Function'
 *
 * assert.deepStrictEqual(pipe(2, SemigroupMultiply.combine(3)), 6)
 *
 * @category instances
 * @since 1.0.0
 */
export const SemigroupMultiply: semigroup.Semigroup<number> = {
  combine: multiply,
  combineMany: (collection) =>
    (self) => {
      if (self === 0) {
        return 0
      }
      let out = self
      for (const n of collection) {
        if (n === 0) {
          return 0
        }
        out = out * n
      }
      return out
    }
}

/**
 * `number` monoid under addition.
 *
 * The `empty` value is `0`.
 *
 * @category instances
 * @since 1.0.0
 */
export const MonoidSum: monoid.Monoid<number> = {
  ...SemigroupSum,
  combineAll: (collection) => SemigroupSum.combineMany(collection)(0),
  empty: 0
}

/**
 * `number` monoid under multiplication.
 *
 * The `empty` value is `1`.
 *
 * @category instances
 * @since 1.0.0
 */
export const MonoidMultiply: monoid.Monoid<number> = {
  ...SemigroupMultiply,
  combineAll: (collection) => SemigroupMultiply.combineMany(collection)(1),
  empty: 1
}

/**
 * @since 1.0.0
 */
export const sign = (n: number): Ordering => (n < 0 ? -1 : n > 0 ? 1 : 0)
