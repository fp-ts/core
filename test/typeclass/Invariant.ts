import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "@fp-ts/core/typeclass/Invariant"
import * as O from "../test-data/Option"
import * as P from "../test-data/Predicate"
import * as U from "../util"

describe("Invariant", () => {
  describe("bindTo", () => {
    it("Covariant (Option)", () => {
      const bindTo = _.bindTo(O.Invariant)
      U.deepStrictEqual(pipe(O.none, bindTo("a")), O.none)
      U.deepStrictEqual(pipe(O.some(1), bindTo("a")), O.some({ a: 1 }))
    })

    it("Contravariant (Predicate)", () => {
      const bindTo = _.bindTo(P.Invariant)
      const p = pipe(P.isString, bindTo("a"))
      U.deepStrictEqual(p({ a: "a" }), true)
      U.deepStrictEqual(p({ a: 1 }), false)
    })
  })

  describe("tupled", () => {
    it("Covariant (Option)", () => {
      const tupled = _.tupled(O.Invariant)
      U.deepStrictEqual(pipe(O.none, tupled), O.none)
      U.deepStrictEqual(pipe(O.some(1), tupled), O.some([1] as const))
    })

    it("Contravariant (Predicate)", () => {
      const tupled = _.tupled(P.Invariant)
      const p = pipe(P.isString, tupled)
      U.deepStrictEqual(p(["a"]), true)
      U.deepStrictEqual(p([1]), false)
    })
  })
})
