import { pipe } from "@fp-ts/core/Function"
import * as Number from "@fp-ts/core/Number"
import { deepStrictEqual } from "@fp-ts/core/test/util"

describe.concurrent("Number", () => {
  it("exports", () => {
    expect(Number.SemigroupMax).exists
    expect(Number.SemigroupMin).exists
    expect(Number.MonoidMax).exists
    expect(Number.MonoidMin).exists
    expect(Number.sumAll).exists
    expect(Number.multiplyAll).exists
  })

  it("isNumber", () => {
    expect(Number.isNumber(1)).toEqual(true)
    expect(Number.isNumber("a")).toEqual(false)
    expect(Number.isNumber(true)).toEqual(false)
  })

  it("sum", () => {
    deepStrictEqual(pipe(1, Number.sum(2)), 3)
  })

  it("multiply", () => {
    deepStrictEqual(pipe(2, Number.multiply(3)), 6)
  })

  it("subtract", () => {
    deepStrictEqual(pipe(3, Number.subtract(1)), 2)
  })

  it("divide", () => {
    deepStrictEqual(pipe(6, Number.divide(2)), 3)
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

  it("remainder", () => {
    assert.deepStrictEqual(Number.remainder(2, 2), 0)
    assert.deepStrictEqual(Number.remainder(3, 2), 1)
    assert.deepStrictEqual(Number.remainder(4, 2), 0)
    assert.deepStrictEqual(Number.remainder(2.5, 2), 0.5)
    assert.deepStrictEqual(Number.remainder(-2, 2), -0)
    assert.deepStrictEqual(Number.remainder(-3, 2), -1)
    assert.deepStrictEqual(Number.remainder(-4, 2), -0)
    assert.deepStrictEqual(Number.remainder(-2.8, -.2), -0)
    assert.deepStrictEqual(Number.remainder(-2, -.2), -0)
    assert.deepStrictEqual(Number.remainder(-1.5, -.2), -0.1)
    assert.deepStrictEqual(Number.remainder(0, -.2), 0)
    assert.deepStrictEqual(Number.remainder(1, -.2), 0)
    assert.deepStrictEqual(Number.remainder(2.6, -.2), 0)
    assert.deepStrictEqual(Number.remainder(3.1, -.2), 0.1)
  })
})
