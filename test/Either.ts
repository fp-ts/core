import * as _ from "@fp-ts/core/Either"
import { flow, identity, pipe } from "@fp-ts/core/Function"
import * as O from "@fp-ts/core/Option"
import * as String from "@fp-ts/core/String"
import { deepStrictEqual, double } from "@fp-ts/core/test/util"
import { number } from "@fp-ts/core/typeclass/Equivalence"

describe.concurrent("Either", () => {
  it("instances and derived exports", () => {
    expect(_.Invariant).exist
    expect(_.imap).exist
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
    expect(_.lift3).exist
    expect(_.ap).exist
    expect(_.andThenDiscard).exist
    expect(_.andThen).exist

    expect(_.Applicative).exist
    expect(_.getFirstLeftMonoid).exist // liftMonoid

    expect(_.SemiCoproduct).exist
    expect(_.getFirstRightSemigroup).exist // getSemigroup
    expect(_.firstSuccessOf).exist

    expect(_.SemiAlternative).exist

    expect(_.Foldable).exist

    expect(_.Traversable).exist
    expect(_.traverse).exist
    expect(_.sequence).exist
    expect(_.traverseTap).exist
  })

  it("toRefinement", () => {
    const f = (s: string | number): _.Either<string, string> =>
      typeof s === "string" ? _.right(s) : _.left("not a string")
    const isString = _.toRefinement(f)
    deepStrictEqual(isString("s"), true)
    deepStrictEqual(isString(1), false)
    type A = { readonly type: "A" }
    type B = { readonly type: "B" }
    type C = A | B
    const isA = _.toRefinement((
      c: C
    ) => (c.type === "A" ? _.right(c) : _.left("not as A")))
    deepStrictEqual(isA({ type: "A" }), true)
    deepStrictEqual(isA({ type: "B" }), false)
  })

  it("isEither", () => {
    deepStrictEqual(pipe(_.right(1), _.isEither), true)
    deepStrictEqual(pipe(_.left("e"), _.isEither), true)
    deepStrictEqual(pipe(O.some(1), _.isEither), false)
  })

  it("orElseFail", () => {
    deepStrictEqual(pipe(_.right(1), _.orElseFail(() => "e2")), _.right(1))
    deepStrictEqual(pipe(_.left("e1"), _.orElseFail(() => "e2")), _.left("e2"))
  })

  it("orElseSucceed", () => {
    deepStrictEqual(pipe(_.right(1), _.orElseSucceed(() => 2)), _.right(1))
    deepStrictEqual(pipe(_.left("e"), _.orElseSucceed(() => 2)), _.right(2))
  })

  it("reduce", () => {
    deepStrictEqual(pipe(_.right("bar"), _.Foldable.reduce("foo", (b, a) => b + a)), "foobar")
    deepStrictEqual(pipe(_.left("bar"), _.Foldable.reduce("foo", (b, a) => b + a)), "foo")
  })

  it("getRight", () => {
    deepStrictEqual(pipe(_.right(1), _.getRight), O.some(1))
    deepStrictEqual(pipe(_.left("a"), _.getRight), O.none())
  })

  it("getLeft", () => {
    deepStrictEqual(pipe(_.right(1), _.getLeft), O.none())
    deepStrictEqual(pipe(_.left("e"), _.getLeft), O.some("e"))
  })

  it("getOrNull", () => {
    deepStrictEqual(pipe(_.right(1), _.getOrNull), 1)
    deepStrictEqual(pipe(_.left("a"), _.getOrNull), null)
  })

  it("getOrUndefined", () => {
    deepStrictEqual(pipe(_.right(1), _.getOrUndefined), 1)
    deepStrictEqual(pipe(_.left("a"), _.getOrUndefined), undefined)
  })

  it("compact", () => {
    deepStrictEqual(pipe(_.right(O.some(1)), _.compact(() => "e2")), _.right(1))
    deepStrictEqual(pipe(_.right(O.none()), _.compact(() => "e2")), _.left("e2"))
    deepStrictEqual(pipe(_.left("e1"), _.compact(() => "e2")), _.left("e1"))
  })

  it("inspectRight", () => {
    const log: Array<number> = []
    pipe(_.right(1), _.inspectRight((e) => log.push(e)))
    pipe(_.left("e"), _.inspectRight((e) => log.push(e)))
    deepStrictEqual(log, [1])
  })

  it("tapError", () => {
    deepStrictEqual(pipe(_.right(1), _.tapError(() => _.right(2))), _.right(1))
    deepStrictEqual(pipe(_.left("a"), _.tapError(() => _.right(2))), _.left("a"))
    deepStrictEqual(pipe(_.left("a"), _.tapError(() => _.left("b"))), _.left("b"))
  })

  it("inspectLeft", () => {
    const log: Array<string> = []
    pipe(_.right(1), _.inspectLeft((e) => log.push(e)))
    pipe(_.left("e"), _.inspectLeft((e) => log.push(e)))
    deepStrictEqual(log, ["e"])
  })

  it("getOrThrow", () => {
    expect(pipe(_.right(1), _.getOrThrow((e: string) => new Error(e)))).toEqual(1)
    expect(() => pipe(_.left("e"), _.getOrThrow((e: string) => new Error(e)))).toThrow(
      new Error("e")
    )
  })

  it("andThenDiscard", () => {
    deepStrictEqual(pipe(_.right(1), _.andThenDiscard(_.right("a"))), _.right(1))
    deepStrictEqual(pipe(_.right(1), _.andThenDiscard(_.left(true))), _.left(true))
    deepStrictEqual(pipe(_.left(1), _.andThenDiscard(_.right("a"))), _.left(1))
    deepStrictEqual(pipe(_.left(1), _.andThenDiscard(_.left(true))), _.left(1))
  })

  it("andThen", () => {
    deepStrictEqual(pipe(_.right(1), _.andThen(_.right("a"))), _.right("a"))
    deepStrictEqual(pipe(_.right(1), _.andThen(_.left(true))), _.left(true))
    deepStrictEqual(pipe(_.left(1), _.andThen(_.right("a"))), _.left(1))
    deepStrictEqual(pipe(_.left(1), _.andThen(_.left(true))), _.left(1))
  })

  it("orElse", () => {
    deepStrictEqual(pipe(_.right(1), _.orElse(_.right(2))), _.right(1))
    deepStrictEqual(pipe(_.right(1), _.orElse(_.left("b"))), _.right(1))
    deepStrictEqual(pipe(_.left("a"), _.orElse(_.right(2))), _.right(2))
    deepStrictEqual(pipe(_.left("a"), _.orElse(_.left("b"))), _.left("b"))
  })

  it("orElseEither", () => {
    expect(pipe(_.right(1), _.orElseEither(_.right(2)))).toEqual(_.right(_.left(1)))
    expect(pipe(_.right(1), _.orElseEither(_.left("b")))).toEqual(_.right(_.left(1)))
    expect(pipe(_.left("a"), _.orElseEither(_.right(2)))).toEqual(_.right(_.right(2)))
    expect(pipe(_.left("a"), _.orElseEither(_.left("b")))).toEqual(_.left("b"))
  })

  it("map", () => {
    const f = _.map(String.size)
    deepStrictEqual(pipe(_.right("abc"), f), _.right(3))
    deepStrictEqual(pipe(_.left("s"), f), _.left("s"))
  })

  it("flatMap", () => {
    const f = _.flatMap<string, string, number>(flow(String.size, _.right))
    deepStrictEqual(pipe(_.right("abc"), f), _.right(3))
    deepStrictEqual(pipe(_.left("maError"), f), _.left("maError"))
  })

  it("bimap", () => {
    const f = _.bimap(String.size, (n: number) => n > 2)
    deepStrictEqual(pipe(_.right(1), f), _.right(false))
  })

  it("mapLeft", () => {
    const f = _.mapLeft(double)
    deepStrictEqual(pipe(_.right("a"), f), _.right("a"))
    deepStrictEqual(pipe(_.left(1), f), _.left(2))
  })

  it("traverse", () => {
    const traverse = _.traverse(O.Applicative)((
      n: number
    ) => (n >= 2 ? O.some(n) : O.none()))
    deepStrictEqual(pipe(_.left("a"), traverse), O.some(_.left("a")))
    deepStrictEqual(pipe(_.right(1), traverse), O.none())
    deepStrictEqual(pipe(_.right(3), traverse), O.some(_.right(3)))
  })

  it("sequence", () => {
    const sequence = _.sequence(O.Applicative)
    deepStrictEqual(sequence(_.right(O.some(1))), O.some(_.right(1)))
    deepStrictEqual(sequence(_.left("a")), O.some(_.left("a")))
    deepStrictEqual(sequence(_.right(O.none())), O.none())
  })

  it("match", () => {
    const f = (s: string) => `left${s.length}`
    const g = (s: string) => `right${s.length}`
    const match = _.match(f, g)
    deepStrictEqual(match(_.left("abc")), "left3")
    deepStrictEqual(match(_.right("abc")), "right3")
  })

  it("getOrElse", () => {
    deepStrictEqual(pipe(_.right(12), _.getOrElse(() => 17)), 12)
    deepStrictEqual(pipe(_.left("a"), _.getOrElse(() => 17)), 17)
  })

  it("contains", () => {
    const contains = _.contains(number)
    deepStrictEqual(pipe(_.left("a"), contains(2)), false)
    deepStrictEqual(pipe(_.right(2), contains(2)), true)
    deepStrictEqual(pipe(_.right(2), contains(1)), false)
  })

  it("filter", () => {
    const predicate = (n: number) => n > 10
    deepStrictEqual(pipe(_.right(12), _.filter(predicate, () => -1)), _.right(12))
    deepStrictEqual(pipe(_.right(7), _.filter(predicate, () => -1)), _.left(-1))
    deepStrictEqual(pipe(_.left(12), _.filter(predicate, () => -1)), _.left(12))
  })

  it("isLeft", () => {
    deepStrictEqual(_.isLeft(_.right(1)), false)
    deepStrictEqual(_.isLeft(_.left(1)), true)
  })

  it("isRight", () => {
    deepStrictEqual(_.isRight(_.right(1)), true)
    deepStrictEqual(_.isRight(_.left(1)), false)
  })

  it("catchAll", () => {
    deepStrictEqual(pipe(_.right(1), _.catchAll(() => _.right(2))), _.right(1))
    deepStrictEqual(pipe(_.right(1), _.catchAll(() => _.left("foo"))), _.right(1))
    deepStrictEqual(pipe(_.left("a"), _.catchAll(() => _.right(1))), _.right(1))
    deepStrictEqual(pipe(_.left("a"), _.catchAll(() => _.left("b"))), _.left("b"))
  })

  it("swap", () => {
    deepStrictEqual(_.reverse(_.right("a")), _.left("a"))
    deepStrictEqual(_.reverse(_.left("b")), _.right("b"))
  })

  it("liftPredicate", () => {
    const f = _.liftPredicate((n: number) => n >= 2, () => "e")
    deepStrictEqual(f(3), _.right(3))
    deepStrictEqual(f(1), _.left("e"))
  })

  it("fromNullable", () => {
    deepStrictEqual(_.fromNullable(() => "default")(null), _.left("default"))
    deepStrictEqual(_.fromNullable(() => "default")(undefined), _.left("default"))
    deepStrictEqual(_.fromNullable(() => "default")(1), _.right(1))
  })

  it("fromThrowable", () => {
    deepStrictEqual(
      _.fromThrowable(() => {
        return 1
      }, identity),
      _.right(1)
    )

    deepStrictEqual(
      _.fromThrowable(() => {
        throw "string error"
      }, identity),
      _.left("string error")
    )
  })

  it("filterMap", () => {
    const p = (n: number) => n > 2
    const f = (n: number) => (p(n) ? O.some(n + 1) : O.none())
    deepStrictEqual(pipe(_.left("123"), _.filterMap(f, () => "")), _.left("123"))
    deepStrictEqual(pipe(_.right(1), _.filterMap(f, () => "")), _.left(String.Monoid.empty))
    deepStrictEqual(pipe(_.right(3), _.filterMap(f, () => "")), _.right(4))
  })

  it("fromIterable", () => {
    deepStrictEqual(_.fromIterable(() => "e")([]), _.left("e"))
    deepStrictEqual(_.fromIterable(() => "e")(["a"]), _.right("a"))
  })

  it("firstSuccessOf", () => {
    deepStrictEqual(pipe(_.right(1), _.firstSuccessOf([])), _.right(1))
    deepStrictEqual(pipe(_.left("e"), _.firstSuccessOf([])), _.left("e"))
    deepStrictEqual(
      pipe(_.left("e1"), _.firstSuccessOf([_.left("e2"), _.left("e3"), _.left("e4"), _.right(1)])),
      _.right(1)
    )
    deepStrictEqual(
      pipe(_.left("e1"), _.firstSuccessOf([_.left("e2"), _.left("e3"), _.left("e4")])),
      _.left("e4")
    )
  })

  it("fromOption", () => {
    deepStrictEqual(_.fromOption(() => "none")(O.none()), _.left("none"))
    deepStrictEqual(_.fromOption(() => "none")(O.some(1)), _.right(1))
  })

  it("liftOption", () => {
    const f = _.liftOption((n: number) => (n > 0 ? O.some(n) : O.none()), () => "a")
    deepStrictEqual(f(1), _.right(1))
    deepStrictEqual(f(-1), _.left("a"))
  })

  it("flatMapOption", () => {
    const f = _.flatMapOption((n: number) => (n > 0 ? O.some(n) : O.none()), () => "a")
    deepStrictEqual(f(_.right(1)), _.right(1))
    deepStrictEqual(f(_.right(-1)), _.left("a"))
    deepStrictEqual(f(_.left("b")), _.left("b"))
  })

  it("exists", () => {
    const gt2 = _.exists((n: number) => n > 2)
    deepStrictEqual(gt2(_.left("a")), false)
    deepStrictEqual(gt2(_.right(1)), false)
    deepStrictEqual(gt2(_.right(3)), true)
  })

  it("do notation", () => {
    deepStrictEqual(
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
    deepStrictEqual(
      pipe(_.right(1), _.bindTo("a"), _.andThenBind("b", _.right("b"))),
      _.right({ a: 1, b: "b" })
    )
  })

  it("product", () => {
    const product = _.SemiProduct.product
    deepStrictEqual(product(_.right(1), _.right("a")), _.right([1, "a"]))
    deepStrictEqual(product(_.right(1), _.left("e2")), _.left("e2"))
    deepStrictEqual(product(_.left("e1"), _.right("a")), _.left("e1"))
    deepStrictEqual(product(_.left("e1"), _.left("2")), _.left("e1"))
  })

  it("productMany", () => {
    const productMany: <E, A>(
      self: _.Either<E, A>,
      collection: Iterable<_.Either<E, A>>
    ) => _.Either<E, [A, ...Array<A>]> = _.SemiProduct.productMany

    deepStrictEqual(productMany(_.right(1), []), _.right([1]))
    deepStrictEqual(
      productMany(_.right(1), [_.right(2), _.right(3)]),
      _.right([1, 2, 3])
    )
    deepStrictEqual(
      productMany(_.right(1), [_.left("e"), _.right(3)]),
      _.left("e")
    )
    expect(
      productMany(_.left("e"), [_.right(2), _.right(3)])
    ).toEqual(_.left("e"))
  })

  it("productAll", () => {
    const productAll = _.Product.productAll
    deepStrictEqual(productAll([]), _.right([]))
    deepStrictEqual(
      productAll([_.right(1), _.right(2), _.right(3)]),
      _.right([1, 2, 3])
    )
    deepStrictEqual(
      productAll([_.left("e"), _.right(2), _.right(3)]),
      _.left("e")
    )
  })

  it("coproduct", () => {
    const coproduct = _.SemiCoproduct.coproduct
    deepStrictEqual(coproduct(_.right(1), _.right(2)), _.right(1))
    deepStrictEqual(coproduct(_.right(1), _.left("e2")), _.right(1))
    deepStrictEqual(coproduct(_.left("e1"), _.right(2)), _.right(2))
    deepStrictEqual(coproduct(_.left("e1"), _.left("e2")), _.left("e2"))
  })

  it("coproductMany", () => {
    deepStrictEqual(pipe(_.right(1), _.SemiCoproduct.coproductMany([_.right(2)])), _.right(1))
    deepStrictEqual(
      pipe(
        _.right(1) as _.Either<string, number>,
        _.SemiCoproduct.coproductMany([_.left("e2") as _.Either<string, number>])
      ),
      _.right(1)
    )
    deepStrictEqual(
      pipe(
        _.left("e1") as _.Either<string, number>,
        _.SemiCoproduct.coproductMany([_.right(2) as _.Either<string, number>])
      ),
      _.right(2)
    )
    deepStrictEqual(
      pipe(_.left("e1"), _.SemiCoproduct.coproductMany([_.left("e2")])),
      _.left("e2")
    )
  })

  it("element", () => {
    expect(pipe(_.right(1), _.tupled, _.element(_.right("b")))).toEqual(
      _.right([1, "b"])
    )
  })

  it("liftNullable", () => {
    const f = _.liftNullable((n: number) => (n > 0 ? n : null), () => "error")
    deepStrictEqual(f(1), _.right(1))
    deepStrictEqual(f(-1), _.left("error"))
  })

  it("flatMapNullable", () => {
    const f = _.flatMapNullable((n: number) => (n > 0 ? n : null), () => "error")
    deepStrictEqual(f(_.right(1)), _.right(1))
    deepStrictEqual(f(_.right(-1)), _.left("error"))
    deepStrictEqual(f(_.left("a")), _.left("a"))
  })

  it("merge", () => {
    deepStrictEqual(_.merge(_.right(1)), 1)
    deepStrictEqual(_.merge(_.left("a")), "a")
  })

  it("liftThrowable", () => {
    const f = _.liftThrowable((s: string) => {
      const len = s.length
      if (len > 0) {
        return len
      }
      throw new Error("empty string")
    }, identity)
    deepStrictEqual(f("a"), _.right(1))
    deepStrictEqual(f(""), _.left(new Error("empty string")))
  })
})
