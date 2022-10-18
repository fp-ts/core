import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "@fp-ts/core/Product"
import * as O from "./data/Option"
import * as RA from "./data/ReadonlyArray"
import * as string from "./data/string"
import * as U from "./util"

describe("Semigroupal", () => {
  describe("productComposition", () => {
    it("ReadonlyArray", () => {
      const product = _.productComposition(RA.Product, O.Product)
      U.deepStrictEqual(pipe([], product([O.none])), [])
      U.deepStrictEqual(pipe([O.none], product([])), [])
      U.deepStrictEqual(pipe([O.none], product([O.none])), [O.none])
      U.deepStrictEqual(pipe([O.some(1)], product([O.some(2)])), [O.some([1, 2] as const)])
    })

    it("Option", () => {
      const product = _.productComposition(O.Product, O.Product)
      U.deepStrictEqual(pipe(O.none, product(O.none)), O.none)
      U.deepStrictEqual(pipe(O.some(O.none), product(O.none)), O.none)
      U.deepStrictEqual(pipe(O.some(O.some(1)), product(O.none)), O.none)
      U.deepStrictEqual(pipe(O.some(O.some(1)), product(O.some(O.none))), O.some(O.none))
      U.deepStrictEqual(pipe(O.some(O.none), product(O.some(O.some(2)))), O.some(O.none))
      U.deepStrictEqual(
        pipe(O.some(O.some(1)), product(O.some(O.some(2)))),
        O.some(O.some([1, 2] as const))
      )
    })
  })

  describe("productManyComposition", () => {
    it("ReadonlyArray", () => {
      const productMany = _.productManyComposition(RA.Product, O.Product)
      U.deepStrictEqual(pipe([O.some(1), O.none], productMany([])), [O.some([1] as const), O.none])
      U.deepStrictEqual(pipe([O.some(1), O.none], productMany([[O.some(2), O.none]])), [
        O.some([1, 2] as const),
        O.none,
        O.none,
        O.none
      ])
      U.deepStrictEqual(
        pipe([O.some(1), O.some(2)], productMany([[O.some(3), O.some(4)], [O.some(5)]])),
        [
          O.some([1, 3, 5] as const),
          O.some([1, 4, 5] as const),
          O.some([2, 3, 5] as const),
          O.some([2, 4, 5] as const)
        ]
      )
    })

    it("Option", () => {
      const productMany = _.productManyComposition(O.Product, O.Product)
      U.deepStrictEqual(pipe(O.none, productMany([])), O.none)
      U.deepStrictEqual(pipe(O.some(O.none), productMany([])), O.some(O.none))
      U.deepStrictEqual(pipe(O.some(O.some(1)), productMany([])), O.some(O.some([1] as const)))
      U.deepStrictEqual(pipe(O.none, productMany([O.none])), O.none)
      U.deepStrictEqual(pipe(O.some(O.none), productMany([O.none])), O.none)
      U.deepStrictEqual(pipe(O.some(O.none), productMany([O.some(O.none)])), O.some(O.none))
      U.deepStrictEqual(pipe(O.some(O.none), productMany([O.some(O.some("a"))])), O.some(O.none))
      U.deepStrictEqual(
        pipe(O.some(O.some(1)), productMany([O.some(O.some(2))])),
        O.some(O.some([1, 2] as const))
      )
    })
  })

  it("ap", () => {
    const ap = _.ap(O.Product)
    const double = (n: number) => n * 2
    U.deepStrictEqual(pipe(O.none, ap(O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, ap(O.some(1))), O.none)
    U.deepStrictEqual(pipe(O.some(double), ap(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some(double), ap(O.some(1))), O.some(2))
  })

  it("andThenDiscardPar", () => {
    const andThenDiscardPar = _.andThenDiscardPar(O.Product)
    U.deepStrictEqual(pipe(O.none, andThenDiscardPar(O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, andThenDiscardPar(O.some(2))), O.none)
    U.deepStrictEqual(pipe(O.some(1), andThenDiscardPar(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some(1), andThenDiscardPar(O.some(2))), O.some(1))
  })

  it("andThenPar", () => {
    const andThenPar = _.andThenPar(O.Product)
    U.deepStrictEqual(pipe(O.none, andThenPar(O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, andThenPar(O.some(2))), O.none)
    U.deepStrictEqual(pipe(O.some(1), andThenPar(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some(1), andThenPar(O.some(2))), O.some(2))
  })

  it("bindRight", () => {
    const bindRight = _.bindRight(O.Product)
    U.deepStrictEqual(pipe(O.some({ a: 1 }), bindRight("b", O.none)), O.none)
    U.deepStrictEqual(pipe(O.some({ a: 1 }), bindRight("b", O.some(2))), O.some({ a: 1, b: 2 }))
  })

  it("productFlatten", () => {
    const productFlatten = _.productFlatten(O.Product)
    U.deepStrictEqual(pipe(O.some([1, 2]), productFlatten(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some([1, 2]), productFlatten(O.some(3))), O.some([1, 2, 3] as const))
  })

  it("liftSemigroup", () => {
    const liftSemigroup = _.liftSemigroup(O.Product)
    const S = liftSemigroup(string.Semigroup)
    U.deepStrictEqual(pipe(O.none, S.combine(O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, S.combine(O.some("b"))), O.none)
    U.deepStrictEqual(pipe(O.some("a"), S.combine(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some("a"), S.combine(O.some("b"))), O.some("ab"))
  })

  it("lift2", () => {
    const sum = _.lift2(O.Product)((a: number, b: number) => a + b)
    U.deepStrictEqual(sum(O.none, O.none), O.none)
    U.deepStrictEqual(sum(O.some(1), O.none), O.none)
    U.deepStrictEqual(sum(O.none, O.some(2)), O.none)
    U.deepStrictEqual(sum(O.some(1), O.some(2)), O.some(3))
  })

  it("lift3", () => {
    const sum = _.lift3(O.Product)((a: number, b: number, c: number) => a + b + c)
    U.deepStrictEqual(sum(O.none, O.none, O.none), O.none)
    U.deepStrictEqual(sum(O.some(1), O.none, O.none), O.none)
    U.deepStrictEqual(sum(O.none, O.some(2), O.none), O.none)
    U.deepStrictEqual(sum(O.none, O.none, O.some(3)), O.none)
    U.deepStrictEqual(sum(O.some(1), O.some(2), O.some(3)), O.some(6))
  })
})
