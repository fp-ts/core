import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "@fp-ts/core/typeclass/NonEmptyApplicative"
import * as O from "../test-data/Option"
import * as RA from "../test-data/ReadonlyArray"
import * as string from "../test-data/string"
import * as U from "../util"

describe("NonEmptyApplicative", () => {
  it("fromCovariant", () => {
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
      NonEmptyApplicative: _.NonEmptyApplicative<F>
    ) =>
      <R, O, E, A>(collection: Iterable<Kind<F, R, O, E, A>>) =>
        (self: Kind<F, R, O, E, A>) => {
          const ap = _.ap(NonEmptyApplicative)
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

    const NonEmptyApplicative = _.fromCovariant(
      RA.Covariant,
      product
    )

    assertSameResult(NonEmptyApplicative)([])([])
    assertSameResult(NonEmptyApplicative)([])([1, 2, 3])
    assertSameResult(NonEmptyApplicative)([[4]])([1, 2, 3])
    assertSameResult(NonEmptyApplicative)([[4, 5, 6], [7, 8], [9, 10, 11]])([1, 2, 3])
  })

  describe("productComposition", () => {
    it("ReadonlyArray", () => {
      const product = _.productComposition(RA.NonEmptyApplicative, O.NonEmptyApplicative)
      U.deepStrictEqual(pipe([], product([O.none])), [])
      U.deepStrictEqual(pipe([O.none], product([])), [])
      U.deepStrictEqual(pipe([O.none], product([O.none])), [O.none])
      U.deepStrictEqual(pipe([O.some(1)], product([O.some(2)])), [O.some([1, 2] as const)])
    })

    it("Option", () => {
      const product = _.productComposition(O.NonEmptyApplicative, O.NonEmptyApplicative)
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
      const productMany = _.productManyComposition(RA.NonEmptyApplicative, O.NonEmptyApplicative)
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
      const productMany = _.productManyComposition(O.NonEmptyApplicative, O.NonEmptyApplicative)
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
    const ap = _.ap(O.NonEmptyApplicative)
    const double = (n: number) => n * 2
    U.deepStrictEqual(pipe(O.none, ap(O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, ap(O.some(1))), O.none)
    U.deepStrictEqual(pipe(O.some(double), ap(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some(double), ap(O.some(1))), O.some(2))
  })

  it("andThenDiscard", () => {
    const andThenDiscard = _.andThenDiscard(O.NonEmptyApplicative)
    U.deepStrictEqual(pipe(O.none, andThenDiscard(O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, andThenDiscard(O.some(2))), O.none)
    U.deepStrictEqual(pipe(O.some(1), andThenDiscard(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some(1), andThenDiscard(O.some(2))), O.some(1))
  })

  it("andThen", () => {
    const andThen = _.andThen(O.NonEmptyApplicative)
    U.deepStrictEqual(pipe(O.none, andThen(O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, andThen(O.some(2))), O.none)
    U.deepStrictEqual(pipe(O.some(1), andThen(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some(1), andThen(O.some(2))), O.some(2))
  })

  it("productFlatten", () => {
    const productFlatten = _.productFlatten(O.NonEmptyApplicative)
    U.deepStrictEqual(pipe(O.some([1, 2]), productFlatten(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some([1, 2]), productFlatten(O.some(3))), O.some([1, 2, 3] as const))
  })

  it("liftSemigroup", () => {
    const liftSemigroup = _.liftSemigroup(O.NonEmptyApplicative)
    const S = liftSemigroup(string.Semigroup)
    U.deepStrictEqual(pipe(O.none, S.combine(O.none)), O.none)
    U.deepStrictEqual(pipe(O.none, S.combine(O.some("b"))), O.none)
    U.deepStrictEqual(pipe(O.some("a"), S.combine(O.none)), O.none)
    U.deepStrictEqual(pipe(O.some("a"), S.combine(O.some("b"))), O.some("ab"))

    U.deepStrictEqual(pipe(O.some("a"), S.combineMany([O.some("b"), O.some("c")])), O.some("abc"))
  })

  it("lift2", () => {
    const sum = _.lift2(O.NonEmptyApplicative)((a: number, b: number) => a + b)
    U.deepStrictEqual(sum(O.none, O.none), O.none)
    U.deepStrictEqual(sum(O.some(1), O.none), O.none)
    U.deepStrictEqual(sum(O.none, O.some(2)), O.none)
    U.deepStrictEqual(sum(O.some(1), O.some(2)), O.some(3))
  })

  it("lift3", () => {
    const sum = _.lift3(O.NonEmptyApplicative)((a: number, b: number, c: number) => a + b + c)
    U.deepStrictEqual(sum(O.none, O.none, O.none), O.none)
    U.deepStrictEqual(sum(O.some(1), O.none, O.none), O.none)
    U.deepStrictEqual(sum(O.none, O.some(2), O.none), O.none)
    U.deepStrictEqual(sum(O.none, O.none, O.some(3)), O.none)
    U.deepStrictEqual(sum(O.some(1), O.some(2), O.some(3)), O.some(6))
  })
})
