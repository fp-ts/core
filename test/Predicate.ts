import { pipe } from "@fp-ts/core/Function"
import * as _ from "@fp-ts/core/Predicate"
import { deepStrictEqual } from "@fp-ts/core/test/util"

const isPositive: _.Predicate<number> = (n) => n > 0
const isNegative: _.Predicate<number> = (n) => n < 0
const isLessThan2: _.Predicate<number> = (n) => n < 2
const isString: _.Refinement<unknown, string> = (u: unknown): u is string => typeof u === "string"

interface NonEmptyStringBrand {
  readonly NonEmptyString: unique symbol
}

type NonEmptyString = string & NonEmptyStringBrand

const NonEmptyString: _.Refinement<string, NonEmptyString> = (s): s is NonEmptyString =>
  s.length > 0

describe.concurrent("Predicate", () => {
  it("instances and derived exports", () => {
    expect(_.Invariant).exist
    expect(_.imap).exist
    expect(_.tupled).exist
    expect(_.bindTo).exist

    expect(_.Contravariant).exist
    expect(_.contramap).exist

    expect(_.Of).exist
    expect(_.of).exist
    expect(_.unit).exist
    expect(_.Do).exist

    expect(_.SemiProduct).exist
    expect(_.product).exist
    expect(_.productMany).exist
    expect(_.andThenBind).exist
    expect(_.productFlatten).exist

    expect(_.Product).exist
    expect(_.productAll).exist
    expect(_.tuple).exist
    expect(_.struct).exist
  })

  it("id", () => {
    const refinement = _.id<string>()
    deepStrictEqual(refinement("a"), true)
  })

  it("compose", () => {
    const refinement = pipe(isString, _.compose(NonEmptyString))
    deepStrictEqual(refinement("a"), true)
    deepStrictEqual(refinement(null), false)
    deepStrictEqual(refinement(""), false)
  })

  it("contramap", () => {
    type A = {
      readonly a: number
    }
    const predicate = pipe(
      isPositive,
      _.contramap((a: A) => a.a)
    )
    deepStrictEqual(predicate({ a: -1 }), false)
    deepStrictEqual(predicate({ a: 0 }), false)
    deepStrictEqual(predicate({ a: 1 }), true)
  })

  it("product", () => {
    const p = pipe(isPositive, _.product(isNegative))
    deepStrictEqual(p([1, -1]), true)
    deepStrictEqual(p([1, 1]), false)
    deepStrictEqual(p([-1, -1]), false)
    deepStrictEqual(p([-1, 1]), false)
  })

  it("productMany", () => {
    const p = pipe(isPositive, _.productMany([isNegative]))
    deepStrictEqual(p([1, -1]), true)
    deepStrictEqual(p([1, 1]), false)
    deepStrictEqual(p([-1, -1]), false)
    deepStrictEqual(p([-1, 1]), false)
  })

  it("productAll", () => {
    const p = _.productAll([isPositive, isNegative])
    deepStrictEqual(p([1, -1]), true)
    deepStrictEqual(p([1, 1]), false)
    deepStrictEqual(p([-1, -1]), false)
    deepStrictEqual(p([-1, 1]), false)
  })

  it("not", () => {
    const p = _.not(isPositive)
    deepStrictEqual(p(1), false)
    deepStrictEqual(p(0), true)
    deepStrictEqual(p(-1), true)
  })

  it("or", () => {
    const p = pipe(isPositive, _.or(isNegative))
    deepStrictEqual(p(-1), true)
    deepStrictEqual(p(1), true)
    deepStrictEqual(p(0), false)
  })

  it("and", () => {
    const p = pipe(isPositive, _.and(isLessThan2))
    deepStrictEqual(p(1), true)
    deepStrictEqual(p(-1), false)
    deepStrictEqual(p(3), false)
  })

  it("getSemigroupAny", () => {
    const S = _.getSemigroupAny<number>()
    const predicate = pipe(isPositive, S.combine(isNegative))
    deepStrictEqual(predicate(0), false)
    deepStrictEqual(predicate(-1), true)
    deepStrictEqual(predicate(1), true)
  })

  it("getMonoidAny", () => {
    const M = _.getMonoidAny<number>()
    const predicate = pipe(isPositive, M.combine(M.empty))
    deepStrictEqual(predicate(0), isPositive(0))
    deepStrictEqual(predicate(-1), isPositive(-1))
    deepStrictEqual(predicate(1), isPositive(1))
  })

  it("getSemigroupAll", () => {
    const S = _.getSemigroupAll<number>()
    const predicate = pipe(isPositive, S.combine(isLessThan2))
    deepStrictEqual(predicate(0), false)
    deepStrictEqual(predicate(-2), false)
    deepStrictEqual(predicate(1), true)
  })

  it("getMonoidAll", () => {
    const M = _.getMonoidAll<number>()
    const predicate = pipe(isPositive, M.combine(M.empty))
    deepStrictEqual(predicate(0), isPositive(0))
    deepStrictEqual(predicate(-1), isPositive(-1))
    deepStrictEqual(predicate(1), isPositive(1))
  })

  it("any", () => {
    const predicate = _.any([isPositive, isNegative])
    deepStrictEqual(predicate(0), false)
    deepStrictEqual(predicate(-1), true)
    deepStrictEqual(predicate(1), true)
  })

  it("all", () => {
    const predicate = _.all([isPositive, isLessThan2])
    deepStrictEqual(predicate(0), false)
    deepStrictEqual(predicate(-2), false)
    deepStrictEqual(predicate(1), true)
  })
})
