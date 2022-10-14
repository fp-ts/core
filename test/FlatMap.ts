import * as _ from "@fp-ts/core/FlatMap"
import * as O from "./data/Option"
import * as U from "./util"

describe("FlatMap", () => {
  it("zip", () => {
    const zip = _.zip(O.FlatMap)
    U.deepStrictEqual(zip(O.none, O.none), O.none)
    U.deepStrictEqual(zip(O.some(1), O.none), O.none)
    U.deepStrictEqual(zip(O.none, O.some("a")), O.none)
    U.deepStrictEqual(zip(O.some(1), O.some("a")), O.some([1, "a"] as const))
  })
})
