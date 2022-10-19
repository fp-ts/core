import { pipe } from "@fp-ts/core/internal/Function"
import * as foldableWithIndex from "@fp-ts/core/typeclass/FoldableWithIndex"
import * as number from "../test-data/number"
import * as O from "../test-data/Option"
import * as RA from "../test-data/ReadonlyArray"
import * as U from "../util"

describe("FoldableWithIndex", () => {
  it("reduceWithIndexComposition", () => {
    const reduceWithIndex = foldableWithIndex.reduceWithIndexComposition(
      RA.FoldableWithIndex,
      RA.FoldableWithIndex
    )
    const f = (b: string, a: string, [i, j]: readonly [number, number]) => b + a + i + j
    U.deepStrictEqual(pipe([], reduceWithIndex("-", f)), "-")
    U.deepStrictEqual(pipe([[]], reduceWithIndex("-", f)), "-")
    U.deepStrictEqual(
      pipe([["a", "c"], ["b", "d"]], reduceWithIndex("-", f)),
      "-a00c01b10d11"
    )
  })

  it("reduceRightWithIndexComposition", () => {
    const reduceRightWithIndex = foldableWithIndex.reduceRightWithIndexComposition(
      RA.FoldableWithIndex,
      RA.FoldableWithIndex
    )
    const f = (b: string, a: string, [i, j]: readonly [number, number]) => b + a + i + j
    U.deepStrictEqual(pipe([], reduceRightWithIndex("-", f)), "-")
    U.deepStrictEqual(pipe([[]], reduceRightWithIndex("-", f)), "-")
    U.deepStrictEqual(
      pipe([["a", "c"], ["b", "d"]], reduceRightWithIndex("-", f)),
      "-d11b10c01a00"
    )
  })

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
