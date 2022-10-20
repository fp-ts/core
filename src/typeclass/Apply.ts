/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { pipe } from "@fp-ts/core/internal/Function"
import type { Associative } from "@fp-ts/core/typeclass/Associative"
import type { AssociativeProduct } from "@fp-ts/core/typeclass/AssociativeProduct"
import type { Covariant } from "@fp-ts/core/typeclass/Covariant"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Apply<F extends TypeLambda> extends AssociativeProduct<F>, Covariant<F> {}

/**
 * @category constructors
 * @since 1.0.0
 */
export const fromCovariant = <F extends TypeLambda>(
  Covariant: Covariant<F>,
  product: Apply<F>["product"]
): Apply<F> => {
  return {
    ...Covariant,
    product,
    productMany: <S, R, O, E, A>(
      collection: Iterable<Kind<F, S, R, O, E, A>>
    ) =>
      (self: Kind<F, S, R, O, E, A>) => {
        let out: Kind<F, S, R, O, E, [A, ...Array<A>]> = pipe(
          self,
          Covariant.map(a => [a])
        )
        for (const fa of collection) {
          out = pipe(out, product(fa), Covariant.map(([[head, ...tail], a]) => [head, ...tail, a]))
        }
        return out
      }
  }
}

/**
 * Returns a default `product` composition.
 *
 * @since 1.0.0
 */
export const productComposition = <F extends TypeLambda, G extends TypeLambda>(
  F: Apply<F>,
  G: Apply<G>
) =>
  <FS, FR2, FO2, FE2, GS, GR2, GO2, GE2, B>(
    that: Kind<F, FS, FR2, FO2, FE2, Kind<G, GS, GR2, GO2, GE2, B>>
  ) =>
    <FR1, FO1, FE1, GR1, GO1, GE1, A>(
      self: Kind<F, FS, FR1, FO1, FE1, Kind<G, GS, GR1, GO1, GE1, A>>
    ): Kind<
      F,
      FS,
      FR1 & FR2,
      FO1 | FO2,
      FE1 | FE2,
      Kind<G, GS, GR1 & GR2, GO1 | GO2, GE1 | GE2, readonly [A, B]>
    > => pipe(self, F.product(that), F.map(([ga, gb]) => pipe(ga, G.product(gb))))

/**
 * Returns a default `productMany` composition.
 *
 * @since 1.0.0
 */
export const productManyComposition = <F extends TypeLambda, G extends TypeLambda>(
  F: Apply<F>,
  G: Apply<G>
) =>
  <FS, FR, FO, FE, GS, GR, GO, GE, A>(
    collection: Iterable<Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>>
  ) =>
    (
      self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
    ): Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, readonly [A, ...ReadonlyArray<A>]>> =>
      pipe(
        self,
        F.productMany(collection),
        F.map(([ga, ...gas]) => pipe(ga, G.productMany(gas)))
      )

/**
 * Lift an `Associative` into 'F', the inner values are combined using the provided `Associative`.
 *
 * @since 1.0.0
 */
export const liftAssociative = <F extends TypeLambda>(F: Apply<F>) =>
  <A, S, R, O, E>(Associative: Associative<A>): Associative<Kind<F, S, R, O, E, A>> => ({
    combine: that =>
      self => pipe(self, F.product(that), F.map(([a1, a2]) => Associative.combine(a2)(a1))),
    combineMany: collection =>
      self =>
        pipe(
          self,
          F.productMany(collection),
          F.map(([head, ...tail]) => pipe(head, Associative.combineMany(tail)))
        )
  })

/**
 * @since 1.0.0
 */
export const ap = <F extends TypeLambda>(F: Apply<F>) =>
  <S, R2, O2, E2, A>(
    fa: Kind<F, S, R2, O2, E2, A>
  ) =>
    <R1, O1, E1, B>(
      self: Kind<F, S, R1, O1, E1, (a: A) => B>
    ): Kind<F, S, R1 & R2, O1 | O2, E1 | E2, B> =>
      pipe(self, F.product(fa), F.map(([f, a]) => f(a)))

/**
 * @since 1.0.0
 */
export const andThenDiscard = <F extends TypeLambda>(F: Apply<F>) =>
  <S, R2, O2, E2>(
    that: Kind<F, S, R2, O2, E2, unknown>
  ) =>
    <R1, O1, E1, A>(
      self: Kind<F, S, R1, O1, E1, A>
    ): Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A> => pipe(self, F.product(that), F.map(([a]) => a))

/**
 * @since 1.0.0
 */
export const andThen = <F extends TypeLambda>(F: Apply<F>) =>
  <S, R2, O2, E2, A>(
    that: Kind<F, S, R2, O2, E2, A>
  ) =>
    <R1, O1, E1>(
      self: Kind<F, S, R1, O1, E1, unknown>
    ): Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A> => pipe(self, F.product(that), F.map(([_, a]) => a))

/**
 * @since 1.0.0
 */
export const bindRight = <F extends TypeLambda>(F: Apply<F>) =>
  <N extends string, A extends object, S, R2, O2, E2, B>(
    name: Exclude<N, keyof A>,
    fb: Kind<F, S, R2, O2, E2, B>
  ) =>
    <R1, O1, E1>(
      self: Kind<F, S, R1, O1, E1, A>
    ): Kind<
      F,
      S,
      R1 & R2,
      O1 | O2,
      E1 | E2,
      { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }
    > =>
      pipe(
        self,
        F.product(fb),
        F.map(([a, b]) => Object.assign({}, a, { [name]: b }) as any)
      )

/**
 * @since 1.0.0
 */
export const productFlatten = <F extends TypeLambda>(F: Apply<F>) =>
  <S, R2, O2, E2, B>(
    that: Kind<F, S, R2, O2, E2, B>
  ) =>
    <R1, O1, E1, A extends ReadonlyArray<unknown>>(
      self: Kind<F, S, R1, O1, E1, A>
    ): Kind<F, S, R1 & R2, O1 | O2, E1 | E2, readonly [...A, B]> =>
      pipe(self, F.product(that), F.map(([a, b]) => [...a, b] as const))

/**
 * Lifts a binary function into `F`.
 *
 * @since 1.0.0
 */
export const lift2 = <F extends TypeLambda>(F: Apply<F>) =>
  <A, B, C>(f: (a: A, b: B) => C) =>
    <S, R1, O1, E1, R2, O2, E2>(
      fa: Kind<F, S, R1, O1, E1, A>,
      fb: Kind<F, S, R2, O2, E2, B>
    ): Kind<F, S, R1 & R2, O1 | O2, E1 | E2, C> =>
      pipe(fa, F.product(fb), F.map(([a, b]) => f(a, b)))

/**
 * Lifts a ternary function into 'F'.
 *
 * @since 1.0.0
 */
export const lift3 = <F extends TypeLambda>(F: Apply<F>) =>
  <A, B, C, D>(f: (a: A, b: B, c: C) => D) =>
    <S, R1, O1, E1, R2, O2, E2, R3, O3, E3>(
      fa: Kind<F, S, R1, O1, E1, A>,
      fb: Kind<F, S, R2, O2, E2, B>,
      fc: Kind<F, S, R3, O3, E3, C>
    ): Kind<F, S, R1 & R2 & R3, O1 | O2 | O3, E1 | E2 | E3, D> =>
      pipe(
        fa,
        F.product(fb),
        F.product(fc),
        F.map(([[a, b], c]) => f(a, b, c))
      )
