/**
 * @since 1.0.0
 */
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"
import { pipe } from "@fp-ts/core/internal/Function"
import type { Covariant } from "@fp-ts/core/typeclass/Covariant"

/**
 * @category type class
 * @since 1.0.0
 */
export interface SemigroupalProduct<F extends TypeLambda> extends TypeClass<F> {
  readonly product: <S, R2, O2, E2, B>(
    that: Kind<F, S, R2, O2, E2, B>
  ) => <R1, O1, E1, A>(
    self: Kind<F, S, R1, O1, E1, A>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, readonly [A, B]>

  readonly productMany: <S, R, O, E, A>(
    collection: Iterable<Kind<F, S, R, O, E, A>>
  ) => (self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, readonly [A, ...ReadonlyArray<A>]>
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const fromCovariant = <F extends TypeLambda>(
  Covariant: Covariant<F>,
  product: SemigroupalProduct<F>["product"]
): SemigroupalProduct<F> => {
  return {
    product,
    productMany: <S, R, O, E, A>(
      collection: Iterable<Kind<F, S, R, O, E, A>>
    ) =>
      (self: Kind<F, S, R, O, E, A>) => {
        let out: Kind<F, S, R, O, E, [A, ...Array<A>]> = pipe(
          self,
          Covariant.map(a => [a])
        )
        for (const fa of collection) {
          out = pipe(out, product(fa), Covariant.map(([[head, ...tail], a]) => [head, ...tail, a]))
        }
        return out
      }
  }
}
