/**
 * @since 3.0.0
 */
import type { FirstSuccessOf } from "@fp-ts/core/FirstSuccessOf"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"

/**
 * @category type class
 * @since 3.0.0
 */
export interface Alternative<F extends TypeLambda> extends FirstSuccessOf<F> {
  /**
   * Returns a effect that will never produce anything.
   */
  readonly never: <S>() => Kind<F, S, unknown, never, never, never>
}
