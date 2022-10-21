/**
 * @since 1.0.0
 */
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import { pipe } from "@fp-ts/core/internal/Function"

/**
 * @category type class
 * @since 1.0.0
 */
export interface NonEmptyCoproduct<F extends TypeLambda> extends TypeClass<F> {
  readonly coproduct: <R2, O2, E2, B>(
    that: Kind<F, R2, O2, E2, B>
  ) => <R1, O1, E1, A>(
    self: Kind<F, R1, O1, E1, A>
  ) => Kind<F, R1 & R2, O1 | O2, E1 | E2, A | B>

  readonly coproductMany: <R, O, E, A>(
    collection: Iterable<Kind<F, R, O, E, A>>
  ) => (self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, A>
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const fromCoproduct = <F extends TypeLambda>(
  coproduct: NonEmptyCoproduct<F>["coproduct"]
): NonEmptyCoproduct<F> => {
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
