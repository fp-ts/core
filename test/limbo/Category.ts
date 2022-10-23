/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type { Composable } from "./Composable"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Category<F extends TypeLambda> extends Composable<F> {
  readonly identity: <R>() => Kind<F, R, never, never, R>
}
