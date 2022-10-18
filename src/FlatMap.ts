/**
 * @since 1.0.0
 */
import type { Functor } from "@fp-ts/core/Functor"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { pipe } from "@fp-ts/core/internal/Function"

/**
 * @category type class
 * @since 1.0.0
 */
export interface FlatMap<M extends TypeLambda> extends Functor<M> {
  readonly flatMap: <A, S, R2, O2, E2, B>(
    f: (a: A) => Kind<M, S, R2, O2, E2, B>
  ) => <R1, O1, E1>(self: Kind<M, S, R1, O1, E1, A>) => Kind<M, S, R1 & R2, O1 | O2, E1 | E2, B>
}

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category sequencing
 * @since 1.0.0
 */
export const zipLeft = <F extends TypeLambda>(FlatMap: FlatMap<F>) =>
  <S, R2, O2, E2>(
    that: Kind<F, S, R2, O2, E2, unknown>
  ): (<R1, O1, E1, A>(
    self: Kind<F, S, R1, O1, E1, A>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A>) => tap(FlatMap)(() => that)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 1.0.0
 */
export const zipRight = <F extends TypeLambda>(FlatMap: FlatMap<F>) =>
  <S, R2, O2, E2, A>(
    that: Kind<F, S, R2, O2, E2, A>
  ): (<R1, O1, E1>(
    self: Kind<F, S, R1, O1, E1, unknown>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A>) => FlatMap.flatMap(() => that)

/**
 * @category do notation
 * @since 1.0.0
 */
export const bind = <M extends TypeLambda>(FlatMap: FlatMap<M>) =>
  <N extends string, A extends object, S, R2, O2, E2, B>(
    name: Exclude<N, keyof A>,
    f: (a: A) => Kind<M, S, R2, O2, E2, B>
  ): (<R1, O1, E1>(
    self: Kind<M, S, R1, O1, E1, A>
  ) => Kind<
    M,
    S,
    R1 & R2,
    O1 | O2,
    E1 | E2,
    { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }
  >) =>
    FlatMap.flatMap((a) =>
      pipe(
        f(a),
        FlatMap.map((b) => Object.assign({}, a, { [name]: b }) as any)
      )
    )

/**
 * @since 1.0.0
 */
export const composeKleisli = <F extends TypeLambda>(
  FlatMap: FlatMap<F>
): <B, S, R2, O2, E2, C>(
  bfc: (b: B) => Kind<F, S, R2, O2, E2, C>
) => <A, R1, O1, E1>(
  afb: (a: A) => Kind<F, S, R1, O1, E1, B>
) => (a: A) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, C> =>
  (bc) => (ab) => a => pipe(ab(a), FlatMap.flatMap(bc))

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @since 1.0.0
 */
export const tap = <F extends TypeLambda>(FlatMap: FlatMap<F>) =>
  <A, S, R2, O2, E2>(
    f: (a: A) => Kind<F, S, R2, O2, E2, unknown>
  ): (<R1, O1, E1>(self: Kind<F, S, R1, O1, E1, A>) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A>) =>
    FlatMap.flatMap((a) =>
      pipe(
        f(a),
        FlatMap.map(() => a)
      )
    )
