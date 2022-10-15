import * as foldable from "@fp-ts/core/Foldable"
import { pipe } from "@fp-ts/core/internal/Function"
import * as monoidTests from "./data/number"
import * as RA from "./data/ReadonlyArray"
import * as U from "./util"

describe("Foldable", () => {
  it("foldMap", () => {
    const foldMap = foldable.foldMap(RA.FoldableReadonlyArray)
    U.deepStrictEqual(pipe([1, 2, 3], foldMap(monoidTests.MonoidSum)(U.double)), 12)
  })
})
