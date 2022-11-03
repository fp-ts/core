/**
 * @since 1.0.0
 */
import type { Kind, TypeClass, TypeLambda, Variance } from "@fp-ts/core/HKT"
import { identity, pipe } from "@fp-ts/core/internal/Function"
import type { Applicative } from "@fp-ts/core/typeclass/Applicative"
import type { Covariant } from "@fp-ts/core/typeclass/Covariant"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Traversable<T extends TypeLambda<Variance.Invariant>> extends TypeClass<T> {
  readonly traverse: <F extends TypeLambda<Variance.Covariant>>(
    F: Applicative<F>
  ) => <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, B>
  ) => <TR, TO, TE>(self: Kind<T, TR, TO, TE, A>) => Kind<F, R, O, E, Kind<T, TR, TO, TE, B>>

  readonly sequence: <F extends TypeLambda<Variance.Covariant>>(
    F: Applicative<F>
  ) => <TR, TO, TE, R, O, E, A>(
    self: Kind<T, TR, TO, TE, Kind<F, R, O, E, A>>
  ) => Kind<F, R, O, E, Kind<T, TR, TO, TE, A>>
}

/**
 * Returns a default `traverse` composition.
 *
 * @since 1.0.0
 */
export const traverseComposition = <
  T extends TypeLambda<Variance.Invariant>,
  G extends TypeLambda<Variance.Invariant>
>(
  T: Traversable<T>,
  G: Traversable<G>
) =>
  <F extends TypeLambda<Variance.Covariant>>(F: Applicative<F>) =>
    <A, R, O, E, B>(
      f: (a: A) => Kind<F, R, O, E, B>
    ): (<TR, TO, TE, GR, GO, GE>(
      self: Kind<T, TR, TO, TE, Kind<G, GR, GO, GE, A>>
    ) => Kind<F, R, O, E, Kind<T, TR, TO, TE, Kind<G, GR, GO, GE, B>>>) =>
      T.traverse(F)(G.traverse(F)(f))

/**
 * Returns a default `sequence` composition.
 *
 * @since 1.0.0
 */
export const sequenceComposition = <
  T extends TypeLambda<Variance.Covariant>,
  G extends TypeLambda<Variance.Invariant>
>(
  T: Traversable<T> & Covariant<T>,
  G: Traversable<G>
) =>
  <F extends TypeLambda<Variance.Covariant>>(F: Applicative<F>) =>
    <TR, TO, TE, GR, GO, GE, R, O, E, A>(
      self: Kind<T, TR, TO, TE, Kind<G, GR, GO, GE, Kind<F, R, O, E, A>>>
    ): Kind<F, R, O, E, Kind<T, TR, TO, TE, Kind<G, GR, GO, GE, A>>> =>
      T.sequence(F)(pipe(self, T.map(G.sequence(F))))

/**
 * Returns a default `sequence` implementation.
 *
 * @since 1.0.0
 */
export const sequence = <T extends TypeLambda<Variance.Invariant>>(
  traverse: Traversable<T>["traverse"]
): Traversable<T>["sequence"] =>
  <F extends TypeLambda<Variance.Covariant>>(F: Applicative<F>): (<TR, TO, TE, R, O, E, A>(
    self: Kind<T, TR, TO, TE, Kind<F, R, O, E, A>>
  ) => Kind<F, R, O, E, Kind<T, TR, TO, TE, A>>) => traverse(F)(identity)

/**
 * Given a function which returns a `F` effect, thread this effect
 * through the running of this function on all the values in `T`,
 * returning an `T<A>` in a `F` context, ignoring the values
 * returned by the provided function.
 *
 * @since 1.0.0
 */
export const traverseTap = <T extends TypeLambda<Variance.Invariant>>(T: Traversable<T>) =>
  <F extends TypeLambda<Variance.Covariant>>(F: Applicative<F>) =>
    <A, R, O, E, B>(f: (a: A) => Kind<F, R, O, E, B>): <TR, TO, TE>(
      self: Kind<T, TR, TO, TE, A>
    ) => Kind<F, R, O, E, Kind<T, TR, TO, TE, A>> => T.traverse(F)(a => pipe(f(a), F.map(() => a)))
