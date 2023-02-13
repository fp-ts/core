import { pipe } from "@fp-ts/core/Function"
import * as T from "@fp-ts/core/Tuple"

describe.concurrent("Tuple", () => {
  it("exports", () => {
    expect(T.Bicovariant).exists
    expect(T.mapFirst).exists
    expect(T.mapSecond).exists
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

  it("getFirst", () => {
    expect(T.getFirst(T.tuple("a", 1))).toEqual("a")
  })

  it("getSecond", () => {
    expect(T.getSecond(T.tuple("a", 1))).toEqual(1)
  })

  it("bimap", () => {
    expect(T.bimap(T.tuple("a", 1), s => s + "!", n => n * 2)).toEqual(["a!", 2])
  })

  it("swap", () => {
    expect(T.swap(T.tuple("a", 1))).toEqual([1, "a"])
  })
})
