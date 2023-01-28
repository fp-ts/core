/**
 * @since 1.0.0
 */
import { identity, pipe, SK } from "@fp-ts/core/Function"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type { Covariant } from "@fp-ts/core/typeclass/Covariant"
import type { Semigroup } from "@fp-ts/core/typeclass/Semigroup"
import type { SemiProduct } from "@fp-ts/core/typeclass/SemiProduct"

/**
 * @category type class
 * @since 1.0.0
 */
export interface SemiApplicative<F extends TypeLambda> extends SemiProduct<F>, Covariant<F> {}

/**
 * Lift a `Semigroup` into 'F', the inner values are combined using the provided `Semigroup`.
 *
 * @since 1.0.0
 */
export const liftSemigroup = <F extends TypeLambda>(F: SemiApplicative<F>) =>
  <A, R, O, E>(S: Semigroup<A>): Semigroup<Kind<F, R, O, E, A>> => ({
    combine: (self, that) => pipe(F.product(self, that), F.map(([a1, a2]) => S.combine(a1, a2))),
    combineMany: (self, collection) =>
      pipe(
        F.productMany(self, collection),
        F.map(([head, ...tail]) => S.combineMany(head, tail))
      )
  })

/**
 * Binary mapping into `F` context.
 *
 * @since 1.0.0
 */
export const map2 = <F extends TypeLambda>(F: SemiApplicative<F>) =>
  <R2, O2, E2, B, A, C>(fb: Kind<F, R2, O2, E2, B>, f: (a: A, b: B) => C) =>
    <R1, O1, E1>(fa: Kind<F, R1, O1, E1, A>): Kind<F, R1 & R2, O1 | O2, E1 | E2, C> =>
      pipe(F.product(fa, fb), F.map(([a, b]) => f(a, b)))

/**
 * @since 1.0.0
 */
export const ap = <F extends TypeLambda>(F: SemiApplicative<F>) =>
  <R2, O2, E2, A>(
    that: Kind<F, R2, O2, E2, A>
  ): <R1, O1, E1, B>(
    self: Kind<F, R1, O1, E1, (a: A) => B>
  ) => Kind<F, R1 & R2, O1 | O2, E1 | E2, B> => map2(F)(that, (f, a) => f(a))

/**
 * @since 1.0.0
 */
export const andThenDiscard = <F extends TypeLambda>(F: SemiApplicative<F>) =>
  <R2, O2, E2, _>(
    that: Kind<F, R2, O2, E2, _>
  ): <R1, O1, E1, A>(
    self: Kind<F, R1, O1, E1, A>
  ) => Kind<F, R1 & R2, O1 | O2, E1 | E2, A> => map2(F)(that, identity)

/**
 * @since 1.0.0
 */
export const andThen = <F extends TypeLambda>(F: SemiApplicative<F>) =>
  <R2, O2, E2, B>(
    that: Kind<F, R2, O2, E2, B>
  ): <R1, O1, E1, _>(
    self: Kind<F, R1, O1, E1, _>
  ) => Kind<F, R1 & R2, O1 | O2, E1 | E2, B> => map2(F)(that, SK)

/**
 * Lifts a binary function into `F`.
 *
 * @since 1.0.0
 */
export const lift2 = <F extends TypeLambda>(F: SemiApplicative<F>) =>
  <A, B, C>(f: (a: A) => (b: B) => C) =>
    <R2, O2, E2>(
      that: Kind<F, R2, O2, E2, A>
    ): <R1, O1, E1>(self: Kind<F, R1, O1, E1, B>) => Kind<F, R1 & R2, O1 | O2, E1 | E2, C> =>
      map2(F)(that, (a, b) => f(b)(a))
