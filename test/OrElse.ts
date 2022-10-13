import * as orElse_ from "@fp-ts/core/OrElse"
import * as O from "./data/Option"
import * as U from "./util"

describe("OrElse", () => {
  it("firstSuccessOf", () => {
    const firstSuccessOf = orElse_.firstSuccessOf(O.OrElse)
    U.deepStrictEqual(firstSuccessOf(O.some(1))([O.some(2)]), O.some(1))
    U.deepStrictEqual(firstSuccessOf(O.none)([O.some(1)]), O.some(1))
    U.deepStrictEqual(firstSuccessOf(O.none)([O.none, O.some(2), O.none]), O.some(2))
  })
})
