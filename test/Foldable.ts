import * as foldable from "@fp-ts/core/Foldable"
import { pipe } from "@fp-ts/core/internal/Function"
import * as number from "./data/number"
import * as O from "./data/Option"
import * as RA from "./data/ReadonlyArray"
import * as U from "./util"

describe("Foldable", () => {
  it("toReadonlyArrayWith", () => {
    const toReadonlyArrayWith = foldable.toReadonlyArrayWith(O.Foldable)
    U.deepStrictEqual(toReadonlyArrayWith(O.none, U.double), [])
    U.deepStrictEqual(toReadonlyArrayWith(O.some(2), U.double), [4])
  })

  it("foldMap", () => {
    const foldMap = foldable.foldMap(RA.Foldable)
    U.deepStrictEqual(pipe([1, 2, 3], foldMap(number.MonoidSum)(U.double)), 12)
  })
})
