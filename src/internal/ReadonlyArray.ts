/**
 * @since 1.0.0
 */

import type { NonEmptyArray, NonEmptyReadonlyArray } from "@fp-ts/core/ReadonlyArray"

/** @internal */
export function isNonEmpty<A>(self: Array<A>): self is NonEmptyArray<A>
export function isNonEmpty<A>(self: ReadonlyArray<A>): self is NonEmptyReadonlyArray<A>
export function isNonEmpty<A>(self: ReadonlyArray<A>): self is readonly [] {
  return self.length > 0
}

/** @internal */
export const fromIterable = <A>(collection: Iterable<A>): Array<A> =>
  Array.isArray(collection) ? collection : Array.from(collection)
