/**
 * @since 3.0.0
 */
import type { Extendable } from '@fp-ts/core/typeclasses/Extendable'
import type { TypeLambda, Kind } from '@fp-ts/core/HKT'

/**
 * @category model
 * @since 3.0.0
 */
export interface Comonad<F extends TypeLambda> extends Extendable<F> {
  readonly extract: <S, R, O, E, A>(self: Kind<F, S, R, O, E, A>) => A
}