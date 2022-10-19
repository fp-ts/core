import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "@fp-ts/core/typeclass/Associative"
import * as totalOrder from "@fp-ts/core/typeclass/TotalOrder"
import * as number from "../test-data/number"
import * as string from "../test-data/string"
import * as U from "../util"

describe("Associative", () => {
  it("reverse", () => {
    const S = _.reverse(string.Associative)
    U.deepStrictEqual(pipe("a", S.combine("b")), "ba")
    U.deepStrictEqual(pipe("a", S.combineMany([])), "a")
    U.deepStrictEqual(pipe("a", S.combineMany(["b"])), "ba")
    U.deepStrictEqual(pipe("a", S.combineMany(["b", "c", "d"])), "dcba")
  })

  it("constant", () => {
    const S = _.constant("-")
    U.deepStrictEqual(pipe("a", S.combine("b")), "-")
    U.deepStrictEqual(pipe("a", S.combineMany([])), "-")
    U.deepStrictEqual(pipe("a", S.combineMany(["b", "c", "d"])), "-")
  })

  it("intercalate", () => {
    const S = pipe(string.Associative, _.intercalate("|"))
    U.deepStrictEqual(pipe("a", S.combine("b")), "a|b")
    U.deepStrictEqual(pipe("a", S.combineMany([])), "a")
    U.deepStrictEqual(pipe("a", S.combineMany(["b"])), "a|b")
    U.deepStrictEqual(pipe("a", S.combineMany(["b", "c", "d"])), "a|b|c|d")
  })

  describe("min", () => {
    it("should return the minimum", () => {
      const S = _.min(number.TotalOrder)
      U.deepStrictEqual(pipe(1, S.combineMany([])), 1)
      U.deepStrictEqual(pipe(1, S.combineMany([3, 2])), 1)
    })

    it("should return the last minimum", () => {
      type Item = { a: number }
      const S = _.min(pipe(number.TotalOrder, totalOrder.contramap((_: Item) => _.a)))
      const item: Item = { a: 1 }
      U.strictEqual(pipe({ a: 2 }, S.combineMany([{ a: 1 }, item])), item)
      U.strictEqual(pipe(item, S.combineMany([])), item)
    })
  })

  describe("max", () => {
    it("should return the maximum", () => {
      const S = _.max(number.TotalOrder)
      U.deepStrictEqual(pipe(1, S.combineMany([])), 1)
      U.deepStrictEqual(pipe(1, S.combineMany([3, 2])), 3)
    })

    it("should return the last minimum", () => {
      type Item = { a: number }
      const S = _.max(pipe(number.TotalOrder, totalOrder.contramap((_: Item) => _.a)))
      const item: Item = { a: 2 }
      U.strictEqual(pipe({ a: 1 }, S.combineMany([{ a: 2 }, item])), item)
      U.strictEqual(pipe(item, S.combineMany([])), item)
    })
  })

  it("struct", () => {
    const S = _.struct({
      name: string.Associative,
      age: number.AssociativeSum
    })
    U.deepStrictEqual(pipe({ name: "a", age: 10 }, S.combine({ name: "b", age: 20 })), {
      name: "ab",
      age: 30
    })
    U.deepStrictEqual(pipe({ name: "a", age: 10 }, S.combineMany([])), {
      name: "a",
      age: 10
    })
    U.deepStrictEqual(pipe({ name: "a", age: 10 }, S.combineMany([{ name: "b", age: 20 }])), {
      name: "ab",
      age: 30
    })
    U.deepStrictEqual(
      pipe({ name: "a", age: 10 }, S.combineMany([{ name: "b", age: 20 }, { name: "c", age: 30 }])),
      {
        name: "abc",
        age: 60
      }
    )
  })

  it("tuple", () => {
    const S = _.tuple(
      string.Associative,
      number.AssociativeSum
    )
    U.deepStrictEqual(pipe(["a", 10], S.combine(["b", 20])), ["ab", 30])
    U.deepStrictEqual(pipe(["a", 10], S.combineMany([])), ["a", 10])
    U.deepStrictEqual(pipe(["a", 10], S.combineMany([["b", 20]])), ["ab", 30])
    U.deepStrictEqual(pipe(["a", 10], S.combineMany([["b", 20], ["c", 30]])), ["abc", 60])
  })

  it("first", () => {
    const S = _.first<number>()
    U.deepStrictEqual(pipe(1, S.combine(2)), 1)
    U.deepStrictEqual(pipe(1, S.combineMany([])), 1)
    U.deepStrictEqual(pipe(1, S.combineMany([2, 3, 4, 5, 6])), 1)
  })

  it("last", () => {
    const S = _.last<number>()
    U.deepStrictEqual(pipe(1, S.combine(2)), 2)
    U.deepStrictEqual(pipe(1, S.combineMany([])), 1)
    U.deepStrictEqual(pipe(1, S.combineMany([2, 3, 4, 5, 6])), 6)
  })
})