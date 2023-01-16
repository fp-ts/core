import { pipe } from "@fp-ts/core/Function"
import * as N from "@fp-ts/core/Number"
import * as O from "@fp-ts/core/Option"
import * as _ from "@fp-ts/core/typeclass/Applicative"
import * as U from "../util"

describe("Applicative", () => {
  it("liftMonoid", () => {
    const liftMonoid = _.liftMonoid(O.Applicative)
    const M = liftMonoid(N.MonoidSum)
    U.deepStrictEqual(pipe(O.none(), M.combine(O.none())), O.none())
    U.deepStrictEqual(pipe(O.some(1), M.combine(O.none())), O.none())
    U.deepStrictEqual(pipe(O.none(), M.combine(O.some(2))), O.none())
    U.deepStrictEqual(pipe(O.some(1), M.combine(O.some(2))), O.some(3))
  })
})
