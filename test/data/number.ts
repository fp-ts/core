import * as compare from "@fp-ts/core/Compare"
import type { Monoid } from "@fp-ts/core/Monoid"
import * as semigroup from "@fp-ts/core/Semigroup"

export const SemigroupSum: semigroup.Semigroup<number> = semigroup.fromCombine((x, y) => x + y)

export const MonoidSum: Monoid<number> = {
  ...semigroup.fromCombine((a1, a2) => a1 + a2),
  empty: 0
}

export const Compare: compare.Compare<number> = compare.fromCompare((a1, a2) =>
  a1 < a2 ? -1 : a1 > a2 ? 1 : 0
)
