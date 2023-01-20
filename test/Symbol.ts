import * as S from "@fp-ts/core/Symbol"

describe.concurrent("Symbol", () => {
  it("isSymbol", () => {
    expect(S.isSymbol(Symbol.for("@fp-ts/core/test/a"))).toEqual(true)
    expect(S.isSymbol(1n)).toEqual(false)
    expect(S.isSymbol(1)).toEqual(false)
    expect(S.isSymbol("a")).toEqual(false)
    expect(S.isSymbol(true)).toEqual(false)
  })
})
