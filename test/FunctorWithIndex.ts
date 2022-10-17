import * as _ from "@fp-ts/core/FunctorWithIndex"
import { pipe } from "@fp-ts/core/internal/Function"
import * as RA from "./data/ReadonlyArray"
import * as U from "./util"

describe("FunctorWithIndex", () => {
  it("mapWithIndexComposition", () => {
    const mapWithIndex = _.mapWithIndexComposition(RA.FunctorWithIndex, RA.FunctorWithIndex)
    const f = (a: string, [i, j]: readonly [number, number]) => a + i + j
    U.deepStrictEqual(pipe([], mapWithIndex(f)), [])
    U.deepStrictEqual(pipe([[]], mapWithIndex(f)), [[]])
    U.deepStrictEqual(pipe([["a"]], mapWithIndex(f)), [["a00"]])
    U.deepStrictEqual(pipe([["a"], ["b"]], mapWithIndex(f)), [["a00"], ["b10"]])
    U.deepStrictEqual(pipe([["a", "c"], ["b", "d", "e"]], mapWithIndex(f)), [["a00", "c01"], [
      "b10",
      "d11",
      "e12"
    ]])
  })
})
