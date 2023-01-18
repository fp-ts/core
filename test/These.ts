import * as E from "@fp-ts/core/Either"
import { identity, pipe } from "@fp-ts/core/Function"
import * as O from "@fp-ts/core/Option"
import * as S from "@fp-ts/core/String"
import * as _ from "@fp-ts/core/These"
import { number } from "@fp-ts/core/typeclass/Equivalence"
import * as U from "./util"

describe("These", () => {
  it("instances and derived exports", () => {
    expect(_.Invariant).exist
    expect(_.imap).exist
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
    expect(_.product).exist
    expect(_.productMany).exist
    expect(_.andThenBind).exist
    expect(_.element).exist

    expect(_.Product).exist
    expect(_.productAll).exist
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

  it("reduce", () => {
    U.deepStrictEqual(pipe(_.right("a"), _.Foldable.reduce("-", (b, a) => b + a)), "-a")
    U.deepStrictEqual(pipe(_.left("e"), _.Foldable.reduce("-", (b, a) => b + a)), "-")
    U.deepStrictEqual(pipe(_.both("e", "a"), _.Foldable.reduce("-", (b, a) => b + a)), "-a")
  })

  it("map", () => {
    U.deepStrictEqual(pipe(_.left("e"), _.map(U.double)), _.left("e"))
    U.deepStrictEqual(pipe(_.right(2), _.map(U.double)), _.right(4))
    U.deepStrictEqual(pipe(_.both("e", 2), _.map(U.double)), _.both("e", 4))
  })

  it("bimap", () => {
    const f = _.bimap(S.size, U.double)
    U.deepStrictEqual(pipe(_.left("e"), f), _.left(1))
    U.deepStrictEqual(pipe(_.right(2), f), _.right(4))
    U.deepStrictEqual(pipe(_.both("eee", 1), f), _.both(3, 2))
  })

  it("mapLeft", () => {
    const f = _.mapLeft(S.size)
    U.deepStrictEqual(pipe(_.left("e"), f), _.left(1))
    U.deepStrictEqual(pipe(_.right(2), f), _.right(2))
    U.deepStrictEqual(pipe(_.both("eee", 1), f), _.both(3, 1))
  })

  it("traverse", () => {
    const traverse = _.traverse(O.Applicative)((n: number) => (n > 1 ? O.some(n) : O.none()))
    U.deepStrictEqual(pipe(_.left("a"), traverse), O.some(_.left("a")))
    U.deepStrictEqual(pipe(_.right(2), traverse), O.some(_.right(2)))
    U.deepStrictEqual(pipe(_.right(1), traverse), O.none())
    U.deepStrictEqual(pipe(_.both("a", 2), traverse), O.some(_.both("a", 2)))
    U.deepStrictEqual(
      pipe(
        _.both("a", 1),
        _.traverse(O.Applicative)((n) => (n >= 2 ? O.some(n) : O.none()))
      ),
      O.none()
    )
  })

  it("andThenBindEither", () => {
    U.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.succeed(1)), _.andThenBindEither("b", E.right(2))),
      _.succeed({ a: 1, b: 2 })
    )
    U.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.succeed(1)), _.andThenBindEither("b", E.left("e2"))),
      _.fail("e2")
    )
    U.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.fail("e1")), _.andThenBindEither("b", E.right(2))),
      _.fail("e1")
    )
    U.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.fail("e1")), _.andThenBindEither("b", E.left("e2"))),
      _.fail("e1")
    )
    U.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.warn("e1", 1)), _.andThenBindEither("b", E.right(2))),
      _.warn("e1", { a: 1, b: 2 })
    )
    expect(
      pipe(_.Do, _.bind("a", () => _.warn("e1", 1)), _.andThenBindEither("b", E.left("e2")))
    ).toEqual(
      _.left(["e1", "e2"])
    )
  })

  it("andThenBindThese", () => {
    U.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.succeed(1)), _.andThenBindThese("b", _.right(2))),
      _.succeed({ a: 1, b: 2 })
    )
    U.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.succeed(1)), _.andThenBindThese("b", _.left("e2"))),
      _.fail("e2")
    )
    U.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.succeed(1)), _.andThenBindThese("b", _.both("e2", 2))),
      _.warn("e2", { a: 1, b: 2 })
    )
    U.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.fail("e1")), _.andThenBindThese("b", _.right(2))),
      _.fail("e1")
    )
    U.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.fail("e1")), _.andThenBindThese("b", _.left("e2"))),
      _.fail("e1")
    )
    U.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.fail("e1")), _.andThenBindThese("b", _.both("e2", 2))),
      _.fail("e1")
    )
    U.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.warn("e1", 1)), _.andThenBindThese("b", _.right(2))),
      _.warn("e1", { a: 1, b: 2 })
    )
    expect(
      pipe(_.Do, _.bind("a", () => _.warn("e1", 1)), _.andThenBindThese("b", _.left("e2")))
    ).toEqual(
      _.left(["e1", "e2"])
    )
    expect(
      pipe(_.Do, _.bind("a", () => _.warn("e1", 1)), _.andThenBindThese("b", _.both("e2", 2)))
    ).toEqual(
      _.both(["e1", "e2"], { a: 1, b: 2 })
    )
  })

  it("andThenBind", () => {
    U.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.succeed(1)), _.bindEither("b", () => E.right(2))),
      _.succeed({ a: 1, b: 2 })
    )
    U.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.succeed(1)), _.bindEither("b", () => E.left("e2"))),
      _.fail("e2")
    )
    U.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.fail("e1")), _.bindEither("b", () => E.right(2))),
      _.fail("e1")
    )
    U.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.fail("e1")), _.bindEither("b", () => E.left("e2"))),
      _.fail("e1")
    )
    U.deepStrictEqual(
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
    U.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.succeed(1)), _.bindThese("b", () => _.right(2))),
      _.succeed({ a: 1, b: 2 })
    )
    U.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.succeed(1)), _.bindThese("b", () => _.left("e2"))),
      _.fail("e2")
    )
    U.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.succeed(1)), _.bindThese("b", () => _.both("e2", 2))),
      _.warn("e2", { a: 1, b: 2 })
    )
    U.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.fail("e1")), _.bindThese("b", () => _.right(2))),
      _.fail("e1")
    )
    U.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.fail("e1")), _.bindThese("b", () => _.left("e2"))),
      _.fail("e1")
    )
    U.deepStrictEqual(
      pipe(_.Do, _.bind("a", () => _.fail("e1")), _.bindThese("b", () => _.both("e2", 2))),
      _.fail("e1")
    )
    U.deepStrictEqual(
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
    U.deepStrictEqual(sequence(_.left("a")), O.some(_.left("a")))
    U.deepStrictEqual(sequence(_.right(O.some(1))), O.some(_.right(1)))
    U.deepStrictEqual(sequence(_.right(O.none())), O.none())
    U.deepStrictEqual(sequence(_.both("a", O.some(1))), O.some(_.both("a", 1)))
    U.deepStrictEqual(sequence(_.both("a", O.none())), O.none())
  })

  it("product", () => {
    const a = ["a"] as const
    const b = ["b"] as const
    const ab = ["a", "b"] as const

    expect(pipe(_.right(1), _.product(_.right(2)))).toEqual(_.right([1, 2]))
    U.deepStrictEqual(pipe(_.right(1), _.product(_.left(b))), _.left(b))
    expect(pipe(_.right(1), _.product(_.both(b, 2)))).toEqual(_.both(b, [1, 2]))

    U.deepStrictEqual(pipe(_.left(a), _.product(_.right(2))), _.left(a))
    U.deepStrictEqual(pipe(_.left(a), _.product(_.left(b))), _.left(a))
    U.deepStrictEqual(pipe(_.left(a), _.product(_.both(b, 2))), _.left(a))

    expect(pipe(_.both(a, 1), _.product(_.right(2)))).toEqual(_.both(a, [1, 2]))
    expect(pipe(_.both(a, 1), _.product(_.left(b)))).toEqual(_.left(ab))
    expect(pipe(_.both(a, 1), _.product(_.both(b, 2)))).toEqual(_.both(ab, [1, 2]))
  })

  it("productMany", () => {
    const a = ["a"] as const
    const b = ["b"] as const
    const ab = ["a", "b"] as const

    expect(pipe(_.right(1), _.productMany([_.right(2)]))).toEqual(_.right([1, 2]))
    U.deepStrictEqual(
      pipe(_.right(1), _.productMany<string, number>([_.left(b)])),
      _.left(b)
    )
    expect(
      pipe(_.right(1), _.productMany<string, number>([_.both(b, 2)]))
    ).toEqual(
      _.both(b, [1, 2])
    )

    U.deepStrictEqual(pipe(_.left(a), _.productMany([_.right(2)])), _.left(a))
    U.deepStrictEqual(pipe(_.left(a), _.productMany<string, number>([_.left(b)])), _.left(a))
    U.deepStrictEqual(
      pipe(_.left(a), _.productMany<string, number>([_.both(b, 2)])),
      _.left(a)
    )

    expect(pipe(_.both(a, 1), _.productMany([_.right(2)]))).toEqual(_.both(a, [1, 2]))
    expect(pipe(_.both(a, 1), _.productMany<string, number>([_.left(b)]))).toEqual(_.left(ab))
    expect(pipe(_.both(a, 1), _.productMany<string, number>([_.both(b, 2)]))).toEqual(
      _.both(ab, [1, 2])
    )
  })

  it("productAll", () => {
    const a = ["a"] as const
    const b = ["b"] as const
    const ab = ["a", "b"] as const

    U.deepStrictEqual(_.productAll([_.right(1), _.right(2)]), _.right([1, 2]))
    U.deepStrictEqual(_.productAll([_.right(1), _.left(b)]), _.left(b))
    U.deepStrictEqual(_.productAll([_.right(1), _.both(b, 2)]), _.both(b, [1, 2]))

    U.deepStrictEqual(_.productAll([_.left(a), _.right(2)]), _.left(a))
    U.deepStrictEqual(_.productAll([_.left(a), _.left(b)]), _.left(a))
    U.deepStrictEqual(_.productAll([_.left(a), _.both(b, 2)]), _.left(a))

    U.deepStrictEqual(_.productAll([_.both(a, 1), _.right(2)]), _.both(a, [1, 2]))
    expect(_.productAll([_.both(a, 1), _.left(b)])).toEqual(_.left(ab))
    expect(_.productAll([_.both(a, 1), _.both(b, 2)])).toEqual(_.both(ab, [1, 2]))
  })

  it("flatMap", () => {
    const f = (
      n: number
    ) => (n >= 2 ?
      (n <= 5 ? _.succeed(n * 2) : _.warn("e2", n)) :
      _.fail("e3"))
    U.deepStrictEqual(
      pipe(_.fail("e1"), _.flatMap(f)),
      _.fail("e1")
    )
    U.deepStrictEqual(pipe(_.succeed(2), _.flatMap(f)), _.succeed(4))
    U.deepStrictEqual(pipe(_.succeed(1), _.flatMap(f)), _.fail("e3"))
    U.deepStrictEqual(pipe(_.succeed(6), _.flatMap(f)), _.warn("e2", 6))
    U.deepStrictEqual(
      pipe(_.warn("e1", 2), _.flatMap(f)),
      _.warn("e1", 4)
    )
    expect(pipe(_.warn("e1", 1), _.flatMap(f))).toEqual(_.left(["e1", "e3"]))
    expect(pipe(_.warn("e1", 6), _.flatMap(f))).toEqual(_.both(["e1", "e2"], 6))
  })

  it("flatMapNullable", () => {
    const f = _.flatMapNullable((n: number) => (n > 0 ? n : null), () => "e2")
    U.deepStrictEqual(f(_.succeed(1)), _.succeed(1))
    U.deepStrictEqual(f(_.succeed(-1)), _.fail("e2"))
    U.deepStrictEqual(f(_.fail("e1")), _.fail("e1"))
    U.deepStrictEqual(f(_.warn("e1", 1)), _.warn("e1", 1))
    expect(f(_.warn("e1", -1))).toEqual(_.left(["e1", "e2"]))
  })

  it("flatMapOption", () => {
    const f = _.flatMapOption((n: number) => (n > 0 ? O.some(n) : O.none()), () => "e2")
    U.deepStrictEqual(f(_.succeed(1)), _.succeed(1))
    U.deepStrictEqual(f(_.succeed(-1)), _.fail("e2"))
    U.deepStrictEqual(f(_.fail("e1")), _.fail("e1"))
    U.deepStrictEqual(f(_.warn("e1", 1)), _.warn("e1", 1))
    expect(f(_.warn("e1", -1))).toEqual(_.left(["e1", "e2"]))
  })

  it("flatMapEither", () => {
    const f = _.flatMapEither((n: number) => (n > 0 ? E.right(n) : E.left("e2")))
    U.deepStrictEqual(f(_.succeed(1)), _.succeed(1))
    U.deepStrictEqual(f(_.succeed(-1)), _.fail("e2"))
    U.deepStrictEqual(f(_.fail("e1")), _.fail("e1"))
    U.deepStrictEqual(f(_.warn("e1", 1)), _.warn("e1", 1))
    expect(f(_.warn("e1", -1))).toEqual(_.left(["e1", "e2"]))
  })

  it("flatMapThese", () => {
    const f = _.flatMapThese((
      n: number
    ) => (n > 10 ? _.both("e3", n) : n > 0 ? _.right(n) : _.left("e2")))
    U.deepStrictEqual(f(_.succeed(1)), _.succeed(1))
    U.deepStrictEqual(f(_.succeed(-1)), _.fail("e2"))
    U.deepStrictEqual(f(_.succeed(11)), _.warn("e3", 11))
    U.deepStrictEqual(f(_.fail("e1")), _.fail("e1"))
    U.deepStrictEqual(f(_.warn("e1", 1)), _.warn("e1", 1))
    expect(f(_.warn("e1", -1))).toEqual(_.left(["e1", "e2"]))
    expect(f(_.warn("e1", 11))).toEqual(_.both(["e1", "e3"], 11))
  })

  it("leftOrBoth", () => {
    U.deepStrictEqual(_.leftOrBoth(() => "a")(O.none()), _.left("a"))
    U.deepStrictEqual(_.leftOrBoth(() => "a")(O.some(1)), _.both("a", 1))
  })

  it("rightOrBoth", () => {
    U.deepStrictEqual(_.rightOrBoth(() => 1)(O.none()), _.right(1))
    U.deepStrictEqual(_.rightOrBoth(() => 1)(O.some("a")), _.both("a", 1))
  })

  it("match", () => {
    const f = (s: string, n: number) => S.size(s) + U.double(n)
    const match = _.match(S.size, U.double, f)
    U.deepStrictEqual(match(_.left("foo")), 3)
    U.deepStrictEqual(match(_.right(1)), 2)
    U.deepStrictEqual(match(_.both("foo", 1)), 5)
  })

  it("getBothOrElse", () => {
    const f = _.getBothOrElse(() => "a", () => 1)
    U.deepStrictEqual(pipe(_.left("b"), f), ["b", 1])
    U.deepStrictEqual(pipe(_.right(2), f), ["a", 2])
    U.deepStrictEqual(pipe(_.both("b", 2), f), ["b", 2])
  })

  it("getBoth", () => {
    U.deepStrictEqual(pipe(_.left("e"), _.getBoth), O.none())
    U.deepStrictEqual(pipe(_.right(1), _.getBoth), O.none())
    expect(pipe(_.both("e", 1), _.getBoth)).toEqual(O.some(["e", 1]))
  })

  it("getLeft", () => {
    U.deepStrictEqual(_.getLeft(_.left("e")), O.some("e"))
    U.deepStrictEqual(_.getLeft(_.right(1)), O.none())
    U.deepStrictEqual(_.getLeft(_.both("e", 1)), O.some("e"))
  })

  it("getRight", () => {
    U.deepStrictEqual(_.getRight(_.left("e")), O.none())
    U.deepStrictEqual(_.getRight(_.right(1)), O.some(1))
    U.deepStrictEqual(_.getRight(_.both("e", 1)), O.some(1))
  })

  it("getLeftOnly", () => {
    U.deepStrictEqual(_.getLeftOnly(_.left("e")), O.some("e"))
    U.deepStrictEqual(_.getLeftOnly(_.right(1)), O.none())
    U.deepStrictEqual(_.getLeftOnly(_.both("e", 1)), O.none())
  })

  it("getRightOnly", () => {
    U.deepStrictEqual(_.getRightOnly(_.left("e")), O.none())
    U.deepStrictEqual(_.getRightOnly(_.right(1)), O.some(1))
    U.deepStrictEqual(_.getRightOnly(_.both("e", 1)), O.none())
  })

  it("isLeft", () => {
    U.deepStrictEqual(_.isLeft(_.left("e")), true)
    U.deepStrictEqual(_.isLeft(_.right(1)), false)
    U.deepStrictEqual(_.isLeft(_.both("e", 1)), false)
  })

  it("isLeftOrBoth", () => {
    U.deepStrictEqual(_.isLeftOrBoth(_.left("e")), true)
    U.deepStrictEqual(_.isLeftOrBoth(_.right(1)), false)
    U.deepStrictEqual(_.isLeftOrBoth(_.both("e", 1)), true)
  })

  it("isRight", () => {
    U.deepStrictEqual(_.isRight(_.left("e")), false)
    U.deepStrictEqual(_.isRight(_.right(1)), true)
    U.deepStrictEqual(_.isRight(_.both("", 1)), false)
  })

  it("isRightOrBoth", () => {
    U.deepStrictEqual(_.isRightOrBoth(_.left("e")), false)
    U.deepStrictEqual(_.isRightOrBoth(_.right(1)), true)
    U.deepStrictEqual(_.isRightOrBoth(_.both("e", 1)), true)
  })

  it("isThese", () => {
    U.deepStrictEqual(_.isThese(_.left("e")), true)
    U.deepStrictEqual(_.isThese(_.right(1)), true)
    U.deepStrictEqual(_.isThese(_.both("e", 1)), true)
    U.deepStrictEqual(_.isThese(E.left("e")), true)
    U.deepStrictEqual(_.isThese(E.right(1)), true)
    U.deepStrictEqual(_.isThese(O.some(1)), false)
  })

  it("isBoth", () => {
    U.deepStrictEqual(_.isBoth(_.left("e")), false)
    U.deepStrictEqual(_.isBoth(_.right(1)), false)
    U.deepStrictEqual(_.isBoth(_.both("e", 1)), true)
  })

  it("fromThrowable", () => {
    U.deepStrictEqual(
      _.fromThrowable(() => {
        return 1
      }, identity),
      _.right(1)
    )

    U.deepStrictEqual(
      _.fromThrowable(() => {
        throw "string error"
      }, identity),
      _.left("string error")
    )
  })

  it("liftThrowable", () => {
    const f = _.liftThrowable((s: string) => {
      const len = s.length
      if (len > 0) {
        return len
      }
      throw new Error("empty string")
    }, identity)
    U.deepStrictEqual(f("a"), _.right(1))
    U.deepStrictEqual(f(""), _.left(new Error("empty string")))
  })

  it("inspectRight", () => {
    const log: Array<number> = []
    pipe(_.right(1), _.inspectRight((a) => log.push(a)))
    pipe(_.left("e1"), _.inspectRight((a) => log.push(a)))
    pipe(_.both("e2", 1), _.inspectRight((a) => log.push(a)))
    U.deepStrictEqual(log, [1])
  })

  it("inspectRightOrBoth", () => {
    const log: Array<number> = []
    pipe(_.right(1), _.inspectRightOrBoth((a) => log.push(a)))
    pipe(_.left("e1"), _.inspectRightOrBoth((a) => log.push(a)))
    pipe(_.both("e2", 2), _.inspectRightOrBoth((a) => log.push(a)))
    U.deepStrictEqual(log, [1, 2])
  })

  it("inspectBoth", () => {
    const log: Array<string | number> = []
    pipe(_.right(1), _.inspectBoth((e, a) => log.push(e, a)))
    pipe(_.left("e1"), _.inspectBoth((e, a) => log.push(e, a)))
    pipe(_.both("e2", 2), _.inspectBoth((e, a) => log.push(e, a)))
    U.deepStrictEqual(log, ["e2", 2])
  })

  it("inspectLeft", () => {
    const log: Array<string> = []
    pipe(_.right(1), _.inspectLeft((e) => log.push(e)))
    pipe(_.left("e1"), _.inspectLeft((e) => log.push(e)))
    pipe(_.both("e2", 1), _.inspectLeft((e) => log.push(e)))
    U.deepStrictEqual(log, ["e1"])
  })

  it("getOrThrow", () => {
    expect(pipe(_.right(1), _.getOrThrow((e: string) => new Error(e)))).toEqual(1)
    expect(() => pipe(_.left("e"), _.getOrThrow((e: string) => new Error(e)))).toThrow(
      new Error("e")
    )
    expect(pipe(_.both("e", 1), _.getOrThrow((e: string) => new Error(e)))).toEqual(1)
  })

  it("getRightOnlyOrThrow", () => {
    expect(pipe(_.right(1), _.getRightOnlyOrThrow((e: string) => new Error(e)))).toEqual(1)
    expect(() => pipe(_.left("e"), _.getRightOnlyOrThrow((e: string) => new Error(e)))).toThrow(
      new Error("e")
    )
    expect(() => pipe(_.both("e", 1), _.getRightOnlyOrThrow((e: string) => new Error(e)))).toThrow(
      new Error("e")
    )
  })

  it("getOrElse", () => {
    U.deepStrictEqual(pipe(_.right(1), _.getOrElse(() => 2)), 1)
    U.deepStrictEqual(pipe(_.left("e"), _.getOrElse(() => 2)), 2)
    U.deepStrictEqual(pipe(_.both("e", 1), _.getOrElse(() => 2)), 1)
  })

  it("getOrNull", () => {
    U.deepStrictEqual(pipe(_.right(1), _.getOrNull), 1)
    U.deepStrictEqual(pipe(_.left("e"), _.getOrNull), null)
    U.deepStrictEqual(pipe(_.both("e", 1), _.getOrNull), 1)
  })

  it("getOrUndefined", () => {
    U.deepStrictEqual(pipe(_.right(1), _.getOrUndefined), 1)
    U.deepStrictEqual(pipe(_.left("e"), _.getOrUndefined), undefined)
    U.deepStrictEqual(pipe(_.both("e", 1), _.getOrUndefined), 1)
  })

  it("fromNullable", () => {
    U.deepStrictEqual(_.fromNullable(() => "default")(null), _.left("default"))
    U.deepStrictEqual(_.fromNullable(() => "default")(undefined), _.left("default"))
    U.deepStrictEqual(_.fromNullable(() => "default")(1), _.right(1))
  })

  it("liftNullable", () => {
    const f = _.liftNullable((n: number) => (n > 0 ? n : null), () => "error")
    U.deepStrictEqual(f(1), _.right(1))
    U.deepStrictEqual(f(-1), _.left("error"))
  })

  it("liftPredicate", () => {
    const f = _.liftPredicate((n: number) => n >= 2, () => "e")
    U.deepStrictEqual(f(3), _.right(3))
    U.deepStrictEqual(f(1), _.left("e"))
  })

  it("fromIterable", () => {
    U.deepStrictEqual(_.fromIterable(() => "e")([]), _.left("e"))
    U.deepStrictEqual(_.fromIterable(() => "e")(["a"]), _.right("a"))
  })

  it("fromOption", () => {
    U.deepStrictEqual(_.fromOption(() => "e")(O.none()), _.left("e"))
    U.deepStrictEqual(_.fromOption(() => "e")(O.some(1)), _.right(1))
  })

  it("fromEither", () => {
    U.deepStrictEqual(_.fromEither(E.right(1)), _.right(1))
    expect(_.fromEither(E.left("e"))).toEqual(_.left(["e"]))
  })

  it("fromThese", () => {
    U.deepStrictEqual(_.fromThese(_.right(1)), _.succeed(1))
    U.deepStrictEqual(_.fromThese(_.left("e")), _.fail("e"))
    U.deepStrictEqual(_.fromThese(_.both("e", 1)), _.warn("e", 1))
  })

  it("toEither", () => {
    expect(_.toEither).exist
  })

  it("absolve", () => {
    U.deepStrictEqual(_.absolve(_.right(1)), E.right(1))
    U.deepStrictEqual(_.absolve(_.left("e")), E.left("e"))
    U.deepStrictEqual(_.absolve(_.both("e", 1)), E.right(1))
  })

  it("condemn", () => {
    U.deepStrictEqual(_.condemn(_.right(1)), E.right(1))
    U.deepStrictEqual(_.condemn(_.left("e")), E.left("e"))
    U.deepStrictEqual(_.condemn(_.both("e", 1)), E.left("e"))
  })

  it("liftOption", () => {
    const f = _.liftOption((n: number) => (n > 0 ? O.some(n) : O.none()), () => "e")
    U.deepStrictEqual(f(1), _.right(1))
    U.deepStrictEqual(f(-1), _.left("e"))
  })

  it("liftEither", () => {
    const f = _.liftEither((n: number) => (n > 0 ? E.right(n) : E.left("e")))
    U.deepStrictEqual(f(1), _.succeed(1))
    U.deepStrictEqual(f(-1), _.fail("e"))
  })

  it("liftThese", () => {
    const f = _.liftThese((n: number) => (n > 0 ? _.right(n) : _.left("e")))
    U.deepStrictEqual(f(1), _.succeed(1))
    U.deepStrictEqual(f(-1), _.fail("e"))
  })

  it("fromTuple", () => {
    expect(pipe(["e", 1] as [string, number], _.fromTuple)).toEqual(_.both("e", 1))
  })

  it("reverse", () => {
    U.deepStrictEqual(_.reverse(_.left("e")), _.right("e"))
    U.deepStrictEqual(_.reverse(_.right(1)), _.left(1))
    U.deepStrictEqual(_.reverse(_.both("e", 1)), _.both(1, "e"))
  })

  it("exists", () => {
    const gt2 = _.exists((n: number) => n > 2)
    U.deepStrictEqual(gt2(_.left("a")), false)
    U.deepStrictEqual(gt2(_.right(1)), false)
    U.deepStrictEqual(gt2(_.right(3)), true)
    U.deepStrictEqual(gt2(_.both("a", 1)), false)
    U.deepStrictEqual(gt2(_.both("a", 3)), true)
  })

  it("contains", () => {
    const contains = _.contains(number)
    U.deepStrictEqual(contains(2)(_.left("a")), false)
    U.deepStrictEqual(contains(2)(_.right(2)), true)
    U.deepStrictEqual(contains(1)(_.right(2)), false)
    U.deepStrictEqual(contains(2)(_.both("a", 2)), true)
    U.deepStrictEqual(contains(1)(_.both("a", 2)), false)
  })

  it("of", () => {
    U.deepStrictEqual(_.of(1), _.right(1))
  })

  it("catchAll", () => {
    U.deepStrictEqual(pipe(_.right(1), _.catchAll(() => _.right(2))), _.right(1))
    U.deepStrictEqual(pipe(_.right(1), _.catchAll(() => _.left("b"))), _.right(1))
    U.deepStrictEqual(pipe(_.right(1), _.catchAll(() => _.both("b", 2))), _.right(1))
    U.deepStrictEqual(pipe(_.left("a"), _.catchAll(() => _.right(2))), _.right(2))
    U.deepStrictEqual(pipe(_.left("a"), _.catchAll(() => _.left("b"))), _.left("b"))
    U.deepStrictEqual(pipe(_.left("a"), _.catchAll(() => _.both("b", 2))), _.both("b", 2))
    U.deepStrictEqual(pipe(_.both("a", 1), _.catchAll(() => _.right(2))), _.both("a", 1))
    U.deepStrictEqual(pipe(_.both("a", 1), _.catchAll(() => _.left("b"))), _.both("a", 1))
    U.deepStrictEqual(pipe(_.both("a", 1), _.catchAll(() => _.both("b", 2))), _.both("a", 1))
  })

  it("orElse", () => {
    U.deepStrictEqual(pipe(_.right(1), _.orElse(_.right(2))), _.right(1))
    U.deepStrictEqual(pipe(_.right(1), _.orElse(_.left("b"))), _.right(1))
    U.deepStrictEqual(pipe(_.right(1), _.orElse(_.both("b", 2))), _.right(1))
    U.deepStrictEqual(pipe(_.left("a"), _.orElse(_.right(2))), _.right(2))
    U.deepStrictEqual(pipe(_.left("a"), _.orElse(_.left("b"))), _.left("b"))
    U.deepStrictEqual(pipe(_.left("a"), _.orElse(_.both("b", 2))), _.both("b", 2))
    U.deepStrictEqual(pipe(_.both("a", 1), _.orElse(_.right(2))), _.both("a", 1))
    U.deepStrictEqual(pipe(_.both("a", 1), _.orElse(_.left("b"))), _.both("a", 1))
    U.deepStrictEqual(pipe(_.both("a", 1), _.orElse(_.both("b", 2))), _.both("a", 1))
  })

  it("orElseEither", () => {
    expect(pipe(_.right(1), _.orElseEither(_.right(2)))).toEqual(_.right(E.left(1)))
    expect(pipe(_.right(1), _.orElseEither(_.left("b")))).toEqual(_.right(E.left(1)))
    expect(pipe(_.right(1), _.orElseEither(_.both("b", 2)))).toEqual(_.right(E.left(1)))
    expect(pipe(_.left("a"), _.orElseEither(_.right(2)))).toEqual(_.right(E.right(2)))
    expect(pipe(_.left("a"), _.orElseEither(_.left("b")))).toEqual(_.left("b"))
    expect(pipe(_.left("a"), _.orElseEither(_.both("b", 2)))).toEqual(_.both("b", E.right(2)))
    expect(pipe(_.both("a", 1), _.orElseEither(_.right(2)))).toEqual(_.both("a", E.left(1)))
    expect(pipe(_.both("a", 1), _.orElseEither(_.left("b")))).toEqual(_.both("a", E.left(1)))
    expect(pipe(_.both("a", 1), _.orElseEither(_.both("b", 2)))).toEqual(_.both("a", E.left(1)))
  })

  it("orElseFail", () => {
    U.deepStrictEqual(pipe(_.right(1), _.orElseFail(() => "e2")), _.right(1))
    U.deepStrictEqual(pipe(_.left("e1"), _.orElseFail(() => "e2")), _.left("e2"))
    U.deepStrictEqual(pipe(_.both("e1", 1), _.orElseFail(() => "e2")), _.both("e1", 1))
  })

  it("orElseSucceed", () => {
    U.deepStrictEqual(pipe(_.right(1), _.orElseSucceed(() => 2)), _.right(1))
    U.deepStrictEqual(pipe(_.left("e"), _.orElseSucceed(() => 2)), _.right(2))
    U.deepStrictEqual(pipe(_.both("e", 1), _.orElseSucceed(() => 2)), _.both("e", 1))
  })

  it("firstSuccessOf", () => {
    U.deepStrictEqual(pipe(_.right(1), _.firstRightOrBothOf([])), _.right(1))
    U.deepStrictEqual(pipe(_.left("e"), _.firstRightOrBothOf([])), _.left("e"))
    U.deepStrictEqual(
      pipe(
        _.left("e1"),
        _.firstRightOrBothOf([_.left("e2"), _.left("e3"), _.left("e4"), _.right(1)])
      ),
      _.right(1)
    )
    U.deepStrictEqual(
      pipe(
        _.left("e1"),
        _.firstRightOrBothOf([_.left("e2"), _.left("e3"), _.left("e4"), _.both("e5", 1)])
      ),
      _.both("e5", 1)
    )
    U.deepStrictEqual(
      pipe(_.left("e1"), _.firstRightOrBothOf([_.left("e2"), _.left("e3"), _.left("e4")])),
      _.left("e4")
    )
  })

  it("coproduct", () => {
    U.deepStrictEqual(pipe(_.right(1), _.SemiCoproduct.coproduct(_.right(2))), _.right(1))
    U.deepStrictEqual(pipe(_.right(1), _.SemiCoproduct.coproduct(_.left("e2"))), _.right(1))
    U.deepStrictEqual(pipe(_.left("e1"), _.SemiCoproduct.coproduct(_.right(2))), _.right(2))
    U.deepStrictEqual(pipe(_.left("e1"), _.SemiCoproduct.coproduct(_.left("e2"))), _.left("e2"))
    U.deepStrictEqual(
      pipe(_.both("e1", 1), _.SemiCoproduct.coproduct(_.right(2))),
      _.both("e1", 1)
    )
    U.deepStrictEqual(
      pipe(_.both("e1", 1), _.SemiCoproduct.coproduct(_.left("e2"))),
      _.both("e1", 1)
    )
  })

  it("compact", () => {
    U.deepStrictEqual(pipe(_.right(O.some(1)), _.compact(() => "e2")), _.right(1))
    U.deepStrictEqual(pipe(_.right(O.none()), _.compact(() => "e2")), _.left("e2"))
    U.deepStrictEqual(pipe(_.left("e1"), _.compact(() => "e2")), _.left("e1"))
    U.deepStrictEqual(pipe(_.both("e1", O.some(1)), _.compact(() => "e2")), _.both("e1", 1))
    U.deepStrictEqual(pipe(_.both("e1", O.none()), _.compact(() => "e2")), _.left("e2"))
  })

  it("filter", () => {
    const predicate = (n: number) => n > 10
    U.deepStrictEqual(pipe(_.right(12), _.filter(predicate, () => "e2")), _.right(12))
    U.deepStrictEqual(pipe(_.right(7), _.filter(predicate, () => "e2")), _.left("e2"))
    U.deepStrictEqual(pipe(_.left("e1"), _.filter(predicate, () => "e2")), _.left("e1"))
    U.deepStrictEqual(pipe(_.both("e1", 12), _.filter(predicate, () => "e2")), _.both("e1", 12))
    U.deepStrictEqual(pipe(_.both("e1", 7), _.filter(predicate, () => "e2")), _.left("e2"))
  })

  it("filterMap", () => {
    const f = (n: number) => (n > 2 ? O.some(n + 1) : O.none())
    U.deepStrictEqual(pipe(_.left("e1"), _.filterMap(f, () => "e2")), _.left("e1"))
    U.deepStrictEqual(pipe(_.right(1), _.filterMap(f, () => "e2")), _.left("e2"))
    U.deepStrictEqual(pipe(_.right(3), _.filterMap(f, () => "e2")), _.right(4))
    U.deepStrictEqual(pipe(_.both("e1", 1), _.filterMap(f, () => "e2")), _.left("e2"))
    U.deepStrictEqual(pipe(_.both("e1", 3), _.filterMap(f, () => "e2")), _.both("e1", 4))
  })
})
