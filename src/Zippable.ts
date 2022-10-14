/**
 * @since 3.0.0
 */
import { identity, pipe } from "@fp-ts/core/Function"
import type { Functor } from "@fp-ts/core/Functor"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type { Semigroup } from "@fp-ts/core/Semigroup"
import * as semigroup from "@fp-ts/core/Semigroup"

/**
 * @category type class
 * @since 3.0.0
 */
export interface Zippable<F extends TypeLambda> extends Functor<F> {
  readonly zipMany: <S, R, O, E, A>(
    start: Kind<F, S, R, O, E, A>,
    others: Iterable<Kind<F, S, R, O, E, A>>
  ) => Kind<F, S, R, O, E, readonly [A, ...ReadonlyArray<A>]>
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromFunctor = <F extends TypeLambda>(
  Functor: Functor<F>,
  zipMany: <S, R, O, E, A>(
    start: Kind<F, S, R, O, E, A>,
    others: Iterable<Kind<F, S, R, O, E, A>>
  ) => Kind<F, S, R, O, E, readonly [A, ...ReadonlyArray<A>]>
): Zippable<F> => {
  return {
    ...Functor,
    zipMany
  }
}

/**
 * @since 3.0.0
 */
export const zip = <F extends TypeLambda>(Zippable: Zippable<F>) =>
  <S, R1, O1, E1, A, R2, O2, E2, B>(
    fa: Kind<F, S, R1, O1, E1, A>,
    fb: Kind<F, S, R2, O2, E2, B>
  ): Kind<F, S, R1 & R2, O1 | O2, E1 | E2, readonly [A, B]> =>
    Zippable.zipMany(fa, [fb] as any) as any

/**
 * @since 3.0.0
 */
export const zip3 = <F extends TypeLambda>(Zippable: Zippable<F>) =>
  <S, R1, O1, E1, A, R2, O2, E2, B, R3, O3, E3, C>(
    fa: Kind<F, S, R1, O1, E1, A>,
    fb: Kind<F, S, R2, O2, E2, B>,
    fc: Kind<F, S, R3, O3, E3, C>
  ): Kind<F, S, R1 & R2 & R3, O1 | O2 | O3, E1 | E2 | E3, readonly [A, B, C]> =>
    Zippable.zipMany(fa, [fb, fc] as any) as any

/**
 * @since 3.0.0
 */
export const ap = <F extends TypeLambda>(Zippable: Zippable<F>): <S, R2, O2, E2, A>(
  fa: Kind<F, S, R2, O2, E2, A>
) => <R1, O1, E1, B>(
  self: Kind<F, S, R1, O1, E1, (a: A) => B>
) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, B> =>
  fa => fab => pipe(zip(Zippable)(fa, fab), Zippable.map(([a, f]) => f(a)))

/**
 * Returns a default `zip` composition.
 *
 * @since 3.0.0
 */
export const zipManyComposition = <F extends TypeLambda, G extends TypeLambda>(
  ZippableF: Zippable<F>,
  ZippableG: Zippable<G>
) =>
  <FS, FR, FO, FE, GS, GR, GO, GE, A>(
    start: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>,
    others: Iterable<Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>>
  ): Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, readonly [A, ...ReadonlyArray<A>]>> =>
    pipe(
      ZippableF.zipMany(start, others),
      ZippableF.map(([ga, ...gas]) => ZippableG.zipMany(ga, gas))
    )

/**
 * Zips this effect with the specified effect using the
 * specified combiner function.
 *
 * @since 3.0.0
 */
export const zipWith = <F extends TypeLambda>(Zippable: Zippable<F>) =>
  <S, R2, O2, E2, B, A, C>(that: Kind<F, S, R2, O2, E2, B>, f: (a: A, b: B) => C) =>
    <R1, O1, E1>(self: Kind<F, S, R1, O1, E1, A>): Kind<F, S, R1 & R2, O1 | O2, E1 | E2, C> =>
      pipe(
        zip(Zippable)(self, that),
        Zippable.map(([a, b]) => f(a, b))
      )

/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel, this effect result returned. If either side fails, then the
 * other side will **NOT** be interrupted.
 *
 * @since 3.0.0
 */
export const zipLeftPar = <F extends TypeLambda>(Zippable: Zippable<F>) =>
  <S, R2, O2, E2>(
    that: Kind<F, S, R2, O2, E2, unknown>
  ): <R1, O1, E1, A>(
    self: Kind<F, S, R1, O1, E1, A>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A> => zipWith(Zippable)(that, identity)

/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel, returning result of provided effect. If either side fails,
 * then the other side will **NOT** be interrupted.
 *
 * @since 3.0.0
 */
export const zipRightPar = <F extends TypeLambda>(Zippable: Zippable<F>) =>
  <S, R2, O2, E2, A>(
    that: Kind<F, S, R2, O2, E2, A>
  ): <R1, O1, E1>(
    self: Kind<F, S, R1, O1, E1, unknown>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A> => zipWith(Zippable)(that, (_, a) => a)

/**
 * A variant of `Flattenable.bind` that sequentially ignores the scope.
 *
 * @since 3.0.0
 */
export const bindRight = <F extends TypeLambda>(Zippable: Zippable<F>) =>
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
  >) => zipWith(Zippable)(fb, (a, b) => Object.assign({}, a, { [name]: b }) as any)

/**
 * Zips this effect with the specified effect.
 *
 * @since 3.0.0
 */
export const zipFlatten = <F extends TypeLambda>(Zippable: Zippable<F>) =>
  <S, R2, O2, E2, B>(
    that: Kind<F, S, R2, O2, E2, B>
  ): (<R1, O1, E1, A extends ReadonlyArray<unknown>>(
    self: Kind<F, S, R1, O1, E1, A>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, readonly [...A, B]>) =>
    zipWith(Zippable)(that, (a, b) => [...a, b] as const)

/**
 * Lift a semigroup into 'F', the inner values are combined using the provided `Semigroup`.
 *
 * @since 3.0.0
 */
export const liftSemigroup = <F extends TypeLambda>(Zippable: Zippable<F>) =>
  <A, S, R, O, E>(Semigroup: Semigroup<A>): Semigroup<Kind<F, S, R, O, E, A>> => {
    const zip = zipWith(Zippable)
    return semigroup.fromCombine((first, second) => pipe(first, zip(second, Semigroup.combine)))
  }

/**
 * Lifts a binary function into `F`.
 *
 * @since 3.0.0
 */
export const lift2 = <F extends TypeLambda>(Zippable: Zippable<F>) =>
  <A, B, C>(f: (a: A, b: B) => C) =>
    <S, R1, O1, E1, R2, O2, E2>(
      fa: Kind<F, S, R1, O1, E1, A>,
      fb: Kind<F, S, R2, O2, E2, B>
    ): Kind<F, S, R1 & R2, O1 | O2, E1 | E2, C> => pipe(fa, zipWith(Zippable)(fb, f))

/**
 * Lifts a ternary function into 'F'.
 *
 * @since 3.0.0
 */
export const lift3 = <F extends TypeLambda>(Zippable: Zippable<F>) =>
  <A, B, C, D>(f: (a: A, b: B, c: C) => D) =>
    <S, R1, O1, E1, R2, O2, E2, R3, O3, E3>(
      fa: Kind<F, S, R1, O1, E1, A>,
      fb: Kind<F, S, R2, O2, E2, B>,
      fc: Kind<F, S, R3, O3, E3, C>
    ): Kind<F, S, R1 & R2 & R3, O1 | O2 | O3, E1 | E2 | E3, D> =>
      pipe(
        zip3(Zippable)(fa, fb, fc),
        Zippable.map(([a, b, c]) => f(a, b, c))
      )
