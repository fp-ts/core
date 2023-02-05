/**
 * @since 1.0.0
 */
import { dual } from "@fp-ts/core/Function"
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"

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
 * Returns a default ternary `imap` composition.
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
 * @category do notation
 * @since 1.0.0
 */
export const bindTo = <F extends TypeLambda>(F: Invariant<F>): {
  <N extends string>(
    name: N
  ): <R, O, E, A>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, { [K in N]: A }>
  <R, O, E, A, N extends string>(
    self: Kind<F, R, O, E, A>,
    name: N
  ): Kind<F, R, O, E, { [K in N]: A }>
} =>
  dual(2, <R, O, E, A, N extends string>(
    self: Kind<F, R, O, E, A>,
    name: N
  ): Kind<F, R, O, E, { [K in N]: A }> =>
    F.imap(self, a => ({ [name]: a } as any), ({ [name]: a }) => a))

/**
 * @since 1.0.0
 */
export const tupled = <F extends TypeLambda>(
  F: Invariant<F>
): (<R, O, E, A>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, [A]>) =>
  F.imap(a => [a], ([a]) => a)
