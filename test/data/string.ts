import * as semigroup from "@fp-ts/core/Semigroup"

export const Semigroup: semigroup.Semigroup<string> = semigroup.fromCombine((x, y) => x + y)
