import * as _ from "@fp-ts/core/CoproductWithCounit"
import * as O from "./data/Option"
import * as U from "./util"

describe("MonoidKind", () => {
  it("fromSemigroupKind", () => {
    const SemigroupKind = _.fromCoproduct(O.SemigroupKind, () => O.none)
    U.deepStrictEqual(SemigroupKind.coproductAll([]), O.none)
    U.deepStrictEqual(SemigroupKind.coproductAll([O.none]), O.none)
    U.deepStrictEqual(SemigroupKind.coproductAll([O.some(1)]), O.some(1))
    U.deepStrictEqual(SemigroupKind.coproductAll([O.some(1), O.some(2)]), O.some(1))
    U.deepStrictEqual(SemigroupKind.coproductAll([O.none, O.some(2)]), O.some(2))
  })
})
