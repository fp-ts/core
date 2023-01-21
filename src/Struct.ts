/**
 * This module provides utility functions for working with structs in TypeScript.
 *
 * @since 1.0.0
 */
import * as equivalence from "@fp-ts/core/typeclass/Equivalence"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import * as order from "@fp-ts/core/typeclass/Order"
import * as _product from "@fp-ts/core/typeclass/Product"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"
import * as semiProduct from "@fp-ts/core/typeclass/SemiProduct"

/**
 * Create a new object by picking properties of an existing object.
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
 * @since 1.0.0
 */
export const getEquivalence = equivalence.struct

/**
 * @since 1.0.0
 */
export const getOrder = order.struct

/**
 * @since 1.0.0
 */
export const getSemigroup = semigroup.struct

/**
 * @since 1.0.0
 */
export const getMonoid = monoid.struct

/**
 * @since 1.0.0
 */
export const nonEmptyProduct = semiProduct.nonEmptyStruct

/**
 * @since 1.0.0
 */
export const product = _product.struct
