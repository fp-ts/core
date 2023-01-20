import * as T from "@fp-ts/core/Tuple"

describe.concurrent("Tuple", () => {
  it("exports", () => {
    expect(T.element).exists
    expect(T.getEquivalence).exists
    expect(T.getOrder).exists
    expect(T.getSemigroup).exists
    expect(T.getMonoid).exists
    expect(T.nonEmptyProduct).exists
    expect(T.product).exists
  })

  it("tuple", () => {
    expect(T.tuple("a", 1, true)).toEqual(["a", 1, true])
  })
})
