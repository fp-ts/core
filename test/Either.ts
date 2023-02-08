import * as E from "@fp-ts/core/Either"
import { flow, identity, pipe } from "@fp-ts/core/Function"
import { structural } from "@fp-ts/core/internal/effect"
import * as N from "@fp-ts/core/Number"
import * as O from "@fp-ts/core/Option"
import * as S from "@fp-ts/core/String"
import * as Util from "@fp-ts/core/test/util"

describe.concurrent("Either", () => {
  it("exports", () => {
    expect(E.toOption).exist
    expect(E.getRight).exist
    expect(E.getLeft).exist

    expect(E.Invariant).exist
    expect(E.tupled).exist
    expect(E.bindTo).exist

    expect(E.Covariant).exist
    expect(E.map).exist
    expect(E.let).exist
    expect(E.flap).exist
    expect(E.as).exist
    expect(E.asUnit).exist

    expect(E.Bicovariant).exist
    expect(E.bimap).exist
    expect(E.mapLeft).exist

    expect(E.Of).exist
    expect(E.of).exist
    expect(E.unit).exist
    expect(E.Do).exist

    expect(E.Pointed).exist

    expect(E.FlatMap).exist
    expect(E.flatMap).exist
    expect(E.flatten).exist
    expect(E.andThen).exist
    expect(E.composeKleisliArrow).exist

    expect(E.Chainable).exist
    expect(E.bind).exist
    expect(E.tap).exist
    expect(E.andThenDiscard).exist

    expect(E.Monad).exist

    expect(E.SemiProduct).exist

    expect(E.Product).exist
    expect(E.tuple).exist
    expect(E.struct).exist

    expect(E.SemiApplicative).exist
    expect(E.getFirstLeftSemigroup).exist // liftSemigroup
    expect(E.lift2).exist
    expect(E.ap).exist
    expect(E.andThenDiscard).exist
    expect(E.andThen).exist

    expect(E.Applicative).exist
    expect(E.getFirstLeftMonoid).exist // liftMonoid

    expect(E.SemiCoproduct).exist
    expect(E.getFirstRightSemigroup).exist // getSemigroup

    expect(E.SemiAlternative).exist

    expect(E.Foldable).exist

    expect(E.Traversable).exist
    expect(E.traverse).exist
    expect(E.sequence).exist
    expect(E.traverseTap).exist
  })

  it("structural tracking", () => {
    expect(Util.ownKeys(E.left("a"))).toEqual(["_tag", "left"])
    expect(Util.ownKeys(E.right(1))).toEqual(["_tag", "right"])

    expect(Object.prototype.hasOwnProperty.call(E.left("a"), structural)).toEqual(false)
    expect(Object.prototype.hasOwnProperty.call(E.right(1), structural)).toEqual(false)

    expect(Util.isStructural(E.left("a"))).toEqual(true)
    expect(Util.isStructural(E.right(1))).toEqual(true)
  })

  it("toRefinement", () => {
    const f = (s: string | number): E.Either<string, string> =>
      typeof s === "string" ? E.right(s) : E.left("not a string")
    const isString = E.toRefinement(f)
    Util.deepStrictEqual(isString("s"), true)
    Util.deepStrictEqual(isString(1), false)
    type A = { readonly type: "A" }
    type B = { readonly type: "B" }
    type C = A | B
    const isA = E.toRefinement((
      c: C
    ) => (c.type === "A" ? E.right(c) : E.left("not as A")))
    Util.deepStrictEqual(isA({ type: "A" }), true)
    Util.deepStrictEqual(isA({ type: "B" }), false)
  })

  it("isEither", () => {
    Util.deepStrictEqual(pipe(E.right(1), E.isEither), true)
    Util.deepStrictEqual(pipe(E.left("e"), E.isEither), true)
    Util.deepStrictEqual(pipe(O.some(1), E.isEither), false)
  })

  it("orElseFail", () => {
    Util.deepStrictEqual(pipe(E.right(1), E.orElseFail(() => "e2")), E.right(1))
    Util.deepStrictEqual(pipe(E.left("e1"), E.orElseFail(() => "e2")), E.left("e2"))
  })

  it("reduce", () => {
    Util.deepStrictEqual(pipe(E.right("bar"), E.Foldable.reduce("foo", (b, a) => b + a)), "foobar")
    Util.deepStrictEqual(pipe(E.left("bar"), E.Foldable.reduce("foo", (b, a) => b + a)), "foo")
  })

  it("getRight", () => {
    Util.deepStrictEqual(pipe(E.right(1), E.getRight), O.some(1))
    Util.deepStrictEqual(pipe(E.left("a"), E.getRight), O.none())
  })

  it("getLeft", () => {
    Util.deepStrictEqual(pipe(E.right(1), E.getLeft), O.none())
    Util.deepStrictEqual(pipe(E.left("e"), E.getLeft), O.some("e"))
  })

  it("getOrNull", () => {
    Util.deepStrictEqual(pipe(E.right(1), E.getOrNull), 1)
    Util.deepStrictEqual(pipe(E.left("a"), E.getOrNull), null)
  })

  it("getOrUndefined", () => {
    Util.deepStrictEqual(pipe(E.right(1), E.getOrUndefined), 1)
    Util.deepStrictEqual(pipe(E.left("a"), E.getOrUndefined), undefined)
  })

  it("compact", () => {
    Util.deepStrictEqual(pipe(E.right(O.some(1)), E.compact(() => "e2")), E.right(1))
    Util.deepStrictEqual(pipe(E.right(O.none()), E.compact(() => "e2")), E.left("e2"))
    Util.deepStrictEqual(pipe(E.left("e1"), E.compact(() => "e2")), E.left("e1"))
  })

  it("inspectRight", () => {
    const log: Array<number> = []
    pipe(E.right(1), E.inspectRight((e) => log.push(e)))
    pipe(E.left("e"), E.inspectRight((e) => log.push(e)))
    Util.deepStrictEqual(log, [1])
  })

  it("tapError", () => {
    Util.deepStrictEqual(pipe(E.right(1), E.tapError(() => E.right(2))), E.right(1))
    Util.deepStrictEqual(pipe(E.left("a"), E.tapError(() => E.right(2))), E.left("a"))
    Util.deepStrictEqual(pipe(E.left("a"), E.tapError(() => E.left("b"))), E.left("b"))
  })

  it("inspectLeft", () => {
    const log: Array<string> = []
    pipe(E.right(1), E.inspectLeft((e) => log.push(e)))
    pipe(E.left("e"), E.inspectLeft((e) => log.push(e)))
    Util.deepStrictEqual(log, ["e"])
  })

  it("getOrThrow", () => {
    expect(pipe(E.right(1), E.getOrThrow)).toEqual(1)
    expect(() => pipe(E.left("e"), E.getOrThrow)).toThrowError(
      new Error("getOrThrow called on a Left")
    )
  })

  it("getOrThrowWith", () => {
    expect(pipe(E.right(1), E.getOrThrowWith((e) => new Error(`Unexpected Left: ${e}`)))).toEqual(1)
    expect(() => pipe(E.left("e"), E.getOrThrowWith((e) => new Error(`Unexpected Left: ${e}`))))
      .toThrowError(
        new Error("Unexpected Left: e")
      )
  })

  it("andThenDiscard", () => {
    Util.deepStrictEqual(pipe(E.right(1), E.andThenDiscard(E.right("a"))), E.right(1))
    Util.deepStrictEqual(pipe(E.right(1), E.andThenDiscard(E.left(true))), E.left(true))
    Util.deepStrictEqual(pipe(E.left(1), E.andThenDiscard(E.right("a"))), E.left(1))
    Util.deepStrictEqual(pipe(E.left(1), E.andThenDiscard(E.left(true))), E.left(1))
  })

  it("andThen", () => {
    Util.deepStrictEqual(pipe(E.right(1), E.andThen(E.right("a"))), E.right("a"))
    Util.deepStrictEqual(pipe(E.right(1), E.andThen(E.left(true))), E.left(true))
    Util.deepStrictEqual(pipe(E.left(1), E.andThen(E.right("a"))), E.left(1))
    Util.deepStrictEqual(pipe(E.left(1), E.andThen(E.left(true))), E.left(1))
  })

  it("orElse", () => {
    Util.deepStrictEqual(pipe(E.right(1), E.orElse(() => E.right(2))), E.right(1))
    Util.deepStrictEqual(pipe(E.right(1), E.orElse(() => E.left("b"))), E.right(1))
    Util.deepStrictEqual(pipe(E.left("a"), E.orElse(() => E.right(2))), E.right(2))
    Util.deepStrictEqual(pipe(E.left("a"), E.orElse(() => E.left("b"))), E.left("b"))
  })

  it("orElseEither", () => {
    expect(pipe(E.right(1), E.orElseEither(() => E.right(2)))).toEqual(E.right(E.left(1)))
    expect(pipe(E.right(1), E.orElseEither(() => E.left("b")))).toEqual(E.right(E.left(1)))
    expect(pipe(E.left("a"), E.orElseEither(() => E.right(2)))).toEqual(E.right(E.right(2)))
    expect(pipe(E.left("a"), E.orElseEither(() => E.left("b")))).toEqual(E.left("b"))
  })

  it("map", () => {
    const f = E.map(S.length)
    Util.deepStrictEqual(pipe(E.right("abc"), f), E.right(3))
    Util.deepStrictEqual(pipe(E.left("s"), f), E.left("s"))
  })

  it("flatMap", () => {
    const f = E.flatMap<string, string, number>(flow(S.length, E.right))
    Util.deepStrictEqual(pipe(E.right("abc"), f), E.right(3))
    Util.deepStrictEqual(pipe(E.left("maError"), f), E.left("maError"))
  })

  it("bimap", () => {
    const f = E.bimap(S.length, (n: number) => n > 2)
    Util.deepStrictEqual(pipe(E.right(1), f), E.right(false))
  })

  it("mapLeft", () => {
    const f = E.mapLeft(Util.double)
    Util.deepStrictEqual(pipe(E.right("a"), f), E.right("a"))
    Util.deepStrictEqual(pipe(E.left(1), f), E.left(2))
  })

  it("traverse", () => {
    const traverse = E.traverse(O.Applicative)((
      n: number
    ) => (n >= 2 ? O.some(n) : O.none()))
    Util.deepStrictEqual(pipe(E.left("a"), traverse), O.some(E.left("a")))
    Util.deepStrictEqual(pipe(E.right(1), traverse), O.none())
    Util.deepStrictEqual(pipe(E.right(3), traverse), O.some(E.right(3)))
  })

  it("sequence", () => {
    const sequence = E.sequence(O.Applicative)
    Util.deepStrictEqual(sequence(E.right(O.some(1))), O.some(E.right(1)))
    Util.deepStrictEqual(sequence(E.left("a")), O.some(E.left("a")))
    Util.deepStrictEqual(sequence(E.right(O.none())), O.none())
  })

  it("match", () => {
    const f = (s: string) => `left${s.length}`
    const g = (s: string) => `right${s.length}`
    const match = E.match(f, g)
    Util.deepStrictEqual(match(E.left("abc")), "left3")
    Util.deepStrictEqual(match(E.right("abc")), "right3")
  })

  it("getOrElse", () => {
    Util.deepStrictEqual(pipe(E.right(12), E.getOrElse(() => 17)), 12)
    Util.deepStrictEqual(pipe(E.left("a"), E.getOrElse(() => 17)), 17)
  })

  it("contains", () => {
    const contains = E.contains(N.Equivalence)
    Util.deepStrictEqual(pipe(E.left("a"), contains(2)), false)
    Util.deepStrictEqual(pipe(E.right(2), contains(2)), true)
    Util.deepStrictEqual(pipe(E.right(2), contains(1)), false)
  })

  it("filter", () => {
    const predicate = (n: number) => n > 10
    Util.deepStrictEqual(pipe(E.right(12), E.filter(predicate, () => -1)), E.right(12))
    Util.deepStrictEqual(pipe(E.right(7), E.filter(predicate, () => -1)), E.left(-1))
    Util.deepStrictEqual(pipe(E.left(12), E.filter(predicate, () => -1)), E.left(12))
  })

  it("isLeft", () => {
    Util.deepStrictEqual(E.isLeft(E.right(1)), false)
    Util.deepStrictEqual(E.isLeft(E.left(1)), true)
  })

  it("isRight", () => {
    Util.deepStrictEqual(E.isRight(E.right(1)), true)
    Util.deepStrictEqual(E.isRight(E.left(1)), false)
  })

  it("swap", () => {
    Util.deepStrictEqual(E.reverse(E.right("a")), E.left("a"))
    Util.deepStrictEqual(E.reverse(E.left("b")), E.right("b"))
  })

  it("liftPredicate", () => {
    const f = E.liftPredicate((n: number) => n >= 2, () => "e")
    Util.deepStrictEqual(f(3), E.right(3))
    Util.deepStrictEqual(f(1), E.left("e"))
  })

  it("fromNullable", () => {
    Util.deepStrictEqual(E.fromNullable(() => "default")(null), E.left("default"))
    Util.deepStrictEqual(E.fromNullable(() => "default")(undefined), E.left("default"))
    Util.deepStrictEqual(E.fromNullable(() => "default")(1), E.right(1))
  })

  it("filterMap", () => {
    const p = (n: number) => n > 2
    const f = (n: number) => (p(n) ? O.some(n + 1) : O.none())
    Util.deepStrictEqual(pipe(E.left("123"), E.filterMap(f, () => "")), E.left("123"))
    Util.deepStrictEqual(pipe(E.right(1), E.filterMap(f, () => "")), E.left(S.Monoid.empty))
    Util.deepStrictEqual(pipe(E.right(3), E.filterMap(f, () => "")), E.right(4))
  })

  it("fromIterable", () => {
    Util.deepStrictEqual(E.fromIterable(() => "e")([]), E.left("e"))
    Util.deepStrictEqual(E.fromIterable(() => "e")(["a"]), E.right("a"))
  })

  it("firstRightOf", () => {
    Util.deepStrictEqual(pipe(E.right(1), E.firstRightOf([])), E.right(1))
    Util.deepStrictEqual(pipe(E.left("e"), E.firstRightOf([])), E.left("e"))
    Util.deepStrictEqual(
      pipe(E.left("e1"), E.firstRightOf([E.left("e2"), E.left("e3"), E.left("e4"), E.right(1)])),
      E.right(1)
    )
    Util.deepStrictEqual(
      pipe(E.left("e1"), E.firstRightOf([E.left("e2"), E.left("e3"), E.left("e4")])),
      E.left("e4")
    )
  })

  it("fromOption", () => {
    Util.deepStrictEqual(E.fromOption(() => "none")(O.none()), E.left("none"))
    Util.deepStrictEqual(E.fromOption(() => "none")(O.some(1)), E.right(1))
  })

  it("liftOption", () => {
    const f = E.liftOption((n: number) => (n > 0 ? O.some(n) : O.none()), () => "a")
    Util.deepStrictEqual(f(1), E.right(1))
    Util.deepStrictEqual(f(-1), E.left("a"))
  })

  it("flatMapOption", () => {
    const f = E.flatMapOption((n: number) => (n > 0 ? O.some(n) : O.none()), () => "a")
    Util.deepStrictEqual(f(E.right(1)), E.right(1))
    Util.deepStrictEqual(f(E.right(-1)), E.left("a"))
    Util.deepStrictEqual(f(E.left("b")), E.left("b"))
  })

  it("exists", () => {
    const gt2 = E.exists((n: number) => n > 2)
    Util.deepStrictEqual(gt2(E.left("a")), false)
    Util.deepStrictEqual(gt2(E.right(1)), false)
    Util.deepStrictEqual(gt2(E.right(3)), true)
  })

  it("do notation", () => {
    Util.deepStrictEqual(
      pipe(
        E.right(1),
        E.bindTo("a"),
        E.bind("b", () => E.right("b")),
        E.let("c", ({ a, b }) => [a, b])
      ),
      E.right({ a: 1, b: "b", c: [1, "b"] })
    )
  })

  it("andThenBind", () => {
    Util.deepStrictEqual(
      pipe(E.right(1), E.bindTo("a"), E.andThenBind("b", E.right("b"))),
      E.right({ a: 1, b: "b" })
    )
  })

  it("product", () => {
    const product = E.SemiProduct.product
    Util.deepStrictEqual(product(E.right(1), E.right("a")), E.right([1, "a"]))
    Util.deepStrictEqual(product(E.right(1), E.left("e2")), E.left("e2"))
    Util.deepStrictEqual(product(E.left("e1"), E.right("a")), E.left("e1"))
    Util.deepStrictEqual(product(E.left("e1"), E.left("2")), E.left("e1"))
  })

  it("productMany", () => {
    const productMany: <E, A>(
      self: E.Either<E, A>,
      collection: Iterable<E.Either<E, A>>
    ) => E.Either<E, [A, ...Array<A>]> = E.SemiProduct.productMany

    Util.deepStrictEqual(productMany(E.right(1), []), E.right([1]))
    Util.deepStrictEqual(
      productMany(E.right(1), [E.right(2), E.right(3)]),
      E.right([1, 2, 3])
    )
    Util.deepStrictEqual(
      productMany(E.right(1), [E.left("e"), E.right(3)]),
      E.left("e")
    )
    expect(
      productMany(E.left("e"), [E.right(2), E.right(3)])
    ).toEqual(E.left("e"))
  })

  it("productAll", () => {
    const productAll = E.Product.productAll
    Util.deepStrictEqual(productAll([]), E.right([]))
    Util.deepStrictEqual(
      productAll([E.right(1), E.right(2), E.right(3)]),
      E.right([1, 2, 3])
    )
    Util.deepStrictEqual(
      productAll([E.left("e"), E.right(2), E.right(3)]),
      E.left("e")
    )
  })

  it("coproduct", () => {
    const coproduct = E.SemiCoproduct.coproduct
    Util.deepStrictEqual(coproduct(E.right(1), E.right(2)), E.right(1))
    Util.deepStrictEqual(coproduct(E.right(1), E.left("e2")), E.right(1))
    Util.deepStrictEqual(coproduct(E.left("e1"), E.right(2)), E.right(2))
    Util.deepStrictEqual(coproduct(E.left("e1"), E.left("e2")), E.left("e2"))
  })

  it("coproductMany", () => {
    const coproductMany = E.SemiCoproduct.coproductMany
    Util.deepStrictEqual(coproductMany(E.right(1), [E.right(2)]), E.right(1))
    Util.deepStrictEqual(
      coproductMany(E.right(1), [E.left("e2")]),
      E.right(1)
    )
    Util.deepStrictEqual(coproductMany(E.left("e1"), [E.right(2)]), E.right(2))
    Util.deepStrictEqual(coproductMany(E.left("e1"), [E.left("e2")]), E.left("e2"))
  })

  it("element", () => {
    expect(pipe(E.right(1), E.tupled, E.appendElement(E.right("b")))).toEqual(
      E.right([1, "b"])
    )
  })

  it("liftNullable", () => {
    const f = E.liftNullable((n: number) => (n > 0 ? n : null), () => "error")
    Util.deepStrictEqual(f(1), E.right(1))
    Util.deepStrictEqual(f(-1), E.left("error"))
  })

  it("flatMapNullable", () => {
    const f = E.flatMapNullable((n: number) => (n > 0 ? n : null), () => "error")
    Util.deepStrictEqual(f(E.right(1)), E.right(1))
    Util.deepStrictEqual(f(E.right(-1)), E.left("error"))
    Util.deepStrictEqual(f(E.left("a")), E.left("a"))
  })

  it("merge", () => {
    Util.deepStrictEqual(E.merge(E.right(1)), 1)
    Util.deepStrictEqual(E.merge(E.left("a")), "a")
  })

  it("liftThrowable", () => {
    const f = E.liftThrowable((s: string) => {
      const len = s.length
      if (len > 0) {
        return len
      }
      throw new Error("empty string")
    }, identity)
    Util.deepStrictEqual(f("a"), E.right(1))
    Util.deepStrictEqual(f(""), E.left(new Error("empty string")))
  })

  it("zipWith", () => {
    expect(pipe(E.left("a"), E.zipWith(E.right(2), (a, b) => a + b))).toEqual(E.left("a"))
    expect(pipe(E.right(1), E.zipWith(E.left("a"), (a, b) => a + b))).toEqual(E.left("a"))
    expect(pipe(E.right(1), E.zipWith(E.right(2), (a, b) => a + b))).toEqual(E.right(3))
  })

  it("sum", () => {
    expect(pipe(E.left("a"), E.sum(E.right(2)))).toEqual(E.left("a"))
    expect(pipe(E.right(1), E.sum(E.left("a")))).toEqual(E.left("a"))
    expect(pipe(E.right(2), E.sum(E.right(3)))).toEqual(E.right(5))
  })

  it("multiply", () => {
    expect(pipe(E.left("a"), E.multiply(E.right(2)))).toEqual(E.left("a"))
    expect(pipe(E.right(1), E.multiply(E.left("a")))).toEqual(E.left("a"))
    expect(pipe(E.right(2), E.multiply(E.right(3)))).toEqual(E.right(6))
  })

  it("subtract", () => {
    expect(pipe(E.left("a"), E.subtract(E.right(2)))).toEqual(E.left("a"))
    expect(pipe(E.right(1), E.subtract(E.left("a")))).toEqual(E.left("a"))
    expect(pipe(E.right(2), E.subtract(E.right(3)))).toEqual(E.right(-1))
  })

  it("divide", () => {
    expect(pipe(E.left("a"), E.divide(E.right(2)))).toEqual(E.left("a"))
    expect(pipe(E.right(1), E.divide(E.left("a")))).toEqual(E.left("a"))
    expect(pipe(E.right(6), E.divide(E.right(3)))).toEqual(E.right(2))
  })

  it("getOptionalSemigroup", () => {
    const OS = E.getOptionalSemigroup(S.Semigroup)
    Util.deepStrictEqual(OS.combine(E.left("e"), E.left("e")), E.left("e"))
    Util.deepStrictEqual(OS.combine(E.left("e"), E.right("a")), E.right("a"))
    Util.deepStrictEqual(OS.combine(E.right("a"), E.left("e")), E.right("a"))
    Util.deepStrictEqual(OS.combine(E.right("b"), E.right("a")), E.right("ba"))
    Util.deepStrictEqual(OS.combine(E.right("a"), E.right("b")), E.right("ab"))

    Util.deepStrictEqual(OS.combineMany(E.right("a"), [E.right("b")]), E.right("ab"))
    Util.deepStrictEqual(OS.combineMany(E.left("e"), [E.right("b")]), E.right("b"))
    Util.deepStrictEqual(OS.combineMany(E.right("a"), [E.left("e")]), E.right("a"))
  })

  it("getEquivalence", () => {
    const isEquivalent = E.getEquivalence(S.Equivalence, N.Equivalence)
    Util.deepStrictEqual(isEquivalent(E.right(1), E.right(1)), true)
    Util.deepStrictEqual(isEquivalent(E.right(1), E.right(2)), false)
    Util.deepStrictEqual(isEquivalent(E.right(1), E.left("foo")), false)
    Util.deepStrictEqual(isEquivalent(E.left("foo"), E.left("foo")), true)
    Util.deepStrictEqual(isEquivalent(E.left("foo"), E.left("bar")), false)
    Util.deepStrictEqual(isEquivalent(E.left("foo"), E.right(1)), false)
  })

  it("toArray", () => {
    expect(E.toArray(E.right(1))).toEqual([1])
    expect(E.toArray(E.left("error"))).toEqual([])
  })
})
