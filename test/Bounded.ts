import * as _ from "@fp-ts/core/Bounded"
import * as number from "./test-data/number"
import * as U from "./util"

describe("Bounded", () => {
  it("clamp", () => {
    const clamp = _.clamp(_.fromSortable<number>(number.Sortable, 1, 10))
    U.deepStrictEqual(clamp(2), 2)
    U.deepStrictEqual(clamp(10), 10)
    U.deepStrictEqual(clamp(20), 10)
    U.deepStrictEqual(clamp(1), 1)
    U.deepStrictEqual(clamp(-10), 1)
  })

  it("reverse", () => {
    const Bounded = _.reverse(_.fromSortable<number>(number.Sortable, 10, 1))
    U.deepStrictEqual(Bounded.maximum, 1)
    U.deepStrictEqual(Bounded.minimum, 10)
  })
})
