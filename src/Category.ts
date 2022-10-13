/**
 * @since 3.0.0
 */
import type { Compose } from "@fp-ts/core/Compose"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"

/**
 * @category type class
 * @since 3.0.0
 */
export interface Category<F extends TypeLambda> extends Compose<F> {
  readonly id: <S, R>() => Kind<F, S, R, never, never, R>
}
