import * as _ from "@fp-ts/core/typeclass/NonEmptyProduct"
import * as O from "../test-data/Option"
import * as U from "../util"

describe("NonEmptyProduct", () => {
  it("zip3", () => {
    const zip3 = _.zip3(O.NonEmptyProduct)
    U.deepStrictEqual(zip3(O.some("a"), O.some(1), O.some(true)), O.some(["a", 1, true] as const))
    U.deepStrictEqual(zip3(O.some("a"), O.none, O.some(true)), O.none)
  })
})
