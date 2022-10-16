/**
 * @since 1.0.0
 */
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import type { SemigroupKind } from "@fp-ts/core/SemigroupKind"

/**
 * @category type class
 * @since 1.0.0
 */
export interface MonoidKind<F extends TypeLambda> extends SemigroupKind<F> {
  /**
   * Returns a effect that will never produce anything.
   */
  readonly emptyKind: <S>() => Kind<F, S, unknown, never, never, never>

  readonly combineKindAll: <S, R, O, E, A>(
    collection: Iterable<Kind<F, S, R, O, E, A>>
  ) => Kind<F, S, R, O, E, A>
}

/**
 * @since 1.0.0
 */
export const fromSemigroupKind = <F extends TypeLambda>(
  SemigroupKind: SemigroupKind<F>,
  emptyKind: MonoidKind<F>["emptyKind"]
): MonoidKind<F> => {
  return {
    ...SemigroupKind,
    emptyKind,
    combineKindAll: <S, R, O, E, A>(
      collection: Iterable<Kind<F, S, R, O, E, A>>
    ) => SemigroupKind.combineKindMany(collection)(emptyKind<S>())
  }
}
