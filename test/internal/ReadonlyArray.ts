import * as _ from "@fp-ts/core/internal/ReadonlyArray"
import * as U from "../util"

describe("ReadonlyArray", () => {
  it("fromIterable", () => {
    const as = [1, 2, 3]
    U.strictEqual(_.fromIterable(as), as)
    U.deepStrictEqual(_.fromIterable(new Set(as)), [1, 2, 3])
  })
})
