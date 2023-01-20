import { pipe } from "@fp-ts/core/Function"
import * as _ from "@fp-ts/core/typeclass/Equivalence"

describe("Equivalence", () => {
  it("exports", () => {
    expect(_.Contravariant).exists
  })

  test("strict returns an Equivalence that uses strict equality (===) to compare values", () => {
    const eq = _.strict<{ a: number }>()
    const a = { a: 1 }
    expect(eq(a, a)).toBe(true)
    expect(eq({ a: 1 }, { a: 1 })).toBe(false)
  })

  it("bigint", () => {
    const eq = _.bigint
    expect(eq(1n, 1n)).toBe(true)
    expect(eq(1n, 2n)).toBe(false)
  })

  it("symbol", () => {
    const eq = _.symbol
    expect(eq(Symbol.for("@fp-ts/core/test/a"), Symbol.for("@fp-ts/core/test/a"))).toBe(true)
    expect(eq(Symbol.for("@fp-ts/core/test/a"), Symbol.for("@fp-ts/core/test/b"))).toBe(false)
  })

  it("tuple", () => {
    const eqTuple = _.tuple(_.string, _.number, _.boolean)
    expect(eqTuple(["a", 1, true], ["a", 1, true])).toEqual(true)
    expect(eqTuple(["a", 1, true], ["b", 1, true])).toEqual(false)
    expect(eqTuple(["a", 1, true], ["a", 2, true])).toEqual(false)
    expect(eqTuple(["a", 1, true], ["a", 1, false])).toEqual(false)
  })

  describe("array", () => {
    it("returns true when all the elements of the arrays are equal according to the provided Equivalence", () => {
      const eqA = _.string
      const eqArray = _.array(eqA)
      expect(eqArray(["a", "b"], ["a", "b"])).toBe(true)
    })

    it("returns false when at least one element of the arrays is not equal according to the provided Equivalence", () => {
      const eqA = _.string
      const eqArray = _.array(eqA)
      expect(eqArray(["a", "b"], ["b", "b"])).toBe(false)
      expect(eqArray(["a", "b"], ["a", "c"])).toBe(false)
    })

    it("returns false when comparing arrays of different length", () => {
      const eqA = _.string
      const eqArray = _.array(eqA)
      expect(eqArray(["a"], ["a", "b"])).toBe(false)
      expect(eqArray(["a", "b"], ["a"])).toBe(false)
    })
  })

  describe("record", () => {
    it("returns true when all the values of the records are equal according to the provided Equivalence", () => {
      const eqA = _.string
      const eqRecord = _.record(eqA)
      expect(eqRecord({ a: "a", b: "b" }, { a: "a", b: "b" })).toBe(true)
    })

    it("returns false when at least one value of the records is not equal according to the provided Equivalence", () => {
      const eqA = _.string
      const eqRecord = _.record(eqA)
      expect(eqRecord({ a: "a", b: "b" }, { a: "b", b: "b" })).toBe(false)
      expect(eqRecord({ a: "a", b: "b" }, { a: "a", b: "c" })).toBe(false)
    })

    it("returns false when comparing records with a different number of keys", () => {
      const eqA = _.string
      const eqRecord = _.record(eqA)
      expect(eqRecord({ a: "a" }, { a: "a", b: "b" })).toBe(false)
      expect(eqRecord({ a: "a", b: "b" }, { a: "a" })).toBe(false)
    })
  })

  it("struct", () => {
    const eqStruct = _.struct({ a: _.string, b: _.number, c: _.boolean })
    expect(eqStruct({ a: "a", b: 1, c: true }, { a: "a", b: 1, c: true })).toEqual(true)
    expect(eqStruct({ a: "a", b: 1, c: true }, { a: "b", b: 1, c: true })).toEqual(false)
    expect(eqStruct({ a: "a", b: 1, c: true }, { a: "a", b: 2, c: true })).toEqual(false)
    expect(eqStruct({ a: "a", b: 1, c: true }, { a: "a", b: 1, c: false })).toEqual(false)
  })

  it("contramap", () => {
    interface Person {
      readonly name: string
      readonly age: number
    }
    const eqPerson = pipe(_.string, _.contramap((p: Person) => p.name))
    expect(eqPerson({ name: "a", age: 1 }, { name: "a", age: 2 })).toEqual(true)
    expect(eqPerson({ name: "a", age: 1 }, { name: "a", age: 1 })).toEqual(true)
    expect(eqPerson({ name: "a", age: 1 }, { name: "b", age: 1 })).toEqual(false)
    expect(eqPerson({ name: "a", age: 1 }, { name: "b", age: 2 })).toEqual(false)
  })

  it("getSemigroup", () => {
    type T = readonly [string, number, boolean]
    const S = _.getSemigroup<T>()
    const E0: _.Equivalence<T> = _.contramap((x: T) => x[0])(_.string)
    const E1: _.Equivalence<T> = _.contramap((x: T) => x[1])(_.number)
    const eqE0E1 = S.combine(E0, E1)
    expect(eqE0E1(["a", 1, true], ["a", 1, true])).toEqual(true)
    expect(eqE0E1(["a", 1, true], ["a", 1, false])).toEqual(true)
    expect(eqE0E1(["a", 1, true], ["b", 1, true])).toEqual(false)
    expect(eqE0E1(["a", 1, true], ["a", 2, false])).toEqual(false)
    const E2: _.Equivalence<T> = _.contramap((x: T) => x[2])(_.boolean)
    const eqE0E1E2 = S.combineMany(E0, [E1, E2])
    expect(eqE0E1E2(["a", 1, true], ["a", 1, true])).toEqual(true)
    expect(eqE0E1E2(["a", 1, true], ["b", 1, true])).toEqual(false)
    expect(eqE0E1E2(["a", 1, true], ["a", 2, true])).toEqual(false)
    expect(eqE0E1E2(["a", 1, true], ["a", 1, false])).toEqual(false)
  })

  it("getMonoid", () => {
    type T = readonly [string, number, boolean]
    const M = _.getMonoid<T>()
    const E0: _.Equivalence<T> = _.contramap((x: T) => x[0])(_.string)
    const E1: _.Equivalence<T> = _.contramap((x: T) => x[1])(_.number)
    const E2: _.Equivalence<T> = _.contramap((x: T) => x[2])(_.boolean)
    const eqE0E1E2 = M.combineAll([E0, E1, E2])
    expect(eqE0E1E2(["a", 1, true], ["a", 1, true])).toEqual(true)
    expect(eqE0E1E2(["a", 1, true], ["b", 1, true])).toEqual(false)
    expect(eqE0E1E2(["a", 1, true], ["a", 2, true])).toEqual(false)
    expect(eqE0E1E2(["a", 1, true], ["a", 1, false])).toEqual(false)
  })

  it("Invariant", () => {
    const eq = _.Invariant.imap((s: string) => [s], ([s]) => s)(
      _.string
    )
    expect(eq(["a"], ["a"])).toEqual(true)
    expect(eq(["a"], ["b"])).toEqual(false)
  })

  it("SemiProduct/product", () => {
    const eq = pipe(
      _.string,
      _.SemiProduct.product(_.string)
    )
    expect(eq(["a", "b"], ["a", "b"])).toEqual(true)
    expect(eq(["a", "b"], ["a", "c"])).toEqual(false)
  })

  it("SemiProduct/productMany", () => {
    const eq = pipe(
      _.string,
      _.SemiProduct.productMany([_.string])
    )
    expect(eq(["a"], ["a"])).toEqual(true)
    expect(eq(["a"], ["b"])).toEqual(false)
    expect(eq(["a"], ["a", "b"])).toEqual(false)
    expect(eq(["a", "b"], ["a", "b"])).toEqual(true)
    expect(eq(["a", "b"], ["a", "b", "d"])).toEqual(true)
    expect(eq(["a", "b", "c"], ["a", "b", "d"])).toEqual(true)
  })

  it("SemiProduct/productAll", () => {
    const eq = _.Product.productAll([_.Product.of(""), _.string, _.string])
    expect(eq(["a"], ["a"])).toEqual(true)
    expect(eq(["a"], ["b"])).toEqual(true)
    expect(eq(["a", "c"], ["b", "c"])).toEqual(true)
    expect(eq(["a", "c"], ["b", "d"])).toEqual(false)
  })
})
