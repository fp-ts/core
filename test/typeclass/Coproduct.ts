import { pipe } from "@fp-ts/core/Function"
import * as _ from "@fp-ts/core/typeclass/Coproduct"
import * as O from "../data/Option"
import * as U from "../util"

describe("Coproduct", () => {
  it("getMonoid", () => {
    const M = _.getMonoid(O.Alternative)<unknown, never, never, number>()
    U.deepStrictEqual(pipe(O.none, M.combine(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some(1), M.combine(O.none)), O.some(1))
    U.deepStrictEqual(pipe(O.none, M.combine(O.some(2))), O.some(2))
    U.deepStrictEqual(pipe(O.some(1), M.combine(O.some(2))), O.some(1))

    U.deepStrictEqual(pipe(M.empty, M.combine(O.none)), O.none)
    U.deepStrictEqual(pipe(M.empty, M.combine(O.some(2))), O.some(2))
    U.deepStrictEqual(pipe(O.some(1), M.combine(M.empty)), O.some(1))
  })
})
