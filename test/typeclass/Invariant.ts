import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "@fp-ts/core/typeclass/Invariant"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"
import * as O from "../test-data/Option"
import * as P from "../test-data/Predicate"
import * as string from "../test-data/string"
import * as U from "../util"

describe("Invariant", () => {
  it("imapComposition", () => {
    const imap = _.imapComposition(semigroup.Invariant, O.Invariant)
    const S = pipe(O.getMonoid(string.Semigroup), imap(s => [s] as const, ([s]) => s))
    U.deepStrictEqual(pipe(O.none, S.combine(O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, S.combine(O.some(["b"]))), O.some(["b"] as const))
    U.deepStrictEqual(pipe(O.some(["a"] as const), S.combine(O.none)), O.some(["a"] as const))
    U.deepStrictEqual(
      pipe(O.some(["a"] as const), S.combine(O.some(["b"]))),
      O.some(["ab"] as const)
    )
  })

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
