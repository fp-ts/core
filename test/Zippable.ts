import { pipe } from "@fp-ts/core/Function"
import * as _ from "@fp-ts/core/Zippable"
import * as O from "./data/Option"
import * as U from "./util"

const Zippable: _.Zippable<O.OptionTypeLambda> = {
  map: O.map,
  zip: (fa, fb) => O.isSome(fa) && O.isSome(fb) ? O.some([fa.value, fb.value]) : O.none
}

describe("Zippable", () => {
  it("ap", () => {
    const ap = _.ap(Zippable)
    const double = (n: number) => n * 2
    U.deepStrictEqual(pipe(O.none, ap(O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, ap(O.some(1))), O.none)
    U.deepStrictEqual(pipe(O.some(double), ap(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some(double), ap(O.some(1))), O.some(2))
  })

  it("zipComposition", () => {
    const zip: <A, B>(
      fa: O.Option<O.Option<A>>,
      fb: O.Option<O.Option<B>>
    ) => O.Option<O.Option<readonly [A, B]>> = _.zipComposition(Zippable, Zippable)
    U.deepStrictEqual(zip(O.none, O.none), O.none)
    U.deepStrictEqual(zip(O.some(O.none), O.none), O.none)
    U.deepStrictEqual(zip(O.some(O.none), O.some(O.none)), O.some(O.none))
    U.deepStrictEqual(zip(O.some(O.none), O.some(O.some("a"))), O.some(O.none))
    U.deepStrictEqual(
      zip(O.some(O.some(1)), O.some(O.some("a"))),
      O.some(O.some([1, "a"] as const))
    )
  })

  it("zipWith", () => {
    const zipWith = _.zipWith(Zippable)
    const sum = (a: number, b: number) => a + b
    U.deepStrictEqual(pipe(O.none, zipWith(O.none, sum)), O.none)
    U.deepStrictEqual(pipe(O.some(1), zipWith(O.some(2), sum)), O.some(3))
  })

  it("lift2", () => {
    const sum = _.lift2(Zippable)((a: number, b: number) => a + b)
    U.deepStrictEqual(sum(O.none, O.none), O.none)
    U.deepStrictEqual(sum(O.some(1), O.none), O.none)
    U.deepStrictEqual(sum(O.none, O.some(2)), O.none)
    U.deepStrictEqual(sum(O.some(1), O.some(2)), O.some(3))
  })

  it("lift3", () => {
    const sum = _.lift3(Zippable)((a: number, b: number, c: number) => a + b + c)
    U.deepStrictEqual(sum(O.none, O.none, O.none), O.none)
    U.deepStrictEqual(sum(O.some(1), O.none, O.none), O.none)
    U.deepStrictEqual(sum(O.none, O.some(2), O.none), O.none)
    U.deepStrictEqual(sum(O.none, O.none, O.some(3)), O.none)
    U.deepStrictEqual(sum(O.some(1), O.some(2), O.some(3)), O.some(6))
  })
})
