/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { pipe } from "@fp-ts/core/internal/Function"
import type { Covariant } from "@fp-ts/core/typeclass/Covariant"
import type { Invariant } from "@fp-ts/core/typeclass/Invariant"
import type { NonEmptyApplicative } from "@fp-ts/core/typeclass/NonEmptyApplicative"

/**
 * @category type class
 * @since 1.0.0
 */
export interface NonEmptyProduct<F extends TypeLambda> extends Invariant<F> {
  readonly product: <R2, O2, E2, B>(
    that: Kind<F, R2, O2, E2, B>
  ) => <R1, O1, E1, A>(
    self: Kind<F, R1, O1, E1, A>
  ) => Kind<F, R1 & R2, O1 | O2, E1 | E2, readonly [A, B]>

  readonly productMany: <R, O, E, A>(
    collection: Iterable<Kind<F, R, O, E, A>>
  ) => (self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, readonly [A, ...ReadonlyArray<A>]>
}

/**
 * Returns a default `product` composition.
 *
 * @since 1.0.0
 */
export const productComposition = <F extends TypeLambda, G extends TypeLambda>(
  F: NonEmptyApplicative<F>,
  G: NonEmptyProduct<G>
) =>
  <FR2, FO2, FE2, GR2, GO2, GE2, B>(
    that: Kind<F, FR2, FO2, FE2, Kind<G, GR2, GO2, GE2, B>>
  ) =>
    <FR1, FO1, FE1, GR1, GO1, GE1, A>(
      self: Kind<F, FR1, FO1, FE1, Kind<G, GR1, GO1, GE1, A>>
    ): Kind<
      F,
      FR1 & FR2,
      FO1 | FO2,
      FE1 | FE2,
      Kind<G, GR1 & GR2, GO1 | GO2, GE1 | GE2, readonly [A, B]>
    > => pipe(self, F.product(that), F.map(([ga, gb]) => pipe(ga, G.product(gb))))

/**
 * Returns a default `productMany` implementation (useful for tests).
 *
 * @category constructors
 * @since 1.0.0
 */
export const productMany = <F extends TypeLambda>(
  Covariant: Covariant<F>,
  product: NonEmptyProduct<F>["product"]
): NonEmptyProduct<F>["productMany"] =>
  <R, O, E, A>(
    collection: Iterable<Kind<F, R, O, E, A>>
  ) =>
    (self: Kind<F, R, O, E, A>) => {
      let out = pipe(
        self,
        Covariant.map((a): readonly [A, ...Array<A>] => [a])
      )
      for (const fa of collection) {
        out = pipe(
          out,
          product(fa),
          Covariant.map(([[head, ...tail], a]): readonly [A, ...Array<A>] => [head, ...tail, a])
        )
      }
      return out
    }

/**
 * Returns a default `productMany` composition.
 *
 * @since 1.0.0
 */
export const productManyComposition = <F extends TypeLambda, G extends TypeLambda>(
  F: NonEmptyApplicative<F>,
  G: NonEmptyProduct<G>
) =>
  <FR, FO, FE, GR, GO, GE, A>(
    collection: Iterable<Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>>
  ) =>
    (
      self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>
    ): Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, readonly [A, ...ReadonlyArray<A>]>> =>
      pipe(
        self,
        F.productMany(collection),
        F.map(([ga, ...gas]) => pipe(ga, G.productMany(gas)))
      )

/**
 * @since 1.0.0
 */
export const bindRight = <F extends TypeLambda>(F: NonEmptyProduct<F>) =>
  <N extends string, A extends object, R2, O2, E2, B>(
    name: Exclude<N, keyof A>,
    fb: Kind<F, R2, O2, E2, B>
  ) =>
    <R1, O1, E1>(
      self: Kind<F, R1, O1, E1, A>
    ): Kind<
      F,
      R1 & R2,
      O1 | O2,
      E1 | E2,
      { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }
    > =>
      pipe(
        self,
        F.product(fb),
        F.imap(
          ([a, b]) => Object.assign({}, a, { [name]: b }) as any,
          ({ [name]: b, ...rest }) => [rest, b] as any
        )
      )

/**
 * @since 1.0.0
 */
export const productFlatten = <F extends TypeLambda>(F: NonEmptyProduct<F>) =>
  <R2, O2, E2, B>(
    that: Kind<F, R2, O2, E2, B>
  ) =>
    <R1, O1, E1, A extends ReadonlyArray<any>>(
      self: Kind<F, R1, O1, E1, A>
    ): Kind<F, R1 & R2, O1 | O2, E1 | E2, readonly [...A, B]> =>
      pipe(
        self,
        F.product(that),
        F.imap(([a, b]) => [...a, b] as const, ab => [ab.slice(0, -1), ab[ab.length - 1]] as any)
      )
