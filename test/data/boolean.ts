import * as compare from "@fp-ts/core/Compare"
import type { Monoid } from "@fp-ts/core/Monoid"
import * as semigroup from "@fp-ts/core/Semigroup"

export const Compare: compare.Compare<boolean> = compare.fromCompare((a1, a2) =>
  a1 < a2 ? -1 : a1 > a2 ? 1 : 0
)

export const SemigroupAll: semigroup.Semigroup<boolean> = semigroup.fromBinary((x, y) => x && y)

export const MonoidAll: Monoid<boolean> = {
  ...SemigroupAll,
  empty: true
}
