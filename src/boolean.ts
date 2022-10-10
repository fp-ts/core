/**
 * @since 3.0.0
 */
import type { LazyArg } from "@fp-ts/core/Function"
import type { Refinement } from "@fp-ts/core/Refinement"
import * as eq from "@fp-ts/core/typeclasses/Eq"
import type { Monoid } from "@fp-ts/core/typeclasses/Monoid"
import * as monoid from "@fp-ts/core/typeclasses/Monoid"
import type * as ord from "@fp-ts/core/typeclasses/Ord"
import type { Semigroup } from "@fp-ts/core/typeclasses/Semigroup"
import type * as show_ from "@fp-ts/core/typeclasses/Show"

// -------------------------------------------------------------------------------------
// refinements
// -------------------------------------------------------------------------------------

/**
 * @category refinements
 * @since 3.0.0
 */
export const isBoolean: Refinement<unknown, boolean> = (u: unknown): u is boolean =>
  typeof u === "boolean"

// -------------------------------------------------------------------------------------
// pattern matching
// -------------------------------------------------------------------------------------

/**
 * Defines the match over a boolean value.
 * Takes two thunks `onTrue`, `onFalse` and a `boolean` value.
 * If `value` is `false`, `onFalse()` is returned, otherwise `onTrue()`.
 *
 * @example
 * import { some, map } from '@fp-ts/core/Option'
 * import { pipe } from '@fp-ts/core/Function'
 * import { match } from '@fp-ts/core/boolean'
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
 * @since 3.0.0
 */
export const match = <A, B = A>(onFalse: LazyArg<A>, onTrue: LazyArg<B>) =>
  (value: boolean): A | B => value ? onTrue() : onFalse()

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Eq: eq.Eq<boolean> = eq.EqStrict

/**
 * @since 3.0.0
 */
export const and = (that: boolean) => (self: boolean): boolean => self && that

/**
 * `boolean` semigroup under conjunction.
 *
 * @example
 * import { SemigroupAnd } from '@fp-ts/core/boolean'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe(true, SemigroupAnd.combine(true)), true)
 * assert.deepStrictEqual(pipe(true, SemigroupAnd.combine(false)), false)
 *
 * @category instances
 * @since 3.0.0
 */
export const SemigroupAnd: Semigroup<boolean> = {
  combine: and
}

/**
 * @since 3.0.0
 */
export const or = (that: boolean) => (self: boolean): boolean => self || that

/**
 * `boolean` semigroup under disjunction.
 *
 * @example
 * import { SemigroupOr } from '@fp-ts/core/boolean'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe(true, SemigroupOr.combine(true)), true)
 * assert.deepStrictEqual(pipe(true, SemigroupOr.combine(false)), true)
 * assert.deepStrictEqual(pipe(false, SemigroupOr.combine(false)), false)
 *
 * @category instances
 * @since 3.0.0
 */
export const SemigroupOr: Semigroup<boolean> = {
  combine: or
}

/**
 * `boolean` monoid under conjunction.
 *
 * The `empty` value is `true`.
 *
 * @category instances
 * @since 3.0.0
 */
export const MonoidAnd: Monoid<boolean> = {
  combine: SemigroupAnd.combine,
  empty: true
}

/**
 * @since 3.0.0
 */
export const andAll: (collection: Iterable<boolean>) => boolean = monoid.combineAll(MonoidAnd)

/**
 * `boolean` monoid under disjunction.
 *
 * The `empty` value is `false`.
 *
 * @category instances
 * @since 3.0.0
 */
export const MonoidOr: Monoid<boolean> = {
  combine: SemigroupOr.combine,
  empty: false
}

/**
 * @since 3.0.0
 */
export const orAll: (collection: Iterable<boolean>) => boolean = monoid.combineAll(MonoidOr)

/**
 * @category instances
 * @since 3.0.0
 */
export const Ord: ord.Ord<boolean> = {
  compare: (that) => (self) => self < that ? -1 : self > that ? 1 : 0
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Show: show_.Show<boolean> = {
  show: (a) => JSON.stringify(a)
}
