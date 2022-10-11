import * as _ from "@fp-ts/core/Const"
import { pipe } from "@fp-ts/core/Function"
import * as number from "@fp-ts/core/number"
import * as string from "@fp-ts/core/string"
import * as U from "./util"

describe("Const", () => {
  describe("pipeables", () => {
    it("map", () => {
      const fa = _.make("a")
      U.deepStrictEqual(pipe(fa, _.map(U.double)), fa)
      U.deepStrictEqual(pipe(fa, _.Functor.map(U.double)), fa)
    })

    it("contramap", () => {
      const fa = _.make("a")
      U.deepStrictEqual(pipe(fa, _.contramap(U.double)), fa)
      U.deepStrictEqual(pipe(fa, _.Contravariant.contramap(U.double)), fa)
    })

    it("mapBoth", () => {
      U.deepStrictEqual(pipe(_.make("a"), _.mapBoth(string.toUpperCase, U.double)), _.make("A"))
      U.deepStrictEqual(
        pipe(_.make("a"), _.Bifunctor.mapBoth(string.toUpperCase, U.double)),
        _.make("A")
      )
    })

    it("mapLeft", () => {
      const f = _.mapLeft(string.toUpperCase)
      U.deepStrictEqual(pipe(_.make("a"), f), _.make("A"))
    })
  })

  it("getApplicative", () => {
    const F = _.getApplicative(string.Monoid)
    U.deepStrictEqual(F.of(1), _.make(""))
  })

  it("liftEq", () => {
    const E = _.liftEq(number.Eq)
    U.deepStrictEqual(E.equals(_.make(1))(_.make(1)), true)
    U.deepStrictEqual(E.equals(_.make(1))(_.make(2)), false)
  })

  it("getOrd", () => {
    const O = _.liftOrd(number.Ord)
    U.deepStrictEqual(O.compare(_.make(1))(_.make(1)), 0)
    U.deepStrictEqual(O.compare(_.make(1))(_.make(2)), 1)
    U.deepStrictEqual(O.compare(_.make(2))(_.make(1)), -1)
  })

  it("getBounded", () => {
    const B = _.getBounded(number.Bounded)
    U.deepStrictEqual(B.compare(_.make(1))(_.make(1)), 0)
    U.deepStrictEqual(B.compare(_.make(1))(_.make(2)), 1)
    U.deepStrictEqual(B.compare(_.make(2))(_.make(1)), -1)
    U.deepStrictEqual(B.top, _.make(Infinity))
    U.deepStrictEqual(B.bottom, _.make(-Infinity))
  })

  it("liftSemigroup", () => {
    const S = _.liftSemigroup(string.Semigroup)
    U.deepStrictEqual(S.combine(_.make("b"))(_.make("a")), _.make("ab"))
  })

  it("getMonoid", () => {
    const M = _.getMonoid(string.Monoid)
    U.deepStrictEqual(M.combine(_.make("b"))(_.make("a")), _.make("ab"))
    U.deepStrictEqual(M.combine(M.empty)(_.make("a")), _.make("a"))
    U.deepStrictEqual(M.combine(_.make("b"))(M.empty), _.make("b"))
  })

  it("getApplicative", () => {
    const F = _.getApply(string.Semigroup)
    const fa = _.make("a")
    U.deepStrictEqual(pipe(fa, F.ap(_.make("b"))), _.make("ab"))
  })

  it("getShow", () => {
    const Sh = _.getShow(string.Show)
    const x = _.make("a")
    U.deepStrictEqual(Sh.show(x), `make("a")`)
  })
})
