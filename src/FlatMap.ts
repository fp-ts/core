/**
 * @since 3.0.0
 */
import type { Ap } from "@fp-ts/core/Ap"
import type { ComposeKleisli } from "@fp-ts/core/ComposeKleisli"
import type { Covariant } from "@fp-ts/core/Covariant"
import { flow, pipe } from "@fp-ts/core/Function"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"

/**
 * @category type class
 * @since 3.0.0
 */
export interface FlatMap<M extends TypeLambda> extends Covariant<M> {
  readonly flatMap: <A, S, R2, O2, E2, B>(
    f: (a: A) => Kind<M, S, R2, O2, E2, B>
  ) => <R1, O1, E1>(self: Kind<M, S, R1, O1, E1, A>) => Kind<M, S, R1 & R2, O1 | O2, E1 | E2, B>
}

// -------------------------------------------------------------------------------------
// sequencing
// -------------------------------------------------------------------------------------

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipLeft = <F extends TypeLambda>(FlatMap: FlatMap<F>) => {
  const tap_ = tap(FlatMap)
  return <S, R2, O2, E2>(
    that: Kind<F, S, R2, O2, E2, unknown>
  ): (<R1, O1, E1, A>(
    self: Kind<F, S, R1, O1, E1, A>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A>) => {
    return tap_(() => that)
  }
}

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight = <F extends TypeLambda>(FlatMap: FlatMap<F>) => {
  return <S, R2, O2, E2, A>(
    that: Kind<F, S, R2, O2, E2, A>
  ): (<R1, O1, E1>(
    self: Kind<F, S, R1, O1, E1, unknown>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A>) => {
    return FlatMap.flatMap(() => that)
  }
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
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
 * @since 3.0.0
 */
export const ap = <F extends TypeLambda>(FlatMap: FlatMap<F>): Ap<F>["ap"] =>
  (fa) =>
    (fab) =>
      pipe(
        fab,
        FlatMap.flatMap((f) => pipe(fa, FlatMap.map(f)))
      )

/**
 * @since 3.0.0
 */
export const composeKleisli = <F extends TypeLambda>(
  Flattenable: FlatMap<F>
): ComposeKleisli<F>["composeKleisli"] => (bc) => (ab) => flow(ab, Flattenable.flatMap(bc))

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @since 3.0.0
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
