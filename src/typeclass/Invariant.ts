/**
 * @since 1.0.0
 */
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Invariant<F extends TypeLambda> extends TypeClass<F> {
  readonly imap: <A, B>(
    to: (a: A) => B,
    from: (b: B) => A
  ) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
}
