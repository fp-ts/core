import * as monoid from "@fp-ts/core/typeclass/Monoid"
import type * as order from "@fp-ts/core/typeclass/Order"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"

export const Semigroup: semigroup.Semigroup<string> = semigroup.fromCombine((that) =>
  (self) => self + that
)

export const Monoid: monoid.Monoid<string> = monoid.fromSemigroup(Semigroup, "")

export const Order: order.Order<string> = {
  compare: (that) => (self) => self < that ? -1 : self > that ? 1 : 0
}
