import * as Boolean from "@fp-ts/core/Boolean"
import { pipe } from "@fp-ts/core/Function"
import { deepStrictEqual } from "@fp-ts/core/test/util"

describe.concurrent("Boolean", () => {
  it("exports", () => {
    expect(Boolean.SemigroupAll).exist
    expect(Boolean.MonoidAll).exist
    expect(Boolean.SemigroupAny).exist
    expect(Boolean.MonoidAny).exist
    expect(Boolean.SemigroupXor).exist
    expect(Boolean.all).exist
    expect(Boolean.any).exist
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

  it("nand", () => {
    deepStrictEqual(pipe(true, Boolean.nand(true)), false)
    deepStrictEqual(pipe(true, Boolean.nand(false)), true)
    deepStrictEqual(pipe(false, Boolean.nand(true)), true)
    deepStrictEqual(pipe(false, Boolean.nand(false)), true)
  })

  it("or", () => {
    deepStrictEqual(pipe(true, Boolean.or(true)), true)
    deepStrictEqual(pipe(true, Boolean.or(false)), true)
    deepStrictEqual(pipe(false, Boolean.or(true)), true)
    deepStrictEqual(pipe(false, Boolean.or(false)), false)
  })

  it("nor", () => {
    deepStrictEqual(pipe(true, Boolean.nor(true)), false)
    deepStrictEqual(pipe(true, Boolean.nor(false)), false)
    deepStrictEqual(pipe(false, Boolean.nor(true)), false)
    deepStrictEqual(pipe(false, Boolean.nor(false)), true)
  })

  it("xor", () => {
    deepStrictEqual(pipe(true, Boolean.xor(true)), false)
    deepStrictEqual(pipe(true, Boolean.xor(false)), true)
    deepStrictEqual(pipe(false, Boolean.xor(true)), true)
    deepStrictEqual(pipe(false, Boolean.xor(false)), false)
  })

  it("xnor", () => {
    deepStrictEqual(pipe(true, Boolean.xnor(true)), true)
    deepStrictEqual(pipe(true, Boolean.xnor(false)), false)
    deepStrictEqual(pipe(false, Boolean.xnor(true)), false)
    deepStrictEqual(pipe(false, Boolean.xnor(false)), true)
  })

  it("implies", () => {
    deepStrictEqual(pipe(true, Boolean.implies(true)), true)
    deepStrictEqual(pipe(true, Boolean.implies(false)), false)
    deepStrictEqual(pipe(false, Boolean.implies(true)), true)
    deepStrictEqual(pipe(false, Boolean.implies(false)), true)
  })

  it("not", () => {
    deepStrictEqual(pipe(true, Boolean.not), false)
    deepStrictEqual(pipe(false, Boolean.not), true)
  })

  describe.concurrent("SemigroupXor", () => {
    it("baseline", () => {
      deepStrictEqual(Boolean.SemigroupXor.combineMany(true, []), true)
      deepStrictEqual(Boolean.SemigroupXor.combineMany(false, []), false)
      deepStrictEqual(Boolean.SemigroupXor.combineMany(false, [true]), true)
      deepStrictEqual(Boolean.SemigroupXor.combineMany(false, [false]), false)
      deepStrictEqual(Boolean.SemigroupXor.combineMany(true, [true]), false)
      deepStrictEqual(Boolean.SemigroupXor.combineMany(true, [false]), true)
    })
  })

  describe.concurrent("MonoidAll", () => {
    it("baseline", () => {
      deepStrictEqual(Boolean.MonoidAll.combineMany(true, [true, true]), true)
      deepStrictEqual(Boolean.MonoidAll.combineMany(true, [true, false]), false)
      deepStrictEqual(Boolean.MonoidAll.combineMany(false, [true, false]), false)
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
      deepStrictEqual(Boolean.MonoidAny.combineMany(true, [true, true]), true)
      deepStrictEqual(Boolean.MonoidAny.combineMany(true, [true, false]), true)
      deepStrictEqual(Boolean.MonoidAny.combineMany(false, [false, false]), false)
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
    deepStrictEqual(Boolean.Order.compare(false, true), -1)
    deepStrictEqual(Boolean.Order.compare(true, false), 1)
    deepStrictEqual(Boolean.Order.compare(true, true), 0)
  })
})
