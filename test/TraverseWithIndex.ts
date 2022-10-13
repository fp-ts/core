import * as traverseWithIndex_ from "@fp-ts/core/TraverseWithIndex"
import { pipe } from "../src/Function"
import * as O from "./data/Option"
import * as RA from "./data/ReadonlyArray"
import * as U from "./util"

describe("TraverseWithIndex", () => {
  it("traverseWithIndexComposition", () => {
    const traverseWithIndex = traverseWithIndex_.traverseWithIndexComposition(
      RA.TraverseWithIndex,
      RA.TraverseWithIndex
    )(O.Applicative)
    U.deepStrictEqual(
      pipe(
        [["a"], ["bb"]],
        traverseWithIndex((s, [i, j]) => (s.length >= 1 ? O.some(s + i + j) : O.none))
      ),
      O.some([["a00"], ["bb10"]])
    )
    U.deepStrictEqual(
      pipe(
        [["a"], ["bb"]],
        traverseWithIndex((s, [i, j]) => (s.length > 1 ? O.some(s + i + j) : O.none))
      ),
      O.none
    )
  })
})