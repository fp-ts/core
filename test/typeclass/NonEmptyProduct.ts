import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "@fp-ts/core/typeclass/NonEmptyProduct"
import * as O from "../test-data/Option"
import * as P from "../test-data/Predicate"
import * as U from "../util"

describe("NonEmptyProduct", () => {
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
