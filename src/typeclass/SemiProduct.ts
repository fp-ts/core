/**
 * @since 1.0.0
 */
import { pipe } from "@fp-ts/core/Function"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type { Covariant } from "@fp-ts/core/typeclass/Covariant"
import type { Invariant } from "@fp-ts/core/typeclass/Invariant"
import type { SemiApplicative } from "@fp-ts/core/typeclass/SemiApplicative"

/**
 * @category type class
 * @since 1.0.0
 */
export interface SemiProduct<F extends TypeLambda> extends Invariant<F> {
  readonly product: <R1, O1, E1, A, R2, O2, E2, B>(
    self: Kind<F, R1, O1, E1, A>,
    that: Kind<F, R2, O2, E2, B>
  ) => Kind<F, R1 & R2, O1 | O2, E1 | E2, [A, B]>

  readonly productMany: <R, O, E, A>(
    self: Kind<F, R, O, E, A>,
    collection: Iterable<Kind<F, R, O, E, A>>
  ) => Kind<F, R, O, E, [A, ...Array<A>]>
}

/**
 * Returns a default `product` composition.
 *
 * @since 1.0.0
 */
export const productComposition = <F extends TypeLambda, G extends TypeLambda>(
  F: SemiApplicative<F>,
  G: SemiProduct<G>
) =>
  <FR1, FO1, FE1, GR1, GO1, GE1, A, FR2, FO2, FE2, GR2, GO2, GE2, B>(
    self: Kind<F, FR1, FO1, FE1, Kind<G, GR1, GO1, GE1, A>>,
    that: Kind<F, FR2, FO2, FE2, Kind<G, GR2, GO2, GE2, B>>
  ): Kind<
    F,
    FR1 & FR2,
    FO1 | FO2,
    FE1 | FE2,
    Kind<G, GR1 & GR2, GO1 | GO2, GE1 | GE2, [A, B]>
  > => pipe(F.product(self, that), F.map(([ga, gb]) => G.product(ga, gb)))

/**
 * Returns a default `productMany` composition.
 *
 * @since 1.0.0
 */
export const productManyComposition = <F extends TypeLambda, G extends TypeLambda>(
  F: SemiApplicative<F>,
  G: SemiProduct<G>
) =>
  <FR, FO, FE, GR, GO, GE, A>(
    self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>,
    collection: Iterable<Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>>
  ): Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, [A, ...Array<A>]>> =>
    pipe(
      F.productMany(self, collection),
      F.map(([ga, ...gas]) => G.productMany(ga, gas))
    )

/**
 * Returns a default `productMany` implementation (useful for tests).
 *
 * @category constructors
 * @since 1.0.0
 */
export const productMany = <F extends TypeLambda>(
  Covariant: Covariant<F>,
  product: SemiProduct<F>["product"]
): SemiProduct<F>["productMany"] =>
  <R, O, E, A>(
    self: Kind<F, R, O, E, A>,
    collection: Iterable<Kind<F, R, O, E, A>>
  ) => {
    let out = pipe(
      self,
      Covariant.map((a): [A, ...Array<A>] => [a])
    )
    for (const fa of collection) {
      out = pipe(
        product(out, fa),
        Covariant.map(([[head, ...tail], a]): [A, ...Array<A>] => [head, ...tail, a])
      )
    }
    return out
  }

/**
 * @since 1.0.0
 */
export const andThenBind = <F extends TypeLambda>(F: SemiProduct<F>) =>
  <N extends string, A extends object, R2, O2, E2, B>(
    name: Exclude<N, keyof A>,
    that: Kind<F, R2, O2, E2, B>
  ) =>
    <R1, O1, E1>(
      self: Kind<F, R1, O1, E1, A>
    ): Kind<
      F,
      R1 & R2,
      O1 | O2,
      E1 | E2,
      { [K in keyof A | N]: K extends keyof A ? A[K] : B }
    > =>
      pipe(
        F.product(self, that),
        F.imap(
          ([a, b]) => Object.assign({}, a, { [name]: b }) as any,
          ({ [name]: b, ...rest }) => [rest, b] as any
        )
      )

/**
 * Adds an element to the end of a tuple.
 *
 * @since 1.0.0
 */
export const element = <F extends TypeLambda>(F: SemiProduct<F>) =>
  <R2, O2, E2, B>(
    that: Kind<F, R2, O2, E2, B>
  ) =>
    <R1, O1, E1, A extends ReadonlyArray<any>>(
      self: Kind<F, R1, O1, E1, A>
    ): Kind<F, R1 & R2, O1 | O2, E1 | E2, [...A, B]> =>
      pipe(
        F.product(self, that),
        F.imap(([a, b]) => [...a, b], ab => [ab.slice(0, -1), ab[ab.length - 1]] as any)
      )

/**
 * @since 1.0.0
 */
export const nonEmptyTuple = <F extends TypeLambda>(F: SemiProduct<F>) =>
  <T extends readonly [Kind<F, any, any, any, any>, ...Array<Kind<F, any, any, any, any>>]>(
    ...components: T
  ): Kind<
    F,
    ([T[number]] extends [Kind<F, infer R, any, any, any>] ? R : never),
    ([T[number]] extends [Kind<F, any, infer O, any, any>] ? O : never),
    ([T[number]] extends [Kind<F, any, any, infer E, any>] ? E : never),
    { [I in keyof T]: [T[I]] extends [Kind<F, any, any, any, infer A>] ? A : never }
  > => F.productMany(components[0], components.slice(1)) as any

type EnforceNonEmptyRecord<R> = keyof R extends never ? never : R

/**
 * @since 1.0.0
 */
export const nonEmptyStruct = <F extends TypeLambda>(F: SemiProduct<F>) =>
  <R extends { readonly [x: string]: Kind<F, any, any, any, any> }>(
    fields: EnforceNonEmptyRecord<R> & { readonly [x: string]: Kind<F, any, any, any, any> }
  ): Kind<
    F,
    ([R[keyof R]] extends [Kind<F, infer R, any, any, any>] ? R : never),
    ([R[keyof R]] extends [Kind<F, any, infer O, any, any>] ? O : never),
    ([R[keyof R]] extends [Kind<F, any, any, infer E, any>] ? E : never),
    { [K in keyof R]: [R[K]] extends [Kind<F, any, any, any, infer A>] ? A : never }
  > => {
    const keys = Object.keys(fields)
    return pipe(
      F.productMany(fields[keys[0]], keys.slice(1).map(k => fields[k])),
      F.imap(([value, ...values]) => {
        const out: any = { [keys[0]]: value }
        for (let i = 0; i < values.length; i++) {
          out[keys[i + 1]] = values[i]
        }
        return out
      }, (r) => keys.map(k => r[k]) as any)
    )
  }
