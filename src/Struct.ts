/**
 * This module provides utility functions for working with structs in TypeScript.
 *
 * @since 1.0.0
 */

import * as equivalence from "@fp-ts/core/typeclass/Equivalence"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import * as order from "@fp-ts/core/typeclass/Order"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"

/**
 * Create a new object by picking properties of an existing object.
 *
 * @example
 * import { pick } from "@fp-ts/core/Struct"
 * import { pipe } from "@fp-ts/core/Function"
 *
 * assert.deepStrictEqual(pipe({ a: "a", b: 1, c: true }, pick("a", "b")), { a: "a", b: 1 })
 *
 * @since 1.0.0
 */
export const pick = <S, Keys extends readonly [keyof S, ...Array<keyof S>]>(
  ...keys: Keys
) =>
  (s: S): { [K in Keys[number]]: S[K] } => {
    const out: any = {}
    for (const k of keys) {
      out[k] = s[k]
    }
    return out
  }

/**
 * Create a new object by omitting properties of an existing object.
 *
 * @example
 * import { omit } from "@fp-ts/core/Struct"
 * import { pipe } from "@fp-ts/core/Function"
 *
 * assert.deepStrictEqual(pipe({ a: "a", b: 1, c: true }, omit("c")), { a: "a", b: 1 })
 *
 * @since 1.0.0
 */
export const omit = <S, Keys extends readonly [keyof S, ...Array<keyof S>]>(
  ...keys: Keys
) =>
  (s: S): { [K in Exclude<keyof S, Keys[number]>]: S[K] } => {
    const out: any = { ...s }
    for (const k of keys) {
      delete out[k]
    }
    return out
  }

/**
 * Given a struct of `Equivalence`s returns a new `Equivalence` that compares values of a struct
 * by applying each `Equivalence` to the corresponding property of the struct.
 *
 * Alias of {@link equivalence.struct}.
 *
 * @example
 * import { getEquivalence } from "@fp-ts/core/Struct"
 * import * as S from "@fp-ts/core/String"
 * import * as N from "@fp-ts/core/Number"
 *
 * const PersonEquivalence = getEquivalence({
 *   name: S.Equivalence,
 *   age: N.Equivalence
 * })
 *
 * assert.deepStrictEqual(
 *   PersonEquivalence({ name: "John", age: 25 }, { name: "John", age: 25 }),
 *   true
 * )
 * assert.deepStrictEqual(
 *   PersonEquivalence({ name: "John", age: 25 }, { name: "John", age: 40 }),
 *   false
 * )
 *
 * @category combinators
 * @since 1.0.0
 */
export const getEquivalence: <R extends Record<string, equivalence.Equivalence<any>>>(
  predicates: R
) => equivalence.Equivalence<
  { readonly [K in keyof R]: [R[K]] extends [equivalence.Equivalence<infer A>] ? A : never }
> = equivalence.struct

/**
 * This function creates and returns a new `Order` for a struct of values based on the given `Order`s
 * for each property in the struct.
 *
 * Alias of {@link order.struct}.
 *
 * @category combinators
 * @since 1.0.0
 */
export const getOrder: <R extends { readonly [x: string]: order.Order<any> }>(
  fields: R
) => order.Order<{ [K in keyof R]: [R[K]] extends [order.Order<infer A>] ? A : never }> =
  order.struct

/**
 * This function creates and returns a new `Semigroup` for a struct of values based on the given `Semigroup`s for each property in the struct.
 * The returned `Semigroup` combines two structs of the same type by applying the corresponding `Semigroup` passed as arguments to each property in the struct.
 *
 * It is useful when you need to combine two structs of the same type and you have a specific way of combining each property of the struct.
 *
 * See also {@link getMonoid}.
 *
 * @example
 * import { getSemigroup } from "@fp-ts/core/Struct"
 * import * as Semigroup from "@fp-ts/core/typeclass/Semigroup"
 * import * as O from "@fp-ts/core/Option"
 *
 * const PersonSemigroup = getSemigroup({
 *   name: Semigroup.last<string>(),
 *   age: O.getOptionalMonoid(Semigroup.last<number>())
 * })
 *
 * assert.deepStrictEqual(
 *   PersonSemigroup.combine({ name: "John", age: O.none() }, { name: "John", age: O.some(25) }),
 *   { name: "John", age: O.some(25) }
 * )
 * assert.deepStrictEqual(
 *   PersonSemigroup.combine({ name: "John", age: O.some(25) }, { name: "John", age: O.none() }),
 *   { name: "John", age: O.some(25) }
 * )
 *
 * @category combinators
 * @since 1.0.0
 */
export const getSemigroup: <R extends { readonly [x: string]: semigroup.Semigroup<any> }>(
  fields: R
) => semigroup.Semigroup<
  { [K in keyof R]: [R[K]] extends [semigroup.Semigroup<infer A>] ? A : never }
> = semigroup.struct

/**
 * This function creates and returns a new `Monoid` for a struct of values based on the given `Monoid`s for each property in the struct.
 * The returned `Monoid` combines two structs of the same type by applying the corresponding `Monoid` passed as arguments to each property in the struct.
 *
 * The `empty` value of the returned `Monoid` is a struct where each property is the `empty` value of the corresponding `Monoid` in the input `monoids` object.
 *
 * It is useful when you need to combine two structs of the same type and you have a specific way of combining each property of the struct.
 *
 * See also {@link getSemigroup}.
 *
 * @category combinators
 * @since 1.0.0
 */
export const getMonoid: <R extends { readonly [x: string]: monoid.Monoid<any> }>(
  fields: R
) => monoid.Monoid<{ [K in keyof R]: [R[K]] extends [monoid.Monoid<infer A>] ? A : never }> =
  monoid.struct
