import * as _ from "@fp-ts/core/Either"
import { flow, identity, pipe } from "@fp-ts/core/Function"
import { structural } from "@fp-ts/core/internal/effect"
import * as N from "@fp-ts/core/Number"
import * as O from "@fp-ts/core/Option"
import * as String from "@fp-ts/core/String"
import * as Util from "@fp-ts/core/test/util"

describe.concurrent("Either", () => {
  it("instances and derived exports", () => {
    expect(_.Invariant).exist
    expect(_.tupled).exist
    expect(_.bindTo).exist

    expect(_.Covariant).exist
    expect(_.map).exist
    expect(_.let).exist
    expect(_.flap).exist
    expect(_.as).exist
    expect(_.asUnit).exist

    expect(_.Bicovariant).exist
    expect(_.bimap).exist
    expect(_.mapLeft).exist

    expect(_.Of).exist
    expect(_.of).exist
    expect(_.unit).exist
    expect(_.Do).exist

    expect(_.Pointed).exist

    expect(_.FlatMap).exist
    expect(_.flatMap).exist
    expect(_.flatten).exist
    expect(_.andThen).exist
    expect(_.composeKleisliArrow).exist

    expect(_.Chainable).exist
    expect(_.bind).exist
    expect(_.tap).exist
    expect(_.andThenDiscard).exist

    expect(_.Monad).exist

    expect(_.SemiProduct).exist

    expect(_.Product).exist
    expect(_.tuple).exist
    expect(_.struct).exist

    expect(_.SemiApplicative).exist
    expect(_.getFirstLeftSemigroup).exist // liftSemigroup
    expect(_.lift2).exist
    expect(_.ap).exist
    expect(_.andThenDiscard).exist
    expect(_.andThen).exist

    expect(_.Applicative).exist
    expect(_.getFirstLeftMonoid).exist // liftMonoid

    expect(_.SemiCoproduct).exist
    expect(_.getFirstRightSemigroup).exist // getSemigroup

    expect(_.SemiAlternative).exist

    expect(_.Foldable).exist

    expect(_.Traversable).exist
    expect(_.traverse).exist
    expect(_.sequence).exist
    expect(_.traverseTap).exist
  })

  it("structural tracking", () => {
    expect(Util.ownKeys(_.left("a"))).toEqual(["_tag", "left"])
    expect(Util.ownKeys(_.right(1))).toEqual(["_tag", "right"])

    expect(Object.prototype.hasOwnProperty.call(_.left("a"), structural)).toEqual(false)
    expect(Object.prototype.hasOwnProperty.call(_.right(1), structural)).toEqual(false)

    expect(Util.isStructural(_.left("a"))).toEqual(true)
    expect(Util.isStructural(_.right(1))).toEqual(true)
  })

  it("toRefinement", () => {
    const f = (s: string | number): _.Either<string, string> =>
      typeof s === "string" ? _.right(s) : _.left("not a string")
    const isString = _.toRefinement(f)
    Util.deepStrictEqual(isString("s"), true)
    Util.deepStrictEqual(isString(1), false)
    type A = { readonly type: "A" }
    type B = { readonly type: "B" }
    type C = A | B
    const isA = _.toRefinement((
      c: C
    ) => (c.type === "A" ? _.right(c) : _.left("not as A")))
    Util.deepStrictEqual(isA({ type: "A" }), true)
    Util.deepStrictEqual(isA({ type: "B" }), false)
  })

  it("isEither", () => {
    Util.deepStrictEqual(pipe(_.right(1), _.isEither), true)
    Util.deepStrictEqual(pipe(_.left("e"), _.isEither), true)
    Util.deepStrictEqual(pipe(O.some(1), _.isEither), false)
  })

  it("orElseFail", () => {
    Util.deepStrictEqual(pipe(_.right(1), _.orElseFail(() => "e2")), _.right(1))
    Util.deepStrictEqual(pipe(_.left("e1"), _.orElseFail(() => "e2")), _.left("e2"))
  })

  it("reduce", () => {
    Util.deepStrictEqual(pipe(_.right("bar"), _.Foldable.reduce("foo", (b, a) => b + a)), "foobar")
    Util.deepStrictEqual(pipe(_.left("bar"), _.Foldable.reduce("foo", (b, a) => b + a)), "foo")
  })

  it("getRight", () => {
    Util.deepStrictEqual(pipe(_.right(1), _.getRight), O.some(1))
    Util.deepStrictEqual(pipe(_.left("a"), _.getRight), O.none())
  })

  it("getLeft", () => {
    Util.deepStrictEqual(pipe(_.right(1), _.getLeft), O.none())
    Util.deepStrictEqual(pipe(_.left("e"), _.getLeft), O.some("e"))
  })

  it("getOrNull", () => {
    Util.deepStrictEqual(pipe(_.right(1), _.getOrNull), 1)
    Util.deepStrictEqual(pipe(_.left("a"), _.getOrNull), null)
  })

  it("getOrUndefined", () => {
    Util.deepStrictEqual(pipe(_.right(1), _.getOrUndefined), 1)
    Util.deepStrictEqual(pipe(_.left("a"), _.getOrUndefined), undefined)
  })

  it("compact", () => {
    Util.deepStrictEqual(pipe(_.right(O.some(1)), _.compact(() => "e2")), _.right(1))
    Util.deepStrictEqual(pipe(_.right(O.none()), _.compact(() => "e2")), _.left("e2"))
    Util.deepStrictEqual(pipe(_.left("e1"), _.compact(() => "e2")), _.left("e1"))
  })

  it("inspectRight", () => {
    const log: Array<number> = []
    pipe(_.right(1), _.inspectRight((e) => log.push(e)))
    pipe(_.left("e"), _.inspectRight((e) => log.push(e)))
    Util.deepStrictEqual(log, [1])
  })

  it("tapError", () => {
    Util.deepStrictEqual(pipe(_.right(1), _.tapError(() => _.right(2))), _.right(1))
    Util.deepStrictEqual(pipe(_.left("a"), _.tapError(() => _.right(2))), _.left("a"))
    Util.deepStrictEqual(pipe(_.left("a"), _.tapError(() => _.left("b"))), _.left("b"))
  })

  it("inspectLeft", () => {
    const log: Array<string> = []
    pipe(_.right(1), _.inspectLeft((e) => log.push(e)))
    pipe(_.left("e"), _.inspectLeft((e) => log.push(e)))
    Util.deepStrictEqual(log, ["e"])
  })

  it("getOrThrow", () => {
    expect(pipe(_.right(1), _.getOrThrow((e: string) => new Error(e)))).toEqual(1)
    expect(() => pipe(_.left("e"), _.getOrThrow((e: string) => new Error(e)))).toThrowError(
      new Error("e")
    )
    expect(() => pipe(_.left("e"), _.getOrThrow())).toThrowError(
      new Error("getOrThrow called on a Left")
    )
  })

  it("andThenDiscard", () => {
    Util.deepStrictEqual(pipe(_.right(1), _.andThenDiscard(_.right("a"))), _.right(1))
    Util.deepStrictEqual(pipe(_.right(1), _.andThenDiscard(_.left(true))), _.left(true))
    Util.deepStrictEqual(pipe(_.left(1), _.andThenDiscard(_.right("a"))), _.left(1))
    Util.deepStrictEqual(pipe(_.left(1), _.andThenDiscard(_.left(true))), _.left(1))
  })

  it("andThen", () => {
    Util.deepStrictEqual(pipe(_.right(1), _.andThen(_.right("a"))), _.right("a"))
    Util.deepStrictEqual(pipe(_.right(1), _.andThen(_.left(true))), _.left(true))
    Util.deepStrictEqual(pipe(_.left(1), _.andThen(_.right("a"))), _.left(1))
    Util.deepStrictEqual(pipe(_.left(1), _.andThen(_.left(true))), _.left(1))
  })

  it("orElse", () => {
    Util.deepStrictEqual(pipe(_.right(1), _.orElse(() => _.right(2))), _.right(1))
    Util.deepStrictEqual(pipe(_.right(1), _.orElse(() => _.left("b"))), _.right(1))
    Util.deepStrictEqual(pipe(_.left("a"), _.orElse(() => _.right(2))), _.right(2))
    Util.deepStrictEqual(pipe(_.left("a"), _.orElse(() => _.left("b"))), _.left("b"))
  })

  it("orElseEither", () => {
    expect(pipe(_.right(1), _.orElseEither(() => _.right(2)))).toEqual(_.right(_.left(1)))
    expect(pipe(_.right(1), _.orElseEither(() => _.left("b")))).toEqual(_.right(_.left(1)))
    expect(pipe(_.left("a"), _.orElseEither(() => _.right(2)))).toEqual(_.right(_.right(2)))
    expect(pipe(_.left("a"), _.orElseEither(() => _.left("b")))).toEqual(_.left("b"))
  })

  it("map", () => {
    const f = _.map(String.length)
    Util.deepStrictEqual(pipe(_.right("abc"), f), _.right(3))
    Util.deepStrictEqual(pipe(_.left("s"), f), _.left("s"))
  })

  it("flatMap", () => {
    const f = _.flatMap<string, string, number>(flow(String.length, _.right))
    Util.deepStrictEqual(pipe(_.right("abc"), f), _.right(3))
    Util.deepStrictEqual(pipe(_.left("maError"), f), _.left("maError"))
  })

  it("bimap", () => {
    const f = _.bimap(String.length, (n: number) => n > 2)
    Util.deepStrictEqual(pipe(_.right(1), f), _.right(false))
  })

  it("mapLeft", () => {
    const f = _.mapLeft(Util.double)
    Util.deepStrictEqual(pipe(_.right("a"), f), _.right("a"))
    Util.deepStrictEqual(pipe(_.left(1), f), _.left(2))
  })

  it("traverse", () => {
    const traverse = _.traverse(O.Applicative)((
      n: number
    ) => (n >= 2 ? O.some(n) : O.none()))
    Util.deepStrictEqual(pipe(_.left("a"), traverse), O.some(_.left("a")))
    Util.deepStrictEqual(pipe(_.right(1), traverse), O.none())
    Util.deepStrictEqual(pipe(_.right(3), traverse), O.some(_.right(3)))
  })

  it("sequence", () => {
    const sequence = _.sequence(O.Applicative)
    Util.deepStrictEqual(sequence(_.right(O.some(1))), O.some(_.right(1)))
    Util.deepStrictEqual(sequence(_.left("a")), O.some(_.left("a")))
    Util.deepStrictEqual(sequence(_.right(O.none())), O.none())
  })

  it("match", () => {
    const f = (s: string) => `left${s.length}`
    const g = (s: string) => `right${s.length}`
    const match = _.match(f, g)
    Util.deepStrictEqual(match(_.left("abc")), "left3")
    Util.deepStrictEqual(match(_.right("abc")), "right3")
  })

  it("getOrElse", () => {
    Util.deepStrictEqual(pipe(_.right(12), _.getOrElse(() => 17)), 12)
    Util.deepStrictEqual(pipe(_.left("a"), _.getOrElse(() => 17)), 17)
  })

  it("contains", () => {
    const contains = _.contains(N.Equivalence)
    Util.deepStrictEqual(pipe(_.left("a"), contains(2)), false)
    Util.deepStrictEqual(pipe(_.right(2), contains(2)), true)
    Util.deepStrictEqual(pipe(_.right(2), contains(1)), false)
  })

  it("filter", () => {
    const predicate = (n: number) => n > 10
    Util.deepStrictEqual(pipe(_.right(12), _.filter(predicate, () => -1)), _.right(12))
    Util.deepStrictEqual(pipe(_.right(7), _.filter(predicate, () => -1)), _.left(-1))
    Util.deepStrictEqual(pipe(_.left(12), _.filter(predicate, () => -1)), _.left(12))
  })

  it("isLeft", () => {
    Util.deepStrictEqual(_.isLeft(_.right(1)), false)
    Util.deepStrictEqual(_.isLeft(_.left(1)), true)
  })

  it("isRight", () => {
    Util.deepStrictEqual(_.isRight(_.right(1)), true)
    Util.deepStrictEqual(_.isRight(_.left(1)), false)
  })

  it("swap", () => {
    Util.deepStrictEqual(_.reverse(_.right("a")), _.left("a"))
    Util.deepStrictEqual(_.reverse(_.left("b")), _.right("b"))
  })

  it("liftPredicate", () => {
    const f = _.liftPredicate((n: number) => n >= 2, () => "e")
    Util.deepStrictEqual(f(3), _.right(3))
    Util.deepStrictEqual(f(1), _.left("e"))
  })

  it("fromNullable", () => {
    Util.deepStrictEqual(_.fromNullable(() => "default")(null), _.left("default"))
    Util.deepStrictEqual(_.fromNullable(() => "default")(undefined), _.left("default"))
    Util.deepStrictEqual(_.fromNullable(() => "default")(1), _.right(1))
  })

  it("filterMap", () => {
    const p = (n: number) => n > 2
    const f = (n: number) => (p(n) ? O.some(n + 1) : O.none())
    Util.deepStrictEqual(pipe(_.left("123"), _.filterMap(f, () => "")), _.left("123"))
    Util.deepStrictEqual(pipe(_.right(1), _.filterMap(f, () => "")), _.left(String.Monoid.empty))
    Util.deepStrictEqual(pipe(_.right(3), _.filterMap(f, () => "")), _.right(4))
  })

  it("fromIterable", () => {
    Util.deepStrictEqual(_.fromIterable(() => "e")([]), _.left("e"))
    Util.deepStrictEqual(_.fromIterable(() => "e")(["a"]), _.right("a"))
  })

  it("firstRightOf", () => {
    Util.deepStrictEqual(pipe(_.right(1), _.firstRightOf([])), _.right(1))
    Util.deepStrictEqual(pipe(_.left("e"), _.firstRightOf([])), _.left("e"))
    Util.deepStrictEqual(
      pipe(_.left("e1"), _.firstRightOf([_.left("e2"), _.left("e3"), _.left("e4"), _.right(1)])),
      _.right(1)
    )
    Util.deepStrictEqual(
      pipe(_.left("e1"), _.firstRightOf([_.left("e2"), _.left("e3"), _.left("e4")])),
      _.left("e4")
    )
  })

  it("fromOption", () => {
    Util.deepStrictEqual(_.fromOption(() => "none")(O.none()), _.left("none"))
    Util.deepStrictEqual(_.fromOption(() => "none")(O.some(1)), _.right(1))
  })

  it("liftOption", () => {
    const f = _.liftOption((n: number) => (n > 0 ? O.some(n) : O.none()), () => "a")
    Util.deepStrictEqual(f(1), _.right(1))
    Util.deepStrictEqual(f(-1), _.left("a"))
  })

  it("flatMapOption", () => {
    const f = _.flatMapOption((n: number) => (n > 0 ? O.some(n) : O.none()), () => "a")
    Util.deepStrictEqual(f(_.right(1)), _.right(1))
    Util.deepStrictEqual(f(_.right(-1)), _.left("a"))
    Util.deepStrictEqual(f(_.left("b")), _.left("b"))
  })

  it("exists", () => {
    const gt2 = _.exists((n: number) => n > 2)
    Util.deepStrictEqual(gt2(_.left("a")), false)
    Util.deepStrictEqual(gt2(_.right(1)), false)
    Util.deepStrictEqual(gt2(_.right(3)), true)
  })

  it("do notation", () => {
    Util.deepStrictEqual(
      pipe(
        _.right(1),
        _.bindTo("a"),
        _.bind("b", () => _.right("b")),
        _.let("c", ({ a, b }) => [a, b])
      ),
      _.right({ a: 1, b: "b", c: [1, "b"] })
    )
  })

  it("andThenBind", () => {
    Util.deepStrictEqual(
      pipe(_.right(1), _.bindTo("a"), _.andThenBind("b", _.right("b"))),
      _.right({ a: 1, b: "b" })
    )
  })

  it("product", () => {
    const product = _.SemiProduct.product
    Util.deepStrictEqual(product(_.right(1), _.right("a")), _.right([1, "a"]))
    Util.deepStrictEqual(product(_.right(1), _.left("e2")), _.left("e2"))
    Util.deepStrictEqual(product(_.left("e1"), _.right("a")), _.left("e1"))
    Util.deepStrictEqual(product(_.left("e1"), _.left("2")), _.left("e1"))
  })

  it("productMany", () => {
    const productMany: <E, A>(
      self: _.Either<E, A>,
      collection: Iterable<_.Either<E, A>>
    ) => _.Either<E, [A, ...Array<A>]> = _.SemiProduct.productMany

    Util.deepStrictEqual(productMany(_.right(1), []), _.right([1]))
    Util.deepStrictEqual(
      productMany(_.right(1), [_.right(2), _.right(3)]),
      _.right([1, 2, 3])
    )
    Util.deepStrictEqual(
      productMany(_.right(1), [_.left("e"), _.right(3)]),
      _.left("e")
    )
    expect(
      productMany(_.left("e"), [_.right(2), _.right(3)])
    ).toEqual(_.left("e"))
  })

  it("productAll", () => {
    const productAll = _.Product.productAll
    Util.deepStrictEqual(productAll([]), _.right([]))
    Util.deepStrictEqual(
      productAll([_.right(1), _.right(2), _.right(3)]),
      _.right([1, 2, 3])
    )
    Util.deepStrictEqual(
      productAll([_.left("e"), _.right(2), _.right(3)]),
      _.left("e")
    )
  })

  it("coproduct", () => {
    const coproduct = _.SemiCoproduct.coproduct
    Util.deepStrictEqual(coproduct(_.right(1), _.right(2)), _.right(1))
    Util.deepStrictEqual(coproduct(_.right(1), _.left("e2")), _.right(1))
    Util.deepStrictEqual(coproduct(_.left("e1"), _.right(2)), _.right(2))
    Util.deepStrictEqual(coproduct(_.left("e1"), _.left("e2")), _.left("e2"))
  })

  it("coproductMany", () => {
    const coproductMany = _.SemiCoproduct.coproductMany
    Util.deepStrictEqual(coproductMany(_.right(1), [_.right(2)]), _.right(1))
    Util.deepStrictEqual(
      coproductMany(_.right(1), [_.left("e2")]),
      _.right(1)
    )
    Util.deepStrictEqual(coproductMany(_.left("e1"), [_.right(2)]), _.right(2))
    Util.deepStrictEqual(coproductMany(_.left("e1"), [_.left("e2")]), _.left("e2"))
  })

  it("element", () => {
    expect(pipe(_.right(1), _.tupled, _.appendElement(_.right("b")))).toEqual(
      _.right([1, "b"])
    )
  })

  it("liftNullable", () => {
    const f = _.liftNullable((n: number) => (n > 0 ? n : null), () => "error")
    Util.deepStrictEqual(f(1), _.right(1))
    Util.deepStrictEqual(f(-1), _.left("error"))
  })

  it("flatMapNullable", () => {
    const f = _.flatMapNullable((n: number) => (n > 0 ? n : null), () => "error")
    Util.deepStrictEqual(f(_.right(1)), _.right(1))
    Util.deepStrictEqual(f(_.right(-1)), _.left("error"))
    Util.deepStrictEqual(f(_.left("a")), _.left("a"))
  })

  it("merge", () => {
    Util.deepStrictEqual(_.merge(_.right(1)), 1)
    Util.deepStrictEqual(_.merge(_.left("a")), "a")
  })

  it("liftThrowable", () => {
    const f = _.liftThrowable((s: string) => {
      const len = s.length
      if (len > 0) {
        return len
      }
      throw new Error("empty string")
    }, identity)
    Util.deepStrictEqual(f("a"), _.right(1))
    Util.deepStrictEqual(f(""), _.left(new Error("empty string")))
  })

  it("zipWith", () => {
    expect(pipe(_.left("a"), _.zipWith(_.right(2), (a, b) => a + b))).toEqual(_.left("a"))
    expect(pipe(_.right(1), _.zipWith(_.left("a"), (a, b) => a + b))).toEqual(_.left("a"))
    expect(pipe(_.right(1), _.zipWith(_.right(2), (a, b) => a + b))).toEqual(_.right(3))
  })

  it("sum", () => {
    expect(pipe(_.left("a"), _.sum(_.right(2)))).toEqual(_.left("a"))
    expect(pipe(_.right(1), _.sum(_.left("a")))).toEqual(_.left("a"))
    expect(pipe(_.right(2), _.sum(_.right(3)))).toEqual(_.right(5))
  })

  it("multiply", () => {
    expect(pipe(_.left("a"), _.multiply(_.right(2)))).toEqual(_.left("a"))
    expect(pipe(_.right(1), _.multiply(_.left("a")))).toEqual(_.left("a"))
    expect(pipe(_.right(2), _.multiply(_.right(3)))).toEqual(_.right(6))
  })

  it("subtract", () => {
    expect(pipe(_.left("a"), _.subtract(_.right(2)))).toEqual(_.left("a"))
    expect(pipe(_.right(1), _.subtract(_.left("a")))).toEqual(_.left("a"))
    expect(pipe(_.right(2), _.subtract(_.right(3)))).toEqual(_.right(-1))
  })

  it("divide", () => {
    expect(pipe(_.left("a"), _.divide(_.right(2)))).toEqual(_.left("a"))
    expect(pipe(_.right(1), _.divide(_.left("a")))).toEqual(_.left("a"))
    expect(pipe(_.right(6), _.divide(_.right(3)))).toEqual(_.right(2))
  })

  it("sumBigint", () => {
    expect(pipe(_.left("a"), _.sumBigint(_.right(2n)))).toEqual(_.left("a"))
    expect(pipe(_.right(1n), _.sumBigint(_.left("a")))).toEqual(_.left("a"))
    expect(pipe(_.right(2n), _.sumBigint(_.right(3n)))).toEqual(_.right(5n))
  })

  it("multiplyBigint", () => {
    expect(pipe(_.left("a"), _.multiplyBigint(_.right(2n)))).toEqual(_.left("a"))
    expect(pipe(_.right(1n), _.multiplyBigint(_.left("a")))).toEqual(_.left("a"))
    expect(pipe(_.right(2n), _.multiplyBigint(_.right(3n)))).toEqual(_.right(6n))
  })

  it("subtractBigint", () => {
    expect(pipe(_.left("a"), _.subtractBigint(_.right(2n)))).toEqual(_.left("a"))
    expect(pipe(_.right(1n), _.subtractBigint(_.left("a")))).toEqual(_.left("a"))
    expect(pipe(_.right(2n), _.subtractBigint(_.right(3n)))).toEqual(_.right(-1n))
  })

  it("getOptionalSemigroup", () => {
    const S = _.getOptionalSemigroup(String.Semigroup)
    Util.deepStrictEqual(S.combine(_.left("e"), _.left("e")), _.left("e"))
    Util.deepStrictEqual(S.combine(_.left("e"), _.right("a")), _.right("a"))
    Util.deepStrictEqual(S.combine(_.right("a"), _.left("e")), _.right("a"))
    Util.deepStrictEqual(S.combine(_.right("b"), _.right("a")), _.right("ba"))
    Util.deepStrictEqual(S.combine(_.right("a"), _.right("b")), _.right("ab"))

    Util.deepStrictEqual(S.combineMany(_.right("a"), [_.right("b")]), _.right("ab"))
    Util.deepStrictEqual(S.combineMany(_.left("e"), [_.right("b")]), _.right("b"))
    Util.deepStrictEqual(S.combineMany(_.right("a"), [_.left("e")]), _.right("a"))
  })
})
