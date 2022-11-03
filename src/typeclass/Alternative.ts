/**
 * @since 1.0.0
 */
import type { TypeLambda, Variance } from "@fp-ts/core/HKT"
import type { Coproduct } from "@fp-ts/core/typeclass/Coproduct"
import type { SemiAlternative } from "@fp-ts/core/typeclass/SemiAlternative"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Alternative<F extends TypeLambda<Variance.Covariant>>
  extends SemiAlternative<F>, Coproduct<F>
{}
