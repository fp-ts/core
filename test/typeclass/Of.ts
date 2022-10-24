import * as _ from "@fp-ts/core/typeclass/Of"
import * as O from "../test-data/Option"
import * as RA from "../test-data/ReadonlyArray"
import * as U from "../util"

describe("Of", () => {
  it("ofComposition", () => {
    const of = _.ofComposition(RA.Of, O.Of)
    U.deepStrictEqual(of(1), [O.some(1)])
  })

  it("unit", () => {
    U.deepStrictEqual(_.unit(O.Pointed), O.some(undefined))
  })
})
