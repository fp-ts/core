/**
 * `Compactable` represents data structures which can be _compacted_/_separated_.
 *
 * @since 1.0.0
 */
import type { Either } from "@fp-ts/core/data/Either"
import type { Option } from "@fp-ts/core/data/Option"
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import * as either from "@fp-ts/core/internal/Either"
import { pipe } from "@fp-ts/core/internal/Function"
import type { Covariant } from "@fp-ts/core/typeclass/Covariant"

/**
 * @category models
 * @since 1.0.0
 */
export interface Compactable<F extends TypeLambda> extends TypeClass<F> {
  readonly compact: <S, R, O, E, A>(self: Kind<F, S, R, O, E, Option<A>>) => Kind<F, S, R, O, E, A>
}

/**
 * Returns a default `compact` composition.
 *
 * @since 1.0.0
 */
export const compactComposition = <F extends TypeLambda, G extends TypeLambda>(
  Covariant: Covariant<F>,
  Compactable: Compactable<G>
): (<FS, FR, FO, FE, GS, GR, GO, GE, A>(
  self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, Option<A>>>
) => Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>) => Covariant.map(Compactable.compact)

/**
 * @since 1.0.0
 */
export const separate = <F extends TypeLambda>(
  Covariant: Covariant<F>,
  Compactable: Compactable<F>
) =>
  <S, R, O, E, A, B>(
    self: Kind<F, S, R, O, E, Either<A, B>>
  ): readonly [Kind<F, S, R, O, E, A>, Kind<F, S, R, O, E, B>] => {
    return [
      pipe(self, Covariant.map(either.getLeft), Compactable.compact),
      pipe(self, Covariant.map(either.getRight), Compactable.compact)
    ]
  }
