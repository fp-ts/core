import * as Boolean from "@fp-ts/core/Boolean"
import { pipe } from "@fp-ts/core/Function"
import { deepStrictEqual } from "@fp-ts/core/test/util"

describe.concurrent("Boolean", () => {
  it("instances and derived exports", () => {
    expect(Boolean.SemigroupAll).exist
    expect(Boolean.MonoidAll).exist
    expect(Boolean.SemigroupAny).exist
    expect(Boolean.MonoidAny).exist
  })

  it("isBoolean", () => {
    expect(Boolean.isBoolean(true)).toEqual(true)
    expect(Boolean.isBoolean(false)).toEqual(true)
    expect(Boolean.isBoolean("a")).toEqual(false)
    expect(Boolean.isBoolean(1)).toEqual(false)
  })

  it("and", () => {
    deepStrictEqual(pipe(true, Boolean.and(true)), true)
    deepStrictEqual(pipe(true, Boolean.and(false)), false)
    deepStrictEqual(pipe(false, Boolean.and(true)), false)
    deepStrictEqual(pipe(false, Boolean.and(false)), false)
  })

  it("or", () => {
    deepStrictEqual(pipe(true, Boolean.or(true)), true)
    deepStrictEqual(pipe(true, Boolean.or(false)), true)
    deepStrictEqual(pipe(false, Boolean.or(true)), true)
    deepStrictEqual(pipe(false, Boolean.or(false)), false)
  })

  describe.concurrent("MonoidAll", () => {
    it("baseline", () => {
      deepStrictEqual(Boolean.MonoidAll.combineMany([true, true])(true), true)
      deepStrictEqual(Boolean.MonoidAll.combineMany([true, false])(true), false)
      deepStrictEqual(Boolean.MonoidAll.combineMany([true, false])(false), false)
      deepStrictEqual(Boolean.MonoidAll.combineAll([true, true, true]), true)
      deepStrictEqual(Boolean.MonoidAll.combineAll([true, true, false]), false)
    })

    it("should handle iterables", () => {
      deepStrictEqual(Boolean.MonoidAll.combineAll(new Set([true, true])), true)
      deepStrictEqual(Boolean.MonoidAll.combineAll(new Set([true, false])), false)
      deepStrictEqual(Boolean.MonoidAll.combineAll(new Set([false, false])), false)
    })
  })

  describe.concurrent("MonoidAny", () => {
    it("baseline", () => {
      deepStrictEqual(Boolean.MonoidAny.combineMany([true, true])(true), true)
      deepStrictEqual(Boolean.MonoidAny.combineMany([true, false])(true), true)
      deepStrictEqual(Boolean.MonoidAny.combineMany([false, false])(false), false)
      deepStrictEqual(Boolean.MonoidAny.combineAll([true, true, true]), true)
      deepStrictEqual(Boolean.MonoidAny.combineAll([true, true, false]), true)
      deepStrictEqual(Boolean.MonoidAny.combineAll([false, false, false]), false)
    })

    it("should handle iterables", () => {
      deepStrictEqual(Boolean.MonoidAny.combineAll(new Set([true, true])), true)
      deepStrictEqual(Boolean.MonoidAny.combineAll(new Set([true, false])), true)
      deepStrictEqual(Boolean.MonoidAny.combineAll(new Set([false, false])), false)
    })
  })

  it("match", () => {
    const match = Boolean.match(() => "false", () => "true")
    deepStrictEqual(match(true), "true")
    deepStrictEqual(match(false), "false")
  })

  it("Equivalence", () => {
    expect(Boolean.Equivalence(true, true)).toBe(true)
    expect(Boolean.Equivalence(false, false)).toBe(true)
    expect(Boolean.Equivalence(true, false)).toBe(false)
    expect(Boolean.Equivalence(false, true)).toBe(false)
  })

  it("Order", () => {
    deepStrictEqual(pipe(false, Boolean.Order.compare(true)), -1)
    deepStrictEqual(pipe(true, Boolean.Order.compare(false)), 1)
    deepStrictEqual(pipe(true, Boolean.Order.compare(true)), 0)
  })
})
