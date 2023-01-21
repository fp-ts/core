/**
 * This module provides utility functions and type class instances for working with the `number` type in TypeScript.
 * It includes functions for basic arithmetic operations, as well as type class instances for
 * `Equivalence`, `Order`, `Semigroup`, and `Monoid`.
 *
 * @since 1.0.0
 */
import type { Ordering } from "@fp-ts/core/Ordering"
import * as predicate from "@fp-ts/core/Predicate"
import * as bounded from "@fp-ts/core/typeclass/Bounded"
import * as equivalence from "@fp-ts/core/typeclass/Equivalence"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import * as order from "@fp-ts/core/typeclass/Order"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"

/**
 * @category guards
 * @since 1.0.0
 */
export const isNumber = predicate.isNumber

/**
 * @since 1.0.0
 */
export const sum = (that: number) =>
  (self: number): number => semigroup.numberSum.combine(self, that)

/**
 * @since 1.0.0
 */
export const multiply = (that: number) =>
  (self: number): number => semigroup.numberMultiply.combine(self, that)

/**
 * @since 1.0.0
 */
export const subtract = (that: number) => (self: number): number => self - that

/**
 * @since 1.0.0
 */
export const divide = (that: number) => (self: number): number => self / that

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
export const Equivalence = equivalence.number

/**
 * @category instances
 * @since 1.0.0
 */
export const Order = order.number

/**
 * @category instances
 * @since 1.0.0
 */
export const Bounded = bounded.number

/**
 * `number` semigroup under addition.
 *
 * @example
 * import { SemigroupSum } from '@fp-ts/core/Number'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe(2, SemigroupSum.combine(3)), 5)
 *
 * @category instances
 * @since 1.0.0
 */
export const SemigroupSum = semigroup.numberSum

/**
 * @category instances
 * @since 1.0.0
 */
export const SemigroupMax = semigroup.max(Order)

/**
 * @category instances
 * @since 1.0.0
 */
export const SemigroupMin = semigroup.min(Order)

/**
 * `number` semigroup under multiplication.
 *
 * @example
 * import { SemigroupMultiply } from '@fp-ts/core/Number'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe(2, SemigroupMultiply.combine(3)), 6)
 *
 * @category instances
 * @since 1.0.0
 */
export const SemigroupMultiply = semigroup.numberMultiply

/**
 * `number` monoid under addition.
 *
 * The `empty` value is `0`.
 *
 * @category instances
 * @since 1.0.0
 */
export const MonoidSum = monoid.numberSum

/**
 * `number` monoid under multiplication.
 *
 * The `empty` value is `1`.
 *
 * @category instances
 * @since 1.0.0
 */
export const MonoidMultiply = monoid.numberMultiply

/**
 * @category instances
 * @since 1.0.0
 */
export const MonoidMax = bounded.max(Bounded)

/**
 * @category instances
 * @since 1.0.0
 */
export const MonoidMin = bounded.min(Bounded)

/**
 * @since 1.0.0
 */
export const sign = (n: number): Ordering => (n < 0 ? -1 : n > 0 ? 1 : 0)
