/**
 * @since 1.0.0
 */
import type { Coproduct } from "@fp-ts/core/Coproduct"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Alternative<F extends TypeLambda> extends Coproduct<F> {
  readonly counit: <S>() => Kind<F, S, unknown, never, never, never>

  readonly coproductAll: <S, R, O, E, A>(
    collection: Iterable<Kind<F, S, R, O, E, A>>
  ) => Kind<F, S, R, O, E, A>
}

/**
 * @since 1.0.0
 */
export const fromCoproduct = <F extends TypeLambda>(
  Coproduct: Coproduct<F>,
  counit: Alternative<F>["counit"]
): Alternative<F> => {
  return {
    ...Coproduct,
    counit,
    coproductAll: <S, R, O, E, A>(
      collection: Iterable<Kind<F, S, R, O, E, A>>
    ) => Coproduct.coproductMany(collection)(counit<S>())
  }
}
