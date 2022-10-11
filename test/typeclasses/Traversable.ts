import * as RA from "@fp-ts/core/data/ReadonlyArray"
import { pipe } from "@fp-ts/core/Function"
import * as O from "@fp-ts/core/Option"
import * as _ from "@fp-ts/core/typeclasses/Traversable"
import * as U from "../util"

describe("Traversable", () => {
  it("traverse", () => {
    const traverse = _.traverseComposition(RA.Traversable, RA.Traversable)
    U.deepStrictEqual(
      pipe(
        [[1, 2], [3]],
        traverse(O.Applicative)((a) => (a > 0 ? O.some(a) : O.none))
      ),
      O.some([[1, 2], [3]])
    )
    U.deepStrictEqual(
      pipe(
        [[1, -2], [3]],
        traverse(O.Applicative)((a) => (a > 0 ? O.some(a) : O.none))
      ),
      O.none
    )
  })
})
