import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { pipe } from "@fp-ts/core/internal/Function"
import * as nonEmptyApplicative from "@fp-ts/core/typeclass/NonEmptyApplicative"
import * as _ from "@fp-ts/core/typeclass/NonEmptyProduct"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"
import * as number from "../test-data/number"
import * as O from "../test-data/Option"
import * as P from "../test-data/Predicate"
import * as RA from "../test-data/ReadonlyArray"
import * as string from "../test-data/string"
import * as U from "../util"

describe("NonEmptyProduct", () => {
  it("productMany", () => {
    const curry = (f: Function, n: number, acc: ReadonlyArray<unknown>) =>
      (x: unknown) => {
        const combined = Array(acc.length + 1)
        for (let i = 0; i < acc.length; i++) {
          combined[i] = acc[i]
        }
        combined[acc.length] = x
        return n === 0 ? f.apply(null, combined) : curry(f, n - 1, combined)
      }

    const getCurriedTupleConstructor = (len: number): (a: any) => any =>
      curry(<T extends ReadonlyArray<any>>(...t: T): T => t, len - 1, [])

    const assertSameResult = <F extends TypeLambda>(
      NonEmptyApplicative: nonEmptyApplicative.NonEmptyApplicative<F>
    ) =>
      <R, O, E, A>(collection: Iterable<Kind<F, R, O, E, A>>) =>
        (self: Kind<F, R, O, E, A>) => {
          const ap = nonEmptyApplicative.ap(NonEmptyApplicative)
          const productManyFromAp = <R, O, E, A>(collection: Iterable<Kind<F, R, O, E, A>>) =>
            (
              self: Kind<F, R, O, E, A>
            ): Kind<F, R, O, E, readonly [A, ...ReadonlyArray<A>]> => {
              const args = [self, ...Array.from(collection)]
              const len = args.length
              const f = getCurriedTupleConstructor(len)
              let fas = pipe(args[0], NonEmptyApplicative.map(f))
              for (let i = 1; i < len; i++) {
                fas = pipe(fas, ap(args[i]))
              }
              return fas
            }
          const actual = pipe(self, NonEmptyApplicative.productMany(collection))
          const expected = pipe(self, productManyFromAp(collection))
          // console.log(expected)
          U.deepStrictEqual(actual, expected)
        }

    const product = <B>(that: ReadonlyArray<B>) =>
      <A>(self: ReadonlyArray<A>): ReadonlyArray<readonly [A, B]> => {
        const out: Array<readonly [A, B]> = []
        for (const a of self) {
          for (const b of that) {
            out.push([a, b])
          }
        }
        return out
      }

    const productMany = _.productMany(
      RA.Covariant,
      product
    )

    const NonEmptyApplicative = {
      ...RA.Covariant,
      product,
      productMany
    }

    assertSameResult(NonEmptyApplicative)([])([])
    assertSameResult(NonEmptyApplicative)([])([1, 2, 3])
    assertSameResult(NonEmptyApplicative)([[4]])([1, 2, 3])
    assertSameResult(NonEmptyApplicative)([[4, 5, 6], [7, 8], [9, 10, 11]])([1, 2, 3])
  })

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

  describe("bindKind", () => {
    it("Covariant (Option)", () => {
      const bindKind = _.bindKind(O.Applicative)
      U.deepStrictEqual(pipe(O.some({ a: 1 }), bindKind("b", O.none)), O.none)
      U.deepStrictEqual(pipe(O.some({ a: 1 }), bindKind("b", O.some(2))), O.some({ a: 1, b: 2 }))
    })

    it("Contravariant (Predicate)", () => {
      const p = pipe(
        P.Do,
        P.bindPredicate("x", P.isString),
        P.bindPredicate("y", P.isNumber)
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

  describe("nonEmptyTuple", () => {
    it("Covariant (Option)", () => {
      const nonEmptyTuple = _.nonEmptyTuple(O.NonEmptyProduct)
      U.deepStrictEqual(nonEmptyTuple(O.some("a")), O.some(["a"] as const))
      U.deepStrictEqual(
        nonEmptyTuple(O.some("a"), O.some(1), O.some(true)),
        O.some(["a", 1, true] as const)
      )
      U.deepStrictEqual(nonEmptyTuple(O.some("a"), O.some(1), O.none), O.none)
    })

    it("Invariant (Semigroup)", () => {
      const nonEmptyTuple = _.nonEmptyTuple(semigroup.NonEmptyProduct)
      const S = nonEmptyTuple(string.Semigroup, number.SemigroupSum)
      U.deepStrictEqual(pipe(["a", 2], S.combine(["b", 3])), ["ab", 5])
    })

    it("Contravariant (Predicate)", () => {
      const nonEmptyTuple = _.nonEmptyTuple(P.NonEmptyProduct)
      const p = nonEmptyTuple(P.isString, P.isNumber, P.isBoolean)
      U.deepStrictEqual(p(["a", 1, true]), true)
      U.deepStrictEqual(p(["a", 1, "b"]), false)
    })
  })

  describe("struct", () => {
    it("Covariant (Option)", () => {
      const struct = _.struct(O.Product)
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
      const struct = _.struct(P.Product)
      const p = struct({ x: P.isString, y: P.isNumber, z: P.isBoolean })
      U.deepStrictEqual(p({ x: "a", y: 1, z: true }), true)
      U.deepStrictEqual(p({ x: "a", y: 1, z: "b" }), false)
    })
  })
})
