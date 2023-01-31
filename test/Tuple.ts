import { pipe } from "@fp-ts/core/Function"
import * as T from "@fp-ts/core/Tuple"

describe.concurrent("Tuple", () => {
  it("exports", () => {
    expect(T.appendElement).exists
    expect(T.getEquivalence).exists
    expect(T.getOrder).exists
    expect(T.getSemigroup).exists
    expect(T.getMonoid).exists
  })

  it("tuple", () => {
    expect(T.tuple("a", 1, true)).toEqual(["a", 1, true])
  })

  it("appendElement", () => {
    expect(pipe(T.tuple("a", 1), T.appendElement(true))).toEqual(["a", 1, true])
  })
})
