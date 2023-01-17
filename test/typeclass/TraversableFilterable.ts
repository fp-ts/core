import * as O from "@fp-ts/core/Option"
import * as RA from "@fp-ts/core/ReadonlyArray"
import * as _ from "@fp-ts/core/typeclass/TraversableFilterable"
import * as U from "../util"

describe("TraversableFilterable", () => {
  it("traverseFilter", () => {
    const traverseFilter = _.traverseFilter(
      RA.TraversableFilterable
    )(O.Applicative)
    const f = traverseFilter((s: string) =>
      s.length > 2 ? O.some(false) : s.length > 1 ? O.some(true) : O.none()
    )
    U.deepStrictEqual(f([]), O.some([]))
    U.deepStrictEqual(f(["a"]), O.none())
    U.deepStrictEqual(f(["a", "aa"]), O.none())
    U.deepStrictEqual(f(["aa"]), O.some(["aa"]))
    U.deepStrictEqual(f(["aaa"]), O.some([]))
    U.deepStrictEqual(f(["aaa", "aa"]), O.some(["aa"]))
  })

  it("traversePartition", () => {
    const traversePartition = _.traversePartition(
      RA.TraversableFilterable
    )(O.Applicative)
    const f = traversePartition((s: string) =>
      s.length > 2 ? O.some(false) : s.length > 1 ? O.some(true) : O.none()
    )
    expect(f([])).toEqual(O.some([[], []]))
    expect(f(["a"])).toEqual(O.none())
    expect(f(["a", "aa"])).toEqual(O.none())
    expect(f(["aa"])).toEqual(O.some([[], ["aa"]]))
    expect(f(["aaa"])).toEqual(O.some([["aaa"], []]))
    expect(f(["aaa", "aa"])).toEqual(O.some([["aaa"], ["aa"]]))
  })
})
