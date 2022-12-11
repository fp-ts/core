/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type { Monoid } from "@fp-ts/core/typeclass/Monoid"
import type { SemiCoproduct } from "@fp-ts/core/typeclass/SemiCoproduct"
import * as semiCoproduct from "@fp-ts/core/typeclass/SemiCoproduct"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Coproduct<F extends TypeLambda> extends SemiCoproduct<F> {
  zero: <A>() => Kind<F, unknown, never, never, A>

  coproductAll: <R, O, E, A>(
    collection: Iterable<Kind<F, R, O, E, A>>
  ) => Kind<F, R, O, E, A>
}

/**
 * @since 1.0.0
 */
export const getMonoid = <F extends TypeLambda>(F: Coproduct<F>) =>
  <R, O, E, A>(): Monoid<
    Kind<F, R, O, E, A>
  > => ({
    ...semiCoproduct.getSemigroup(F)(),
    empty: F.zero(),
    combineAll: F.coproductAll
  })
