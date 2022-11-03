/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda, Variance } from "@fp-ts/core/HKT"
import type { Invariant } from "@fp-ts/core/typeclass/Invariant"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Covariant<F extends TypeLambda<Variance.Covariant>> extends Invariant<F> {
  readonly map: <A, B>(
    f: (a: A) => B
  ) => <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>
}

/**
 * Returns a default `map` composition.
 *
 * @since 1.0.0
 */
export const mapComposition = <
  F extends TypeLambda<Variance.Covariant>,
  G extends TypeLambda<Variance.Covariant>
>(
  F: Covariant<F>,
  G: Covariant<G>
): (<A, B>(
  f: (a: A) => B
) => <FR, FO, FE, GR, GO, GE>(
  self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>
) => Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, B>>) => f => F.map(G.map(f))

/**
 * Returns a default `imap` implementation.
 *
 * @since 1.0.0
 */
export const imap = <F extends TypeLambda<Variance.Covariant>>(
  map: Covariant<F>["map"]
): Invariant<F>["imap"] => (to, _) => map(to)

/**
 * @category constructors
 * @since 1.0.0
 */
export const make = <F extends TypeLambda<Variance.Covariant>>(
  map: Covariant<F>["map"]
): Covariant<F> => ({
  map,
  imap: imap(map)
})

/**
 * @category mapping
 * @since 1.0.0
 */
export const flap = <F extends TypeLambda<Variance.Covariant>>(F: Covariant<F>) =>
  <A>(a: A): (<R, O, E, B>(self: Kind<F, R, O, E, (a: A) => B>) => Kind<F, R, O, E, B>) =>
    F.map(f => f(a))

/**
 * @category mapping
 * @since 1.0.0
 */
export const as = <F extends TypeLambda<Variance.Covariant>>(F: Covariant<F>) =>
  <B>(b: B): (<R, O, E, _>(self: Kind<F, R, O, E, _>) => Kind<F, R, O, E, B>) => F.map(() => b)

/**
 * @category mapping
 * @since 1.0.0
 */
export const asUnit = <F extends TypeLambda<Variance.Covariant>>(
  F: Covariant<F>
): (<R, O, E, _>(self: Kind<F, R, O, E, _>) => Kind<F, R, O, E, void>) => as(F)<void>(undefined)

const let_ = <F extends TypeLambda<Variance.Covariant>>(
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
   * @since 1.0.0
   */
  let_ as let
}
