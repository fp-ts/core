import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "@fp-ts/core/typeclass/Product"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"
import * as number from "../test-data/number"
import * as O from "../test-data/Option"
import * as predicate from "../test-data/Predicate"
import * as string from "../test-data/string"
import * as U from "../util"

describe("Product", () => {
  describe("tuple", () => {
    it("Covariant (Option)", () => {
      const tuple = _.tuple(O.Applicative)
      U.deepStrictEqual(tuple(), O.some([] as const))
      U.deepStrictEqual(tuple(O.some("a")), O.some(["a"] as const))
      U.deepStrictEqual(
        tuple(O.some("a"), O.some(1), O.some(true)),
        O.some(["a", 1, true] as const)
      )
      U.deepStrictEqual(tuple(O.some("a"), O.some(1), O.none), O.none)
    })

    it("Invariant (Semigroup)", () => {
      const tuple = _.tuple(semigroup.Product)
      const S = tuple(string.Semigroup, number.SemigroupSum)
      U.deepStrictEqual(pipe(["a", 2], S.combine(["b", 3])), ["ab", 5])
    })

    it("Contravariant (Predicate)", () => {
      const tuple = _.tuple(predicate.Product)
      const p = tuple(predicate.isString, predicate.isNumber, predicate.isBoolean)
      U.deepStrictEqual(p(["a", 1, true]), true)
      U.deepStrictEqual(p(["a", 1, "b"]), false)
    })
  })

  describe("struct", () => {
    it("Covariant (Option)", () => {
      const struct = _.struct(O.Applicative)
      U.deepStrictEqual(struct({}), O.some({}))
      U.deepStrictEqual(struct({ a: O.some("a") }), O.some({ a: "a" }))
      U.deepStrictEqual(
        struct({ a: O.some("a"), b: O.some(1), c: O.some(true) }),
        O.some({ a: "a", b: 1, c: true })
      )
      U.deepStrictEqual(
        struct({ a: O.some("a"), b: O.some(1), c: O.none }),
        O.none
      )
    })

    it("Invariant (Semigroup)", () => {
      const struct = _.struct(semigroup.Product)
      const S = struct({ x: string.Semigroup, y: number.SemigroupSum })
      U.deepStrictEqual(pipe({ x: "a", y: 2 }, S.combine({ x: "b", y: 3 })), { x: "ab", y: 5 })
    })

    it("Contravariant (Predicate)", () => {
      const struct = _.struct(predicate.Product)
      const p = struct({ x: predicate.isString, y: predicate.isNumber, z: predicate.isBoolean })
      U.deepStrictEqual(p({ x: "a", y: 1, z: true }), true)
      U.deepStrictEqual(p({ x: "a", y: 1, z: "b" }), false)
    })
  })
})
