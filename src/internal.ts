/**
 * @since 3.0.0
 */

// -------------------------------------------------------------------------------------
// ReadonlyArray
// -------------------------------------------------------------------------------------

/** @internal */
export const empty: readonly [] = []

/** @internal */
export const Arrayfrom = <A>(collection: Iterable<A>): ReadonlyArray<A> =>
  Array.isArray(collection) ? collection : Array.from(collection)

// -------------------------------------------------------------------------------------
// Record
// -------------------------------------------------------------------------------------

/** @internal */
export const Do: Readonly<{}> = {}

/** @internal */
export const has = Object.prototype.hasOwnProperty

// -------------------------------------------------------------------------------------
// NonEmptyArray
// -------------------------------------------------------------------------------------

/**
 * @internal
 * @since 3.0.0
 */
export type NonEmptyArray<A> = [A, ...Array<A>]

/** @internal */
export const toNonEmptyArray = <A>(a: A): NonEmptyArray<A> => [a]
