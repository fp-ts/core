/**
 * @since 3.0.0
 */

import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import type { Monoid } from "@fp-ts/core/Monoid"

/**
 * @category model
 * @since 3.0.0
 */
export interface Foldable<F extends TypeLambda> extends TypeClass<F> {
  readonly reduce: <A, B>(
    b: B,
    f: (b: B, a: A) => B
  ) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => B
  readonly reduceRight: <A, B>(
    b: B,
    f: (b: B, a: A) => B
  ) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => B
}

/**
 * @since 3.0.0
 */
export const foldMap = <F extends TypeLambda>(Foldable: Foldable<F>) =>
  <M>(Monoid: Monoid<M>) =>
    <A>(f: (a: A) => M): <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => M =>
      Foldable.reduce(Monoid.empty, (m, a) => Monoid.combine(m, f(a)))
