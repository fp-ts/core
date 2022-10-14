/**
 * @since 3.0.0
 */
import type { Failable } from "@fp-ts/core/Failable"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"

/**
 * @category type class
 * @since 3.0.0
 */
export interface Alternative<F extends TypeLambda> extends Failable<F> {
  /**
   * Returns a effect that will never produce anything.
   */
  readonly none: <S>() => Kind<F, S, unknown, never, never, never>
  readonly firstSuccessOfAll: <S, R, O, E, A>(
    iterable: Iterable<Kind<F, S, R, O, E, A>>
  ) => Kind<F, S, R, O, E, A>
}

/**
 * @since 3.0.0
 */
export const fromFailable = <F extends TypeLambda>(
  Failable: Failable<F>,
  none: <S>() => Kind<F, S, unknown, never, never, never>
): Alternative<F> => {
  return {
    ...Failable,
    none,
    firstSuccessOfAll: <S, R, O, E, A>(
      iterable: Iterable<Kind<F, S, R, O, E, A>>
    ) => Failable.firstSuccessOfMany(none<S>(), iterable)
  }
}
