/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type { Apply } from "@fp-ts/core/typeclass/Apply"
import * as apply from "@fp-ts/core/typeclass/Apply"
import type { Monoid } from "@fp-ts/core/typeclass/Monoid"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import type { Of } from "@fp-ts/core/typeclass/Of"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Applicative<F extends TypeLambda> extends Apply<F>, Of<F> {
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
    monoid.fromAssociative(
      apply.liftAssociative(Applicative)<A, S, R, O, E>(Monoid),
      Applicative.of(Monoid.unit)
    )
