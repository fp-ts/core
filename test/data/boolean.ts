import type { Monoid } from "@fp-ts/core/Monoid"
import * as monoid from "@fp-ts/core/Monoid"
import type * as semigroup from "@fp-ts/core/Semigroup"
import * as compare from "@fp-ts/core/Sortable"

export const Compare: compare.Sortable<boolean> = compare.fromBinary((a1, a2) =>
  a1 < a2 ? -1 : a1 > a2 ? 1 : 0
)

export const SemigroupAll: semigroup.Semigroup<boolean> = ({
  combine2: (b1, b2) => b1 && b2,
  combine: (start, all) => {
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
})

export const SemigroupAny: semigroup.Semigroup<boolean> = {
  combine2: (b1, b2) => b1 || b2,
  combine: (start, all) => {
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
}

export const MonoidAll: Monoid<boolean> = monoid.fromSemigroup(SemigroupAll, true)
