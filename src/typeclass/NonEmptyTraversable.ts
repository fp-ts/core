/**
 * NonEmptyTraversable<T> describes a parameterized type T<A> that contains one or more values of type `A`.
 *
 * @since 1.0.0
 */
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import { identity } from "@fp-ts/core/internal/Function"
import type { NonEmptyApplicative } from "@fp-ts/core/typeclass/NonEmptyApplicative"

/**
 * @category type class
 * @since 1.0.0
 */
export interface NonEmptyTraversable<T extends TypeLambda> extends TypeClass<T> {
  readonly nonEmptyTraverse: <F extends TypeLambda>(
    NonEmptyApplicative: NonEmptyApplicative<F>
  ) => <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, B>
  ) => <TR, TO, TE>(
    self: Kind<T, TR, TO, TE, A>
  ) => Kind<F, R, O, E, Kind<T, TR, TO, TE, B>>
}

/**
 * Returns a default `nonEmptyTraverse` composition.
 *
 * @since 1.0.0
 */
export const nonEmptyTraverseComposition = <F extends TypeLambda, G extends TypeLambda>(
  F: NonEmptyTraversable<F>,
  G: NonEmptyTraversable<G>
) =>
  <H extends TypeLambda>(NonEmptyApplicative: NonEmptyApplicative<H>) =>
    <A, R, O, E, B>(
      f: (a: A) => Kind<H, R, O, E, B>
    ): (<FR, FO, FE, GR, GO, GE>(
      fga: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>
    ) => Kind<H, R, O, E, Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, B>>>) =>
      F.nonEmptyTraverse(NonEmptyApplicative)(G.nonEmptyTraverse(NonEmptyApplicative)(f))

/**
 * @since 1.0.0
 */
export const nonEmptySequence = <T extends TypeLambda>(T: NonEmptyTraversable<T>) =>
  <F extends TypeLambda>(
    NonEmptyApplicative: NonEmptyApplicative<F>
  ): (<TR, TO, TE, R, O, E, A>(
    self: Kind<T, TR, TO, TE, Kind<F, R, O, E, A>>
  ) => Kind<F, R, O, E, Kind<T, TR, TO, TE, A>>) =>
    T.nonEmptyTraverse(NonEmptyApplicative)(identity)
