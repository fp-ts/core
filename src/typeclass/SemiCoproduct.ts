/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type { Invariant } from "@fp-ts/core/typeclass/Invariant"
import type { Semigroup } from "@fp-ts/core/typeclass/Semigroup"

/**
 * @category type class
 * @since 1.0.0
 */
export interface SemiCoproduct<F extends TypeLambda> extends Invariant<F> {
  coproduct: <R2, O2, E2, B>(
    that: Kind<F, R2, O2, E2, B>
  ) => <R1, O1, E1, A>(
    self: Kind<F, R1, O1, E1, A>
  ) => Kind<F, R1 & R2, O1 | O2, E1 | E2, A | B>

  coproductMany: <R, O, E, A>(
    collection: Iterable<Kind<F, R, O, E, A>>
  ) => (self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, A>
}

/**
 * @since 1.0.0
 */
export const getSemigroup = <F extends TypeLambda>(F: SemiCoproduct<F>) =>
  <R, O, E, A>(): Semigroup<
    Kind<F, R, O, E, A>
  > => ({
    combine: F.coproduct,
    combineMany: F.coproductMany
  })
