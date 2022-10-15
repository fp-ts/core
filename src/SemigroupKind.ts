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
  readonly combineKind: <S, R, O, E, A, B>(
    first: Kind<F, S, R, O, E, A>,
    second: Kind<F, S, R, O, E, A>
  ) => Kind<F, S, R, O, E, A | B>

  readonly combineKindMany: <S, R, O, E, A>(
    start: Kind<F, S, R, O, E, A>,
    others: Iterable<Kind<F, S, R, O, E, A>>
  ) => Kind<F, S, R, O, E, A>
}
