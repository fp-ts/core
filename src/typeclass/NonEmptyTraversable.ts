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
  ) => <A, S, R, O, E, B>(
    f: (a: A) => Kind<F, S, R, O, E, B>
  ) => <TS, TR, TO, TE>(
    self: Kind<T, TS, TR, TO, TE, A>
  ) => Kind<F, S, R, O, E, Kind<T, TS, TR, TO, TE, B>>
}

/**
 * Returns a default `traverse` composition.
 *
 * @since 1.0.0
 */
export const nonEmptyTraverseComposition = <F extends TypeLambda, G extends TypeLambda>(
  F: NonEmptyTraversable<F>,
  G: NonEmptyTraversable<G>
) =>
  <H extends TypeLambda>(NonEmptyApplicative: NonEmptyApplicative<H>) =>
    <A, S, R, O, E, B>(
      f: (a: A) => Kind<H, S, R, O, E, B>
    ): (<FS, FR, FO, FE, GS, GR, GO, GE>(
      fga: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
    ) => Kind<H, S, R, O, E, Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>>) =>
      F.nonEmptyTraverse(NonEmptyApplicative)(G.nonEmptyTraverse(NonEmptyApplicative)(f))

/**
 * @since 1.0.0
 */
export const nonEmptySequence = <T extends TypeLambda>(T: NonEmptyTraversable<T>) =>
  <F extends TypeLambda>(
    NonEmptyApplicative: NonEmptyApplicative<F>
  ): (<TS, TR, TO, TE, S, R, O, E, A>(
    self: Kind<T, TS, TR, TO, TE, Kind<F, S, R, O, E, A>>
  ) => Kind<F, S, R, O, E, Kind<T, TS, TR, TO, TE, A>>) =>
    T.nonEmptyTraverse(NonEmptyApplicative)(identity)
