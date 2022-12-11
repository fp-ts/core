/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type { Invariant } from "@fp-ts/core/typeclass/Invariant"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Contravariant<F extends TypeLambda> extends Invariant<F> {
  contramap: <B, A>(
    f: (b: B) => A
  ) => <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>
}

/**
 * Composing two contravariant functors yields a Covariant functor.
 *
 * Returns a default `map` composition.
 *
 * @since 1.0.0
 */
export const contramapComposition = <F extends TypeLambda, G extends TypeLambda>(
  F: Contravariant<F>,
  G: Contravariant<G>
): (<A, B>(
  f: (a: A) => B
) => <FR, FO, FE, GR, GO, GE>(
  self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>
) => Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, B>>) => f => F.contramap(G.contramap(f))

/**
 * Returns a default `imap` implementation.
 *
 * @since 1.0.0
 */
export const imap = <F extends TypeLambda>(
  contramap: Contravariant<F>["contramap"]
): Invariant<F>["imap"] => (_, from) => contramap(from)

/**
 * @category constructors
 * @since 1.0.0
 */
export const make = <F extends TypeLambda>(
  contramap: Contravariant<F>["contramap"]
): Contravariant<F> => ({
  contramap,
  imap: imap(contramap)
})
