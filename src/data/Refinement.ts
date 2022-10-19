/**
 * @since 1.0.0
 */

/**
 * @category models
 * @since 1.0.0
 */
export interface Refinement<A, B extends A> {
  (a: A): a is B
}
