import type * as foldable from "@fp-ts/core/Foldable"
import type * as foldableWithIndex from "@fp-ts/core/FoldableWithIndex"
import type { TypeLambda } from "@fp-ts/core/HKT"

export interface ReadonlyArrayTypeLambda extends TypeLambda {
  readonly type: ReadonlyArray<this["Out1"]>
}

export const FoldableReadonlyArray: foldable.Foldable<ReadonlyArrayTypeLambda> = {
  reduce: (b, f) => self => self.reduce((b, a) => f(b, a), b),
  reduceRight: (b, f) => self => self.reduceRight((b, a) => f(b, a), b)
}

export const FoldableWithIndexReadonlyArray: foldableWithIndex.FoldableWithIndex<
  ReadonlyArrayTypeLambda,
  number
> = {
  reduceWithIndex: (b, f) => self => self.reduce((b, a, i) => f(b, a, i), b),
  reduceRightWithIndex: (b, f) => self => self.reduceRight((b, a, i) => f(b, a, i), b)
}
