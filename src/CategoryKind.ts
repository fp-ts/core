/**
 * Kleisli categories.
 *
 * @since 3.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type { KleisliComposable } from "@fp-ts/core/KleisliComposable"

/**
 * @category type class
 * @since 3.0.0
 */
export interface CategoryKind<F extends TypeLambda> extends KleisliComposable<F> {
  readonly idKind: <A>() => <S>(a: A) => Kind<F, S, unknown, never, never, A>
}
