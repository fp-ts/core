import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "@fp-ts/core/typeclass/TotalOrder"
import * as boolean from "../test-data/boolean"
import * as number from "../test-data/number"
import { sort } from "../test-data/ReadonlyArray"
import * as string from "../test-data/string"
import * as U from "../util"

describe("TotalOrder", () => {
  it("tuple", () => {
    const TO = _.tuple(string.TotalOrder, number.TotalOrder, boolean.TotalOrder)
    U.deepStrictEqual(pipe(["a", 1, true], TO.compare(["b", 2, true])), -1)
    U.deepStrictEqual(pipe(["a", 1, true], TO.compare(["a", 2, true])), -1)
    U.deepStrictEqual(pipe(["a", 1, true], TO.compare(["a", 1, false])), 1)
  })

  it("Contravariant", () => {
    const TO = pipe(number.TotalOrder, _.Contravariant.contramap((s: string) => s.length))
    U.deepStrictEqual(pipe("a", TO.compare("b")), 0)
    U.deepStrictEqual(pipe("a", TO.compare("bb")), -1)
    U.deepStrictEqual(pipe("aa", TO.compare("b")), 1)
  })

  it("Invariant", () => {
    const TO = _.Invariant.imap((s: string) => [s] as const, ([s]) => s)(
      string.TotalOrder
    )
    U.deepStrictEqual(pipe(["a"], TO.compare(["b"])), -1)
    U.deepStrictEqual(pipe(["a"], TO.compare(["a"])), 0)
    U.deepStrictEqual(pipe(["b"], TO.compare(["a"])), 1)
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
      number.TotalOrder,
      _.contramap((x: T) => x[0])
    )
    const sortBySnd = pipe(
      string.TotalOrder,
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
      number.TotalOrder,
      _.contramap((x: T) => x[0])
    )
    const sortBySnd = pipe(
      string.TotalOrder,
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
    const clamp = _.clamp(number.TotalOrder)
    U.deepStrictEqual(clamp(1, 10)(2), 2)
    U.deepStrictEqual(clamp(1, 10)(10), 10)
    U.deepStrictEqual(clamp(1, 10)(20), 10)
    U.deepStrictEqual(clamp(1, 10)(1), 1)
    U.deepStrictEqual(clamp(1, 10)(-10), 1)
  })

  it("between", () => {
    const between = _.between(number.TotalOrder)
    U.deepStrictEqual(between(1, 10)(2), true)
    U.deepStrictEqual(between(1, 10)(10), true)
    U.deepStrictEqual(between(1, 10)(20), false)
    U.deepStrictEqual(between(1, 10)(1), true)
    U.deepStrictEqual(between(1, 10)(-10), false)
  })

  it("reverse", () => {
    const TO = _.reverse(number.TotalOrder)
    U.deepStrictEqual(pipe(1, TO.compare(2)), 1)
    U.deepStrictEqual(pipe(2, TO.compare(1)), -1)
    U.deepStrictEqual(pipe(2, TO.compare(2)), 0)
  })

  it("lessThan", () => {
    const lessThan = _.lessThan(number.TotalOrder)
    U.deepStrictEqual(pipe(0, lessThan(1)), true)
    U.deepStrictEqual(pipe(1, lessThan(1)), false)
    U.deepStrictEqual(pipe(2, lessThan(1)), false)
  })

  it("lessThanOrEqualTo", () => {
    const lessThanOrEqualTo = _.lessThanOrEqualTo(number.TotalOrder)
    U.deepStrictEqual(pipe(0, lessThanOrEqualTo(1)), true)
    U.deepStrictEqual(pipe(1, lessThanOrEqualTo(1)), true)
    U.deepStrictEqual(pipe(2, lessThanOrEqualTo(1)), false)
  })

  it("greaterThan", () => {
    const greaterThan = _.greaterThan(number.TotalOrder)
    U.deepStrictEqual(pipe(0, greaterThan(1)), false)
    U.deepStrictEqual(pipe(1, greaterThan(1)), false)
    U.deepStrictEqual(pipe(2, greaterThan(1)), true)
  })

  it("greaterThanOrEqualTo", () => {
    const greaterThanOrEqualTo = _.greaterThanOrEqualTo(number.TotalOrder)
    U.deepStrictEqual(pipe(0, greaterThanOrEqualTo(1)), false)
    U.deepStrictEqual(pipe(1, greaterThanOrEqualTo(1)), true)
    U.deepStrictEqual(pipe(2, greaterThanOrEqualTo(1)), true)
  })

  it("min", () => {
    type A = { readonly a: number }
    const min = _.min(
      pipe(
        number.TotalOrder,
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
        number.TotalOrder,
        _.contramap((a: A) => a.a)
      )
    )
    U.deepStrictEqual(pipe({ a: 1 }, max({ a: 2 })), { a: 2 })
    U.deepStrictEqual(pipe({ a: 2 }, max({ a: 1 })), { a: 2 })
    const first = { a: 1 }
    const second = { a: 1 }
    U.strictEqual(pipe(first, max(second)), first)
  })

  describe("NonEmptyProduct", () => {
    it("product", () => {
      const TO = pipe(
        string.TotalOrder,
        _.NonEmptyProduct.product(number.TotalOrder)
      )
      U.deepStrictEqual(pipe(["a", 1], TO.compare(["a", 2])), -1)
      U.deepStrictEqual(pipe(["a", 1], TO.compare(["a", 1])), 0)
      U.deepStrictEqual(pipe(["a", 1], TO.compare(["a", 0])), 1)
      U.deepStrictEqual(pipe(["a", 1], TO.compare(["b", 1])), -1)
    })

    it("productMany", () => {
      const TO = pipe(
        string.TotalOrder,
        _.NonEmptyProduct.productMany([string.TotalOrder, string.TotalOrder])
      )
      U.deepStrictEqual(pipe(["a", "b"], TO.compare(["a", "c"])), -1)
      U.deepStrictEqual(pipe(["a", "b"], TO.compare(["a", "b"])), 0)
      U.deepStrictEqual(pipe(["a", "b"], TO.compare(["a", "a"])), 1)
      U.deepStrictEqual(pipe(["a", "b"], TO.compare(["b", "a"])), -1)
    })
  })

  describe("Product", () => {
    it("of", () => {
      const TO = _.Product.of("a")
      U.deepStrictEqual(pipe("b", TO.compare("a")), 0)
      U.deepStrictEqual(pipe("a", TO.compare("a")), 0)
      U.deepStrictEqual(pipe("a", TO.compare("b")), 0)
    })

    it("productAll", () => {
      const TO = pipe(
        _.Product.productAll([string.TotalOrder, string.TotalOrder, string.TotalOrder])
      )
      U.deepStrictEqual(pipe(["a", "b"], TO.compare(["a", "c"])), -1)
      U.deepStrictEqual(pipe(["a", "b"], TO.compare(["a", "b"])), 0)
      U.deepStrictEqual(pipe(["a", "b"], TO.compare(["a", "a"])), 1)
      U.deepStrictEqual(pipe(["a", "b"], TO.compare(["b", "a"])), -1)
    })
  })
})
