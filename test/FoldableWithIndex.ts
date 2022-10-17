import * as foldableWithIndex from "@fp-ts/core/FoldableWithIndex"
import { pipe } from "@fp-ts/core/internal/Function"
import * as number from "./data/number"
import * as O from "./data/Option"
import * as RA from "./data/ReadonlyArray"
import * as U from "./util"

describe("Foldable", () => {
  it("toReadonlyArrayWith", () => {
    const toReadonlyArrayWith = foldableWithIndex.toReadonlyArrayWith(O.FoldableWithIndex)
    U.deepStrictEqual(toReadonlyArrayWith(O.none, U.double), [])
    U.deepStrictEqual(toReadonlyArrayWith(O.some(2), U.double), [4])
    U.deepStrictEqual(toReadonlyArrayWith(O.some(2), (a, i) => U.double(a) + i), [4])
  })

  it("foldMapWithIndex", () => {
    const foldMapWithIndex = foldableWithIndex.foldMapWithIndex(RA.FoldableWithIndex)
    U.deepStrictEqual(
      pipe([1, 2, 3], foldMapWithIndex(number.MonoidSum)((n, i) => (n * 2) + i)),
      15
    )
  })
})
