/**
 * @since 1.0.0
 */
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Succeed<F extends TypeLambda> extends TypeClass<F> {
  readonly succeed: <A, S>(a: A) => Kind<F, S, unknown, never, never, A>
}
