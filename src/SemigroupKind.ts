/**
 * @since 3.0.0
 */
import type { Functor } from "@fp-ts/core/Functor"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"

/**
 * @category type class
 * @since 3.0.0
 */
export interface SemigroupKind<F extends TypeLambda> extends Functor<F> {
  readonly combineKind: <S, R1, O1, E1, A, R2, O2, E2, B>(
    first: Kind<F, S, R1, O1, E1, A>,
    second: Kind<F, S, R2, O2, E2, B>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A | B>

  readonly combineKindMany: <S, R, O, E, A>(
    start: Kind<F, S, R, O, E, A>,
    others: Iterable<Kind<F, S, R, O, E, A>>
  ) => Kind<F, S, R, O, E, A>
}
