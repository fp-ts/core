import type { Equivalence } from "@fp-ts/core/data/Equivalence"

/**
 * @since 1.0.0
 */
export const make = <A, B>(to: (a: A) => B, from: (b: B) => A): Equivalence<A, B> => ({
  to,
  from
})
