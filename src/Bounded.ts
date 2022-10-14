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
  readonly maximum: A
  readonly minimum: A
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromSortable = <A>(Sortable: Sortable<A>, maximum: A, minimum: A): Bounded<A> => ({
  ...Sortable,
  maximum,
  minimum
})

/**
 * Clamp a value between `minimum` and `maximum` values.
 *
 * @since 3.0.0
 */
export const clamp = <A>(B: Bounded<A>): (a: A) => A => compare.clamp(B)(B.minimum, B.maximum)

/**
 * Reverses the `Ord` of a `Bounded` and flips `maximum` and `minimum` values.
 *
 * @since 3.0.0
 */
export const reverse = <A>(Bounded: Bounded<A>): Bounded<A> =>
  fromSortable(
    compare.reverse(Bounded),
    Bounded.minimum,
    Bounded.maximum
  )
