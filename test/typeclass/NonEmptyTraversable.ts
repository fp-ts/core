import * as _ from "@fp-ts/core/typeclass/NonEmptyTraversable"
import * as NERA from "../data/NonEmptyReadonlyArray"
import * as O from "../data/Option"
import * as U from "../util"

describe("NonEmptyTraversable", () => {
  it("traverseNonEmptyComposition", () => {
    const traverseNonEmpty = _.traverseNonEmptyComposition(
      NERA.NonEmptyTraversable,
      NERA.NonEmptyTraversable
    )(O.SemiApplicative)((n: number) => (n > 0 ? O.some(n) : O.none))
    U.deepStrictEqual(traverseNonEmpty([[1]]), O.some([[1]] as const))
    U.deepStrictEqual(traverseNonEmpty([[1, -1]]), O.none)
    U.deepStrictEqual(traverseNonEmpty([[1, 2, 3], [4, 5]]), O.some([[1, 2, 3], [4, 5]] as const))
    U.deepStrictEqual(traverseNonEmpty([[1, 2, 3], [4, -1]]), O.none)
  })

  it("traverseNonEmptyComposition", () => {
    const sequence = _.sequenceNonEmptyComposition(
      { ...NERA.NonEmptyTraversable, ...NERA.Covariant },
      NERA.NonEmptyTraversable
    )(O.SemiApplicative)
    U.deepStrictEqual(sequence([[O.some(1)]]), O.some([[1]] as const))
    U.deepStrictEqual(sequence([[O.some(1), O.none]]), O.none)
    U.deepStrictEqual(
      sequence([[O.some(1), O.some(2), O.some(3)], [O.some(4), O.some(5)]]),
      O.some([[1, 2, 3], [4, 5]] as const)
    )
    U.deepStrictEqual(sequence([[O.some(1), O.some(2), O.some(3)], [O.some(4), O.none]]), O.none)
  })

  it("sequenceNonEmpty", () => {
    const sequenceNonEmpty = _.sequenceNonEmpty<NERA.NonEmptyReadonlyArrayTypeLambda>(
      NERA.NonEmptyTraversable.traverseNonEmpty
    )(O.SemiApplicative)
    U.deepStrictEqual(sequenceNonEmpty([O.none]), O.none)
    U.deepStrictEqual(sequenceNonEmpty([O.some(1)]), O.some([1] as const))
    U.deepStrictEqual(sequenceNonEmpty([O.none]), O.none)
    U.deepStrictEqual(sequenceNonEmpty([O.some(1), O.none]), O.none)
    U.deepStrictEqual(sequenceNonEmpty([O.some(1), O.some(2)]), O.some([1, 2] as const))
  })
})
