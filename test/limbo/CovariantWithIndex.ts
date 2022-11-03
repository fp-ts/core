/**
 * @since 1.0.0
 */
import type { Kind, TypeClass, TypeLambda, Variance } from "@fp-ts/core/HKT"
import { pipe } from "@fp-ts/core/internal/Function"
import type { Covariant } from "@fp-ts/core/typeclass/Covariant"

/**
 * @category type class
 * @since 1.0.0
 */
export interface CovariantWithIndex<F extends TypeLambda<Variance.Covariant>, I>
  extends TypeClass<F>
{
  readonly mapWithIndex: <A, B>(
    f: (a: A, i: I) => B
  ) => <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>
}

/**
 * Returns a default `mapWithIndex` composition.
 *
 * @since 1.0.0
 */
export const mapWithIndexComposition = <
  F extends TypeLambda<Variance.Covariant>,
  I,
  G extends TypeLambda<Variance.Covariant>,
  J
>(
  F: CovariantWithIndex<F, I>,
  G: CovariantWithIndex<G, J>
): (<A, B>(
  f: (a: A, ij: readonly [I, J]) => B
) => <FR, FO, FE, GR, GO, GE>(
  self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>
) => Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, B>>) =>
  (f) => F.mapWithIndex((ga, i) => pipe(ga, G.mapWithIndex((a, j) => f(a, [i, j]))))

/**
 * Returns a default `map` implementation.
 *
 * @since 1.0.0
 */
export const map = <F extends TypeLambda<Variance.Covariant>, I>(
  F: CovariantWithIndex<F, I>
): Covariant<F>["map"] => f => F.mapWithIndex(f)
