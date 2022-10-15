/**
 * Kleisli categories.
 *
 * @since 3.0.0
 */
import type { ComposableKind } from "@fp-ts/core/ComposableKind"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"

/**
 * @category type class
 * @since 3.0.0
 */
export interface CategoryKind<F extends TypeLambda> extends ComposableKind<F> {
  readonly idKind: <A>() => <S>(a: A) => Kind<F, S, unknown, never, never, A>
}
