/**
 * This module provides utility functions for working with tuples in TypeScript.
 *
 * @since 1.0.0
 */
import * as RA from "@fp-ts/core/ReadonlyArray"
import * as equivalence from "@fp-ts/core/typeclass/Equivalence"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import * as order from "@fp-ts/core/typeclass/Order"
import * as product_ from "@fp-ts/core/typeclass/Product"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"
import * as semiProduct from "@fp-ts/core/typeclass/SemiProduct"

/**
 * @category constructors
 * @since 1.0.0
 */
export const tuple = <A extends ReadonlyArray<any>>(...elements: A): A => elements

/**
 * Adds an element to the end of a tuple.
 *
 * @since 1.0.0
 */
export const element: <B>(that: ReadonlyArray<B>) => <A extends ReadonlyArray<unknown>>(
  self: ReadonlyArray<A>
) => Array<[...A, B]> = semiProduct.element(RA.SemiProduct) as any

/**
 * @since 1.0.0
 */
export const getEquivalence = equivalence.tuple

/**
 * @since 1.0.0
 */
export const getOrder = order.tuple

/**
 * @since 1.0.0
 */
export const getSemigroup = semigroup.tuple

/**
 * @since 1.0.0
 */
export const getMonoid = monoid.tuple

/**
 * @since 1.0.0
 */
export const nonEmptyProduct = semiProduct.nonEmptyTuple

/**
 * @since 1.0.0
 */
export const product = product_.tuple
