/**
 * @since 1.0.0
 */

/**
 * @since 1.0.0
 */
export const empty: readonly [] = []

/**
 * @since 1.0.0
 */
export const fromIterable = <A>(collection: Iterable<A>): ReadonlyArray<A> =>
  Array.isArray(collection) ? collection : Array.from(collection)
