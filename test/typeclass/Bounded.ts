import * as _ from "@fp-ts/core/typeclass/Bounded"
import * as number from "../test-data/number"
import * as U from "../util"

describe("Bounded", () => {
  it("clamp", () => {
    const clamp = _.clamp({ ...number.Order, minBound: 1, maxBound: 10 })
    U.deepStrictEqual(clamp(2), 2)
    U.deepStrictEqual(clamp(10), 10)
    U.deepStrictEqual(clamp(20), 10)
    U.deepStrictEqual(clamp(1), 1)
    U.deepStrictEqual(clamp(-10), 1)
  })

  it("reverse", () => {
    const B = _.reverse({ ...number.Order, minBound: 10, maxBound: 1 })
    U.deepStrictEqual(B.maxBound, 1)
    U.deepStrictEqual(B.minBound, 10)
  })
})
