/**
 * @since 1.0.0
 */
import type { TypeLambda } from "@fp-ts/core/HKT"
import type { Covariant } from "@fp-ts/core/typeclass/Covariant"
import type { SemiCoproduct } from "@fp-ts/core/typeclass/SemiCoproduct"

/**
 * @category type class
 * @since 1.0.0
 */
export interface SemiAlternative<F extends TypeLambda> extends SemiCoproduct<F>, Covariant<F> {}
