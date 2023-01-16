/**
 * NonEmptyTraversable<T> describes a parameterized type T<A> that contains one or more values of type `A`.
 *
 * @since 1.0.0
 */
import { identity, pipe } from "@fp-ts/core/Function"
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import type { Covariant } from "@fp-ts/core/typeclass/Covariant"
import type { SemiApplicative } from "@fp-ts/core/typeclass/SemiApplicative"

/**
 * @category type class
 * @since 1.0.0
 */
export interface NonEmptyTraversable<T extends TypeLambda> extends TypeClass<T> {
  readonly traverseNonEmpty: <F extends TypeLambda>(
    F: SemiApplicative<F>
  ) => <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, B>
  ) => <TR, TO, TE>(
    self: Kind<T, TR, TO, TE, A>
  ) => Kind<F, R, O, E, Kind<T, TR, TO, TE, B>>

  readonly sequenceNonEmpty: <F extends TypeLambda>(
    F: SemiApplicative<F>
  ) => <TR, TO, TE, R, O, E, A>(
    self: Kind<T, TR, TO, TE, Kind<F, R, O, E, A>>
  ) => Kind<F, R, O, E, Kind<T, TR, TO, TE, A>>
}

/**
 * Returns a default `traverseNonEmpty` composition.
 *
 * @since 1.0.0
 */
export const traverseNonEmptyComposition = <T extends TypeLambda, F extends TypeLambda>(
  T: NonEmptyTraversable<T>,
  G: NonEmptyTraversable<F>
) =>
  <G extends TypeLambda>(F: SemiApplicative<G>) =>
    <A, R, O, E, B>(
      f: (a: A) => Kind<G, R, O, E, B>
    ): (<TR, TO, TE, GR, GO, GE>(
      self: Kind<T, TR, TO, TE, Kind<F, GR, GO, GE, A>>
    ) => Kind<G, R, O, E, Kind<T, TR, TO, TE, Kind<F, GR, GO, GE, B>>>) =>
      T.traverseNonEmpty(F)(G.traverseNonEmpty(F)(f))

/**
 * Returns a default `sequenceNonEmpty` composition.
 *
 * @since 1.0.0
 */
export const sequenceNonEmptyComposition = <T extends TypeLambda, F extends TypeLambda>(
  T: NonEmptyTraversable<T> & Covariant<T>,
  G: NonEmptyTraversable<F>
) =>
  <G extends TypeLambda>(F: SemiApplicative<G>) =>
    <TR, TO, TE, GR, GO, GE, R, O, E, A>(
      self: Kind<T, TR, TO, TE, Kind<F, GR, GO, GE, Kind<G, R, O, E, A>>>
    ): Kind<G, R, O, E, Kind<T, TR, TO, TE, Kind<F, GR, GO, GE, A>>> =>
      T.sequenceNonEmpty(F)(pipe(self, T.map(G.sequenceNonEmpty(F))))

/**
 * Returns a default `sequenceNonEmpty` implementation.
 *
 * @since 1.0.0
 */
export const sequenceNonEmpty = <T extends TypeLambda>(
  traverseNonEmpty: NonEmptyTraversable<T>["traverseNonEmpty"]
): NonEmptyTraversable<T>["sequenceNonEmpty"] =>
  <F extends TypeLambda>(
    F: SemiApplicative<F>
  ): (<TR, TO, TE, R, O, E, A>(
    self: Kind<T, TR, TO, TE, Kind<F, R, O, E, A>>
  ) => Kind<F, R, O, E, Kind<T, TR, TO, TE, A>>) => traverseNonEmpty(F)(identity)
