/**
 * @since 1.0.0
 */
import type { LazyArg } from "@fp-ts/core/Function"
import type { Refinement } from "@fp-ts/core/Predicate"
import type * as monoid from "@fp-ts/core/typeclass/Monoid"
import type * as order from "@fp-ts/core/typeclass/Order"
import type * as semigroup from "@fp-ts/core/typeclass/Semigroup"

/**
 * @category refinements
 * @since 1.0.0
 */
export const isBoolean: Refinement<unknown, boolean> = (u: unknown): u is boolean =>
  typeof u === "boolean"

/**
 * @since 1.0.0
 */
export const and = (that: boolean) => (self: boolean): boolean => self && that

/**
 * @since 1.0.0
 */
export const or = (that: boolean) => (self: boolean): boolean => self || that

/**
 * Defines the match over a boolean value.
 * Takes two thunks `onTrue`, `onFalse` and a `boolean` value.
 * If `value` is `false`, `onFalse()` is returned, otherwise `onTrue()`.
 *
 * @example
 * import { some, map } from '@fp-ts/data/Option'
 * import { pipe } from '@fp-ts/data/Function'
 * import { match } from '@fp-ts/data/Boolean'
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
export const match = <A, B = A>(onFalse: LazyArg<A>, onTrue: LazyArg<B>) =>
  (value: boolean): A | B => value ? onTrue() : onFalse()

/**
 * `boolean` semigroup under conjunction.
 *
 * @example
 * import { SemigroupAll } from '@fp-ts/data/Boolean'
 * import { pipe } from '@fp-ts/data/Function'
 *
 * assert.deepStrictEqual(pipe(true, SemigroupAll.combine(true)), true)
 * assert.deepStrictEqual(pipe(true, SemigroupAll.combine(false)), false)
 *
 * @category instances
 * @since 1.0.0
 */
export const SemigroupAll: semigroup.Semigroup<boolean> = {
  combine: and,
  combineMany: (collection) =>
    (self) => {
      if (self === false) {
        return false
      }
      for (const b of collection) {
        if (b === false) {
          return false
        }
      }
      return true
    }
}

/**
 * `boolean` semigroup under disjunction.
 *
 * @example
 * import { SemigroupAny } from '@fp-ts/data/Boolean'
 * import { pipe } from '@fp-ts/data/Function'
 *
 * assert.deepStrictEqual(pipe(true, SemigroupAny.combine(true)), true)
 * assert.deepStrictEqual(pipe(true, SemigroupAny.combine(false)), true)
 * assert.deepStrictEqual(pipe(false, SemigroupAny.combine(false)), false)
 *
 * @category instances
 * @since 1.0.0
 */
export const SemigroupAny: semigroup.Semigroup<boolean> = {
  combine: or,
  combineMany: (collection) =>
    (self) => {
      if (self === true) {
        return true
      }
      for (const b of collection) {
        if (b === true) {
          return true
        }
      }
      return false
    }
}

/**
 * `boolean` monoid under conjunction.
 *
 * The `empty` value is `true`.
 *
 * @category instances
 * @since 1.0.0
 */
export const MonoidAll: monoid.Monoid<boolean> = {
  ...SemigroupAll,
  combineAll: (all) => SemigroupAll.combineMany(all)(true),
  empty: true
}

/**
 * `boolean` monoid under disjunction.
 *
 * The `empty` value is `false`.
 *
 * @category instances
 * @since 1.0.0
 */
export const MonoidAny: monoid.Monoid<boolean> = {
  ...SemigroupAny,
  combineAll: (all) => SemigroupAny.combineMany(all)(false),
  empty: false
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Order: order.Order<boolean> = {
  compare: (that) => (self) => self < that ? -1 : self > that ? 1 : 0
}
