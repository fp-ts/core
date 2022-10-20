/**
 * @since 1.0.0
 */

import type { TypeLambda } from "@fp-ts/core/HKT"

/**
 * @category models
 * @since 1.0.0
 */
export interface Left<E> {
  readonly _tag: "Left"
  readonly left: E
}

/**
 * @category models
 * @since 1.0.0
 */
export interface Right<A> {
  readonly _tag: "Right"
  readonly right: A
}

/**
 * @category models
 * @since 1.0.0
 */
export type Either<E, A> = Left<E> | Right<A>

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface EitherTypeLambda extends TypeLambda {
  readonly type: Either<this["Out2"], this["Out"]>
}
