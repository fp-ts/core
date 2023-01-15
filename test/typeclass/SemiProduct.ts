import { pipe } from "@fp-ts/core/Function"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import * as semiApplicative from "@fp-ts/core/typeclass/SemiApplicative"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"
import * as _ from "@fp-ts/core/typeclass/SemiProduct"
import * as number from "../data/number"
import * as O from "../data/Option"
import * as P from "../data/Predicate"
import * as RA from "../data/ReadonlyArray"
import * as string from "../data/string"
import * as U from "../util"

describe("SemiProduct", () => {
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
      SemiApplicative: semiApplicative.SemiApplicative<F>
    ) =>
      <R, O, E, A>(collection: Iterable<Kind<F, R, O, E, A>>) =>
        (self: Kind<F, R, O, E, A>) => {
          const ap = semiApplicative.ap(SemiApplicative)
          const productManyFromAp = <R, O, E, A>(collection: Iterable<Kind<F, R, O, E, A>>) =>
            (
              self: Kind<F, R, O, E, A>
            ): Kind<F, R, O, E, readonly [A, ...ReadonlyArray<A>]> => {
              const args = [self, ...Array.from(collection)]
              const len = args.length
              const f = getCurriedTupleConstructor(len)
              let fas = pipe(args[0], SemiApplicative.map(f))
              for (let i = 1; i < len; i++) {
                fas = pipe(fas, ap(args[i]))
              }
              return fas
            }
          const actual = pipe(self, SemiApplicative.productMany(collection))
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

    const SemiApplicative = {
      ...RA.Covariant,
      product,
      productMany
    }

    assertSameResult(SemiApplicative)([])([])
    assertSameResult(SemiApplicative)([])([1, 2, 3])
    assertSameResult(SemiApplicative)([[4]])([1, 2, 3])
    assertSameResult(SemiApplicative)([[4, 5, 6], [7, 8], [9, 10, 11]])([1, 2, 3])
  })

  describe("productComposition", () => {
    it("ReadonlyArray", () => {
      const product = _.productComposition(RA.SemiApplicative, O.SemiProduct)
      U.deepStrictEqual(pipe([], product([O.none])), [])
      U.deepStrictEqual(pipe([O.none], product([])), [])
      U.deepStrictEqual(pipe([O.none], product([O.none])), [O.none])
      U.deepStrictEqual(pipe([O.some(1)], product([O.some(2)])), [O.some([1, 2] as const)])
    })

    it("Option", () => {
      const product = _.productComposition(O.SemiApplicative, O.SemiProduct)
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
      const productMany = _.productManyComposition(RA.SemiApplicative, O.SemiProduct)
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
      const productMany = _.productManyComposition(O.SemiApplicative, O.SemiProduct)
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

  describe("andThenBind", () => {
    it("Covariant (Option)", () => {
      const andThenBind = _.andThenBind(O.Applicative)
      U.deepStrictEqual(pipe(O.some({ a: 1 }), andThenBind("b", O.none)), O.none)
      U.deepStrictEqual(pipe(O.some({ a: 1 }), andThenBind("b", O.some(2))), O.some({ a: 1, b: 2 }))
    })

    it("Contravariant (Predicate)", () => {
      const p = pipe(
        P.Do,
        P.andThenBind("x", P.isString),
        P.andThenBind("y", P.isNumber)
      )
      U.deepStrictEqual(p({ x: "a", y: 1 }), true)
      U.deepStrictEqual(p({ x: "a", y: "x" }), false)
    })
  })

  describe("productFlatten", () => {
    it("Covariant (Option)", () => {
      const productFlatten = _.productFlatten(O.SemiProduct)
      U.deepStrictEqual(pipe(O.some([1, 2]), productFlatten(O.none)), O.none)
      U.deepStrictEqual(pipe(O.some([1, 2]), productFlatten(O.some(3))), O.some([1, 2, 3] as const))
    })

    it("Contravariant (Predicate)", () => {
      const productFlatten = _.productFlatten(P.SemiProduct)
      const p = pipe(P.tuple(P.isString, P.isString), productFlatten(P.isNumber))
      U.deepStrictEqual(p(["a", "b", 3]), true)
      U.deepStrictEqual(p(["a", "b", "c"]), false)
      U.deepStrictEqual(p([1, "b", 1]), false)
    })
  })

  describe("nonEmptyTuple", () => {
    it("Covariant (Option)", () => {
      const nonEmptyTuple = _.nonEmptyTuple(O.SemiProduct)
      U.deepStrictEqual(nonEmptyTuple(O.some("a")), O.some(["a"] as const))
      U.deepStrictEqual(
        nonEmptyTuple(O.some("a"), O.some(1), O.some(true)),
        O.some(["a", 1, true] as const)
      )
      U.deepStrictEqual(nonEmptyTuple(O.some("a"), O.some(1), O.none), O.none)
    })

    it("Invariant (Semigroup)", () => {
      const nonEmptyTuple = _.nonEmptyTuple(semigroup.SemiProduct)
      const S = nonEmptyTuple(string.Semigroup, number.SemigroupSum)
      U.deepStrictEqual(pipe(["a", 2], S.combine(["b", 3])), ["ab", 5])
    })

    it("Contravariant (Predicate)", () => {
      const nonEmptyTuple = _.nonEmptyTuple(P.SemiProduct)
      const p = nonEmptyTuple(P.isString, P.isNumber, P.isBoolean)
      U.deepStrictEqual(p(["a", 1, true]), true)
      U.deepStrictEqual(p(["a", 1, "b"]), false)
    })
  })

  describe("nonEmptyStruct", () => {
    it("Covariant (Option)", () => {
      const nonEmptyStruct = _.nonEmptyStruct(O.Product)
      U.deepStrictEqual(nonEmptyStruct({ a: O.some("a") }), O.some({ a: "a" }))
      U.deepStrictEqual(
        nonEmptyStruct({ a: O.some("a"), b: O.some(1), c: O.some(true) }),
        O.some({ a: "a", b: 1, c: true })
      )
      U.deepStrictEqual(
        nonEmptyStruct({ a: O.some("a"), b: O.some(1), c: O.none }),
        O.none
      )
    })

    it("Invariant (Semigroup)", () => {
      const nonEmptyStruct = _.nonEmptyStruct(semigroup.Product)
      const S = nonEmptyStruct({ x: string.Semigroup, y: number.SemigroupSum })
      U.deepStrictEqual(pipe({ x: "a", y: 2 }, S.combine({ x: "b", y: 3 })), { x: "ab", y: 5 })
    })

    it("Contravariant (Predicate)", () => {
      const nonEmptyStruct = _.nonEmptyStruct(P.Product)
      const p = nonEmptyStruct({ x: P.isString, y: P.isNumber, z: P.isBoolean })
      U.deepStrictEqual(p({ x: "a", y: 1, z: true }), true)
      U.deepStrictEqual(p({ x: "a", y: 1, z: "b" }), false)
    })
  })
})
