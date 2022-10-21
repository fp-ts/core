/**
 * @since 1.0.0
 */
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import { identity } from "@fp-ts/core/internal/Function"
import type { Covariant } from "@fp-ts/core/typeclass/Covariant"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Bicovariant<F extends TypeLambda> extends TypeClass<F> {
  readonly bimap: <E1, E2, A, B>(
    f: (e: E1) => E2,
    g: (a: A) => B
  ) => <R, O>(self: Kind<F, R, O, E1, A>) => Kind<F, R, O, E2, B>
}

/**
 * Returns a default `bimap` composition.
 *
 * @since 1.0.0
 */
export const bimapComposition = <F extends TypeLambda, G extends TypeLambda>(
  CovariantF: Covariant<F>,
  BicovariantG: Bicovariant<G>
) =>
  <GE1, GE2, A, B>(
    f: (e: GE1) => GE2,
    g: (a: A) => B
  ): (<FR, FO, FE, GR, GO>(
    self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE1, A>>
  ) => Kind<F, FR, FO, FE, Kind<G, GR, GO, GE2, B>>) => CovariantF.map(BicovariantG.bimap(f, g))

/**
 * @since 1.0.0
 */
export const mapLeft = <F extends TypeLambda>(
  F: Bicovariant<F>
): (<E1, E2>(
  f: (e: E1) => E2
) => <R, O, A>(self: Kind<F, R, O, E1, A>) => Kind<F, R, O, E2, A>) =>
  <E, G>(f: (e: E) => G): (<R, O, A>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, G, A>) =>
    F.bimap(f, identity)

/**
 * Returns a default `map` implementation.
 *
 * @since 1.0.0
 */
export const map = <F extends TypeLambda>(F: Bicovariant<F>): Covariant<F>["map"] =>
  <A, B>(
    f: (a: A) => B
  ): (<R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>) => F.bimap(identity, f)
