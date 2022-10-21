/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import * as apply from "@fp-ts/core/typeclass/Apply"
import type { Monoid } from "@fp-ts/core/typeclass/Monoid"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import type { MonoidalProduct } from "@fp-ts/core/typeclass/MonoidalProduct"
import type { Pointed } from "@fp-ts/core/typeclass/Pointed"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Applicative<F extends TypeLambda> extends MonoidalProduct<F>, Pointed<F> {}

/**
 * Lift a monoid into 'F', the inner values are combined using the provided `Monoid`.
 *
 * @since 1.0.0
 */
export const liftMonoid = <F extends TypeLambda>(F: Applicative<F>) =>
  <A, S, R, O, E>(Monoid: Monoid<A>): Monoid<Kind<F, S, R, O, E, A>> =>
    monoid.fromSemigroup(
      apply.liftSemigroup(F)<A, S, R, O, E>(Monoid),
      F.of(Monoid.empty)
    )
