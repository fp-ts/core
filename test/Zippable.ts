import { identity, pipe } from "@fp-ts/core/Function"
import * as _ from "@fp-ts/core/Zippable"
import * as O from "./data/Option"
import * as U from "./util"

describe("Zippable", () => {
  it("zipManyWithComposition", () => {
    const zipManyWith = _.zipManyWithComposition(O.Zippable, O.Zippable)
    U.deepStrictEqual(zipManyWith(O.none, [O.none], identity), O.none)
    U.deepStrictEqual(zipManyWith(O.some(O.none), [O.none], identity), O.none)
    U.deepStrictEqual(zipManyWith(O.some(O.none), [O.some(O.none)], identity), O.some(O.none))
    U.deepStrictEqual(zipManyWith(O.some(O.none), [O.some(O.some("a"))], identity), O.some(O.none))
    U.deepStrictEqual(
      zipManyWith(O.some(O.some(1)), [O.some(O.some(2))], identity),
      O.some(O.some([1, 2]))
    )
  })

  it("ap", () => {
    const ap = _.ap(O.Zippable)
    const double = (n: number) => n * 2
    U.deepStrictEqual(pipe(O.none, ap(O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, ap(O.some(1))), O.none)
    U.deepStrictEqual(pipe(O.some(double), ap(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some(double), ap(O.some(1))), O.some(2))
  })

  it("zip", () => {
    const zip = _.zip(O.Zippable)
    U.deepStrictEqual(pipe(O.none, zip(O.some(1))), O.none)
    U.deepStrictEqual(pipe(O.some(1), zip(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some(1), zip(O.some("a"))), O.some([1, "a"] as const))
  })

  it("zipWith", () => {
    const zipWith = _.zipWith(O.Zippable)
    const sum = (a: number, b: number) => a + b
    U.deepStrictEqual(pipe(O.none, zipWith(O.none, sum)), O.none)
    U.deepStrictEqual(pipe(O.some(1), zipWith(O.none, sum)), O.none)
    U.deepStrictEqual(pipe(O.some(1), zipWith(O.some(2), sum)), O.some(3))
  })

  it("lift2", () => {
    const sum = _.lift2(O.Zippable)((a: number, b: number) => a + b)
    U.deepStrictEqual(sum(O.none, O.none), O.none)
    U.deepStrictEqual(sum(O.some(1), O.none), O.none)
    U.deepStrictEqual(sum(O.none, O.some(2)), O.none)
    U.deepStrictEqual(sum(O.some(1), O.some(2)), O.some(3))
  })

  it("lift3", () => {
    const sum = _.lift3(O.Zippable)((a: number, b: number, c: number) => a + b + c)
    U.deepStrictEqual(sum(O.none, O.none, O.none), O.none)
    U.deepStrictEqual(sum(O.some(1), O.none, O.none), O.none)
    U.deepStrictEqual(sum(O.none, O.some(2), O.none), O.none)
    U.deepStrictEqual(sum(O.none, O.none, O.some(3)), O.none)
    U.deepStrictEqual(sum(O.some(1), O.some(2), O.some(3)), O.some(6))
  })
})
