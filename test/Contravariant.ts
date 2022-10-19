import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "@fp-ts/core/Invariant"
import * as sortable from "@fp-ts/core/Sortable"
import * as string from "./test-data/string"
import * as U from "./util"

describe("Contravariant", () => {
  it("invmap", () => {
    const Invariant = sortable.Invariant
    const equivalence = Invariant.invmap({
      to: (a: string): [string] => [a],
      from: (as) => as[0]
    })
    const Sortable = equivalence.to(string.Sortable)
    U.deepStrictEqual(pipe(["a"], Sortable.compare(["a"])), 0)
  })
})
