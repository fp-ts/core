/**
 * @since 3.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type { OrElse } from "@fp-ts/core/OrElse"

/**
 * @category type class
 * @since 3.0.0
 */
export interface Alternative<F extends TypeLambda> extends OrElse<F> {
  /**
   * Returns a effect that will never produce anything.
   */
  readonly never: <S>() => Kind<F, S, unknown, never, never, never>
}

/**
 * Returns an effect that runs each of the specified effects in order until one of them succeeds.
 *
 * @since 3.0.0
 */
export const firstSuccessOf = <F extends TypeLambda>(Alternative: Alternative<F>) =>
  <S, R, O, E, A>(collection: Iterable<Kind<F, S, R, O, E, A>>): Kind<F, S, R, O, E, A> =>
    Alternative.firstSuccessOf(Alternative.never(), collection)
