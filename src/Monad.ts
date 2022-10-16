/**
 * @since 1.0.0
 */
import type { FlatMap } from "@fp-ts/core/FlatMap"
import type { TypeLambda } from "@fp-ts/core/HKT"
import type { Pointed } from "@fp-ts/core/Pointed"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Monad<F extends TypeLambda> extends Pointed<F>, FlatMap<F> {}
