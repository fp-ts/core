import * as bounded from "@fp-ts/core/Bounded"
import type { Monoid } from "@fp-ts/core/Monoid"
import * as monoid from "@fp-ts/core/Monoid"
import * as semigroup from "@fp-ts/core/Semigroup"
import * as compare from "@fp-ts/core/Sortable"

export const sum = (first: number, second: number): number => first + second

export const SemigroupSum: semigroup.Semigroup<number> = semigroup.fromCombine(sum)

export const MonoidSum: Monoid<number> = monoid.fromSemigroup(SemigroupSum, 0)

export const multiply = (first: number, second: number): number => first * second

export const SemigroupMultiply: semigroup.Semigroup<number> = {
  combine: multiply,
  combineMany: (start, others) => {
    let multiplication: number = start
    if (multiplication === 0) {
      return 0
    }
    for (const n of others) {
      if (n === 0) {
        return 0
      }
      multiplication = multiplication * n
    }
    return multiplication
  }
}

export const Compare: compare.Sortable<number> = compare.fromCompare((a1, a2) =>
  a1 < a2 ? -1 : a1 > a2 ? 1 : 0
)

export const Bounded: bounded.Bounded<number> = bounded.fromSortable(Compare, Infinity, -Infinity)
