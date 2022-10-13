import * as semigroup from "@fp-ts/core/Semigroup"
import * as number from "./data/number"
import * as string from "./data/string"
import * as U from "./util"

describe("Semigroup", () => {
  it("min", () => {
    const S = semigroup.min(number.Compare)
    U.deepStrictEqual(S.combine(1, 2), 1)
  })

  it("max", () => {
    const S = semigroup.max(number.Compare)
    U.deepStrictEqual(S.combine(1, 2), 2)
  })

  it("struct", () => {
    const S = semigroup.struct({
      name: string.Semigroup,
      age: number.SemigroupSum
    })
    U.deepStrictEqual(S.combineOf({ name: "a", age: 10 }, [{ name: "b", age: 20 }]), {
      name: "ab",
      age: 30
    })
  })

  it("tuple", () => {
    const S = semigroup.tuple(
      string.Semigroup,
      number.SemigroupSum
    )
    U.deepStrictEqual(S.combineOf(["a", 10], [["b", 20]]), ["ab", 30])
  })

  it("first", () => {
    U.deepStrictEqual(semigroup.first().combineOf(1, [2, 3, 4, 5, 6]), 1)
  })

  it("last", () => {
    U.deepStrictEqual(semigroup.last().combineOf(1, []), 1)
    U.deepStrictEqual(semigroup.last().combineOf(1, [2, 3, 4, 5, 6]), 6)
  })
})
