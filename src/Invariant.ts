/**
 * @since 1.0.0
 */
import type { Equivalence } from "@fp-ts/core/data/Equivalence"
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Invariant<F extends TypeLambda> extends TypeClass<F> {
  readonly invmap: <A, B, S, R, O, E>(
    f: Equivalence<A, B>
  ) => Equivalence<Kind<F, S, R, O, E, A>, Kind<F, S, R, O, E, B>>
}
