/**
 * @since 3.0.0
 */
import type { FlatMap } from "@fp-ts/core/FlatMap"
import type { TypeLambda } from "@fp-ts/core/HKT"
import type { Succeed } from "@fp-ts/core/Succeed"

/**
 * @category type class
 * @since 3.0.0
 */
export interface Monad<F extends TypeLambda> extends Succeed<F>, FlatMap<F> {}
