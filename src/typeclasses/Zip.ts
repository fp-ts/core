/**
 * @since 3.0.0
 */
import { identity, pipe } from "@fp-ts/core/data/Function"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type { Apply } from "@fp-ts/core/typeclasses/Apply"
import type { Functor } from "@fp-ts/core/typeclasses/Functor"
import type { Semigroup } from "@fp-ts/core/typeclasses/Semigroup"

/**
 * @category model
 * @since 3.0.0
 */
export interface Zip<F extends TypeLambda> extends Functor<F> {
  readonly zip: <S, R1, O1, E1, A, R2, O2, E2, B>(
    fa: Kind<F, S, R1, O1, E1, A>,
    fb: Kind<F, S, R2, O2, E2, B>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, readonly [A, B]>
}

/**
 * @since 3.0.0
 */
export const ap = <F extends TypeLambda>(Zip: Zip<F>): Apply<F>["ap"] =>
  fa => fab => pipe(Zip.zip(fa, fab), Zip.map(([a, f]) => f(a)))

/**
 * Returns a default `zip` composition.
 *
 * @since 3.0.0
 */
export const zipComposition = <F extends TypeLambda, G extends TypeLambda>(
  ZipF: Zip<F>,
  ZipG: Zip<G>
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
  > => pipe(ZipF.zip(fa, fb), ZipF.map(([ga, gb]) => ZipG.zip(ga, gb)))

/**
 * Zips this effect with the specified effect using the
 * specified combiner function.
 *
 * @since 3.0.0
 */
export const zipWith = <F extends TypeLambda>(Zip: Zip<F>) =>
  <S, R2, O2, E2, B, A, C>(that: Kind<F, S, R2, O2, E2, B>, f: (a: A, b: B) => C) =>
    <R1, O1, E1>(self: Kind<F, S, R1, O1, E1, A>): Kind<F, S, R1 & R2, O1 | O2, E1 | E2, C> =>
      pipe(
        Zip.zip(self, that),
        Zip.map(([a, b]) => f(a, b))
      )

/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel, this effect result returned. If either side fails, then the
 * other side will **NOT** be interrupted.
 *
 * @since 3.0.0
 */
export const zipLeftPar = <F extends TypeLambda>(Zip: Zip<F>) =>
  <S, R2, O2, E2>(
    that: Kind<F, S, R2, O2, E2, unknown>
  ): <R1, O1, E1, A>(
    self: Kind<F, S, R1, O1, E1, A>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A> => zipWith(Zip)(that, identity)

/**
 * Returns an effect that executes both this effect and the specified effect,
 * in parallel, returning result of provided effect. If either side fails,
 * then the other side will **NOT** be interrupted.
 *
 * @since 3.0.0
 */
export const zipRightPar = <F extends TypeLambda>(Zip: Zip<F>) =>
  <S, R2, O2, E2, A>(
    that: Kind<F, S, R2, O2, E2, A>
  ): <R1, O1, E1>(
    self: Kind<F, S, R1, O1, E1, unknown>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A> => zipWith(Zip)(that, (_, a) => a)

/**
 * A variant of `Flattenable.bind` that sequentially ignores the scope.
 *
 * @since 3.0.0
 */
export const bindRight = <F extends TypeLambda>(Zip: Zip<F>) =>
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
  >) => zipWith(Zip)(fb, (a, b) => Object.assign({}, a, { [name]: b }) as any)

/**
 * Zips this effect with the specified effect.
 *
 * @since 3.0.0
 */
export const zipFlatten = <F extends TypeLambda>(Zip: Zip<F>) =>
  <S, R2, O2, E2, B>(
    that: Kind<F, S, R2, O2, E2, B>
  ): (<R1, O1, E1, A extends ReadonlyArray<unknown>>(
    self: Kind<F, S, R1, O1, E1, A>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, readonly [...A, B]>) =>
    zipWith(Zip)(that, (a, b) => [...a, b] as const)

/**
 * Lift a semigroup into 'F', the inner values are combined using the provided `Semigroup`.
 *
 * @since 3.0.0
 */
export const liftSemigroup = <F extends TypeLambda>(Zip: Zip<F>) =>
  <A, S, R, O, E>(Semigroup: Semigroup<A>): Semigroup<Kind<F, S, R, O, E, A>> => {
    const zip = zipWith(Zip)
    return {
      combine: (that) =>
        (self) => pipe(self, zip(that, (that, self) => Semigroup.combine(that)(self)))
    }
  }

/**
 * Lifts a binary function into `F`.
 *
 * @since 3.0.0
 */
export const lift2 = <F extends TypeLambda>(Zip: Zip<F>) =>
  <A, B, C>(f: (a: A, b: B) => C) =>
    <S, R1, O1, E1, R2, O2, E2>(
      fa: Kind<F, S, R1, O1, E1, A>,
      fb: Kind<F, S, R2, O2, E2, B>
    ): Kind<F, S, R1 & R2, O1 | O2, E1 | E2, C> => pipe(fa, zipWith(Zip)(fb, f))

/**
 * Lifts a ternary function into 'F'.
 *
 * @since 3.0.0
 */
export const lift3 = <F extends TypeLambda>(Zip: Zip<F>) =>
  <A, B, C, D>(f: (a: A, b: B, c: C) => D) =>
    <S, R1, O1, E1, R2, O2, E2, R3, O3, E3>(
      fa: Kind<F, S, R1, O1, E1, A>,
      fb: Kind<F, S, R2, O2, E2, B>,
      fc: Kind<F, S, R3, O3, E3, C>
    ): Kind<F, S, R1 & R2 & R3, O1 | O2 | O3, E1 | E2 | E3, D> =>
      pipe(
        Zip.zip(Zip.zip(fa, fb), fc),
        Zip.map(([[a, b], c]) => f(a, b, c))
      )
