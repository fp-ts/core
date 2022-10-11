import { pipe } from "@fp-ts/core/data/Function"
import type { NonEmptyReadonlyArray } from "@fp-ts/core/data/NonEmptyReadonlyArray"
import * as O from "@fp-ts/core/data/Option"
import * as RA from "@fp-ts/core/data/ReadonlyArray"
import * as S from "@fp-ts/core/data/string"
import * as _ from "@fp-ts/core/data/Writer"
import * as U from "../util"

describe("Writer", () => {
  it("right", () => {
    U.deepStrictEqual(pipe(["e", "a"] as const, _.right), "a")
  })

  it("left", () => {
    U.deepStrictEqual(pipe(["e", "a"] as const, _.left), "e")
  })

  it("tell", () => {
    U.deepStrictEqual(_.tell("e"), ["e", undefined])
  })

  it("reverse", () => {
    U.deepStrictEqual(_.reverse(["e", "a"]), ["a", "e"])
  })

  it("listen", () => {
    U.deepStrictEqual(_.listen(["e", "a"]), ["e", ["e", "a"]])
  })

  it("pass", () => {
    U.deepStrictEqual(_.pass(["e", ["a", (e: string) => e + "b"] as const]), ["eb", "a"])
  })

  it("listens", () => {
    U.deepStrictEqual(
      pipe(
        ["e", "a"] as const,
        _.listens((e) => e.length)
      ),
      ["e", ["a", 1]]
    )
  })

  it("censor", () => {
    const es = ["e1", "e2"]
    U.deepStrictEqual(
      pipe(
        [es, "a"] as const,
        _.censor((e) => e.filter((e) => e !== "e1"))
      ),
      [["e2"], "a"]
    )
  })

  it("map", () => {
    U.deepStrictEqual(pipe(["e", 1] as const, _.map(U.double)), ["e", 2])
  })

  it("mapLeft", () => {
    U.deepStrictEqual(pipe([1, "a"] as const, _.mapLeft(U.double)), [2, "a"])
  })

  it("mapBoth", () => {
    U.deepStrictEqual(pipe(["e", 1], _.mapBoth(S.size, U.double)), [1, 2])
  })

  it("extend", () => {
    const f = (fa: _.Writer<string, number>): number => _.left(fa).length + _.right(fa)
    U.deepStrictEqual(pipe(["ee", 1], _.extend(f)), ["ee", 3])
  })

  it("duplicate", () => {
    U.deepStrictEqual(pipe(["e", "a"] as const, _.duplicate), ["e", ["e", "a"]])
  })

  it("traverse", () => {
    const traverse = _.traverse(O.Applicative)((n: number) => (n > 1 ? O.some(n) : O.none))
    U.deepStrictEqual(traverse(["e", 2]), O.some(["e", 2] as const))
    U.deepStrictEqual(traverse(["e", 1]), O.none)
  })

  it("sequence", () => {
    const sequence = _.sequence(O.Applicative)
    U.deepStrictEqual(sequence(["e", O.some("a")]), O.some(["e", "a"] as const))
    U.deepStrictEqual(sequence(["e", O.none]), O.none)
  })

  it("getApplicative", () => {
    const M = _.getApplicative(S.Monoid)

    U.deepStrictEqual(M.of("a"), ["", "a"])

    const fab: _.Writer<string, (n: number) => number> = ["e1", (n: number) => n * 2]
    const fa: _.Writer<string, number> = ["e2", 1]
    U.deepStrictEqual(pipe(fab, M.ap(fa)), ["e1e2", 2])
  })

  it("getMonad", () => {
    const M = _.getMonad(S.Monoid)

    U.deepStrictEqual(M.of("a"), ["", "a"])

    const fa: _.Writer<string, number> = ["e1", 1]
    const f = (n: number): _.Writer<string, number> => ["e2", n * 2]
    U.deepStrictEqual(pipe(fa, M.flatMap(f)), ["e1e2", 2])
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  it("traverseReadonlyArrayWithIndex", () => {
    const { of } = _.getFromIdentity(S.Monoid)
    const f = (i: number, n: number) => of(n + i)
    const standard = RA.traverseWithIndex(_.getApplicative(S.Monoid))(f)
    const optimized = _.traverseReadonlyArrayWithIndex(S.Monoid)(f)
    const assert = (input: ReadonlyArray<number>) => {
      U.deepStrictEqual(standard(input), optimized(input))
    }
    assert([1, 2, 3])
    assert([0, 2, 3])
    assert([1, 0, 3])
    assert([0, 0, 3])
    assert([-1, 2, 3])
    assert([1, -2, 3])
    assert(RA.empty)
  })

  it("traverseNonEmptyReadonlyArray", () => {
    const { of } = _.getFromIdentity(S.Monoid)
    const f = (n: number) => of(n)
    const standard = RA.traverse(_.getApplicative(S.Monoid))(f)
    const optimized = _.traverseNonEmptyReadonlyArray(S.Monoid)(f)
    const assert = (input: NonEmptyReadonlyArray<number>) => {
      U.deepStrictEqual(standard(input), optimized(input))
    }
    assert([1, 2, 3])
    assert([0, 2, 3])
    assert([1, 0, 3])
    assert([0, 0, 3])
    assert([-1, 2, 3])
    assert([1, -2, 3])
  })

  it("sequenceReadonlyArray", () => {
    const { of } = _.getFromIdentity(S.Monoid)
    const sequenceReadonlyArray = _.sequenceReadonlyArray(S.Monoid)
    U.deepStrictEqual(pipe([of("a"), of("b")], sequenceReadonlyArray), of(["a", "b"]))
  })
})
