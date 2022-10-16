import * as monoid from "@fp-ts/core/Monoid"
import * as number from "./data/number"
import * as string from "./data/string"
import * as U from "./util"

describe("Monoid", () => {
  it("min", () => {
    const M = monoid.min(number.Bounded)
    U.deepStrictEqual(M.combineAll([]), +Infinity)
    U.deepStrictEqual(M.combineAll([1]), 1)
    U.deepStrictEqual(M.combineAll([1, -1]), -1)
  })

  it("max", () => {
    const M = monoid.max(number.Bounded)
    U.deepStrictEqual(M.combineAll([]), -Infinity)
    U.deepStrictEqual(M.combineAll([1]), 1)
    U.deepStrictEqual(M.combineAll([1, -1]), 1)
  })

  it("reverse", () => {
    const M = monoid.reverse(string.Monoid)
    U.deepStrictEqual(M.combineMany("a", ["b"]), "ba")
    U.deepStrictEqual(M.combineMany("a", [M.empty]), "a")
    U.deepStrictEqual(M.combineMany(M.empty, ["a"]), "a")
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
