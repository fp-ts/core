/**
 * This module provides utility functions and type class instances for working with the `number` type in TypeScript.
 * It includes functions for basic arithmetic operations, as well as type class instances for
 * `Equivalence`, `Order`, `Semigroup`, and `Monoid`.
 *
 * @since 1.0.0
 */
import { dual } from "@fp-ts/core/Function"
import type { Ordering } from "@fp-ts/core/Ordering"
import * as predicate from "@fp-ts/core/Predicate"
import type { Refinement } from "@fp-ts/core/Predicate"
import * as bounded from "@fp-ts/core/typeclass/Bounded"
import * as equivalence from "@fp-ts/core/typeclass/Equivalence"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import * as order from "@fp-ts/core/typeclass/Order"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"

/**
 * @category guards
 * @since 1.0.0
 */
export const isNumber: Refinement<unknown, number> = predicate.isNumber

/**
 * @example
 * import { sum } from '@fp-ts/core/Number'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe(2, sum(3)), 5)
 *
 * @category algebraic operations
 * @since 1.0.0
 */
export const sum: {
  (that: number): (self: number) => number
  (self: number, that: number): number
} = dual(2, semigroup.numberSum.combine)

/**
 * @example
 * import { multiply } from '@fp-ts/core/Number'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe(2, multiply(3)), 6)
 *
 * @category algebraic operations
 * @since 1.0.0
 */
export const multiply: {
  (that: number): (self: number) => number
  (self: number, that: number): number
} = dual(2, semigroup.numberMultiply.combine)

/**
 * @example
 * import { subtract } from '@fp-ts/core/Number'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe(2, subtract(3)), -1)
 *
 * @category algebraic operations
 * @since 1.0.0
 */
export const subtract: {
  (that: number): (self: number) => number
  (self: number, that: number): number
} = dual(2, (self: number, that: number): number => self - that)

/**
 * @example
 * import { divide } from '@fp-ts/core/Number'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe(6, divide(3)), 2)
 *
 * @category algebraic operations
 * @since 1.0.0
 */
export const divide: {
  (that: number): (self: number) => number
  (self: number, that: number): number
} = dual(2, (self: number, that: number): number => self / that)

/**
 * @example
 * import { increment } from '@fp-ts/core/Number'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe(2, increment), 3)
 *
 * @since 1.0.0
 */
export const increment = (n: number): number => n + 1

/**
 * @example
 * import { decrement } from '@fp-ts/core/Number'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe(3, decrement), 2)
 *
 * @since 1.0.0
 */
export const decrement = (n: number): number => n - 1

/**
 * @category instances
 * @since 1.0.0
 */
export const Equivalence: equivalence.Equivalence<number> = equivalence.number

/**
 * @category instances
 * @since 1.0.0
 */
export const Order: order.Order<number> = order.number

/**
 * @category instances
 * @since 1.0.0
 */
export const Bounded: bounded.Bounded<number> = bounded.number

/**
 * `number` semigroup under addition.
 *
 * @example
 * import { SemigroupSum } from '@fp-ts/core/Number'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(SemigroupSum.combine(2, 3), 5)
 *
 * @category instances
 * @since 1.0.0
 */
export const SemigroupSum: semigroup.Semigroup<number> = semigroup.numberSum

/**
 * @category instances
 * @since 1.0.0
 */
export const SemigroupMax: semigroup.Semigroup<number> = semigroup.max(Order)

/**
 * @category instances
 * @since 1.0.0
 */
export const SemigroupMin: semigroup.Semigroup<number> = semigroup.min(Order)

/**
 * `number` semigroup under multiplication.
 *
 * @example
 * import { SemigroupMultiply } from '@fp-ts/core/Number'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(SemigroupMultiply.combine(2, 3), 6)
 *
 * @category instances
 * @since 1.0.0
 */
export const SemigroupMultiply: semigroup.Semigroup<number> = semigroup.numberMultiply

/**
 * `number` monoid under addition.
 *
 * The `empty` value is `0`.
 *
 * @category instances
 * @since 1.0.0
 */
export const MonoidSum: monoid.Monoid<number> = monoid.numberSum

/**
 * `number` monoid under multiplication.
 *
 * The `empty` value is `1`.
 *
 * @category instances
 * @since 1.0.0
 */
export const MonoidMultiply: monoid.Monoid<number> = monoid.numberMultiply

/**
 * @category instances
 * @since 1.0.0
 */
export const MonoidMax: monoid.Monoid<number> = bounded.max(Bounded)

/**
 * @category instances
 * @since 1.0.0
 */
export const MonoidMin: monoid.Monoid<number> = bounded.min(Bounded)

/**
 * @since 1.0.0
 */
export const sign = (n: number): Ordering => n < 0 ? -1 : n > 0 ? 1 : 0

/**
 * @category algebraic operations
 * @since 1.0.0
 */
export const sumAll: (collection: Iterable<number>) => number = MonoidSum.combineAll

/**
 * @category algebraic operations
 * @since 1.0.0
 */
export const multiplyAll: (collection: Iterable<number>) => number = MonoidMultiply.combineAll

/*

  Missing:

  - toFixed
  - toPrecision
  - toExponential
  - toLocaleString

*/
