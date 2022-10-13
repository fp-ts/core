import * as compare from "@fp-ts/core/Compare"
import type { Monoid } from "@fp-ts/core/Monoid"
import * as semigroup from "@fp-ts/core/Semigroup"

export const Compare: compare.Compare<boolean> = compare.fromCompare((a1, a2) =>
  a1 < a2 ? -1 : a1 > a2 ? 1 : 0
)

export const SemigroupAll: semigroup.Semigroup<boolean> = semigroup.fromCombineAll(
  (head, tail) => {
    if (head === false) {
      return false
    }
    for (const n of tail) {
      if (n === false) {
        return false
      }
    }
    return true
  }
)

export const SemigroupAny: semigroup.Semigroup<boolean> = semigroup.fromCombineAll(
  (head, tail) => {
    if (head === true) {
      return true
    }
    for (const b of tail) {
      if (b === true) {
        return true
      }
    }
    return false
  }
)

export const MonoidAll: Monoid<boolean> = {
  ...SemigroupAll,
  empty: true
}
