/**
 * @since 3.0.0
 */
import type { Functor } from "@fp-ts/core/Functor"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { identity, pipe } from "@fp-ts/core/internal/Function"
import type { Semigroup } from "@fp-ts/core/Semigroup"
import * as semigroup from "@fp-ts/core/Semigroup"

/**
 * @category type class
 * @since 3.0.0
 */
export interface Semigroupal<F extends TypeLambda> extends Functor<F> {
  /**
   * Zips this effect with the specified effect using the
   * specified combiner function.
   */
  readonly zipWith: <S, R1, O1, E1, A, R2, O2, E2, B, C>(
    fa: Kind<F, S, R1, O1, E1, A>,
    fb: Kind<F, S, R2, O2, E2, B>,
    f: (a: A, b: B) => C
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, C>

  readonly zipMany: <S, R, O, E, A>(
    start: Kind<F, S, R, O, E, A>,
    others: Iterable<Kind<F, S, R, O, E, A>>
  ) => Kind<F, S, R, O, E, [A, ...ReadonlyArray<A>]>
}

/**
 * Returns a default `zipWith` composition.
 *
 * @since 3.0.0
 */
export const zipWithComposition = <F extends TypeLambda, G extends TypeLambda>(
  SemigroupalF: Semigroupal<F>,
  SemigroupalG: Semigroupal<G>
) =>
  <FS, FR1, FO1, FE1, GS, GR1, GO1, GE1, A, FR2, FO2, FE2, GR2, GO2, GE2, B, C>(
    fga: Kind<F, FS, FR1, FO1, FE1, Kind<G, GS, GR1, GO1, GE1, A>>,
    fgb: Kind<F, FS, FR2, FO2, FE2, Kind<G, GS, GR2, GO2, GE2, B>>,
    f: (a: A, b: B) => C
  ): Kind<
    F,
    FS,
    FR1 & FR2,
    FO1 | FO2,
    FE1 | FE2,
    Kind<G, GS, GR1 & GR2, GO1 | GO2, GE1 | GE2, C>
  > =>
    pipe(
      SemigroupalF.zipWith(fga, fgb, (ga, gb) => SemigroupalG.zipWith(ga, gb, f))
    )

/**
 * Returns a default `zipMany` composition.
 *
 * @since 3.0.0
 */
export const zipManyComposition = <F extends TypeLambda, G extends TypeLambda>(
  SemigroupalF: Semigroupal<F>,
  SemigroupalG: Semigroupal<G>
) =>
  <FS, FR, FO, FE, GS, GR, GO, GE, A>(
    start: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>,
    others: Iterable<Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>>
  ): Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, [A, ...ReadonlyArray<A>]>> =>
    pipe(
      SemigroupalF.zipMany(start, others),
      SemigroupalF.map(([ga, ...gas]) => SemigroupalG.zipMany(ga, gas))
    )

/**
 * @since 3.0.0
 */
export const ap = <F extends TypeLambda>(Semigroupal: Semigroupal<F>): <S, R2, O2, E2, A>(
  fa: Kind<F, S, R2, O2, E2, A>
) => <R1, O1, E1, B>(
  self: Kind<F, S, R1, O1, E1, (a: A) => B>
) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, B> =>
  fa => fab => Semigroupal.zipWith(fa, fab, (a, f) => f(a))

/**
 * @since 3.0.0
 */
export const zip = <F extends TypeLambda>(Semigroupal: Semigroupal<F>) =>
  <S, R2, O2, E2, B, A>(that: Kind<F, S, R2, O2, E2, B>) =>
    <R1, O1, E1>(
      self: Kind<F, S, R1, O1, E1, A>
    ): Kind<F, S, R1 & R2, O1 | O2, E1 | E2, readonly [A, B]> =>
      Semigroupal.zipWith(self, that, (a, b) => [a, b])

/**
 * Zips this effect with the specified effect using the
 * specified combiner function.
 *
 * @since 3.0.0
 */
export const zipWith = <F extends TypeLambda>(Semigroupal: Semigroupal<F>) =>
  <S, R2, O2, E2, B, A, C>(that: Kind<F, S, R2, O2, E2, B>, f: (a: A, b: B) => C) =>
    <R1, O1, E1>(self: Kind<F, S, R1, O1, E1, A>): Kind<F, S, R1 & R2, O1 | O2, E1 | E2, C> =>
      Semigroupal.zipWith(self, that, f)

/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel, this effect result returned. If either side fails, then the
 * other side will **NOT** be interrupted.
 *
 * @since 3.0.0
 */
export const zipLeftPar = <F extends TypeLambda>(Semigroupal: Semigroupal<F>) =>
  <S, R2, O2, E2>(
    that: Kind<F, S, R2, O2, E2, unknown>
  ) =>
    <R1, O1, E1, A>(
      self: Kind<F, S, R1, O1, E1, A>
    ): Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A> => Semigroupal.zipWith(self, that, identity)

/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel, returning result of provided effect. If either side fails,
 * then the other side will **NOT** be interrupted.
 *
 * @since 3.0.0
 */
export const zipRightPar = <F extends TypeLambda>(Semigroupal: Semigroupal<F>) =>
  <S, R2, O2, E2, A>(
    that: Kind<F, S, R2, O2, E2, A>
  ) =>
    <R1, O1, E1>(
      self: Kind<F, S, R1, O1, E1, unknown>
    ): Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A> => Semigroupal.zipWith(self, that, (_, a) => a)

/**
 * A variant of `FlatMap.bind` that sequentially ignores the scope.
 *
 * @since 3.0.0
 */
export const bindRight = <F extends TypeLambda>(Semigroupal: Semigroupal<F>) =>
  <N extends string, A extends object, S, R2, O2, E2, B>(
    name: Exclude<N, keyof A>,
    fb: Kind<F, S, R2, O2, E2, B>
  ) =>
    <R1, O1, E1>(
      self: Kind<F, S, R1, O1, E1, A>
    ): Kind<
      F,
      S,
      R1 & R2,
      O1 | O2,
      E1 | E2,
      { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }
    > => Semigroupal.zipWith(self, fb, (a, b) => Object.assign({}, a, { [name]: b }) as any)

/**
 * Zips this effect with the specified effect.
 *
 * @since 3.0.0
 */
export const zipFlatten = <F extends TypeLambda>(Semigroupal: Semigroupal<F>) =>
  <S, R2, O2, E2, B>(
    that: Kind<F, S, R2, O2, E2, B>
  ) =>
    <R1, O1, E1, A extends ReadonlyArray<unknown>>(
      self: Kind<F, S, R1, O1, E1, A>
    ): Kind<F, S, R1 & R2, O1 | O2, E1 | E2, readonly [...A, B]> =>
      Semigroupal.zipWith(self, that, (a, b) => [...a, b] as const)

/**
 * Lift a semigroup into 'F', the inner values are combined using the provided `Semigroup`.
 *
 * @since 3.0.0
 */
export const liftSemigroup = <F extends TypeLambda>(Semigroupal: Semigroupal<F>) =>
  <A, S, R, O, E>(Semigroup: Semigroup<A>): Semigroup<Kind<F, S, R, O, E, A>> =>
    semigroup.fromCombine((first, second) => Semigroupal.zipWith(first, second, Semigroup.combine))

/**
 * Lifts a binary function into `F`.
 *
 * @since 3.0.0
 */
export const lift2 = <F extends TypeLambda>(Semigroupal: Semigroupal<F>) =>
  <A, B, C>(f: (a: A, b: B) => C) =>
    <S, R1, O1, E1, R2, O2, E2>(
      fa: Kind<F, S, R1, O1, E1, A>,
      fb: Kind<F, S, R2, O2, E2, B>
    ): Kind<F, S, R1 & R2, O1 | O2, E1 | E2, C> => Semigroupal.zipWith(fa, fb, f)

/**
 * @since 3.0.0
 */
const zip3With = <F extends TypeLambda>(Semigroupal: Semigroupal<F>) =>
  <S, R1, O1, E1, A, R2, O2, E2, B, R3, O3, E3, C, D>(
    fa: Kind<F, S, R1, O1, E1, A>,
    fb: Kind<F, S, R2, O2, E2, B>,
    fc: Kind<F, S, R3, O3, E3, C>,
    f: (a: A, b: B, c: C) => D
  ): Kind<F, S, R1 & R2 & R3, O1 | O2 | O3, E1 | E2 | E3, D> =>
    pipe(
      Semigroupal.zipMany<S, R1, O1, E1, any>(
        fa,
        [fb, fc] as any
      ),
      Semigroupal.map(([a, b, c]) => f(a, b, c))
    )

/**
 * Lifts a ternary function into 'F'.
 *
 * @since 3.0.0
 */
export const lift3 = <F extends TypeLambda>(Semigroupal: Semigroupal<F>) =>
  <A, B, C, D>(f: (a: A, b: B, c: C) => D) =>
    <S, R1, O1, E1, R2, O2, E2, R3, O3, E3>(
      fa: Kind<F, S, R1, O1, E1, A>,
      fb: Kind<F, S, R2, O2, E2, B>,
      fc: Kind<F, S, R3, O3, E3, C>
    ): Kind<F, S, R1 & R2 & R3, O1 | O2 | O3, E1 | E2 | E3, D> =>
      zip3With(Semigroupal)(fa, fb, fc, f)
