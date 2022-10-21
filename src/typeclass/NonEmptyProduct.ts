/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { pipe } from "@fp-ts/core/internal/Function"
import type { Invariant } from "@fp-ts/core/typeclass/Invariant"

/**
 * @category type class
 * @since 1.0.0
 */
export interface NonEmptyProduct<F extends TypeLambda> extends Invariant<F> {
  readonly product: <R2, O2, E2, B>(
    that: Kind<F, R2, O2, E2, B>
  ) => <R1, O1, E1, A>(
    self: Kind<F, R1, O1, E1, A>
  ) => Kind<F, R1 & R2, O1 | O2, E1 | E2, readonly [A, B]>

  readonly productMany: <R, O, E, A>(
    collection: Iterable<Kind<F, R, O, E, A>>
  ) => (self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, readonly [A, ...ReadonlyArray<A>]>
}

/**
 * @since 1.0.0
 */
export const zip3 = <F extends TypeLambda>(F: NonEmptyProduct<F>) =>
  <R, O, E, A, B, C>(
    fa: Kind<F, R, O, E, A>,
    fb: Kind<F, R, O, E, B>,
    fc: Kind<F, R, O, E, C>
  ): Kind<F, R, O, E, readonly [A, B, C]> =>
    pipe(
      fa,
      F.product(fb),
      F.product(fc),
      F.imap(([[a, b], c]) => [a, b, c] as const, ([a, b, c]) => [[a, b], c] as const)
    )
