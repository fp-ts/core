/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { pipe } from "@fp-ts/core/internal/Function"
import { isNonEmpty } from "@fp-ts/core/internal/NonEmptyReadonlyArray"
import type { NonEmptyProduct } from "@fp-ts/core/typeclass/NonEmptyProduct"
import type { Of } from "@fp-ts/core/typeclass/Of"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Product<F extends TypeLambda> extends NonEmptyProduct<F>, Of<F> {
  readonly productAll: <R, O, E, A>(
    collection: Iterable<Kind<F, R, O, E, A>>
  ) => Kind<F, R, O, E, ReadonlyArray<A>>
}

/**
 * @since 1.0.0
 */
export const tuple = <F extends TypeLambda>(F: Product<F>) =>
  <T extends ReadonlyArray<Kind<F, any, any, any, any>>>(...tuple: T): Kind<
    F,
    ([T[number]] extends [Kind<F, infer R, any, any, any>] ? R : never),
    ([T[number]] extends [Kind<F, any, infer O, any, any>] ? O : never),
    ([T[number]] extends [Kind<F, any, any, infer E, any>] ? E : never),
    Readonly<{ [I in keyof T]: [T[I]] extends [Kind<F, any, any, any, infer A>] ? A : never }>
  > => isNonEmpty(tuple) ? F.productAll(tuple) : F.of([]) as any

/**
 * @since 1.0.0
 */
export const struct = <F extends TypeLambda>(F: Product<F>) =>
  <R extends Record<string, Kind<F, any, any, any, any>>>(r: R): Kind<
    F,
    ([R[keyof R]] extends [Kind<F, infer R, any, any, any>] ? R : never),
    ([R[keyof R]] extends [Kind<F, any, infer O, any, any>] ? O : never),
    ([R[keyof R]] extends [Kind<F, any, any, infer E, any>] ? E : never),
    { readonly [K in keyof R]: [R[K]] extends [Kind<F, any, any, any, infer A>] ? A : never }
  > => {
    const keys = Object.keys(r)
    return isNonEmpty(keys) ?
      pipe(
        F.productAll(keys.map(k => r[k])),
        F.imap(values => {
          const out: Record<string, unknown> = {}
          for (let i = 0; i < values.length; i++) {
            out[keys[i]] = values[i]
          }
          return out
        }, (r) => Object.keys(r).map(k => r[k]))
      ) :
      pipe(F.of([]), F.imap(() => ({}), () => [])) as any
  }

/**
 * @category do notation
 * @since 1.0.0
 */
export const bindRight = <F extends TypeLambda>(F: Product<F>) =>
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
