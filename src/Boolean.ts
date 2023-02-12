/**
 * This module provides utility functions and type class instances for working with the `boolean` type in TypeScript.
 * It includes functions for basic boolean operations, as well as type class instances for
 * `Equivalence`, `Order`, `Semigroup`, and `Monoid`.
 *
 * @since 1.0.0
 */
import type { LazyArg } from "@fp-ts/core/Function"
import { dual, flow } from "@fp-ts/core/Function"
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
 * This function returns the result of either of the given functions depending on the value of the boolean parameter.
 * It is useful when you have to run one of two functions depending on the boolean value.
 *
 * @param value - the boolean value that decides which function will be executed.
 * @param onFalse - a lazy evaluation function that will be executed when the `value` is `false`.
 * @param onTrue - a lazy evaluation function that will be executed when the `value` is `true`.
 *
 * @example
 * import * as B from "@fp-ts/core/Boolean"
 *
 * assert.deepStrictEqual(
 *  B.match(true, () => "It's false!", () => "It's true!"),
 *  "It's true!"
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
 *
 * assert.deepStrictEqual(SemigroupAll.combine(true, true), true)
 * assert.deepStrictEqual(SemigroupAll.combine(true, false), false)
 * assert.deepStrictEqual(SemigroupAll.combine(false, true), false)
 * assert.deepStrictEqual(SemigroupAll.combine(false, false), false)
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
 *
 * assert.deepStrictEqual(SemigroupAny.combine(true, true), true)
 * assert.deepStrictEqual(SemigroupAny.combine(true, false), true)
 * assert.deepStrictEqual(SemigroupAny.combine(false, true), true)
 * assert.deepStrictEqual(SemigroupAny.combine(false, false), false)
 *
 * @category instances
 * @since 1.0.0
 */
export const SemigroupAny: semigroup.Semigroup<boolean> = semigroup.booleanAny

/**
 * `boolean` semigroup under exclusive disjunction.
 *
 * @example
 * import { SemigroupXor } from '@fp-ts/core/Boolean'
 *
 * assert.deepStrictEqual(SemigroupXor.combine(true, true), false)
 * assert.deepStrictEqual(SemigroupXor.combine(true, false), true)
 * assert.deepStrictEqual(SemigroupXor.combine(false, true), true)
 * assert.deepStrictEqual(SemigroupXor.combine(false, false), false)
 *
 * @category instances
 * @since 1.0.0
 */
export const SemigroupXor: semigroup.Semigroup<boolean> = semigroup.booleanXor

/**
 * `boolean` semigroup under equivalence.
 *
 * @example
 * import { SemigroupEqv } from '@fp-ts/core/Boolean'
 *
 * assert.deepStrictEqual(SemigroupEqv.combine(true, true), true)
 * assert.deepStrictEqual(SemigroupEqv.combine(true, false), false)
 * assert.deepStrictEqual(SemigroupEqv.combine(false, true), false)
 * assert.deepStrictEqual(SemigroupEqv.combine(false, false), true)
 *
 * @category instances
 * @since 1.0.0
 */
export const SemigroupEqv: semigroup.Semigroup<boolean> = semigroup.booleanEqv

/**
 * `boolean` monoid under conjunction, see also {@link SemigroupAll}.
 *
 * The `empty` value is `true`.
 *
 * @category instances
 * @since 1.0.0
 */
export const MonoidAll: monoid.Monoid<boolean> = monoid.booleanAll

/**
 * `boolean` monoid under disjunction, see also {@link SemigroupAny}.
 *
 * The `empty` value is `false`.
 *
 * @category instances
 * @since 1.0.0
 */
export const MonoidAny: monoid.Monoid<boolean> = monoid.booleanAny

/**
 * `boolean` monoid under exclusive disjunction, see also {@link SemigroupXor}.
 *
 * The `empty` value is `false`.
 *
 * @category instances
 * @since 1.0.0
 */
export const MonoidXor: monoid.Monoid<boolean> = monoid.booleanXor

/**
 * `boolean` monoid under equivalence.
 *
 * The `empty` value is `true`.
 *
 * @category instances
 * @since 1.0.0
 */
export const MonoidEqv: monoid.Monoid<boolean> = monoid.booleanEqv

/**
 * Negates the given boolean: `!self`
 *
 * @example
 * import { not } from '@fp-ts/core/Boolean'
 *
 * assert.deepStrictEqual(not(true), false)
 * assert.deepStrictEqual(not(false), true)
 *
 * @category combinators
 * @since 1.0.0
 */
export const not = (self: boolean): boolean => !self

/**
 * Combines two boolean using AND: `self && that`.
 *
 * @example
 * import { and } from '@fp-ts/core/Boolean'
 *
 * assert.deepStrictEqual(and(true, true), true)
 * assert.deepStrictEqual(and(true, false), false)
 * assert.deepStrictEqual(and(false, true), false)
 * assert.deepStrictEqual(and(false, false), false)
 *
 * @category combinators
 * @since 1.0.0
 */
export const and: {
  (that: boolean): (self: boolean) => boolean
  (self: boolean, that: boolean): boolean
} = dual(2, semigroup.booleanAll.combine)

/**
 * Combines two boolean using NAND: `!(self && that)`.
 *
 * @example
 * import { nand } from '@fp-ts/core/Boolean'
 *
 * assert.deepStrictEqual(nand(true, true), false)
 * assert.deepStrictEqual(nand(true, false), true)
 * assert.deepStrictEqual(nand(false, true), true)
 * assert.deepStrictEqual(nand(false, false), true)
 *
 * @category combinators
 * @since 1.0.0
 */
export const nand: {
  (that: boolean): (self: boolean) => boolean
  (self: boolean, that: boolean): boolean
} = dual(2, flow(semigroup.booleanAll.combine, not))

/**
 * Combines two boolean using OR: `self || that`.
 *
 * @example
 * import { or } from '@fp-ts/core/Boolean'
 *
 * assert.deepStrictEqual(or(true, true), true)
 * assert.deepStrictEqual(or(true, false), true)
 * assert.deepStrictEqual(or(false, true), true)
 * assert.deepStrictEqual(or(false, false), false)
 *
 * @category combinators
 * @since 1.0.0
 */
export const or: {
  (that: boolean): (self: boolean) => boolean
  (self: boolean, that: boolean): boolean
} = dual(2, semigroup.booleanAny.combine)

/**
 * Combines two booleans using NOR: `!(self || that)`.
 *
 * @example
 * import { nor } from '@fp-ts/core/Boolean'
 *
 * assert.deepStrictEqual(nor(true, true), false)
 * assert.deepStrictEqual(nor(true, false), false)
 * assert.deepStrictEqual(nor(false, true), false)
 * assert.deepStrictEqual(nor(false, false), true)
 *
 * @category combinators
 * @since 1.0.0
 */
export const nor: {
  (that: boolean): (self: boolean) => boolean
  (self: boolean, that: boolean): boolean
} = dual(2, flow(semigroup.booleanAny.combine, not))

/**
 * Combines two booleans using XOR: `(!self && that) || (self && !that)`.
 *
 * @example
 * import { xor } from '@fp-ts/core/Boolean'
 *
 * assert.deepStrictEqual(xor(true, true), false)
 * assert.deepStrictEqual(xor(true, false), true)
 * assert.deepStrictEqual(xor(false, true), true)
 * assert.deepStrictEqual(xor(false, false), false)
 *
 * @category combinators
 * @since 1.0.0
 */
export const xor: {
  (that: boolean): (self: boolean) => boolean
  (self: boolean, that: boolean): boolean
} = dual(2, semigroup.booleanXor.combine)

/**
 * Combines two booleans using EQV (aka XNOR): `!xor(self, that)`.
 *
 * @example
 * import { eqv } from '@fp-ts/core/Boolean'
 *
 * assert.deepStrictEqual(eqv(true, true), true)
 * assert.deepStrictEqual(eqv(true, false), false)
 * assert.deepStrictEqual(eqv(false, true), false)
 * assert.deepStrictEqual(eqv(false, false), true)
 *
 * @category combinators
 * @since 1.0.0
 */
export const eqv: {
  (that: boolean): (self: boolean) => boolean
  (self: boolean, that: boolean): boolean
} = dual(2, semigroup.booleanEqv.combine)

/**
 * Combines two booleans using an implication: `(!self || that)`.
 *
 * @example
 * import { implies } from '@fp-ts/core/Boolean'
 *
 * assert.deepStrictEqual(implies(true, true), true)
 * assert.deepStrictEqual(implies(true, false), false)
 * assert.deepStrictEqual(implies(false, true), true)
 * assert.deepStrictEqual(implies(false, false), true)
 *
 * @category combinators
 * @since 1.0.0
 */
export const implies: {
  (that: boolean): (self: boolean) => boolean
  (self: boolean, that: boolean): boolean
} = dual(2, (self, that) => self ? that : true)

/**
 * This utility function is used to check if all the elements in a collection of boolean values are `true`.
 *
 * @param collection - An iterable collection of booleans.
 *
 * @example
 * import { all } from '@fp-ts/core/Boolean'
 *
 * assert.deepStrictEqual(all([true, true, true]), true)
 * assert.deepStrictEqual(all([true, false, true]), false)
 *
 * @since 1.0.0
 */
export const all: (collection: Iterable<boolean>) => boolean = MonoidAll.combineAll

/**
 * This utility function is used to check if at least one of the elements in a collection of boolean values is `true`.
 *
 * @param collection - An iterable collection of booleans.
 *
 * @example
 * import { any } from '@fp-ts/core/Boolean'
 *
 * assert.deepStrictEqual(any([true, false, true]), true)
 * assert.deepStrictEqual(any([false, false, false]), false)
 *
 * @since 1.0.0
 */
export const any: (collection: Iterable<boolean>) => boolean = MonoidAny.combineAll
