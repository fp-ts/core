import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "@fp-ts/core/typeclass/Invariant"
import * as totalOrder from "@fp-ts/core/typeclass/TotalOrder"
import * as string from "../test-data/string"
import * as U from "../util"

describe("Contravariant", () => {
  it("invmap", () => {
    const Invariant = totalOrder.Invariant
    const equivalence = Invariant.invmap({
      to: (a: string): [string] => [a],
      from: (as) => as[0]
    })
    const TotalOrder = equivalence.to(string.TotalOrder)
    U.deepStrictEqual(pipe(["a"], TotalOrder.compare(["a"])), 0)
  })
})
