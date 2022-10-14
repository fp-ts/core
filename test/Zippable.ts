import { pipe } from "@fp-ts/core/Function"
import * as _ from "@fp-ts/core/Zippable"
import * as O from "./data/Option"
import * as R from "./data/Result"
import * as U from "./util"

describe("Zippable", () => {
  it("zipMany", () => {
    U.deepStrictEqual(O.zip(O.some("a"), O.some(1)), O.some(["a", 1] as const))
    U.deepStrictEqual(O.zip3(O.some("a"), O.some(1), O.some(true)), O.some(["a", 1, true] as const))

    U.deepStrictEqual(R.zip(R.succeed("a"), R.succeed(1)), R.succeed(["a", 1] as const))
    U.deepStrictEqual(
      R.zip3(R.succeed("a"), R.succeed(1), R.succeed(true)),
      R.succeed(["a", 1, true] as const)
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

  it("zipManyComposition", () => {
    const zipMany = _.zipManyComposition(O.Zippable, O.Zippable)
    U.deepStrictEqual(zipMany(O.none, [O.none]), O.none)
    U.deepStrictEqual(zipMany(O.some(O.none), [O.none]), O.none)
    U.deepStrictEqual(zipMany(O.some(O.none), [O.some(O.none)]), O.some(O.none))
    U.deepStrictEqual(zipMany(O.some(O.none), [O.some(O.some("a"))]), O.some(O.none))
    U.deepStrictEqual(
      zipMany(O.some(O.some(1)), [O.some(O.some(2))]),
      O.some(O.some([1, 2] as const))
    )
  })

  it("zipWith", () => {
    const zipWith = _.zipWith(O.Zippable)
    const sum = (a: number, b: number) => a + b
    U.deepStrictEqual(pipe(O.none, zipWith(O.none, sum)), O.none)
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
