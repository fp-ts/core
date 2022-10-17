import * as bounded from "@fp-ts/core/Bounded"
import type { Monoid } from "@fp-ts/core/Monoid"
import * as monoid from "@fp-ts/core/Monoid"
import * as semigroup from "@fp-ts/core/Semigroup"
import * as sortable from "@fp-ts/core/Sortable"

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

export const Sortable: sortable.Sortable<number> = sortable.fromCompare((that) =>
  (self) => self < that ? -1 : self > that ? 1 : 0
)

export const Bounded: bounded.Bounded<number> = bounded.fromSortable(Sortable, -Infinity, Infinity)
