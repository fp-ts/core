/**
 * @since 1.0.0
 */
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import { empty } from "@fp-ts/core/internal/ReadonlyArray"
import type { Product } from "@fp-ts/core/typeclass/Product"

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
): Product<F>["unit"] => () => F.of(empty)
