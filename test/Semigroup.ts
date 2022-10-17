import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "@fp-ts/core/Semigroup"
import * as sortable from "@fp-ts/core/Sortable"
import * as number from "./data/number"
import * as string from "./data/string"
import * as U from "./util"

describe("Semigroup", () => {
  it("reverse", () => {
    const S = _.reverse(string.Semigroup)
    U.deepStrictEqual(pipe("a", S.combine("b")), "ba")
    U.deepStrictEqual(pipe("a", S.combineMany([])), "a")
    U.deepStrictEqual(pipe("a", S.combineMany(["b"])), "ba")
  })

  it("constant", () => {
    const S = _.constant("c")
    U.deepStrictEqual(pipe("a", S.combine("b")), "c")
    U.deepStrictEqual(pipe("a", S.combineMany([])), "c")
    U.deepStrictEqual(pipe("a", S.combineMany(["b"])), "c")
  })

  it("intercalate", () => {
    const S = pipe(string.Semigroup, _.intercalate("|"))
    U.deepStrictEqual(pipe("a", S.combine("b")), "a|b")
    U.deepStrictEqual(pipe("a", S.combineMany([])), "a")
    U.deepStrictEqual(pipe("a", S.combineMany(["b"])), "a|b")
  })

  describe("min", () => {
    it("should return the minimum", () => {
      const S = _.min(number.Sortable)
      U.deepStrictEqual(pipe(1, S.combineMany([3, 2])), 1)
    })

    it("should return the last minimum", () => {
      type Item = { a: number }
      const S = _.min(pipe(number.Sortable, sortable.contramap((_: Item) => _.a)))
      const item: Item = { a: 1 }
      U.strictEqual(pipe({ a: 2 }, S.combineMany([{ a: 1 }, item])), item)
    })
  })

  describe("max", () => {
    it("should return the maximum", () => {
      const S = _.max(number.Sortable)
      U.deepStrictEqual(pipe(1, S.combineMany([3, 2])), 3)
    })

    it("should return the last minimum", () => {
      type Item = { a: number }
      const S = _.max(pipe(number.Sortable, sortable.contramap((_: Item) => _.a)))
      const item: Item = { a: 2 }
      U.strictEqual(pipe({ a: 1 }, S.combineMany([{ a: 2 }, item])), item)
    })
  })

  it("struct", () => {
    const S = _.struct({
      name: string.Semigroup,
      age: number.SemigroupSum
    })
    U.deepStrictEqual(pipe({ name: "a", age: 10 }, S.combine({ name: "b", age: 20 })), {
      name: "ab",
      age: 30
    })
  })

  it("tuple", () => {
    const S = _.tuple(
      string.Semigroup,
      number.SemigroupSum
    )
    U.deepStrictEqual(pipe(["a", 10], S.combine(["b", 20])), ["ab", 30])
  })

  it("first", () => {
    const S = _.first<number>()
    U.deepStrictEqual(pipe(1, S.combine(2)), 1)
    U.deepStrictEqual(pipe(1, S.combineMany([2, 3, 4, 5, 6])), 1)
  })

  it("last", () => {
    const S = _.last<number>()
    U.deepStrictEqual(pipe(1, S.combine(2)), 2)
    U.deepStrictEqual(pipe(1, S.combineMany([])), 1)
    U.deepStrictEqual(pipe(1, S.combineMany([2, 3, 4, 5, 6])), 6)
  })
})
