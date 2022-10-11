import { pipe } from "@fp-ts/core/data/Function"
import * as _ from "@fp-ts/core/data/Predicate"
import * as U from "../util"

const isPositive: _.Predicate<number> = (n) => n > 0
const isNegative: _.Predicate<number> = (n) => n < 0
const lt2: _.Predicate<number> = (n) => n < 2

describe("Predicate", () => {
  it("contramap", () => {
    type A = {
      readonly a: number
    }
    const predicate = pipe(
      isPositive,
      _.contramap((a: A) => a.a)
    )
    U.deepStrictEqual(predicate({ a: -1 }), false)
    U.deepStrictEqual(predicate({ a: 0 }), false)
    U.deepStrictEqual(predicate({ a: 1 }), true)
  })

  it("not", () => {
    const predicate = _.not(isPositive)
    U.deepStrictEqual(predicate(1), false)
    U.deepStrictEqual(predicate(0), true)
    U.deepStrictEqual(predicate(-1), true)
  })

  it("getMonoidAny", () => {
    const M = _.getMonoidAny<number>()
    const predicate = pipe(isPositive, M.combine(isNegative))
    U.deepStrictEqual(predicate(0), false)
    U.deepStrictEqual(predicate(-1), true)
    U.deepStrictEqual(predicate(1), true)
  })

  it("getMonoidAll", () => {
    const M = _.getMonoidAll<number>()
    const predicate = pipe(isPositive, M.combine(lt2))
    U.deepStrictEqual(predicate(0), false)
    U.deepStrictEqual(predicate(-2), false)
    U.deepStrictEqual(predicate(1), true)
  })

  it("any", () => {
    const predicate = _.any([isPositive, isNegative])
    U.deepStrictEqual(predicate(0), false)
    U.deepStrictEqual(predicate(-1), true)
    U.deepStrictEqual(predicate(1), true)
  })

  it("all", () => {
    const predicate = _.all([isPositive, lt2])
    U.deepStrictEqual(predicate(0), false)
    U.deepStrictEqual(predicate(-2), false)
    U.deepStrictEqual(predicate(1), true)
  })
})