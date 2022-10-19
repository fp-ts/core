import * as _ from "@fp-ts/core/data/TotalOrdering"
import { pipe } from "@fp-ts/core/internal/Function"
import { deepStrictEqual } from "../util"

describe("TotalOrdering", () => {
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

  it("Associative", () => {
    deepStrictEqual(pipe(0, _.Associative.combine(0)), 0)
    deepStrictEqual(pipe(0, _.Associative.combine(1)), 1)
    deepStrictEqual(pipe(1, _.Associative.combine(-1)), 1)
    deepStrictEqual(pipe(-1, _.Associative.combine(1)), -1)

    deepStrictEqual(pipe(0, _.Associative.combineMany([])), 0)
    deepStrictEqual(pipe(1, _.Associative.combineMany([])), 1)
    deepStrictEqual(pipe(-1, _.Associative.combineMany([])), -1)
    deepStrictEqual(pipe(0, _.Associative.combineMany([0, 0, 0])), 0)
    deepStrictEqual(pipe(0, _.Associative.combineMany([0, 0, 1])), 1)
    deepStrictEqual(pipe(1, _.Associative.combineMany([0, 0, -1])), 1)
    deepStrictEqual(pipe(-1, _.Associative.combineMany([0, 0, 1])), -1)
  })

  it("Monoid", () => {
    deepStrictEqual(pipe(_.Monoid.empty, _.Monoid.combine(0)), 0)
    deepStrictEqual(pipe(_.Monoid.empty, _.Monoid.combine(1)), 1)
    deepStrictEqual(pipe(_.Monoid.empty, _.Monoid.combine(-1)), -1)
    deepStrictEqual(pipe(0, _.Monoid.combine(_.Monoid.empty)), 0)
    deepStrictEqual(pipe(1, _.Monoid.combine(_.Monoid.empty)), 1)
    deepStrictEqual(pipe(-1, _.Monoid.combine(_.Monoid.empty)), -1)
  })
})
