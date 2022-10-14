/**
 * @since 3.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type { Retryable } from "@fp-ts/core/Retryable"

/**
 * @category type class
 * @since 3.0.0
 */
export interface Alternative<F extends TypeLambda> extends Retryable<F> {
  /**
   * Returns a effect that will never produce anything.
   */
  readonly none: <S>() => Kind<F, S, unknown, never, never, never>
  readonly firstSuccessOfAll: <S, R, O, E, A>(
    collection: Iterable<Kind<F, S, R, O, E, A>>
  ) => Kind<F, S, R, O, E, A>
}

/**
 * @since 3.0.0
 */
export const fromRetryable = <F extends TypeLambda>(
  Retryable: Retryable<F>,
  none: <S>() => Kind<F, S, unknown, never, never, never>
): Alternative<F> => {
  return {
    ...Retryable,
    none,
    firstSuccessOfAll: <S, R, O, E, A>(
      collection: Iterable<Kind<F, S, R, O, E, A>>
    ) => Retryable.firstSuccessOfMany(none<S>(), collection)
  }
}
