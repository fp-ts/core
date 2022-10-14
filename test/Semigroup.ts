import * as semigroup from "@fp-ts/core/Semigroup"
import type { NonEmptyReadonlyArray } from "./data/NonEmptyReadonlyArray"
import * as number from "./data/number"
import * as string from "./data/string"
import * as U from "./util"

describe("Semigroup", () => {
  describe("combine", () => {
    it("should accept a NonEmptyReadonlyArray", () => {
      const input: NonEmptyReadonlyArray<number> = [1, 2, 3]
      U.deepStrictEqual(number.MonoidSum.combine(...input), 6)
    })
  })

  it("min", () => {
    const S = semigroup.min(number.Compare)
    U.deepStrictEqual(S.combine(1, 3, 2), 1)
  })

  it("max", () => {
    const S = semigroup.max(number.Compare)
    U.deepStrictEqual(S.combine(1, 3, 2), 3)
  })

  it("struct", () => {
    const S = semigroup.struct({
      name: string.Semigroup,
      age: number.SemigroupSum
    })
    U.deepStrictEqual(S.combine({ name: "a", age: 10 }, { name: "b", age: 20 }), {
      name: "ab",
      age: 30
    })
  })

  it("tuple", () => {
    const S = semigroup.tuple(
      string.Semigroup,
      number.SemigroupSum
    )
    U.deepStrictEqual(S.combine(["a", 10], ["b", 20]), ["ab", 30])
  })

  it("first", () => {
    const S = semigroup.first<number>()
    U.deepStrictEqual(S.combine(1, 2, 3, 4, 5, 6), 1)
  })

  it("last", () => {
    const S = semigroup.last<number>()
    U.deepStrictEqual(S.combine(1), 1)
    U.deepStrictEqual(S.combineAllWith(1, []), 1)
    U.deepStrictEqual(S.combine(1, 2, 3, 4, 5, 6), 6)
    U.deepStrictEqual(S.combineAllWith(1, [2, 3, 4, 5, 6]), 6)
  })
})
