import { pipe } from "@fp-ts/core/internal/Function"
import * as semigroup from "@fp-ts/core/Semigroup"
import * as sortable from "@fp-ts/core/Sortable"
import * as number from "./data/number"
import * as string from "./data/string"
import * as U from "./util"

describe("Semigroup", () => {
  it("combine", () => {
    const S = string.Semigroup
    U.deepStrictEqual(pipe("a", S.combineMany(["b"])), "ab")
  })

  describe("min", () => {
    it("should return the minimum", () => {
      const S = semigroup.min(number.Sortable)
      U.deepStrictEqual(pipe(1, S.combineMany([3, 2])), 1)
    })

    it("should return the last minimum", () => {
      type Item = { a: number }
      const S = semigroup.min(pipe(number.Sortable, sortable.contramap((_: Item) => _.a)))
      const item: Item = { a: 1 }
      U.strictEqual(pipe({ a: 2 }, S.combineMany([{ a: 1 }, item])), item)
    })
  })

  describe("max", () => {
    it("should return the maximum", () => {
      const S = semigroup.max(number.Sortable)
      U.deepStrictEqual(pipe(1, S.combineMany([3, 2])), 3)
    })

    it("should return the last minimum", () => {
      type Item = { a: number }
      const S = semigroup.max(pipe(number.Sortable, sortable.contramap((_: Item) => _.a)))
      const item: Item = { a: 2 }
      U.strictEqual(pipe({ a: 1 }, S.combineMany([{ a: 2 }, item])), item)
    })
  })

  it("struct", () => {
    const S = semigroup.struct({
      name: string.Semigroup,
      age: number.SemigroupSum
    })
    U.deepStrictEqual(pipe({ name: "a", age: 10 }, S.combine({ name: "b", age: 20 })), {
      name: "ab",
      age: 30
    })
  })

  it("tuple", () => {
    const S = semigroup.tuple(
      string.Semigroup,
      number.SemigroupSum
    )
    U.deepStrictEqual(pipe(["a", 10], S.combine(["b", 20])), ["ab", 30])
  })

  it("first", () => {
    const S = semigroup.first<number>()
    U.deepStrictEqual(pipe(1, S.combineMany([2, 3, 4, 5, 6])), 1)
  })

  it("last", () => {
    const S = semigroup.last<number>()
    U.deepStrictEqual(pipe(1, S.combineMany([])), 1)
    U.deepStrictEqual(pipe(1, S.combineMany([2, 3, 4, 5, 6])), 6)
  })
})
