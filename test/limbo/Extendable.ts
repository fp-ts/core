/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type { Covariant } from "@fp-ts/core/typeclass/Covariant"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Extendable<F extends TypeLambda> extends Covariant<F> {
  extend: <R, O, E, A, B>(
    f: (self: Kind<F, R, O, E, A>) => B
  ) => (self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>
}
