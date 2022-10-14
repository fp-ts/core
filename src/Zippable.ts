/**
 * @since 3.0.0
 */
import type { FlatMap } from "@fp-ts/core/FlatMap"
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
  readonly zip: <S, R1, O1, E1, A, R2, O2, E2, B>(
    fa: Kind<F, S, R1, O1, E1, A>,
    fb: Kind<F, S, R2, O2, E2, B>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, readonly [A, B]>
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromBinary = <F extends TypeLambda>(
  Functor: Functor<F>,
  zip: <S, R1, O1, E1, A, R2, O2, E2, B>(
    fa: Kind<F, S, R1, O1, E1, A>,
    fb: Kind<F, S, R2, O2, E2, B>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, readonly [A, B]>
): Zippable<F> => {
  return {
    map: Functor.map,
    zip
  }
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromFlatMap = <F extends TypeLambda>(FlatMap: FlatMap<F>): Zippable<F> =>
  fromBinary(
    FlatMap,
    (fa, fb) => pipe(fa, FlatMap.flatMap(a => pipe(fb, FlatMap.map(b => [a, b]))))
  )

/**
 * @since 3.0.0
 */
export const ap = <F extends TypeLambda>(Zippable: Zippable<F>): <S, R2, O2, E2, A>(
  fa: Kind<F, S, R2, O2, E2, A>
) => <R1, O1, E1, B>(
  self: Kind<F, S, R1, O1, E1, (a: A) => B>
) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, B> =>
  fa => fab => pipe(Zippable.zip(fa, fab), Zippable.map(([a, f]) => f(a)))

/**
 * Returns a default `zip` composition.
 *
 * @since 3.0.0
 */
export const zipComposition = <F extends TypeLambda, G extends TypeLambda>(
  ZippableF: Zippable<F>,
  ZippableG: Zippable<G>
) =>
  <FS, FR1, FO1, FE1, GS, GR1, GO1, GE1, A, FR2, FO2, FE2, GR2, GO2, GE2, B>(
    fa: Kind<F, FS, FR1, FO1, FE1, Kind<G, GS, GR1, GO1, GE1, A>>,
    fb: Kind<F, FS, FR2, FO2, FE2, Kind<G, GS, GR2, GO2, GE2, B>>
  ): Kind<
    F,
    FS,
    FR1 & FR2,
    FO1 | FO2,
    FE1 | FE2,
    Kind<G, GS, GR1 & GR2, GO1 | GO2, GE1 | GE2, readonly [A, B]>
  > => pipe(ZippableF.zip(fa, fb), ZippableF.map(([ga, gb]) => ZippableG.zip(ga, gb)))

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
        Zippable.zip(self, that),
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
    return semigroup.fromBinary((fa1, fa2) =>
      pipe(fa1, zip(fa2, (a1, a2) => Semigroup.combine(a1, a2)))
    )
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
        Zippable.zip(Zippable.zip(fa, fb), fc),
        Zippable.map(([[a, b], c]) => f(a, b, c))
      )
