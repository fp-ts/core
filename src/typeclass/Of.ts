/**
 * @since 1.0.0
 */
import type { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Of<F extends TypeLambda> extends TypeClass<F> {
  readonly of: <A>(a: A) => Kind<F, unknown, never, never, A>
}

/**
 * @since 1.0.0
 */
export const unit = <F extends TypeLambda>(
  F: Of<F>
): Kind<F, unknown, never, never, void> => F.of<void>(undefined)

/**
 * @since 1.0.0
 */
export const Do = <F extends TypeLambda>(
  F: Of<F>
): Kind<F, unknown, never, never, {}> => F.of({})
