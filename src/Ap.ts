/**
 * @since 3.0.0
 */
import type { Covariant } from "@fp-ts/core/Covariant"
import { flow, pipe } from "@fp-ts/core/Function"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import * as semigroup from "@fp-ts/core/Semigroup"
import type { Semigroup } from "@fp-ts/core/Semigroup"

/**
 * @category type class
 * @since 3.0.0
 */
export interface Ap<F extends TypeLambda> extends Covariant<F> {
  readonly ap: <S, R2, O2, E2, A>(
    fa: Kind<F, S, R2, O2, E2, A>
  ) => <R1, O1, E1, B>(
    self: Kind<F, S, R1, O1, E1, (a: A) => B>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, B>
}

/**
 * Returns a default `ap` composition.
 *
 * @since 3.0.0
 */
export const apComposition = <F extends TypeLambda, G extends TypeLambda>(
  ApF: Ap<F>,
  ApG: Ap<G>
) =>
  <FS, FR2, FO2, FE2, GS, GR2, GO2, GE2, A>(
    fa: Kind<F, FS, FR2, FO2, FE2, Kind<G, GS, GR2, GO2, GE2, A>>
  ): (<FR1, FO1, FE1, GR1, GO1, GE1, B>(
    self: Kind<F, FS, FR1, FO1, FE1, Kind<G, GS, GR1, GO1, GE1, (a: A) => B>>
  ) => Kind<
    F,
    FS,
    FR1 & FR2,
    FO1 | FO2,
    FE1 | FE2,
    Kind<G, GS, GR1 & GR2, GO1 | GO2, GE1 | GE2, B>
  >) =>
    flow(
      ApF.map((gab) => (ga: Kind<G, GS, GR2, GO2, GE2, A>) => ApG.ap(ga)(gab)),
      ApF.ap(fa)
    )

/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel, this effect result returned. If either side fails, then the
 * other side will **NOT** be interrupted.
 *
 * @since 3.0.0
 */
export const zipLeftPar = <F extends TypeLambda>(Ap: Ap<F>) =>
  <S, R2, O2, E2>(
    that: Kind<F, S, R2, O2, E2, unknown>
  ): (<R1, O1, E1, A>(
    self: Kind<F, S, R1, O1, E1, A>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A>) =>
    flow(
      Ap.map((a) => () => a),
      Ap.ap(that)
    )

/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel, returning result of provided effect. If either side fails,
 * then the other side will **NOT** be interrupted.
 *
 * @since 3.0.0
 */
export const zipRightPar = <F extends TypeLambda>(Ap: Ap<F>) =>
  <S, R2, O2, E2, A>(
    that: Kind<F, S, R2, O2, E2, A>
  ): (<R1, O1, E1>(
    self: Kind<F, S, R1, O1, E1, unknown>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A>) =>
    flow(
      Ap.map(() => (b: A) => b),
      Ap.ap(that)
    )

/**
 * A variant of `Flattenable.bind` that sequentially ignores the scope.
 *
 * @since 3.0.0
 */
export const bindRight = <F extends TypeLambda>(Ap: Ap<F>) =>
  <N extends string, A extends object, S, R2, O2, E2, B>(
    name: Exclude<N, keyof A>,
    fb: Kind<F, S, R2, O2, E2, B>
  ): (<R1, O1, E1>(
    self: Kind<F, S, R1, O1, E1, A>
  ) => Kind<
    F,
    S,
    R1 & R2,
    O1 | O2,
    E1 | E2,
    { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }
  >) =>
    flow(
      Ap.map((a) => (b: B) => Object.assign({}, a, { [name]: b }) as any),
      Ap.ap(fb)
    )

/**
 * Zips this effect with the specified effect using the
 * specified combiner function.
 *
 * @since 3.0.0
 */
export const zipWith = <F extends TypeLambda>(Ap: Ap<F>) =>
  <S, R2, O2, E2, B, A, C>(that: Kind<F, S, R2, O2, E2, B>, f: (a: A, b: B) => C) =>
    <R1, O1, E1>(self: Kind<F, S, R1, O1, E1, A>): Kind<F, S, R1 & R2, O1 | O2, E1 | E2, C> =>
      pipe(
        self,
        Ap.map(
          (a) => (b: B): C => f(a, b)
        ),
        Ap.ap(that)
      )

/**
 * Zips this effect with the specified effect.
 *
 * @since 3.0.0
 */
export const zipFlatten = <F extends TypeLambda>(Ap: Ap<F>) =>
  <S, R2, O2, E2, B>(
    that: Kind<F, S, R2, O2, E2, B>
  ): (<R1, O1, E1, A extends ReadonlyArray<unknown>>(
    self: Kind<F, S, R1, O1, E1, A>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, readonly [...A, B]>) =>
    zipWith(Ap)(that, (a, b) => [...a, b] as const)

/**
 * Lift a semigroup into 'F', the inner values are combined using the provided `Semigroup`.
 *
 * @since 3.0.0
 */
export const liftSemigroup = <F extends TypeLambda>(Ap: Ap<F>) =>
  <A, S, R, O, E>(Semigroup: Semigroup<A>): Semigroup<Kind<F, S, R, O, E, A>> =>
    semigroup.fromCombine<Kind<F, S, R, O, E, A>>(
      lift2(Ap)((x: A, y: A) => Semigroup.combine(y, x))
    )

/**
 * Lifts a binary function into `F`.
 *
 * @since 3.0.0
 */
export const lift2 = <F extends TypeLambda>(Ap: Ap<F>) =>
  <A, B, C>(f: (a: A, b: B) => C) =>
    <S, R1, O1, E1, R2, O2, E2>(
      fa: Kind<F, S, R1, O1, E1, A>,
      fb: Kind<F, S, R2, O2, E2, B>
    ): Kind<F, S, R1 & R2, O1 | O2, E1 | E2, C> =>
      pipe(
        fa,
        Ap.map((a: A) => (b: B) => f(a, b)),
        Ap.ap(fb)
      )

/**
 * Lifts a ternary function into 'F'.
 *
 * @since 3.0.0
 */
export const lift3 = <F extends TypeLambda>(Ap: Ap<F>) =>
  <A, B, C, D>(f: (a: A, b: B, c: C) => D) =>
    <S, R1, O1, E1, R2, O2, E2, R3, O3, E3>(
      fa: Kind<F, S, R1, O1, E1, A>,
      fb: Kind<F, S, R2, O2, E2, B>,
      fc: Kind<F, S, R3, O3, E3, C>
    ): Kind<F, S, R1 & R2 & R3, O1 | O2 | O3, E1 | E2 | E3, D> =>
      pipe(
        fa,
        Ap.map((a: A) => (b: B) => (c: C) => f(a, b, c)),
        Ap.ap(fb),
        Ap.ap(fc)
      )
