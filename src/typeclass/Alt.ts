/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type { CoproductSemigroupal } from "@fp-ts/core/typeclass/CoproductSemigroupal"
import type { Covariant } from "@fp-ts/core/typeclass/Covariant"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Alt<F extends TypeLambda> extends CoproductSemigroupal<F>, Covariant<F> {
  readonly coproductMany: <S, R, O, E, A>(
    collection: Iterable<Kind<F, S, R, O, E, A>>
  ) => (self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, A>
}
