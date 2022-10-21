import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "@fp-ts/core/typeclass/Covariant"
import * as O from "../test-data/Option"
import * as RA from "../test-data/ReadonlyArray"
import * as U from "../util"

describe("Covariant", () => {
  it("mapComposition", () => {
    const map = _.mapComposition(RA.Covariant, RA.Covariant)
    const f = (a: string) => a + "!"
    U.deepStrictEqual(pipe([], map(f)), [])
    U.deepStrictEqual(pipe([[]], map(f)), [[]])
    U.deepStrictEqual(pipe([["a"]], map(f)), [["a!"]])
    U.deepStrictEqual(pipe([["a"], ["b"]], map(f)), [["a!"], ["b!"]])
    U.deepStrictEqual(pipe([["a", "c"], ["b", "d", "e"]], map(f)), [["a!", "c!"], [
      "b!",
      "d!",
      "e!"
    ]])
  })

  it("flap", () => {
    const flap = _.flap(O.Covariant)
    U.deepStrictEqual(pipe(O.none, flap(1)), O.none)
    U.deepStrictEqual(pipe(O.some(U.double), flap(1)), O.some(2))
  })

  it("as", () => {
    const as = _.as(O.Covariant)
    U.deepStrictEqual(pipe(O.none, as(1)), O.none)
    U.deepStrictEqual(pipe(O.some(1), as(2)), O.some(2))
  })

  it("asUnit", () => {
    const asUnit = _.asUnit(O.Covariant)
    U.deepStrictEqual(pipe(O.none, asUnit), O.none)
    U.deepStrictEqual(pipe(O.some(1), asUnit), O.some(undefined))
  })

  it("bindTo", () => {
    const bindTo = _.bindTo(O.Covariant)
    U.deepStrictEqual(pipe(O.none, bindTo("a")), O.none)
    U.deepStrictEqual(pipe(O.some(1), bindTo("a")), O.some({ a: 1 }))
  })

  it("let", () => {
    const letOption = _.let(O.Covariant)
    U.deepStrictEqual(
      pipe(O.some({ a: 1, b: 2 }), letOption("c", ({ a, b }) => a + b)),
      O.some({ a: 1, b: 2, c: 3 })
    )
  })

  it("tupled", () => {
    const tupled = _.tupled(O.Covariant)
    U.deepStrictEqual(pipe(O.none, tupled), O.none)
    U.deepStrictEqual(pipe(O.some(1), tupled), O.some([1] as const))
  })

  it("imap", () => {
    const f = _.imap(O.Covariant)((s: string) => [s] as const, ([s]) => s)
    U.deepStrictEqual(pipe(O.none, f), O.none)
    U.deepStrictEqual(pipe(O.some("a"), f), O.some(["a"] as const))
  })
})
