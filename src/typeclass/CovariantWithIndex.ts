/**
 * @since 1.0.0
 */
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import { pipe } from "@fp-ts/core/internal/Function"
import type { Covariant } from "@fp-ts/core/typeclass/Covariant"

/**
 * @category type class
 * @since 1.0.0
 */
export interface CovariantWithIndex<F extends TypeLambda, I> extends TypeClass<F> {
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
  F: CovariantWithIndex<F, I>,
  G: CovariantWithIndex<G, J>
): (<A, B>(
  f: (a: A, ij: readonly [I, J]) => B
) => <FS, FR, FO, FE, GS, GR, GO, GE>(
  self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
) => Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>) =>
  (f) => F.mapWithIndex((ga, i) => pipe(ga, G.mapWithIndex((a, j) => f(a, [i, j]))))

/**
 * Returns a default `map` implementation.
 *
 * @since 1.0.0
 */
export const map = <F extends TypeLambda, I>(
  F: CovariantWithIndex<F, I>
): Covariant<F>["map"] => f => F.mapWithIndex(f)
