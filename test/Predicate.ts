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
    expect(_.tupled).exist
    expect(_.bindTo).exist

    expect(_.Contravariant).exist
    expect(_.contramap).exist

    expect(_.Of).exist
    expect(_.of).exist
    expect(_.unit).exist
    expect(_.Do).exist

    expect(_.SemiProduct).exist
    expect(_.andThenBind).exist
    expect(_.appendElement).exist

    expect(_.Product).exist
    expect(_.tuple).exist
    expect(_.struct).exist
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
    const product = _.SemiProduct.product
    const p = product(isPositive, isNegative)
    deepStrictEqual(p([1, -1]), true)
    deepStrictEqual(p([1, 1]), false)
    deepStrictEqual(p([-1, -1]), false)
    deepStrictEqual(p([-1, 1]), false)
  })

  it("productMany", () => {
    const productMany = _.SemiProduct.productMany
    const p = productMany(isPositive, [isNegative])
    deepStrictEqual(p([1, -1]), true)
    deepStrictEqual(p([1, 1]), false)
    deepStrictEqual(p([-1, -1]), false)
    deepStrictEqual(p([-1, 1]), false)
  })

  it("productAll", () => {
    const p = _.productAll([isPositive, isNegative])
    deepStrictEqual(p([1]), true)
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
    const p1 = S.combine(isPositive, isNegative)
    deepStrictEqual(p1(0), false)
    deepStrictEqual(p1(-1), true)
    deepStrictEqual(p1(1), true)
    const p2 = S.combineMany(isPositive, [isNegative])
    deepStrictEqual(p2(0), false)
    deepStrictEqual(p2(-1), true)
    deepStrictEqual(p2(1), true)
  })

  it("getMonoidAny", () => {
    const M = _.getMonoidAny<number>()
    const predicate = M.combine(isPositive, M.empty)
    deepStrictEqual(predicate(0), isPositive(0))
    deepStrictEqual(predicate(-1), isPositive(-1))
    deepStrictEqual(predicate(1), isPositive(1))
  })

  it("getSemigroupAll", () => {
    const S = _.getSemigroupAll<number>()
    const p1 = S.combine(isPositive, isLessThan2)
    deepStrictEqual(p1(0), false)
    deepStrictEqual(p1(-2), false)
    deepStrictEqual(p1(1), true)
    const p2 = S.combineMany(isPositive, [isLessThan2])
    deepStrictEqual(p2(0), false)
    deepStrictEqual(p2(-2), false)
    deepStrictEqual(p2(1), true)
  })

  it("getMonoidAll", () => {
    const M = _.getMonoidAll<number>()
    const predicate = M.combine(isPositive, M.empty)
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

  it("isFunction", () => {
    assert.deepStrictEqual(_.isFunction(_.isFunction), true)
    assert.deepStrictEqual(_.isFunction("function"), false)
  })

  it("isUndefined", () => {
    assert.deepStrictEqual(_.isUndefined(undefined), true)
    assert.deepStrictEqual(_.isUndefined(null), false)
    assert.deepStrictEqual(_.isUndefined("undefined"), false)
  })

  it("isNotUndefined", () => {
    assert.deepStrictEqual(_.isNotUndefined(undefined), false)
    assert.deepStrictEqual(_.isNotUndefined(null), true)
    assert.deepStrictEqual(_.isNotUndefined("undefined"), true)
  })

  it("isNull", () => {
    assert.deepStrictEqual(_.isNull(null), true)
    assert.deepStrictEqual(_.isNull(undefined), false)
    assert.deepStrictEqual(_.isNull("null"), false)
  })

  it("isNotNull", () => {
    assert.deepStrictEqual(_.isNotNull(null), false)
    assert.deepStrictEqual(_.isNotNull(undefined), true)
    assert.deepStrictEqual(_.isNotNull("null"), true)
  })

  it("isNever", () => {
    assert.deepStrictEqual(_.isNever(null), false)
    assert.deepStrictEqual(_.isNever(undefined), false)
    assert.deepStrictEqual(_.isNever({}), false)
    assert.deepStrictEqual(_.isNever([]), false)
  })

  it("isUnknown", () => {
    assert.deepStrictEqual(_.isUnknown(null), true)
    assert.deepStrictEqual(_.isUnknown(undefined), true)
    assert.deepStrictEqual(_.isUnknown({}), true)
    assert.deepStrictEqual(_.isUnknown([]), true)
  })

  it("isObject", () => {
    assert.deepStrictEqual(_.isObject({}), true)
    assert.deepStrictEqual(_.isObject([]), true)
    assert.deepStrictEqual(_.isObject(null), false)
    assert.deepStrictEqual(_.isObject(undefined), false)
  })

  it("isNullable", () => {
    assert.deepStrictEqual(_.isNullable(null), true)
    assert.deepStrictEqual(_.isNullable(undefined), true)
    assert.deepStrictEqual(_.isNullable({}), false)
    assert.deepStrictEqual(_.isNullable([]), false)
  })

  it("isNotNullable", () => {
    assert.deepStrictEqual(_.isNotNullable({}), true)
    assert.deepStrictEqual(_.isNotNullable([]), true)
    assert.deepStrictEqual(_.isNotNullable(null), false)
    assert.deepStrictEqual(_.isNotNullable(undefined), false)
  })

  it("isError", () => {
    assert.deepStrictEqual(_.isError(new Error()), true)
    assert.deepStrictEqual(_.isError(null), false)
    assert.deepStrictEqual(_.isError({}), false)
  })

  it("isDate", () => {
    assert.deepStrictEqual(_.isDate(new Date()), true)
    assert.deepStrictEqual(_.isDate(null), false)
    assert.deepStrictEqual(_.isDate({}), false)
  })

  it("isRecord", () => {
    assert.deepStrictEqual(_.isRecord({}), true)
    assert.deepStrictEqual(_.isRecord({ a: 1 }), true)

    assert.deepStrictEqual(_.isRecord([]), false)
    assert.deepStrictEqual(_.isRecord([1, 2, 3]), false)
    assert.deepStrictEqual(_.isRecord(null), false)
    assert.deepStrictEqual(_.isRecord(undefined), false)
  })

  it("isReadonlyRecord", () => {
    assert.deepStrictEqual(_.isReadonlyRecord({}), true)
    assert.deepStrictEqual(_.isReadonlyRecord({ a: 1 }), true)

    assert.deepStrictEqual(_.isReadonlyRecord([]), false)
    assert.deepStrictEqual(_.isReadonlyRecord([1, 2, 3]), false)
    assert.deepStrictEqual(_.isReadonlyRecord(null), false)
    assert.deepStrictEqual(_.isReadonlyRecord(undefined), false)
  })
})
