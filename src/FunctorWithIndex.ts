/**
 * @since 1.0.0
 */
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import { pipe } from "@fp-ts/core/internal/Function"

/**
 * @category type class
 * @since 1.0.0
 */
export interface FunctorWithIndex<F extends TypeLambda, I> extends TypeClass<F> {
  readonly mapWithIndex: <A, B>(
    f: (a: A, i: I) => B
  ) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
}

/**
 * Returns a default `mapWithIndex` composition.
 *
 * @since 1.0.0
 */
export const mapWithIndexComposition = <F extends TypeLambda, I, G extends TypeLambda, J>(
  FunctorF: FunctorWithIndex<F, I>,
  FunctorG: FunctorWithIndex<G, J>
): (<A, B>(
  f: (a: A, ij: readonly [I, J]) => B
) => <FS, FR, FO, FE, GS, GR, GO, GE>(
  self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
) => Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>) =>
  (f) => FunctorF.mapWithIndex((ga, i) => pipe(ga, FunctorG.mapWithIndex((a, j) => f(a, [i, j]))))
