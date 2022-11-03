/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda, Variance } from "@fp-ts/core/HKT"
import type { Composable } from "./Composable"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Category<F extends TypeLambda<Variance.Invariant>> extends Composable<F> {
  readonly identity: <R>() => Kind<F, R, never, never, R>
}
