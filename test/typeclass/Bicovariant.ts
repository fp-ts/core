import * as E from "@fp-ts/core/Either"
import { pipe } from "@fp-ts/core/Function"
import * as RA from "@fp-ts/core/ReadonlyArray"
import * as _ from "@fp-ts/core/typeclass/Bicovariant"
import * as U from "../util"

describe("Bicovariant", () => {
  it("mapLeft", () => {
    const mapLeft = _.mapLeft(E.Bicovariant)
    const f = (s: string) => s.length
    U.deepStrictEqual(pipe(E.right(1), mapLeft(f)), E.right(1))
    U.deepStrictEqual(pipe(E.left("eee"), mapLeft(f)), E.left(3))
  })

  it("map", () => {
    const map = _.map(E.Bicovariant)
    const g = (n: number) => n * 2
    U.deepStrictEqual(pipe(E.right(1), map(g)), E.right(2))
    U.deepStrictEqual(pipe(E.left("eee"), map(g)), E.left("eee"))
  })

  it("bimapComposition", () => {
    const bimap = _.bimapComposition(RA.Covariant, E.Bicovariant)
    const f = (s: string) => s.length
    const g = (n: number) => n * 2
    U.deepStrictEqual(bimap([E.right(1), E.right(2), E.left("eee")], f, g), [
      E.right(2),
      E.right(4),
      E.left(3)
    ])
  })
})
