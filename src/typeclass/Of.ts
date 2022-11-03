/**
 * @since 1.0.0
 */
import type { Kind, TypeClass, TypeLambda, Variance } from "@fp-ts/core/HKT"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Of<F extends TypeLambda<Variance.Invariant>> extends TypeClass<F> {
  readonly of: <A>(a: A) => Kind<F, unknown, never, never, A>
}

/**
 * Returns a default `of` composition.
 *
 * @since 1.0.0
 */
export const ofComposition = <
  F extends TypeLambda<Variance.Invariant>,
  G extends TypeLambda<Variance.Invariant>
>(
  F: Of<F>,
  G: Of<G>
) => <A>(a: A): Kind<F, unknown, never, never, Kind<G, unknown, never, never, A>> => F.of(G.of(a))

/**
 * @since 1.0.0
 */
export const unit = <F extends TypeLambda<Variance.Invariant>>(
  F: Of<F>
): Kind<F, unknown, never, never, void> => F.of<void>(undefined)

/**
 * @since 1.0.0
 */
export const Do = <F extends TypeLambda<Variance.Invariant>>(
  F: Of<F>
): Kind<F, unknown, never, never, {}> => F.of({})
