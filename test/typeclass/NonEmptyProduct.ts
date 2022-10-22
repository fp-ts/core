import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "@fp-ts/core/typeclass/NonEmptyProduct"
import * as O from "../test-data/Option"
import * as P from "../test-data/Predicate"
import * as RA from "../test-data/ReadonlyArray"
import * as U from "../util"

describe("NonEmptyProduct", () => {
  describe("productComposition", () => {
    it("ReadonlyArray", () => {
      const product = _.productComposition(RA.NonEmptyApplicative, O.NonEmptyProduct)
      U.deepStrictEqual(pipe([], product([O.none])), [])
      U.deepStrictEqual(pipe([O.none], product([])), [])
      U.deepStrictEqual(pipe([O.none], product([O.none])), [O.none])
      U.deepStrictEqual(pipe([O.some(1)], product([O.some(2)])), [O.some([1, 2] as const)])
    })

    it("Option", () => {
      const product = _.productComposition(O.NonEmptyApplicative, O.NonEmptyProduct)
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
      const productMany = _.productManyComposition(RA.NonEmptyApplicative, O.NonEmptyProduct)
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
      const productMany = _.productManyComposition(O.NonEmptyApplicative, O.NonEmptyProduct)
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

  describe("bindRight", () => {
    it("Covariant (Option)", () => {
      const bindRight = _.bindRight(O.Applicative)
      U.deepStrictEqual(pipe(O.some({ a: 1 }), bindRight("b", O.none)), O.none)
      U.deepStrictEqual(pipe(O.some({ a: 1 }), bindRight("b", O.some(2))), O.some({ a: 1, b: 2 }))
    })

    it("Contravariant (Predicate)", () => {
      const p = pipe(
        P.Do,
        P.bindRight("x", P.isString),
        P.bindRight("y", P.isNumber)
      )
      U.deepStrictEqual(p({ x: "a", y: 1 }), true)
      U.deepStrictEqual(p({ x: "a", y: "x" }), false)
    })
  })

  describe("productFlatten", () => {
    it("Covariant (Option)", () => {
      const productFlatten = _.productFlatten(O.NonEmptyProduct)
      U.deepStrictEqual(pipe(O.some([1, 2]), productFlatten(O.none)), O.none)
      U.deepStrictEqual(pipe(O.some([1, 2]), productFlatten(O.some(3))), O.some([1, 2, 3] as const))
    })

    it("Contravariant (Predicate)", () => {
      const productFlatten = _.productFlatten(P.NonEmptyProduct)
      const p = pipe(P.tuple(P.isString, P.isString), productFlatten(P.isNumber))
      U.deepStrictEqual(p(["a", "b", 3]), true)
      U.deepStrictEqual(p(["a", "b", "c"]), false)
      U.deepStrictEqual(p([1, "b", 1]), false)
    })
  })
})
