/**
 * Kleisli category.
 *
 * @since 3.0.0
 */
import type { ComposeKleisli } from "@fp-ts/core/ComposeKleisli"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"

/**
 * @category model
 * @since 3.0.0
 */
export interface KleisliCategory<F extends TypeLambda> extends ComposeKleisli<F> {
  readonly idKleisli: <A>() => <S>(a: A) => Kind<F, S, unknown, never, never, A>
}
