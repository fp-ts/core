import { pipe } from "@fp-ts/core/Function"
import * as O from "@fp-ts/core/Option"
import * as String from "@fp-ts/core/String"
import * as _ from "@fp-ts/core/typeclass/SemiApplicative"
import * as U from "../util"

describe("SemiApplicative", () => {
  it("ap", () => {
    const ap = _.ap(O.SemiApplicative)
    const double = (n: number) => n * 2
    U.deepStrictEqual(pipe(O.none(), ap(O.none())), O.none())
    U.deepStrictEqual(pipe(O.none(), ap(O.some(1))), O.none())
    U.deepStrictEqual(pipe(O.some(double), ap(O.none())), O.none())
    U.deepStrictEqual(pipe(O.some(double), ap(O.some(1))), O.some(2))
  })

  it("andThenDiscard", () => {
    const andThenDiscard = _.andThenDiscard(O.SemiApplicative)
    U.deepStrictEqual(pipe(O.none(), andThenDiscard(O.none())), O.none())
    U.deepStrictEqual(pipe(O.none(), andThenDiscard(O.some(2))), O.none())
    U.deepStrictEqual(pipe(O.some(1), andThenDiscard(O.none())), O.none())
    U.deepStrictEqual(pipe(O.some(1), andThenDiscard(O.some(2))), O.some(1))
  })

  it("andThen", () => {
    const andThen = _.andThen(O.SemiApplicative)
    U.deepStrictEqual(pipe(O.none(), andThen(O.none())), O.none())
    U.deepStrictEqual(pipe(O.none(), andThen(O.some(2))), O.none())
    U.deepStrictEqual(pipe(O.some(1), andThen(O.none())), O.none())
    U.deepStrictEqual(pipe(O.some(1), andThen(O.some(2))), O.some(2))
  })

  it("liftSemigroup", () => {
    const liftSemigroup = _.getSemigroup(O.SemiApplicative)
    const S = liftSemigroup(String.Semigroup)
    U.deepStrictEqual(S.combine(O.none(), O.none()), O.none())
    U.deepStrictEqual(S.combine(O.none(), O.some("b")), O.none())
    U.deepStrictEqual(S.combine(O.some("a"), O.none()), O.none())
    U.deepStrictEqual(S.combine(O.some("a"), O.some("b")), O.some("ab"))

    U.deepStrictEqual(S.combineMany(O.some("a"), [O.some("b"), O.some("c")]), O.some("abc"))
  })
})
