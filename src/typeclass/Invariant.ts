/**
 * @since 1.0.0
 */
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import { dual } from "@fp-ts/core/internal/Function"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Invariant<F extends TypeLambda> extends TypeClass<F> {
  readonly imap: {
    <A, B>(
      to: (a: A) => B,
      from: (b: B) => A
    ): <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>
    <R, O, E, A, B>(
      self: Kind<F, R, O, E, A>,
      to: (a: A) => B,
      from: (b: B) => A
    ): Kind<F, R, O, E, B>
  }
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const make = <F extends TypeLambda>(
  imap: <R, O, E, A, B>(
    self: Kind<F, R, O, E, A>,
    to: (a: A) => B,
    from: (b: B) => A
  ) => Kind<F, R, O, E, B>
): Invariant<F> => ({
  imap: dual(3, imap)
})

/**
 * Returns a default `imap` composition.
 *
 * @since 1.0.0
 */
export const imapComposition = <F extends TypeLambda, G extends TypeLambda>(
  F: Invariant<F>,
  G: Invariant<G>
) =>
  <FR, FO, FE, GR, GO, GE, A, B>(
    self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>,
    to: (a: A) => B,
    from: (b: B) => A
  ): Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, B>> => F.imap(self, G.imap(to, from), G.imap(from, to))

/**
 * @since 1.0.0
 */
export const bindTo = <F extends TypeLambda>(F: Invariant<F>) =>
  <N extends string>(
    name: N
  ): (<R, O, E, A>(
    self: Kind<F, R, O, E, A>
  ) => Kind<F, R, O, E, { readonly [K in N]: A }>) =>
    F.imap(a => ({ [name]: a } as any), ({ [name]: a }) => a)

/**
 * @since 1.0.0
 */
export const tupled = <F extends TypeLambda>(
  F: Invariant<F>
): (<R, O, E, A>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, [A]>) =>
  F.imap(a => [a], ([a]) => a)
