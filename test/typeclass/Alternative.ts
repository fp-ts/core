import * as _ from "@fp-ts/core/typeclass/Alternative"
import * as O from "../test-data/Option"
import * as U from "../util"

describe("Alternative", () => {
  it("fromAlt", () => {
    const Alternative = _.fromNonEmptyAlternative(O.Alt, () => O.none)
    U.deepStrictEqual(Alternative.coproductAll([]), O.none)
    U.deepStrictEqual(Alternative.coproductAll([O.none]), O.none)
    U.deepStrictEqual(Alternative.coproductAll([O.some(1)]), O.some(1))
    U.deepStrictEqual(Alternative.coproductAll([O.some(1), O.some(2)]), O.some(1))
    U.deepStrictEqual(Alternative.coproductAll([O.none, O.some(2)]), O.some(2))
  })
})
