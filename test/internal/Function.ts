import * as _ from "@fp-ts/core/internal/Function"
import * as U from "../util"

describe("Function", () => {
  it("pipe", () => {
    const f = (n: number): number => n + 1
    const g = U.double
    U.deepStrictEqual(_.pipe(2), 2)
    U.deepStrictEqual(_.pipe(2, f), 3)
    U.deepStrictEqual(_.pipe(2, f, g), 6)
    U.deepStrictEqual(_.pipe(2, f, g, f), 7)
    U.deepStrictEqual(_.pipe(2, f, g, f, g), 14)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f), 15)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f, g), 30)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f), 31)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g), 62)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f), 63)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g), 126)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f), 127)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g), 254)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f), 255)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g), 510)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f), 511)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g), 1022)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f), 1023)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g), 2046)
    U.deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f), 2047)
    U.deepStrictEqual(
      (_.pipe as any)(...[2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g]),
      4094
    )
  })
})
