/**
 * @since 1.0.0
 */
import * as monoid from "@fp-ts/core/Monoid"
import type * as semigroup from "@fp-ts/core/Semigroup"

/**
 * @category type class
 * @since 1.0.0
 */
export type Ordering = -1 | 0 | 1

/**
 * @since 1.0.0
 */
export const reverse = (o: Ordering): Ordering => (o === -1 ? 1 : o === 1 ? -1 : 0)

// -------------------------------------------------------------------------------------
// pattern matching
// -------------------------------------------------------------------------------------

/**
 * @category pattern matching
 * @since 1.0.0
 */
export const match = <A, B, C = B>(
  onLessThan: () => A,
  onEqual: () => B,
  onGreaterThan: () => C
) => (o: Ordering): A | B | C => o === -1 ? onLessThan() : o === 0 ? onEqual() : onGreaterThan()

/**
 * @category instances
 * @since 1.0.0
 */
export const Semigroup: semigroup.Semigroup<Ordering> = {
  combine: (o1, o2) => o1 !== 0 ? o1 : o2,
  combineMany: (start, others) => {
    let ordering = start
    if (ordering !== 0) {
      return ordering
    }
    for (ordering of others) {
      if (ordering !== 0) {
        return ordering
      }
    }
    return ordering
  }
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Monoid: monoid.Monoid<Ordering> = monoid.fromSemigroup(Semigroup, 0)

/**
 * @since 1.0.0
 */
export const sign = (n: number): Ordering => (n <= -1 ? -1 : n >= 1 ? 1 : 0)
