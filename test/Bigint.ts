import * as Bigint from "@fp-ts/core/Bigint"
import { pipe } from "@fp-ts/core/Function"
import { deepStrictEqual } from "@fp-ts/core/test/util"

describe.concurrent("Bigint", () => {
  it("exports", () => {
    expect(Bigint.SemigroupMax).exists
    expect(Bigint.SemigroupMin).exists
    expect(Bigint.sumAll).exists
    expect(Bigint.multiplyAll).exists
    expect(Bigint.lessThan).exists
    expect(Bigint.lessThanOrEqualTo).exists
    expect(Bigint.greaterThan).exists
    expect(Bigint.greaterThanOrEqualTo).exists
    expect(Bigint.between).exists
    expect(Bigint.clamp).exists
    expect(Bigint.min).exists
    expect(Bigint.max).exists
  })

  it("sign", () => {
    assert.deepStrictEqual(Bigint.sign(-5n), -1)
    assert.deepStrictEqual(Bigint.sign(0n), 0)
    assert.deepStrictEqual(Bigint.sign(5n), 1)
  })

  it("isBigint", () => {
    expect(Bigint.isBigint(1n)).toEqual(true)
    expect(Bigint.isBigint(1)).toEqual(false)
    expect(Bigint.isBigint("a")).toEqual(false)
    expect(Bigint.isBigint(true)).toEqual(false)
  })

  it("sum", () => {
    deepStrictEqual(pipe(1n, Bigint.sum(2n)), 3n)
  })

  it("multiply", () => {
    deepStrictEqual(pipe(2n, Bigint.multiply(3n)), 6n)
  })

  it("subtract", () => {
    deepStrictEqual(pipe(3n, Bigint.subtract(1n)), 2n)
  })

  it("divide", () => {
    deepStrictEqual(pipe(6n, Bigint.divide(2n)), 3n)
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
