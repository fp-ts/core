/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type { SemigroupalProduct } from "@fp-ts/core/typeclass/SemigroupalProduct"

/**
 * @category type class
 * @since 1.0.0
 */
export interface MonoidalProduct<F extends TypeLambda> extends SemigroupalProduct<F> {
  readonly unit: <S>() => Kind<F, S, unknown, never, never, void>

  readonly productAll: <S, R, O, E, A>(
    collection: Iterable<Kind<F, S, R, O, E, A>>
  ) => Kind<F, S, R, O, E, ReadonlyArray<A>>
}
