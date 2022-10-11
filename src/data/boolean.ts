/**
 * @since 3.0.0
 */
import type { LazyArg } from "@fp-ts/core/data/Function"
import type { Refinement } from "@fp-ts/core/data/Refinement"
import * as eq from "@fp-ts/core/typeclasses/Eq"
import * as monoid from "@fp-ts/core/typeclasses/Monoid"
import type * as ord from "@fp-ts/core/typeclasses/Ord"
import type * as semigroup from "@fp-ts/core/typeclasses/Semigroup"
import type * as show from "@fp-ts/core/typeclasses/Show"

/**
 * @category refinements
 * @since 3.0.0
 */
export const isBoolean: Refinement<unknown, boolean> = (u: unknown): u is boolean =>
  typeof u === "boolean"

/**
 * @since 3.0.0
 */
export const and = (that: boolean) => (self: boolean): boolean => self && that

/**
 * @since 3.0.0
 */
export const or = (that: boolean) => (self: boolean): boolean => self || that

/**
 * Defines the match over a boolean value.
 * Takes two thunks `onTrue`, `onFalse` and a `boolean` value.
 * If `value` is `false`, `onFalse()` is returned, otherwise `onTrue()`.
 *
 * @example
 * import { some, map } from '@fp-ts/core/data/Option'
 * import { pipe } from '@fp-ts/core/data/Function'
 * import { match } from '@fp-ts/core/data/boolean'
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

/**
 * @category instances
 * @since 3.0.0
 */
export const Eq: eq.Eq<boolean> = eq.EqStrict

/**
 * `boolean` semigroup under conjunction.
 *
 * @example
 * import { SemigroupAll } from '@fp-ts/core/data/boolean'
 * import { pipe } from '@fp-ts/core/data/Function'
 *
 * assert.deepStrictEqual(pipe(true, SemigroupAll.combine(true)), true)
 * assert.deepStrictEqual(pipe(true, SemigroupAll.combine(false)), false)
 *
 * @category instances
 * @since 3.0.0
 */
export const SemigroupAll: semigroup.Semigroup<boolean> = {
  combine: and
}

/**
 * `boolean` semigroup under disjunction.
 *
 * @example
 * import { SemigroupAny } from '@fp-ts/core/data/boolean'
 * import { pipe } from '@fp-ts/core/data/Function'
 *
 * assert.deepStrictEqual(pipe(true, SemigroupAny.combine(true)), true)
 * assert.deepStrictEqual(pipe(true, SemigroupAny.combine(false)), true)
 * assert.deepStrictEqual(pipe(false, SemigroupAny.combine(false)), false)
 *
 * @category instances
 * @since 3.0.0
 */
export const SemigroupAny: semigroup.Semigroup<boolean> = {
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
export const MonoidAll: monoid.Monoid<boolean> = {
  combine: SemigroupAll.combine,
  empty: true
}

/**
 * `boolean` monoid under disjunction.
 *
 * The `empty` value is `false`.
 *
 * @category instances
 * @since 3.0.0
 */
export const MonoidAny: monoid.Monoid<boolean> = {
  combine: SemigroupAny.combine,
  empty: false
}

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
export const Show: show.Show<boolean> = {
  show: (b) => JSON.stringify(b)
}

/**
 * @since 3.0.0
 */
export const all: (collection: Iterable<boolean>) => boolean = monoid.combineAll(MonoidAll)

/**
 * @since 3.0.0
 */
export const any: (collection: Iterable<boolean>) => boolean = monoid.combineAll(MonoidAny)
