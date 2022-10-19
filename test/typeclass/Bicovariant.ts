import { pipe } from "@fp-ts/core/internal/Function"
import * as _ from "@fp-ts/core/typeclass/Bicovariant"
import * as RA from "../test-data/ReadonlyArray"
import * as E from "../test-data/Result"
import * as U from "../util"

describe("Bicovariant", () => {
  it("mapLeft", () => {
    const mapLeft = _.mapLeft(E.Bicovariant)
    const f = (s: string) => s.length
    U.deepStrictEqual(pipe(E.succeed(1), mapLeft(f)), E.succeed(1))
    U.deepStrictEqual(pipe(E.fail("eee"), mapLeft(f)), E.fail(3))
  })

  it("map", () => {
    const map = _.map(E.Bicovariant)
    const g = (n: number) => n * 2
    U.deepStrictEqual(pipe(E.succeed(1), map(g)), E.succeed(2))
    U.deepStrictEqual(pipe(E.fail("eee"), map(g)), E.fail("eee"))
  })

  it("bimapComposition", () => {
    const bimap = _.bimapComposition(RA.Covariant, E.Bicovariant)
    const f = (s: string) => s.length
    const g = (n: number) => n * 2
    U.deepStrictEqual(pipe([E.succeed(1), E.succeed(2), E.fail("eee")], bimap(f, g)), [
      E.succeed(2),
      E.succeed(4),
      E.fail(3)
    ])
  })
})
