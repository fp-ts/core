import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "@fp-ts/core/typeclass/InvariantSemigroupalProduct"
import * as number from "../test-data/number"
import * as O from "../test-data/Option"
import * as U from "../util"

describe("InvariantSemigroupalProduct", () => {
  it("liftAssociative", () => {
    const S = _.liftAssociative(O.InvariantSemigroupalProduct)(number.AssociativeSum)
    U.deepStrictEqual(pipe(O.none, S.combine(O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, S.combine(O.some(2))), O.none)
    U.deepStrictEqual(pipe(O.some(1), S.combine(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some(1), S.combine(O.some(2))), O.some(3))
  })
})
