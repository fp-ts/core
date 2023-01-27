import { pipe } from "@fp-ts/core/Function"
import * as O from "@fp-ts/core/Option"
import * as P from "@fp-ts/core/Predicate"
import * as String from "@fp-ts/core/String"
import * as _ from "@fp-ts/core/typeclass/Invariant"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"
import * as U from "../util"

describe("Invariant", () => {
  it("imapComposition", () => {
    const imap = _.imapComposition(semigroup.Invariant, O.Invariant)
    const S = pipe(O.getOptionalMonoid(String.Semigroup), imap(s => [s], ([s]) => s))
    U.deepStrictEqual(S.combine(O.none(), O.none()), O.none())
    U.deepStrictEqual(S.combine(O.none(), O.some(["b"])), O.some(["b"]))
    U.deepStrictEqual(S.combine(O.some(["a"]), O.none()), O.some(["a"]))
    U.deepStrictEqual(
      S.combine(O.some(["a"]), O.some(["b"])),
      O.some(["ab"])
    )
  })

  describe("bindTo", () => {
    it("Covariant (Option)", () => {
      const bindTo = _.bindTo(O.Invariant)
      U.deepStrictEqual(pipe(O.none(), bindTo("a")), O.none())
      U.deepStrictEqual(pipe(O.some(1), bindTo("a")), O.some({ a: 1 }))
    })

    it("Contravariant (Predicate)", () => {
      const bindTo = _.bindTo(P.Invariant)
      const p = pipe(String.isString, bindTo("a"))
      U.deepStrictEqual(p({ a: "a" }), true)
      U.deepStrictEqual(p({ a: 1 }), false)
    })
  })

  describe("tupled", () => {
    it("Covariant (Option)", () => {
      const tupled = _.tupled(O.Invariant)
      U.deepStrictEqual(pipe(O.none(), tupled), O.none())
      U.deepStrictEqual(pipe(O.some(1), tupled), O.some([1]))
    })

    it("Contravariant (Predicate)", () => {
      const tupled = _.tupled(P.Invariant)
      const p = pipe(String.isString, tupled)
      U.deepStrictEqual(p(["a"]), true)
      U.deepStrictEqual(p([1]), false)
    })
  })
})
