import * as bounded from "@fp-ts/core/Bounded"
import type { Monoid } from "@fp-ts/core/Monoid"
import * as monoid from "@fp-ts/core/Monoid"
import * as semigroup from "@fp-ts/core/Semigroup"
import * as compare from "@fp-ts/core/Sortable"

export const sum = (n1: number, n2: number): number => n1 + n2

export const SemigroupSum: semigroup.Semigroup<number> = semigroup.fromBinary(sum)

export const MonoidSum: Monoid<number> = monoid.fromSemigroup(SemigroupSum, 0)

export const multiply = (n1: number, n2: number): number => n1 * n2

export const SemigroupMultiply: semigroup.Semigroup<number> = {
  combine2: multiply,
  combine: (start, all) => {
    let out: number = start
    if (out === 0) {
      return 0
    }
    for (const n of all) {
      if (n === 0) {
        return 0
      }
      out = out * n
    }
    return out
  }
}

export const Compare: compare.Sortable<number> = compare.fromBinary((a1, a2) =>
  a1 < a2 ? -1 : a1 > a2 ? 1 : 0
)

export const Bounded: bounded.Bounded<number> = bounded.fromSortable(Compare, Infinity, -Infinity)
