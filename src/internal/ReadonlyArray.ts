/**
 * @since 1.0.0
 */

import type { NonEmptyReadonlyArray } from "@fp-ts/core/ReadonlyArray"

/** @internal */
export const isNonEmpty = <A>(as: ReadonlyArray<A>): as is NonEmptyReadonlyArray<A> => as.length > 0

/** @internal */
export const fromIterable = <A>(collection: Iterable<A>): Array<A> =>
  Array.isArray(collection) ? collection : Array.from(collection)
