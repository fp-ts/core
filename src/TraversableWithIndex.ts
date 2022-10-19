/**
 * @since 1.0.0
 */
import type { Applicative } from "@fp-ts/core/Applicative"
import type { FunctorWithIndex } from "@fp-ts/core/FunctorWithIndex"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type { Traversable } from "@fp-ts/core/Traversable"

/**
 * @category type class
 * @since 1.0.0
 */
export interface TraversableWithIndex<T extends TypeLambda, I> extends FunctorWithIndex<T, I> {
  readonly traverseWithIndex: <F extends TypeLambda>(
    Applicative: Applicative<F>
  ) => <A, S, R, O, E, B>(
    f: (a: A, i: I) => Kind<F, S, R, O, E, B>
  ) => <TS, TR, TO, TE>(
    self: Kind<T, TS, TR, TO, TE, A>
  ) => Kind<F, S, R, O, E, Kind<T, TS, TR, TO, TE, B>>
}

/**
 * Returns a default `traverseWithIndex` composition.
 *
 * @since 1.0.0
 */
export const traverseWithIndexComposition = <F extends TypeLambda, I, G extends TypeLambda, J>(
  TraversableWithIndexF: TraversableWithIndex<F, I>,
  TraversableWithIndexG: TraversableWithIndex<G, J>
) =>
  <H extends TypeLambda>(Applicative: Applicative<H>) =>
    <A, S, R, O, E, B>(
      f: (a: A, ij: readonly [I, J]) => Kind<H, S, R, O, E, B>
    ): (<FS, FR, FO, FE, GS, GR, GO, GE>(
      fga: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
    ) => Kind<H, S, R, O, E, Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>>) =>
      TraversableWithIndexF.traverseWithIndex(Applicative)((ga, i) =>
        TraversableWithIndexG.traverseWithIndex(Applicative)<A, S, R, O, E, B>((a, j) =>
          f(a, [i, j])
        )(ga)
      )

/**
 * Returns a default `traverse` implementation.
 *
 * @since 1.0.0
 */
export const traverse = <F extends TypeLambda, I>(
  TraversableWithIndex: TraversableWithIndex<F, I>
): Traversable<F>["traverse"] => f => TraversableWithIndex.traverseWithIndex(f)
