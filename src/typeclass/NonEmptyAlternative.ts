/**
 * @since 1.0.0
 */
import type { TypeLambda } from "@fp-ts/core/HKT"
import type { Covariant } from "@fp-ts/core/typeclass/Covariant"
import type { NonEmptyCoproduct } from "@fp-ts/core/typeclass/NonEmptyCoproduct"

/**
 * @category type class
 * @since 1.0.0
 */
export interface NonEmptyAlternative<F extends TypeLambda>
  extends NonEmptyCoproduct<F>, Covariant<F>
{}
