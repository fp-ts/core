import * as _ from "@fp-ts/core/Bindable"
import { pipe } from "@fp-ts/core/internal/Function"
import * as O from "./data/Option"
import * as U from "./util"

describe("Bindable", () => {
  it("andThenDiscard", () => {
    const andThenDiscard = _.andThenDiscard(O.Bindable)
    U.deepStrictEqual(pipe(O.none, andThenDiscard(O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, andThenDiscard(O.some(2))), O.none)
    U.deepStrictEqual(pipe(O.some(1), andThenDiscard(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some(1), andThenDiscard(O.some(2))), O.some(1))
  })

  it("bind", () => {
    const bind = _.bind(O.Bindable)
    U.deepStrictEqual(pipe(O.Do, bind("a", () => O.none)), O.none)
    U.deepStrictEqual(pipe(O.Do, bind("a", () => O.some(1))), O.some({ a: 1 }))
  })

  it("tap", () => {
    const tap = _.tap(O.Bindable)
    U.deepStrictEqual(pipe(O.none, tap(() => O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, tap(() => O.some(2))), O.none)
    U.deepStrictEqual(pipe(O.some(1), tap(() => O.none)), O.none)
    U.deepStrictEqual(pipe(O.some(1), tap(() => O.some(2))), O.some(1))
  })
})
