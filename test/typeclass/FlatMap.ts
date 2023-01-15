import { pipe } from "@fp-ts/core/Function"
import * as _ from "@fp-ts/core/typeclass/FlatMap"
import * as O from "../data/Option"
import * as U from "../util"

describe("FlatMap", () => {
  it("flatten", () => {
    const flatten = _.flatten(O.FlatMap)
    U.deepStrictEqual(pipe(O.none, flatten), O.none)
    U.deepStrictEqual(pipe(O.some(O.none), flatten), O.none)
    U.deepStrictEqual(pipe(O.some(O.some(1)), flatten), O.some(1))
  })

  it("andThen", () => {
    const andThen = _.andThen(O.FlatMap)
    U.deepStrictEqual(pipe(O.none, andThen(O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, andThen(O.some(2))), O.none)
    U.deepStrictEqual(pipe(O.some(1), andThen(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some(1), andThen(O.some(2))), O.some(2))
  })

  it("composeKleisliArrow", () => {
    const composeKleisliArrow = _.composeKleisliArrow(O.FlatMap)
    const f = (s: string): O.Option<number> => s.length > 0 ? O.some(s.length) : O.none
    const g = (n: number): O.Option<number> => n > 1 ? O.some(n) : O.none
    const h = pipe(f, composeKleisliArrow(g))
    U.deepStrictEqual(h(""), O.none)
    U.deepStrictEqual(h("a"), O.none)
    U.deepStrictEqual(h("aa"), O.some(2))
  })
})
