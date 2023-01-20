import { pipe } from "@fp-ts/core/Function"
import * as S from "@fp-ts/core/Struct"

describe.concurrent("Struct", () => {
  it("pick", () => {
    expect(pipe({ a: "a", b: 1, c: true }, S.pick("a", "b"))).toEqual({ a: "a", b: 1 })
  })

  it("omit", () => {
    expect(pipe({ a: "a", b: 1, c: true }, S.omit("c"))).toEqual({ a: "a", b: 1 })
  })
})
