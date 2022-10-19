/**
 * @since 1.0.0
 */

/**
 * @category data type
 * @since 1.0.0
 */
export interface Equivalence<A, B> {
  readonly to: (a: A) => B
  readonly from: (b: B) => A
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const make = <A, B>(to: (a: A) => B, from: (b: B) => A): Equivalence<A, B> => ({
  to,
  from
})
