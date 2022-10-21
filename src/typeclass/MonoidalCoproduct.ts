/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type { SemigroupalCoproduct } from "@fp-ts/core/typeclass/SemigroupalCoproduct"

/**
 * @category type class
 * @since 1.0.0
 */
export interface MonoidalCoproduct<F extends TypeLambda> extends SemigroupalCoproduct<F> {
  readonly zero: <S>() => Kind<F, S, unknown, never, never, never>

  readonly coproductAll: <S, R, O, E, A>(
    collection: Iterable<Kind<F, S, R, O, E, A>>
  ) => Kind<F, S, R, O, E, A>
}
