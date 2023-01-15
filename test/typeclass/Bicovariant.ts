import { pipe } from "@fp-ts/core/Function"
import * as _ from "@fp-ts/core/typeclass/Bicovariant"
import type { EitherTypeLambda } from "../data/Either"
import * as E from "../data/Either"
import * as RA from "../data/ReadonlyArray"
import * as U from "../util"

export const Bicovariant: _.Bicovariant<EitherTypeLambda> = {
  bimap: (f, g) => (self) => E.isLeft(self) ? E.left(f(self.left)) : E.right(g(self.right))
}

describe("Bicovariant", () => {
  it("mapLeft", () => {
    const mapLeft = _.mapLeft(Bicovariant)
    const f = (s: string) => s.length
    U.deepStrictEqual(pipe(E.right(1), mapLeft(f)), E.right(1))
    U.deepStrictEqual(pipe(E.left("eee"), mapLeft(f)), E.left(3))
  })

  it("map", () => {
    const map = _.map(Bicovariant)
    const g = (n: number) => n * 2
    U.deepStrictEqual(pipe(E.right(1), map(g)), E.right(2))
    U.deepStrictEqual(pipe(E.left("eee"), map(g)), E.left("eee"))
  })

  it("bimapComposition", () => {
    const bimap = _.bimapComposition(RA.Covariant, Bicovariant)
    const f = (s: string) => s.length
    const g = (n: number) => n * 2
    U.deepStrictEqual(pipe([E.right(1), E.right(2), E.left("eee")], bimap(f, g)), [
      E.right(2),
      E.right(4),
      E.left(3)
    ])
  })
})
