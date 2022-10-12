import * as compare from "@fp-ts/core/Compare"
import * as _ from "@fp-ts/core/Semigroup"
import * as U from "./util"

export const SemigroupSum: _.Semigroup<number> = _.fromCombine((x, y) => x + y)

export const SemigroupString: _.Semigroup<string> = _.fromCombine((x, y) => x + y)

export const CompareNumber: compare.Compare<number> = compare.fromCompare((a1, a2) =>
  a1 < a2 ? -1 : a1 > a2 ? 1 : 0
)

describe("Semigroup", () => {
  it("min", () => {
    const Semigroup = _.min(CompareNumber)
    U.deepStrictEqual(Semigroup.combine(1, 2), 1)
  })

  it("max", () => {
    const Semigroup = _.max(CompareNumber)
    U.deepStrictEqual(Semigroup.combine(1, 2), 2)
  })

  it("struct", () => {
    const Semigroup = _.struct({
      name: SemigroupString,
      age: SemigroupSum
    })
    U.deepStrictEqual(Semigroup.combineAll({ name: "a", age: 10 }, [{ name: "b", age: 20 }]), {
      name: "ab",
      age: 30
    })
  })

  it("struct", () => {
    const Semigroup = _.tuple(
      SemigroupString,
      SemigroupSum
    )
    U.deepStrictEqual(Semigroup.combineAll(["a", 10], [["b", 20]]), ["ab", 30])
  })

  it("first", () => {
    U.deepStrictEqual(_.first().combineAll(1, [2, 3, 4, 5, 6]), 1)
  })

  it("last", () => {
    U.deepStrictEqual(_.last().combineAll(1, [2, 3, 4, 5, 6]), 6)
  })
})
