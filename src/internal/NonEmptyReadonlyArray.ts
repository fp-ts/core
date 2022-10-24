/**
 * @since 1.0.0
 */

/**
 * @since 1.0.0
 */
export const isNonEmpty = <A>(self: ReadonlyArray<A>): self is readonly [A, ...ReadonlyArray<A>] =>
  self.length > 0

/**
 * @since 1.0.0
 */
export const head = <A>(as: readonly [A, ...ReadonlyArray<A>]): A => as[0]

/**
 * @since 1.0.0
 */
export const tail = <A>(as: readonly [A, ...ReadonlyArray<A>]): ReadonlyArray<A> => as.slice(1)
