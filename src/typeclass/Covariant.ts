/**
 * @since 1.0.0
 */
import { dual, pipe } from "@fp-ts/core/Function"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type { Invariant } from "@fp-ts/core/typeclass/Invariant"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Covariant<F extends TypeLambda> extends Invariant<F> {
  readonly map: <A, B>(
    f: (a: A) => B
  ) => <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>
}

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
 * Returns a default `imap` implementation.
 *
 * @since 1.0.0
 */
export const imap = <F extends TypeLambda>(map: Covariant<F>["map"]): Invariant<F>["imap"] =>
  dual(3, (self, to, _) => pipe(self, map(to)))

/**
 * @category constructors
 * @since 1.0.0
 */
export const make = <F extends TypeLambda>(map: Covariant<F>["map"]): Covariant<F> => ({
  map,
  imap: imap(map)
})

/**
 * @category mapping
 * @since 1.0.0
 */
export const flap = <F extends TypeLambda>(F: Covariant<F>): {
  <R, O, E, A, B>(self: Kind<F, R, O, E, (a: A) => B>): (a: A) => Kind<F, R, O, E, B>
  <A, R, O, E, B>(a: A, self: Kind<F, R, O, E, (a: A) => B>): Kind<F, R, O, E, B>
} =>
  dual<
    <R, O, E, A, B>(self: Kind<F, R, O, E, (a: A) => B>) => (a: A) => Kind<F, R, O, E, B>,
    <A, R, O, E, B>(a: A, self: Kind<F, R, O, E, (a: A) => B>) => Kind<F, R, O, E, B>
  >(
    2,
    <A, R, O, E, B>(a: A, self: Kind<F, R, O, E, (a: A) => B>): Kind<F, R, O, E, B> =>
      pipe(self, F.map(f => f(a)))
  )

/**
 * @category mapping
 * @since 1.0.0
 */
export const as = <F extends TypeLambda>(F: Covariant<F>): {
  <B>(b: B): <R, O, E, _>(self: Kind<F, R, O, E, _>) => Kind<F, R, O, E, B>
  <R, O, E, _, B>(self: Kind<F, R, O, E, _>, b: B): Kind<F, R, O, E, B>
} =>
  dual<
    <B>(b: B) => <R, O, E, _>(self: Kind<F, R, O, E, _>) => Kind<F, R, O, E, B>,
    <R, O, E, _, B>(self: Kind<F, R, O, E, _>, b: B) => Kind<F, R, O, E, B>
  >(
    2,
    <R, O, E, _, B>(self: Kind<F, R, O, E, _>, b: B): Kind<F, R, O, E, B> =>
      pipe(self, F.map(() => b))
  )

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
) => Kind<F, R, O, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>) =>
  (name, f) => F.map(a => Object.assign({}, a, { [name]: f(a) }) as any)

export {
  /**
   * @category do notation
   * @since 1.0.0
   */
  let_ as let
}
