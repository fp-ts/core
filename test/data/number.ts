import type * as bounded from "@fp-ts/core/Bounded"
import * as compare from "@fp-ts/core/Compare"
import type * as equals from "@fp-ts/core/Equals"
import type { Monoid } from "@fp-ts/core/Monoid"
import * as semigroup from "@fp-ts/core/Semigroup"

export const SemigroupSum: semigroup.Semigroup<number> = semigroup.fromBinary((x, y) => x + y)

export const MonoidSum: Monoid<number> = {
  ...SemigroupSum,
  empty: 0
}

export const Compare: compare.Compare<number> = compare.fromCompare((a1, a2) =>
  a1 < a2 ? -1 : a1 > a2 ? 1 : 0
)

export const Equals: equals.Equals<number> = {
  equals: (n1, n2) => n1 === n2
}

export const Bounded: bounded.Bounded<number> = {
  ...Compare,
  top: Infinity,
  bottom: -Infinity
}
