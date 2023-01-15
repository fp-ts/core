import { pipe } from "@fp-ts/core/Function"
import * as _ from "@fp-ts/core/typeclass/SemiCoproduct"
import * as E from "../data/Either"
import * as U from "../util"

describe("SemiCoproduct", () => {
  it("getSemigroup", () => {
    const S = _.getSemigroup(E.SemiCoproduct)<unknown, never, string, number>()
    U.deepStrictEqual(pipe(E.right(1), S.combine(E.right(2))), E.right(1))
    U.deepStrictEqual(pipe(E.left("a"), S.combine(E.right(2))), E.right(2))
    U.deepStrictEqual(pipe(E.right(1), S.combine(E.left("b"))), E.right(1))
    U.deepStrictEqual(pipe(E.left("a"), S.combine(E.left("b"))), E.left("b"))
  })
})
