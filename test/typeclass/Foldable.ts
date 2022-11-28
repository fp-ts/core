import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "@fp-ts/core/typeclass/Foldable"
import * as number from "../data/number"
import * as O from "../data/Option"
import * as RA from "../data/ReadonlyArray"
import * as U from "../util"

describe("Foldable", () => {
  it("reduceComposition", () => {
    const reduce = _.reduceComposition(RA.Foldable, RA.Foldable)
    const f = (b: string, a: string) => b + a
    U.deepStrictEqual(pipe([], reduce("-", f)), "-")
    U.deepStrictEqual(pipe([[]], reduce("-", f)), "-")
    U.deepStrictEqual(pipe([["a", "c"], ["b", "d"]], reduce("-", f)), "-acbd")
  })

  it("toReadonlyArray", () => {
    const toReadonlyArray = _.toReadonlyArray(O.Foldable)
    U.deepStrictEqual(toReadonlyArray(O.none), [])
    U.deepStrictEqual(toReadonlyArray(O.some(2)), [2])
  })

  it("toReadonlyArrayWith", () => {
    const toReadonlyArrayWith = _.toReadonlyArrayWith(O.Foldable)
    U.deepStrictEqual(pipe(O.none, toReadonlyArrayWith(U.double)), [])
    U.deepStrictEqual(pipe(O.some(2), toReadonlyArrayWith(U.double)), [4])
  })

  it("foldMap", () => {
    const foldMap = _.foldMap(RA.Foldable)
    U.deepStrictEqual(pipe([1, 2, 3], foldMap(number.MonoidSum)(U.double)), 12)
  })

  it("reduceRight", () => {
    const reduceRight = _.reduceRight(RA.Foldable)
    U.deepStrictEqual(pipe(["a", "b", "c"], reduceRight("-", (b, a) => b + a)), "-cba")
  })

  it("reduceKind", () => {
    const reduceKind = _.reduceKind(RA.Foldable)(O.Monad)
    U.deepStrictEqual(pipe([], reduceKind("-", () => O.none)), O.some("-"))
    U.deepStrictEqual(pipe(["a"], reduceKind("-", () => O.none)), O.none)
    U.deepStrictEqual(
      pipe(["a", "b", "c"], reduceKind("-", (b, a) => O.some(b + a))),
      O.some("-abc")
    )
    U.deepStrictEqual(
      pipe(["a", "b", "c"], reduceKind("-", (b, a) => a === "b" ? O.none : O.some(b + a))),
      O.none
    )
  })

  it("reduceRightKind", () => {
    const reduceRightKind = _.reduceRightKind(RA.Foldable)(O.Monad)
    U.deepStrictEqual(pipe([], reduceRightKind("-", () => O.none)), O.some("-"))
    U.deepStrictEqual(pipe(["a"], reduceRightKind("-", () => O.none)), O.none)
    U.deepStrictEqual(
      pipe(["a", "b", "c"], reduceRightKind("-", (b, a) => O.some(b + a))),
      O.some("-cba")
    )
    U.deepStrictEqual(
      pipe(["a", "b", "c"], reduceRightKind("-", (b, a) => a === "b" ? O.none : O.some(b + a))),
      O.none
    )
  })

  it("foldMapKind", () => {
    const foldMapKind = _.foldMapKind(RA.Foldable)(O.Alternative)
    U.deepStrictEqual(pipe([], foldMapKind(() => O.none)), O.none)
    U.deepStrictEqual(pipe(["a"], foldMapKind(() => O.none)), O.none)
    U.deepStrictEqual(pipe(["a", "b", "c"], foldMapKind((a) => O.some(a))), O.some("a"))
    U.deepStrictEqual(
      pipe(["a", "b", "c"], foldMapKind((a) => a === "b" ? O.none : O.some(a))),
      O.some("a")
    )
  })
})
