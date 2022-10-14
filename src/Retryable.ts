/**
 * @since 3.0.0
 */
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"

/**
 * @category type class
 * @since 3.0.0
 */
export interface Failable<F extends TypeLambda> extends TypeClass<F> {
  readonly firstSuccessOf: <S, R1, O1, E1, A, R2, O2, E2, B>(
    first: Kind<F, S, R1, O1, E1, A>,
    second: Kind<F, S, R2, O2, E2, B>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A | B>
  readonly firstSuccessOfMany: <S, R1, O1, E1, A, R2, O2, E2, B>(
    head: Kind<F, S, R1, O1, E1, A>,
    tail: Iterable<Kind<F, S, R2, O2, E2, B>>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A | B>
}

/**
 * @since 3.0.0
 */
export const orElse = <F extends TypeLambda>(Failable: Failable<F>) =>
  <S, R2, O2, E2, B>(that: Kind<F, S, R2, O2, E2, B>) =>
    <R1, O1, E1, A>(
      self: Kind<F, S, R1, O1, E1, A>
    ): Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A | B> => Failable.firstSuccessOf(self, that)
