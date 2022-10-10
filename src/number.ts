/**
 * @since 3.0.0
 */
import type { Refinement } from "@fp-ts/core/Refinement"
import type * as bounded from "@fp-ts/core/typeclasses/Bounded"
import * as eq from "@fp-ts/core/typeclasses/Eq"
import type { Monoid } from "@fp-ts/core/typeclasses/Monoid"
import * as monoid from "@fp-ts/core/typeclasses/Monoid"
import type * as ord from "@fp-ts/core/typeclasses/Ord"
import type { Semigroup } from "@fp-ts/core/typeclasses/Semigroup"
import type * as show_ from "@fp-ts/core/typeclasses/Show"

/**
 * @category refinements
 * @since 3.0.0
 */
export const isNumber: Refinement<unknown, number> = (u: unknown): u is number =>
  typeof u === "number"

/**
 * @since 3.0.0
 */
export const sum = (that: number) => (self: number): number => self + that

/**
 * @since 3.0.0
 */
export const multiply = (that: number) => (self: number): number => self * that

/**
 * @since 3.0.0
 */
export const sub = (that: number) => (self: number): number => self - that

/**
 * @category instances
 * @since 3.0.0
 */
export const Eq: eq.Eq<number> = eq.EqStrict

/**
 * @category instances
 * @since 3.0.0
 */
export const Ord: ord.Ord<number> = {
  compare: (that) => (self) => self < that ? -1 : self > that ? 1 : 0
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bounded: bounded.Bounded<number> = {
  compare: Ord.compare,
  top: Infinity,
  bottom: -Infinity
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Show: show_.Show<number> = {
  show: (a) => JSON.stringify(a)
}

/**
 * `number` semigroup under addition.
 *
 * @example
 * import { SemigroupSum } from '@fp-ts/core/number'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe(2, SemigroupSum.combine(3)), 5)
 *
 * @category instances
 * @since 3.0.0
 */
export const SemigroupSum: Semigroup<number> = {
  combine: sum
}

/**
 * `number` semigroup under multiplication.
 *
 * @example
 * import { SemigroupMultiply } from '@fp-ts/core/number'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe(2, SemigroupMultiply.combine(3)), 6)
 *
 * @category instances
 * @since 3.0.0
 */
export const SemigroupMultiply: Semigroup<number> = {
  combine: multiply
}

/**
 * `number` monoid under addition.
 *
 * The `empty` value is `0`.
 *
 * @category instances
 * @since 3.0.0
 */
export const MonoidSum: Monoid<number> = {
  combine: SemigroupSum.combine,
  empty: 0
}

/**
 * `number` monoid under multiplication.
 *
 * The `empty` value is `1`.
 *
 * @category instances
 * @since 3.0.0
 */
export const MonoidMultiply: Monoid<number> = {
  combine: SemigroupMultiply.combine,
  empty: 1
}

/**
 * @since 3.0.0
 */
export const sumAll: (collection: Iterable<number>) => number = monoid.combineAll(MonoidSum)

/**
 * @since 3.0.0
 */
export const multiplyAll: (collection: Iterable<number>) => number = monoid.combineAll(
  MonoidMultiply
)
