/**
 * @since 1.0.0
 */

/**
 * @category models
 * @since 1.0.0
 */
export type NonEmptyReadonlyArray<A> = readonly [A, ...Array<A>]

/**
 * @since 1.0.0
 */
export const isNonEmpty = <A>(as: ReadonlyArray<A>): as is NonEmptyReadonlyArray<A> => as.length > 0
