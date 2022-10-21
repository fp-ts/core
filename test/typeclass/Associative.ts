import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "@fp-ts/core/typeclass/Semigroup"
import * as totalOrder from "@fp-ts/core/typeclass/TotalOrder"
import * as number from "../test-data/number"
import * as string from "../test-data/string"
import * as U from "../util"

describe("Semigroup", () => {
  it("reverse", () => {
    const A = _.reverse(string.Semigroup)
    U.deepStrictEqual(pipe("a", A.combine("b")), "ba")
    U.deepStrictEqual(pipe("a", A.combineMany([])), "a")
    U.deepStrictEqual(pipe("a", A.combineMany(["b"])), "ba")
    U.deepStrictEqual(pipe("a", A.combineMany(["b", "c", "d"])), "dcba")
  })

  it("constant", () => {
    const A = _.constant("-")
    U.deepStrictEqual(pipe("a", A.combine("b")), "-")
    U.deepStrictEqual(pipe("a", A.combineMany([])), "-")
    U.deepStrictEqual(pipe("a", A.combineMany(["b", "c", "d"])), "-")
  })

  it("intercalate", () => {
    const A = pipe(string.Semigroup, _.intercalate("|"))
    U.deepStrictEqual(pipe("a", A.combine("b")), "a|b")
    U.deepStrictEqual(pipe("a", A.combineMany([])), "a")
    U.deepStrictEqual(pipe("a", A.combineMany(["b"])), "a|b")
    U.deepStrictEqual(pipe("a", A.combineMany(["b", "c", "d"])), "a|b|c|d")
  })

  describe("min", () => {
    it("should return the minimum", () => {
      const A = _.min(number.TotalOrder)
      U.deepStrictEqual(pipe(1, A.combineMany([])), 1)
      U.deepStrictEqual(pipe(1, A.combineMany([3, 2])), 1)
    })

    it("should return the last minimum", () => {
      type Item = { a: number }
      const A = _.min(pipe(number.TotalOrder, totalOrder.contramap((_: Item) => _.a)))
      const item: Item = { a: 1 }
      U.strictEqual(pipe({ a: 2 }, A.combineMany([{ a: 1 }, item])), item)
      U.strictEqual(pipe(item, A.combineMany([])), item)
    })
  })

  describe("max", () => {
    it("should return the maximum", () => {
      const A = _.max(number.TotalOrder)
      U.deepStrictEqual(pipe(1, A.combineMany([])), 1)
      U.deepStrictEqual(pipe(1, A.combineMany([3, 2])), 3)
    })

    it("should return the last minimum", () => {
      type Item = { a: number }
      const A = _.max(pipe(number.TotalOrder, totalOrder.contramap((_: Item) => _.a)))
      const item: Item = { a: 2 }
      U.strictEqual(pipe({ a: 1 }, A.combineMany([{ a: 2 }, item])), item)
      U.strictEqual(pipe(item, A.combineMany([])), item)
    })
  })

  it("struct", () => {
    const A = _.struct({
      name: string.Semigroup,
      age: number.SemigroupSum
    })
    U.deepStrictEqual(pipe({ name: "a", age: 10 }, A.combine({ name: "b", age: 20 })), {
      name: "ab",
      age: 30
    })
    U.deepStrictEqual(pipe({ name: "a", age: 10 }, A.combineMany([])), {
      name: "a",
      age: 10
    })
    U.deepStrictEqual(pipe({ name: "a", age: 10 }, A.combineMany([{ name: "b", age: 20 }])), {
      name: "ab",
      age: 30
    })
    U.deepStrictEqual(
      pipe({ name: "a", age: 10 }, A.combineMany([{ name: "b", age: 20 }, { name: "c", age: 30 }])),
      {
        name: "abc",
        age: 60
      }
    )
  })

  it("tuple", () => {
    const A = _.tuple(
      string.Semigroup,
      number.SemigroupSum
    )
    U.deepStrictEqual(pipe(["a", 10], A.combine(["b", 20])), ["ab", 30])
    U.deepStrictEqual(pipe(["a", 10], A.combineMany([])), ["a", 10])
    U.deepStrictEqual(pipe(["a", 10], A.combineMany([["b", 20]])), ["ab", 30])
    U.deepStrictEqual(pipe(["a", 10], A.combineMany([["b", 20], ["c", 30]])), ["abc", 60])
  })

  it("first", () => {
    const A = _.first<number>()
    U.deepStrictEqual(pipe(1, A.combine(2)), 1)
    U.deepStrictEqual(pipe(1, A.combineMany([])), 1)
    U.deepStrictEqual(pipe(1, A.combineMany([2, 3, 4, 5, 6])), 1)
  })

  it("last", () => {
    const A = _.last<number>()
    U.deepStrictEqual(pipe(1, A.combine(2)), 2)
    U.deepStrictEqual(pipe(1, A.combineMany([])), 1)
    U.deepStrictEqual(pipe(1, A.combineMany([2, 3, 4, 5, 6])), 6)
  })

  it("imap", () => {
    const imap = _.imap
    const To = imap((s: string) => [s], ([s]) => s)(string.Semigroup)
    U.deepStrictEqual(pipe(["a"], To.combine(["b"])), ["ab"])
    U.deepStrictEqual(pipe(["a"], To.combineMany([])), ["a"])
    U.deepStrictEqual(pipe(["a"], To.combineMany([["b"]])), ["ab"])
    U.deepStrictEqual(pipe(["a"], To.combineMany([["b"], ["c"]])), ["abc"])

    U.deepStrictEqual(
      pipe(
        ["a"],
        _.Invariant.imap((s: string) => [s], ([s]) => s)(string.Semigroup).combineMany([["b"], [
          "c"
        ]])
      ),
      ["abc"]
    )
  })

  it("product", () => {
    const A = pipe(
      string.Semigroup,
      _.NonEmptyProduct.product(number.SemigroupSum),
      _.NonEmptyProduct.product(number.SemigroupMultiply),
      _.imap(([[a, b], c]) => [a, b, c] as const, ([a, b, c]) => [[a, b], c] as const)
    )
    U.deepStrictEqual(pipe(["a", 2, 3], A.combine(["b", 3, 4])), ["ab", 5, 12])
  })

  it("productMany", () => {
    const A = pipe(
      string.Semigroup,
      _.NonEmptyProduct.productMany([string.Semigroup, string.Semigroup])
    )
    U.deepStrictEqual(pipe(["a", "b", "c"], A.combine(["d", "e", "f"])), ["ad", "be", "cf"])
  })
})
