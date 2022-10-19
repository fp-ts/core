import * as associative from "@fp-ts/core/typeclass/Associative"
import * as boundedTotalOrder from "@fp-ts/core/typeclass/BoundedTotalOrder"
import type { Monoid } from "@fp-ts/core/typeclass/Monoid"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import * as totalOrder from "@fp-ts/core/typeclass/TotalOrder"

const sum = (that: number) => (self: number): number => self + that

export const AssociativeSum: associative.Associative<number> = associative.fromCombine(sum)

export const MonoidSum: Monoid<number> = monoid.fromAssociative(AssociativeSum, 0)

const multiply = (that: number) => (self: number): number => self * that

export const AssociativeMultiply: associative.Associative<number> = {
  combine: multiply,
  combineMany: (collection) =>
    (self) => {
      let multiplication: number = self
      if (multiplication === 0) {
        return 0
      }
      for (const n of collection) {
        if (n === 0) {
          return 0
        }
        multiplication = multiplication * n
      }
      return multiplication
    }
}

export const TotalOrder: totalOrder.TotalOrder<number> = totalOrder.fromCompare((that) =>
  (self) => self < that ? -1 : self > that ? 1 : 0
)

export const BoundedTotalOrder: boundedTotalOrder.BoundedTotalOrder<number> = boundedTotalOrder
  .fromTotalOrder(
    TotalOrder,
    -Infinity,
    Infinity
  )
