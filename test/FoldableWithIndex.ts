import * as foldableWithIndex from "@fp-ts/core/FoldableWithIndex"
import { pipe } from "@fp-ts/core/internal/Function"
import * as monoidTests from "./data/number"
import * as RA from "./data/ReadonlyArray"
import * as U from "./util"

describe("Foldable", () => {
  it("foldMapWithIndex", () => {
    const foldMapWithIndex = foldableWithIndex.foldMapWithIndex(RA.FoldableWithIndexReadonlyArray)
    U.deepStrictEqual(
      pipe([1, 2, 3], foldMapWithIndex(monoidTests.MonoidSum)((n, i) => (n * 2) + i)),
      15
    )
  })
})
