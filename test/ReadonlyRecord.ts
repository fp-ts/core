import { pipe } from "@fp-ts/core/Function"
import * as O from "@fp-ts/core/Option"
import * as RR from "@fp-ts/core/ReadonlyRecord"

describe.concurrent("ReadonlyRecord", () => {
  it("get", () => {
    expect(pipe({}, RR.get("a"))).toEqual(O.none())
    expect(pipe({ a: 1 }, RR.get("a"))).toEqual(O.some(1))
  })

  it("modifyOption", () => {
    expect(pipe({}, RR.replaceOption("a", 2))).toEqual(O.none())
    expect(pipe({ a: 1 }, RR.replaceOption("a", 2))).toEqual(O.some({ a: 2 }))
    expect(pipe({ a: 1 }, RR.replaceOption("a", true))).toEqual(O.some({ a: true }))
  })

  it("modifyOption", () => {
    expect(pipe({}, RR.modifyOption("a", (n: number) => n + 1))).toEqual(O.none())
    expect(pipe({ a: 1 }, RR.modifyOption("a", (n: number) => n + 1))).toEqual(O.some({ a: 2 }))
    expect(pipe({ a: 1 }, RR.modifyOption("a", (n: number) => String(n)))).toEqual(
      O.some({ a: "1" })
    )
  })

  it("mapWithKey", () => {
    expect(pipe({ a: 1, b: 2 }, RR.mapWithKey((k, n) => `${k}-${n}`))).toEqual,
      ({ a: "a-1", b: "b-2" })
  })

  it("map", () => {
    expect(pipe({ a: 1, b: 2 }, RR.map(n => n * 2))).toEqual, ({ a: 2, b: 4 })
  })
})
