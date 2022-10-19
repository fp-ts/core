/**
 * @since 1.0.0
 */
import * as compare from "@fp-ts/core/typeclass/TotalOrder"
import type { TotalOrder } from "@fp-ts/core/typeclass/TotalOrder"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Bounded<A> extends TotalOrder<A> {
  readonly minimum: A
  readonly maximum: A
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const fromTotalOrder = <A>(
  TotalOrder: TotalOrder<A>,
  minimum: A,
  maximum: A
): Bounded<A> => ({
  ...TotalOrder,
  maximum,
  minimum
})

/**
 * Clamp a value between `minimum` and `maximum` values.
 *
 * @since 1.0.0
 */
export const clamp = <A>(Bounded: Bounded<A>): (a: A) => A =>
  compare.clamp(Bounded)(Bounded.minimum, Bounded.maximum)

/**
 * Reverses the `Ord` of a `Bounded` and flips `maximum` and `minimum` values.
 *
 * @since 1.0.0
 */
export const reverse = <A>(Bounded: Bounded<A>): Bounded<A> =>
  fromTotalOrder(
    compare.reverse(Bounded),
    Bounded.minimum,
    Bounded.maximum
  )
