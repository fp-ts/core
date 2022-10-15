/**
 * @since 3.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type { Monoid } from "@fp-ts/core/Monoid"
import * as monoid from "@fp-ts/core/Monoid"
import type { Semigroupal } from "@fp-ts/core/Semigroupal"
import * as semigroupal from "@fp-ts/core/Semigroupal"
import type { Succeed } from "@fp-ts/core/Succeed"

/**
 * @category type class
 * @since 3.0.0
 */
export interface Monoidal<F extends TypeLambda> extends Semigroupal<F>, Succeed<F> {
  /** sequence */
  readonly zipAll: <S, R, O, E, A>(
    collection: Iterable<Kind<F, S, R, O, E, A>>
  ) => Kind<F, S, R, O, E, ReadonlyArray<A>>
}

/**
 * Lift a monoid into 'F', the inner values are combined using the provided `Monoid`.
 *
 * @since 3.0.0
 */
export const liftMonoid = <F extends TypeLambda>(Monoidal: Monoidal<F>) =>
  <A, S, R, O, E>(Monoid: Monoid<A>): Monoid<Kind<F, S, R, O, E, A>> =>
    monoid.fromSemigroup(
      semigroupal.liftSemigroup(Monoidal)<A, S, R, O, E>(Monoid),
      Monoidal.succeed(Monoid.empty)
    )
