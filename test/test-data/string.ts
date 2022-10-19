import * as monoid from "@fp-ts/core/Monoid"
import * as semigroup from "@fp-ts/core/Semigroup"
import type * as sortable from "@fp-ts/core/Sortable"

export const Semigroup: semigroup.Semigroup<string> = semigroup.fromCombine((that) =>
  (self) => self + that
)

export const Monoid: monoid.Monoid<string> = monoid.fromSemigroup(Semigroup, "")

export const Sortable: sortable.Sortable<string> = {
  compare: (that) => (self) => self < that ? -1 : self > that ? 1 : 0
}
