/**
 * @since 1.0.0
 */
import type { Covariant } from "@fp-ts/core/Covariant"
import type { TypeLambda } from "@fp-ts/core/HKT"
import type { Of } from "@fp-ts/core/Of"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Pointed<F extends TypeLambda> extends Of<F>, Covariant<F> {}
