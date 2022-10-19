/**
 * @since 1.0.0
 */
export interface Equivalence<A, B> {
  readonly to: (a: A) => B
  readonly from: (b: B) => A
}
