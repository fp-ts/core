import { pipe } from "@fp-ts/core/Function"
import * as _ from "@fp-ts/core/typeclass/Equivalence"

describe("Equivalence", () => {
  it("exports", () => {
    expect(_.Invariant).exists
    expect(_.Contravariant).exists
    expect(_.SemiProduct).exists
    expect(_.Product).exists
    expect(_.tuple).exists
    expect(_.struct).exists
  })

  test("strict returns an Equivalence that uses strict equality (===) to compare values", () => {
    const eq = _.strict<{ a: number }>()
    const a = { a: 1 }
    expect(eq(a, a)).toBe(true)
    expect(eq({ a: 1 }, { a: 1 })).toBe(false)
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

  it("of", () => {
    const eq = _.Product.of([])
    expect(eq([], [])).toEqual(true)
  })

  it("product", () => {
    const eq = _.Product.product(_.string, _.string)
    expect(eq(["a", "b"], ["a", "b"])).toEqual(true)
    expect(eq(["a", "b"], ["c", "b"])).toEqual(false)
    expect(eq(["a", "b"], ["a", "c"])).toEqual(false)
  })

  it("productMany", () => {
    const eq = _.Product.productMany(_.string, [_.string])
    expect(eq(["a", "b"], ["a", "b"])).toEqual(true)
    expect(eq(["a", "b"], ["a", "b", "c"])).toEqual(true)
    expect(eq(["a", "b", "c"], ["a", "b"])).toEqual(true)
    expect(eq(["a", "b"], ["c", "b"])).toEqual(false)
    expect(eq(["a", "b"], ["a", "c"])).toEqual(false)
  })

  it("all", () => {
    const eq = _.all([_.string, _.string])
    expect(eq(["a"], ["a"])).toEqual(true)
    expect(eq(["a"], ["b"])).toEqual(false)
    expect(eq(["a", "b"], ["a", "b"])).toEqual(true)
    expect(eq(["a", "b"], ["a", "c"])).toEqual(false)
  })

  it("array", () => {
    const eq = _.array(_.string)
    expect(eq(["a"], ["a"])).toEqual(true)
    expect(eq(["a"], ["b"])).toEqual(false)
    expect(eq(["a", "b"], ["a", "b"])).toEqual(true)
    expect(eq(["a", "b"], ["a", "c"])).toEqual(false)
  })
})
