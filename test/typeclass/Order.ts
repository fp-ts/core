import { pipe } from "@fp-ts/core/Function"
import { sort } from "@fp-ts/core/ReadonlyArray"
import * as _ from "@fp-ts/core/typeclass/Order"
import * as U from "../util"

describe("Order", () => {
  it("bigint", () => {
    const O = _.bigint
    expect(pipe(1n, _.lessThanOrEqualTo(O)(2n))).toBe(true)
    expect(pipe(1n, _.lessThanOrEqualTo(O)(1n))).toBe(true)
    expect(pipe(1n, _.lessThan(O)(1n))).toBe(false)
    expect(pipe(1n, _.lessThanOrEqualTo(O)(0n))).toBe(false)
  })

  it("tuple", () => {
    const O = _.tuple(_.string, _.number, _.boolean)
    U.deepStrictEqual(O.compare(["a", 1, true], ["b", 2, true]), -1)
    U.deepStrictEqual(O.compare(["a", 1, true], ["a", 2, true]), -1)
    U.deepStrictEqual(O.compare(["a", 1, true], ["a", 1, false]), 1)
  })

  it("struct", () => {
    const O = _.struct({ a: _.string, b: _.number, c: _.boolean })
    U.deepStrictEqual(O.compare({ a: "a", b: 1, c: true }, { a: "b", b: 2, c: true }), -1)
    U.deepStrictEqual(O.compare({ a: "a", b: 1, c: true }, { a: "a", b: 2, c: true }), -1)
    U.deepStrictEqual(O.compare({ a: "a", b: 1, c: true }, { a: "a", b: 1, c: false }), 1)
    U.deepStrictEqual(O.compare({ a: "a", b: 1, c: true }, { a: "a", b: 1, c: true }), 0)
  })

  it("Contravariant", () => {
    const O = pipe(_.number, _.Contravariant.contramap((s: string) => s.length))
    U.deepStrictEqual(O.compare("a", "b"), 0)
    U.deepStrictEqual(O.compare("a", "bb"), -1)
    U.deepStrictEqual(O.compare("aa", "b"), 1)
  })

  it("Invariant", () => {
    const O = _.Invariant.imap((s: string) => [s], ([s]) => s)(
      _.string
    )
    U.deepStrictEqual(O.compare(["a"], ["b"]), -1)
    U.deepStrictEqual(O.compare(["a"], ["a"]), 0)
    U.deepStrictEqual(O.compare(["b"], ["a"]), 1)
  })

  it("getSemigroup", () => {
    type T = [number, string]
    const tuples: Array<T> = [
      [2, "c"],
      [1, "b"],
      [2, "a"],
      [1, "c"]
    ]
    const S = _.getSemigroup<T>()
    const sortByFst = pipe(
      _.number,
      _.contramap((x: T) => x[0])
    )
    const sortBySnd = pipe(
      _.string,
      _.contramap((x: T) => x[1])
    )
    U.deepStrictEqual(sort(S.combine(sortByFst, sortBySnd))(tuples), [
      [1, "b"],
      [1, "c"],
      [2, "a"],
      [2, "c"]
    ])
    U.deepStrictEqual(sort(S.combine(sortBySnd, sortByFst))(tuples), [
      [2, "a"],
      [1, "b"],
      [1, "c"],
      [2, "c"]
    ])
    U.deepStrictEqual(sort(S.combineMany(sortBySnd, []))(tuples), [
      [2, "a"],
      [1, "b"],
      [2, "c"],
      [1, "c"]
    ])
    U.deepStrictEqual(sort(S.combineMany(sortBySnd, [sortByFst]))(tuples), [
      [2, "a"],
      [1, "b"],
      [1, "c"],
      [2, "c"]
    ])
  })

  it("getMonoid", () => {
    type T = [number, string]
    const tuples: Array<T> = [
      [2, "c"],
      [1, "b"],
      [2, "a"],
      [1, "c"]
    ]
    const M = _.getMonoid<T>()
    const sortByFst = pipe(
      _.number,
      _.contramap((x: T) => x[0])
    )
    const sortBySnd = pipe(
      _.string,
      _.contramap((x: T) => x[1])
    )
    U.deepStrictEqual(sort(M.combineMany(M.empty, [sortByFst, sortBySnd]))(tuples), [
      [1, "b"],
      [1, "c"],
      [2, "a"],
      [2, "c"]
    ])
    U.deepStrictEqual(sort(M.combineMany(sortBySnd, [sortByFst, M.empty]))(tuples), [
      [2, "a"],
      [1, "b"],
      [1, "c"],
      [2, "c"]
    ])
  })

  it("clamp", () => {
    const clamp = _.clamp(_.number)
    U.deepStrictEqual(clamp(1, 10)(2), 2)
    U.deepStrictEqual(clamp(1, 10)(10), 10)
    U.deepStrictEqual(clamp(1, 10)(20), 10)
    U.deepStrictEqual(clamp(1, 10)(1), 1)
    U.deepStrictEqual(clamp(1, 10)(-10), 1)
  })

  it("between", () => {
    const between = _.between(_.number)
    U.deepStrictEqual(between(1, 10)(2), true)
    U.deepStrictEqual(between(1, 10)(10), true)
    U.deepStrictEqual(between(1, 10)(20), false)
    U.deepStrictEqual(between(1, 10)(1), true)
    U.deepStrictEqual(between(1, 10)(-10), false)
  })

  it("reverse", () => {
    const O = _.reverse(_.number)
    U.deepStrictEqual(O.compare(1, 2), 1)
    U.deepStrictEqual(O.compare(2, 1), -1)
    U.deepStrictEqual(O.compare(2, 2), 0)
  })

  it("lessThan", () => {
    const lessThan = _.lessThan(_.number)
    U.deepStrictEqual(pipe(0, lessThan(1)), true)
    U.deepStrictEqual(pipe(1, lessThan(1)), false)
    U.deepStrictEqual(pipe(2, lessThan(1)), false)
  })

  it("lessThanOrEqualTo", () => {
    const lessThanOrEqualTo = _.lessThanOrEqualTo(_.number)
    U.deepStrictEqual(pipe(0, lessThanOrEqualTo(1)), true)
    U.deepStrictEqual(pipe(1, lessThanOrEqualTo(1)), true)
    U.deepStrictEqual(pipe(2, lessThanOrEqualTo(1)), false)
  })

  it("greaterThan", () => {
    const greaterThan = _.greaterThan(_.number)
    U.deepStrictEqual(pipe(0, greaterThan(1)), false)
    U.deepStrictEqual(pipe(1, greaterThan(1)), false)
    U.deepStrictEqual(pipe(2, greaterThan(1)), true)
  })

  it("greaterThanOrEqualTo", () => {
    const greaterThanOrEqualTo = _.greaterThanOrEqualTo(_.number)
    U.deepStrictEqual(pipe(0, greaterThanOrEqualTo(1)), false)
    U.deepStrictEqual(pipe(1, greaterThanOrEqualTo(1)), true)
    U.deepStrictEqual(pipe(2, greaterThanOrEqualTo(1)), true)
  })

  it("min", () => {
    type A = { a: number }
    const min = _.min(
      pipe(
        _.number,
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
    type A = { a: number }
    const max = _.max(
      pipe(
        _.number,
        _.contramap((a: A) => a.a)
      )
    )
    U.deepStrictEqual(pipe({ a: 1 }, max({ a: 2 })), { a: 2 })
    U.deepStrictEqual(pipe({ a: 2 }, max({ a: 1 })), { a: 2 })
    const first = { a: 1 }
    const second = { a: 1 }
    U.strictEqual(pipe(first, max(second)), first)
  })

  describe("SemiProduct", () => {
    it("product", () => {
      const O = _.SemiProduct.product(_.string, _.number)
      U.deepStrictEqual(O.compare(["a", 1], ["a", 2]), -1)
      U.deepStrictEqual(O.compare(["a", 1], ["a", 1]), 0)
      U.deepStrictEqual(O.compare(["a", 1], ["a", 0]), 1)
      U.deepStrictEqual(O.compare(["a", 1], ["b", 1]), -1)
    })

    it("productMany", () => {
      const O = _.SemiProduct.productMany(_.string, [_.string, _.string])
      U.deepStrictEqual(O.compare(["a", "b"], ["a", "c"]), -1)
      U.deepStrictEqual(O.compare(["a", "b"], ["a", "b"]), 0)
      U.deepStrictEqual(O.compare(["a", "b"], ["a", "a"]), 1)
      U.deepStrictEqual(O.compare(["a", "b"], ["b", "a"]), -1)
    })
  })

  describe("Product", () => {
    it("of", () => {
      const O = _.Product.of("a")
      U.deepStrictEqual(O.compare("b", "a"), 0)
      U.deepStrictEqual(O.compare("a", "a"), 0)
      U.deepStrictEqual(O.compare("a", "b"), 0)
    })

    it("productAll", () => {
      const O = pipe(
        _.Product.productAll([_.string, _.string, _.string])
      )
      U.deepStrictEqual(O.compare(["a", "b"], ["a", "c"]), -1)
      U.deepStrictEqual(O.compare(["a", "b"], ["a", "b"]), 0)
      U.deepStrictEqual(O.compare(["a", "b"], ["a", "a"]), 1)
      U.deepStrictEqual(O.compare(["a", "b"], ["b", "a"]), -1)
    })
  })
})
