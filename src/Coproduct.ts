/**
 * @since 1.0.0
 */
import type { Covariant } from "@fp-ts/core/Covariant"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Coproduct<F extends TypeLambda> extends Covariant<F> {
  readonly coproduct: <S, R2, O2, E2, B>(
    that: Kind<F, S, R2, O2, E2, B>
  ) => <R1, O1, E1, A>(
    self: Kind<F, S, R1, O1, E1, A>
  ) => Kind<F, S, R1 & R2, O1 | O2, E2, A | B>
  // this is intended --------------^

  readonly coproductMany: <S, R, O, E, A>(
    collection: Iterable<Kind<F, S, R, O, E, A>>
  ) => (self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, A>
}
