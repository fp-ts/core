/**
 * @since 1.0.0
 */
import { dual, identity, pipe } from "@fp-ts/core/Function"
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import type { Covariant } from "@fp-ts/core/typeclass/Covariant"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Bicovariant<F extends TypeLambda> extends TypeClass<F> {
  readonly bimap: {
    <E1, E2, A, B>(
      f: (e: E1) => E2,
      g: (a: A) => B
    ): <R, O>(self: Kind<F, R, O, E1, A>) => Kind<F, R, O, E2, B>
    <R, O, E1, A, E2, B>(
      self: Kind<F, R, O, E1, A>,
      f: (e: E1) => E2,
      g: (a: A) => B
    ): Kind<F, R, O, E2, B>
  }
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const make = <F extends TypeLambda>(
  bimap: <R, O, E1, A, E2, B>(
    self: Kind<F, R, O, E1, A>,
    f: (e: E1) => E2,
    g: (a: A) => B
  ) => Kind<F, R, O, E2, B>
): Bicovariant<F> => ({
  bimap: dual(3, bimap)
})

/**
 * Returns a default ternary `bimap` composition.
 *
 * @since 1.0.0
 */
export const bimapComposition = <F extends TypeLambda, G extends TypeLambda>(
  CovariantF: Covariant<F>,
  BicovariantG: Bicovariant<G>
) =>
  <FR, FO, FE, GR, GO, E1, A, E2, B>(
    self: Kind<F, FR, FO, FE, Kind<G, GR, GO, E1, A>>,
    f: (e: E1) => E2,
    g: (a: A) => B
  ): Kind<F, FR, FO, FE, Kind<G, GR, GO, E2, B>> =>
    // TODO
    pipe(self, CovariantF.map(BicovariantG.bimap(f, g)))

/**
 * @since 1.0.0
 */
export const mapLeft = <F extends TypeLambda>(
  F: Bicovariant<F>
): {
  <E, G>(f: (e: E) => G): <R, O, A>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, G, A>
  <R, O, E, A, G>(self: Kind<F, R, O, E, A>, f: (e: E) => G): Kind<F, R, O, G, A>
} =>
  dual<
    <E, G>(f: (e: E) => G) => <R, O, A>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, G, A>,
    <R, O, E, A, G>(self: Kind<F, R, O, E, A>, f: (e: E) => G) => Kind<F, R, O, G, A>
  >(2, <R, O, E, A, G>(self: Kind<F, R, O, E, A>, f: (e: E) => G): Kind<F, R, O, G, A> =>
    F.bimap(self, f, identity))

/**
 * Returns a default `map` implementation.
 *
 * @since 1.0.0
 */
export const map = <F extends TypeLambda>(
  F: Bicovariant<F>
): {
  <A, B>(f: (a: A) => B): <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>
  <R, O, E, A, B>(self: Kind<F, R, O, E, A>, f: (a: A) => B): Kind<F, R, O, E, B>
} =>
  dual<
    <A, B>(f: (a: A) => B) => <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>,
    <R, O, E, A, B>(self: Kind<F, R, O, E, A>, f: (a: A) => B) => Kind<F, R, O, E, B>
  >(2, <R, O, E, A, B>(self: Kind<F, R, O, E, A>, f: (a: A) => B): Kind<F, R, O, E, B> =>
    F.bimap(self, identity, f))
