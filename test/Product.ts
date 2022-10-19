import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "@fp-ts/core/Product"
import * as O from "./test-data/Option"
import * as RA from "./test-data/ReadonlyArray"
import * as string from "./test-data/string"
import * as U from "./util"

describe("Product", () => {
  it("fromFunctor", () => {
    const curry = (f: Function, n: number, acc: ReadonlyArray<unknown>) =>
      (x: unknown) => {
        const combined = Array(acc.length + 1)
        for (let i = 0; i < acc.length; i++) {
          combined[i] = acc[i]
        }
        combined[acc.length] = x
        return n === 0 ? f.apply(null, combined) : curry(f, n - 1, combined)
      }

    const getCurriedTupleConstructor = (len: number): (a: unknown) => any =>
      curry(<T extends ReadonlyArray<any>>(...t: T): T => t, len - 1, [])

    const assertSameResult = <F extends TypeLambda>(Product: _.Product<F>) =>
      <S, R, O, E, A>(collection: Iterable<Kind<F, S, R, O, E, A>>) =>
        (self: Kind<F, S, R, O, E, A>) => {
          const ap = _.ap(Product)
          const productManyFromAp = <S, R, O, E, A>(collection: Iterable<Kind<F, S, R, O, E, A>>) =>
            (
              self: Kind<F, S, R, O, E, A>
            ): Kind<F, S, R, O, E, readonly [A, ...ReadonlyArray<A>]> => {
              const args = [self, ...Array.from(collection)]
              const len = args.length
              const f = getCurriedTupleConstructor(len)
              let fas = pipe(args[0], Product.map(f))
              for (let i = 1; i < len; i++) {
                fas = pipe(fas, ap(args[i]))
              }
              return fas
            }
          const actual = pipe(self, Product.productMany(collection))
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

    const Product = _.fromFunctor(
      RA.Functor,
      product
    )

    assertSameResult(Product)([])([])
    assertSameResult(Product)([])([1, 2, 3])
    assertSameResult(Product)([[4]])([1, 2, 3])
    assertSameResult(Product)([[4, 5, 6], [7, 8], [9, 10, 11]])([1, 2, 3])
  })

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

  it("andThenDiscard", () => {
    const andThenDiscard = _.andThenDiscard(O.Product)
    U.deepStrictEqual(pipe(O.none, andThenDiscard(O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, andThenDiscard(O.some(2))), O.none)
    U.deepStrictEqual(pipe(O.some(1), andThenDiscard(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some(1), andThenDiscard(O.some(2))), O.some(1))
  })

  it("andThen", () => {
    const andThen = _.andThen(O.Product)
    U.deepStrictEqual(pipe(O.none, andThen(O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, andThen(O.some(2))), O.none)
    U.deepStrictEqual(pipe(O.some(1), andThen(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some(1), andThen(O.some(2))), O.some(2))
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
