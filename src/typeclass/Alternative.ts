/**
 * @since 1.0.0
 */
import type { TypeLambda } from "@fp-ts/core/HKT"
import type { Coproduct } from "@fp-ts/core/typeclass/Coproduct"
import * as coproduct from "@fp-ts/core/typeclass/Coproduct"
import type { Covariant } from "@fp-ts/core/typeclass/Covariant"
import type { NonEmptyAlternative } from "@fp-ts/core/typeclass/NonEmptyAlternative"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Alternative<F extends TypeLambda> extends Coproduct<F>, Covariant<F> {}

/**
 * @since 1.0.0
 */
export const fromNonEmptyAlternative = <F extends TypeLambda>(
  NonEmptyAlternative: NonEmptyAlternative<F>,
  zero: Coproduct<F>["zero"]
): Alternative<F> => {
  return {
    ...NonEmptyAlternative,
    ...coproduct.fromNonEmptyCoproduct(NonEmptyAlternative, zero)
  }
}
