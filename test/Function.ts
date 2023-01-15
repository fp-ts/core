import * as Function from "@fp-ts/core/Function"
import { deepStrictEqual, double } from "@fp-ts/core/test/util"
import type * as monoid from "@fp-ts/core/typeclass/Monoid"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"
import * as assert from "assert"

const f = (n: number): number => n + 1
const g = double
const size = (s: string): number => s.length

// TODO: replace with "@fp-ts/core/Number"
const sum = (that: number) => (self: number): number => self + that
const SemigroupSum: semigroup.Semigroup<number> = semigroup.fromCombine(sum)
const MonoidSum: monoid.Monoid<number> = {
  ...SemigroupSum,
  combineAll: (collection) => SemigroupSum.combineMany(collection)(0),
  empty: 0
}

describe.concurrent("Function", () => {
  it("getSemigroup", () => {
    const S = Function.getSemigroup(SemigroupSum)<string>()
    const f = (s: string) => s === "a" ? 0 : 1
    const g = Function.pipe(size, S.combine(f))
    deepStrictEqual(g(""), 1)
    deepStrictEqual(g("a"), 1)
    deepStrictEqual(g("b"), 2)
    deepStrictEqual(S.combineMany([size, size])(size)("a"), 3)
  })

  it("getMonoid", () => {
    const M = Function.getMonoid(MonoidSum)<string>()
    const f = (s: string) => s === "a" ? 0 : 1
    const g = Function.pipe(size, M.combine(f))
    deepStrictEqual(g(""), 1)
    deepStrictEqual(g("a"), 1)
    deepStrictEqual(g("b"), 2)
    deepStrictEqual(Function.pipe(size, M.combine(M.empty))("a"), 1)
    deepStrictEqual(Function.pipe(M.empty, M.combine(size))("a"), 1)
    deepStrictEqual(M.combineAll([size, size])("a"), 2)
  })

  it("apply", () => {
    deepStrictEqual(Function.apply("a")(size), 1)
  })

  it("flip", () => {
    const f = (a: number) => (b: string) => a - b.length
    deepStrictEqual(Function.flip(f)("aaa")(2), -1)
  })

  it("compose", () => {
    deepStrictEqual(Function.pipe(size, Function.compose(double))("aaa"), 6)
  })

  it("unsafeCoerce", () => {
    deepStrictEqual(Function.unsafeCoerce, Function.identity)
  })

  it("constant", () => {
    deepStrictEqual(Function.constant("a")(), "a")
  })

  it("constTrue", () => {
    deepStrictEqual(Function.constTrue(), true)
  })

  it("constFalse", () => {
    deepStrictEqual(Function.constFalse(), false)
  })

  it("constNull", () => {
    deepStrictEqual(Function.constNull(), null)
  })

  it("constUndefined", () => {
    deepStrictEqual(Function.constUndefined(), undefined)
  })

  it("constVoid", () => {
    deepStrictEqual(Function.constVoid(), undefined)
  })

  it("absurd", () => {
    assert.throws(() => Function.absurd<string>(null as any as never))
  })

  it("hole", () => {
    assert.throws(() => Function.hole<string>())
  })

  it("SK", () => {
    expect(Function.SK(1, 2)).toEqual(2)
  })

  it("flow", () => {
    deepStrictEqual(Function.flow(f)(2), 3)
    deepStrictEqual(Function.flow(f, g)(2), 6)
    deepStrictEqual(Function.flow(f, g, f)(2), 7)
    deepStrictEqual(Function.flow(f, g, f, g)(2), 14)
    deepStrictEqual(Function.flow(f, g, f, g, f)(2), 15)
    deepStrictEqual(Function.flow(f, g, f, g, f, g)(2), 30)
    deepStrictEqual(Function.flow(f, g, f, g, f, g, f)(2), 31)
    deepStrictEqual(Function.flow(f, g, f, g, f, g, f, g)(2), 62)
    deepStrictEqual(Function.flow(f, g, f, g, f, g, f, g, f)(2), 63)
    // this is just to satisfy noImplicitReturns and 100% coverage
    deepStrictEqual((Function.flow as any)(...[f, g, f, g, f, g, f, g, f, g]), undefined)
  })

  it("tupled", () => {
    const f1 = (a: number): number => a * 2
    const f2 = (a: number, b: number): number => a + b
    const u1 = Function.tupled(f1)
    const u2 = Function.tupled(f2)
    deepStrictEqual(u1([1]), 2)
    deepStrictEqual(u2([1, 2]), 3)
  })

  it("untupled", () => {
    const f1 = (a: readonly [number]): number => a[0] * 2
    const f2 = (a: readonly [number, number]): number => a[0] + a[1]
    const u1 = Function.untupled(f1)
    const u2 = Function.untupled(f2)
    deepStrictEqual(u1(1), 2)
    deepStrictEqual(u2(1, 2), 3)
  })

  it("pipe", () => {
    deepStrictEqual(Function.pipe(2), 2)
    deepStrictEqual(Function.pipe(2, f), 3)
    deepStrictEqual(Function.pipe(2, f, g), 6)
    deepStrictEqual(Function.pipe(2, f, g, f), 7)
    deepStrictEqual(Function.pipe(2, f, g, f, g), 14)
    deepStrictEqual(Function.pipe(2, f, g, f, g, f), 15)
    deepStrictEqual(Function.pipe(2, f, g, f, g, f, g), 30)
    deepStrictEqual(Function.pipe(2, f, g, f, g, f, g, f), 31)
    deepStrictEqual(Function.pipe(2, f, g, f, g, f, g, f, g), 62)
    deepStrictEqual(Function.pipe(2, f, g, f, g, f, g, f, g, f), 63)
    deepStrictEqual(Function.pipe(2, f, g, f, g, f, g, f, g, f, g), 126)
    deepStrictEqual(Function.pipe(2, f, g, f, g, f, g, f, g, f, g, f), 127)
    deepStrictEqual(Function.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g), 254)
    deepStrictEqual(Function.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f), 255)
    deepStrictEqual(Function.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g), 510)
    deepStrictEqual(Function.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f), 511)
    deepStrictEqual(Function.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g), 1022)
    deepStrictEqual(Function.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f), 1023)
    deepStrictEqual(Function.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g), 2046)
    deepStrictEqual(Function.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f), 2047)
    deepStrictEqual(
      (Function.pipe as any)(...[2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g]),
      4094
    )
  })
})
