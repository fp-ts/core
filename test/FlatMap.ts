import * as _ from "@fp-ts/core/FlatMap"
import { pipe } from "@fp-ts/core/internal/Function"
import * as O from "./data/Option"
import * as U from "./util"

describe("FlatMap", () => {
  it("zipLeft", () => {
    const zipLeft = _.zipLeft(O.FlatMap)
    U.deepStrictEqual(pipe(O.none, zipLeft(O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, zipLeft(O.some(2))), O.none)
    U.deepStrictEqual(pipe(O.some(1), zipLeft(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some(1), zipLeft(O.some(2))), O.some(1))
  })

  it("zipRight", () => {
    const zipRight = _.zipRight(O.FlatMap)
    U.deepStrictEqual(pipe(O.none, zipRight(O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, zipRight(O.some(2))), O.none)
    U.deepStrictEqual(pipe(O.some(1), zipRight(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some(1), zipRight(O.some(2))), O.some(2))
  })

  it("bind", () => {
    const bind = _.bind(O.FlatMap)
    U.deepStrictEqual(pipe(O.Do, bind("a", () => O.none)), O.none)
    U.deepStrictEqual(pipe(O.Do, bind("a", () => O.some(1))), O.some({ a: 1 }))
  })

  it("tap", () => {
    const tap = _.tap(O.FlatMap)
    U.deepStrictEqual(pipe(O.none, tap(() => O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, tap(() => O.some(2))), O.none)
    U.deepStrictEqual(pipe(O.some(1), tap(() => O.none)), O.none)
    U.deepStrictEqual(pipe(O.some(1), tap(() => O.some(2))), O.some(1))
  })
})
