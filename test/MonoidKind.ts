import * as _ from "@fp-ts/core/MonoidKind"
import * as O from "./data/Option"
import * as U from "./util"

describe("MonoidKind", () => {
  it("fromSemigroupKind", () => {
    const SemigroupKind = _.fromSemigroupKind(O.SemigroupKind, () => O.none)
    U.deepStrictEqual(SemigroupKind.combineKindAll([]), O.none)
    U.deepStrictEqual(SemigroupKind.combineKindAll([O.none]), O.none)
    U.deepStrictEqual(SemigroupKind.combineKindAll([O.some(1)]), O.some(1))
    U.deepStrictEqual(SemigroupKind.combineKindAll([O.some(1), O.some(2)]), O.some(1))
    U.deepStrictEqual(SemigroupKind.combineKindAll([O.none, O.some(2)]), O.some(2))
  })
})
