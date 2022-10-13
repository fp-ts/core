import * as compare from "@fp-ts/core/Compare"

export const Compare: compare.Compare<boolean> = compare.fromCompare((a1, a2) =>
  a1 < a2 ? -1 : a1 > a2 ? 1 : 0
)
