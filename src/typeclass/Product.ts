/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { pipe } from "@fp-ts/core/internal/Function"
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
  <T extends ReadonlyArray<Kind<F, any, any, any, any>>>(...components: T): Kind<
    F,
    ([T[number]] extends [Kind<F, infer R, any, any, any>] ? R : never),
    ([T[number]] extends [Kind<F, any, infer O, any, any>] ? O : never),
    ([T[number]] extends [Kind<F, any, any, infer E, any>] ? E : never),
    Readonly<{ [I in keyof T]: [T[I]] extends [Kind<F, any, any, any, infer A>] ? A : never }>
  > => F.productAll(components) as any

/**
 * @since 1.0.0
 */
export const struct = <F extends TypeLambda>(F: Product<F>) =>
  <R extends Record<string, Kind<F, any, any, any, any>>>(fields: R): Kind<
    F,
    ([R[keyof R]] extends [Kind<F, infer R, any, any, any>] ? R : never),
    ([R[keyof R]] extends [Kind<F, any, infer O, any, any>] ? O : never),
    ([R[keyof R]] extends [Kind<F, any, any, infer E, any>] ? E : never),
    { readonly [K in keyof R]: [R[K]] extends [Kind<F, any, any, any, infer A>] ? A : never }
  > => {
    const keys = Object.keys(fields)
    return pipe(
      F.productAll(keys.map(k => fields[k])),
      F.imap(values => {
        const out: any = {}
        for (let i = 0; i < values.length; i++) {
          out[keys[i]] = values[i]
        }
        return out
      }, (r) => keys.map(k => r[k]))
    )
  }
