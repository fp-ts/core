import * as associative from "@fp-ts/core/typeclass/Associative"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import type * as totalOrder from "@fp-ts/core/typeclass/TotalOrder"

export const Associative: associative.Associative<string> = associative.fromCombine((that) =>
  (self) => self + that
)

export const Monoid: monoid.Monoid<string> = monoid.fromAssociative(Associative, "")

export const TotalOrder: totalOrder.TotalOrder<string> = {
  compare: (that) => (self) => self < that ? -1 : self > that ? 1 : 0
}
