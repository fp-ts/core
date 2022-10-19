import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "@fp-ts/core/typeclass/Applicative"
import * as N from "../test-data/number"
import * as O from "../test-data/Option"
import * as U from "../util"

describe("Applicative", () => {
  it("liftMonoid", () => {
    const liftMonoid = _.liftMonoid(O.Applicative)
    const M = liftMonoid(N.MonoidSum)
    U.deepStrictEqual(pipe(O.none, M.combine(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some(1), M.combine(O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, M.combine(O.some(2))), O.none)
    U.deepStrictEqual(pipe(O.some(1), M.combine(O.some(2))), O.some(3))
  })
})
