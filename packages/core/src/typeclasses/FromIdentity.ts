/**
 * @since 3.0.0
 */
import type { KleisliCategory } from '@fp-ts/core/typeclasses/KleisliCategory'
import type { TypeLambda, Kind, TypeClass } from '@fp-ts/core/HKT'

/**
 * @category model
 * @since 3.0.0
 */
export interface FromIdentity<F extends TypeLambda> extends TypeClass<F> {
  readonly of: <A, S>(a: A) => Kind<F, S, unknown, never, never, A>
}

/**
 * @since 3.0.0
 */
export const idKleisli =
  <F extends TypeLambda>(FromIdentity: FromIdentity<F>): KleisliCategory<F>['idKleisli'] =>
  () =>
    FromIdentity.of
