/**
 * @since 3.0.0
 */
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import { identity } from "@fp-ts/core/internal/Function"
import type { Monoidal } from "@fp-ts/core/Monoidal"

/**
 * @category type class
 * @since 3.0.0
 */
export interface Traversable<T extends TypeLambda> extends TypeClass<T> {
  readonly traverse: <F extends TypeLambda>(
    Monoidal: Monoidal<F>
  ) => <A, S, R, O, E, B>(
    f: (a: A) => Kind<F, S, R, O, E, B>
  ) => <TS, TR, TO, TE>(
    self: Kind<T, TS, TR, TO, TE, A>
  ) => Kind<F, S, R, O, E, Kind<T, TS, TR, TO, TE, B>>
}

/**
 * Returns a default `traverse` composition.
 *
 * @since 3.0.0
 */
export const traverseComposition = <F extends TypeLambda, G extends TypeLambda>(
  TraversableF: Traversable<F>,
  TraversableG: Traversable<G>
) =>
  <H extends TypeLambda>(H: Monoidal<H>) =>
    <A, S, R, O, E, B>(
      f: (a: A) => Kind<H, S, R, O, E, B>
    ): (<FS, FR, FO, FE, GS, GR, GO, GE>(
      fga: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
    ) => Kind<H, S, R, O, E, Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>>) =>
      TraversableF.traverse(H)(TraversableG.traverse(H)(f))

/**
 * @since 3.0.0
 */
export const sequence = <T extends TypeLambda>(Traversable: Traversable<T>) =>
  <F extends TypeLambda>(
    G: Monoidal<F>
  ): (<TS, TR, TO, TE, S, R, O, E, A>(
    self: Kind<T, TS, TR, TO, TE, Kind<F, S, R, O, E, A>>
  ) => Kind<F, S, R, O, E, Kind<T, TS, TR, TO, TE, A>>) => Traversable.traverse(G)(identity)
