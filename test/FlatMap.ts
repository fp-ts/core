import * as _ from "@fp-ts/core/FlatMap"
import { pipe } from "@fp-ts/core/internal/Function"
import * as O from "./data/Option"
import * as U from "./util"

describe("FlatMap", () => {
  it("zipRight", () => {
    const zipRight = _.zipRight(O.FlatMap)
    U.deepStrictEqual(pipe(O.none, zipRight(O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, zipRight(O.some(2))), O.none)
    U.deepStrictEqual(pipe(O.some(1), zipRight(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some(1), zipRight(O.some(2))), O.some(2))
  })
})
