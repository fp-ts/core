import * as _ from "@fp-ts/core/Chainable"
import { pipe } from "@fp-ts/core/internal/Function"
import * as O from "./test-data/Option"
import * as U from "./util"

describe("Chainable", () => {
  it("andThenDiscard", () => {
    const andThenDiscard = _.andThenDiscard(O.Chainable)
    U.deepStrictEqual(pipe(O.none, andThenDiscard(O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, andThenDiscard(O.some(2))), O.none)
    U.deepStrictEqual(pipe(O.some(1), andThenDiscard(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some(1), andThenDiscard(O.some(2))), O.some(1))
  })

  it("bind", () => {
    const bind = _.bind(O.Chainable)
    U.deepStrictEqual(pipe(O.Do, bind("a", () => O.none)), O.none)
    U.deepStrictEqual(pipe(O.Do, bind("a", () => O.some(1))), O.some({ a: 1 }))
  })

  it("tap", () => {
    const tap = _.tap(O.Chainable)
    U.deepStrictEqual(pipe(O.none, tap(() => O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, tap(() => O.some(2))), O.none)
    U.deepStrictEqual(pipe(O.some(1), tap(() => O.none)), O.none)
    U.deepStrictEqual(pipe(O.some(1), tap(() => O.some(2))), O.some(1))
  })
})
