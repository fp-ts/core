import * as O from "@fp-ts/core/Option"
import * as RA from "@fp-ts/core/ReadonlyArray"
import * as _ from "@fp-ts/core/typeclass/Of"
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
