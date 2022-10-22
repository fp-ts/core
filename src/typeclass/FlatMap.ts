/**
 * @since 1.0.0
 */
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import { identity, pipe } from "@fp-ts/core/internal/Function"

/**
 * @category type class
 * @since 1.0.0
 */
export interface FlatMap<F extends TypeLambda> extends TypeClass<F> {
  readonly flatMap: <A, R2, O2, E2, B>(
    f: (a: A) => Kind<F, R2, O2, E2, B>
  ) => <R1, O1, E1>(self: Kind<F, R1, O1, E1, A>) => Kind<F, R1 & R2, O1 | O2, E1 | E2, B>
}

/**
 * @since 1.0.0
 */
export const flatten = <F extends TypeLambda>(F: FlatMap<F>) =>
  <R2, O2, E2, R1, O1, E1, A>(
    self: Kind<F, R2, O2, E2, Kind<F, R1, O1, E1, A>>
  ): Kind<F, R1 & R2, O1 | O2, E1 | E2, A> => pipe(self, F.flatMap(identity))

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @since 1.0.0
 */
export const andThen = <F extends TypeLambda>(F: FlatMap<F>) =>
  <R2, O2, E2, A>(
    that: Kind<F, R2, O2, E2, A>
  ): (<R1, O1, E1, _>(
    self: Kind<F, R1, O1, E1, _>
  ) => Kind<F, R1 & R2, O1 | O2, E1 | E2, A>) => F.flatMap(() => that)

/**
 * @since 1.0.0
 */
export const composeKleisli = <F extends TypeLambda>(
  F: FlatMap<F>
): <B, R2, O2, E2, C>(
  bfc: (b: B) => Kind<F, R2, O2, E2, C>
) => <A, R1, O1, E1>(
  afb: (a: A) => Kind<F, R1, O1, E1, B>
) => (a: A) => Kind<F, R1 & R2, O1 | O2, E1 | E2, C> => bc => ab => a => pipe(ab(a), F.flatMap(bc))
