import { pipe } from "@fp-ts/core/Function"
import * as O from "@fp-ts/core/Option"
import * as RA from "@fp-ts/core/ReadonlyArray"
import * as _ from "@fp-ts/core/typeclass/Traversable"
import * as U from "../util"

describe("Traversable", () => {
  it("traverseComposition", () => {
    const traverse = _.traverseComposition(RA.Traversable, RA.Traversable)(O.Applicative)
    U.deepStrictEqual(
      traverse([[1, 2], [3]], (a) => (a > 0 ? O.some(a) : O.none())),
      O.some([[1, 2], [3]])
    )
    U.deepStrictEqual(
      traverse([[1, -2], [3]], (a) => (a > 0 ? O.some(a) : O.none())),
      O.none()
    )
  })

  it("traverseTap", () => {
    const traverseTap = _.traverseTap(RA.Traversable)(O.Applicative)
    U.deepStrictEqual(
      pipe([], traverseTap(n => n > 0 ? O.some(n) : O.none())),
      O.some([])
    )
    U.deepStrictEqual(
      pipe(["a", "b", "c"], traverseTap(s => s.length > 0 ? O.some(s.length) : O.none())),
      O.some(["a", "b", "c"])
    )
    U.deepStrictEqual(
      pipe(["a", "", "c"], traverseTap(s => s.length > 0 ? O.some(s) : O.none())),
      O.none()
    )
  })
})
