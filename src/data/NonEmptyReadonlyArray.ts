/**
 * @since 1.0.0
 */
import type { TypeLambda } from "@fp-ts/core/HKT"

/**
 * @category models
 * @since 1.0.0
 */
export type NonEmptyReadonlyArray<A> = readonly [A, ...ReadonlyArray<A>]

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface NonEmptyReadonlyArrayTypeLambda extends TypeLambda {
  readonly type: NonEmptyReadonlyArray<this["Target"]>
}
