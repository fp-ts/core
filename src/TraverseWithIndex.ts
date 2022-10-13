/**
 * @since 3.0.0
 */
import type { Applicative } from "@fp-ts/core/Applicative"
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"

/**
 * @category type class
 * @since 3.0.0
 */
export interface TraverseWithIndex<T extends TypeLambda, I> extends TypeClass<T> {
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
 * @since 3.0.0
 */
export const traverseWithIndexComposition = <F extends TypeLambda, I, G extends TypeLambda, J>(
  TraverseWithIndexF: TraverseWithIndex<F, I>,
  TraverseWithIndexG: TraverseWithIndex<G, J>
) =>
  <H extends TypeLambda>(H: Applicative<H>) =>
    <A, S, R, O, E, B>(
      f: (a: A, ij: readonly [I, J]) => Kind<H, S, R, O, E, B>
    ): (<FS, FR, FO, FE, GS, GR, GO, GE>(
      fga: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
    ) => Kind<H, S, R, O, E, Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>>) =>
      TraverseWithIndexF.traverseWithIndex(H)((ga, i) =>
        TraverseWithIndexG.traverseWithIndex(H)<A, S, R, O, E, B>((a, j) => f(a, [i, j]))(ga)
      )
