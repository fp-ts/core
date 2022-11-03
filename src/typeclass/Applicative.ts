/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda, Variance } from "@fp-ts/core/HKT"
import type { Monoid } from "@fp-ts/core/typeclass/Monoid"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import type { Product } from "@fp-ts/core/typeclass/Product"
import type { SemiApplicative } from "@fp-ts/core/typeclass/SemiApplicative"
import * as semiApplicative from "@fp-ts/core/typeclass/SemiApplicative"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Applicative<F extends TypeLambda<Variance.Covariant>>
  extends SemiApplicative<F>, Product<F>
{}

/**
 * Lift a monoid into 'F', the inner values are combined using the provided `Monoid`.
 *
 * @since 1.0.0
 */
export const liftMonoid = <F extends TypeLambda<Variance.Covariant>>(F: Applicative<F>) =>
  <A, R, O, E>(M: Monoid<A>): Monoid<Kind<F, R, O, E, A>> =>
    monoid.fromSemigroup(
      semiApplicative.liftSemigroup(F)<A, R, O, E>(M),
      F.of(M.empty)
    )
