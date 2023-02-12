/**
 * @since 1.0.0
 */

import * as predicate from "@fp-ts/core/Predicate"
import * as equivalence from "@fp-ts/core/typeclass/Equivalence"

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

/**
 * @category instances
 * @since 1.0.0
 */
export const Equivalence: equivalence.Equivalence<symbol> = equivalence.symbol
