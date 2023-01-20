import { pipe } from "@fp-ts/core/Function"
import * as Number from "@fp-ts/core/Number"
import * as String from "@fp-ts/core/String"
import * as order from "@fp-ts/core/typeclass/Order"
import * as _ from "@fp-ts/core/typeclass/Semigroup"
import * as U from "../util"

describe("Semigroup", () => {
  it("exports", () => {
    expect(_.array).exists
  })

  it("reverse", () => {
    const A = _.reverse(String.Semigroup)
    U.deepStrictEqual(A.combine("a", "b"), "ba")
    U.deepStrictEqual(pipe("a", A.combineMany([])), "a")
    U.deepStrictEqual(pipe("a", A.combineMany(["b"])), "ba")
    U.deepStrictEqual(pipe("a", A.combineMany(["b", "c", "d"])), "dcba")
  })

  it("constant", () => {
    const A = _.constant("-")
    U.deepStrictEqual(A.combine("a", "b"), "-")
    U.deepStrictEqual(pipe("a", A.combineMany([])), "-")
    U.deepStrictEqual(pipe("a", A.combineMany(["b", "c", "d"])), "-")
  })

  it("intercalate", () => {
    const A = pipe(String.Semigroup, _.intercalate("|"))
    U.deepStrictEqual(A.combine("a", "b"), "a|b")
    U.deepStrictEqual(pipe("a", A.combineMany([])), "a")
    U.deepStrictEqual(pipe("a", A.combineMany(["b"])), "a|b")
    U.deepStrictEqual(pipe("a", A.combineMany(["b", "c", "d"])), "a|b|c|d")
  })

  describe("min", () => {
    it("should return the minimum", () => {
      const A = _.min(Number.Order)
      U.deepStrictEqual(pipe(1, A.combineMany([])), 1)
      U.deepStrictEqual(pipe(1, A.combineMany([3, 2])), 1)
    })

    it("should return the last minimum", () => {
      type Item = { a: number }
      const A = _.min(pipe(Number.Order, order.contramap((_: Item) => _.a)))
      const item: Item = { a: 1 }
      U.strictEqual(pipe({ a: 2 }, A.combineMany([{ a: 1 }, item])), item)
      U.strictEqual(pipe(item, A.combineMany([])), item)
    })
  })

  describe("max", () => {
    it("should return the maximum", () => {
      const A = _.max(Number.Order)
      U.deepStrictEqual(pipe(1, A.combineMany([])), 1)
      U.deepStrictEqual(pipe(1, A.combineMany([3, 2])), 3)
    })

    it("should return the last minimum", () => {
      type Item = { a: number }
      const A = _.max(pipe(Number.Order, order.contramap((_: Item) => _.a)))
      const item: Item = { a: 2 }
      U.strictEqual(pipe({ a: 1 }, A.combineMany([{ a: 2 }, item])), item)
      U.strictEqual(pipe(item, A.combineMany([])), item)
    })
  })

  it("struct", () => {
    const A = _.struct({
      name: String.Semigroup,
      age: Number.SemigroupSum
    })
    U.deepStrictEqual(A.combine({ name: "a", age: 10 }, { name: "b", age: 20 }), {
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
      String.Semigroup,
      Number.SemigroupSum
    )
    U.deepStrictEqual(A.combine(["a", 10], ["b", 20]), ["ab", 30])
    U.deepStrictEqual(pipe(["a", 10], A.combineMany([])), ["a", 10])
    U.deepStrictEqual(pipe(["a", 10], A.combineMany([["b", 20]])), ["ab", 30])
    U.deepStrictEqual(pipe(["a", 10], A.combineMany([["b", 20], ["c", 30]])), ["abc", 60])
  })

  it("first", () => {
    const A = _.first<number>()
    U.deepStrictEqual(A.combine(1, 2), 1)
    U.deepStrictEqual(pipe(1, A.combineMany([])), 1)
    U.deepStrictEqual(pipe(1, A.combineMany([2, 3, 4, 5, 6])), 1)
  })

  it("last", () => {
    const A = _.last<number>()
    U.deepStrictEqual(A.combine(1, 2), 2)
    U.deepStrictEqual(pipe(1, A.combineMany([])), 1)
    U.deepStrictEqual(pipe(1, A.combineMany([2, 3, 4, 5, 6])), 6)
  })

  it("imap", () => {
    const imap = _.imap
    const To = imap((s: string) => [s], ([s]) => s)(String.Semigroup)
    U.deepStrictEqual(To.combine(["a"], ["b"]), ["ab"])
    U.deepStrictEqual(pipe(["a"], To.combineMany([])), ["a"])
    U.deepStrictEqual(pipe(["a"], To.combineMany([["b"]])), ["ab"])
    U.deepStrictEqual(pipe(["a"], To.combineMany([["b"], ["c"]])), ["abc"])

    U.deepStrictEqual(
      pipe(
        ["a"],
        _.Invariant.imap((s: string) => [s], ([s]) => s)(String.Semigroup).combineMany([["b"], [
          "c"
        ]])
      ),
      ["abc"]
    )
    // should handle an Iterable
    U.deepStrictEqual(pipe(["a"], To.combineMany(new Set([["b"], ["c"]]))), ["abc"])
  })

  it("product", () => {
    const A = pipe(
      String.Semigroup,
      _.SemiProduct.product(Number.SemigroupSum),
      _.SemiProduct.product(Number.SemigroupMultiply),
      _.imap(
        ([[a, b], c]): [string, number, number] => [a, b, c],
        ([a, b, c]): [[string, number], number] => [[a, b], c]
      )
    )
    U.deepStrictEqual(A.combine(["a", 2, 3], ["b", 3, 4]), ["ab", 5, 12])
  })

  it("productMany", () => {
    const A = pipe(
      String.Semigroup,
      _.SemiProduct.productMany([String.Semigroup, String.Semigroup])
    )
    U.deepStrictEqual(A.combine(["a", "b", "c"], ["d", "e", "f"]), ["ad", "be", "cf"])
  })
})
