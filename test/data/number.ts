import * as bounded from "@fp-ts/core/Bounded"
import * as compare from "@fp-ts/core/Comparable"
import type { Monoid } from "@fp-ts/core/Monoid"
import * as monoid from "@fp-ts/core/Monoid"
import * as semigroup from "@fp-ts/core/Semigroup"

export const SemigroupSum: semigroup.Semigroup<number> = semigroup.fromBinary((x, y) => x + y)

export const SemigroupMultiply: semigroup.Semigroup<number> = semigroup.fromCombineAllWith(
  (start, all) => {
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
)

export const MonoidSum: Monoid<number> = monoid.fromSemigroup(SemigroupSum, 0)

export const Compare: compare.Comparable<number> = compare.fromCompare((a1, a2) =>
  a1 < a2 ? -1 : a1 > a2 ? 1 : 0
)

export const Bounded: bounded.Bounded<number> = bounded.fromComparable(Compare, Infinity, -Infinity)
