import * as Number from "@fp-ts/core/Number"
import { deepStrictEqual } from "@fp-ts/core/test/util"

describe.concurrent("Number", () => {
  it("isNumber", () => {
    expect(Number.isNumber(1)).toEqual(true)
    expect(Number.isNumber("a")).toEqual(false)
    expect(Number.isNumber(true)).toEqual(false)
  })

  it("sum", () => {
    deepStrictEqual(Number.sum(1)(2), 3)
  })

  it("sub", () => {
    deepStrictEqual(Number.sub(1)(2), 1)
  })

  it("multiply", () => {
    deepStrictEqual(Number.multiply(3)(2), 6)
  })

  it("increment", () => {
    deepStrictEqual(Number.increment(2), 3)
  })

  it("decrement", () => {
    deepStrictEqual(Number.decrement(2), 1)
  })

  it("Equivalence", () => {
    expect(Number.Equivalence(1, 1)).toBe(true)
    expect(Number.Equivalence(1, 2)).toBe(false)
  })

  it("Order", () => {
    deepStrictEqual(Number.Order.compare(1, 2), -1)
    deepStrictEqual(Number.Order.compare(2, 1), 1)
    deepStrictEqual(Number.Order.compare(2, 2), 0)
  })

  it("Bounded", () => {
    expect(Number.Bounded.maxBound).toEqual(Infinity)
    expect(Number.Bounded.minBound).toEqual(-Infinity)
  })

  it("SemigroupSum", () => {
    deepStrictEqual(Number.SemigroupSum.combine(2, 3), 5)
  })

  it("MonoidSum", () => {
    deepStrictEqual(Number.MonoidSum.combineAll([1, 2, 3]), 6)
  })

  it("SemigroupMultiply", () => {
    deepStrictEqual(Number.SemigroupMultiply.combine(2, 3), 6)
    deepStrictEqual(Number.SemigroupMultiply.combineMany(0, [1, 2, 3]), 0)
    deepStrictEqual(Number.SemigroupMultiply.combineMany(2, [1, 0, 3]), 0)
  })

  it("MonoidMultiply", () => {
    deepStrictEqual(Number.MonoidMultiply.combineAll([2, 3, 4]), 24)
  })

  it("sign", () => {
    deepStrictEqual(Number.sign(0), 0)
    deepStrictEqual(Number.sign(0.0), 0)
    deepStrictEqual(Number.sign(-0.1), -1)
    deepStrictEqual(Number.sign(-10), -1)
    deepStrictEqual(Number.sign(10), 1)
    deepStrictEqual(Number.sign(0.1), 1)
  })
})
