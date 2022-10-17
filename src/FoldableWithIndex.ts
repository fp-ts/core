/**
 * @since 1.0.0
 */

import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import { identity } from "@fp-ts/core/internal/Function"
import type { Monoid } from "@fp-ts/core/Monoid"

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
