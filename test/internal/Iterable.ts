import * as I from "@fp-ts/core/internal/Iterable"

describe.concurrent("internal/Iterable", () => {
  it("fromIterable/Array should return the same reference if the iterable is an Array", () => {
    const iterable = [1, 2, 3]
    expect(I.fromIterable(iterable) === iterable).toEqual(true)
  })

  it("fromIterable/Iterable", () => {
    expect(I.fromIterable(new Set([1, 2, 3]))).toEqual([1, 2, 3])
  })
})
