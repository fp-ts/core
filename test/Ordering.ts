import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "@fp-ts/core/Ordering"
import { deepStrictEqual } from "./util"

describe("Ordering", () => {
  it("combineMany", () => {
    deepStrictEqual(pipe(0, _.Monoid.combineMany([1, -1])), 1)
    deepStrictEqual(pipe(1, _.Monoid.combineMany([-1, -1])), 1)
  })

  it("match", () => {
    const f = _.match(
      () => "lt",
      () => "eq",
      () => "gt"
    )
    deepStrictEqual(f(-1), "lt")
    deepStrictEqual(f(0), "eq")
    deepStrictEqual(f(1), "gt")
  })

  it("reverse", () => {
    deepStrictEqual(_.reverse(-1), 1)
    deepStrictEqual(_.reverse(0), 0)
    deepStrictEqual(_.reverse(1), -1)
  })

  it("Semigroup", () => {
    deepStrictEqual(pipe(0, _.Semigroup.combine(0)), 0)
    deepStrictEqual(pipe(0, _.Semigroup.combine(1)), 1)
    deepStrictEqual(pipe(1, _.Semigroup.combine(-1)), 1)
    deepStrictEqual(pipe(-1, _.Semigroup.combine(1)), -1)

    deepStrictEqual(pipe(0, _.Semigroup.combineMany([])), 0)
    deepStrictEqual(pipe(1, _.Semigroup.combineMany([])), 1)
    deepStrictEqual(pipe(-1, _.Semigroup.combineMany([])), -1)
    deepStrictEqual(pipe(0, _.Semigroup.combineMany([0, 0, 0])), 0)
    deepStrictEqual(pipe(0, _.Semigroup.combineMany([0, 0, 1])), 1)
    deepStrictEqual(pipe(1, _.Semigroup.combineMany([0, 0, -1])), 1)
    deepStrictEqual(pipe(-1, _.Semigroup.combineMany([0, 0, 1])), -1)
  })
})
