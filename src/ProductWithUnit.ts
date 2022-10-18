/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { pipe } from "@fp-ts/core/internal/Function"
import type { Monoid } from "@fp-ts/core/Monoid"
import * as monoid from "@fp-ts/core/Monoid"
import type { Product } from "@fp-ts/core/Product"
import * as product from "@fp-ts/core/Product"

/**
 * @category type class
 * @since 1.0.0
 */
export interface ProductWithUnit<F extends TypeLambda> extends Product<F> {
  readonly unit: <S>() => Kind<F, S, unknown, never, never, unknown>

  readonly productAll: <S, R, O, E, A>(
    collection: Iterable<Kind<F, S, R, O, E, A>>
  ) => Kind<F, S, R, O, E, ReadonlyArray<A>>
}

/**
 * Lift a monoid into 'F', the inner values are combined using the provided `Monoid`.
 *
 * @since 1.0.0
 */
export const liftMonoid = <F extends TypeLambda>(ProductWithUnit: ProductWithUnit<F>) =>
  <A, S, R, O, E>(Monoid: Monoid<A>): Monoid<Kind<F, S, R, O, E, A>> =>
    monoid.fromSemigroup(
      product.liftSemigroup(ProductWithUnit)<A, S, R, O, E>(Monoid),
      pipe(ProductWithUnit.unit<S>(), ProductWithUnit.map(() => Monoid.empty))
    )
