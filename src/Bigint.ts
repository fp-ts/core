/**
 * This module provides utility functions and type class instances for working with the `bigint` type in TypeScript.
 * It includes functions for basic arithmetic operations, as well as type class instances for
 * `Equivalence`, `Order`, `Semigroup`, and `Monoid`.
 *
 * @since 1.0.0
 */

import { dual } from "@fp-ts/core/Function"
import * as predicate from "@fp-ts/core/Predicate"
import * as equivalence from "@fp-ts/core/typeclass/Equivalence"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import * as order from "@fp-ts/core/typeclass/Order"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"

/**
 * @category guards
 * @since 1.0.0
 */
export const isBigint: (u: unknown) => u is bigint = predicate.isBigint

/**
 * @category algebraic operations
 * @since 1.0.0
 */
export const sum: {
  (that: bigint): (self: bigint) => bigint
  (self: bigint, that: bigint): bigint
} = semigroup.bigintSum.combine

/**
 * @category algebraic operations
 * @since 1.0.0
 */
export const multiply: {
  (that: bigint): (self: bigint) => bigint
  (self: bigint, that: bigint): bigint
} = semigroup.bigintMultiply.combine

/**
 * @category algebraic operations
 * @since 1.0.0
 */
export const subtract: {
  (that: bigint): (self: bigint) => bigint
  (self: bigint, that: bigint): bigint
} = dual(2, (self: bigint, that: bigint): bigint => self - that)

/**
 * @category algebraic operations
 * @since 1.0.0
 */
export const divide: {
  (that: bigint): (self: bigint) => bigint
  (self: bigint, that: bigint): bigint
} = dual(2, (self: bigint, that: bigint): bigint => self / that)

/**
 * @since 1.0.0
 */
export const increment = (n: bigint): bigint => n + 1n

/**
 * @since 1.0.0
 */
export const decrement = (n: bigint): bigint => n - 1n

/**
 * @category instances
 * @since 1.0.0
 */
export const Equivalence: equivalence.Equivalence<bigint> = equivalence.bigint

/**
 * @category instances
 * @since 1.0.0
 */
export const Order: order.Order<bigint> = order.bigint

/**
 * `bigint` semigroup under addition.
 *
 * @category instances
 * @since 1.0.0
 */
export const SemigroupSum: semigroup.Semigroup<bigint> = semigroup.bigintSum

/**
 * `bigint` semigroup under multiplication.
 *
 * @category instances
 * @since 1.0.0
 */
export const SemigroupMultiply: semigroup.Semigroup<bigint> = semigroup.bigintMultiply

/**
 * `bigint` monoid under addition.
 *
 * The `empty` value is `0n`.
 *
 * @category instances
 * @since 1.0.0
 */
export const MonoidSum: monoid.Monoid<bigint> = monoid.bigintSum

/**
 * `bigint` monoid under multiplication.
 *
 * The `empty` value is `1n`.
 *
 * @category instances
 * @since 1.0.0
 */
export const MonoidMultiply: monoid.Monoid<bigint> = monoid.bigintMultiply
