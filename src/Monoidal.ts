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
  /** traverseWithIndex */
  readonly zipAllWith: <S, R, O, E, A, B>(
    collection: Iterable<A>,
    f: (a: A, i: number) => Kind<F, S, R, O, E, B>
  ) => Kind<F, S, R, O, E, ReadonlyArray<B>>
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
