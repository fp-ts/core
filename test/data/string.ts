import type * as compare from "@fp-ts/core/Compare"
import type * as monoid from "@fp-ts/core/Monoid"
import * as semigroup from "@fp-ts/core/Semigroup"
import type * as show from "@fp-ts/core/Show"

export const Semigroup: semigroup.Semigroup<string> = semigroup.fromBinary((x, y) => x + y)

export const Monoid: monoid.Monoid<string> = {
  ...Semigroup,
  empty: ""
}

export const Show: show.Show<string> = {
  show: (s) => JSON.stringify(s)
}

export const Compare: compare.Compare<string> = {
  compare: (s1, s2) => s1 < s2 ? -1 : s1 > s2 ? 1 : 0
}
