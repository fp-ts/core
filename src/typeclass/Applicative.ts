/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type { Monoid } from "@fp-ts/core/typeclass/Monoid"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import * as nonEmptyApplicative from "@fp-ts/core/typeclass/NonEmptyApplicative"
import type { NonEmptyApplicative } from "@fp-ts/core/typeclass/NonEmptyApplicative"
import { unit } from "@fp-ts/core/typeclass/Of"
import type { Of } from "@fp-ts/core/typeclass/Of"
import type { Product } from "@fp-ts/core/typeclass/Product"
import * as product from "@fp-ts/core/typeclass/Product"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Applicative<F extends TypeLambda>
  extends Product<F>, NonEmptyApplicative<F>, Of<F>
{}

/**
 * @since 1.0.0
 */
export const fromNonEmptyApplicative = <F extends TypeLambda>(
  NonEmptyApplicative: nonEmptyApplicative.NonEmptyApplicative<F>,
  of: Of<F>["of"]
): Applicative<F> => {
  return {
    ...NonEmptyApplicative,
    ...product.fromNonEmptyProduct(NonEmptyApplicative, unit({ of })),
    of
  }
}

/**
 * Lift a monoid into 'F', the inner values are combined using the provided `Monoid`.
 *
 * @since 1.0.0
 */
export const liftMonoid = <F extends TypeLambda>(F: Applicative<F>) =>
  <A, R, O, E>(Monoid: Monoid<A>): Monoid<Kind<F, R, O, E, A>> =>
    monoid.fromSemigroup(
      nonEmptyApplicative.liftSemigroup(F)<A, R, O, E>(Monoid),
      F.of(Monoid.empty)
    )
