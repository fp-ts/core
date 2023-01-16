import * as Number from "@fp-ts/core/Number"
import * as _ from "@fp-ts/core/typeclass/Bounded"
import * as U from "../util"

describe("Bounded", () => {
  it("clamp", () => {
    const clamp = _.clamp({ ...Number.Order, minBound: 1, maxBound: 10 })
    U.deepStrictEqual(clamp(2), 2)
    U.deepStrictEqual(clamp(10), 10)
    U.deepStrictEqual(clamp(20), 10)
    U.deepStrictEqual(clamp(1), 1)
    U.deepStrictEqual(clamp(-10), 1)
  })

  it("reverse", () => {
    const B = _.reverse({ ...Number.Order, minBound: 10, maxBound: 1 })
    U.deepStrictEqual(B.maxBound, 1)
    U.deepStrictEqual(B.minBound, 10)
  })
})
