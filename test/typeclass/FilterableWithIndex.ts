import * as either from "@fp-ts/core/internal/Either"
import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "../limbo/FilterableWithIndex"
import * as O from "../test-data/Option"
import * as RA from "../test-data/ReadonlyArray"
import * as U from "../util"

describe("FilterableWithIndex", () => {
  it("filterMapWithIndexComposition", () => {
    const filterMapWithIndex = _.filterMapWithIndexComposition(RA.Covariant, RA.FilterableWithIndex)
    const f = filterMapWithIndex((s: string, i: number) =>
      s.length > 1 ? O.some(s.length + i) : O.none
    )
    U.deepStrictEqual(pipe([], f), [])
    U.deepStrictEqual(pipe([["a"]], f), [[]])
    U.deepStrictEqual(pipe([["aa"]], f), [[2]])
    U.deepStrictEqual(pipe([["aa"], ["b"]], f), [[2], []])
    U.deepStrictEqual(pipe([["aa"], ["bb"]], f), [[2], [2]])
    U.deepStrictEqual(pipe([["a", "aa"], ["bb"]], f), [[3], [2]])
  })

  it("filterWithIndex", () => {
    const filterWithIndex = _.filterWithIndex(RA.FilterableWithIndex)
    const f = filterWithIndex((n: number, i: number) => n + i > 0)
    U.deepStrictEqual(pipe([], f), [])
    U.deepStrictEqual(pipe([1], f), [1])
    U.deepStrictEqual(pipe([-1], f), [])
    U.deepStrictEqual(pipe([1, -1], f), [1])
    U.deepStrictEqual(pipe([1, 0], f), [1, 0])
  })

  it("partitionMapWithIndex", () => {
    const partitionMapWithIndex = _.partitionMapWithIndex(RA.FilterableWithIndex)
    const f = partitionMapWithIndex((s: string, i: number) =>
      s.length > 1 ? either.right(s.length + i) : either.left(s)
    )
    U.deepStrictEqual(pipe([], f), [[], []])
    U.deepStrictEqual(pipe(["a"], f), [["a"], []])
    U.deepStrictEqual(pipe(["aa"], f), [[], [2]])
    U.deepStrictEqual(pipe(["aa", "b"], f), [["b"], [2]])
    U.deepStrictEqual(pipe(["aa", "bbb"], f), [[], [2, 4]])
    U.deepStrictEqual(pipe(["aa", "a"], f), [["a"], [2]])
    U.deepStrictEqual(pipe(["a", "aa", "bbb"], f), [["a"], [3, 5]])
  })

  it("partitionWithIndex", () => {
    const partitionWithIndex = _.partitionWithIndex(RA.FilterableWithIndex)
    const f = partitionWithIndex((n: number, i: number) => n + i > 0)
    U.deepStrictEqual(pipe([], f), [[], []])
    U.deepStrictEqual(pipe([1], f), [[], [1]])
    U.deepStrictEqual(pipe([-1], f), [[-1], []])
    U.deepStrictEqual(pipe([1, -1], f), [[-1], [1]])
    U.deepStrictEqual(pipe([1, 0], f), [[], [1, 0]])
  })
})
