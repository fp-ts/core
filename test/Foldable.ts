import * as foldable from "@fp-ts/core/Foldable"
import { pipe } from "@fp-ts/core/internal/Function"
import * as number from "./data/number"
import * as O from "./data/Option"
import * as RA from "./data/ReadonlyArray"
import * as U from "./util"

describe("Foldable", () => {
  it("reduceComposition", () => {
    const reduce = foldable.reduceComposition(RA.Foldable, RA.Foldable)
    const f = (b: string, a: string) => b + a
    U.deepStrictEqual(pipe([], reduce("-", f)), "-")
    U.deepStrictEqual(pipe([[]], reduce("-", f)), "-")
    U.deepStrictEqual(pipe([["a", "c"], ["b", "d"]], reduce("-", f)), "-acbd")
  })

  it("reduceRightComposition", () => {
    const reduceRight = foldable.reduceRightComposition(RA.Foldable, RA.Foldable)
    const f = (b: string, a: string) => b + a
    U.deepStrictEqual(pipe([], reduceRight("-", f)), "-")
    U.deepStrictEqual(pipe([[]], reduceRight("-", f)), "-")
    U.deepStrictEqual(
      pipe([["a", "c"], ["b", "d"]], reduceRight("-", f)),
      "-dbca"
    )
  })

  it("toReadonlyArray", () => {
    const toReadonlyArray = foldable.toReadonlyArray(O.Foldable)
    U.deepStrictEqual(toReadonlyArray(O.none), [])
    U.deepStrictEqual(toReadonlyArray(O.some(2)), [2])
  })

  it("toReadonlyArrayWith", () => {
    const toReadonlyArrayWith = foldable.toReadonlyArrayWith(O.Foldable)
    U.deepStrictEqual(pipe(O.none, toReadonlyArrayWith(U.double)), [])
    U.deepStrictEqual(pipe(O.some(2), toReadonlyArrayWith(U.double)), [4])
  })

  it("foldMap", () => {
    const foldMap = foldable.foldMap(RA.Foldable)
    U.deepStrictEqual(pipe([1, 2, 3], foldMap(number.MonoidSum)(U.double)), 12)
  })
})
