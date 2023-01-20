import * as N from "@fp-ts/core/Number"
import * as String from "@fp-ts/core/String"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import * as U from "../util"

describe("Monoid", () => {
  it("exports", () => {
    expect(monoid.array).exists
  })

  it("min", () => {
    const M = monoid.min(N.Bounded)
    U.deepStrictEqual(M.combineAll([]), +Infinity)
    U.deepStrictEqual(M.combineAll([1]), 1)
    U.deepStrictEqual(M.combineAll([1, -1]), -1)
  })

  it("max", () => {
    const M = monoid.max(N.Bounded)
    U.deepStrictEqual(M.combineAll([]), -Infinity)
    U.deepStrictEqual(M.combineAll([1]), 1)
    U.deepStrictEqual(M.combineAll([1, -1]), 1)
  })

  it("reverse", () => {
    const M = monoid.reverse(String.Monoid)
    U.deepStrictEqual(M.combine("a", "b"), "ba")
    U.deepStrictEqual(M.combine("a", M.empty), "a")
    U.deepStrictEqual(M.combine(M.empty, "a"), "a")
    U.deepStrictEqual(M.combineMany("a", []), "a")
    U.deepStrictEqual(M.combineMany("a", ["b", "c", "d"]), "dcba")
    U.deepStrictEqual(M.combineMany("a", [M.empty]), "a")
    U.deepStrictEqual(M.combineMany(M.empty, ["a"]), "a")
  })

  describe("struct", () => {
    it("baseline", () => {
      const M = monoid.struct({
        name: String.Monoid,
        age: N.MonoidSum
      })
      U.deepStrictEqual(M.empty, { name: "", age: 0 })
      U.deepStrictEqual(M.combine({ name: "a", age: 10 }, { name: "b", age: 20 }), {
        name: "ab",
        age: 30
      })
    })

    it("should ignore non own properties", () => {
      const monoids = Object.create({ a: 1 })
      const M = monoid.struct(monoids)
      U.deepStrictEqual(M.empty, {})
    })
  })

  it("tuple", () => {
    const M = monoid.tuple(
      String.Monoid,
      N.MonoidSum
    )
    U.deepStrictEqual(M.empty, ["", 0])
    U.deepStrictEqual(M.combine(["a", 10], ["b", 20]), ["ab", 30])
  })
})
