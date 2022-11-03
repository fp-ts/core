/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda, Variance } from "@fp-ts/core/HKT"
import type { Monoid } from "@fp-ts/core/typeclass/Monoid"
import type { SemiCoproduct } from "@fp-ts/core/typeclass/SemiCoproduct"
import * as semiCoproduct from "@fp-ts/core/typeclass/SemiCoproduct"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Coproduct<F extends TypeLambda<Variance.Invariant>> extends SemiCoproduct<F> {
  readonly zero: <A>() => Kind<F, unknown, never, never, A>

  readonly coproductAll: <R, O, E, A>(
    collection: Iterable<Kind<F, R, O, E, A>>
  ) => Kind<F, R, O, E, A>
}

/**
 * @since 1.0.0
 */
export const getMonoid = <F extends TypeLambda<Variance.Invariant>>(F: Coproduct<F>) =>
  <R, O, E, A>(): Monoid<
    Kind<F, R, O, E, A>
  > => ({
    ...semiCoproduct.getSemigroup(F)(),
    empty: F.zero(),
    combineAll: F.coproductAll
  })
