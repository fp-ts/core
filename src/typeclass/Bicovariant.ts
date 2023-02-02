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
  readonly bimap: <E1, E2, A, B>(
    f: (e: E1) => E2,
    g: (a: A) => B
  ) => <R, O>(self: Kind<F, R, O, E1, A>) => Kind<F, R, O, E2, B>
}

/**
 * Returns a default `bimap` composition.
 *
 * @since 1.0.0
 */
export const bimapComposition = <F extends TypeLambda, G extends TypeLambda>(
  CovariantF: Covariant<F>,
  BicovariantG: Bicovariant<G>
) =>
  <E1, E2, A, B>(
    f: (e: E1) => E2,
    g: (a: A) => B
  ): (<FR, FO, FE, GR, GO>(
    self: Kind<F, FR, FO, FE, Kind<G, GR, GO, E1, A>>
  ) => Kind<F, FR, FO, FE, Kind<G, GR, GO, E2, B>>) => CovariantF.map(BicovariantG.bimap(f, g))

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
    pipe(self, F.bimap(f, identity)))

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
    pipe(self, F.bimap(identity, f)))
