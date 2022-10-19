/**
 * @since 1.0.0
 */
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Contravariant<F extends TypeLambda> extends TypeClass<F> {
  readonly contramap: <R2, R1>(
    f: (r2: R2) => R1
  ) => <S, O, E, A>(self: Kind<F, S, R1, O, E, A>) => Kind<F, S, R2, O, E, A>
}
