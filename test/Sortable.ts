import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "@fp-ts/core/Sortable"
import * as boolean from "./test-data/boolean"
import * as number from "./test-data/number"
import { sort } from "./test-data/ReadonlyArray"
import * as string from "./test-data/string"
import * as U from "./util"

describe("Sortable", () => {
  it("tuple", () => {
    const S = _.tuple(string.Sortable, number.Sortable, boolean.Sortable)
    U.deepStrictEqual(pipe(["a", 1, true], S.compare(["b", 2, true])), -1)
    U.deepStrictEqual(pipe(["a", 1, true], S.compare(["a", 2, true])), -1)
    U.deepStrictEqual(pipe(["a", 1, true], S.compare(["a", 1, false])), 1)
  })

  it("Contravariant", () => {
    const S = pipe(number.Sortable, _.Contravariant.contramap((s: string) => s.length))
    U.deepStrictEqual(pipe("a", S.compare("b")), 0)
    U.deepStrictEqual(pipe("a", S.compare("bb")), -1)
    U.deepStrictEqual(pipe("aa", S.compare("b")), 1)
  })

  it("getSemigroup", () => {
    type T = readonly [number, string]
    const tuples: ReadonlyArray<T> = [
      [2, "c"],
      [1, "b"],
      [2, "a"],
      [1, "c"]
    ]
    const S = _.getSemigroup<T>()
    const sortByFst = pipe(
      number.Sortable,
      _.contramap((x: T) => x[0])
    )
    const sortBySnd = pipe(
      string.Sortable,
      _.contramap((x: T) => x[1])
    )
    U.deepStrictEqual(sort(pipe(sortByFst, S.combine(sortBySnd)))(tuples), [
      [1, "b"],
      [1, "c"],
      [2, "a"],
      [2, "c"]
    ])
    U.deepStrictEqual(sort(pipe(sortBySnd, S.combine(sortByFst)))(tuples), [
      [2, "a"],
      [1, "b"],
      [1, "c"],
      [2, "c"]
    ])
    U.deepStrictEqual(sort(pipe(sortBySnd, S.combineMany([])))(tuples), [
      [2, "a"],
      [1, "b"],
      [2, "c"],
      [1, "c"]
    ])
    U.deepStrictEqual(sort(pipe(sortBySnd, S.combineMany([sortByFst])))(tuples), [
      [2, "a"],
      [1, "b"],
      [1, "c"],
      [2, "c"]
    ])
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
    U.deepStrictEqual(sort(pipe(M.empty, M.combineMany([sortByFst, sortBySnd])))(tuples), [
      [1, "b"],
      [1, "c"],
      [2, "a"],
      [2, "c"]
    ])
    U.deepStrictEqual(sort(pipe(sortBySnd, M.combineMany([sortByFst, M.empty])))(tuples), [
      [2, "a"],
      [1, "b"],
      [1, "c"],
      [2, "c"]
    ])
  })

  it("clamp", () => {
    const clamp = _.clamp(number.Sortable)
    U.deepStrictEqual(clamp(1, 10)(2), 2)
    U.deepStrictEqual(clamp(1, 10)(10), 10)
    U.deepStrictEqual(clamp(1, 10)(20), 10)
    U.deepStrictEqual(clamp(1, 10)(1), 1)
    U.deepStrictEqual(clamp(1, 10)(-10), 1)
  })

  it("between", () => {
    const between = _.between(number.Sortable)
    U.deepStrictEqual(between(1, 10)(2), true)
    U.deepStrictEqual(between(1, 10)(10), true)
    U.deepStrictEqual(between(1, 10)(20), false)
    U.deepStrictEqual(between(1, 10)(1), true)
    U.deepStrictEqual(between(1, 10)(-10), false)
  })

  it("reverse", () => {
    const Compare = _.reverse(number.Sortable)
    U.deepStrictEqual(pipe(1, Compare.compare(2)), 1)
    U.deepStrictEqual(pipe(2, Compare.compare(1)), -1)
    U.deepStrictEqual(pipe(2, Compare.compare(2)), 0)
  })

  it("lt", () => {
    const lt = _.lt(number.Sortable)
    U.deepStrictEqual(pipe(0, lt(1)), true)
    U.deepStrictEqual(pipe(1, lt(1)), false)
    U.deepStrictEqual(pipe(2, lt(1)), false)
  })

  it("leq", () => {
    const leq = _.leq(number.Sortable)
    U.deepStrictEqual(pipe(0, leq(1)), true)
    U.deepStrictEqual(pipe(1, leq(1)), true)
    U.deepStrictEqual(pipe(2, leq(1)), false)
  })

  it("gt", () => {
    const gt = _.gt(number.Sortable)
    U.deepStrictEqual(pipe(0, gt(1)), false)
    U.deepStrictEqual(pipe(1, gt(1)), false)
    U.deepStrictEqual(pipe(2, gt(1)), true)
  })

  it("geq", () => {
    const geq = _.geq(number.Sortable)
    U.deepStrictEqual(pipe(0, geq(1)), false)
    U.deepStrictEqual(pipe(1, geq(1)), true)
    U.deepStrictEqual(pipe(2, geq(1)), true)
  })

  it("min", () => {
    type A = { readonly a: number }
    const min = _.min(
      pipe(
        number.Sortable,
        _.contramap((a: A) => a.a)
      )
    )
    U.deepStrictEqual(pipe({ a: 1 }, min({ a: 2 })), { a: 1 })
    U.deepStrictEqual(pipe({ a: 2 }, min({ a: 1 })), { a: 1 })
    const first = { a: 1 }
    const second = { a: 1 }
    U.strictEqual(pipe(first, min(second)), first)
  })

  it("max", () => {
    type A = { readonly a: number }
    const max = _.max(
      pipe(
        number.Sortable,
        _.contramap((a: A) => a.a)
      )
    )
    U.deepStrictEqual(pipe({ a: 1 }, max({ a: 2 })), { a: 2 })
    U.deepStrictEqual(pipe({ a: 2 }, max({ a: 1 })), { a: 2 })
    const first = { a: 1 }
    const second = { a: 1 }
    U.strictEqual(pipe(first, max(second)), first)
  })
})
