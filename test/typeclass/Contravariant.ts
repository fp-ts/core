import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "@fp-ts/core/typeclass/Contravariant"
import * as totalOrder from "@fp-ts/core/typeclass/TotalOrder"
import * as string from "../test-data/string"
import * as U from "../util"

describe("Contravariant", () => {
  it("imap", () => {
    const TotalOrder = _.imap(totalOrder.Contravariant)((s: string) => [s] as const, ([s]) => s)(
      string.TotalOrder
    )
    U.deepStrictEqual(pipe(["a"], TotalOrder.compare(["b"])), -1)
    U.deepStrictEqual(pipe(["a"], TotalOrder.compare(["a"])), 0)
    U.deepStrictEqual(pipe(["b"], TotalOrder.compare(["a"])), 1)
  })
})
