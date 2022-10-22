import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "@fp-ts/core/typeclass/Contravariant"
import * as order from "@fp-ts/core/typeclass/Order"
import * as string from "../test-data/string"
import * as U from "../util"

describe("Contravariant", () => {
  it("imap", () => {
    const O = _.imap<order.OrderTypeLambda>(order.contramap)(
      (s: string) => [s] as const,
      ([s]) => s
    )(
      string.Order
    )
    U.deepStrictEqual(pipe(["a"], O.compare(["b"])), -1)
    U.deepStrictEqual(pipe(["a"], O.compare(["a"])), 0)
    U.deepStrictEqual(pipe(["b"], O.compare(["a"])), 1)
  })
})
