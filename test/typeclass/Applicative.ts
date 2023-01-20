import * as N from "@fp-ts/core/Number"
import * as O from "@fp-ts/core/Option"
import * as _ from "@fp-ts/core/typeclass/Applicative"
import * as U from "../util"

describe("Applicative", () => {
  it("liftMonoid", () => {
    const liftMonoid = _.liftMonoid(O.Applicative)
    const M = liftMonoid(N.MonoidSum)
    U.deepStrictEqual(M.combine(O.none(), O.none()), O.none())
    U.deepStrictEqual(M.combine(O.some(1), O.none()), O.none())
    U.deepStrictEqual(M.combine(O.none(), O.some(2)), O.none())
    U.deepStrictEqual(M.combine(O.some(1), O.some(2)), O.some(3))
  })
})
