/**
 * This module provides utility functions and type class instances for working with the `boolean` type in TypeScript.
 * It includes functions for basic boolean operations, as well as type class instances for
 * `Equivalence`, `Order`, `Semigroup`, and `Monoid`.
 *
 * @since 1.0.0
 */
import type { LazyArg } from "@fp-ts/core/Function"
import { dual } from "@fp-ts/core/Function"
import * as predicate from "@fp-ts/core/Predicate"
import * as equivalence from "@fp-ts/core/typeclass/Equivalence"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import * as order from "@fp-ts/core/typeclass/Order"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"

/**
 * Tests if a value is a `boolean`.
 *
 * @param input - The value to test.
 *
 * @example
 * import { isBoolean } from '@fp-ts/core/Boolean'
 *
 * assert.deepStrictEqual(isBoolean(true), true)
 * assert.deepStrictEqual(isBoolean("true"), false)
 *
 * @category guards
 * @since 1.0.0
 */
export const isBoolean: (input: unknown) => input is boolean = predicate.isBoolean

/**
 * Defines the match over a boolean value.
 * Takes two thunks `onTrue`, `onFalse` and a `boolean` value.
 * If `value` is `false`, `onFalse()` is returned, otherwise `onTrue()`.
 *
 * @example
 * import { some, map } from '@fp-ts/core/Option'
 * import { pipe } from '@fp-ts/core/Function'
 * import { match } from '@fp-ts/core/Boolean'
 *
 * assert.deepStrictEqual(
 *  pipe(
 *    some(true),
 *    map(match(() => 'false', () => 'true'))
 *  ),
 *  some('true')
 * )
 *
 * @category pattern matching
 * @since 1.0.0
 */
export const match: {
  <A, B = A>(onFalse: LazyArg<A>, onTrue: LazyArg<B>): (value: boolean) => A | B
  <A, B>(value: boolean, onFalse: LazyArg<A>, onTrue: LazyArg<B>): A | B
} = dual(
  3,
  <A, B>(value: boolean, onFalse: LazyArg<A>, onTrue: LazyArg<B>): A | B =>
    value ? onTrue() : onFalse()
)

/**
 * @category instances
 * @since 1.0.0
 */
export const Equivalence: equivalence.Equivalence<boolean> = equivalence.boolean

/**
 * @category instances
 * @since 1.0.0
 */
export const Order: order.Order<boolean> = order.boolean

/**
 * `boolean` semigroup under conjunction.
 *
 * @example
 * import { SemigroupAll } from '@fp-ts/core/Boolean'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(SemigroupAll.combine(true, true), true)
 * assert.deepStrictEqual(SemigroupAll.combine(true, false), false)
 *
 * @category instances
 * @since 1.0.0
 */
export const SemigroupAll: semigroup.Semigroup<boolean> = semigroup.booleanAll

/**
 * `boolean` semigroup under disjunction.
 *
 * @example
 * import { SemigroupAny } from '@fp-ts/core/Boolean'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(SemigroupAny.combine(true, true), true)
 * assert.deepStrictEqual(SemigroupAny.combine(true, false), true)
 * assert.deepStrictEqual(SemigroupAny.combine(false, false), false)
 *
 * @category instances
 * @since 1.0.0
 */
export const SemigroupAny: semigroup.Semigroup<boolean> = semigroup.booleanAny

/**
 * `boolean` monoid under conjunction.
 *
 * The `empty` value is `true`.
 *
 * @category instances
 * @since 1.0.0
 */
export const MonoidAll: monoid.Monoid<boolean> = monoid.booleanAll

/**
 * `boolean` monoid under disjunction.
 *
 * The `empty` value is `false`.
 *
 * @category instances
 * @since 1.0.0
 */
export const MonoidAny: monoid.Monoid<boolean> = monoid.booleanAny

/**
 * @category combinators
 * @since 1.0.0
 */
export const and: {
  (that: boolean): (self: boolean) => boolean
  (self: boolean, that: boolean): boolean
} = dual(2, semigroup.booleanAll.combine)

/**
 * @category combinators
 * @since 1.0.0
 */
export const or: {
  (that: boolean): (self: boolean) => boolean
  (self: boolean, that: boolean): boolean
} = dual(2, semigroup.booleanAny.combine)

/**
 * @category combinators
 * @since 1.0.0
 */
export const not = (self: boolean): boolean => !self

/**
 * @since 1.0.0
 */
export const all: (collection: Iterable<boolean>) => boolean = MonoidAll.combineAll

/**
 * @since 1.0.0
 */
export const any: (collection: Iterable<boolean>) => boolean = MonoidAny.combineAll
