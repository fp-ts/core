/**
 * @since 1.0.0
 */
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import type { Invariant } from "@fp-ts/core/typeclass/Invariant"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Covariant<F extends TypeLambda> extends TypeClass<F> {
  readonly map: <A, B>(
    f: (a: A) => B
  ) => <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>
}

/**
 * Returns a default `imap` composition.
 *
 * @since 1.0.0
 */
export const imap = <F extends TypeLambda>(F: Covariant<F>): Invariant<F>["imap"] =>
  (to, _) => F.map(to)

/**
 * Returns a default `map` composition.
 *
 * @since 1.0.0
 */
export const mapComposition = <F extends TypeLambda, G extends TypeLambda>(
  F: Covariant<F>,
  G: Covariant<G>
): (<A, B>(
  f: (a: A) => B
) => <FR, FO, FE, GR, GO, GE>(
  self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>
) => Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, B>>) => f => F.map(G.map(f))

/**
 * @category mapping
 * @since 1.0.0
 */
export const flap = <F extends TypeLambda>(F: Covariant<F>) =>
  <A>(a: A): (<R, O, E, B>(self: Kind<F, R, O, E, (a: A) => B>) => Kind<F, R, O, E, B>) =>
    F.map(f => f(a))

/**
 * @category mapping
 * @since 1.0.0
 */
export const as = <F extends TypeLambda>(F: Covariant<F>) =>
  <B>(b: B): (<R, O, E, _>(self: Kind<F, R, O, E, _>) => Kind<F, R, O, E, B>) => F.map(() => b)

/**
 * @category mapping
 * @since 1.0.0
 */
export const asUnit = <F extends TypeLambda>(
  F: Covariant<F>
): (<R, O, E, _>(self: Kind<F, R, O, E, _>) => Kind<F, R, O, E, void>) => as(F)<void>(undefined)

const let_ = <F extends TypeLambda>(
  F: Covariant<F>
): (<N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R, O, E>(
  self: Kind<F, R, O, E, A>
) => Kind<F, R, O, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>) =>
  (name, f) => F.map(a => Object.assign({}, a, { [name]: f(a) }) as any)

export {
  /**
   * @category do notation
   * @since 1.0.0
   */
  let_ as let
}
