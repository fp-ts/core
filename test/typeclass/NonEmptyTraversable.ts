import * as O from "@fp-ts/core/Option"
import * as RA from "@fp-ts/core/ReadonlyArray"
import * as _ from "@fp-ts/core/typeclass/NonEmptyTraversable"
import * as U from "../util"

describe("NonEmptyTraversable", () => {
  it("traverseNonEmptyComposition", () => {
    const traverseNonEmpty = _.traverseNonEmptyComposition(
      RA.NonEmptyTraversable,
      RA.NonEmptyTraversable
    )(O.SemiApplicative)((n: number) => (n > 0 ? O.some(n) : O.none()))
    U.deepStrictEqual(traverseNonEmpty([[1]]), O.some([[1]] as const))
    U.deepStrictEqual(traverseNonEmpty([[1, -1]]), O.none())
    U.deepStrictEqual(traverseNonEmpty([[1, 2, 3], [4, 5]]), O.some([[1, 2, 3], [4, 5]] as const))
    U.deepStrictEqual(traverseNonEmpty([[1, 2, 3], [4, -1]]), O.none())
  })

  it("traverseNonEmptyComposition", () => {
    const sequence = _.sequenceNonEmptyComposition(
      { ...RA.NonEmptyTraversable, ...RA.NonEmptyCovariant },
      RA.NonEmptyTraversable
    )(O.SemiApplicative)
    U.deepStrictEqual(sequence([[O.some(1)]]), O.some([[1]] as const))
    U.deepStrictEqual(sequence([[O.some(1), O.none()]]), O.none())
    U.deepStrictEqual(
      sequence([[O.some(1), O.some(2), O.some(3)], [O.some(4), O.some(5)]]),
      O.some([[1, 2, 3], [4, 5]] as const)
    )
    U.deepStrictEqual(
      sequence([[O.some(1), O.some(2), O.some(3)], [O.some(4), O.none()]]),
      O.none()
    )
  })

  it("sequenceNonEmpty", () => {
    const sequenceNonEmpty = _.sequenceNonEmpty<RA.NonEmptyReadonlyArrayTypeLambda>(
      RA.NonEmptyTraversable.traverseNonEmpty
    )(O.SemiApplicative)
    U.deepStrictEqual(sequenceNonEmpty([O.none()]), O.none())
    U.deepStrictEqual(sequenceNonEmpty([O.some(1)]), O.some([1] as const))
    U.deepStrictEqual(sequenceNonEmpty([O.none()]), O.none())
    U.deepStrictEqual(sequenceNonEmpty([O.some(1), O.none()]), O.none())
    U.deepStrictEqual(sequenceNonEmpty([O.some(1), O.some(2)]), O.some([1, 2] as const))
  })
})
