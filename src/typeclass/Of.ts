/**
 * @since 1.0.0
 */
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Of<F extends TypeLambda> extends TypeClass<F> {
  readonly of: <A, S>(a: A) => Kind<F, S, unknown, never, never, A>
}

/**
 * @since 1.0.0
 */
export const unit = <F extends TypeLambda>(
  Of: Of<F>
) => <S>(): Kind<F, S, unknown, never, never, void> => Of.of<void, S>(undefined)
