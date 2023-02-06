import * as _ from "@fp-ts/core/Function"
import * as String from "@fp-ts/core/String"
import { deepStrictEqual, double } from "@fp-ts/core/test/util"
import * as assert from "assert"

const f = (n: number): number => n + 1
const g = double

describe.concurrent("Function", () => {
  it("apply", () => {
    deepStrictEqual(_.pipe("a", _.apply(String.length)), 1)
  })

  it("compose", () => {
    deepStrictEqual(_.pipe(String.length, _.compose(double))("aaa"), 6)
    deepStrictEqual(_.compose(String.length, double)("aaa"), 6)
  })

  it("flip", () => {
    const f = (a: number) => (b: string) => a - b.length
    const g = (a: number, i = 0) => (b: number) => a ** b + i

    deepStrictEqual(_.flip(f)("aaa")(2), -1)
    deepStrictEqual(_.flip(g)(2)(2, 1), 5)
  })

  it("unsafeCoerce", () => {
    deepStrictEqual(_.unsafeCoerce, _.identity)
  })

  it("constant", () => {
    deepStrictEqual(_.constant("a")(), "a")
  })

  it("constTrue", () => {
    deepStrictEqual(_.constTrue(), true)
  })

  it("constFalse", () => {
    deepStrictEqual(_.constFalse(), false)
  })

  it("constNull", () => {
    deepStrictEqual(_.constNull(), null)
  })

  it("constUndefined", () => {
    deepStrictEqual(_.constUndefined(), undefined)
  })

  it("constVoid", () => {
    deepStrictEqual(_.constVoid(), undefined)
  })

  it("absurd", () => {
    assert.throws(() => _.absurd<string>(null as any as never))
  })

  it("hole", () => {
    assert.throws(() => _.hole<string>())
  })

  it("SK", () => {
    expect(_.SK(1, 2)).toEqual(2)
  })

  it("flow", () => {
    deepStrictEqual(_.flow(f)(2), 3)
    deepStrictEqual(_.flow(f, g)(2), 6)
    deepStrictEqual(_.flow(f, g, f)(2), 7)
    deepStrictEqual(_.flow(f, g, f, g)(2), 14)
    deepStrictEqual(_.flow(f, g, f, g, f)(2), 15)
    deepStrictEqual(_.flow(f, g, f, g, f, g)(2), 30)
    deepStrictEqual(_.flow(f, g, f, g, f, g, f)(2), 31)
    deepStrictEqual(_.flow(f, g, f, g, f, g, f, g)(2), 62)
    deepStrictEqual(_.flow(f, g, f, g, f, g, f, g, f)(2), 63)
    // this is just to satisfy noImplicitReturns and 100% coverage
    deepStrictEqual((_.flow as any)(...[f, g, f, g, f, g, f, g, f, g]), undefined)
  })

  it("tupled", () => {
    const f1 = (a: number): number => a * 2
    const f2 = (a: number, b: number): number => a + b
    const u1 = _.tupled(f1)
    const u2 = _.tupled(f2)
    deepStrictEqual(u1([1]), 2)
    deepStrictEqual(u2([1, 2]), 3)
  })

  it("untupled", () => {
    const f1 = (a: readonly [number]): number => a[0] * 2
    const f2 = (a: readonly [number, number]): number => a[0] + a[1]
    const u1 = _.untupled(f1)
    const u2 = _.untupled(f2)
    deepStrictEqual(u1(1), 2)
    deepStrictEqual(u2(1, 2), 3)
  })

  it("pipe", () => {
    deepStrictEqual(_.pipe(2), 2)
    deepStrictEqual(_.pipe(2, f), 3)
    deepStrictEqual(_.pipe(2, f, g), 6)
    deepStrictEqual(_.pipe(2, f, g, f), 7)
    deepStrictEqual(_.pipe(2, f, g, f, g), 14)
    deepStrictEqual(_.pipe(2, f, g, f, g, f), 15)
    deepStrictEqual(_.pipe(2, f, g, f, g, f, g), 30)
    deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f), 31)
    deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g), 62)
    deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f), 63)
    deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g), 126)
    deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f), 127)
    deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g), 254)
    deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f), 255)
    deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g), 510)
    deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f), 511)
    deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g), 1022)
    deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f), 1023)
    deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g), 2046)
    deepStrictEqual(_.pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f), 2047)
    deepStrictEqual(
      (_.pipe as any)(...[2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g]),
      4094
    )
  })

  it("dual", () => {
    const f = _.dual<
      (that: number) => (self: number) => number,
      (self: number, that: number) => number
    >(2, (a: number, b: number): number => a - b)
    deepStrictEqual(f(3, 2), 1)
    deepStrictEqual(_.pipe(3, f(2)), 1)
  })
})
