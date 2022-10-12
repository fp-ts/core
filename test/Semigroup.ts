import * as compare from "@fp-ts/core/Compare"
import * as _ from "@fp-ts/core/Semigroup"
import * as U from "./util"

describe("Semigroup", () => {
  it("min", () => {
    const Semigroup = _.min(compare.CompareNumber)
    U.deepStrictEqual(Semigroup.combineAll(1, 2), 1)
  })

  it("max", () => {
    const Semigroup = _.max(compare.CompareNumber)
    U.deepStrictEqual(Semigroup.combineAll(1, 2), 2)
  })

  it("struct", () => {
    const Semigroup = _.struct({
      name: _.string,
      age: _.sum
    })
    U.deepStrictEqual(Semigroup.combineAll({ name: "a", age: 10 }, { name: "b", age: 20 }), {
      name: "ab",
      age: 30
    })
  })

  it("struct", () => {
    const Semigroup = _.tuple(
      _.string,
      _.sum
    )
    U.deepStrictEqual(Semigroup.combineAll(["a", 10], ["b", 20]), ["ab", 30])
  })

  it("first", () => {
    U.deepStrictEqual(_.first().combineAll(1, 2, 3, 4, 5, 6), 1)
  })

  it("last", () => {
    U.deepStrictEqual(_.last().combineAll(1, 2, 3, 4, 5, 6), 6)
  })
})
