/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type { Alt } from "@fp-ts/core/typeclass/Alt"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Alternative<F extends TypeLambda> extends Alt<F> {
  readonly zero: <S>() => Kind<F, S, unknown, never, never, never>

  readonly coproductAll: <S, R, O, E, A>(
    collection: Iterable<Kind<F, S, R, O, E, A>>
  ) => Kind<F, S, R, O, E, A>
}

/**
 * @since 1.0.0
 */
export const fromAlt = <F extends TypeLambda>(
  Alt: Alt<F>,
  zero: Alternative<F>["zero"]
): Alternative<F> => {
  return {
    ...Alt,
    zero,
    coproductAll: <S, R, O, E, A>(
      collection: Iterable<Kind<F, S, R, O, E, A>>
    ) => Alt.coproductMany(collection)(zero<S>())
  }
}
