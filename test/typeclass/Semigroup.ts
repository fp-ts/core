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
    const S = _.reverse(String.Semigroup)
    U.deepStrictEqual(S.combine("a", "b"), "ba")
    U.deepStrictEqual(S.combineMany("a", []), "a")
    U.deepStrictEqual(S.combineMany("a", ["b"]), "ba")
    U.deepStrictEqual(S.combineMany("a", ["b", "c", "d"]), "dcba")
  })

  it("constant", () => {
    const S = _.constant("-")
    U.deepStrictEqual(S.combine("a", "b"), "-")
    U.deepStrictEqual(S.combineMany("a", []), "-")
    U.deepStrictEqual(S.combineMany("a", ["b", "c", "d"]), "-")
  })

  it("intercalate", () => {
    const S = pipe(String.Semigroup, _.intercalate("|"))
    U.deepStrictEqual(S.combine("a", "b"), "a|b")
    U.deepStrictEqual(S.combineMany("a", []), "a")
    U.deepStrictEqual(S.combineMany("a", ["b"]), "a|b")
    U.deepStrictEqual(S.combineMany("a", ["b", "c", "d"]), "a|b|c|d")
  })

  describe("min", () => {
    it("should return the minimum", () => {
      const S = _.min(Number.Order)
      U.deepStrictEqual(S.combineMany(1, []), 1)
      U.deepStrictEqual(S.combineMany(1, [3, 2]), 1)
    })

    it("should return the last minimum", () => {
      type Item = { a: number }
      const A = _.min(pipe(Number.Order, order.contramap((_: Item) => _.a)))
      const item: Item = { a: 1 }
      U.strictEqual(A.combineMany({ a: 2 }, [{ a: 1 }, item]), item)
      U.strictEqual(A.combineMany(item, []), item)
    })
  })

  describe("max", () => {
    it("should return the maximum", () => {
      const S = _.max(Number.Order)
      U.deepStrictEqual(S.combineMany(1, []), 1)
      U.deepStrictEqual(S.combineMany(1, [3, 2]), 3)
    })

    it("should return the last minimum", () => {
      type Item = { a: number }
      const S = _.max(pipe(Number.Order, order.contramap((_: Item) => _.a)))
      const item: Item = { a: 2 }
      U.strictEqual(S.combineMany({ a: 1 }, [{ a: 2 }, item]), item)
      U.strictEqual(S.combineMany(item, []), item)
    })
  })

  it("struct", () => {
    const S = _.struct({
      name: String.Semigroup,
      age: Number.SemigroupSum
    })
    U.deepStrictEqual(S.combine({ name: "a", age: 10 }, { name: "b", age: 20 }), {
      name: "ab",
      age: 30
    })
    U.deepStrictEqual(S.combineMany({ name: "a", age: 10 }, []), {
      name: "a",
      age: 10
    })
    U.deepStrictEqual(S.combineMany({ name: "a", age: 10 }, [{ name: "b", age: 20 }]), {
      name: "ab",
      age: 30
    })
    U.deepStrictEqual(
      S.combineMany({ name: "a", age: 10 }, [{ name: "b", age: 20 }, { name: "c", age: 30 }]),
      {
        name: "abc",
        age: 60
      }
    )
  })

  it("tuple", () => {
    const S = _.tuple(
      String.Semigroup,
      Number.SemigroupSum
    )
    U.deepStrictEqual(S.combine(["a", 10], ["b", 20]), ["ab", 30])
    U.deepStrictEqual(S.combineMany(["a", 10], []), ["a", 10])
    U.deepStrictEqual(S.combineMany(["a", 10], [["b", 20]]), ["ab", 30])
    U.deepStrictEqual(S.combineMany(["a", 10], [["b", 20], ["c", 30]]), ["abc", 60])
  })

  it("first", () => {
    const S = _.first<number>()
    U.deepStrictEqual(S.combine(1, 2), 1)
    U.deepStrictEqual(S.combineMany(1, []), 1)
    U.deepStrictEqual(S.combineMany(1, [2, 3, 4, 5, 6]), 1)
  })

  it("last", () => {
    const S = _.last<number>()
    U.deepStrictEqual(S.combine(1, 2), 2)
    U.deepStrictEqual(S.combineMany(1, []), 1)
    U.deepStrictEqual(S.combineMany(1, [2, 3, 4, 5, 6]), 6)
  })

  it("imap", () => {
    const imap = _.imap
    const S1 = imap((s: string) => [s], ([s]) => s)(String.Semigroup)
    U.deepStrictEqual(S1.combine(["a"], ["b"]), ["ab"])
    U.deepStrictEqual(S1.combineMany(["a"], []), ["a"])
    U.deepStrictEqual(S1.combineMany(["a"], [["b"]]), ["ab"])
    U.deepStrictEqual(S1.combineMany(["a"], [["b"], ["c"]]), ["abc"])
    // should handle an Iterable
    U.deepStrictEqual(S1.combineMany(["a"], new Set([["b"], ["c"]])), ["abc"])

    const S2 = pipe(String.Semigroup, _.Invariant.imap((s: string) => [s], ([s]) => s))
    U.deepStrictEqual(S2.combineMany(["a"], [["b"], ["c"]]), ["abc"])
  })

  it("product", () => {
    const S = pipe(
      String.Semigroup,
      _.SemiProduct.product(Number.SemigroupSum),
      _.SemiProduct.product(Number.SemigroupMultiply),
      _.imap(
        ([[a, b], c]): [string, number, number] => [a, b, c],
        ([a, b, c]): [[string, number], number] => [[a, b], c]
      )
    )
    U.deepStrictEqual(S.combine(["a", 2, 3], ["b", 3, 4]), ["ab", 5, 12])
  })

  it("productMany", () => {
    const S = pipe(
      String.Semigroup,
      _.SemiProduct.productMany([String.Semigroup, String.Semigroup])
    )
    U.deepStrictEqual(S.combine(["a", "b", "c"], ["d", "e", "f"]), ["ad", "be", "cf"])
  })
})
