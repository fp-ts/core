import * as iterable from "@fp-ts/core/internal/Iterable"

describe.concurrent("internal/Iterable", () => {
  it("fromIterable/Array should return the same reference if the iterable is an Array", () => {
    const i = [1, 2, 3]
    expect(iterable.fromIterable(i) === i).toEqual(true)
  })

  it("fromIterable/Iterable", () => {
    expect(iterable.fromIterable(new Set([1, 2, 3]))).toEqual([1, 2, 3])
  })
})
