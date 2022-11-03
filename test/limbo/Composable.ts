/**
 * @since 1.0.0
 */
import type { Kind, TypeClass, TypeLambda, Variance } from "@fp-ts/core/HKT"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Composable<F extends TypeLambda<Variance.Invariant>> extends TypeClass<F> {
  readonly compose: <B, O2, E2, C>(
    bc: Kind<F, B, O2, E2, C>
  ) => <A, O1, E1>(ab: Kind<F, A, O1, E1, B>) => Kind<F, A, O1 | O2, E1 | E2, C>
}
