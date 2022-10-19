import type { Monoid } from "@fp-ts/core/typeclass/Monoid"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import type * as semigroup from "@fp-ts/core/typeclass/Semigroup"
import * as totalOrder from "@fp-ts/core/typeclass/TotalOrder"

export const TotalOrder: totalOrder.TotalOrder<boolean> = totalOrder.fromCompare((that) =>
  (self) => self < that ? -1 : self > that ? 1 : 0
)

export const SemigroupAll: semigroup.Semigroup<boolean> = ({
  combine: (that) => (self) => self && that,
  combineMany: (collection) =>
    (self) => {
      if (self === false) {
        return false
      }
      for (const bool of collection) {
        if (bool === false) {
          return false
        }
      }
      return true
    }
})

export const SemigroupAny: semigroup.Semigroup<boolean> = {
  combine: (that) => (self) => self || that,
  combineMany: (collection) =>
    (self) => {
      if (self === true) {
        return true
      }
      for (const bool of collection) {
        if (bool === true) {
          return true
        }
      }
      return false
    }
}

export const MonoidAll: Monoid<boolean> = monoid.fromSemigroup(SemigroupAll, true)
