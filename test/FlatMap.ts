import * as _ from "@fp-ts/core/FlatMap"
import { pipe } from "@fp-ts/core/internal/Function"
import * as O from "./test-data/Option"
import * as U from "./util"

describe("FlatMap", () => {
  it("andThen", () => {
    const andThen = _.andThen(O.FlatMap)
    U.deepStrictEqual(pipe(O.none, andThen(O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, andThen(O.some(2))), O.none)
    U.deepStrictEqual(pipe(O.some(1), andThen(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some(1), andThen(O.some(2))), O.some(2))
  })
})
