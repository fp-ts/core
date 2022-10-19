import * as either from "@fp-ts/core/internal/Either"
import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "@fp-ts/core/typeclass/Compactable"
import * as O from "../test-data/Option"
import * as RA from "../test-data/ReadonlyArray"
import * as U from "../util"

describe("Compactable", () => {
  it("compactComposition", () => {
    const compact = _.compactComposition(RA.Covariant, O.Compactable)
    U.deepStrictEqual(pipe([], compact), [])
    U.deepStrictEqual(pipe([O.none], compact), [O.none])
    U.deepStrictEqual(pipe([O.some(O.none)], compact), [O.none])
    U.deepStrictEqual(pipe([O.some(O.some(1))], compact), [O.some(1)])
  })

  it("separate", () => {
    const separate = _.separate({ ...RA.Covariant, ...RA.Compactable })
    U.deepStrictEqual(pipe([], separate), [[], []])
    U.deepStrictEqual(pipe([either.right(1), either.left("e"), either.right(2)], separate), [
      ["e"],
      [1, 2]
    ])
  })
})
