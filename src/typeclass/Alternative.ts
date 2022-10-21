/**
 * @since 1.0.0
 */
import type { TypeLambda } from "@fp-ts/core/HKT"
import type { Covariant } from "@fp-ts/core/typeclass/Covariant"
import type { MonoidalCoproduct } from "@fp-ts/core/typeclass/MonoidalCoproduct"
import * as monoidalCoproduct from "@fp-ts/core/typeclass/MonoidalCoproduct"
import type { NonEmptyAlternative } from "@fp-ts/core/typeclass/NonEmptyAlternative"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Alternative<F extends TypeLambda> extends MonoidalCoproduct<F>, Covariant<F> {}

/**
 * @since 1.0.0
 */
export const fromNonEmptyAlternative = <F extends TypeLambda>(
  NonEmptyAlternative: NonEmptyAlternative<F>,
  zero: MonoidalCoproduct<F>["zero"]
): Alternative<F> => {
  return {
    ...NonEmptyAlternative,
    ...monoidalCoproduct.fromSemigroupalCoproduct(NonEmptyAlternative, zero)
  }
}
