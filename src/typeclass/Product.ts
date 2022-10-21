/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { pipe } from "@fp-ts/core/internal/Function"
import { head, isNonEmpty, tail } from "@fp-ts/core/internal/NonEmptyReadonlyArray"
import { empty, fromIterable } from "@fp-ts/core/internal/ReadonlyArray"
import type { NonEmptyProduct } from "@fp-ts/core/typeclass/NonEmptyProduct"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Product<F extends TypeLambda> extends NonEmptyProduct<F> {
  readonly unit: <S>() => Kind<F, S, unknown, never, never, readonly []>

  readonly productAll: <S, R, O, E, A>(
    collection: Iterable<Kind<F, S, R, O, E, A>>
  ) => Kind<F, S, R, O, E, ReadonlyArray<A>>
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const fromNonEmptyProduct = <F extends TypeLambda>(
  F: NonEmptyProduct<F>,
  unit: Product<F>["unit"]
): Product<F> => {
  return {
    ...F,
    unit,
    productAll: <S, R, O, E, A>(
      collection: Iterable<Kind<F, S, R, O, E, A>>
    ) => {
      const fas = fromIterable(collection)
      return isNonEmpty(fas) ? F.productMany(tail(fas))(head(fas)) : unit<S>()
    }
  }
}

/**
 * @since 1.0.0
 */
export const tuple = <F extends TypeLambda>(F: Product<F>) =>
  <S, T extends ReadonlyArray<Kind<F, S, any, any, any, any>>>(...tuple: T): Kind<
    F,
    S,
    ([T[number]] extends [Kind<F, S, infer R, any, any, any>] ? R : never),
    ([T[number]] extends [Kind<F, S, any, infer O, any, any>] ? O : never),
    ([T[number]] extends [Kind<F, S, any, any, infer E, any>] ? E : never),
    Readonly<{ [I in keyof T]: [T[I]] extends [Kind<F, S, any, any, any, infer A>] ? A : never }>
  > => isNonEmpty(tuple) ? F.productAll(tuple) : F.unit<S>() as any

/**
 * @since 1.0.0
 */
export const struct = <F extends TypeLambda>(F: Product<F>) =>
  <S, R extends Record<string, Kind<F, S, any, any, any, any>>>(r: R): Kind<
    F,
    S,
    ([R[keyof R]] extends [Kind<F, S, infer R, any, any, any>] ? R : never),
    ([R[keyof R]] extends [Kind<F, S, any, infer O, any, any>] ? O : never),
    ([R[keyof R]] extends [Kind<F, S, any, any, infer E, any>] ? E : never),
    { readonly [K in keyof R]: [R[K]] extends [Kind<F, S, any, any, any, infer A>] ? A : never }
  > => {
    const keys = Object.keys(r)
    if (isNonEmpty(keys)) {
      return pipe(
        F.productAll(keys.map(k => r[k])),
        F.imap(values => {
          const out: Record<string, unknown> = {}
          for (let i = 0; i < values.length; i++) {
            out[keys[i]] = values[i]
          }
          return out
        }, (r) => Object.keys(r).map(k => r[k]))
      ) as any
    }
    return pipe(F.unit<S>(), F.imap(() => ({}), () => empty)) as any
  }
