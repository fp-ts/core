import * as traverse_ from "@fp-ts/core/Traversable"
import { pipe } from "../src/internal/Function"
import * as O from "./data/Option"
import * as RA from "./data/ReadonlyArray"
import * as U from "./util"

describe("Traversable", () => {
  it("traverseComposition", () => {
    const traverse = traverse_.traverseComposition(RA.Traverse, RA.Traverse)(O.ProductWithUnit)
    U.deepStrictEqual(
      pipe(
        [[1, 2], [3]],
        traverse((a) => (a > 0 ? O.some(a) : O.none))
      ),
      O.some([[1, 2], [3]])
    )
    U.deepStrictEqual(
      pipe(
        [[1, -2], [3]],
        traverse((a) => (a > 0 ? O.some(a) : O.none))
      ),
      O.none
    )
  })

  it("sequence", () => {
    const sequence = traverse_.sequence(RA.Traverse)(O.ProductWithUnit)
    U.deepStrictEqual(
      pipe(
        [O.none, O.some(2)],
        sequence
      ),
      O.none
    )
    U.deepStrictEqual(
      pipe(
        [O.some(1), O.some(2)],
        sequence
      ),
      O.some([1, 2])
    )
  })
})
