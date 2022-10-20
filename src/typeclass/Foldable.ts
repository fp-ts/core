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
 * Returns a default `reduce` composition.
 *
 * @since 1.0.0
 */
export const reduceComposition = <F extends TypeLambda, G extends TypeLambda>(
  F: Foldable<F>,
  G: Foldable<G>
) =>
  <B, A>(b: B, f: (b: B, a: A) => B) =>
    <FS, FR, FO, FE, GS, GR, GO, GE>(
      self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
    ): B => pipe(self, F.reduce(b, (b, ga) => pipe(ga, G.reduce(b, f))))

/**
 * Returns a default `reduceRight` composition.
 *
 * @since 1.0.0
 */
export const reduceRightComposition = <F extends TypeLambda, G extends TypeLambda>(
  F: Foldable<F>,
  G: Foldable<G>
) =>
  <B, A>(b: B, f: (b: B, a: A) => B) =>
    <FS, FR, FO, FE, GS, GR, GO, GE>(
      self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
    ): B => pipe(self, F.reduceRight(b, (b, ga) => pipe(ga, G.reduceRight(b, f))))

/**
 * @since 1.0.0
 */
export const toReadonlyArray = <F extends TypeLambda>(
  F: Foldable<F>
): <S, R, O, E, A>(self: Kind<F, S, R, O, E, A>) => ReadonlyArray<A> =>
  toReadonlyArrayWith(F)(identity)

/**
 * @since 1.0.0
 */
export const toReadonlyArrayWith = <F extends TypeLambda>(
  F: Foldable<F>
) =>
  <A, B>(f: (a: A) => B) =>
    <S, R, O, E>(self: Kind<F, S, R, O, E, A>): ReadonlyArray<B> =>
      F.reduce<A, Array<B>>([], (out, a) => {
        out.push(f(a))
        return out
      })(self)

/**
 * @since 1.0.0
 */
export const foldMap = <F extends TypeLambda>(F: Foldable<F>) =>
  <M>(Monoid: Monoid<M>) =>
    <A>(f: (a: A) => M) =>
      <S, R, O, E>(self: Kind<F, S, R, O, E, A>): M =>
        Monoid.combineAll(toReadonlyArrayWith(F)(f)(self))
