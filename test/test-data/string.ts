import * as monoid from "@fp-ts/core/typeclass/Monoid"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"
import type * as totalOrder from "@fp-ts/core/typeclass/TotalOrder"

export const Semigroup: semigroup.Semigroup<string> = semigroup.fromCombine((that) =>
  (self) => self + that
)

export const Monoid: monoid.Monoid<string> = monoid.fromSemigroup(Semigroup, "")

export const TotalOrder: totalOrder.TotalOrder<string> = {
  compare: (that) => (self) => self < that ? -1 : self > that ? 1 : 0
}
