/**
 * @since 1.0.0
 */

import * as predicate from "@fp-ts/core/Predicate"

/**
 * Tests if a value is a `symbol`.
 *
 * @param input - The value to test.
 *
 * @example
 * import { isSymbol } from "@fp-ts/core/Predicate"
 *
 * assert.deepStrictEqual(isSymbol(Symbol.for("a")), true)
 * assert.deepStrictEqual(isSymbol("a"), false)
 *
 * @category guards
 * @since 1.0.0
 */
export const isSymbol: (u: unknown) => u is symbol = predicate.isSymbol
