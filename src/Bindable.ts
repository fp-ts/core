/**
 * @since 1.0.0
 */
import type { FlatMap } from "@fp-ts/core/FlatMap"
import type { Functor } from "@fp-ts/core/Functor"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { pipe } from "@fp-ts/core/internal/Function"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Bindable<F extends TypeLambda> extends Functor<F>, FlatMap<F> {}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @since 1.0.0
 */
export const tap = <F extends TypeLambda>(Bindable: Bindable<F>) =>
  <A, S, R2, O2, E2>(
    f: (a: A) => Kind<F, S, R2, O2, E2, unknown>
  ): (<R1, O1, E1>(self: Kind<F, S, R1, O1, E1, A>) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A>) =>
    Bindable.flatMap((a) =>
      pipe(
        f(a),
        Bindable.map(() => a)
      )
    )

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category sequencing
 * @since 1.0.0
 */
export const andThenDiscard = <F extends TypeLambda>(Bindable: Bindable<F>) =>
  <S, R2, O2, E2>(
    that: Kind<F, S, R2, O2, E2, unknown>
  ): (<R1, O1, E1, A>(
    self: Kind<F, S, R1, O1, E1, A>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A>) => tap(Bindable)(() => that)

/**
 * @category do notation
 * @since 1.0.0
 */
export const bind = <M extends TypeLambda>(Bindable: Bindable<M>) =>
  <N extends string, A extends object, S, R2, O2, E2, B>(
    name: Exclude<N, keyof A>,
    f: (a: A) => Kind<M, S, R2, O2, E2, B>
  ): <R1, O1, E1>(
    self: Kind<M, S, R1, O1, E1, A>
  ) => Kind<
    M,
    S,
    R1 & R2,
    O1 | O2,
    E1 | E2,
    { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }
  > =>
    Bindable.flatMap((a) =>
      pipe(
        f(a),
        Bindable.map((b) => Object.assign({}, a, { [name]: b }) as any)
      )
    )
