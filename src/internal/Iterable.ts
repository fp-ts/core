/**
 * @since 1.0.0
 */

/** @internal */
export const fromIterable = <A>(collection: Iterable<A>): ReadonlyArray<A> =>
  Array.isArray(collection) ? collection : Array.from(collection)