import * as E from "@fp-ts/core/Either"
import { flow, identity, pipe } from "@fp-ts/core/Function"
import { structural } from "@fp-ts/core/internal/effect"
import * as N from "@fp-ts/core/Number"
import * as O from "@fp-ts/core/Option"
import * as R from "@fp-ts/core/Result"
import * as S from "@fp-ts/core/String"
import * as Util from "@fp-ts/core/test/util"

describe.concurrent("Result", () => {
  it("exports", () => {
    expect(R.toOption).exist
    expect(R.getSuccess).exist
    expect(R.getFailure).exist

    expect(R.Invariant).exist
    expect(R.tupled).exist
    expect(R.bindTo).exist

    expect(R.Covariant).exist
    expect(R.map).exist
    expect(R.let).exist
    expect(R.flap).exist
    expect(R.as).exist
    expect(R.asUnit).exist

    expect(R.Bicovariant).exist
    expect(R.bimap).exist
    expect(R.mapFailure).exist

    expect(R.Of).exist
    expect(R.unit).exist
    expect(R.Do).exist

    expect(R.Pointed).exist

    expect(R.FlatMap).exist
    expect(R.flatMap).exist
    expect(R.flatten).exist
    expect(R.andThen).exist
    expect(R.composeKleisliArrow).exist

    expect(R.Chainable).exist
    expect(R.bind).exist
    expect(R.tap).exist
    expect(R.andThenDiscard).exist

    expect(R.Monad).exist

    expect(R.SemiProduct).exist

    expect(R.Product).exist
    expect(R.all).exist
    expect(R.tuple).exist
    expect(R.struct).exist

    expect(R.SemiApplicative).exist
    expect(R.getFirstFailureSemigroup).exist // liftSemigroup
    expect(R.lift2).exist
    expect(R.ap).exist
    expect(R.andThenDiscard).exist
    expect(R.andThen).exist

    expect(R.Applicative).exist
    expect(R.getFirstFailureMonoid).exist // liftMonoid

    expect(R.SemiCoproduct).exist
    expect(R.getFirstSuccessSemigroup).exist // getSemigroup

    expect(R.SemiAlternative).exist

    expect(R.Foldable).exist

    expect(R.Traversable).exist
    expect(R.traverse).exist
    expect(R.sequence).exist
    expect(R.traverseTap).exist
  })

  it("structural tracking", () => {
    expect(Util.ownKeys(R.failure("a"))).toEqual(["_tag", "failure"])
    expect(Util.ownKeys(R.success(1))).toEqual(["_tag", "success"])

    expect(Object.prototype.hasOwnProperty.call(R.failure("a"), structural)).toEqual(false)
    expect(Object.prototype.hasOwnProperty.call(R.success(1), structural)).toEqual(false)

    expect(Util.isStructural(R.failure("a"))).toEqual(true)
    expect(Util.isStructural(R.success(1))).toEqual(true)
  })

  it("toRefinement", () => {
    const f = (s: string | number): R.Result<string, string> =>
      typeof s === "string" ? R.success(s) : R.failure("not a string")
    const isString = R.toRefinement(f)
    Util.deepStrictEqual(isString("s"), true)
    Util.deepStrictEqual(isString(1), false)
    type A = { readonly type: "A" }
    type B = { readonly type: "B" }
    type C = A | B
    const isA = R.toRefinement((
      c: C
    ) => (c.type === "A" ? R.success(c) : R.failure("not as A")))
    Util.deepStrictEqual(isA({ type: "A" }), true)
    Util.deepStrictEqual(isA({ type: "B" }), false)
  })

  it("isResult", () => {
    Util.deepStrictEqual(pipe(R.success(1), R.isResult), true)
    Util.deepStrictEqual(pipe(R.failure("e"), R.isResult), true)
    Util.deepStrictEqual(pipe(O.some(1), R.isResult), false)
  })

  it("orElseFail", () => {
    Util.deepStrictEqual(pipe(R.success(1), R.orElseFail(() => "e2")), R.success(1))
    Util.deepStrictEqual(pipe(R.failure("e1"), R.orElseFail(() => "e2")), R.failure("e2"))
  })

  it("reduce", () => {
    Util.deepStrictEqual(
      pipe(R.success("bar"), R.Foldable.reduce("foo", (b, a) => b + a)),
      "foobar"
    )
    Util.deepStrictEqual(pipe(R.failure("bar"), R.Foldable.reduce("foo", (b, a) => b + a)), "foo")
  })

  it("getSuccess", () => {
    Util.deepStrictEqual(pipe(R.success(1), R.getSuccess), O.some(1))
    Util.deepStrictEqual(pipe(R.failure("a"), R.getSuccess), O.none())
  })

  it("getFailure", () => {
    Util.deepStrictEqual(pipe(R.success(1), R.getFailure), O.none())
    Util.deepStrictEqual(pipe(R.failure("e"), R.getFailure), O.some("e"))
  })

  it("getOrNull", () => {
    Util.deepStrictEqual(pipe(R.success(1), R.getOrNull), 1)
    Util.deepStrictEqual(pipe(R.failure("a"), R.getOrNull), null)
  })

  it("getOrUndefined", () => {
    Util.deepStrictEqual(pipe(R.success(1), R.getOrUndefined), 1)
    Util.deepStrictEqual(pipe(R.failure("a"), R.getOrUndefined), undefined)
  })

  it("compact", () => {
    Util.deepStrictEqual(pipe(R.success(O.some(1)), R.compact(() => "e2")), R.success(1))
    Util.deepStrictEqual(pipe(R.success(O.none()), R.compact(() => "e2")), R.failure("e2"))
    Util.deepStrictEqual(pipe(R.failure("e1"), R.compact(() => "e2")), R.failure("e1"))
  })

  it("inspectSuccess", () => {
    const log: Array<number> = []
    pipe(R.success(1), R.inspectSuccess((e) => log.push(e)))
    pipe(R.failure("e"), R.inspectSuccess((e) => log.push(e)))
    Util.deepStrictEqual(log, [1])
  })

  it("tapError", () => {
    Util.deepStrictEqual(pipe(R.success(1), R.tapError(() => R.success(2))), R.success(1))
    Util.deepStrictEqual(pipe(R.failure("a"), R.tapError(() => R.success(2))), R.failure("a"))
    Util.deepStrictEqual(pipe(R.failure("a"), R.tapError(() => R.failure("b"))), R.failure("b"))
  })

  it("inspectFailure", () => {
    const log: Array<string> = []
    pipe(R.success(1), R.inspectFailure((e) => log.push(e)))
    pipe(R.failure("e"), R.inspectFailure((e) => log.push(e)))
    Util.deepStrictEqual(log, ["e"])
  })

  it("getOrThrow", () => {
    expect(pipe(R.success(1), R.getOrThrow)).toEqual(1)
    expect(() => pipe(R.failure("e"), R.getOrThrow)).toThrowError(
      new Error("getOrThrow called on a Failure")
    )
  })

  it("getOrThrowWith", () => {
    expect(pipe(R.success(1), R.getOrThrowWith((e) => new Error(`Unexpected Failure: ${e}`))))
      .toEqual(
        1
      )
    expect(() =>
      pipe(R.failure("e"), R.getOrThrowWith((e) => new Error(`Unexpected Failure: ${e}`)))
    )
      .toThrowError(
        new Error("Unexpected Failure: e")
      )
  })

  it("andThenDiscard", () => {
    Util.deepStrictEqual(pipe(R.success(1), R.andThenDiscard(R.success("a"))), R.success(1))
    Util.deepStrictEqual(pipe(R.success(1), R.andThenDiscard(R.failure(true))), R.failure(true))
    Util.deepStrictEqual(pipe(R.failure(1), R.andThenDiscard(R.success("a"))), R.failure(1))
    Util.deepStrictEqual(pipe(R.failure(1), R.andThenDiscard(R.failure(true))), R.failure(1))
  })

  it("andThen", () => {
    Util.deepStrictEqual(pipe(R.success(1), R.andThen(R.success("a"))), R.success("a"))
    Util.deepStrictEqual(pipe(R.success(1), R.andThen(R.failure(true))), R.failure(true))
    Util.deepStrictEqual(pipe(R.failure(1), R.andThen(R.success("a"))), R.failure(1))
    Util.deepStrictEqual(pipe(R.failure(1), R.andThen(R.failure(true))), R.failure(1))
  })

  it("orElse", () => {
    Util.deepStrictEqual(pipe(R.success(1), R.orElse(() => R.success(2))), R.success(1))
    Util.deepStrictEqual(pipe(R.success(1), R.orElse(() => R.failure("b"))), R.success(1))
    Util.deepStrictEqual(pipe(R.failure("a"), R.orElse(() => R.success(2))), R.success(2))
    Util.deepStrictEqual(pipe(R.failure("a"), R.orElse(() => R.failure("b"))), R.failure("b"))
  })

  it("orElseEither", () => {
    expect(pipe(R.success(1), R.orElseEither(() => R.success(2)))).toEqual(R.success(E.left(1)))
    expect(pipe(R.success(1), R.orElseEither(() => R.failure("b")))).toEqual(
      R.success(E.left(1))
    )
    expect(pipe(R.failure("a"), R.orElseEither(() => R.success(2)))).toEqual(
      R.success(E.right(2))
    )
    expect(pipe(R.failure("a"), R.orElseEither(() => R.failure("b")))).toEqual(R.failure("b"))
  })

  it("getSuccesses", () => {
    assert.deepStrictEqual(R.getSuccesses([]), [])
    assert.deepStrictEqual(R.getSuccesses([R.success(1), R.failure("a"), R.success(2)]), [1, 2])

    assert.deepStrictEqual(R.getSuccesses(new Set<R.Result<unknown, unknown>>()), [])
    assert.deepStrictEqual(R.getSuccesses(new Set([R.success(1), R.failure("a"), R.success(2)])), [
      1,
      2
    ])
  })

  it("getFailures", () => {
    assert.deepStrictEqual(R.getFailures([]), [])
    assert.deepStrictEqual(R.getFailures([R.success(1), R.failure("a"), R.success(2)]), ["a"])

    assert.deepStrictEqual(R.getFailures(new Set<R.Result<unknown, unknown>>()), [])
    assert.deepStrictEqual(R.getFailures(new Set([R.success(1), R.failure("a"), R.success(2)])), [
      "a"
    ])
  })

  it("map", () => {
    const f = R.map(S.length)
    Util.deepStrictEqual(pipe(R.success("abc"), f), R.success(3))
    Util.deepStrictEqual(pipe(R.failure("s"), f), R.failure("s"))
  })

  it("flatMap", () => {
    const f = R.flatMap<string, string, number>(flow(S.length, R.success))
    Util.deepStrictEqual(pipe(R.success("abc"), f), R.success(3))
    Util.deepStrictEqual(pipe(R.failure("maError"), f), R.failure("maError"))
  })

  it("bimap", () => {
    const f = R.bimap(S.length, (n: number) => n > 2)
    Util.deepStrictEqual(pipe(R.success(1), f), R.success(false))
  })

  it("mapFailure", () => {
    const f = R.mapFailure(Util.double)
    Util.deepStrictEqual(pipe(R.success("a"), f), R.success("a"))
    Util.deepStrictEqual(pipe(R.failure(1), f), R.failure(2))
  })

  it("traverse", () => {
    const traverse = R.traverse(O.Applicative)((
      n: number
    ) => (n >= 2 ? O.some(n) : O.none()))
    Util.deepStrictEqual(pipe(R.failure("a"), traverse), O.some(R.failure("a")))
    Util.deepStrictEqual(pipe(R.success(1), traverse), O.none())
    Util.deepStrictEqual(pipe(R.success(3), traverse), O.some(R.success(3)))
  })

  it("sequence", () => {
    const sequence = R.sequence(O.Applicative)
    Util.deepStrictEqual(sequence(R.success(O.some(1))), O.some(R.success(1)))
    Util.deepStrictEqual(sequence(R.failure("a")), O.some(R.failure("a")))
    Util.deepStrictEqual(sequence(R.success(O.none())), O.none())
  })

  it("match", () => {
    const f = (s: string) => `failure${s.length}`
    const g = (s: string) => `success${s.length}`
    const match = R.match(f, g)
    Util.deepStrictEqual(match(R.failure("abc")), "failure3")
    Util.deepStrictEqual(match(R.success("abc")), "success3")
  })

  it("getOrElse", () => {
    Util.deepStrictEqual(pipe(R.success(12), R.getOrElse(() => 17)), 12)
    Util.deepStrictEqual(pipe(R.failure("a"), R.getOrElse(() => 17)), 17)
  })

  it("contains", () => {
    const contains = R.contains(N.Equivalence)
    Util.deepStrictEqual(pipe(R.failure("a"), contains(2)), false)
    Util.deepStrictEqual(pipe(R.success(2), contains(2)), true)
    Util.deepStrictEqual(pipe(R.success(2), contains(1)), false)
  })

  it("filter", () => {
    const predicate = (n: number) => n > 10
    Util.deepStrictEqual(pipe(R.success(12), R.filter(predicate, () => -1)), R.success(12))
    Util.deepStrictEqual(pipe(R.success(7), R.filter(predicate, () => -1)), R.failure(-1))
    Util.deepStrictEqual(pipe(R.failure(12), R.filter(predicate, () => -1)), R.failure(12))
  })

  it("isFailure", () => {
    Util.deepStrictEqual(R.isFailure(R.success(1)), false)
    Util.deepStrictEqual(R.isFailure(R.failure(1)), true)
  })

  it("isSuccess", () => {
    Util.deepStrictEqual(R.isSuccess(R.success(1)), true)
    Util.deepStrictEqual(R.isSuccess(R.failure(1)), false)
  })

  it("swap", () => {
    Util.deepStrictEqual(R.reverse(R.success("a")), R.failure("a"))
    Util.deepStrictEqual(R.reverse(R.failure("b")), R.success("b"))
  })

  it("liftPredicate", () => {
    const f = R.liftPredicate((n: number) => n >= 2, () => "e")
    Util.deepStrictEqual(f(3), R.success(3))
    Util.deepStrictEqual(f(1), R.failure("e"))
  })

  it("fromNullable", () => {
    Util.deepStrictEqual(R.fromNullable(() => "default")(null), R.failure("default"))
    Util.deepStrictEqual(R.fromNullable(() => "default")(undefined), R.failure("default"))
    Util.deepStrictEqual(R.fromNullable(() => "default")(1), R.success(1))
  })

  it("filterMap", () => {
    const p = (n: number) => n > 2
    const f = (n: number) => (p(n) ? O.some(n + 1) : O.none())
    Util.deepStrictEqual(pipe(R.failure("123"), R.filterMap(f, () => "")), R.failure("123"))
    Util.deepStrictEqual(pipe(R.success(1), R.filterMap(f, () => "")), R.failure(S.Monoid.empty))
    Util.deepStrictEqual(pipe(R.success(3), R.filterMap(f, () => "")), R.success(4))
  })

  it("fromIterable", () => {
    Util.deepStrictEqual(R.fromIterable(() => "e")([]), R.failure("e"))
    Util.deepStrictEqual(R.fromIterable(() => "e")(["a"]), R.success("a"))
  })

  it("firstSuccessOf", () => {
    Util.deepStrictEqual(pipe(R.success(1), R.firstSuccessOf([])), R.success(1))
    Util.deepStrictEqual(pipe(R.failure("e"), R.firstSuccessOf([])), R.failure("e"))
    Util.deepStrictEqual(
      pipe(
        R.failure("e1"),
        R.firstSuccessOf([R.failure("e2"), R.failure("e3"), R.failure("e4"), R.success(1)])
      ),
      R.success(1)
    )
    Util.deepStrictEqual(
      pipe(R.failure("e1"), R.firstSuccessOf([R.failure("e2"), R.failure("e3"), R.failure("e4")])),
      R.failure("e4")
    )
  })

  it("fromOption", () => {
    Util.deepStrictEqual(R.fromOption(() => "none")(O.none()), R.failure("none"))
    Util.deepStrictEqual(R.fromOption(() => "none")(O.some(1)), R.success(1))
  })

  it("liftOption", () => {
    const f = R.liftOption((n: number) => (n > 0 ? O.some(n) : O.none()), () => "a")
    Util.deepStrictEqual(f(1), R.success(1))
    Util.deepStrictEqual(f(-1), R.failure("a"))
  })

  it("flatMapOption", () => {
    const f = R.flatMapOption((n: number) => (n > 0 ? O.some(n) : O.none()), () => "a")
    Util.deepStrictEqual(f(R.success(1)), R.success(1))
    Util.deepStrictEqual(f(R.success(-1)), R.failure("a"))
    Util.deepStrictEqual(f(R.failure("b")), R.failure("b"))
  })

  it("exists", () => {
    const gt2 = R.exists((n: number) => n > 2)
    Util.deepStrictEqual(gt2(R.failure("a")), false)
    Util.deepStrictEqual(gt2(R.success(1)), false)
    Util.deepStrictEqual(gt2(R.success(3)), true)
  })

  it("do notation", () => {
    Util.deepStrictEqual(
      pipe(
        R.success(1),
        R.bindTo("a"),
        R.bind("b", () => R.success("b")),
        R.let("c", ({ a, b }) => [a, b])
      ),
      R.success({ a: 1, b: "b", c: [1, "b"] })
    )
  })

  it("andThenBind", () => {
    Util.deepStrictEqual(
      pipe(R.success(1), R.bindTo("a"), R.andThenBind("b", R.success("b"))),
      R.success({ a: 1, b: "b" })
    )
  })

  it("product", () => {
    const product = R.SemiProduct.product
    Util.deepStrictEqual(product(R.success(1), R.success("a")), R.success([1, "a"]))
    Util.deepStrictEqual(product(R.success(1), R.failure("e2")), R.failure("e2"))
    Util.deepStrictEqual(product(R.failure("e1"), R.success("a")), R.failure("e1"))
    Util.deepStrictEqual(product(R.failure("e1"), R.failure("2")), R.failure("e1"))
  })

  it("productMany", () => {
    const productMany: <E, A>(
      self: R.Result<E, A>,
      collection: Iterable<R.Result<E, A>>
    ) => R.Result<E, [A, ...Array<A>]> = R.SemiProduct.productMany

    Util.deepStrictEqual(productMany(R.success(1), []), R.success([1]))
    Util.deepStrictEqual(
      productMany(R.success(1), [R.success(2), R.success(3)]),
      R.success([1, 2, 3])
    )
    Util.deepStrictEqual(
      productMany(R.success(1), [R.failure("e"), R.success(3)]),
      R.failure("e")
    )
    expect(
      productMany(R.failure("e"), [R.success(2), R.success(3)])
    ).toEqual(R.failure("e"))
  })

  it("productAll", () => {
    const productAll = R.Product.productAll
    Util.deepStrictEqual(productAll([]), R.success([]))
    Util.deepStrictEqual(
      productAll([R.success(1), R.success(2), R.success(3)]),
      R.success([1, 2, 3])
    )
    Util.deepStrictEqual(
      productAll([R.failure("e"), R.success(2), R.success(3)]),
      R.failure("e")
    )
  })

  it("coproduct", () => {
    const coproduct = R.SemiCoproduct.coproduct
    Util.deepStrictEqual(coproduct(R.success(1), R.success(2)), R.success(1))
    Util.deepStrictEqual(coproduct(R.success(1), R.failure("e2")), R.success(1))
    Util.deepStrictEqual(coproduct(R.failure("e1"), R.success(2)), R.success(2))
    Util.deepStrictEqual(coproduct(R.failure("e1"), R.failure("e2")), R.failure("e2"))
  })

  it("coproductMany", () => {
    const coproductMany = R.SemiCoproduct.coproductMany
    Util.deepStrictEqual(coproductMany(R.success(1), [R.success(2)]), R.success(1))
    Util.deepStrictEqual(
      coproductMany(R.success(1), [R.failure("e2")]),
      R.success(1)
    )
    Util.deepStrictEqual(coproductMany(R.failure("e1"), [R.success(2)]), R.success(2))
    Util.deepStrictEqual(coproductMany(R.failure("e1"), [R.failure("e2")]), R.failure("e2"))
  })

  it("element", () => {
    expect(pipe(R.success(1), R.tupled, R.appendElement(R.success("b")))).toEqual(
      R.success([1, "b"])
    )
  })

  it("liftNullable", () => {
    const f = R.liftNullable((n: number) => (n > 0 ? n : null), () => "error")
    Util.deepStrictEqual(f(1), R.success(1))
    Util.deepStrictEqual(f(-1), R.failure("error"))
  })

  it("flatMapNullable", () => {
    const f = R.flatMapNullable((n: number) => (n > 0 ? n : null), () => "error")
    Util.deepStrictEqual(f(R.success(1)), R.success(1))
    Util.deepStrictEqual(f(R.success(-1)), R.failure("error"))
    Util.deepStrictEqual(f(R.failure("a")), R.failure("a"))
  })

  it("merge", () => {
    Util.deepStrictEqual(R.merge(R.success(1)), 1)
    Util.deepStrictEqual(R.merge(R.failure("a")), "a")
  })

  it("liftThrowable", () => {
    const f = R.liftThrowable((s: string) => {
      const len = s.length
      if (len > 0) {
        return len
      }
      throw new Error("empty string")
    }, identity)
    Util.deepStrictEqual(f("a"), R.success(1))
    Util.deepStrictEqual(f(""), R.failure(new Error("empty string")))
  })

  it("zipWith", () => {
    expect(pipe(R.failure("a"), R.zipWith(R.success(2), (a, b) => a + b))).toEqual(R.failure("a"))
    expect(pipe(R.success(1), R.zipWith(R.failure("a"), (a, b) => a + b))).toEqual(R.failure("a"))
    expect(pipe(R.success(1), R.zipWith(R.success(2), (a, b) => a + b))).toEqual(R.success(3))
  })

  it("sum", () => {
    expect(pipe(R.failure("a"), R.sum(R.success(2)))).toEqual(R.failure("a"))
    expect(pipe(R.success(1), R.sum(R.failure("a")))).toEqual(R.failure("a"))
    expect(pipe(R.success(2), R.sum(R.success(3)))).toEqual(R.success(5))
  })

  it("multiply", () => {
    expect(pipe(R.failure("a"), R.multiply(R.success(2)))).toEqual(R.failure("a"))
    expect(pipe(R.success(1), R.multiply(R.failure("a")))).toEqual(R.failure("a"))
    expect(pipe(R.success(2), R.multiply(R.success(3)))).toEqual(R.success(6))
  })

  it("subtract", () => {
    expect(pipe(R.failure("a"), R.subtract(R.success(2)))).toEqual(R.failure("a"))
    expect(pipe(R.success(1), R.subtract(R.failure("a")))).toEqual(R.failure("a"))
    expect(pipe(R.success(2), R.subtract(R.success(3)))).toEqual(R.success(-1))
  })

  it("divide", () => {
    expect(pipe(R.failure("a"), R.divide(R.success(2)))).toEqual(R.failure("a"))
    expect(pipe(R.success(1), R.divide(R.failure("a")))).toEqual(R.failure("a"))
    expect(pipe(R.success(6), R.divide(R.success(3)))).toEqual(R.success(2))
  })

  it("getOptionalSemigroup", () => {
    const OS = R.getOptionalSemigroup(S.Semigroup)
    Util.deepStrictEqual(OS.combine(R.failure("e"), R.failure("e")), R.failure("e"))
    Util.deepStrictEqual(OS.combine(R.failure("e"), R.success("a")), R.success("a"))
    Util.deepStrictEqual(OS.combine(R.success("a"), R.failure("e")), R.success("a"))
    Util.deepStrictEqual(OS.combine(R.success("b"), R.success("a")), R.success("ba"))
    Util.deepStrictEqual(OS.combine(R.success("a"), R.success("b")), R.success("ab"))

    Util.deepStrictEqual(OS.combineMany(R.success("a"), [R.success("b")]), R.success("ab"))
    Util.deepStrictEqual(OS.combineMany(R.failure("e"), [R.success("b")]), R.success("b"))
    Util.deepStrictEqual(OS.combineMany(R.success("a"), [R.failure("e")]), R.success("a"))
  })

  it("getEquivalence", () => {
    const isEquivalent = R.getEquivalence(S.Equivalence, N.Equivalence)
    Util.deepStrictEqual(isEquivalent(R.success(1), R.success(1)), true)
    Util.deepStrictEqual(isEquivalent(R.success(1), R.success(2)), false)
    Util.deepStrictEqual(isEquivalent(R.success(1), R.failure("foo")), false)
    Util.deepStrictEqual(isEquivalent(R.failure("foo"), R.failure("foo")), true)
    Util.deepStrictEqual(isEquivalent(R.failure("foo"), R.failure("bar")), false)
    Util.deepStrictEqual(isEquivalent(R.failure("foo"), R.success(1)), false)
  })

  it("toArray", () => {
    expect(R.toArray(R.success(1))).toEqual([1])
    expect(R.toArray(R.failure("error"))).toEqual([])
  })
})
