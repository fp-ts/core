import * as E from "@fp-ts/core/Either"
import { pipe } from "@fp-ts/core/Function"
import * as O from "@fp-ts/core/Option"
import * as RA from "@fp-ts/core/ReadonlyArray"
import * as _ from "@fp-ts/core/typeclass/Compactable"
import * as U from "../util"

describe("Compactable", () => {
  it("compactComposition", () => {
    const compact = _.compactComposition(RA.Covariant, O.Compactable)
    U.deepStrictEqual(pipe([], compact), [])
    U.deepStrictEqual(pipe([O.none()], compact), [O.none()])
    U.deepStrictEqual(pipe([O.some(O.none())], compact), [O.none()])
    U.deepStrictEqual(pipe([O.some(O.some(1))], compact), [O.some(1)])
  })

  it("separate", () => {
    const separate = _.separate({ ...RA.Covariant, ...RA.Compactable })
    U.deepStrictEqual(pipe([], separate), [[], []])
    U.deepStrictEqual(pipe([E.right(1), E.left("e"), E.right(2)], separate), [
      ["e"],
      [1, 2]
    ])
  })
})
