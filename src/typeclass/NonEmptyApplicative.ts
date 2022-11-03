/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { pipe } from "@fp-ts/core/internal/Function"
import type { Covariant } from "@fp-ts/core/typeclass/Covariant"
import type { Semigroup } from "@fp-ts/core/typeclass/Semigroup"
import type { SemiProduct } from "@fp-ts/core/typeclass/SemiProduct"

/**
 * @category type class
 * @since 1.0.0
 */
export interface NonEmptyApplicative<F extends TypeLambda> extends SemiProduct<F>, Covariant<F> {}

/**
 * Lift a `Semigroup` into 'F', the inner values are combined using the provided `Semigroup`.
 *
 * @since 1.0.0
 */
export const liftSemigroup = <F extends TypeLambda>(F: NonEmptyApplicative<F>) =>
  <A, R, O, E>(S: Semigroup<A>): Semigroup<Kind<F, R, O, E, A>> => ({
    combine: that => self => pipe(self, F.product(that), F.map(([a1, a2]) => S.combine(a2)(a1))),
    combineMany: collection =>
      self =>
        pipe(
          self,
          F.productMany(collection),
          F.map(([head, ...tail]) => pipe(head, S.combineMany(tail)))
        )
  })

/**
 * @since 1.0.0
 */
export const ap = <F extends TypeLambda>(F: NonEmptyApplicative<F>) =>
  <R2, O2, E2, A>(
    fa: Kind<F, R2, O2, E2, A>
  ) =>
    <R1, O1, E1, B>(
      self: Kind<F, R1, O1, E1, (a: A) => B>
    ): Kind<F, R1 & R2, O1 | O2, E1 | E2, B> => pipe(self, F.product(fa), F.map(([f, a]) => f(a)))

/**
 * @since 1.0.0
 */
export const andThenDiscard = <F extends TypeLambda>(F: NonEmptyApplicative<F>) =>
  <R2, O2, E2, _>(
    that: Kind<F, R2, O2, E2, _>
  ) =>
    <R1, O1, E1, A>(
      self: Kind<F, R1, O1, E1, A>
    ): Kind<F, R1 & R2, O1 | O2, E1 | E2, A> => pipe(self, F.product(that), F.map(([a]) => a))

/**
 * @since 1.0.0
 */
export const andThen = <F extends TypeLambda>(F: NonEmptyApplicative<F>) =>
  <R2, O2, E2, B>(
    that: Kind<F, R2, O2, E2, B>
  ) =>
    <R1, O1, E1, _>(
      self: Kind<F, R1, O1, E1, _>
    ): Kind<F, R1 & R2, O1 | O2, E1 | E2, B> => pipe(self, F.product(that), F.map(([_, a]) => a))

/**
 * Lifts a binary function into `F`.
 *
 * @since 1.0.0
 */
export const lift2 = <F extends TypeLambda>(F: NonEmptyApplicative<F>) =>
  <A, B, C>(f: (a: A, b: B) => C) =>
    <R1, O1, E1, R2, O2, E2>(
      fa: Kind<F, R1, O1, E1, A>,
      fb: Kind<F, R2, O2, E2, B>
    ): Kind<F, R1 & R2, O1 | O2, E1 | E2, C> => pipe(fa, F.product(fb), F.map(([a, b]) => f(a, b)))

/**
 * Lifts a ternary function into 'F'.
 *
 * @since 1.0.0
 */
export const lift3 = <F extends TypeLambda>(F: NonEmptyApplicative<F>) =>
  <A, B, C, D>(f: (a: A, b: B, c: C) => D) =>
    <R1, O1, E1, R2, O2, E2, R3, O3, E3>(
      fa: Kind<F, R1, O1, E1, A>,
      fb: Kind<F, R2, O2, E2, B>,
      fc: Kind<F, R3, O3, E3, C>
    ): Kind<F, R1 & R2 & R3, O1 | O2 | O3, E1 | E2 | E3, D> =>
      pipe(
        fa,
        F.product(fb),
        F.product(fc),
        F.map(([[a, b], c]) => f(a, b, c))
      )
