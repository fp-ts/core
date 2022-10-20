/**
 * @since 1.0.0
 */
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import { identity } from "@fp-ts/core/internal/Function"
import type { Applicative } from "@fp-ts/core/typeclass/Applicative"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Traversable<T extends TypeLambda> extends TypeClass<T> {
  readonly traverse: <F extends TypeLambda>(
    Applicative: Applicative<F>
  ) => <A, S, R, O, E, B>(
    f: (a: A) => Kind<F, S, R, O, E, B>
  ) => <TS, TR, TO, TE>(
    self: Kind<T, TS, TR, TO, TE, A>
  ) => Kind<F, S, R, O, E, Kind<T, TS, TR, TO, TE, B>>
}

/**
 * Returns a default `traverse` composition.
 *
 * @since 1.0.0
 */
export const traverseComposition = <F extends TypeLambda, G extends TypeLambda>(
  F: Traversable<F>,
  G: Traversable<G>
) =>
  <H extends TypeLambda>(Applicative: Applicative<H>) =>
    <A, S, R, O, E, B>(
      f: (a: A) => Kind<H, S, R, O, E, B>
    ): (<FS, FR, FO, FE, GS, GR, GO, GE>(
      fga: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
    ) => Kind<H, S, R, O, E, Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>>) =>
      F.traverse(Applicative)(G.traverse(Applicative)(f))

/**
 * @since 1.0.0
 */
export const sequence = <T extends TypeLambda>(T: Traversable<T>) =>
  <F extends TypeLambda>(
    Applicative: Applicative<F>
  ): (<TS, TR, TO, TE, S, R, O, E, A>(
    self: Kind<T, TS, TR, TO, TE, Kind<F, S, R, O, E, A>>
  ) => Kind<F, S, R, O, E, Kind<T, TS, TR, TO, TE, A>>) => T.traverse(Applicative)(identity)
