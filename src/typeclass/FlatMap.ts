/**
 * @since 1.0.0
 */
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import { pipe } from "@fp-ts/core/internal/Function"

/**
 * @category type class
 * @since 1.0.0
 */
export interface FlatMap<F extends TypeLambda> extends TypeClass<F> {
  readonly flatMap: <A, S, R2, O2, E2, B>(
    f: (a: A) => Kind<F, S, R2, O2, E2, B>
  ) => <R1, O1, E1>(self: Kind<F, S, R1, O1, E1, A>) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, B>
}

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 1.0.0
 */
export const andThen = <F extends TypeLambda>(FlatMap: FlatMap<F>) =>
  <S, R2, O2, E2, A>(
    that: Kind<F, S, R2, O2, E2, A>
  ): (<R1, O1, E1>(
    self: Kind<F, S, R1, O1, E1, unknown>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A>) => FlatMap.flatMap(() => that)

/**
 * @since 1.0.0
 */
export const composeKleisli = <F extends TypeLambda>(
  FlatMap: FlatMap<F>
): <B, S, R2, O2, E2, C>(
  bfc: (b: B) => Kind<F, S, R2, O2, E2, C>
) => <A, R1, O1, E1>(
  afb: (a: A) => Kind<F, S, R1, O1, E1, B>
) => (a: A) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, C> =>
  (bc) => (ab) => a => pipe(ab(a), FlatMap.flatMap(bc))
