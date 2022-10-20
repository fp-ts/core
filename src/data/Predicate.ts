/**
 * @since 1.0.0
 */

import type { TypeLambda } from "@fp-ts/core/HKT"

/**
 * @category models
 * @since 1.0.0
 */
export interface Predicate<A> {
  (a: A): boolean
}

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface PredicateTypeLambda extends TypeLambda {
  readonly type: Predicate<this["In"]>
}
