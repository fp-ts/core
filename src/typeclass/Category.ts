/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type { Composable } from "@fp-ts/core/typeclass/Composable"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Category<F extends TypeLambda> extends Composable<F> {
  readonly identity: <S, R>() => Kind<F, S, R, never, never, R>
}
