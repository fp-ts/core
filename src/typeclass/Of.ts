/**
 * @since 1.0.0
 */
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import type { MonoidalProduct } from "@fp-ts/core/typeclass/MonoidalProduct"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Of<F extends TypeLambda> extends TypeClass<F> {
  readonly of: <A, S>(a: A) => Kind<F, S, unknown, never, never, A>
}

/**
 * @since 1.0.0
 */
export const unit = <F extends TypeLambda>(
  F: Of<F>
): MonoidalProduct<F>["unit"] => () => F.of(undefined)
