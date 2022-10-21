/**
 * @since 1.0.0
 */
import type { TypeLambda } from "@fp-ts/core/HKT"
import type { Coproduct } from "@fp-ts/core/typeclass/Coproduct"
import type { NonEmptyAlternative } from "@fp-ts/core/typeclass/NonEmptyAlternative"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Alternative<F extends TypeLambda> extends Coproduct<F>, NonEmptyAlternative<F> {}
