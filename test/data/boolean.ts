import * as compare from "@fp-ts/core/Comparable"
import type { Monoid } from "@fp-ts/core/Monoid"
import * as monoid from "@fp-ts/core/Monoid"
import * as semigroup from "@fp-ts/core/Semigroup"

export const Compare: compare.Comparable<boolean> = compare.fromCompare((a1, a2) =>
  a1 < a2 ? -1 : a1 > a2 ? 1 : 0
)

export const SemigroupAll: semigroup.Semigroup<boolean> = semigroup.fromCombineAllWith(
  (start, all) => {
    if (start === false) {
      return false
    }
    for (const n of all) {
      if (n === false) {
        return false
      }
    }
    return true
  }
)

export const SemigroupAny: semigroup.Semigroup<boolean> = semigroup.fromCombineAllWith(
  (start, all) => {
    if (start === true) {
      return true
    }
    for (const b of all) {
      if (b === true) {
        return true
      }
    }
    return false
  }
)

export const MonoidAll: Monoid<boolean> = monoid.fromSemigroup(SemigroupAll, true)
