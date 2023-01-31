import { pipe } from "@fp-ts/core/Function"
import * as S from "@fp-ts/core/Struct"

describe.concurrent("Struct", () => {
  it("exports", () => {
    expect(S.getEquivalence).exists
    expect(S.getOrder).exists
    expect(S.getSemigroup).exists
    expect(S.getMonoid).exists
  })

  it("pick", () => {
    expect(pipe({ a: "a", b: 1, c: true }, S.pick("a", "b"))).toEqual({ a: "a", b: 1 })
  })

  it("omit", () => {
    expect(pipe({ a: "a", b: 1, c: true }, S.omit("c"))).toEqual({ a: "a", b: 1 })
  })
})
