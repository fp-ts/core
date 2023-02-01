/**
 * @since 1.0.0
 */
import { dual, identity, pipe } from "@fp-ts/core/Function"
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"

/**
 * @category type class
 * @since 1.0.0
 */
export interface FlatMap<F extends TypeLambda> extends TypeClass<F> {
  readonly flatMap: <A, R2, O2, E2, B>(
    f: (a: A) => Kind<F, R2, O2, E2, B>
  ) => <R1, O1, E1>(self: Kind<F, R1, O1, E1, A>) => Kind<F, R1 & R2, O1 | O2, E1 | E2, B>
}

/**
 * @since 1.0.0
 */
export const flatten = <F extends TypeLambda>(F: FlatMap<F>) =>
  <R2, O2, E2, R1, O1, E1, A>(
    self: Kind<F, R2, O2, E2, Kind<F, R1, O1, E1, A>>
  ): Kind<F, R1 & R2, O1 | O2, E1 | E2, A> => pipe(self, F.flatMap(identity))

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @since 1.0.0
 */
export const andThen = <F extends TypeLambda>(F: FlatMap<F>) =>
  dual<
    <R1, O1, E1, _, R2, O2, E2, B>(
      self: Kind<F, R1, O1, E1, _>,
      that: Kind<F, R2, O2, E2, B>
    ) => Kind<F, R1 & R2, O1 | O2, E1 | E2, B>,
    <R2, O2, E2, B>(
      that: Kind<F, R2, O2, E2, B>
    ) => <R1, O1, E1, _>(
      self: Kind<F, R1, O1, E1, _>
    ) => Kind<F, R1 & R2, O1 | O2, E1 | E2, B>
  >(2, <R1, O1, E1, _, R2, O2, E2, B>(
    self: Kind<F, R1, O1, E1, _>,
    that: Kind<F, R2, O2, E2, B>
  ): Kind<F, R1 & R2, O1 | O2, E1 | E2, B> => pipe(self, F.flatMap(() => that)))

/**
 * @since 1.0.0
 */
export const composeKleisliArrow = <F extends TypeLambda>(
  F: FlatMap<F>
) =>
  dual<
    <A, R1, O1, E1, B, R2, O2, E2, C>(
      afb: (a: A) => Kind<F, R1, O1, E1, B>,
      bfc: (b: B) => Kind<F, R2, O2, E2, C>
    ) => (a: A) => Kind<F, R1 & R2, O1 | O2, E1 | E2, C>,
    <B, R2, O2, E2, C>(
      bfc: (b: B) => Kind<F, R2, O2, E2, C>
    ) => <A, R1, O1, E1>(
      afb: (a: A) => Kind<F, R1, O1, E1, B>
    ) => (a: A) => Kind<F, R1 & R2, O1 | O2, E1 | E2, C>
  >(
    2,
    <A, R1, O1, E1, B, R2, O2, E2, C>(
      afb: (a: A) => Kind<F, R1, O1, E1, B>,
      bfc: (b: B) => Kind<F, R2, O2, E2, C>
    ): ((a: A) => Kind<F, R1 & R2, O1 | O2, E1 | E2, C>) => a => pipe(afb(a), F.flatMap(bfc))
  )
