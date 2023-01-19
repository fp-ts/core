import { pipe } from "@fp-ts/core/Function"
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
    U.deepStrictEqual(pipe("a", M.combine("b")), "ba")
    U.deepStrictEqual(pipe("a", M.combine(M.empty)), "a")
    U.deepStrictEqual(pipe(M.empty, M.combine("a")), "a")
    U.deepStrictEqual(pipe("a", M.combineMany([])), "a")
    U.deepStrictEqual(pipe("a", M.combineMany(["b", "c", "d"])), "dcba")
    U.deepStrictEqual(pipe("a", M.combineMany([M.empty])), "a")
    U.deepStrictEqual(pipe(M.empty, M.combineMany(["a"])), "a")
  })

  describe("struct", () => {
    it("baseline", () => {
      const M = monoid.struct({
        name: String.Monoid,
        age: N.MonoidSum
      })
      U.deepStrictEqual(M.empty, { name: "", age: 0 })
      U.deepStrictEqual(pipe({ name: "a", age: 10 }, M.combine({ name: "b", age: 20 })), {
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
    U.deepStrictEqual(pipe(["a", 10], M.combine(["b", 20])), ["ab", 30])
  })
})
