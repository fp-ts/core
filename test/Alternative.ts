import * as alternative from "@fp-ts/core/Alternative"
import * as O from "./data/Option"
import * as U from "./util"

describe("Alternative", () => {
  it("firstSuccessOf", () => {
    const firstSuccessOf = alternative.firstSuccessOf(O.Alternative)
    U.deepStrictEqual(firstSuccessOf([]), O.none)
    U.deepStrictEqual(firstSuccessOf([O.none, O.some(2)]), O.some(2))
    U.deepStrictEqual(firstSuccessOf([O.some(1), O.some(2)]), O.some(1))
  })
})
