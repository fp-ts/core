import { structural } from "@fp-ts/core/internal/effect"
import * as assert from "assert"

export const deepStrictEqual = <A>(actual: A, expected: A) => {
  assert.deepStrictEqual(actual, expected)
}

export const strictEqual = <A>(actual: A, expected: A) => {
  assert.strictEqual(actual, expected)
}

export const double = (n: number): number => n * 2

export const ownKeys = (o: object): ReadonlyArray<PropertyKey> =>
  (Object.keys(o) as ReadonlyArray<PropertyKey>).concat(Object.getOwnPropertySymbols(o))

export const isStructural = (u: unknown) => typeof u === "object" && u != null && structural in u
