import * as semigroup from "@fp-ts/core/Semigroup"
import * as number from "./data/number"
import * as string from "./data/string"
import * as U from "./util"

describe("Semigroup", () => {
  it("min", () => {
    const Semigroup = semigroup.min(number.Compare)
    U.deepStrictEqual(Semigroup.combine(1, 2), 1)
  })

  it("max", () => {
    const Semigroup = semigroup.max(number.Compare)
    U.deepStrictEqual(Semigroup.combine(1, 2), 2)
  })

  it("struct", () => {
    const Semigroup = semigroup.struct({
      name: string.Semigroup,
      age: number.SemigroupSum
    })
    U.deepStrictEqual(Semigroup.combineAll({ name: "a", age: 10 }, [{ name: "b", age: 20 }]), {
      name: "ab",
      age: 30
    })
  })

  it("struct", () => {
    const Semigroup = semigroup.tuple(
      string.Semigroup,
      number.SemigroupSum
    )
    U.deepStrictEqual(Semigroup.combineAll(["a", 10], [["b", 20]]), ["ab", 30])
  })

  it("first", () => {
    U.deepStrictEqual(semigroup.first().combineAll(1, [2, 3, 4, 5, 6]), 1)
  })

  it("last", () => {
    U.deepStrictEqual(semigroup.last().combineAll(1, [2, 3, 4, 5, 6]), 6)
  })
})
