import * as E from "@fp-ts/core/Either"
import * as _ from "@fp-ts/core/typeclass/SemiCoproduct"
import * as U from "../util"

describe("SemiCoproduct", () => {
  it("getSemigroup", () => {
    const S = _.getSemigroup(E.SemiCoproduct)<unknown, never, string, number>()
    U.deepStrictEqual(S.combine(E.right(1), E.right(2)), E.right(1))
    U.deepStrictEqual(S.combine(E.left("a"), E.right(2)), E.right(2))
    U.deepStrictEqual(S.combine(E.right(1), E.left("b")), E.right(1))
    U.deepStrictEqual(S.combine(E.left("a"), E.left("b")), E.left("b"))
  })
})
