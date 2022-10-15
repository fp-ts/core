import { pipe } from "@fp-ts/core/Function"
import * as _ from "@fp-ts/core/Retryable"
import * as O from "./data/Option"
import * as U from "./util"

describe("Retryable", () => {
  it("orElse", () => {
    const orElse = _.orElse(O.Retryable)
    U.deepStrictEqual(pipe(O.none, orElse(O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, orElse(O.some(2))), O.some(2))
    U.deepStrictEqual(pipe(O.some(1), orElse(O.some(2))), O.some(1))
  })
})
