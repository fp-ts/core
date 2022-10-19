import { pipe } from "@fp-ts/core/internal/Function"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import * as number from "../test-data/number"
import * as string from "../test-data/string"
import * as U from "../util"

describe("Monoid", () => {
  it("min", () => {
    const M = monoid.min(number.BoundedTotalOrder)
    U.deepStrictEqual(M.combineAll([]), +Infinity)
    U.deepStrictEqual(M.combineAll([1]), 1)
    U.deepStrictEqual(M.combineAll([1, -1]), -1)
  })

  it("max", () => {
    const M = monoid.max(number.BoundedTotalOrder)
    U.deepStrictEqual(M.combineAll([]), -Infinity)
    U.deepStrictEqual(M.combineAll([1]), 1)
    U.deepStrictEqual(M.combineAll([1, -1]), 1)
  })

  it("reverse", () => {
    const M = monoid.reverse(string.Monoid)
    U.deepStrictEqual(pipe("a", M.combine("b")), "ba")
    U.deepStrictEqual(pipe("a", M.combine(M.unit)), "a")
    U.deepStrictEqual(pipe(M.unit, M.combine("a")), "a")
    U.deepStrictEqual(pipe("a", M.combineMany([])), "a")
    U.deepStrictEqual(pipe("a", M.combineMany(["b", "c", "d"])), "dcba")
    U.deepStrictEqual(pipe("a", M.combineMany([M.unit])), "a")
    U.deepStrictEqual(pipe(M.unit, M.combineMany(["a"])), "a")
  })

  describe("struct", () => {
    it("baseline", () => {
      const M = monoid.struct({
        name: string.Monoid,
        age: number.MonoidSum
      })
      U.deepStrictEqual(M.unit, { name: "", age: 0 })
      U.deepStrictEqual(pipe({ name: "a", age: 10 }, M.combine({ name: "b", age: 20 })), {
        name: "ab",
        age: 30
      })
    })

    it("should ignore non own properties", () => {
      const monoids = Object.create({ a: 1 })
      const s = monoid.struct(monoids)
      U.deepStrictEqual(s.unit, {})
    })
  })

  it("tuple", () => {
    const M = monoid.tuple(
      string.Monoid,
      number.MonoidSum
    )
    U.deepStrictEqual(M.unit, ["", 0])
    U.deepStrictEqual(pipe(["a", 10], M.combine(["b", 20])), ["ab", 30])
  })
})
