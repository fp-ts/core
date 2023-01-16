import { pipe } from "@fp-ts/core/Function"
import * as N from "@fp-ts/core/Number"
import * as O from "@fp-ts/core/Option"
import * as RA from "@fp-ts/core/ReadonlyArray"
import * as _ from "../limbo/FoldableWithIndex"
import * as U from "../util"

const FoldableWithIndex: _.FoldableWithIndex<RA.ReadonlyArrayTypeLambda, number> = {
  reduceWithIndex: RA.reduceWithIndex,
  reduceRightWithIndex: RA.reduceRightWithIndex
}

const FoldableWithIndexO: _.FoldableWithIndex<O.OptionTypeLambda, number> = {
  reduceWithIndex: (b, f) => (self) => O.isNone(self) ? b : f(b, self.value, 0),
  reduceRightWithIndex: (b, f) => (self) => O.isNone(self) ? b : f(b, self.value, 0)
}

describe("FoldableWithIndex", () => {
  it("reduceWithIndexComposition", () => {
    const reduceWithIndex = _.reduceWithIndexComposition(
      FoldableWithIndex,
      FoldableWithIndex
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
    const reduceRightWithIndex = _.reduceRightWithIndexComposition(
      FoldableWithIndex,
      FoldableWithIndex
    )
    const f = (b: string, a: string, [i, j]: readonly [number, number]) => b + a + i + j
    U.deepStrictEqual(pipe([], reduceRightWithIndex("-", f)), "-")
    U.deepStrictEqual(pipe([[]], reduceRightWithIndex("-", f)), "-")
    U.deepStrictEqual(
      pipe([["a", "c"], ["b", "d"]], reduceRightWithIndex("-", f)),
      "-d11b10c01a00"
    )
  })

  it("toArray", () => {
    const toReadonlyArray = _.toArray(FoldableWithIndexO)
    U.deepStrictEqual(toReadonlyArray(O.none()), [])
    U.deepStrictEqual(toReadonlyArray(O.some(2)), [2])
  })

  it("toArrayWith", () => {
    const toReadonlyArrayWith = _.toArrayWith(FoldableWithIndexO)
    U.deepStrictEqual(pipe(O.none(), toReadonlyArrayWith(U.double)), [])
    U.deepStrictEqual(pipe(O.some(2), toReadonlyArrayWith(U.double)), [4])
    U.deepStrictEqual(pipe(O.some(2), toReadonlyArrayWith((a, i) => U.double(a) * i)), [0])
  })

  it("foldMapWithIndex", () => {
    const foldMapWithIndex = _.foldMapWithIndex(FoldableWithIndex)
    U.deepStrictEqual(
      pipe([1, 2, 3], foldMapWithIndex(N.MonoidSum)((n, i) => (n * 2) + i)),
      15
    )
  })
})
