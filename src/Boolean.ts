/**
 * @since 1.0.0
 */
import type { LazyArg } from "@fp-ts/core/Function"
import type { Refinement } from "@fp-ts/core/Predicate"
import * as predicate from "@fp-ts/core/Predicate"
import * as equivalence from "@fp-ts/core/typeclass/Equivalence"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import * as order from "@fp-ts/core/typeclass/Order"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"

/**
 * @category guards
 * @since 1.0.0
 */
export const isBoolean: Refinement<unknown, boolean> = predicate.isBoolean

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
export const match = <A, B = A>(onFalse: LazyArg<A>, onTrue: LazyArg<B>) =>
  (value: boolean): A | B => value ? onTrue() : onFalse()

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
 * assert.deepStrictEqual(pipe(true, SemigroupAll.combine(true)), true)
 * assert.deepStrictEqual(pipe(true, SemigroupAll.combine(false)), false)
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
 * assert.deepStrictEqual(pipe(true, SemigroupAny.combine(true)), true)
 * assert.deepStrictEqual(pipe(true, SemigroupAny.combine(false)), true)
 * assert.deepStrictEqual(pipe(false, SemigroupAny.combine(false)), false)
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
export const and: (that: boolean) => (self: boolean) => boolean = semigroup.booleanAll.combine

/**
 * @category combinators
 * @since 1.0.0
 */
export const or: (that: boolean) => (self: boolean) => boolean = semigroup.booleanAny.combine

/**
 * @category combinators
 * @since 1.0.0
 */
export const not = (self: boolean): boolean => !self
