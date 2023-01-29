import { pipe } from "@fp-ts/core/Function"
import * as O from "@fp-ts/core/Option"
import * as RA from "@fp-ts/core/ReadonlyArray"
import * as _ from "@fp-ts/core/typeclass/Covariant"
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
    U.deepStrictEqual(pipe(1, flap(O.none())), O.none())
    U.deepStrictEqual(pipe(1, flap(O.some(U.double))), O.some(2))
  })

  it("as", () => {
    const as = _.as(O.Covariant)
    U.deepStrictEqual(pipe(O.none(), as(1)), O.none())
    U.deepStrictEqual(pipe(O.some(1), as(2)), O.some(2))
  })

  it("asUnit", () => {
    const asUnit = _.asUnit(O.Covariant)
    U.deepStrictEqual(pipe(O.none(), asUnit), O.none())
    U.deepStrictEqual(pipe(O.some(1), asUnit), O.some(undefined))
  })

  it("let", () => {
    const letOption = _.let(O.Covariant)
    U.deepStrictEqual(
      pipe(O.some({ a: 1, b: 2 }), letOption("c", ({ a, b }) => a + b)),
      O.some({ a: 1, b: 2, c: 3 })
    )
  })

  it("imap", () => {
    const f = _.imap<O.OptionTypeLambda>(O.map)((s: string) => [s], ([s]) => s)
    U.deepStrictEqual(pipe(O.none(), f), O.none())
    U.deepStrictEqual(pipe(O.some("a"), f), O.some(["a"]))
  })
})
