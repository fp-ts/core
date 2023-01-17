import { identity, pipe } from "@fp-ts/core/Function"
import * as O from "@fp-ts/core/Option"
import * as RA from "@fp-ts/core/ReadonlyArray"
import * as _ from "@fp-ts/core/test/limbo/NonEmptyTraversable"
import * as U from "../util"

const NonEmptyTraversable: _.NonEmptyTraversable<RA.NonEmptyReadonlyArrayTypeLambda> = {
  // @ts-expect-error
  traverseNonEmpty: RA.traverseNonEmpty,
  // @ts-expect-error
  sequenceNonEmpty: F => self => pipe(self, RA.traverseNonEmpty(F)(identity))
}

describe("NonEmptyTraversable", () => {
  it("traverseNonEmptyComposition", () => {
    const traverseNonEmpty = _.traverseNonEmptyComposition(
      NonEmptyTraversable,
      NonEmptyTraversable
    )(O.SemiApplicative)((n: number) => (n > 0 ? O.some(n) : O.none()))
    U.deepStrictEqual(traverseNonEmpty([[1]]), O.some([[1]] as const))
    U.deepStrictEqual(traverseNonEmpty([[1, -1]]), O.none())
    U.deepStrictEqual(traverseNonEmpty([[1, 2, 3], [4, 5]]), O.some([[1, 2, 3], [4, 5]] as const))
    U.deepStrictEqual(traverseNonEmpty([[1, 2, 3], [4, -1]]), O.none())
  })

  it("traverseNonEmptyComposition", () => {
    const sequence = _.sequenceNonEmptyComposition(
      { ...NonEmptyTraversable, ...RA.NonEmptyCovariant },
      NonEmptyTraversable
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
      NonEmptyTraversable.traverseNonEmpty
    )(O.SemiApplicative)
    U.deepStrictEqual(sequenceNonEmpty([O.none()]), O.none())
    U.deepStrictEqual(sequenceNonEmpty([O.some(1)]), O.some([1] as const))
    U.deepStrictEqual(sequenceNonEmpty([O.none()]), O.none())
    U.deepStrictEqual(sequenceNonEmpty([O.some(1), O.none()]), O.none())
    U.deepStrictEqual(sequenceNonEmpty([O.some(1), O.some(2)]), O.some([1, 2] as const))
  })
})
