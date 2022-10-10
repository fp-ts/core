/**
 * @since 3.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type { Composable } from "@fp-ts/core/typeclasses/Composable"

/**
 * @category model
 * @since 3.0.0
 */
export interface Category<F extends TypeLambda> extends Composable<F> {
  readonly id: <S, R>() => Kind<F, S, R, never, never, R>
}
