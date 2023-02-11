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
    expect(Boolean.MonoidXor).exist
    expect(Boolean.SemigroupEqv).exist
    expect(Boolean.MonoidEqv).exist
    expect(Boolean.all).exist
    expect(Boolean.any).exist
    expect(Boolean.xor).exist
    expect(Boolean.eqv).exist
    expect(Boolean.nand).exist
    expect(Boolean.nor).exist
    expect(Boolean.implies).exist
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

  it("eqv", () => {
    deepStrictEqual(pipe(true, Boolean.eqv(true)), true)
    deepStrictEqual(pipe(true, Boolean.eqv(false)), false)
    deepStrictEqual(pipe(false, Boolean.eqv(true)), false)
    deepStrictEqual(pipe(false, Boolean.eqv(false)), true)
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

  describe.concurrent("MonoidXor", () => {
    it("baseline", () => {
      deepStrictEqual(Boolean.MonoidXor.combineMany(true, []), true)
      deepStrictEqual(Boolean.MonoidXor.combineMany(false, []), false)
      deepStrictEqual(Boolean.MonoidXor.combineMany(false, [true]), true)
      deepStrictEqual(Boolean.MonoidXor.combineMany(false, [false]), false)
      deepStrictEqual(Boolean.MonoidXor.combineMany(true, [true]), false)
      deepStrictEqual(Boolean.MonoidXor.combineMany(true, [false]), true)
      deepStrictEqual(Boolean.MonoidXor.combineMany(true, [true, false]), false)
      deepStrictEqual(Boolean.MonoidXor.combineMany(true, [false, true]), false)
      deepStrictEqual(Boolean.MonoidXor.combineAll([true, false]), true)
      deepStrictEqual(Boolean.MonoidXor.combineAll([false, true]), true)
    })

    it("should handle iterables", () => {
      deepStrictEqual(Boolean.MonoidXor.combineAll(new Set([true, true])), true)
      deepStrictEqual(Boolean.MonoidXor.combineAll(new Set([true, false])), true)
      deepStrictEqual(Boolean.MonoidXor.combineAll(new Set([false, false])), false)
    })
  })

  describe.concurrent("MonoidEqv", () => {
    it("baseline", () => {
      deepStrictEqual(Boolean.MonoidEqv.combineMany(true, []), true)
      deepStrictEqual(Boolean.MonoidEqv.combineMany(false, []), false)
      deepStrictEqual(Boolean.MonoidEqv.combineMany(false, [true]), false)
      deepStrictEqual(Boolean.MonoidEqv.combineMany(false, [false]), true)
      deepStrictEqual(Boolean.MonoidEqv.combineMany(true, [true]), true)
      deepStrictEqual(Boolean.MonoidEqv.combineMany(true, [false]), false)
      deepStrictEqual(Boolean.MonoidEqv.combineMany(true, [true, false]), false)
      deepStrictEqual(Boolean.MonoidEqv.combineMany(true, [false, true]), false)
      deepStrictEqual(Boolean.MonoidEqv.combineAll([true, false]), false)
      deepStrictEqual(Boolean.MonoidEqv.combineAll([false, true]), false)
    })

    it("should handle iterables", () => {
      deepStrictEqual(Boolean.MonoidEqv.combineAll(new Set([true, true])), true)
      deepStrictEqual(Boolean.MonoidEqv.combineAll(new Set([true, false])), false)
      deepStrictEqual(Boolean.MonoidEqv.combineAll(new Set([false, false])), false)
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
