import * as _ from "@fp-ts/core/typeclass/BoundedTotalOrder"
import * as number from "../test-data/number"
import * as U from "../util"

describe("BoundedTotalOrder", () => {
  it("clamp", () => {
    const clamp = _.clamp({ ...number.TotalOrder, minimum: 1, maximum: 10 })
    U.deepStrictEqual(clamp(2), 2)
    U.deepStrictEqual(clamp(10), 10)
    U.deepStrictEqual(clamp(20), 10)
    U.deepStrictEqual(clamp(1), 1)
    U.deepStrictEqual(clamp(-10), 1)
  })

  it("reverse", () => {
    const BoundedTotalOrder = _.reverse({ ...number.TotalOrder, minimum: 10, maximum: 1 })
    U.deepStrictEqual(BoundedTotalOrder.maximum, 1)
    U.deepStrictEqual(BoundedTotalOrder.minimum, 10)
  })
})
