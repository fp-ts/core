/**
 * @since 1.0.0
 */

import type { NonEmptyReadonlyArray } from "@fp-ts/core/data/NonEmptyReadonlyArray"

/**
 * @since 1.0.0
 */
export const isNonEmpty = <A>(self: ReadonlyArray<A>): self is NonEmptyReadonlyArray<A> =>
  self.length > 0

/**
 * @since 1.0.0
 */
export const head = <A>(as: NonEmptyReadonlyArray<A>): A => as[0]

/**
 * @since 1.0.0
 */
export const tail = <A>(as: NonEmptyReadonlyArray<A>): ReadonlyArray<A> => as.slice(1)
