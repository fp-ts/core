import type * as bounded from "@fp-ts/core/typeclass/Bounded"
import type { Monoid } from "@fp-ts/core/typeclass/Monoid"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import * as order from "@fp-ts/core/typeclass/Order"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"

const sum = (that: number) => (self: number): number => self + that

export const SemigroupSum: semigroup.Semigroup<number> = semigroup.fromCombine(sum)

export const MonoidSum: Monoid<number> = monoid.fromSemigroup(SemigroupSum, 0)

const multiply = (that: number) => (self: number): number => self * that

export const SemigroupMultiply: semigroup.Semigroup<number> = {
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

export const Order: order.Order<number> = order.fromCompare((that) =>
  (self) => self < that ? -1 : self > that ? 1 : 0
)

export const Bounded: bounded.Bounded<number> = {
  ...Order,
  maxBound: Infinity,
  minBound: -Infinity
}
