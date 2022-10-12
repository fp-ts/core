import { pipe } from "@fp-ts/core/Function"
import type { Eq } from "@fp-ts/core/typeclasses/Eq"
import type * as Se from "@fp-ts/core/typeclasses/Semigroup"
import * as assert from "assert"
import * as fc from "fast-check"

export const deepStrictEqual = <A>(actual: A, expected: A) => {
  assert.deepStrictEqual(actual, expected)
}

export const strictEqual = <A>(actual: A, expected: A) => {
  assert.strictEqual(actual, expected)
}

export const double = (n: number): number => n * 2

// -------------------------------------------------------------------------------------
// laws
// -------------------------------------------------------------------------------------

export const laws = {
  semigroup: {
    associativity: <A>(S: Se.Semigroup<A>, E: Eq<A>) =>
      (a: A, b: A, c: A): boolean =>
        E.equals(pipe(a, S.combine(b), S.combine(c)))(pipe(a, S.combine(pipe(b, S.combine(c)))))
  }
}

// -------------------------------------------------------------------------------------
// properties
// -------------------------------------------------------------------------------------

export const properties = {
  semigroup: {
    associativity: <A>(S: Se.Semigroup<A>, E: Eq<A>) =>
      (arb: fc.Arbitrary<A>) => fc.property(arb, arb, arb, laws.semigroup.associativity(S, E))
  }
}
