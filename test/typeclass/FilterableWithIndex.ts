import * as E from "@fp-ts/core/Either"
import { pipe } from "@fp-ts/core/Function"
import * as O from "@fp-ts/core/Option"
import * as RA from "@fp-ts/core/ReadonlyArray"
import * as _ from "@fp-ts/core/typeclass/FilterableWithIndex"
import * as U from "../util"

describe("FilterableWithIndex", () => {
  it("filterMapComposition", () => {
    const filterMapWithIndex: <A, B>(
      f: (a: A, i: number) => O.Option<B>
    ) => (
      self: ReadonlyArray<ReadonlyArray<A>>
    ) => ReadonlyArray<ReadonlyArray<B>> = _
      .filterMapWithIndexComposition(RA.Covariant, RA.FilterableWithIndex)
    const f = filterMapWithIndex((s: string, i: number) =>
      s.length + i > 1 ? O.some(s.length) : O.none()
    )
    U.deepStrictEqual(pipe([], f), [])
    U.deepStrictEqual(pipe([[]], f), [[]])
    U.deepStrictEqual(pipe([["a"]], f), [[]])
    U.deepStrictEqual(pipe([["aa", "a"]], f), [[2, 1]])
  })

  it("filterMap", () => {
    const filterMap: <A, B>(
      f: (a: A) => O.Option<B>
    ) => (self: ReadonlyArray<A>) => ReadonlyArray<B> = _.filterMap(RA.FilterableWithIndex)
    const f = (n: number) => (n % 2 === 0 ? O.none() : O.some(n))
    U.deepStrictEqual(pipe([1, 2, 3], filterMap(f)), [1, 3])
    U.deepStrictEqual(pipe([], filterMap(f)), [])
  })

  it("filterWithIndex", () => {
    const filterWithIndex = _.filterWithIndex(RA.FilterableWithIndex)
    const f = (n: number) => n % 2 === 0
    U.deepStrictEqual(pipe(["a", "b", "c"], filterWithIndex((_, i) => f(i))), [
      "a",
      "c"
    ])
  })

  it("partitionMapWithIndex", () => {
    const partitionMapWithIndex = _.partitionMapWithIndex(RA.FilterableWithIndex)
    U.deepStrictEqual(
      pipe([], partitionMapWithIndex((a) => a)),
      [[], []]
    )
    U.deepStrictEqual(
      pipe(
        [E.right(1), E.left("foo"), E.right(2)],
        partitionMapWithIndex((a, i) => pipe(a, E.filter((n) => n > i, () => "err")))
      ),
      [["foo", "err"], [1]]
    )
  })

  it("partitionWithIndex", () => {
    const partitionWithIndex = _.partitionWithIndex(RA.FilterableWithIndex)
    U.deepStrictEqual(
      pipe([], partitionWithIndex((i, n) => i + n > 2)),
      [[], []]
    )
    U.deepStrictEqual(
      pipe([1, 2], partitionWithIndex((i, n) => i + n > 2)),
      [[1], [2]]
    )
  })
})
