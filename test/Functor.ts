import * as _ from "@fp-ts/core/Functor"
import { pipe } from "@fp-ts/core/internal/Function"
import * as O from "./data/Option"
import * as RA from "./data/ReadonlyArray"
import * as U from "./util"

describe("Functor", () => {
  it("mapWithIndexComposition", () => {
    const map = _.mapComposition(RA.Functor, RA.Functor)
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
    const flap = _.flap(O.Functor)
    U.deepStrictEqual(pipe(O.none, flap(1)), O.none)
    U.deepStrictEqual(pipe(O.some(U.double), flap(1)), O.some(2))
  })

  it("as", () => {
    const as = _.as(O.Functor)
    U.deepStrictEqual(pipe(O.none, as(1)), O.none)
    U.deepStrictEqual(pipe(O.some(1), as(2)), O.some(2))
  })

  it("as", () => {
    const unit = _.unit(O.Functor)
    U.deepStrictEqual(pipe(O.none, unit), O.none)
    U.deepStrictEqual(pipe(O.some(1), unit), O.some(undefined))
  })

  it("bindTo", () => {
    const bindTo = _.bindTo(O.Functor)
    U.deepStrictEqual(pipe(O.none, bindTo("a")), O.none)
    U.deepStrictEqual(pipe(O.some(1), bindTo("a")), O.some({ a: 1 }))
  })

  it("let", () => {
    const letOption = _.let(O.Functor)
    U.deepStrictEqual(
      pipe(O.some({ a: 1, b: 2 }), letOption("c", ({ a, b }) => a + b)),
      O.some({ a: 1, b: 2, c: 3 })
    )
  })

  it("tupled", () => {
    const tupled = _.tupled(O.Functor)
    U.deepStrictEqual(pipe(O.none, tupled), O.none)
    U.deepStrictEqual(pipe(O.some(1), tupled), O.some([1] as const))
  })
})
