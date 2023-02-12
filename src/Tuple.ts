/**
 * This module provides utility functions for working with tuples in TypeScript.
 *
 * @since 1.0.0
 */
import { dual } from "@fp-ts/core/Function"
import * as equivalence from "@fp-ts/core/typeclass/Equivalence"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import * as order from "@fp-ts/core/typeclass/Order"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"

/**
 * @category constructors
 * @since 1.0.0
 */
export const tuple = <A extends ReadonlyArray<any>>(...elements: A): A => elements

/**
 * Given a tuple of `Equivalence`s returns a new `Equivalence` that compares values of a tuple
 * by applying each `Equivalence` to the corresponding element of the tuple.
 *
 * @category combinators
 * @since 1.0.0
 */
export const getEquivalence: <T extends ReadonlyArray<equivalence.Equivalence<any>>>(
  ...predicates: T
) => equivalence.Equivalence<
  Readonly<{ [I in keyof T]: [T[I]] extends [equivalence.Equivalence<infer A>] ? A : never }>
> = equivalence.tuple

/**
 * This function creates and returns a new `Order` for a tuple of values based on the given `Order`s for each element in the tuple.
 * The returned `Order` compares two tuples of the same type by applying the corresponding `Order` to each element in the tuple.
 * It is useful when you need to compare two tuples of the same type and you have a specific way of comparing each element
 * of the tuple.
 *
 * @category combinators
 * @since 1.0.0
 */
export const getOrder: <T extends ReadonlyArray<order.Order<any>>>(
  ...elements: T
) => order.Order<{ [I in keyof T]: [T[I]] extends [order.Order<infer A>] ? A : never }> =
  order.tuple

/**
 * This function creates and returns a new `Semigroup` for a tuple of values based on the given `Semigroup`s for each element in the tuple.
 * The returned `Semigroup` combines two tuples of the same type by applying the corresponding `Semigroup` passed as arguments to each element in the tuple.
 *
 * It is useful when you need to combine two tuples of the same type and you have a specific way of combining each element of the tuple.
 *
 * @category combinators
 * @since 1.0.0
 */
export const getSemigroup = semigroup.tuple

/**
 * This function creates and returns a new `Monoid` for a tuple of values based on the given `Monoid`s for each element in the tuple.
 * The returned `Monoid` combines two tuples of the same type by applying the corresponding `Monoid` passed as arguments to each element in the tuple.
 *
 * The `empty` value of the returned `Monoid` is the tuple of `empty` values of the input `Monoid`s.
 *
 * It is useful when you need to combine two tuples of the same type and you have a specific way of combining each element of the tuple.
 *
 * @category combinators
 * @since 1.0.0
 */
export const getMonoid = monoid.tuple

/**
 * Appends an element to the end of a tuple.
 *
 * @since 1.0.0
 */
export const appendElement: {
  <B>(that: B): <A extends ReadonlyArray<unknown>>(self: A) => [...A, B]
  <A extends ReadonlyArray<unknown>, B>(self: A, that: B): [...A, B]
} = dual(2, <A extends ReadonlyArray<unknown>, B>(self: A, that: B): [...A, B] => [...self, that])

/*

  TODO:

  - at
  - first
  - second
  - swap
  - bimap
  - mapLeft
  - map

*/
