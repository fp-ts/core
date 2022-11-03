/**
 * @since 1.0.0
 */

import type { Kind, TypeClass, TypeLambda, Variance } from "@fp-ts/core/HKT"
import { identity, pipe } from "@fp-ts/core/internal/Function"
import type { Foldable } from "@fp-ts/core/typeclass/Foldable"
import type { Monoid } from "@fp-ts/core/typeclass/Monoid"

/**
 * @category type class
 * @since 1.0.0
 */
export interface FoldableWithIndex<F extends TypeLambda<Variance.Covariant>, I>
  extends TypeClass<F>
{
  readonly reduceWithIndex: <A, B>(
    b: B,
    f: (b: B, a: A, i: I) => B
  ) => <R, O, E>(self: Kind<F, R, O, E, A>) => B

  readonly reduceRightWithIndex: <A, B>(
    b: B,
    f: (b: B, a: A, i: I) => B
  ) => <R, O, E>(self: Kind<F, R, O, E, A>) => B
}

/**
 * Returns a default `reduceWithIndex` composition.
 *
 * @since 1.0.0
 */
export const reduceWithIndexComposition = <
  F extends TypeLambda<Variance.Covariant>,
  I,
  G extends TypeLambda<Variance.Covariant>,
  J
>(
  F: FoldableWithIndex<F, I>,
  G: FoldableWithIndex<G, J>
) =>
  <B, A>(b: B, f: (b: B, a: A, ij: readonly [I, J]) => B) =>
    <FR, FO, FE, GR, GO, GE>(
      self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>
    ): B =>
      pipe(
        self,
        F.reduceWithIndex(b, (b, ga, i) =>
          pipe(ga, G.reduceWithIndex(b, (b, a, j) => f(b, a, [i, j]))))
      )

/**
 * Returns a default `reduceRightWithIndex` composition.
 *
 * @since 1.0.0
 */
export const reduceRightWithIndexComposition = <
  F extends TypeLambda<Variance.Covariant>,
  I,
  G extends TypeLambda<Variance.Covariant>,
  J
>(
  F: FoldableWithIndex<F, I>,
  G: FoldableWithIndex<G, J>
) =>
  <B, A>(b: B, f: (b: B, a: A, ij: readonly [I, J]) => B) =>
    <FR, FO, FE, GR, GO, GE>(
      self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>
    ): B =>
      pipe(
        self,
        F.reduceRightWithIndex(b, (b, ga, i) =>
          pipe(ga, G.reduceRightWithIndex(b, (b, a, j) => f(b, a, [i, j]))))
      )

/**
 * Returns a default `reduce` implementation.
 *
 * @since 1.0.0
 */
export const reduce = <F extends TypeLambda<Variance.Covariant>, I>(
  F: FoldableWithIndex<F, I>
): Foldable<F>["reduce"] => (b, f) => F.reduceWithIndex(b, f)

/**
 * @since 1.0.0
 */
export const toReadonlyArray = <F extends TypeLambda<Variance.Covariant>, I>(
  F: FoldableWithIndex<F, I>
): <R, O, E, A>(self: Kind<F, R, O, E, A>) => ReadonlyArray<A> => toReadonlyArrayWith(F)(identity)

/**
 * @since 1.0.0
 */
export const toReadonlyArrayWith = <F extends TypeLambda<Variance.Covariant>, I>(
  F: FoldableWithIndex<F, I>
) =>
  <A, B>(f: (a: A, i: I) => B) =>
    <R, O, E>(self: Kind<F, R, O, E, A>): ReadonlyArray<B> =>
      F.reduceWithIndex<A, Array<B>>([], (out, a, i) => {
        out.push(f(a, i))
        return out
      })(self)

/**
 * @since 1.0.0
 */
export const foldMapWithIndex = <F extends TypeLambda<Variance.Covariant>, I>(
  F: FoldableWithIndex<F, I>
) =>
  <M>(M: Monoid<M>) =>
    <A>(f: (a: A, i: I) => M) =>
      <R, O, E>(self: Kind<F, R, O, E, A>): M => M.combineAll(toReadonlyArrayWith(F)(f)(self))
