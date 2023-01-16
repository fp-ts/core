import { pipe } from "@fp-ts/core/Function"
import * as O from "@fp-ts/core/Option"
import * as RA from "@fp-ts/core/ReadonlyArray"
import * as _ from "@fp-ts/core/test/limbo/TraversableWithIndex"
import * as U from "../util"

const TraversableWithIndex: _.TraversableWithIndex<RA.ReadonlyArrayTypeLambda, number> = {
  traverseWithIndex: RA.traverseWithIndex
}

describe("TraversableWithIndex", () => {
  it("traverseWithIndexComposition", () => {
    const traverseWithIndex = _.traverseWithIndexComposition(
      TraversableWithIndex,
      TraversableWithIndex
    )(O.Applicative)
    U.deepStrictEqual(
      pipe(
        [["a"], ["bb"]],
        traverseWithIndex((s, [i, j]) => (s.length >= 1 ? O.some(s + i + j) : O.none()))
      ),
      O.some([["a00"], ["bb10"]])
    )
    U.deepStrictEqual(
      pipe(
        [["a"], ["bb"]],
        traverseWithIndex((s, [i, j]) => (s.length > 1 ? O.some(s + i + j) : O.none()))
      ),
      O.none()
    )
  })

  it("traverse", () => {
    const traverse = _.traverse(TraversableWithIndex)(O.Applicative)
    const f = (n: number) => n > 0 ? O.some(n) : O.none()
    U.deepStrictEqual(pipe([], traverse(f)), O.some([]))
    U.deepStrictEqual(pipe([1, 2, 3], traverse(f)), O.some([1, 2, 3]))
    U.deepStrictEqual(pipe([1, -2, 3], traverse(f)), O.none())
  })
})
