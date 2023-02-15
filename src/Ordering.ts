/**
 * @since 1.0.0
 */
import type { LazyArg } from "@fp-ts/core/Function"
import { dual } from "@fp-ts/core/Function"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"

/**
 * @category model
 * @since 1.0.0
 */
export type Ordering = -1 | 0 | 1

/**
 * Inverts the ordering of the input `Ordering`.
 *
 * @param o - The input `Ordering`.
 *
 * @example
 * import { reverse } from "@fp-ts/core/Ordering"
 *
 * assert.deepStrictEqual(reverse(1), -1)
 * assert.deepStrictEqual(reverse(-1), 1)
 * assert.deepStrictEqual(reverse(0), 0)
 *
 * @since 1.0.0
 */
export const reverse = (o: Ordering): Ordering => (o === -1 ? 1 : o === 1 ? -1 : 0)

/**
 * Depending on the `Ordering` parameter given to it, returns a value produced by one of the 3 functions provided as parameters.
 *
 * @param self - The `Ordering` parameter to match against.
 * @param onLessThan - A function that will be called if the `Ordering` parameter is `-1`.
 * @param onEqual - A function that will be called if the `Ordering` parameter is `0`.
 * @param onGreaterThan - A function that will be called if the `Ordering` parameter is `1`.
 *
 * @example
 * import { match } from "@fp-ts/core/Ordering"
 * import { constant } from "@fp-ts/core/Function"
 *
 * const toMessage = match(
 *   constant('less than'),
 *   constant('equal'),
 *   constant('greater than')
 * )
 *
 * assert.deepStrictEqual(toMessage(-1), "less than")
 * assert.deepStrictEqual(toMessage(0), "equal")
 * assert.deepStrictEqual(toMessage(1), "greater than")
 *
 * @category pattern matching
 * @since 1.0.0
 */
export const match: {
  <A, B, C = B>(
    onLessThan: LazyArg<A>,
    onEqual: LazyArg<B>,
    onGreaterThan: LazyArg<C>
  ): (self: Ordering) => A | B | C
  <A, B, C = B>(
    o: Ordering,
    onLessThan: LazyArg<A>,
    onEqual: LazyArg<B>,
    onGreaterThan: LazyArg<C>
  ): A | B | C
} = dual(4, <A, B, C = B>(
  self: Ordering,
  onLessThan: LazyArg<A>,
  onEqual: LazyArg<B>,
  onGreaterThan: LazyArg<C>
): A | B | C => self === -1 ? onLessThan() : self === 0 ? onEqual() : onGreaterThan())

/**
 * `Semigroup` instance for `Ordering`, returns the left-most non-zero `Ordering`.
 *
 * @example
 * import { Semigroup } from "@fp-ts/core/Ordering"
 *
 * assert.deepStrictEqual(Semigroup.combine(0, -1), -1)
 * assert.deepStrictEqual(Semigroup.combine(0, 1), 1)
 * assert.deepStrictEqual(Semigroup.combine(1, -1), 1)
 *
 * @category instances
 * @since 1.0.0
 */
export const Semigroup: semigroup.Semigroup<Ordering> = semigroup.make(
  (self, that) => self !== 0 ? self : that,
  (self, collection) => {
    let ordering = self
    if (ordering !== 0) {
      return ordering
    }
    for (ordering of collection) {
      if (ordering !== 0) {
        return ordering
      }
    }
    return ordering
  }
)

/**
 * `Monoid` instance for `Ordering`, returns the left-most non-zero `Ordering`.
 *
 * The `empty` value is `0`.
 *
 * @example
 * import { Monoid } from "@fp-ts/core/Ordering"
 *
 * assert.deepStrictEqual(Monoid.combine(Monoid.empty, -1), -1)
 * assert.deepStrictEqual(Monoid.combine(Monoid.empty, 1), 1)
 * assert.deepStrictEqual(Monoid.combine(1, -1), 1)
 *
 * @category instances
 * @since 1.0.0
 */
export const Monoid: monoid.Monoid<Ordering> = monoid.fromSemigroup(Semigroup, 0)
