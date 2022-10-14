import * as _ from "@fp-ts/core/Ordering"
import { deepStrictEqual } from "./util"

describe("Ordering", () => {
  it("Semigroup", () => {
    deepStrictEqual(_.Monoid.combine(0, [1, -1]), 1)
    deepStrictEqual(_.Monoid.combine(1, [-1, -1]), 1)
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

  it("sign", () => {
    deepStrictEqual(_.sign(10), 1)
    deepStrictEqual(_.sign(0), 0)
    deepStrictEqual(_.sign(-10), -1)
  })
})
