/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type { Coproduct } from "@fp-ts/core/typeclass/Coproduct"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Alternative<F extends TypeLambda> extends Coproduct<F> {
  readonly zero: <S>() => Kind<F, S, unknown, never, never, never>

  readonly coproductAll: <S, R, O, E, A>(
    collection: Iterable<Kind<F, S, R, O, E, A>>
  ) => Kind<F, S, R, O, E, A>
}

/**
 * @since 1.0.0
 */
export const fromCoproduct = <F extends TypeLambda>(
  Coproduct: Coproduct<F>,
  zero: Alternative<F>["zero"]
): Alternative<F> => {
  return {
    ...Coproduct,
    zero,
    coproductAll: <S, R, O, E, A>(
      collection: Iterable<Kind<F, S, R, O, E, A>>
    ) => Coproduct.coproductMany(collection)(zero<S>())
  }
}
