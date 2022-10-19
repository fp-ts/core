/**
 * @since 1.0.0
 */
import * as equivalence from "@fp-ts/core/data/Equivalence"
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import type { Invariant } from "@fp-ts/core/typeclass/Invariant"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Contravariant<F extends TypeLambda> extends TypeClass<F> {
  readonly contramap: <B, A>(
    f: (b: B) => A
  ) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
}

/**
 * Returns a default `invmap` implementation.
 *
 * @since 1.0.0
 */
export const invmap = <F extends TypeLambda>(
  Contravariant: Contravariant<F>
): Invariant<F>["invmap"] =>
  eq =>
    equivalence.make(
      Contravariant.contramap(eq.from),
      Contravariant.contramap(eq.to)
    )
