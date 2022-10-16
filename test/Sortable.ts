import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "@fp-ts/core/Sortable"
import * as boolean from "./data/boolean"
import * as number from "./data/number"
import { sort } from "./data/ReadonlyArray"
import * as string from "./data/string"
import * as U from "./util"

describe("Sortable", () => {
  it("tuple", () => {
    const O = _.tuple(string.Sortable, number.Sortable, boolean.Sortable)
    U.deepStrictEqual(O.compare(["a", 1, true], ["b", 2, true]), -1)
    U.deepStrictEqual(O.compare(["a", 1, true], ["a", 2, true]), -1)
    U.deepStrictEqual(O.compare(["a", 1, true], ["a", 1, false]), 1)
  })

  it("getMonoid", () => {
    type T = readonly [number, string]
    const tuples: ReadonlyArray<T> = [
      [2, "c"],
      [1, "b"],
      [2, "a"],
      [1, "c"]
    ]
    const M = _.getMonoid<T>()
    const sortByFst = pipe(
      number.Sortable,
      _.contramap((x: T) => x[0])
    )
    const sortBySnd = pipe(
      string.Sortable,
      _.contramap((x: T) => x[1])
    )
    //                  v-- left unit
    const O1 = M.combineMany(M.empty, [sortByFst, sortBySnd])
    U.deepStrictEqual(sort(O1)(tuples), [
      [1, "b"],
      [1, "c"],
      [2, "a"],
      [2, "c"]
    ])
    //                           right unit --v
    const O2 = M.combineMany(sortBySnd, [sortByFst, M.empty])
    U.deepStrictEqual(sort(O2)(tuples), [
      [2, "a"],
      [1, "b"],
      [1, "c"],
      [2, "c"]
    ])
  })

  it("clamp", () => {
    const clampNumber = _.clamp(number.Sortable)
    U.deepStrictEqual(clampNumber(1, 10)(2), 2)
    U.deepStrictEqual(clampNumber(1, 10)(10), 10)
    U.deepStrictEqual(clampNumber(1, 10)(20), 10)
    U.deepStrictEqual(clampNumber(1, 10)(1), 1)
    U.deepStrictEqual(clampNumber(1, 10)(-10), 1)
  })

  it("between", () => {
    const betweenNumber = _.between(number.Sortable)
    U.deepStrictEqual(betweenNumber(1, 10)(2), true)
    U.deepStrictEqual(betweenNumber(1, 10)(10), true)
    U.deepStrictEqual(betweenNumber(1, 10)(20), false)
    U.deepStrictEqual(betweenNumber(1, 10)(1), true)
    U.deepStrictEqual(betweenNumber(1, 10)(-10), false)
  })

  it("reverse", () => {
    const Compare = _.reverse(number.Sortable)
    U.deepStrictEqual(Compare.compare(1, 2), 1)
    U.deepStrictEqual(Compare.compare(2, 1), -1)
    U.deepStrictEqual(Compare.compare(2, 2), 0)
  })

  it("leq", () => {
    const leq = _.leq(number.Sortable)
    U.deepStrictEqual(leq(0, 1), true)
    U.deepStrictEqual(leq(1, 1), true)
    U.deepStrictEqual(leq(2, 1), false)
  })

  it("geq", () => {
    const geq = _.geq(number.Sortable)
    U.deepStrictEqual(geq(0, 1), false)
    U.deepStrictEqual(geq(1, 1), true)
    U.deepStrictEqual(geq(2, 1), true)
  })

  it("min", () => {
    type A = { readonly a: number }
    const min = _.min(
      pipe(
        number.Sortable,
        _.contramap((a: A) => a.a)
      )
    )
    U.deepStrictEqual(min({ a: 1 }, { a: 2 }), { a: 1 })
    U.deepStrictEqual(min({ a: 2 }, { a: 1 }), { a: 1 })
    const first = { a: 1 }
    const second = { a: 1 }
    U.strictEqual(min(first, second), first)
  })

  it("max", () => {
    type A = { readonly a: number }
    const max = _.max(
      pipe(
        number.Sortable,
        _.contramap((a: A) => a.a)
      )
    )
    U.deepStrictEqual(max({ a: 1 }, { a: 2 }), { a: 2 })
    U.deepStrictEqual(max({ a: 2 }, { a: 1 }), { a: 2 })
    const first = { a: 1 }
    const second = { a: 1 }
    U.strictEqual(max(first, second), first)
  })
})
