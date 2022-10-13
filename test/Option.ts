import { identity, pipe } from "@fp-ts/core/Function"
import * as O from "./data/Option"
import * as RA from "./data/ReadonlyArray"
import * as string from "./data/string"
import * as U from "./util"

describe("Option", () => {
  it("reduce", () => {
    U.deepStrictEqual(
      pipe(
        O.none,
        O.reduce(2, (b, a) => b + a)
      ),
      2
    )
    U.deepStrictEqual(
      pipe(
        O.some(3),
        O.reduce(2, (b, a) => b + a)
      ),
      5
    )
  })

  it("foldMap", () => {
    U.deepStrictEqual(pipe(O.some("a"), O.foldMap(string.Monoid)(identity)), "a")
    U.deepStrictEqual(pipe(O.none, O.foldMap(string.Monoid)(identity)), "")
  })

  it("composeKleisli", () => {
    const g = (n: number): O.Option<number> => (n !== 0 ? O.some(n / 2) : O.none)
    const h = pipe(RA.head<number>, O.composeKleisli(g))
    U.deepStrictEqual(h([2]), O.some(1))
    U.deepStrictEqual(h([]), O.none)
    U.deepStrictEqual(h([0]), O.none)
  })

  it("lift2", () => {
    const f = (a: number, b: number) => a + b
    const g = O.lift2(f)
    U.deepStrictEqual(g(O.none, O.none), O.none)
    U.deepStrictEqual(g(O.some(1), O.none), O.none)
    U.deepStrictEqual(g(O.none, O.some(2)), O.none)
    U.deepStrictEqual(g(O.some(1), O.some(2)), O.some(3))
  })

  it("lift3", () => {
    const f = (a: number, b: number, c: number) => a + b + c
    const g = O.lift3(f)
    U.deepStrictEqual(g(O.none, O.none, O.none), O.none)
    U.deepStrictEqual(g(O.some(1), O.none, O.none), O.none)
    U.deepStrictEqual(g(O.none, O.some(2), O.none), O.none)
    U.deepStrictEqual(g(O.none, O.none, O.some(3)), O.none)
    U.deepStrictEqual(g(O.some(1), O.some(2), O.none), O.none)
    U.deepStrictEqual(g(O.some(1), O.none, O.some(3)), O.none)
    U.deepStrictEqual(g(O.none, O.some(2), O.some(3)), O.none)
    U.deepStrictEqual(g(O.some(1), O.some(2), O.some(3)), O.some(6))
  })

  it("tap", () => {
    const f = (n: number) => O.some(n * 2)
    U.deepStrictEqual(pipe(O.some(1), O.tap(f)), O.some(1))
  })

  it("do notation", () => {
    U.deepStrictEqual(
      pipe(
        O.some(1),
        O.bindTo("a"),
        O.bind("b", () => O.some("b"))
      ),
      O.some({ a: 1, b: "b" })
    )
  })

  it("bindRight", () => {
    U.deepStrictEqual(
      pipe(O.some(1), O.bindTo("a"), O.bindRight("b", O.some("b"))),
      O.some({ a: 1, b: "b" })
    )
  })

  it("zipFlatten", () => {
    U.deepStrictEqual(
      pipe(O.some(1), O.tupled, O.zipFlatten(O.some("b"))),
      O.some([1, "b"] as const)
    )
  })

  it("zipWith", () => {
    U.deepStrictEqual(
      pipe(O.some(1), O.zipWith(O.some(2), (a, b) => a + b)),
      O.some(3)
    )
  })
})
