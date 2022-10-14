import type * as compare from "@fp-ts/core/Comparable"
import * as monoid from "@fp-ts/core/Monoid"
import * as semigroup from "@fp-ts/core/Semigroup"
import type * as show from "@fp-ts/core/Show"

export const Semigroup: semigroup.Semigroup<string> = semigroup.fromBinary((x, y) => x + y)

export const Monoid: monoid.Monoid<string> = monoid.fromSemigroup(Semigroup, "")

export const Show: show.Show<string> = {
  show: (s) => JSON.stringify(s)
}

export const Compare: compare.Comparable<string> = {
  compare: (s1, s2) => s1 < s2 ? -1 : s1 > s2 ? 1 : 0
}
