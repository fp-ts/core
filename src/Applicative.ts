/**
 * @since 3.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type { Monoid } from "@fp-ts/core/Monoid"
import * as monoid from "@fp-ts/core/Monoid"
import type { Succeed } from "@fp-ts/core/Succeed"
import type { Zippable } from "@fp-ts/core/Zippable"
import * as zippable from "@fp-ts/core/Zippable"

/**
 * @category type class
 * @since 3.0.0
 */
export interface Applicative<F extends TypeLambda> extends Zippable<F>, Succeed<F> {}

/**
 * Lift a monoid into 'F', the inner values are combined using the provided `Monoid`.
 *
 * @since 3.0.0
 */
export const liftMonoid = <F extends TypeLambda>(Applicative: Applicative<F>) =>
  <A, S, R, O, E>(Monoid: Monoid<A>): Monoid<Kind<F, S, R, O, E, A>> =>
    monoid.fromSemigroup(
      zippable.liftSemigroup(Applicative)<A, S, R, O, E>(Monoid),
      Applicative.succeed(Monoid.empty)
    )
