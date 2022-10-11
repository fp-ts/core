import * as B from "@fp-ts/core/data/boolean"
import { pipe } from "@fp-ts/core/data/Function"
import { deepStrictEqual } from "../util"

describe("boolean", () => {
  describe("all", () => {
    it("baseline", () => {
      deepStrictEqual(B.all([true, true, true]), true)
      deepStrictEqual(B.all([true, true, false]), false)
    })

    it("should handle iterables", () => {
      deepStrictEqual(B.all(new Set([true, true])), true)
      deepStrictEqual(B.all(new Set([true, false])), false)
      deepStrictEqual(B.all(new Set([false, false])), false)
    })
  })

  describe("any", () => {
    it("baseline", () => {
      deepStrictEqual(B.any([true, true, true]), true)
      deepStrictEqual(B.any([true, true, false]), true)
      deepStrictEqual(B.any([false, false, false]), false)
    })

    it("should handle iterables", () => {
      deepStrictEqual(B.any(new Set([true, true])), true)
      deepStrictEqual(B.any(new Set([true, false])), true)
      deepStrictEqual(B.any(new Set([false, false])), false)
    })
  })

  describe("match", () => {
    it("baseline", () => {
      const match = B.match(() => "false", () => "true")
      deepStrictEqual(match(true), "true")
      deepStrictEqual(match(false), "false")
    })
  })

  describe("Ord", () => {
    it("baseline", () => {
      deepStrictEqual(pipe(false, B.Ord.compare(true)), -1)
      deepStrictEqual(pipe(true, B.Ord.compare(false)), 1)
      deepStrictEqual(pipe(true, B.Ord.compare(true)), 0)
    })
  })

  describe("Show", () => {
    it("baseline", () => {
      deepStrictEqual(B.Show.show(true), "true")
      deepStrictEqual(B.Show.show(false), "false")
    })
  })
})
