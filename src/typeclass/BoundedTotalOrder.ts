/**
 * @since 1.0.0
 */
import type { TypeLambda } from "@fp-ts/core/HKT"
import * as compare from "@fp-ts/core/typeclass/TotalOrder"
import type { TotalOrder } from "@fp-ts/core/typeclass/TotalOrder"

/**
 * @category type class
 * @since 1.0.0
 */
export interface BoundedTotalOrder<A> extends TotalOrder<A> {
  readonly minimum: A
  readonly maximum: A
}

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface BoundedTotalOrderTypeLambda extends TypeLambda {
  readonly type: BoundedTotalOrder<this["Target"]>
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const fromTotalOrder = <A>(
  TotalOrder: TotalOrder<A>,
  minimum: A,
  maximum: A
): BoundedTotalOrder<A> => ({
  ...TotalOrder,
  maximum,
  minimum
})

/**
 * Clamp a value between `minimum` and `maximum` values.
 *
 * @since 1.0.0
 */
export const clamp = <A>(BoundedTotalOrder: BoundedTotalOrder<A>): (a: A) => A =>
  compare.clamp(BoundedTotalOrder)(BoundedTotalOrder.minimum, BoundedTotalOrder.maximum)

/**
 * Reverses the `Ord` of a `Bounded` and flips `maximum` and `minimum` values.
 *
 * @since 1.0.0
 */
export const reverse = <A>(BoundedTotalOrder: BoundedTotalOrder<A>): BoundedTotalOrder<A> =>
  fromTotalOrder(
    compare.reverse(BoundedTotalOrder),
    BoundedTotalOrder.minimum,
    BoundedTotalOrder.maximum
  )
