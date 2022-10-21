/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type { NonEmptyCoproduct } from "@fp-ts/core/typeclass/NonEmptyCoproduct"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Coproduct<F extends TypeLambda> extends NonEmptyCoproduct<F> {
  readonly zero: <A>() => Kind<F, unknown, never, never, A>

  readonly coproductAll: <R, O, E, A>(
    collection: Iterable<Kind<F, R, O, E, A>>
  ) => Kind<F, R, O, E, A>
}
