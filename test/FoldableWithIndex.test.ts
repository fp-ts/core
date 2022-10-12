import * as foldableWithIndex from "@fp-ts/core/FoldableWithIndex"
import { pipe } from "@fp-ts/core/Function"
import type { TypeLambda } from "@fp-ts/core/HKT"
import type { Monoid } from "@fp-ts/core/Monoid"
import * as semigroup from "@fp-ts/core/Semigroup"
import * as U from "./util"

export interface ReadonlyArrayTypeLambda extends TypeLambda {
  readonly type: ReadonlyArray<this["Out1"]>
}

const FoldableWithIndexReadonlyArray: foldableWithIndex.FoldableWithIndex<
  ReadonlyArrayTypeLambda,
  number
> = {
  reduceWithIndex: (b, f) => self => self.reduce((b, a, i) => f(b, a, i), b),
  reduceRightWithIndex: (b, f) => self => self.reduceRight((b, a, i) => f(b, a, i), b)
}

export const MonoidSum: Monoid<number> = {
  ...semigroup.fromCombine((a1, a2) => a1 + a2),
  empty: 0
}

describe("Foldable", () => {
  it("foldMap", () => {
    const foldMapWithIndex = foldableWithIndex.foldMapWithIndex(FoldableWithIndexReadonlyArray)
    U.deepStrictEqual(pipe([1, 2, 3], foldMapWithIndex(MonoidSum)((n, i) => (n * 2) + i)), 15)
  })
})
