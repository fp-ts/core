import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "@fp-ts/core/typeclass/NonEmptyProduct"
import * as O from "../test-data/Option"
import * as predicate from "../test-data/Predicate"
import * as U from "../util"

describe("NonEmptyProduct", () => {
  describe("bindRight", () => {
    it("Covariant (Option)", () => {
      const bindRight = _.bindRight(O.Applicative)
      U.deepStrictEqual(pipe(O.some({ a: 1 }), bindRight("b", O.none)), O.none)
      U.deepStrictEqual(pipe(O.some({ a: 1 }), bindRight("b", O.some(2))), O.some({ a: 1, b: 2 }))
    })

    it("Contravariant (Predicate)", () => {
      const p = pipe(
        predicate.Do,
        predicate.bindRight("x", predicate.isString),
        predicate.bindRight("y", predicate.isNumber)
      )
      U.deepStrictEqual(p({ x: "a", y: 1 }), true)
      U.deepStrictEqual(p({ x: "a", y: "x" }), false)
    })
  })
})
