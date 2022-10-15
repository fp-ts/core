/**
 * @since 3.0.0
 */
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import type { Monoidal } from "@fp-ts/core/Monoidal"

/**
 * @category type class
 * @since 3.0.0
 */
export interface TraversableWithIndex<T extends TypeLambda, I> extends TypeClass<T> {
  readonly traverseWithIndex: <F extends TypeLambda>(
    Monoidal: Monoidal<F>
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
  TraversableWithIndexF: TraversableWithIndex<F, I>,
  TraversableWithIndexG: TraversableWithIndex<G, J>
) =>
  <H extends TypeLambda>(H: Monoidal<H>) =>
    <A, S, R, O, E, B>(
      f: (a: A, ij: readonly [I, J]) => Kind<H, S, R, O, E, B>
    ): (<FS, FR, FO, FE, GS, GR, GO, GE>(
      fga: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
    ) => Kind<H, S, R, O, E, Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>>) =>
      TraversableWithIndexF.traverseWithIndex(H)((ga, i) =>
        TraversableWithIndexG.traverseWithIndex(H)<A, S, R, O, E, B>((a, j) => f(a, [i, j]))(ga)
      )
