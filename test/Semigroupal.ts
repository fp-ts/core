import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "@fp-ts/core/Semigroupal"
import * as O from "./data/Option"
import * as RA from "./data/ReadonlyArray"
import * as string from "./data/string"
import * as U from "./util"

describe("Semigroupal", () => {
  describe("zipWithComposition", () => {
    const sum = (a: number, b: number): number => a + b
    it("ReadonlyArray", () => {
      const zipWith = _.zipWithComposition(RA.Semigroupal, O.Semigroupal)
      U.deepStrictEqual(pipe([], zipWith([O.none], sum)), [])
      U.deepStrictEqual(pipe([O.none], zipWith([], sum)), [])
      U.deepStrictEqual(pipe([O.none], zipWith([O.none], sum)), [O.none])
      U.deepStrictEqual(pipe([O.some(1)], zipWith([O.some(2)], sum)), [O.some(3)])
      U.deepStrictEqual(pipe([O.some(1), O.none], zipWith([O.some(2)], sum)), [O.some(3), O.none])
      U.deepStrictEqual(pipe([O.some(1), O.none], zipWith([O.some(2), O.some(3)], sum)), [
        O.some(3),
        O.some(4),
        O.none,
        O.none
      ])

      it("Option", () => {
        const sum = (a: number, b: number): number => a + b
        const zipWith = _.zipWithComposition(O.Semigroupal, O.Semigroupal)
        U.deepStrictEqual(pipe(O.none, zipWith(O.none, sum)), O.none)
        U.deepStrictEqual(pipe(O.some(O.none), zipWith(O.none, sum)), O.none)
        U.deepStrictEqual(pipe(O.some(O.some(1)), zipWith(O.none, sum)), O.none)
        U.deepStrictEqual(pipe(O.some(O.some(1)), zipWith(O.some(O.none), sum)), O.some(O.none))
        U.deepStrictEqual(pipe(O.some(O.none), zipWith(O.some(O.some(2)), sum)), O.some(O.none))
        U.deepStrictEqual(
          pipe(O.some(O.some(1)), zipWith(O.some(O.some(2)), sum)),
          O.some(O.some(3))
        )
      })
    })
  })

  describe("zipManyComposition", () => {
    it("ReadonlyArray", () => {
      const zipMany = _.zipManyComposition(RA.Semigroupal, O.Semigroupal)
      U.deepStrictEqual(pipe([O.some(1), O.none], zipMany([])), [O.some([1] as const), O.none])
      U.deepStrictEqual(pipe([O.some(1), O.none], zipMany([[O.some(2), O.none]])), [
        O.some([1, 2] as const),
        O.none,
        O.none,
        O.none
      ])
      U.deepStrictEqual(
        pipe([O.some(1), O.some(2)], zipMany([[O.some(3), O.some(4)], [O.some(5)]])),
        [
          O.some([1, 3, 5] as const),
          O.some([1, 4, 5] as const),
          O.some([2, 3, 5] as const),
          O.some([2, 4, 5] as const)
        ]
      )
    })

    it("Option", () => {
      const zipMany = _.zipManyComposition(O.Semigroupal, O.Semigroupal)
      U.deepStrictEqual(pipe(O.none, zipMany([])), O.none)
      U.deepStrictEqual(pipe(O.some(O.none), zipMany([])), O.some(O.none))
      U.deepStrictEqual(pipe(O.some(O.some(1)), zipMany([])), O.some(O.some([1] as const)))
      U.deepStrictEqual(pipe(O.none, zipMany([O.none])), O.none)
      U.deepStrictEqual(pipe(O.some(O.none), zipMany([O.none])), O.none)
      U.deepStrictEqual(pipe(O.some(O.none), zipMany([O.some(O.none)])), O.some(O.none))
      U.deepStrictEqual(pipe(O.some(O.none), zipMany([O.some(O.some("a"))])), O.some(O.none))
      U.deepStrictEqual(
        pipe(O.some(O.some(1)), zipMany([O.some(O.some(2))])),
        O.some(O.some([1, 2] as const))
      )
    })
  })

  it("ap", () => {
    const ap = _.ap(O.Semigroupal)
    const double = (n: number) => n * 2
    U.deepStrictEqual(pipe(O.none, ap(O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, ap(O.some(1))), O.none)
    U.deepStrictEqual(pipe(O.some(double), ap(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some(double), ap(O.some(1))), O.some(2))
  })

  it("zip", () => {
    const zip = _.zip(O.Semigroupal)
    U.deepStrictEqual(pipe(O.none, zip(O.some(1))), O.none)
    U.deepStrictEqual(pipe(O.some(1), zip(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some(1), zip(O.some("a"))), O.some([1, "a"] as const))
  })

  it("zipLeftPar", () => {
    const zipLeftPar = _.zipLeftPar(O.Semigroupal)
    U.deepStrictEqual(pipe(O.none, zipLeftPar(O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, zipLeftPar(O.some(2))), O.none)
    U.deepStrictEqual(pipe(O.some(1), zipLeftPar(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some(1), zipLeftPar(O.some(2))), O.some(1))
  })

  it("zipRightPar", () => {
    const zipRightPar = _.zipRightPar(O.Semigroupal)
    U.deepStrictEqual(pipe(O.none, zipRightPar(O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, zipRightPar(O.some(2))), O.none)
    U.deepStrictEqual(pipe(O.some(1), zipRightPar(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some(1), zipRightPar(O.some(2))), O.some(2))
  })

  it("bindRight", () => {
    const bindRight = _.bindRight(O.Semigroupal)
    U.deepStrictEqual(pipe(O.some({ a: 1 }), bindRight("b", O.none)), O.none)
    U.deepStrictEqual(pipe(O.some({ a: 1 }), bindRight("b", O.some(2))), O.some({ a: 1, b: 2 }))
  })

  it("zipFlatten", () => {
    const zipFlatten = _.zipFlatten(O.Semigroupal)
    U.deepStrictEqual(pipe(O.some([1, 2]), zipFlatten(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some([1, 2]), zipFlatten(O.some(3))), O.some([1, 2, 3] as const))
  })

  it("liftSemigroup", () => {
    const liftSemigroup = _.liftSemigroup(O.Semigroupal)
    const S = liftSemigroup(string.Semigroup)
    U.deepStrictEqual(pipe(O.none, S.combine(O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, S.combine(O.some("b"))), O.none)
    U.deepStrictEqual(pipe(O.some("a"), S.combine(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some("a"), S.combine(O.some("b"))), O.some("ab"))
  })

  it("lift2", () => {
    const sum = _.lift2(O.Semigroupal)((a: number, b: number) => a + b)
    U.deepStrictEqual(sum(O.none, O.none), O.none)
    U.deepStrictEqual(sum(O.some(1), O.none), O.none)
    U.deepStrictEqual(sum(O.none, O.some(2)), O.none)
    U.deepStrictEqual(sum(O.some(1), O.some(2)), O.some(3))
  })

  it("lift3", () => {
    const sum = _.lift3(O.Semigroupal)((a: number, b: number, c: number) => a + b + c)
    U.deepStrictEqual(sum(O.none, O.none, O.none), O.none)
    U.deepStrictEqual(sum(O.some(1), O.none, O.none), O.none)
    U.deepStrictEqual(sum(O.none, O.some(2), O.none), O.none)
    U.deepStrictEqual(sum(O.none, O.none, O.some(3)), O.none)
    U.deepStrictEqual(sum(O.some(1), O.some(2), O.some(3)), O.some(6))
  })
})
