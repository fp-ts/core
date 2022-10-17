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
 * @since 1.0.0
 */
export const toReadonlyArray = <F extends TypeLambda>(
  Foldable: Foldable<F>
): <S, R, O, E, A>(self: Kind<F, S, R, O, E, A>) => ReadonlyArray<A> =>
  toReadonlyArrayWith(Foldable)(identity)

/**
 * @since 1.0.0
 */
export const toReadonlyArrayWith = <F extends TypeLambda>(
  Foldable: Foldable<F>
) =>
  <A, B>(f: (a: A) => B) =>
    <S, R, O, E>(self: Kind<F, S, R, O, E, A>): ReadonlyArray<B> =>
      Foldable.reduce<A, Array<B>>([], (out, a) => {
        out.push(f(a))
        return out
      })(self)

/**
 * @since 1.0.0
 */
export const foldMap = <F extends TypeLambda>(Foldable: Foldable<F>) =>
  <M>(Monoid: Monoid<M>) =>
    <A>(f: (a: A) => M) =>
      <S, R, O, E>(self: Kind<F, S, R, O, E, A>): M =>
        Monoid.combineAll(toReadonlyArrayWith(Foldable)(f)(self))
