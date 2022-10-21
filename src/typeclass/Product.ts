/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { head, isNonEmpty, tail } from "@fp-ts/core/internal/NonEmptyReadonlyArray"
import { fromIterable } from "@fp-ts/core/internal/ReadonlyArray"
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
