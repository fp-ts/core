import * as E from "@fp-ts/core/Either"
import { identity, pipe } from "@fp-ts/core/Function"
import { structural } from "@fp-ts/core/internal/effect"
import * as N from "@fp-ts/core/Number"
import * as O from "@fp-ts/core/Option"
import * as S from "@fp-ts/core/String"
import * as _ from "@fp-ts/core/These"
import { number } from "@fp-ts/core/typeclass/Equivalence"
import * as Util from "./util"

describe("These", () => {
  it("instances and derived exports", () => {
    expect(_.Invariant).exist
    expect(_.tupled).exist
    expect(_.bindTo).exist

    expect(_.Bicovariant).exist
    expect(_.mapLeft).exist

    expect(_.Covariant).exist
    expect(_.map).exist
    expect(_.let).exist
    expect(_.flap).exist
    expect(_.as).exist
    expect(_.asUnit).exist

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
    expect(_.andThenBind).exist
    expect(_.appendElement).exist

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
    // expect(_.coproduct).exist
    expect(_.firstRightOrBothOf).exist // coproductMany
    expect(_.getFirstRightOrBothSemigroup).exist // getSemigroup
    // expect(_.coproductEither).exist // orElseEither

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
    expect(Util.ownKeys(_.both("a", 1))).toEqual(["_tag", "left", "right"])

    expect(Object.prototype.hasOwnProperty.call(_.left("a"), structural)).toEqual(false)
    expect(Object.prototype.hasOwnProperty.call(_.right(1), structural)).toEqual(false)
    expect(Object.prototype.hasOwnProperty.call(_.both("a", 1), structural)).toEqual(false)

    expect(Util.isStructural(_.left("a"))).toEqual(true)
    expect(Util.isStructural(_.right(1))).toEqual(true)
    expect(Util.isStructural(_.both("a", 1))).toEqual(true)
  })

  it("reduce", () => {
    Util.deepStrictEqual(pipe(_.right("a"), _.Foldable.reduce("-", (b, a) => b + a)), "-a")
    Util.deepStrictEqual(pipe(_.left("e"), _.Foldable.reduce("-", (b, a) => b + a)), "-")
    Util.deepStrictEqual(pipe(_.both("e", "a"), _.Foldable.reduce("-", (b, a) => b + a)), "-a")
  })

  it("map", () => {
    Util.deepStrictEqual(pipe(_.left("e"), _.map(Util.double)), _.left("e"))
    Util.deepStrictEqual(pipe(_.right(2), _.map(Util.double)), _.right(4))
    Util.deepStrictEqual(pipe(_.both("e", 2), _.map(Util.double)), _.both("e", 4))
  })

  it("bimap", () => {
    const f = _.bimap(S.length, Util.double)
    Util.deepStrictEqual(pipe(_.left("e"), f), _.left(1))
    Util.deepStrictEqual(pipe(_.right(2), f), _.right(4))
    Util.deepStrictEqual(pipe(_.both("eee", 1), f), _.both(3, 2))
  })

  it("mapLeft", () => {
    const f = _.mapLeft(S.length)
    Util.deepStrictEqual(pipe(_.left("e"), f), _.left(1))
    Util.deepStrictEqual(pipe(_.right(2), f), _.right(2))
    Util.deepStrictEqual(pipe(_.both("eee", 1), f), _.both(3, 1))
  })

  it("traverse", () => {
    const traverse = _.traverse(O.Applicative)((n: number) => (n > 1 ? O.some(n) : O.none()))
    Util.deepStrictEqual(pipe(_.left("a"), traverse), O.some(_.left("a")))
    Util.deepStrictEqual(pipe(_.right(2), traverse), O.some(_.right(2)))
    Util.deepStrictEqual(pipe(_.right(1), traverse), O.none())
    Util.deepStrictEqual(pipe(_.both("a", 2), traverse), O.some(_.both("a", 2)))
    Util.deepStrictEqual(
      pipe(
        _.both("a", 1),
        _.traverse(O.Applicative)((n) => (n >= 2 ? O.some(n) : O.none()))
      ),
      O.none()
    )
  })

  it("andThenBind", () => {
    Util.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.right(1)), _.bindEither("b", () => E.right(2))),
      _.right({ a: 1, b: 2 })
    )
    Util.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.right(1)), _.bindEither("b", () => E.left("e2"))),
      _.fail("e2")
    )
    Util.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.fail("e1")), _.bindEither("b", () => E.right(2))),
      _.fail("e1")
    )
    Util.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.fail("e1")), _.bindEither("b", () => E.left("e2"))),
      _.fail("e1")
    )
    Util.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.warn("e1", 1)), _.bindEither("b", () => E.right(2))),
      _.warn("e1", { a: 1, b: 2 })
    )
    expect(
      pipe(_.Do, _.bind("a", () => _.warn("e1", 1)), _.bindEither("b", () => E.left("e2")))
    ).toEqual(
      _.left(["e1", "e2"])
    )
  })

  it("andThenBind", () => {
    Util.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.right(1)), _.bindThese("b", () => _.right(2))),
      _.right({ a: 1, b: 2 })
    )
    Util.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.right(1)), _.bindThese("b", () => _.left("e2"))),
      _.fail("e2")
    )
    Util.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.right(1)), _.bindThese("b", () => _.both("e2", 2))),
      _.warn("e2", { a: 1, b: 2 })
    )
    Util.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.fail("e1")), _.bindThese("b", () => _.right(2))),
      _.fail("e1")
    )
    Util.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.fail("e1")), _.bindThese("b", () => _.left("e2"))),
      _.fail("e1")
    )
    Util.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.fail("e1")), _.bindThese("b", () => _.both("e2", 2))),
      _.fail("e1")
    )
    Util.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.warn("e1", 1)), _.bindThese("b", () => _.right(2))),
      _.warn("e1", { a: 1, b: 2 })
    )
    expect(
      pipe(_.Do, _.bind("a", () => _.warn("e1", 1)), _.bindThese("b", () => _.left("e2")))
    ).toEqual(
      _.left(["e1", "e2"])
    )
    expect(
      pipe(_.Do, _.bind("a", () => _.warn("e1", 1)), _.bindThese("b", () => _.both("e2", 2)))
    ).toEqual(
      _.both(["e1", "e2"], { a: 1, b: 2 })
    )
  })

  it("sequence", () => {
    const sequence = _.sequence(O.Applicative)
    Util.deepStrictEqual(sequence(_.left("a")), O.some(_.left("a")))
    Util.deepStrictEqual(sequence(_.right(O.some(1))), O.some(_.right(1)))
    Util.deepStrictEqual(sequence(_.right(O.none())), O.none())
    Util.deepStrictEqual(sequence(_.both("a", O.some(1))), O.some(_.both("a", 1)))
    Util.deepStrictEqual(sequence(_.both("a", O.none())), O.none())
  })

  it("product", () => {
    const a = ["a"] as const
    const b = ["b"] as const
    const ab = ["a", "b"] as const

    const product = _.SemiProduct.product
    expect(product(_.right(1), _.right(2))).toEqual(_.right([1, 2]))
    Util.deepStrictEqual(product(_.right(1), _.left(b)), _.left(b))
    expect(product(_.right(1), _.both(b, 2))).toEqual(_.both(b, [1, 2]))

    Util.deepStrictEqual(product(_.left(a), _.right(2)), _.left(a))
    Util.deepStrictEqual(product(_.left(a), _.left(b)), _.left(a))
    Util.deepStrictEqual(product(_.left(a), _.both(b, 2)), _.left(a))

    expect(product(_.both(a, 1), _.right(2))).toEqual(_.both(a, [1, 2]))
    expect(product(_.both(a, 1), _.left(b))).toEqual(_.left(ab))
    expect(product(_.both(a, 1), _.both(b, 2))).toEqual(_.both(ab, [1, 2]))
  })

  it("productMany", () => {
    const a = ["a"] as const
    const b = ["b"] as const
    const ab = ["a", "b"] as const

    const productMany: <E, A>(
      self: _.Validated<E, A>,
      collection: Iterable<_.Validated<E, A>>
    ) => _.Validated<E, [A, ...Array<A>]> = _.SemiProduct.productMany

    expect(productMany(_.right(1), [_.right(2)])).toEqual(_.right([1, 2]))
    Util.deepStrictEqual(
      productMany(_.right(1), [_.left(b)]),
      _.left(b)
    )
    expect(
      productMany(_.right(1), [_.both(b, 2)])
    ).toEqual(
      _.both(b, [1, 2])
    )

    Util.deepStrictEqual(productMany(_.left(a), [_.right(2)]), _.left(a))
    Util.deepStrictEqual(productMany(_.left(a), [_.left(b)]), _.left(a))
    Util.deepStrictEqual(
      productMany(_.left(a), [_.both(b, 2)]),
      _.left(a)
    )

    expect(productMany(_.both(a, 1), [_.right(2)])).toEqual(_.both(a, [1, 2]))
    expect(productMany(_.both(a, 1), [_.left(b)])).toEqual(_.left(ab))
    expect(productMany(_.both(a, 1), [_.both(b, 2)])).toEqual(
      _.both(ab, [1, 2])
    )
  })

  it("productAll", () => {
    const a = ["a"] as const
    const b = ["b"] as const
    const ab = ["a", "b"] as const

    const productAll = _.Product.productAll
    Util.deepStrictEqual(productAll([_.right(1), _.right(2)]), _.right([1, 2]))
    Util.deepStrictEqual(productAll([_.right(1), _.left(b)]), _.left(b))
    Util.deepStrictEqual(productAll([_.right(1), _.both(b, 2)]), _.both(b, [1, 2]))

    Util.deepStrictEqual(productAll([_.left(a), _.right(2)]), _.left(a))
    Util.deepStrictEqual(productAll([_.left(a), _.left(b)]), _.left(a))
    Util.deepStrictEqual(productAll([_.left(a), _.both(b, 2)]), _.left(a))

    Util.deepStrictEqual(productAll([_.both(a, 1), _.right(2)]), _.both(a, [1, 2]))
    expect(productAll([_.both(a, 1), _.left(b)])).toEqual(_.left(ab))
    expect(productAll([_.both(a, 1), _.both(b, 2)])).toEqual(_.both(ab, [1, 2]))
  })

  it("flatMap", () => {
    const f = (
      n: number
    ) => (n >= 2 ?
      (n <= 5 ? _.right(n * 2) : _.warn("e2", n)) :
      _.fail("e3"))
    Util.deepStrictEqual(
      pipe(_.fail("e1"), _.flatMap(f)),
      _.fail("e1")
    )
    Util.deepStrictEqual(pipe(_.right(2), _.flatMap(f)), _.right(4))
    Util.deepStrictEqual(pipe(_.right(1), _.flatMap(f)), _.fail("e3"))
    Util.deepStrictEqual(pipe(_.right(6), _.flatMap(f)), _.warn("e2", 6))
    Util.deepStrictEqual(
      pipe(_.warn("e1", 2), _.flatMap(f)),
      _.warn("e1", 4)
    )
    expect(pipe(_.warn("e1", 1), _.flatMap(f))).toEqual(_.left(["e1", "e3"]))
    expect(pipe(_.warn("e1", 6), _.flatMap(f))).toEqual(_.both(["e1", "e2"], 6))
  })

  it("flatMapNullable", () => {
    const f = _.flatMapNullable((n: number) => (n > 0 ? n : null), () => "e2")
    Util.deepStrictEqual(f(_.right(1)), _.right(1))
    Util.deepStrictEqual(f(_.right(-1)), _.fail("e2"))
    Util.deepStrictEqual(f(_.fail("e1")), _.fail("e1"))
    Util.deepStrictEqual(f(_.warn("e1", 1)), _.warn("e1", 1))
    expect(f(_.warn("e1", -1))).toEqual(_.left(["e1", "e2"]))
  })

  it("flatMapOption", () => {
    const f = _.flatMapOption((n: number) => (n > 0 ? O.some(n) : O.none()), () => "e2")
    Util.deepStrictEqual(f(_.right(1)), _.right(1))
    Util.deepStrictEqual(f(_.right(-1)), _.fail("e2"))
    Util.deepStrictEqual(f(_.fail("e1")), _.fail("e1"))
    Util.deepStrictEqual(f(_.warn("e1", 1)), _.warn("e1", 1))
    expect(f(_.warn("e1", -1))).toEqual(_.left(["e1", "e2"]))
  })

  it("flatMapEither", () => {
    const f = _.flatMapEither((n: number) => (n > 0 ? E.right(n) : E.left("e2")))
    Util.deepStrictEqual(f(_.right(1)), _.right(1))
    Util.deepStrictEqual(f(_.right(-1)), _.fail("e2"))
    Util.deepStrictEqual(f(_.fail("e1")), _.fail("e1"))
    Util.deepStrictEqual(f(_.warn("e1", 1)), _.warn("e1", 1))
    expect(f(_.warn("e1", -1))).toEqual(_.left(["e1", "e2"]))
  })

  it("flatMapThese", () => {
    const f = _.flatMapThese((
      n: number
    ) => (n > 10 ? _.both("e3", n) : n > 0 ? _.right(n) : _.left("e2")))
    Util.deepStrictEqual(f(_.right(1)), _.right(1))
    Util.deepStrictEqual(f(_.right(-1)), _.fail("e2"))
    Util.deepStrictEqual(f(_.right(11)), _.warn("e3", 11))
    Util.deepStrictEqual(f(_.fail("e1")), _.fail("e1"))
    Util.deepStrictEqual(f(_.warn("e1", 1)), _.warn("e1", 1))
    expect(f(_.warn("e1", -1))).toEqual(_.left(["e1", "e2"]))
    expect(f(_.warn("e1", 11))).toEqual(_.both(["e1", "e3"], 11))
  })

  it("leftOrBoth", () => {
    Util.deepStrictEqual(_.leftOrBoth(() => "a")(O.none()), _.left("a"))
    Util.deepStrictEqual(_.leftOrBoth(() => "a")(O.some(1)), _.both("a", 1))
  })

  it("rightOrBoth", () => {
    Util.deepStrictEqual(_.rightOrBoth(() => 1)(O.none()), _.right(1))
    Util.deepStrictEqual(_.rightOrBoth(() => 1)(O.some("a")), _.both("a", 1))
  })

  it("match", () => {
    const f = (s: string, n: number) => S.length(s) + Util.double(n)
    const match = _.match(S.length, Util.double, f)
    Util.deepStrictEqual(match(_.left("foo")), 3)
    Util.deepStrictEqual(match(_.right(1)), 2)
    Util.deepStrictEqual(match(_.both("foo", 1)), 5)
  })

  it("getBothOrElse", () => {
    const f = _.getBothOrElse(() => "a", () => 1)
    Util.deepStrictEqual(pipe(_.left("b"), f), ["b", 1])
    Util.deepStrictEqual(pipe(_.right(2), f), ["a", 2])
    Util.deepStrictEqual(pipe(_.both("b", 2), f), ["b", 2])
  })

  it("getBoth", () => {
    Util.deepStrictEqual(pipe(_.left("e"), _.getBoth), O.none())
    Util.deepStrictEqual(pipe(_.right(1), _.getBoth), O.none())
    expect(pipe(_.both("e", 1), _.getBoth)).toEqual(O.some(["e", 1]))
  })

  it("getLeft", () => {
    Util.deepStrictEqual(_.getLeft(_.left("e")), O.some("e"))
    Util.deepStrictEqual(_.getLeft(_.right(1)), O.none())
    Util.deepStrictEqual(_.getLeft(_.both("e", 1)), O.some("e"))
  })

  it("getRight", () => {
    Util.deepStrictEqual(_.getRight(_.left("e")), O.none())
    Util.deepStrictEqual(_.getRight(_.right(1)), O.some(1))
    Util.deepStrictEqual(_.getRight(_.both("e", 1)), O.some(1))
  })

  it("getLeftOnly", () => {
    Util.deepStrictEqual(_.getLeftOnly(_.left("e")), O.some("e"))
    Util.deepStrictEqual(_.getLeftOnly(_.right(1)), O.none())
    Util.deepStrictEqual(_.getLeftOnly(_.both("e", 1)), O.none())
  })

  it("getRightOnly", () => {
    Util.deepStrictEqual(_.getRightOnly(_.left("e")), O.none())
    Util.deepStrictEqual(_.getRightOnly(_.right(1)), O.some(1))
    Util.deepStrictEqual(_.getRightOnly(_.both("e", 1)), O.none())
  })

  it("isLeft", () => {
    Util.deepStrictEqual(_.isLeft(_.left("e")), true)
    Util.deepStrictEqual(_.isLeft(_.right(1)), false)
    Util.deepStrictEqual(_.isLeft(_.both("e", 1)), false)
  })

  it("isLeftOrBoth", () => {
    Util.deepStrictEqual(_.isLeftOrBoth(_.left("e")), true)
    Util.deepStrictEqual(_.isLeftOrBoth(_.right(1)), false)
    Util.deepStrictEqual(_.isLeftOrBoth(_.both("e", 1)), true)
  })

  it("isRight", () => {
    Util.deepStrictEqual(_.isRight(_.left("e")), false)
    Util.deepStrictEqual(_.isRight(_.right(1)), true)
    Util.deepStrictEqual(_.isRight(_.both("", 1)), false)
  })

  it("isRightOrBoth", () => {
    Util.deepStrictEqual(_.isRightOrBoth(_.left("e")), false)
    Util.deepStrictEqual(_.isRightOrBoth(_.right(1)), true)
    Util.deepStrictEqual(_.isRightOrBoth(_.both("e", 1)), true)
  })

  it("isThese", () => {
    Util.deepStrictEqual(_.isThese(_.left("e")), true)
    Util.deepStrictEqual(_.isThese(_.right(1)), true)
    Util.deepStrictEqual(_.isThese(_.both("e", 1)), true)
    Util.deepStrictEqual(_.isThese(E.left("e")), true)
    Util.deepStrictEqual(_.isThese(E.right(1)), true)
    Util.deepStrictEqual(_.isThese(O.some(1)), false)
  })

  it("isBoth", () => {
    Util.deepStrictEqual(_.isBoth(_.left("e")), false)
    Util.deepStrictEqual(_.isBoth(_.right(1)), false)
    Util.deepStrictEqual(_.isBoth(_.both("e", 1)), true)
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

  it("inspectRight", () => {
    const log: Array<number> = []
    pipe(_.right(1), _.inspectRight((a) => log.push(a)))
    pipe(_.left("e1"), _.inspectRight((a) => log.push(a)))
    pipe(_.both("e2", 1), _.inspectRight((a) => log.push(a)))
    Util.deepStrictEqual(log, [1])
  })

  it("inspectRightOrBoth", () => {
    const log: Array<number> = []
    pipe(_.right(1), _.inspectRightOrBoth((a) => log.push(a)))
    pipe(_.left("e1"), _.inspectRightOrBoth((a) => log.push(a)))
    pipe(_.both("e2", 2), _.inspectRightOrBoth((a) => log.push(a)))
    Util.deepStrictEqual(log, [1, 2])
  })

  it("inspectBoth", () => {
    const log: Array<string | number> = []
    pipe(_.right(1), _.inspectBoth((e, a) => log.push(e, a)))
    pipe(_.left("e1"), _.inspectBoth((e, a) => log.push(e, a)))
    pipe(_.both("e2", 2), _.inspectBoth((e, a) => log.push(e, a)))
    Util.deepStrictEqual(log, ["e2", 2])
  })

  it("inspectLeft", () => {
    const log: Array<string> = []
    pipe(_.right(1), _.inspectLeft((e) => log.push(e)))
    pipe(_.left("e1"), _.inspectLeft((e) => log.push(e)))
    pipe(_.both("e2", 1), _.inspectLeft((e) => log.push(e)))
    Util.deepStrictEqual(log, ["e1"])
  })

  it("getOrThrow", () => {
    expect(pipe(_.right(1), _.getOrThrow)).toEqual(1)
    expect(pipe(_.both("e", 1), _.getOrThrow)).toEqual(1)
    expect(() => pipe(_.left("e"), _.getOrThrow)).toThrowError(
      new Error("getOrThrow called on a Left")
    )
  })

  it("getRightOnlyOrThrow", () => {
    expect(pipe(_.right(1), _.getRightOnlyOrThrow)).toEqual(1)
    expect(() => pipe(_.left("e"), _.getRightOnlyOrThrow)).toThrow(
      new Error("getRightOnlyOrThrow called on Left or Both")
    )
    expect(() => pipe(_.both("e", 1), _.getRightOnlyOrThrow)).toThrow(
      new Error("getRightOnlyOrThrow called on Left or Both")
    )
  })

  it("getOrElse", () => {
    Util.deepStrictEqual(pipe(_.right(1), _.getOrElse(() => 2)), 1)
    Util.deepStrictEqual(pipe(_.left("e"), _.getOrElse(() => 2)), 2)
    Util.deepStrictEqual(pipe(_.both("e", 1), _.getOrElse(() => 2)), 1)
  })

  it("getOrNull", () => {
    Util.deepStrictEqual(pipe(_.right(1), _.getOrNull), 1)
    Util.deepStrictEqual(pipe(_.left("e"), _.getOrNull), null)
    Util.deepStrictEqual(pipe(_.both("e", 1), _.getOrNull), 1)
  })

  it("getOrUndefined", () => {
    Util.deepStrictEqual(pipe(_.right(1), _.getOrUndefined), 1)
    Util.deepStrictEqual(pipe(_.left("e"), _.getOrUndefined), undefined)
    Util.deepStrictEqual(pipe(_.both("e", 1), _.getOrUndefined), 1)
  })

  it("fromNullable", () => {
    Util.deepStrictEqual(_.fromNullable(() => "default")(null), _.left("default"))
    Util.deepStrictEqual(_.fromNullable(() => "default")(undefined), _.left("default"))
    Util.deepStrictEqual(_.fromNullable(() => "default")(1), _.right(1))
  })

  it("liftNullable", () => {
    const f = _.liftNullable((n: number) => (n > 0 ? n : null), () => "error")
    Util.deepStrictEqual(f(1), _.right(1))
    Util.deepStrictEqual(f(-1), _.left("error"))
  })

  it("liftPredicate", () => {
    const f = _.liftPredicate((n: number) => n >= 2, () => "e")
    Util.deepStrictEqual(f(3), _.right(3))
    Util.deepStrictEqual(f(1), _.left("e"))
  })

  it("fromIterable", () => {
    Util.deepStrictEqual(_.fromIterable(() => "e")([]), _.left("e"))
    Util.deepStrictEqual(_.fromIterable(() => "e")(["a"]), _.right("a"))
  })

  it("fromOption", () => {
    Util.deepStrictEqual(_.fromOption(() => "e")(O.none()), _.left("e"))
    Util.deepStrictEqual(_.fromOption(() => "e")(O.some(1)), _.right(1))
  })

  it("fromEither", () => {
    Util.deepStrictEqual(_.fromEither(E.right(1)), _.right(1))
    expect(_.fromEither(E.left("e"))).toEqual(_.left(["e"]))
  })

  it("fromThese", () => {
    Util.deepStrictEqual(_.fromThese(_.right(1)), _.right(1))
    Util.deepStrictEqual(_.fromThese(_.left("e")), _.fail("e"))
    Util.deepStrictEqual(_.fromThese(_.both("e", 1)), _.warn("e", 1))
  })

  it("toEither", () => {
    expect(_.toEither).exist
  })

  it("absolve", () => {
    Util.deepStrictEqual(_.absolve(_.right(1)), E.right(1))
    Util.deepStrictEqual(_.absolve(_.left("e")), E.left("e"))
    Util.deepStrictEqual(_.absolve(_.both("e", 1)), E.right(1))
  })

  it("condemn", () => {
    Util.deepStrictEqual(_.condemn(_.right(1)), E.right(1))
    Util.deepStrictEqual(_.condemn(_.left("e")), E.left("e"))
    Util.deepStrictEqual(_.condemn(_.both("e", 1)), E.left("e"))
  })

  it("liftOption", () => {
    const f = _.liftOption((n: number) => (n > 0 ? O.some(n) : O.none()), () => "e")
    Util.deepStrictEqual(f(1), _.right(1))
    Util.deepStrictEqual(f(-1), _.left("e"))
  })

  it("liftEither", () => {
    const f = _.liftEither((n: number) => (n > 0 ? E.right(n) : E.left("e")))
    Util.deepStrictEqual(f(1), _.right(1))
    Util.deepStrictEqual(f(-1), _.fail("e"))
  })

  it("liftThese", () => {
    const f = _.liftThese((n: number) => (n > 0 ? _.right(n) : _.left("e")))
    Util.deepStrictEqual(f(1), _.right(1))
    Util.deepStrictEqual(f(-1), _.fail("e"))
  })

  it("fromTuple", () => {
    expect(pipe(["e", 1] as [string, number], _.fromTuple)).toEqual(_.both("e", 1))
  })

  it("reverse", () => {
    Util.deepStrictEqual(_.reverse(_.left("e")), _.right("e"))
    Util.deepStrictEqual(_.reverse(_.right(1)), _.left(1))
    Util.deepStrictEqual(_.reverse(_.both("e", 1)), _.both(1, "e"))
  })

  it("exists", () => {
    const gt2 = _.exists((n: number) => n > 2)
    Util.deepStrictEqual(gt2(_.left("a")), false)
    Util.deepStrictEqual(gt2(_.right(1)), false)
    Util.deepStrictEqual(gt2(_.right(3)), true)
    Util.deepStrictEqual(gt2(_.both("a", 1)), false)
    Util.deepStrictEqual(gt2(_.both("a", 3)), true)
  })

  it("contains", () => {
    const contains = _.contains(number)
    Util.deepStrictEqual(contains(2)(_.left("a")), false)
    Util.deepStrictEqual(contains(2)(_.right(2)), true)
    Util.deepStrictEqual(contains(1)(_.right(2)), false)
    Util.deepStrictEqual(contains(2)(_.both("a", 2)), true)
    Util.deepStrictEqual(contains(1)(_.both("a", 2)), false)
  })

  it("of", () => {
    Util.deepStrictEqual(_.of(1), _.right(1))
  })

  it("orElse", () => {
    Util.deepStrictEqual(pipe(_.right(1), _.orElse(() => _.right(2))), _.right(1))
    Util.deepStrictEqual(pipe(_.right(1), _.orElse(() => _.left("b"))), _.right(1))
    Util.deepStrictEqual(pipe(_.right(1), _.orElse(() => _.both("b", 2))), _.right(1))
    Util.deepStrictEqual(pipe(_.left("a"), _.orElse(() => _.right(2))), _.right(2))
    Util.deepStrictEqual(pipe(_.left("a"), _.orElse(() => _.left("b"))), _.left("b"))
    Util.deepStrictEqual(pipe(_.left("a"), _.orElse(() => _.both("b", 2))), _.both("b", 2))
    Util.deepStrictEqual(pipe(_.both("a", 1), _.orElse(() => _.right(2))), _.both("a", 1))
    Util.deepStrictEqual(pipe(_.both("a", 1), _.orElse(() => _.left("b"))), _.both("a", 1))
    Util.deepStrictEqual(pipe(_.both("a", 1), _.orElse(() => _.both("b", 2))), _.both("a", 1))
  })

  it("orElseEither", () => {
    expect(pipe(_.right(1), _.orElseEither(() => _.right(2)))).toEqual(_.right(E.left(1)))
    expect(pipe(_.right(1), _.orElseEither(() => _.left("b")))).toEqual(_.right(E.left(1)))
    expect(pipe(_.right(1), _.orElseEither(() => _.both("b", 2)))).toEqual(_.right(E.left(1)))
    expect(pipe(_.left("a"), _.orElseEither(() => _.right(2)))).toEqual(_.right(E.right(2)))
    expect(pipe(_.left("a"), _.orElseEither(() => _.left("b")))).toEqual(_.left("b"))
    expect(pipe(_.left("a"), _.orElseEither(() => _.both("b", 2)))).toEqual(_.both("b", E.right(2)))
    expect(pipe(_.both("a", 1), _.orElseEither(() => _.right(2)))).toEqual(_.both("a", E.left(1)))
    expect(pipe(_.both("a", 1), _.orElseEither(() => _.left("b")))).toEqual(_.both("a", E.left(1)))
    expect(pipe(_.both("a", 1), _.orElseEither(() => _.both("b", 2)))).toEqual(
      _.both("a", E.left(1))
    )
  })

  it("orElseFail", () => {
    Util.deepStrictEqual(pipe(_.right(1), _.orElseFail(() => "e2")), _.right(1))
    Util.deepStrictEqual(pipe(_.left("e1"), _.orElseFail(() => "e2")), _.left("e2"))
    Util.deepStrictEqual(pipe(_.both("e1", 1), _.orElseFail(() => "e2")), _.both("e1", 1))
  })

  it("firstSuccessOf", () => {
    Util.deepStrictEqual(pipe(_.right(1), _.firstRightOrBothOf([])), _.right(1))
    Util.deepStrictEqual(pipe(_.left("e"), _.firstRightOrBothOf([])), _.left("e"))
    Util.deepStrictEqual(
      pipe(
        _.left("e1"),
        _.firstRightOrBothOf([_.left("e2"), _.left("e3"), _.left("e4"), _.right(1)])
      ),
      _.right(1)
    )
    Util.deepStrictEqual(
      pipe(
        _.left("e1"),
        _.firstRightOrBothOf([_.left("e2"), _.left("e3"), _.left("e4"), _.both("e5", 1)])
      ),
      _.both("e5", 1)
    )
    Util.deepStrictEqual(
      pipe(_.left("e1"), _.firstRightOrBothOf([_.left("e2"), _.left("e3"), _.left("e4")])),
      _.left("e4")
    )
  })

  it("coproduct", () => {
    const coproduct = _.SemiCoproduct.coproduct
    Util.deepStrictEqual(coproduct(_.right(1), _.right(2)), _.right(1))
    Util.deepStrictEqual(coproduct(_.right(1), _.left("e2")), _.right(1))
    Util.deepStrictEqual(coproduct(_.left("e1"), _.right(2)), _.right(2))
    Util.deepStrictEqual(coproduct(_.left("e1"), _.left("e2")), _.left("e2"))
    Util.deepStrictEqual(coproduct(_.both("e1", 1), _.right(2)), _.both("e1", 1))
    Util.deepStrictEqual(coproduct(_.both("e1", 1), _.left("e2")), _.both("e1", 1))
  })

  it("coproduct", () => {
    const coproductMany = _.SemiCoproduct.coproductMany
    Util.deepStrictEqual(coproductMany(_.right(1), [_.right(2)]), _.right(1))
    Util.deepStrictEqual(coproductMany(_.right(1), [_.left("e2")]), _.right(1))
    Util.deepStrictEqual(coproductMany(_.left("e1"), [_.right(2)]), _.right(2))
    Util.deepStrictEqual(coproductMany(_.left("e1"), [_.left("e2")]), _.left("e2"))
    Util.deepStrictEqual(coproductMany(_.both("e1", 1), [_.right(2)]), _.both("e1", 1))
    Util.deepStrictEqual(coproductMany(_.both("e1", 1), [_.left("e2")]), _.both("e1", 1))
  })

  it("compact", () => {
    Util.deepStrictEqual(pipe(_.right(O.some(1)), _.compact(() => "e2")), _.right(1))
    Util.deepStrictEqual(pipe(_.right(O.none()), _.compact(() => "e2")), _.left("e2"))
    Util.deepStrictEqual(pipe(_.left("e1"), _.compact(() => "e2")), _.left("e1"))
    Util.deepStrictEqual(pipe(_.both("e1", O.some(1)), _.compact(() => "e2")), _.both("e1", 1))
    Util.deepStrictEqual(pipe(_.both("e1", O.none()), _.compact(() => "e2")), _.left("e2"))
  })

  it("filter", () => {
    const predicate = (n: number) => n > 10
    Util.deepStrictEqual(pipe(_.right(12), _.filter(predicate, () => "e2")), _.right(12))
    Util.deepStrictEqual(pipe(_.right(7), _.filter(predicate, () => "e2")), _.left("e2"))
    Util.deepStrictEqual(pipe(_.left("e1"), _.filter(predicate, () => "e2")), _.left("e1"))
    Util.deepStrictEqual(pipe(_.both("e1", 12), _.filter(predicate, () => "e2")), _.both("e1", 12))
    Util.deepStrictEqual(pipe(_.both("e1", 7), _.filter(predicate, () => "e2")), _.left("e2"))
  })

  it("filterMap", () => {
    const f = (n: number) => (n > 2 ? O.some(n + 1) : O.none())
    Util.deepStrictEqual(pipe(_.left("e1"), _.filterMap(f, () => "e2")), _.left("e1"))
    Util.deepStrictEqual(pipe(_.right(1), _.filterMap(f, () => "e2")), _.left("e2"))
    Util.deepStrictEqual(pipe(_.right(3), _.filterMap(f, () => "e2")), _.right(4))
    Util.deepStrictEqual(pipe(_.both("e1", 1), _.filterMap(f, () => "e2")), _.left("e2"))
    Util.deepStrictEqual(pipe(_.both("e1", 3), _.filterMap(f, () => "e2")), _.both("e1", 4))
  })

  it("zipWith", () => {
    const e: _.Validated<string, number> = _.left(["a"])
    expect(pipe(e, _.zipWith(_.right(2), (a, b) => a + b))).toEqual(e)
    expect(pipe(_.right(1), _.zipWith(e, (a, b) => a + b))).toEqual(e)
    expect(pipe(_.right(1), _.zipWith(_.right(2), (a, b) => a + b))).toEqual(_.right(3))
  })

  it("sum", () => {
    const e: _.Validated<string, number> = _.left(["a"])
    expect(pipe(e, _.sum(_.right(2)))).toEqual(e)
    expect(pipe(_.right(1), _.sum(e))).toEqual(e)
    expect(pipe(_.right(2), _.sum(_.right(3)))).toEqual(_.right(5))
  })

  it("multiply", () => {
    const e: _.Validated<string, number> = _.left(["a"])
    expect(pipe(e, _.multiply(_.right(2)))).toEqual(e)
    expect(pipe(_.right(1), _.multiply(e))).toEqual(e)
    expect(pipe(_.right(2), _.multiply(_.right(3)))).toEqual(_.right(6))
  })

  it("subtract", () => {
    const e: _.Validated<string, number> = _.left(["a"])
    expect(pipe(e, _.subtract(_.right(2)))).toEqual(e)
    expect(pipe(_.right(1), _.subtract(e))).toEqual(e)
    expect(pipe(_.right(2), _.subtract(_.right(3)))).toEqual(_.right(-1))
  })

  it("divide", () => {
    const e: _.Validated<string, number> = _.left(["a"])
    expect(pipe(e, _.divide(_.right(2)))).toEqual(e)
    expect(pipe(_.right(1), _.divide(e))).toEqual(e)
    expect(pipe(_.right(6), _.divide(_.right(3)))).toEqual(_.right(2))
  })

  it("getEquivalence", () => {
    const isEquivalent = _.getEquivalence(N.Equivalence, N.Equivalence)
    Util.deepStrictEqual(isEquivalent(_.left(2), _.left(2)), true)
    Util.deepStrictEqual(isEquivalent(_.left(2), _.left(3)), false)
    Util.deepStrictEqual(isEquivalent(_.left(3), _.left(2)), false)
    Util.deepStrictEqual(isEquivalent(_.left(2), _.right(2)), false)
    Util.deepStrictEqual(isEquivalent(_.left(2), _.both(2, 2)), false)
    Util.deepStrictEqual(isEquivalent(_.right(2), _.right(2)), true)
    Util.deepStrictEqual(isEquivalent(_.right(2), _.right(3)), false)
    Util.deepStrictEqual(isEquivalent(_.right(3), _.right(2)), false)
    Util.deepStrictEqual(isEquivalent(_.right(2), _.both(2, 2)), false)
    Util.deepStrictEqual(isEquivalent(_.both(2, 2), _.both(2, 2)), true)
    Util.deepStrictEqual(isEquivalent(_.both(2, 3), _.both(3, 2)), false)
  })
})
