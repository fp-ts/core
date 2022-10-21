/**
 * @since 1.0.0
 */
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import type { Invariant } from "@fp-ts/core/typeclass/Invariant"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Contravariant<F extends TypeLambda> extends TypeClass<F> {
  readonly contramap: <B, A>(
    f: (b: B) => A
  ) => <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>
}

/**
 * Returns a default `imap` composition.
 *
 * @since 1.0.0
 */
export const imap = <F extends TypeLambda>(F: Contravariant<F>): Invariant<F>["imap"] =>
  (_, from) => F.contramap(from)
