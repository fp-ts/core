import * as _ from "@fp-ts/core/typeclass/NonEmptyTraversable"
import * as NERA from "../test-data/NonEmptyReadonlyArray"
import * as O from "../test-data/Option"
import * as U from "../util"

describe("NonEmptyTraversable", () => {
  it("nonEmptySequence", () => {
    const nonEmptyTraverse = _.nonEmptyTraverseComposition(
      NERA.NonEmptyTraversable,
      NERA.NonEmptyTraversable
    )(O.NonEmptyApplicative)((n: number) => (n > 0 ? O.some(n) : O.none))
    U.deepStrictEqual(nonEmptyTraverse([[1]]), O.some([[1]] as const))
    U.deepStrictEqual(nonEmptyTraverse([[1, -1]]), O.none)
    U.deepStrictEqual(nonEmptyTraverse([[1, 2, 3], [4, 5]]), O.some([[1, 2, 3], [4, 5]] as const))
    U.deepStrictEqual(nonEmptyTraverse([[1, 2, 3], [4, -1]]), O.none)
  })

  it("nonEmptySequence", () => {
    const nonEmptySequence = _.nonEmptySequence(NERA.NonEmptyTraversable)(O.NonEmptyApplicative)
    U.deepStrictEqual(nonEmptySequence([O.none]), O.none)
    U.deepStrictEqual(nonEmptySequence([O.some(1)]), O.some([1] as const))
    U.deepStrictEqual(nonEmptySequence([O.none]), O.none)
    U.deepStrictEqual(nonEmptySequence([O.some(1), O.none]), O.none)
    U.deepStrictEqual(nonEmptySequence([O.some(1), O.some(2)]), O.some([1, 2] as const))
  })
})
