/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { head, isNonEmpty, tail } from "@fp-ts/core/internal/NonEmptyReadonlyArray"
import type { SemigroupalProduct } from "@fp-ts/core/typeclass/SemigroupalProduct"

/**
 * @category type class
 * @since 1.0.0
 */
export interface MonoidalProduct<F extends TypeLambda> extends SemigroupalProduct<F> {
  readonly unit: <S>() => Kind<F, S, unknown, never, never, readonly []>

  readonly productAll: <S, R, O, E, A>(
    collection: Iterable<Kind<F, S, R, O, E, A>>
  ) => Kind<F, S, R, O, E, ReadonlyArray<A>>
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const fromSemigroupalProduct = <F extends TypeLambda>(
  SemigroupalProduct: SemigroupalProduct<F>,
  unit: MonoidalProduct<F>["unit"]
): MonoidalProduct<F> => {
  return {
    ...SemigroupalProduct,
    unit,
    productAll: <S, R, O, E, A>(
      collection: Iterable<Kind<F, S, R, O, E, A>>
    ) => {
      const fas = Array.from(collection)
      return isNonEmpty(fas) ? SemigroupalProduct.productMany(tail(fas))(head(fas)) : unit<S>()
    }
  }
}
