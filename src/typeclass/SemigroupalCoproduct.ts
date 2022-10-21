/**
 * @since 1.0.0
 */
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import { pipe } from "@fp-ts/core/internal/Function"

/**
 * @category type class
 * @since 1.0.0
 */
export interface SemigroupalCoproduct<F extends TypeLambda> extends TypeClass<F> {
  readonly coproduct: <S, R2, O2, E2, B>(
    that: Kind<F, S, R2, O2, E2, B>
  ) => <R1, O1, E1, A>(
    self: Kind<F, S, R1, O1, E1, A>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A | B>

  readonly coproductMany: <S, R, O, E, A>(
    collection: Iterable<Kind<F, S, R, O, E, A>>
  ) => (self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, A>
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const fromCoproduct = <F extends TypeLambda>(
  coproduct: SemigroupalCoproduct<F>["coproduct"]
): SemigroupalCoproduct<F> => {
  return {
    coproduct,
    coproductMany: collection =>
      self => {
        let out = self
        for (const fa of collection) {
          out = pipe(out, coproduct(fa))
        }
        return out
      }
  }
}
