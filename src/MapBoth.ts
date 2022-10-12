/**
 * @since 3.0.0
 */
import type { Covariant } from "@fp-ts/core/Covariant"
import { identity } from "@fp-ts/core/Function"
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"

/**
 * @category model
 * @since 3.0.0
 */
export interface MapBoth<F extends TypeLambda> extends TypeClass<F> {
  readonly mapBoth: <E, G, A, B>(
    f: (e: E) => G,
    g: (a: A) => B
  ) => <S, R, O>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, G, B>
}

/**
 * @since 3.0.0
 */
export const mapLeft = <F extends TypeLambda>(
  MapBoth: MapBoth<F>
): (<E, G>(
  f: (e: E) => G
) => <S, R, O, A>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, G, A>) =>
  <E, G>(f: (e: E) => G): (<S, R, O, A>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, G, A>) =>
    MapBoth.mapBoth(f, identity)

/**
 * Returns a default `map` implementation.
 *
 * @since 3.0.0
 */
export const map = <F extends TypeLambda>(MapBoth: MapBoth<F>): Covariant<F>["map"] =>
  <A, B>(f: (a: A) => B): (<S, R, O, E>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>) =>
    MapBoth.mapBoth(e => e, f)

/**
 * Returns a default `mapBoth` composition.
 *
 * @since 3.0.0
 */
export const mapBothComposition = <F extends TypeLambda, G extends TypeLambda>(
  FunctorF: Covariant<F>,
  MapBothG: MapBoth<G>
) =>
  <GE, GG, A, B>(
    f: (e: GE) => GG,
    g: (a: A) => B
  ): (<FS, FR, FO, FE, GS, GR, GO>(
    self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
  ) => Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GG, B>>) => FunctorF.map(MapBothG.mapBoth(f, g))
