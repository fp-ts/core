import * as _ from "@fp-ts/core/typeclass/Of"
import * as O from "../test-data/Option"
import * as U from "../util"

describe("Of", () => {
  it("unit", () => {
    U.deepStrictEqual(_.unit(O.Pointed), O.some([] as const))
  })
})
