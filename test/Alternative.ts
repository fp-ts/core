import * as _ from "@fp-ts/core/Alternative"
import * as O from "./data/Option"
import * as U from "./util"

describe("Alternative", () => {
  it("fromCoproduct", () => {
    const Alternative = _.fromCoproduct(O.Coproduct, () => O.none)
    U.deepStrictEqual(Alternative.coproductAll([]), O.none)
    U.deepStrictEqual(Alternative.coproductAll([O.none]), O.none)
    U.deepStrictEqual(Alternative.coproductAll([O.some(1)]), O.some(1))
    U.deepStrictEqual(Alternative.coproductAll([O.some(1), O.some(2)]), O.some(1))
    U.deepStrictEqual(Alternative.coproductAll([O.none, O.some(2)]), O.some(2))
  })
})
