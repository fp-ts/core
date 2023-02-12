import * as S from "@fp-ts/core/Symbol"

describe.concurrent("Symbol", () => {
  it("isSymbol", () => {
    expect(S.isSymbol(Symbol.for("@fp-ts/core/test/a"))).toEqual(true)
    expect(S.isSymbol(1n)).toEqual(false)
    expect(S.isSymbol(1)).toEqual(false)
    expect(S.isSymbol("a")).toEqual(false)
    expect(S.isSymbol(true)).toEqual(false)
  })

  it("Equivalence", () => {
    const eq = S.Equivalence
    expect(eq(Symbol.for("@fp-ts/core/test/a"), Symbol.for("@fp-ts/core/test/a"))).toBe(true)
    expect(eq(Symbol.for("@fp-ts/core/test/a"), Symbol.for("@fp-ts/core/test/b"))).toBe(false)
  })
})
