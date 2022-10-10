import * as N from "@fp-ts/core/number"
import * as S from "@fp-ts/core/string"
import * as _ from "@fp-ts/core/typeclasses/Show"
import * as U from "../util"

describe("Show", () => {
  it("struct", () => {
    U.deepStrictEqual(_.struct({ a: S.Show }).show({ a: "a" }), "{ a: \"a\" }")
    U.deepStrictEqual(
      _.struct({ a: S.Show, b: N.Show }).show({ a: "a", b: 1 }),
      "{ a: \"a\", b: 1 }"
    )
    // should ignore non own properties
    const shows = Object.create({ a: 1 })
    const s = _.struct(shows)
    U.deepStrictEqual(s.show({}), "{}")
  })

  it("tuple", () => {
    const Sh = _.tuple(S.Show, N.Show)
    U.deepStrictEqual(Sh.show(["a", 1]), "[\"a\", 1]")
  })
})
