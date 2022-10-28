import { left, right } from "@fp-ts/core/internal/Either"
import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "@fp-ts/core/typeclass/NonEmptyCoproduct"
import * as E from "../test-data/Either"
import * as O from "../test-data/Option"
import * as U from "../util"

describe("NonEmptyCoproduct", () => {
  it("coproductEither", () => {
    const coproductEither = _.coproductEither(O.NonEmptyCoproduct)
    U.deepStrictEqual(pipe(O.none, coproductEither(O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, coproductEither(O.some("a"))), O.some(right("a")))
    U.deepStrictEqual(pipe(O.some(1), coproductEither(O.none)), O.some(left(1)))
    U.deepStrictEqual(pipe(O.some(1), coproductEither(O.some("a"))), O.some(left(1)))
  })

  it("getSemigroup", () => {
    const S = _.getSemigroup(E.NonEmptyCoproduct)<unknown, never, string, number>()
    U.deepStrictEqual(pipe(E.right(1), S.combine(E.right(2))), E.right(1))
    U.deepStrictEqual(pipe(E.left("a"), S.combine(E.right(2))), E.right(2))
    U.deepStrictEqual(pipe(E.right(1), S.combine(E.left("b"))), E.right(1))
    U.deepStrictEqual(pipe(E.left("a"), S.combine(E.left("b"))), E.left("b"))
  })
})
