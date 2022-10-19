/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { pipe } from "@fp-ts/core/internal/Function"
import type { Monoid } from "@fp-ts/core/typeclass/Monoid"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import type { Product } from "@fp-ts/core/typeclass/Product"
import * as product from "@fp-ts/core/typeclass/Product"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Applicative<F extends TypeLambda> extends Product<F> {
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
export const liftMonoid = <F extends TypeLambda>(Applicative: Applicative<F>) =>
  <A, S, R, O, E>(Monoid: Monoid<A>): Monoid<Kind<F, S, R, O, E, A>> =>
    monoid.fromSemigroup(
      product.liftSemigroup(Applicative)<A, S, R, O, E>(Monoid),
      pipe(Applicative.unit<S>(), Applicative.map(() => Monoid.empty))
    )
