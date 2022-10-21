/**
 * @since 1.0.0
 */
import type { TypeLambda } from "@fp-ts/core/HKT"
import type { Alt } from "@fp-ts/core/typeclass/Alt"
import type { Covariant } from "@fp-ts/core/typeclass/Covariant"
import type { MonoidalCoproduct } from "@fp-ts/core/typeclass/MonoidalCoproduct"
import * as monoidalCoproduct from "@fp-ts/core/typeclass/MonoidalCoproduct"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Alternative<F extends TypeLambda> extends MonoidalCoproduct<F>, Covariant<F> {}

/**
 * @since 1.0.0
 */
export const fromAlt = <F extends TypeLambda>(
  Alt: Alt<F>,
  zero: MonoidalCoproduct<F>["zero"]
): Alternative<F> => {
  return {
    ...Alt,
    ...monoidalCoproduct.fromSemigroupalCoproduct(Alt, zero)
  }
}
