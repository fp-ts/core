/**
 * @since 1.0.0
 */

import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import { identity, pipe } from "@fp-ts/core/internal/Function"
import type { Monoid } from "@fp-ts/core/typeclass/Monoid"

/**
 * @category type class
 * @since 1.0.0
 */
export interface FoldableWithIndex<F extends TypeLambda, I> extends TypeClass<F> {
  readonly reduceWithIndex: <A, B>(
    b: B,
    f: (b: B, a: A, i: I) => B
  ) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => B

  readonly reduceRightWithIndex: <A, B>(
    b: B,
    f: (b: B, a: A, i: I) => B
  ) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => B
}

/**
 * Returns a default `reduceWithIndex` composition.
 *
 * @since 1.0.0
 */
export const reduceWithIndexComposition = <F extends TypeLambda, I, G extends TypeLambda, J>(
  F: FoldableWithIndex<F, I>,
  G: FoldableWithIndex<G, J>
) =>
  <B, A>(b: B, f: (b: B, a: A, ij: readonly [I, J]) => B) =>
    <FS, FR, FO, FE, GS, GR, GO, GE>(
      self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
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
export const reduceRightWithIndexComposition = <F extends TypeLambda, I, G extends TypeLambda, J>(
  F: FoldableWithIndex<F, I>,
  G: FoldableWithIndex<G, J>
) =>
  <B, A>(b: B, f: (b: B, a: A, ij: readonly [I, J]) => B) =>
    <FS, FR, FO, FE, GS, GR, GO, GE>(
      self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
    ): B =>
      pipe(
        self,
        F.reduceRightWithIndex(b, (b, ga, i) =>
          pipe(ga, G.reduceRightWithIndex(b, (b, a, j) => f(b, a, [i, j]))))
      )

/**
 * @since 1.0.0
 */
export const toReadonlyArray = <F extends TypeLambda, I>(
  FoldableWithIndex: FoldableWithIndex<F, I>
): <S, R, O, E, A>(self: Kind<F, S, R, O, E, A>) => ReadonlyArray<A> =>
  toReadonlyArrayWith(FoldableWithIndex)(identity)

/**
 * @since 1.0.0
 */
export const toReadonlyArrayWith = <F extends TypeLambda, I>(
  FoldableWithIndex: FoldableWithIndex<F, I>
) =>
  <A, B>(f: (a: A, i: I) => B) =>
    <S, R, O, E>(self: Kind<F, S, R, O, E, A>): ReadonlyArray<B> =>
      FoldableWithIndex.reduceWithIndex<A, Array<B>>([], (out, a, i) => {
        out.push(f(a, i))
        return out
      })(self)

/**
 * @since 1.0.0
 */
export const foldMapWithIndex = <F extends TypeLambda, I>(
  FoldableWithIndex: FoldableWithIndex<F, I>
) =>
  <M>(Monoid: Monoid<M>) =>
    <A>(f: (a: A, i: I) => M) =>
      <S, R, O, E>(self: Kind<F, S, R, O, E, A>): M =>
        Monoid.combineAll(toReadonlyArrayWith(FoldableWithIndex)(f)(self))
