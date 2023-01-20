/**
 * @since 1.0.0
 */

import * as predicate from "@fp-ts/core/Predicate"

/**
 * @category guards
 * @since 1.0.0
 */
export const isSymbol: (u: unknown) => u is symbol = predicate.isSymbol
