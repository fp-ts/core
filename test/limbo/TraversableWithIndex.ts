/**
 * @since 1.0.0
 */
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import type { Applicative } from "@fp-ts/core/typeclass/Applicative"
import type { Traversable } from "@fp-ts/core/typeclass/Traversable"

/**
 * @category type class
 * @since 1.0.0
 */
export interface TraversableWithIndex<T extends TypeLambda, I> extends TypeClass<T> {
  traverseWithIndex: <F extends TypeLambda>(
    F: Applicative<F>
  ) => <A, R, O, E, B>(
    f: (a: A, i: I) => Kind<F, R, O, E, B>
  ) => <TR, TO, TE>(
    self: Kind<T, TR, TO, TE, A>
  ) => Kind<F, R, O, E, Kind<T, TR, TO, TE, B>>
}

/**
 * Returns a default `traverseWithIndex` composition.
 *
 * @since 1.0.0
 */
export const traverseWithIndexComposition = <F extends TypeLambda, I, G extends TypeLambda, J>(
  F: TraversableWithIndex<F, I>,
  G: TraversableWithIndex<G, J>
) =>
  <H extends TypeLambda>(H: Applicative<H>) =>
    <A, R, O, E, B>(
      f: (a: A, ij: [I, J]) => Kind<H, R, O, E, B>
    ): (<FR, FO, FE, GR, GO, GE>(
      fga: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>
    ) => Kind<H, R, O, E, Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, B>>>) =>
      F.traverseWithIndex(H)((ga, i) =>
        G.traverseWithIndex(H)<A, R, O, E, B>((a, j) => f(a, [i, j]))(ga)
      )

/**
 * Returns a default `traverse` implementation.
 *
 * @since 1.0.0
 */
export const traverse = <F extends TypeLambda, I>(
  F: TraversableWithIndex<F, I>
): Traversable<F>["traverse"] => f => F.traverseWithIndex(f)
