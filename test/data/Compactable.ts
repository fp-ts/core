import * as _ from "@fp-ts/core/data/Compactable"
import * as RA from "@fp-ts/core/data/ReadonlyArray"
import * as E from "@fp-ts/core/data/Result"
import * as U from "../util"

describe("Compactable", () => {
  it("separate", () => {
    const separate = _.separate(RA.Functor, RA.Compactable)
    U.deepStrictEqual(separate([]), [[], []])
    U.deepStrictEqual(separate([E.fail(123), E.succeed("123")]), [[123], ["123"]])
  })
})
