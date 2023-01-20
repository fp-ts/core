import * as Bigint from "@fp-ts/core/Bigint"
import { deepStrictEqual } from "@fp-ts/core/test/util"

describe.concurrent("Bigint", () => {
  it("isBigint", () => {
    expect(Bigint.isBigint(1n)).toEqual(true)
    expect(Bigint.isBigint(1)).toEqual(false)
    expect(Bigint.isBigint("a")).toEqual(false)
    expect(Bigint.isBigint(true)).toEqual(false)
  })

  it("sum", () => {
    deepStrictEqual(Bigint.sum(1n)(2n), 3n)
  })

  it("sub", () => {
    deepStrictEqual(Bigint.sub(1n)(2n), 1n)
  })

  it("multiply", () => {
    deepStrictEqual(Bigint.multiply(3n)(2n), 6n)
  })

  it("increment", () => {
    deepStrictEqual(Bigint.increment(2n), 3n)
  })

  it("decrement", () => {
    deepStrictEqual(Bigint.decrement(2n), 1n)
  })

  it("Equivalence", () => {
    expect(Bigint.Equivalence(1n, 1n)).toBe(true)
    expect(Bigint.Equivalence(1n, 2n)).toBe(false)
  })

  it("Order", () => {
    deepStrictEqual(Bigint.Order.compare(1n, 2n), -1)
    deepStrictEqual(Bigint.Order.compare(2n, 1n), 1)
    deepStrictEqual(Bigint.Order.compare(2n, 2n), 0)
  })

  it("SemigroupSum", () => {
    deepStrictEqual(Bigint.SemigroupSum.combine(2n, 3n), 5n)
  })

  it("MonoidSum", () => {
    deepStrictEqual(Bigint.MonoidSum.combineAll([1n, 2n, 3n]), 6n)
  })

  it("SemigroupMultiply", () => {
    deepStrictEqual(Bigint.SemigroupMultiply.combine(2n, 3n), 6n)
    deepStrictEqual(Bigint.SemigroupMultiply.combineMany(0n, [1n, 2n, 3n]), 0n)
    deepStrictEqual(Bigint.SemigroupMultiply.combineMany(2n, [1n, 0n, 3n]), 0n)
  })

  it("MonoidMultiply", () => {
    deepStrictEqual(Bigint.MonoidMultiply.combineAll([2n, 3n, 4n]), 24n)
  })
})
