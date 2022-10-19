import * as either from "@fp-ts/core/internal/Either"
import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "@fp-ts/core/typeclass/Filterable"
import * as O from "../test-data/Option"
import * as RA from "../test-data/ReadonlyArray"
import * as U from "../util"

describe("Filterable", () => {
  it("filterMapComposition", () => {
    const filterMap = _.filterMapComposition(RA.Covariant, O.Filterable)
    const f = filterMap((s: string) => s.length > 1 ? O.some(s.length) : O.none)
    U.deepStrictEqual(pipe([], f), [])
    U.deepStrictEqual(pipe([O.none], f), [O.none])
    U.deepStrictEqual(pipe([O.some("a")], f), [O.none])
    U.deepStrictEqual(pipe([O.some("aa")], f), [O.some(2)])
  })

  it("filter", () => {
    const filter = _.filter(RA.Filterable)
    const f = filter((n: number) => n > 0)
    U.deepStrictEqual(pipe([], f), [])
    U.deepStrictEqual(pipe([1], f), [1])
    U.deepStrictEqual(pipe([-1], f), [])
    U.deepStrictEqual(pipe([1, -1], f), [1])
  })

  it("partitionMap", () => {
    const partitionMap = _.partitionMap(RA.Filterable)
    const f = partitionMap((s: string) => s.length > 1 ? either.right(s.length) : either.left(s))
    U.deepStrictEqual(pipe([], f), [[], []])
    U.deepStrictEqual(pipe(["a"], f), [["a"], []])
    U.deepStrictEqual(pipe(["aa"], f), [[], [2]])
    U.deepStrictEqual(pipe(["aa", "a"], f), [["a"], [2]])
  })

  it("partition", () => {
    const partition = _.partition(RA.Filterable)
    const f = partition((n: number) => n > 0)
    U.deepStrictEqual(pipe([], f), [[], []])
    U.deepStrictEqual(pipe([1], f), [[], [1]])
    U.deepStrictEqual(pipe([-1], f), [[-1], []])
    U.deepStrictEqual(pipe([1, -1], f), [[-1], [1]])
  })
})
