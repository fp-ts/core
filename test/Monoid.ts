import * as monoid from "@fp-ts/core/Monoid"
import * as number from "./data/number"
import * as string from "./data/string"
import * as U from "./util"

describe("Monoid", () => {
  describe("combineAll", () => {
    it("baseline", () => {
      U.deepStrictEqual(monoid.combineAll(number.MonoidSum)([1, 2, 3]), 6)
    })

    it("should accept an Iterable", () => {
      U.deepStrictEqual(monoid.combineAll(number.MonoidSum)(new Set([1, 2, 3])), 6)
    })
  })

  it("min", () => {
    const M = monoid.min(number.Bounded)
    U.deepStrictEqual(monoid.combineAll(M)([]), +Infinity)
    U.deepStrictEqual(monoid.combineAll(M)([1]), 1)
    U.deepStrictEqual(monoid.combineAll(M)([1, -1]), -1)
  })

  it("max", () => {
    const M = monoid.max(number.Bounded)
    U.deepStrictEqual(monoid.combineAll(M)([]), -Infinity)
    U.deepStrictEqual(monoid.combineAll(M)([1]), 1)
    U.deepStrictEqual(monoid.combineAll(M)([1, -1]), 1)
  })

  it("reverse", () => {
    const M = monoid.reverse(string.Monoid)
    U.deepStrictEqual(M.combine("a", "b"), "ba")
    U.deepStrictEqual(M.combine("a", M.empty), "a")
    U.deepStrictEqual(M.combine(M.empty, "a"), "a")
  })

  describe("struct", () => {
    it("baseline", () => {
      const M = monoid.struct({
        name: string.Monoid,
        age: number.MonoidSum
      })
      U.deepStrictEqual(M.empty, { name: "", age: 0 })
      U.deepStrictEqual(M.combine({ name: "a", age: 10 }, { name: "b", age: 20 }), {
        name: "ab",
        age: 30
      })
    })

    it("should ignore non own properties", () => {
      const monoids = Object.create({ a: 1 })
      const s = monoid.struct(monoids)
      U.deepStrictEqual(s.empty, {})
    })
  })

  it("tuple", () => {
    const M = monoid.tuple(
      string.Monoid,
      number.MonoidSum
    )
    U.deepStrictEqual(M.empty, ["", 0])
    U.deepStrictEqual(M.combine(["a", 10], ["b", 20]), ["ab", 30])
  })
})
