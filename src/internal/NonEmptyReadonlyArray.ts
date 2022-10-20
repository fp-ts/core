/**
 * @since 1.0.0
 */

/**
 * @since 1.0.0
 */
export const mapWithIndex = <A, B>(f: (a: A, i: number) => B) =>
  (self: readonly [A, ...ReadonlyArray<A>]): [B, ...ReadonlyArray<B>] => self.map(f) as any
