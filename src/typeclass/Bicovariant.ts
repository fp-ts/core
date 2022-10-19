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
  readonly bimap: <E1, E2, A1, A2>(
    f: (e: E1) => E2,
    g: (a: A1) => A2
  ) => <S, R, O>(self: Kind<F, S, R, O, E1, A1>) => Kind<F, S, R, O, E2, A2>
}

/**
 * @since 1.0.0
 */
export const mapLeft = <F extends TypeLambda>(
  Bicovariant: Bicovariant<F>
): (<E1, E2>(
  f: (e: E1) => E2
) => <S, R, O, A>(self: Kind<F, S, R, O, E1, A>) => Kind<F, S, R, O, E2, A>) =>
  <E, G>(f: (e: E) => G): (<S, R, O, A>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, G, A>) =>
    Bicovariant.bimap(f, identity)

/**
 * Returns a default `map` implementation.
 *
 * @since 1.0.0
 */
export const map = <F extends TypeLambda>(Bicovariant: Bicovariant<F>): Covariant<F>["map"] =>
  <A1, A2>(
    f: (a: A1) => A2
  ): (<S, R, O, E>(self: Kind<F, S, R, O, E, A1>) => Kind<F, S, R, O, E, A2>) =>
    Bicovariant.bimap(identity, f)

/**
 * Returns a default `bimap` composition.
 *
 * @since 1.0.0
 */
export const bimapComposition = <F extends TypeLambda, G extends TypeLambda>(
  CovariantF: Covariant<F>,
  BicovariantG: Bicovariant<G>
) =>
  <GE1, GE2, A1, A2>(
    f: (e: GE1) => GE2,
    g: (a: A1) => A2
  ): (<FS, FR, FO, FE, GS, GR, GO>(
    self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE1, A1>>
  ) => Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE2, A2>>) =>
    CovariantF.map(BicovariantG.bimap(f, g))
