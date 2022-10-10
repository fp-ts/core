import { pipe } from "@fp-ts/core/Function"
import * as _ from "@fp-ts/core/number"
import * as U from "./util"

describe("number", () => {
  it("sum", () => {
    U.deepStrictEqual(_.sum(1)(2), 3)
  })

  it("sub", () => {
    U.deepStrictEqual(_.sub(1)(2), 1)
  })

  it("multiply", () => {
    U.deepStrictEqual(_.multiply(3)(2), 6)
  })

  it("sumAll", () => {
    U.deepStrictEqual(_.sumAll([1, 2, 3]), 6)
  })

  it("multiplyAll", () => {
    U.deepStrictEqual(_.multiplyAll([2, 3, 4]), 24)
  })

  it("Ord", () => {
    U.deepStrictEqual(pipe(1, _.Ord.compare(2)), -1)
    U.deepStrictEqual(pipe(2, _.Ord.compare(1)), 1)
    U.deepStrictEqual(pipe(2, _.Ord.compare(2)), 0)
  })

  it("Show", () => {
    U.deepStrictEqual(_.Show.show(1), "1")
  })

  it("SemigroupMultiply", () => {
    U.deepStrictEqual(pipe(2, _.SemigroupMultiply.combine(3)), 6)
  })

  it("SemigroupSum", () => {
    U.deepStrictEqual(pipe(2, _.SemigroupSum.combine(3)), 5)
  })
})
