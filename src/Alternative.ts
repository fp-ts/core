/**
 * @since 3.0.0
 */
import type { FirstSuccessOf } from "@fp-ts/core/FirstSuccessOf"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"

/**
 * @category model
 * @since 3.0.0
 */
export interface Alternative<F extends TypeLambda> extends FirstSuccessOf<F> {
  readonly none: <S>() => Kind<F, S, unknown, never, never, never>
}

/**
 * Returns an effect that runs each of the specified effects in order until one of them succeeds.
 *
 * @since 3.0.0
 */
export const firstSuccessOf = <G extends TypeLambda>(Alternative: Alternative<G>) =>
  <S, R, O, E, A>(collection: Iterable<Kind<G, S, R, O, E, A>>): Kind<G, S, R, O, E, A> =>
    Alternative.firstSuccessOf(Alternative.none(), ...collection)
