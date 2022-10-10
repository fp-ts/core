/**
 * Kleisli category.
 *
 * @since 3.0.0
 */
import type { KleisliComposable } from '@fp-ts/core/typeclasses/KleisliComposable'
import type { Kind, TypeLambda } from '@fp-ts/core/HKT'

/**
 * @category model
 * @since 3.0.0
 */
export interface KleisliCategory<F extends TypeLambda> extends KleisliComposable<F> {
  readonly idKleisli: <A>() => <S>(a: A) => Kind<F, S, unknown, never, never, A>
}
