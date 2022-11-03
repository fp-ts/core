/**
 * @since 1.0.0
 */
import type { TypeLambda, Variance } from "@fp-ts/core/HKT"
import type { FlatMap } from "@fp-ts/core/typeclass/FlatMap"
import type { Pointed } from "@fp-ts/core/typeclass/Pointed"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Monad<F extends TypeLambda<Variance.Covariant>> extends FlatMap<F>, Pointed<F> {}
