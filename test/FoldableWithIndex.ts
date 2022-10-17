import * as foldableWithIndex from "@fp-ts/core/FoldableWithIndex"
import { pipe } from "@fp-ts/core/internal/Function"
import * as number from "./data/number"
import * as O from "./data/Option"
import * as RA from "./data/ReadonlyArray"
import * as U from "./util"

describe("Foldable", () => {
  it("toReadonlyArray", () => {
    const toReadonlyArray = foldableWithIndex.toReadonlyArray(O.FoldableWithIndex)
    U.deepStrictEqual(toReadonlyArray(O.none), [])
    U.deepStrictEqual(toReadonlyArray(O.some(2)), [2])
  })

  it("toReadonlyArrayWith", () => {
    const toReadonlyArrayWith = foldableWithIndex.toReadonlyArrayWith(O.FoldableWithIndex)
    U.deepStrictEqual(pipe(O.none, toReadonlyArrayWith(U.double)), [])
    U.deepStrictEqual(pipe(O.some(2), toReadonlyArrayWith(U.double)), [4])
    U.deepStrictEqual(pipe(O.some(2), toReadonlyArrayWith((a, i) => U.double(a) * i)), [0])
  })

  it("foldMapWithIndex", () => {
    const foldMapWithIndex = foldableWithIndex.foldMapWithIndex(RA.FoldableWithIndex)
    U.deepStrictEqual(
      pipe([1, 2, 3], foldMapWithIndex(number.MonoidSum)((n, i) => (n * 2) + i)),
      15
    )
  })
})
