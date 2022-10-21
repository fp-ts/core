/**
 * @since 1.0.0
 */
import type { TypeLambda } from "@fp-ts/core/HKT"
import type { Covariant } from "@fp-ts/core/typeclass/Covariant"
import type { SemigroupalCoproduct } from "@fp-ts/core/typeclass/SemigroupalCoproduct"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Alt<F extends TypeLambda> extends SemigroupalCoproduct<F>, Covariant<F> {}
