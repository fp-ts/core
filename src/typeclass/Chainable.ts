/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { pipe } from "@fp-ts/core/internal/Function"
import type { Covariant } from "@fp-ts/core/typeclass/Covariant"
import type { FlatMap } from "@fp-ts/core/typeclass/FlatMap"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Chainable<F extends TypeLambda> extends Covariant<F>, FlatMap<F> {}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @since 1.0.0
 */
export const tap = <F extends TypeLambda>(F: Chainable<F>) =>
  <A, R2, O2, E2>(
    f: (a: A) => Kind<F, R2, O2, E2, unknown>
  ): (<R1, O1, E1>(self: Kind<F, R1, O1, E1, A>) => Kind<F, R1 & R2, O1 | O2, E1 | E2, A>) =>
    F.flatMap(a =>
      pipe(
        f(a),
        F.map(() => a)
      )
    )

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category sequencing
 * @since 1.0.0
 */
export const andThenDiscard = <F extends TypeLambda>(F: Chainable<F>) =>
  <R2, O2, E2>(
    that: Kind<F, R2, O2, E2, unknown>
  ): (<R1, O1, E1, A>(
    self: Kind<F, R1, O1, E1, A>
  ) => Kind<F, R1 & R2, O1 | O2, E1 | E2, A>) => tap(F)(() => that)

/**
 * @category do notation
 * @since 1.0.0
 */
export const bind = <F extends TypeLambda>(F: Chainable<F>) =>
  <N extends string, A extends object, R2, O2, E2, B>(
    name: Exclude<N, keyof A>,
    f: (a: A) => Kind<F, R2, O2, E2, B>
  ): <R1, O1, E1>(
    self: Kind<F, R1, O1, E1, A>
  ) => Kind<
    F,
    R1 & R2,
    O1 | O2,
    E1 | E2,
    { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }
  > =>
    F.flatMap(a =>
      pipe(
        f(a),
        F.map(b => Object.assign({}, a, { [name]: b }) as any)
      )
    )
