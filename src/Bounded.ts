/**
 * @since 3.0.0
 */
import * as compare from "@fp-ts/core/Compare"
import type { Compare } from "@fp-ts/core/Compare"

/**
 * @category type class
 * @since 3.0.0
 */
export interface Bounded<A> extends Compare<A> {
  readonly top: A
  readonly bottom: A
}

/**
 * Clamp a value between `bottom` and `top` values.
 *
 * @since 3.0.0
 */
export const clamp = <A>(B: Bounded<A>): (a: A) => A => compare.clamp(B)(B.bottom, B.top)

/**
 * Reverses the `Ord` of a `Bounded` and flips `top` and `bottom` values.
 *
 * @since 3.0.0
 */
export const reverse = <A>(Bounded: Bounded<A>): Bounded<A> => ({
  compare: compare.reverse(Bounded).compare,
  top: Bounded.bottom,
  bottom: Bounded.top
})
