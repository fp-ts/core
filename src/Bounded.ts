/**
 * @since 3.0.0
 */
import * as compare from "@fp-ts/core/Sortable"
import type { Sortable } from "@fp-ts/core/Sortable"

/**
 * @category type class
 * @since 3.0.0
 */
export interface Bounded<A> extends Sortable<A> {
  readonly top: A
  readonly bottom: A
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromSortable = <A>(Sortable: Sortable<A>, top: A, bottom: A): Bounded<A> => ({
  ...Sortable,
  top,
  bottom
})

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
