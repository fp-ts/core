/**
 * @since 1.0.0
 */
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Invariant<F extends TypeLambda> extends TypeClass<F> {
  readonly imap: <S, T>(
    to: (s: S) => T,
    from: (t: T) => S
  ) => <R, O, E, A>(self: Kind<F, S, R, O, E, A>) => Kind<F, T, R, O, E, A>
}
