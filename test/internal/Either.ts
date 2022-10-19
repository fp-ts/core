import * as _ from "@fp-ts/core/internal/Either"
import * as U from "../util"

describe("Either", () => {
  it("isRight", () => {
    U.deepStrictEqual(_.isRight(_.right(1)), true)
    U.deepStrictEqual(_.isRight(_.left("e")), false)
  })

  it("isLeft", () => {
    U.deepStrictEqual(_.isLeft(_.right(1)), false)
    U.deepStrictEqual(_.isLeft(_.left("e")), true)
  })
})
