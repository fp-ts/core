import { pipe } from "@fp-ts/core/internal/Function"
import * as RA from "../data/Array"
import * as number from "../data/number"
import * as O from "../data/Option"
import * as foldableWithIndex from "../limbo/FoldableWithIndex"
import * as U from "../util"

describe("FoldableWithIndex", () => {
  it("reduceWithIndexComposition", () => {
    const reduceWithIndex = foldableWithIndex.reduceWithIndexComposition(
      RA.FoldableWithIndex,
      RA.FoldableWithIndex
    )
    const f = (b: string, a: string, [i, j]: [number, number]) => b + a + i + j
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
    const f = (b: string, a: string, [i, j]: [number, number]) => b + a + i + j
    U.deepStrictEqual(pipe([], reduceRightWithIndex("-", f)), "-")
    U.deepStrictEqual(pipe([[]], reduceRightWithIndex("-", f)), "-")
    U.deepStrictEqual(
      pipe([["a", "c"], ["b", "d"]], reduceRightWithIndex("-", f)),
      "-d11b10c01a00"
    )
  })

  it("toArray", () => {
    const toArray = foldableWithIndex.toArray(O.FoldableWithIndex)
    U.deepStrictEqual(toArray(O.none), [])
    U.deepStrictEqual(toArray(O.some(2)), [2])
  })

  it("toArrayWith", () => {
    const toArrayWith = foldableWithIndex.toArrayWith(O.FoldableWithIndex)
    U.deepStrictEqual(pipe(O.none, toArrayWith(U.double)), [])
    U.deepStrictEqual(pipe(O.some(2), toArrayWith(U.double)), [4])
    U.deepStrictEqual(pipe(O.some(2), toArrayWith((a, i) => U.double(a) * i)), [0])
  })

  it("foldMapWithIndex", () => {
    const foldMapWithIndex = foldableWithIndex.foldMapWithIndex(RA.FoldableWithIndex)
    U.deepStrictEqual(
      pipe([1, 2, 3], foldMapWithIndex(number.MonoidSum)((n, i) => (n * 2) + i)),
      15
    )
  })
})
