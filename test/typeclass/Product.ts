import * as Boolean from "@fp-ts/core/Boolean"
import { pipe } from "@fp-ts/core/Function"
import * as Number from "@fp-ts/core/Number"
import * as O from "@fp-ts/core/Option"
import * as P from "@fp-ts/core/Predicate"
import * as String from "@fp-ts/core/String"
import * as _ from "@fp-ts/core/typeclass/Product"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"
import * as U from "../util"

describe("Product", () => {
  describe("tuple", () => {
    it("Covariant (Option)", () => {
      const tuple = _.tuple(O.Product)
      U.deepStrictEqual(tuple(), O.some([] as const))
      U.deepStrictEqual(tuple(O.some("a")), O.some(["a"] as const))
      U.deepStrictEqual(
        tuple(O.some("a"), O.some(1), O.some(true)),
        O.some(["a", 1, true] as const)
      )
      U.deepStrictEqual(tuple(O.some("a"), O.some(1), O.none()), O.none())
    })

    it("Invariant (Semigroup)", () => {
      const tuple = _.tuple(semigroup.Product)
      U.deepStrictEqual(pipe([], tuple().combine([])), [])
      const S = tuple(String.Semigroup, Number.SemigroupSum)
      U.deepStrictEqual(pipe(["a", 2], S.combine(["b", 3])), ["ab", 5])
    })

    it("Contravariant (Predicate)", () => {
      const tuple = _.tuple(P.Product)
      U.deepStrictEqual(tuple()([]), true)
      const p = tuple(String.isString, Number.isNumber, Boolean.isBoolean)
      U.deepStrictEqual(p(["a", 1, true]), true)
      U.deepStrictEqual(p(["a", 1, "b"]), false)
    })
  })

  describe("struct", () => {
    it("Covariant (Option)", () => {
      const struct = _.struct(O.Product)
      U.deepStrictEqual(struct({}), O.some({}))
      U.deepStrictEqual(struct({ a: O.some("a") }), O.some({ a: "a" }))
      U.deepStrictEqual(
        struct({ a: O.some("a"), b: O.some(1), c: O.some(true) }),
        O.some({ a: "a", b: 1, c: true })
      )
      U.deepStrictEqual(
        struct({ a: O.some("a"), b: O.some(1), c: O.none() }),
        O.none()
      )
    })

    it("Invariant (Semigroup)", () => {
      const struct = _.struct(semigroup.Product)
      U.deepStrictEqual(pipe({}, struct({}).combine({})), {})
      const S = struct({ x: String.Semigroup, y: Number.SemigroupSum })
      U.deepStrictEqual(pipe({ x: "a", y: 2 }, S.combine({ x: "b", y: 3 })), { x: "ab", y: 5 })
    })

    it("Contravariant (Predicate)", () => {
      const struct = _.struct(P.Product)
      U.deepStrictEqual(struct({})({}), true)
      const p = struct({ x: String.isString, y: Number.isNumber, z: Boolean.isBoolean })
      U.deepStrictEqual(p({ x: "a", y: 1, z: true }), true)
      U.deepStrictEqual(p({ x: "a", y: 1, z: "b" }), false)
    })
  })
})
