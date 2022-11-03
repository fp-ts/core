/**
 * @since 1.0.0
 */
import type { TypeLambda, Variance } from "@fp-ts/core/HKT"
import type { Covariant } from "@fp-ts/core/typeclass/Covariant"
import type { Of } from "@fp-ts/core/typeclass/Of"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Pointed<F extends TypeLambda<Variance.Covariant>> extends Covariant<F>, Of<F> {}
