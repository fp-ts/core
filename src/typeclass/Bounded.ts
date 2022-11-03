/**
 * @since 1.0.0
 */
import type { TypeLambda, Variance } from "@fp-ts/core/HKT"
import * as order from "@fp-ts/core/typeclass/Order"
import type { Order } from "@fp-ts/core/typeclass/Order"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Bounded<A> extends Order<A> {
  readonly maxBound: A
  readonly minBound: A
}

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface BoundedTypeLambda extends TypeLambda<Variance.Invariant> {
  readonly type: Bounded<this["Target"]>
}

/**
 * Clamp a value between `minBound` and `maxBound` values.
 *
 * @since 1.0.0
 */
export const clamp = <A>(B: Bounded<A>): (a: A) => A => order.clamp(B)(B.minBound, B.maxBound)

/**
 * Reverses the `Order` of a `Bounded` and flips `maxBound` and `minBound` values.
 *
 * @since 1.0.0
 */
export const reverse = <A>(B: Bounded<A>): Bounded<A> => ({
  ...order.reverse(B),
  minBound: B.minBound,
  maxBound: B.maxBound
})
