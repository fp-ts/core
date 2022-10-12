import * as foldable from "@fp-ts/core/Foldable"
import type { TypeLambda } from "@fp-ts/core/HKT"
import type { Monoid } from "@fp-ts/core/Monoid"
import * as semigroup from "@fp-ts/core/Semigroup"
import * as U from "./util"

export interface ReadonlyArrayTypeLambda extends TypeLambda {
  readonly type: ReadonlyArray<this["Out1"]>
}

const FoldableReadonlyArray: foldable.Foldable<ReadonlyArrayTypeLambda> = {
  reduce: (b, f) => self => self.reduce((b, a) => f(b, a), b),
  reduceRight: (b, f) => self => self.reduceRight((b, a) => f(b, a), b)
}

export const MonoidSum: Monoid<number> = {
  ...semigroup.fromCombine((a1, a2) => a1 + a2),
  empty: 0
}

describe("Foldable", () => {
  it("foldMap", () => {
    const foldMap = foldable.foldMap(FoldableReadonlyArray)
    U.deepStrictEqual(foldMap(MonoidSum)(U.double)([1, 2, 3]), 12)
  })
})
