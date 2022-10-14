/**
 * @since 3.0.0
 */

import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import type { Monoid } from "@fp-ts/core/Monoid"

/**
 * @category type class
 * @since 3.0.0
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
 * @since 3.0.0
 */
export const foldMapWithIndex = <F extends TypeLambda, I>(
  FoldableWithIndex: FoldableWithIndex<F, I>
) =>
  <M>(Monoid: Monoid<M>) =>
    <A>(f: (a: A, i: I) => M): <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => M =>
      FoldableWithIndex.reduceWithIndex(Monoid.empty, (m, a, i) => Monoid.combine(m, f(a, i)))
