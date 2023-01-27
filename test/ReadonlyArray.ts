import * as E from "@fp-ts/core/Either"
import { identity, pipe } from "@fp-ts/core/Function"
import * as Number from "@fp-ts/core/Number"
import * as O from "@fp-ts/core/Option"
import type { Predicate } from "@fp-ts/core/Predicate"
import * as RA from "@fp-ts/core/ReadonlyArray"
import * as String from "@fp-ts/core/String"
import { deepStrictEqual, double, strictEqual } from "@fp-ts/core/test/util"
import * as Order from "@fp-ts/core/typeclass/Order"
import * as assert from "assert"
import * as fc from "fast-check"

describe.concurrent("ReadonlyArray", () => {
  it("instances and derived exports", () => {
    expect(RA.Invariant).exist
    expect(RA.tupled).exist
    expect(RA.bindTo).exist

    expect(RA.Covariant).exist
    expect(RA.map).exist
    expect(RA.let).exist
    expect(RA.flap).exist
    expect(RA.as).exist

    expect(RA.Of).exist
    expect(RA.of).exist
    expect(RA.Do).exist

    expect(RA.Pointed).exist

    expect(RA.FlatMap).exist
    expect(RA.flatMap).exist
    expect(RA.flatten).exist
    expect(RA.composeKleisliArrow).exist

    expect(RA.Chainable).exist
    expect(RA.bind).exist

    expect(RA.Monad).exist

    expect(RA.SemiProduct).exist
    expect(RA.andThenBind).exist

    expect(RA.Product).exist

    expect(RA.SemiApplicative).exist
    expect(RA.liftSemigroup).exist
    expect(RA.lift2).exist
    expect(RA.ap).exist

    expect(RA.Applicative).exist
    expect(RA.liftMonoid).exist

    expect(RA.Foldable).exist
    expect(RA.reduce).exist
    expect(RA.reduceRight).exist
    expect(RA.foldMap).exist
    expect(RA.reduceKind).exist
    expect(RA.reduceRightKind).exist
    expect(RA.foldMapKind).exist

    expect(RA.Traversable).exist
    expect(RA.traverse).exist
    expect(RA.sequence).exist
    expect(RA.traverseTap).exist

    expect(RA.Compactable).exist
    expect(RA.compact).exist
    expect(RA.separate).exist

    expect(RA.Filterable).exist
    expect(RA.filterMap).exist
    expect(RA.filter).exist
    expect(RA.partition).exist
    expect(RA.partitionMap).exist

    expect(RA.TraversableFilterable).exist
    expect(RA.traverseFilterMap).exist
    expect(RA.traversePartitionMap).exist
    expect(RA.traverseFilter).exist
    expect(RA.traversePartition).exist

    expect(RA.liftPredicate).exist
    expect(RA.liftOption).exist
    expect(RA.liftNullable).exist
    expect(RA.flatMapNullable).exist
  })

  it("fromIterable/Array should return the same reference if the iterable is an Array", () => {
    const i = [1, 2, 3]
    expect(RA.fromIterable(i) === i).toEqual(true)
  })

  it("fromIterable/Iterable", () => {
    expect(RA.fromIterable(new Set([1, 2, 3]))).toEqual([1, 2, 3])
  })

  describe("iterable inputs", () => {
    it("prepend", () => {
      deepStrictEqual(pipe([1, 2, 3], RA.prepend(0)), [0, 1, 2, 3])
      deepStrictEqual(pipe([[2]], RA.prepend([1])), [[1], [2]])

      deepStrictEqual(pipe(new Set([1, 2, 3]), RA.prepend(0)), [0, 1, 2, 3])
      deepStrictEqual(pipe(new Set([[2]]), RA.prepend([1])), [[1], [2]])
    })

    it("prependAll", () => {
      deepStrictEqual(pipe([3, 4], RA.prependAll([1, 2])), [1, 2, 3, 4])

      deepStrictEqual(pipe([3, 4], RA.prependAll(new Set([1, 2]))), [1, 2, 3, 4])
      deepStrictEqual(pipe(new Set([3, 4]), RA.prependAll([1, 2])), [1, 2, 3, 4])
    })

    it("prependAllNonEmpty", () => {
      deepStrictEqual(pipe([3, 4], RA.prependAllNonEmpty([1, 2])), [1, 2, 3, 4])

      deepStrictEqual(pipe(RA.make(3, 4), RA.prependAllNonEmpty(new Set([1, 2]))), [1, 2, 3, 4])
      deepStrictEqual(pipe(new Set([3, 4]), RA.prependAllNonEmpty([1, 2])), [1, 2, 3, 4])
    })

    it("append", () => {
      deepStrictEqual(pipe([1, 2, 3], RA.append(4)), [1, 2, 3, 4])
      deepStrictEqual(pipe([[1]], RA.append([2])), [[1], [2]])

      deepStrictEqual(pipe(new Set([1, 2, 3]), RA.append(4)), [1, 2, 3, 4])
      deepStrictEqual(pipe(new Set([[1]]), RA.append([2])), [[1], [2]])
    })

    it("appendAll", () => {
      deepStrictEqual(pipe([1, 2], RA.appendAll([3, 4])), [1, 2, 3, 4])

      deepStrictEqual(pipe([1, 2], RA.appendAll(new Set([3, 4]))), [1, 2, 3, 4])
      deepStrictEqual(pipe(new Set([1, 2]), RA.appendAll([3, 4])), [1, 2, 3, 4])
    })

    it("appendAllNonEmpty", () => {
      deepStrictEqual(pipe([1, 2], RA.appendAllNonEmpty([3, 4])), [1, 2, 3, 4])

      deepStrictEqual(pipe(RA.make(1, 2), RA.appendAllNonEmpty(new Set([3, 4]))), [1, 2, 3, 4])
      deepStrictEqual(pipe(new Set([1, 2]), RA.appendAllNonEmpty([3, 4])), [1, 2, 3, 4])
    })

    it("scan", () => {
      const f = (b: number, a: number) => b - a
      deepStrictEqual(pipe([1, 2, 3], RA.scan(10, f)), [10, 9, 7, 4])
      deepStrictEqual(pipe([0], RA.scan(10, f)), [10, 10])
      deepStrictEqual(pipe([], RA.scan(10, f)), [10])

      deepStrictEqual(pipe(new Set([1, 2, 3]), RA.scan(10, f)), [10, 9, 7, 4])
      deepStrictEqual(pipe(new Set([0]), RA.scan(10, f)), [10, 10])
      deepStrictEqual(pipe(new Set([]), RA.scan(10, f)), [10])
    })

    it("scanRight", () => {
      const f = (b: number, a: number) => a - b
      deepStrictEqual(pipe([1, 2, 3], RA.scanRight(10, f)), [-8, 9, -7, 10])
      deepStrictEqual(pipe([0], RA.scanRight(10, f)), [-10, 10])
      deepStrictEqual(pipe([], RA.scanRight(10, f)), [10])

      deepStrictEqual(pipe(new Set([1, 2, 3]), RA.scanRight(10, f)), [-8, 9, -7, 10])
      deepStrictEqual(pipe(new Set([0]), RA.scanRight(10, f)), [-10, 10])
      deepStrictEqual(pipe(new Set([]), RA.scanRight(10, f)), [10])
    })

    it("tail", () => {
      deepStrictEqual(RA.tail([1, 2, 3]), O.some([2, 3]))
      deepStrictEqual(RA.tail([]), O.none())

      deepStrictEqual(RA.tail(new Set([1, 2, 3])), O.some([2, 3]))
      deepStrictEqual(RA.tail(new Set([])), O.none())
    })

    it("init", () => {
      deepStrictEqual(RA.init([1, 2, 3]), O.some([1, 2]))
      deepStrictEqual(RA.init([]), O.none())

      deepStrictEqual(RA.init(new Set([1, 2, 3])), O.some([1, 2]))
      deepStrictEqual(RA.init(new Set([])), O.none())
    })

    it("take", () => {
      expect(pipe([1, 2, 3, 4], RA.take(2))).toEqual([1, 2])
      expect(pipe([1, 2, 3, 4], RA.take(0))).toEqual([])
      // out of bounds
      expect(pipe([1, 2, 3, 4], RA.take(-10))).toEqual([])
      expect(pipe([1, 2, 3, 4], RA.take(10))).toEqual([1, 2, 3, 4])

      expect(pipe(new Set([1, 2, 3, 4]), RA.take(2))).toEqual([1, 2])
      expect(pipe(new Set([1, 2, 3, 4]), RA.take(0))).toEqual([])
      // out of bounds
      expect(pipe(new Set([1, 2, 3, 4]), RA.take(-10))).toEqual([])
      expect(pipe(new Set([1, 2, 3, 4]), RA.take(10))).toEqual([1, 2, 3, 4])
    })

    it("takeRight", () => {
      deepStrictEqual(pipe(RA.empty(), RA.takeRight(0)), [])
      deepStrictEqual(pipe([1, 2], RA.takeRight(0)), [])
      deepStrictEqual(pipe([1, 2], RA.takeRight(1)), [2])
      deepStrictEqual(pipe([1, 2], RA.takeRight(2)), [1, 2])
      // out of bound
      deepStrictEqual(pipe(RA.empty(), RA.takeRight(1)), [])
      deepStrictEqual(pipe(RA.empty(), RA.takeRight(-1)), [])
      deepStrictEqual(pipe([1, 2], RA.takeRight(3)), [1, 2])
      deepStrictEqual(pipe([1, 2], RA.takeRight(-1)), [])

      deepStrictEqual(pipe(new Set(), RA.takeRight(0)), [])
      deepStrictEqual(pipe(new Set([1, 2]), RA.takeRight(0)), [])
      deepStrictEqual(pipe(new Set([1, 2]), RA.takeRight(1)), [2])
      deepStrictEqual(pipe(new Set([1, 2]), RA.takeRight(2)), [1, 2])
      // out of bound
      deepStrictEqual(pipe(new Set(), RA.takeRight(1)), [])
      deepStrictEqual(pipe(new Set(), RA.takeRight(-1)), [])
      deepStrictEqual(pipe(new Set([1, 2]), RA.takeRight(3)), [1, 2])
      deepStrictEqual(pipe(new Set([1, 2]), RA.takeRight(-1)), [])
    })

    it("takeWhile", () => {
      const f = (n: number) => n % 2 === 0
      deepStrictEqual(pipe([2, 4, 3, 6], RA.takeWhile(f)), [2, 4])
      deepStrictEqual(pipe(RA.empty(), RA.takeWhile(f)), [])
      deepStrictEqual(pipe([1, 2, 4], RA.takeWhile(f)), [])
      deepStrictEqual(pipe([2, 4], RA.takeWhile(f)), [2, 4])

      deepStrictEqual(pipe(new Set([2, 4, 3, 6]), RA.takeWhile(f)), [2, 4])
      deepStrictEqual(pipe(new Set<number>(), RA.takeWhile(f)), [])
      deepStrictEqual(pipe(new Set([1, 2, 4]), RA.takeWhile(f)), [])
      deepStrictEqual(pipe(new Set([2, 4]), RA.takeWhile(f)), [2, 4])
    })

    it("span", () => {
      const f = RA.span((n: number) => n % 2 === 1)
      const assertSpan = (
        input: Iterable<number>,
        expectedInit: ReadonlyArray<number>,
        expectedRest: ReadonlyArray<number>
      ) => {
        const [init, rest] = f(input)
        deepStrictEqual(init, expectedInit)
        deepStrictEqual(rest, expectedRest)
      }
      assertSpan([1, 3, 2, 4, 5], [1, 3], [2, 4, 5])
      assertSpan(RA.empty(), RA.empty(), RA.empty())
      assertSpan([1, 3], [1, 3], RA.empty())
      assertSpan([2, 4], RA.empty(), [2, 4])

      assertSpan(new Set([1, 3, 2, 4, 5]), [1, 3], [2, 4, 5])
      assertSpan(new Set(), RA.empty(), RA.empty())
      assertSpan(new Set([1, 3]), [1, 3], RA.empty())
      assertSpan(new Set([2, 4]), RA.empty(), [2, 4])
    })

    it("drop", () => {
      deepStrictEqual(pipe(RA.empty(), RA.drop(0)), [])
      deepStrictEqual(pipe([1, 2], RA.drop(0)), [1, 2])
      deepStrictEqual(pipe([1, 2], RA.drop(1)), [2])
      deepStrictEqual(pipe([1, 2], RA.drop(2)), [])
      // out of bound
      deepStrictEqual(pipe(RA.empty(), RA.drop(1)), [])
      deepStrictEqual(pipe(RA.empty(), RA.drop(-1)), [])
      deepStrictEqual(pipe([1, 2], RA.drop(3)), [])
      deepStrictEqual(pipe([1, 2], RA.drop(-1)), [1, 2])

      deepStrictEqual(pipe(new Set(), RA.drop(0)), [])
      deepStrictEqual(pipe(new Set([1, 2]), RA.drop(0)), [1, 2])
      deepStrictEqual(pipe(new Set([1, 2]), RA.drop(1)), [2])
      deepStrictEqual(pipe(new Set([1, 2]), RA.drop(2)), [])
      // out of bound
      deepStrictEqual(pipe(new Set(), RA.drop(1)), [])
      deepStrictEqual(pipe(new Set(), RA.drop(-1)), [])
      deepStrictEqual(pipe(new Set([1, 2]), RA.drop(3)), [])
      deepStrictEqual(pipe(new Set([1, 2]), RA.drop(-1)), [1, 2])
    })

    it("dropRight", () => {
      deepStrictEqual(pipe([], RA.dropRight(0)), [])
      deepStrictEqual(pipe([1, 2], RA.dropRight(0)), [1, 2])
      deepStrictEqual(pipe([1, 2], RA.dropRight(1)), [1])
      deepStrictEqual(pipe([1, 2], RA.dropRight(2)), [])
      // out of bound
      deepStrictEqual(pipe([], RA.dropRight(1)), [])
      deepStrictEqual(pipe([1, 2], RA.dropRight(3)), [])
      deepStrictEqual(pipe([], RA.dropRight(-1)), [])
      deepStrictEqual(pipe([1, 2], RA.dropRight(-1)), [1, 2])

      deepStrictEqual(pipe(new Set(), RA.dropRight(0)), [])
      deepStrictEqual(pipe(new Set([1, 2]), RA.dropRight(0)), [1, 2])
      deepStrictEqual(pipe(new Set([1, 2]), RA.dropRight(1)), [1])
      deepStrictEqual(pipe(new Set([1, 2]), RA.dropRight(2)), [])
      // out of bound
      deepStrictEqual(pipe(new Set(), RA.dropRight(1)), [])
      deepStrictEqual(pipe(new Set([1, 2]), RA.dropRight(3)), [])
      deepStrictEqual(pipe(new Set(), RA.dropRight(-1)), [])
      deepStrictEqual(pipe(new Set([1, 2]), RA.dropRight(-1)), [1, 2])
    })

    it("dropWhile", () => {
      const f = RA.dropWhile((n: number) => n > 0)

      deepStrictEqual(f([]), [])
      deepStrictEqual(f([1, 2]), RA.empty())
      deepStrictEqual(f([-1, -2]), [-1, -2])
      deepStrictEqual(f([-1, 2]), [-1, 2])
      deepStrictEqual(f([1, -2, 3]), [-2, 3])

      deepStrictEqual(f(new Set<number>()), [])
      deepStrictEqual(f(new Set([1, 2])), RA.empty())
      deepStrictEqual(f(new Set([-1, -2])), [-1, -2])
      deepStrictEqual(f(new Set([-1, 2])), [-1, 2])
      deepStrictEqual(f(new Set([1, -2, 3])), [-2, 3])
    })

    it("findFirstIndex", () => {
      deepStrictEqual(pipe([], RA.findFirstIndex((n) => n % 2 === 0)), O.none())
      deepStrictEqual(pipe([1, 2, 3], RA.findFirstIndex((n) => n % 2 === 0)), O.some(1))
      deepStrictEqual(pipe([1, 2, 3, 1], RA.findFirstIndex((n) => n % 2 === 0)), O.some(1))

      deepStrictEqual(pipe(new Set<number>(), RA.findFirstIndex((n) => n % 2 === 0)), O.none())
      deepStrictEqual(pipe(new Set([1, 2, 3]), RA.findFirstIndex((n) => n % 2 === 0)), O.some(1))
      deepStrictEqual(pipe(new Set([1, 2, 3, 4]), RA.findFirstIndex((n) => n % 2 === 0)), O.some(1))
    })

    it("findLastIndex", () => {
      deepStrictEqual(pipe([], RA.findLastIndex((n) => n % 2 === 0)), O.none())
      deepStrictEqual(pipe([1, 2, 3], RA.findLastIndex((n) => n % 2 === 0)), O.some(1))
      deepStrictEqual(pipe([1, 2, 3, 4], RA.findLastIndex((n) => n % 2 === 0)), O.some(3))

      deepStrictEqual(pipe(new Set<number>(), RA.findLastIndex((n) => n % 2 === 0)), O.none())
      deepStrictEqual(pipe(new Set([1, 2, 3]), RA.findLastIndex((n) => n % 2 === 0)), O.some(1))
      deepStrictEqual(pipe(new Set([1, 2, 3, 4]), RA.findLastIndex((n) => n % 2 === 0)), O.some(3))
    })

    it("findFirst", () => {
      deepStrictEqual(pipe([], RA.findFirst((n) => n % 2 === 0)), O.none())
      deepStrictEqual(pipe([1, 2, 3], RA.findFirst((n) => n % 2 === 0)), O.some(2))
      deepStrictEqual(pipe([1, 2, 3, 4], RA.findFirst((n) => n % 2 === 0)), O.some(2))

      deepStrictEqual(pipe(new Set<number>(), RA.findFirst((n) => n % 2 === 0)), O.none())
      deepStrictEqual(pipe(new Set([1, 2, 3]), RA.findFirst((n) => n % 2 === 0)), O.some(2))
      deepStrictEqual(pipe(new Set([1, 2, 3, 4]), RA.findFirst((n) => n % 2 === 0)), O.some(2))
    })

    it("findLast", () => {
      deepStrictEqual(pipe([], RA.findLast((n) => n % 2 === 0)), O.none())
      deepStrictEqual(pipe([1, 2, 3], RA.findLast((n) => n % 2 === 0)), O.some(2))
      deepStrictEqual(pipe([1, 2, 3, 4], RA.findLast((n) => n % 2 === 0)), O.some(4))

      deepStrictEqual(pipe(new Set<number>(), RA.findLast((n) => n % 2 === 0)), O.none())
      deepStrictEqual(pipe(new Set([1, 2, 3]), RA.findLast((n) => n % 2 === 0)), O.some(2))
      deepStrictEqual(pipe(new Set([1, 2, 3, 4]), RA.findLast((n) => n % 2 === 0)), O.some(4))
    })

    it("insertAt", () => {
      deepStrictEqual(RA.insertAt(1, 1)([]), O.none())
      deepStrictEqual(RA.insertAt(0, 1)([]), O.some([1]))
      deepStrictEqual(RA.insertAt(2, 5)([1, 2, 3, 4]), O.some([1, 2, 5, 3, 4]))
      // out of bound
      deepStrictEqual(RA.insertAt(-1, 5)([1, 2, 3, 4]), O.none())
      deepStrictEqual(RA.insertAt(10, 5)([1, 2, 3, 4]), O.none())

      deepStrictEqual(RA.insertAt(1, 1)(new Set([])), O.none())
      deepStrictEqual(RA.insertAt(0, 1)(new Set([])), O.some([1]))
      deepStrictEqual(RA.insertAt(2, 5)(new Set([1, 2, 3, 4])), O.some([1, 2, 5, 3, 4]))
      // out of bound
      deepStrictEqual(RA.insertAt(-1, 5)(new Set([1, 2, 3, 4])), O.none())
      deepStrictEqual(RA.insertAt(10, 5)(new Set([1, 2, 3, 4])), O.none())
    })

    it("replace", () => {
      deepStrictEqual(pipe([1, 2, 3], RA.replace(1, "a")), [1, "a", 3])
      // out of bound
      deepStrictEqual(pipe([], RA.replace(1, "a")), [])
      deepStrictEqual(pipe([1, 2, 3], RA.replace(-1, "a")), [1, 2, 3])
      deepStrictEqual(pipe([1, 2, 3], RA.replace(10, "a")), [1, 2, 3])

      deepStrictEqual(pipe(new Set([1, 2, 3]), RA.replace(1, "a")), [1, "a", 3])
      // out of bound
      deepStrictEqual(pipe(new Set([]), RA.replace(1, "a")), [])
      deepStrictEqual(pipe(new Set([1, 2, 3]), RA.replace(-1, "a")), [1, 2, 3])
      deepStrictEqual(pipe(new Set([1, 2, 3]), RA.replace(10, "a")), [1, 2, 3])
    })

    it("replaceOption", () => {
      deepStrictEqual(pipe([1, 2, 3], RA.replaceOption(1, "a")), O.some([1, "a", 3]))
      // out of bound
      deepStrictEqual(pipe([], RA.replaceOption(1, "a")), O.none())
      deepStrictEqual(pipe([1, 2, 3], RA.replaceOption(-1, "a")), O.none())
      deepStrictEqual(pipe([1, 2, 3], RA.replaceOption(10, "a")), O.none())

      deepStrictEqual(pipe(new Set([1, 2, 3]), RA.replaceOption(1, "a")), O.some([1, "a", 3]))
      // out of bound
      deepStrictEqual(pipe(new Set([]), RA.replaceOption(1, "a")), O.none())
      deepStrictEqual(pipe(new Set([1, 2, 3]), RA.replaceOption(-1, "a")), O.none())
      deepStrictEqual(pipe(new Set([1, 2, 3]), RA.replaceOption(10, "a")), O.none())
    })

    it("modify", () => {
      deepStrictEqual(pipe([1, 2, 3], RA.modify(1, double)), [1, 4, 3])
      // out of bound
      deepStrictEqual(pipe([], RA.modify(1, double)), [])
      deepStrictEqual(pipe([1, 2, 3], RA.modify(10, double)), [1, 2, 3])

      deepStrictEqual(pipe(new Set([1, 2, 3]), RA.modify(1, double)), [1, 4, 3])
      // out of bound
      deepStrictEqual(pipe(new Set([]), RA.modify(1, double)), [])
      deepStrictEqual(pipe(new Set([1, 2, 3]), RA.modify(10, double)), [1, 2, 3])
    })

    it("modifyOption", () => {
      deepStrictEqual(pipe([1, 2, 3], RA.modifyOption(1, double)), O.some([1, 4, 3]))
      // out of bound
      deepStrictEqual(pipe([], RA.modifyOption(1, double)), O.none())
      deepStrictEqual(pipe([1, 2, 3], RA.modifyOption(10, double)), O.none())

      deepStrictEqual(pipe(new Set([1, 2, 3]), RA.modifyOption(1, double)), O.some([1, 4, 3]))
      // out of bound
      deepStrictEqual(pipe(new Set([]), RA.modifyOption(1, double)), O.none())
      deepStrictEqual(pipe(new Set([1, 2, 3]), RA.modifyOption(10, double)), O.none())
    })

    it("remove", () => {
      deepStrictEqual(pipe([1, 2, 3], RA.remove(0)), [2, 3])
      // out of bound
      deepStrictEqual(pipe([], RA.remove(0)), [])
      deepStrictEqual(pipe([1, 2, 3], RA.remove(-1)), [1, 2, 3])
      deepStrictEqual(pipe([1, 2, 3], RA.remove(10)), [1, 2, 3])

      deepStrictEqual(pipe(new Set([1, 2, 3]), RA.remove(0)), [2, 3])
      // out of bound
      deepStrictEqual(pipe(new Set([]), RA.remove(0)), [])
      deepStrictEqual(pipe(new Set([1, 2, 3]), RA.remove(-1)), [1, 2, 3])
      deepStrictEqual(pipe(new Set([1, 2, 3]), RA.remove(10)), [1, 2, 3])
    })

    it("reverse", () => {
      deepStrictEqual(RA.reverse([]), [])
      deepStrictEqual(RA.reverse([1]), [1])
      deepStrictEqual(RA.reverse([1, 2, 3]), [3, 2, 1])

      deepStrictEqual(RA.reverse(new Set([])), [])
      deepStrictEqual(RA.reverse(new Set([1])), [1])
      deepStrictEqual(RA.reverse(new Set([1, 2, 3])), [3, 2, 1])
    })

    it("rights", () => {
      deepStrictEqual(RA.rights([]), [])
      deepStrictEqual(RA.rights([E.right(1), E.left("a"), E.right(2)]), [1, 2])

      deepStrictEqual(RA.rights(new Set<E.Either<unknown, unknown>>()), [])
      deepStrictEqual(RA.rights(new Set([E.right(1), E.left("a"), E.right(2)])), [1, 2])
    })

    it("lefts", () => {
      deepStrictEqual(RA.lefts([]), [])
      deepStrictEqual(RA.lefts([E.right(1), E.left("a"), E.right(2)]), ["a"])

      deepStrictEqual(RA.lefts(new Set<E.Either<unknown, unknown>>()), [])
      deepStrictEqual(RA.lefts(new Set([E.right(1), E.left("a"), E.right(2)])), ["a"])
    })

    it("sort", () => {
      deepStrictEqual(RA.sort(Number.Order)([]), [])
      deepStrictEqual(RA.sort(Number.Order)([1, 3, 2]), [1, 2, 3])

      deepStrictEqual(RA.sort(Number.Order)(new Set<number>()), [])
      deepStrictEqual(RA.sort(Number.Order)(new Set([1, 3, 2])), [1, 2, 3])
    })

    it("zip", () => {
      deepStrictEqual(pipe(new Set([]), RA.zip(new Set(["a", "b", "c", "d"]))), [])
      deepStrictEqual(pipe(new Set([1, 2, 3]), RA.zip(new Set([]))), [])
      deepStrictEqual(pipe(new Set([1, 2, 3]), RA.zip(new Set(["a", "b", "c", "d"]))), [
        [1, "a"],
        [2, "b"],
        [3, "c"]
      ])
      deepStrictEqual(pipe(new Set([1, 2, 3]), RA.zip(new Set(["a", "b", "c", "d"]))), [
        [1, "a"],
        [2, "b"],
        [3, "c"]
      ])
    })

    it("zipWith", () => {
      deepStrictEqual(
        pipe(new Set([1, 2, 3]), RA.zipWith(new Set([]), (n, s) => s + n)),
        []
      )
      deepStrictEqual(
        pipe(new Set([]), RA.zipWith(new Set(["a", "b", "c", "d"]), (n, s) => s + n)),
        []
      )
      deepStrictEqual(
        pipe(new Set([]), RA.zipWith(new Set([]), (n, s) => s + n)),
        []
      )
      deepStrictEqual(
        pipe(new Set([1, 2, 3]), RA.zipWith(new Set(["a", "b", "c", "d"]), (n, s) => s + n)),
        ["a1", "b2", "c3"]
      )
    })

    it("unzip", () => {
      deepStrictEqual(RA.unzip(new Set([])), [[], []])
      deepStrictEqual(
        RA.unzip(
          new Set([
            [1, "a"],
            [2, "b"],
            [3, "c"]
          ])
        ),
        [
          [1, 2, 3],
          ["a", "b", "c"]
        ]
      )
    })

    it("intersperse", () => {
      deepStrictEqual(pipe([], RA.intersperse(0)), [])
      deepStrictEqual(pipe([1], RA.intersperse(0)), [1])
      deepStrictEqual(pipe([1, 2, 3], RA.intersperse(0)), [1, 0, 2, 0, 3])
      deepStrictEqual(pipe([1, 2], RA.intersperse(0)), [1, 0, 2])
      deepStrictEqual(pipe([1, 2, 3, 4], RA.intersperse(0)), [1, 0, 2, 0, 3, 0, 4])

      deepStrictEqual(pipe(new Set([]), RA.intersperse(0)), [])
      deepStrictEqual(pipe(new Set([1]), RA.intersperse(0)), [1])
      deepStrictEqual(pipe(new Set([1, 2, 3]), RA.intersperse(0)), [1, 0, 2, 0, 3])
      deepStrictEqual(pipe(new Set([1, 2]), RA.intersperse(0)), [1, 0, 2])
      deepStrictEqual(pipe(new Set([1, 2, 3, 4]), RA.intersperse(0)), [1, 0, 2, 0, 3, 0, 4])
    })

    it("rotate", () => {
      deepStrictEqual(RA.rotate(0)(RA.empty()), RA.empty())
      deepStrictEqual(RA.rotate(1)(RA.empty()), RA.empty())
      deepStrictEqual(RA.rotate(1)([1]), [1])
      deepStrictEqual(RA.rotate(2)([1]), [1])
      deepStrictEqual(RA.rotate(-1)([1]), [1])
      deepStrictEqual(RA.rotate(-2)([1]), [1])
      deepStrictEqual(RA.rotate(2)([1, 2]), [1, 2])
      deepStrictEqual(RA.rotate(0)([1, 2]), [1, 2])
      deepStrictEqual(RA.rotate(-2)([1, 2]), [1, 2])
      deepStrictEqual(RA.rotate(1)([1, 2]), [2, 1])
      deepStrictEqual(RA.rotate(1)(new Set([1, 2, 3, 4, 5])), [5, 1, 2, 3, 4])
      deepStrictEqual(RA.rotate(2)(new Set([1, 2, 3, 4, 5])), [4, 5, 1, 2, 3])
      deepStrictEqual(RA.rotate(-1)(new Set([1, 2, 3, 4, 5])), [2, 3, 4, 5, 1])
      deepStrictEqual(RA.rotate(-2)(new Set([1, 2, 3, 4, 5])), [3, 4, 5, 1, 2])
      // out of bounds
      deepStrictEqual(RA.rotate(7)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
      deepStrictEqual(RA.rotate(-7)([1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])
      deepStrictEqual(RA.rotate(2.2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
      deepStrictEqual(RA.rotate(-2.2)([1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])
    })

    it("contains", () => {
      const contains = RA.contains(Number.Equivalence)
      deepStrictEqual(pipe([1, 2, 3], contains(2)), true)
      deepStrictEqual(pipe([1, 2, 3], contains(0)), false)

      deepStrictEqual(pipe(new Set([1, 2, 3]), contains(2)), true)
      deepStrictEqual(pipe(new Set([1, 2, 3]), contains(0)), false)
    })

    it("uniq", () => {
      const uniq = RA.uniq(Number.Equivalence)
      deepStrictEqual(uniq([]), [])
      deepStrictEqual(uniq([-0, -0]), [-0])
      deepStrictEqual(uniq([0, -0]), [0])
      deepStrictEqual(uniq([1]), [1])
      deepStrictEqual(uniq([2, 1, 2]), [2, 1])
      deepStrictEqual(uniq([1, 2, 1]), [1, 2])
      deepStrictEqual(uniq([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
      deepStrictEqual(uniq([1, 1, 2, 2, 3, 3, 4, 4, 5, 5]), [1, 2, 3, 4, 5])
      deepStrictEqual(uniq([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
    })

    it("splitAt", () => {
      const assertSplitAt = (
        input: ReadonlyArray<number>,
        index: number,
        expectedInit: ReadonlyArray<number>,
        expectedRest: ReadonlyArray<number>
      ) => {
        const [init, rest] = RA.splitAt(index)(input)
        deepStrictEqual(init, expectedInit)
        deepStrictEqual(rest, expectedRest)
      }
      deepStrictEqual(RA.splitAt(1)([1, 2]), [[1], [2]])
      assertSplitAt([1, 2], 2, [1, 2], [])
      deepStrictEqual(RA.splitAt(2)([1, 2, 3, 4, 5]), [
        [1, 2],
        [3, 4, 5]
      ])
      deepStrictEqual(RA.splitAt(2)(new Set([1, 2, 3, 4, 5])), [
        [1, 2],
        [3, 4, 5]
      ])
      assertSplitAt([], 0, [], [])
      assertSplitAt([1, 2], 0, [], [1, 2])

      // out of bounds
      assertSplitAt([], -1, [], [])
      assertSplitAt([1, 2], -1, [], [1, 2])
      assertSplitAt([1, 2], 3, [1, 2], [])
      assertSplitAt([], 3, [], [])
    })
  })

  it("splitNonEmptyAt", () => {
    deepStrictEqual(pipe(RA.make(1, 2, 3, 4), RA.splitNonEmptyAt(2)), [[1, 2], [3, 4]])
  })

  it("rotateNonEmpty", () => {
    deepStrictEqual(RA.rotateNonEmpty(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
  })

  it("intersperseNonEmpty", () => {
    deepStrictEqual(pipe(RA.make(1), RA.intersperseNonEmpty(0)), [1])
    deepStrictEqual(pipe(RA.make(1, 2, 3), RA.intersperseNonEmpty(0)), [1, 0, 2, 0, 3])
  })

  it("sortNonEmpty", () => {
    deepStrictEqual(RA.sortNonEmpty(Number.Order)([1]), [1])
    deepStrictEqual(RA.sortNonEmpty(Number.Order)([1, 3, 2]), [1, 2, 3])
  })

  describe("unsafeGet", () => {
    it("should throw on index out of bound", () => {
      expect(() => pipe([], RA.unsafeGet(100))).toThrowError(new Error("Index 100 out of bounds"))
    })
  })

  it("fromNullable", () => {
    deepStrictEqual(RA.fromNullable(undefined), [])
    deepStrictEqual(RA.fromNullable(null), [])
    deepStrictEqual(RA.fromNullable(1), [1])
  })

  it("liftNullable", () => {
    const f = RA.liftNullable((n: number) => (n > 0 ? n : null))
    deepStrictEqual(f(1), [1])
    deepStrictEqual(f(-1), [])
  })

  it("flatMapNullable", () => {
    const f = RA.flatMapNullable((n: number) => (n > 0 ? n : null))
    deepStrictEqual(pipe([], f), [])
    deepStrictEqual(pipe([1], f), [1])
    deepStrictEqual(pipe([-1], f), [])
  })

  it("liftPredicate", () => {
    const p = (n: number): boolean => n > 2
    const f = RA.liftPredicate(p)
    deepStrictEqual(f(1), [])
    deepStrictEqual(f(3), [3])
  })

  it("liftOption", () => {
    const f = RA.liftOption((n: number) => (n > 0 ? O.some(n) : O.none()))
    deepStrictEqual(f(1), [1])
    deepStrictEqual(f(-1), [])
  })

  it("unprepend", () => {
    deepStrictEqual(RA.unprepend([0]), [0, []])
    deepStrictEqual(RA.unprepend([1, 2, 3, 4]), [1, [2, 3, 4]])
  })

  it("unappend", () => {
    deepStrictEqual(RA.unappend([0]), [[], 0])
    deepStrictEqual(RA.unappend([1, 2, 3, 4]), [
      RA.make(1, 2, 3),
      4
    ])
    deepStrictEqual(RA.unappend([0]), [[], 0])
    deepStrictEqual(RA.unappend([1, 2, 3, 4]), [
      RA.make(1, 2, 3),
      4
    ])
  })

  it("modifyNonEmptyHead", () => {
    const f = (s: string) => s + "!"
    deepStrictEqual(pipe(["a"], RA.modifyNonEmptyHead(f)), ["a!"])
    deepStrictEqual(pipe(["a", "b"], RA.modifyNonEmptyHead(f)), ["a!", "b"])
    deepStrictEqual(pipe(["a", "b", "c"], RA.modifyNonEmptyHead(f)), ["a!", "b", "c"])
  })

  it("modifyNonEmptyLast", () => {
    const f = (s: string) => s + "!"
    deepStrictEqual(pipe(["a"], RA.modifyNonEmptyLast(f)), ["a!"])
    deepStrictEqual(pipe(["a", "b"], RA.modifyNonEmptyLast(f)), ["a", "b!"])
    deepStrictEqual(pipe(["a", "b", "c"], RA.modifyNonEmptyLast(f)), ["a", "b", "c!"])
  })

  it("setNonEmptyHead", () => {
    deepStrictEqual(pipe(RA.make("a"), RA.setNonEmptyHead("d")), ["d"])
    deepStrictEqual(pipe(RA.make("a", "b"), RA.setNonEmptyHead("d")), ["d", "b"])
    deepStrictEqual(pipe(RA.make("a", "b", "c"), RA.setNonEmptyHead("d")), ["d", "b", "c"])
  })

  it("setNonEmptyLast", () => {
    deepStrictEqual(pipe(RA.make("a"), RA.setNonEmptyLast("d")), ["d"])
    deepStrictEqual(pipe(RA.make("a", "b"), RA.setNonEmptyLast("d")), ["a", "d"])
    deepStrictEqual(pipe(RA.make("a", "b", "c"), RA.setNonEmptyLast("d")), ["a", "b", "d"])
  })

  it("liftEither", () => {
    const f = RA.liftEither((s: string) => s.length > 2 ? E.right(s.length) : E.left("e"))
    deepStrictEqual(f("a"), [])
    deepStrictEqual(f("aaa"), [3])
  })

  it("headNonEmpty", () => {
    deepStrictEqual(RA.headNonEmpty(RA.make(1, 2)), 1)
  })

  it("tailNonEmpty", () => {
    deepStrictEqual(RA.tailNonEmpty(RA.make(1, 2)), [2])
  })

  it("lastNonEmpty", () => {
    deepStrictEqual(RA.lastNonEmpty(RA.make(1, 2, 3)), 3)
    deepStrictEqual(RA.lastNonEmpty([1]), 1)
  })

  it("initNonEmpty", () => {
    deepStrictEqual(
      RA.initNonEmpty(RA.make(1, 2, 3)),
      RA.make(1, 2)
    )
    deepStrictEqual(RA.initNonEmpty([1]), [])
  })

  it("traverse", () => {
    const traverse = RA.traverse(O.Applicative)((
      n: number
    ): O.Option<number> => (n % 2 === 0 ? O.none() : O.some(n)))
    deepStrictEqual(traverse([1, 2]), O.none())
    deepStrictEqual(traverse([1, 3]), O.some([1, 3]))
  })

  it("sequence", () => {
    const sequence = RA.sequence(O.Applicative)
    deepStrictEqual(sequence([O.some(1), O.some(3)]), O.some([1, 3]))
    deepStrictEqual(sequence([O.some(1), O.none()]), O.none())
  })

  it("traverseWithIndex", () => {
    deepStrictEqual(
      pipe(
        ["a", "bb"],
        RA.traverseWithIndex(O.Applicative)((
          s,
          i
        ) => (s.length >= 1 ? O.some(s + i) : O.none()))
      ),
      O.some(["a0", "bb1"])
    )
    deepStrictEqual(
      pipe(
        ["a", "bb"],
        RA.traverseWithIndex(O.Applicative)((
          s,
          i
        ) => (s.length > 1 ? O.some(s + i) : O.none()))
      ),
      O.none()
    )
  })

  it("get", () => {
    deepStrictEqual(pipe([1, 2, 3], RA.get(0)), O.some(1))
    deepStrictEqual(pipe([1, 2, 3], RA.get(3)), O.none())
  })

  it("unfold", () => {
    const as = RA.unfold(5, (n) => (n > 0 ? O.some([n, n - 1]) : O.none()))
    deepStrictEqual(as, [5, 4, 3, 2, 1])
  })

  it("map", () => {
    deepStrictEqual(
      pipe(
        [1, 2, 3],
        RA.map((n) => n * 2)
      ),
      [2, 4, 6]
    )
  })

  it("mapWithIndex", () => {
    deepStrictEqual(
      pipe(
        ["a", "b"],
        RA.mapWithIndex((s, i) => s + i)
      ),
      ["a0", "b1"]
    )
  })

  it("ap", () => {
    deepStrictEqual(
      pipe([(x: number) => x * 2, (x: number) => x * 3], RA.ap([1, 2, 3])),
      [
        2,
        4,
        6,
        3,
        6,
        9
      ]
    )
  })

  it("flatMap", () => {
    deepStrictEqual(
      pipe(
        [1, 2, 3],
        RA.flatMap((n) => [n, n + 1])
      ),
      [1, 2, 2, 3, 3, 4]
    )
  })

  it("flatMapWithIndex", () => {
    const f = RA.flatMapWithIndex((n: number, i) => [n + i])
    deepStrictEqual(pipe([1, 2, 3], f), [1, 3, 5])
    deepStrictEqual(pipe(RA.empty(), f), RA.empty())
    const empty: ReadonlyArray<number> = []
    deepStrictEqual(pipe(empty, f), RA.empty())
  })

  it("extend", () => {
    const sum = (as: ReadonlyArray<number>) => Number.MonoidSum.combineAll(as)
    deepStrictEqual(pipe([1, 2, 3, 4], RA.extend(sum)), [10, 9, 7, 4])
    deepStrictEqual(pipe([1, 2, 3, 4], RA.extend(identity)), [
      [1, 2, 3, 4],
      [2, 3, 4],
      [3, 4],
      [
        4
      ]
    ])
  })

  it("foldMap", () => {
    deepStrictEqual(pipe(["a", "b", "c"], RA.foldMap(String.Monoid)(identity)), "abc")
    deepStrictEqual(pipe([], RA.foldMap(String.Monoid)(identity)), "")
  })

  it("compact", () => {
    deepStrictEqual(RA.compact([]), [])
    deepStrictEqual(RA.compact([O.some(1), O.some(2), O.some(3)]), [
      1,
      2,
      3
    ])
    deepStrictEqual(RA.compact([O.some(1), O.none(), O.some(3)]), [
      1,
      3
    ])
  })

  it("separate", () => {
    deepStrictEqual(RA.separate([]), [[], []])
    deepStrictEqual(
      RA.separate([E.left(123), E.right("123")]),
      [[123], ["123"]]
    )
  })

  it("filter", () => {
    const g = (n: number) => n % 2 === 1
    deepStrictEqual(pipe([1, 2, 3], RA.filter(g)), [1, 3])
    const x = pipe(
      [O.some(3), O.some(2), O.some(1)],
      RA.filter(O.isSome)
    )
    assert.deepStrictEqual(x, [O.some(3), O.some(2), O.some(1)])
    const y = pipe(
      [O.some(3), O.none(), O.some(1)],
      RA.filter(O.isSome)
    )
    assert.deepStrictEqual(y, [O.some(3), O.some(1)])
  })

  it("filterWithIndex", () => {
    const f = (n: number) => n % 2 === 0
    deepStrictEqual(pipe(["a", "b", "c"], RA.filterWithIndex((_, i) => f(i))), [
      "a",
      "c"
    ])
  })

  it("filterMap", () => {
    const f = (n: number) => (n % 2 === 0 ? O.none() : O.some(n))
    deepStrictEqual(pipe([1, 2, 3], RA.filterMap(f)), [1, 3])
    deepStrictEqual(pipe([], RA.filterMap(f)), [])
  })

  it("foldMapWithIndex", () => {
    deepStrictEqual(
      pipe(
        ["a", "b"],
        RA.foldMapWithIndex(String.Monoid)((a, i) => i + a)
      ),
      "0a1b"
    )
  })

  it("filterMapWithIndex", () => {
    const f = (n: number, i: number) => ((i + n) % 2 === 0 ? O.none() : O.some(n))
    deepStrictEqual(pipe([1, 2, 4], RA.filterMapWithIndex(f)), [1, 2])
    deepStrictEqual(pipe([], RA.filterMapWithIndex(f)), [])
  })

  it("partitionMap", () => {
    deepStrictEqual(pipe([], RA.partitionMap(identity)), [[], []])
    deepStrictEqual(
      pipe(
        [E.right(1), E.left("foo"), E.right(2)],
        RA.partitionMap(identity)
      ),
      [["foo"], [1, 2]]
    )
  })

  it("partition", () => {
    deepStrictEqual(
      pipe([], RA.partition((n) => n > 2)),
      [[], []]
    )
    deepStrictEqual(
      pipe([1, 3], RA.partition((n) => n > 2)),
      [[1], [3]]
    )
  })

  it("partitionMapWithIndex", () => {
    deepStrictEqual(
      pipe([], RA.partitionMapWithIndex((a) => a)),
      [[], []]
    )
    deepStrictEqual(
      pipe(
        [E.right(1), E.left("foo"), E.right(2)],
        RA.partitionMapWithIndex((a, i) => pipe(a, E.filter((n) => n > i, () => "err")))
      ),
      [["foo", "err"], [1]]
    )
  })

  it("partitionWithIndex", () => {
    deepStrictEqual(
      pipe([], RA.partitionWithIndex((i, n) => i + n > 2)),
      [[], []]
    )
    deepStrictEqual(
      pipe([1, 2], RA.partitionWithIndex((i, n) => i + n > 2)),
      [[1], [2]]
    )
  })

  it("reduce", () => {
    deepStrictEqual(pipe(["a", "b", "c"], RA.reduce("", (b, a) => b + a)), "abc")
  })

  it("reduceRight", () => {
    const f = (b: string, a: string) => b + a
    deepStrictEqual(pipe(["a", "b", "c"], RA.reduceRight("", f)), "cba")
    deepStrictEqual(pipe([], RA.reduceRight("", f)), "")
  })

  it("reduceWithIndex", () => {
    deepStrictEqual(
      pipe(
        ["a", "b"],
        RA.reduceWithIndex("", (b, a, i) => b + i + a)
      ),
      "0a1b"
    )
  })

  it("reduceRightWithIndex", () => {
    deepStrictEqual(
      pipe(
        ["a", "b"],
        RA.reduceRightWithIndex("", (b, a, i) => b + i + a)
      ),
      "1b0a"
    )
  })

  it("traverseNonEmpty", () => {
    const traverseNonEmpty = RA.traverseNonEmpty(O.Applicative)
    deepStrictEqual(
      pipe(
        RA.make(1, 2, 3),
        traverseNonEmpty((n) => (n >= 0 ? O.some(n) : O.none()))
      ),
      O.some(RA.make(1, 2, 3))
    )
    deepStrictEqual(
      pipe(
        RA.make(1, 2, 3),
        traverseNonEmpty((n) => (n >= 2 ? O.some(n) : O.none()))
      ),
      O.none()
    )
  })

  it("traverseNonEmptyWithIndex", () => {
    deepStrictEqual(
      pipe(
        RA.make("a", "bb"),
        RA.traverseNonEmptyWithIndex(O.Applicative)((
          s,
          i
        ) => (s.length >= 1 ? O.some(s + i) : O.none()))
      ),
      O.some(RA.make("a0", "bb1"))
    )
    deepStrictEqual(
      pipe(
        RA.make("a", "bb"),
        RA.traverseNonEmptyWithIndex(O.Applicative)((
          s,
          i
        ) => (s.length > 1 ? O.some(s + i) : O.none()))
      ),
      O.none()
    )
  })

  it("getMonoid", () => {
    const M = RA.getMonoid<number>()
    deepStrictEqual(M.combine([1, 2], [3, 4]), [1, 2, 3, 4])
    const x = [1, 2]
    deepStrictEqual(M.combine(x, M.empty), x)
    deepStrictEqual(M.combine(M.empty, x), x)

    deepStrictEqual(M.combineAll([[1, 2], [3, 4, 5], [5, 6, 7, 1]]), [1, 2, 3, 4, 5, 5, 6, 7, 1])
  })

  it("liftOrder", () => {
    const O = RA.liftOrder(String.Order)
    deepStrictEqual(O.compare([], []), 0)
    deepStrictEqual(O.compare(["a"], ["a"]), 0)

    deepStrictEqual(O.compare(["a"], ["b"]), -1)
    deepStrictEqual(O.compare(["b"], ["a"]), 1)

    deepStrictEqual(O.compare([], ["a"]), -1)
    deepStrictEqual(O.compare(["a"], []), 1)
    deepStrictEqual(O.compare(["a"], ["a", "a"]), -1)
    deepStrictEqual(O.compare(["b"], ["a", "a"]), 1)

    deepStrictEqual(O.compare(["a", "a"], ["a", "a"]), 0)
    deepStrictEqual(O.compare(["a", "b"], ["a", "b"]), 0)

    deepStrictEqual(O.compare(["a", "b"], ["a", "a"]), 1)
    deepStrictEqual(O.compare(["a", "a"], ["a", "b"]), -1)

    deepStrictEqual(O.compare(["b", "a"], ["a", "b"]), 1)
    deepStrictEqual(O.compare(["a", "a"], ["b", "a"]), -1)
    deepStrictEqual(O.compare(["a", "b"], ["b", "a"]), -1)
    deepStrictEqual(O.compare(["b", "a"], ["b", "b"]), -1)
    deepStrictEqual(O.compare(["b", "b"], ["b", "a"]), 1)
  })

  it("isEmpty", () => {
    const as: ReadonlyArray<number> = [1, 2, 3]
    deepStrictEqual(RA.isEmpty(as), false)
    deepStrictEqual(RA.isEmpty([]), true)
  })

  it("isNotEmpty", () => {
    const as: ReadonlyArray<number> = [1, 2, 3]
    deepStrictEqual(RA.isNonEmpty(as), true)
    deepStrictEqual(RA.isNonEmpty([]), false)
  })

  it("head", () => {
    const as: ReadonlyArray<number> = [1, 2, 3]
    deepStrictEqual(RA.head(as), O.some(1))
    deepStrictEqual(RA.head([]), O.none())
  })

  it("last", () => {
    const as: ReadonlyArray<number> = [1, 2, 3]
    deepStrictEqual(RA.last(as), O.some(3))
    deepStrictEqual(RA.last([]), O.none())
  })

  it("zipNonEmptyWith", () => {
    deepStrictEqual(
      pipe([1, 2, 3], RA.zipNonEmptyWith(["a", "b", "c", "d"], (n, s) => s + n)),
      ["a1", "b2", "c3"]
    )
  })

  it("zipNonEmpty", () => {
    deepStrictEqual(pipe(RA.make(1, 2, 3), RA.zipNonEmpty(["a", "b", "c", "d"])), [
      [1, "a"],
      [2, "b"],
      [3, "c"]
    ])
  })

  it("unzipNonEmpty", () => {
    deepStrictEqual(
      RA.unzipNonEmpty([
        [1, "a"],
        [2, "b"],
        [3, "c"]
      ]),
      [
        [1, 2, 3],
        ["a", "b", "c"]
      ]
    )
  })

  it("flatMapNonEmpty", () => {
    const f = (a: number): RA.NonEmptyReadonlyArray<number> => [a, 4]
    deepStrictEqual(pipe(RA.make(1, 2), RA.flatMapNonEmpty(f)), [1, 4, 2, 4])
  })

  it("flatMapNonEmptyWithIndex", () => {
    const f = (a: number, i: number): RA.NonEmptyReadonlyArray<number> => [a + i, 4]
    deepStrictEqual(pipe(RA.make(1, 2), RA.flatMapNonEmptyWithIndex(f)), [1, 4, 3, 4])
  })

  it("chunksOfNonEmpty", () => {
    deepStrictEqual(RA.chunksOfNonEmpty(2)([1, 2, 3, 4, 5]), [
      RA.make(1, 2),
      [3, 4],
      [5]
    ])
    deepStrictEqual(RA.chunksOfNonEmpty(2)([1, 2, 3, 4, 5, 6]), [
      RA.make(1, 2),
      [3, 4],
      [5, 6]
    ])
    deepStrictEqual(RA.chunksOfNonEmpty(1)([1, 2, 3, 4, 5]), [[1], [2], [3], [4], [5]])
    deepStrictEqual(RA.chunksOfNonEmpty(5)([1, 2, 3, 4, 5]), [[1, 2, 3, 4, 5]])
    // out of bounds
    deepStrictEqual(RA.chunksOfNonEmpty(0)([1, 2, 3, 4, 5]), [[1], [2], [3], [4], [5]])
    deepStrictEqual(RA.chunksOfNonEmpty(-1)([1, 2, 3, 4, 5]), [[1], [2], [3], [4], [5]])

    const assertSingleChunk = (
      input: RA.NonEmptyReadonlyArray<number>,
      n: number
    ) => {
      const chunks = RA.chunksOfNonEmpty(n)(input)
      strictEqual(chunks.length, 1)
      deepStrictEqual(RA.headNonEmpty(chunks), input)
    }
    // n = length
    assertSingleChunk(RA.make(1, 2), 2)
    // n out of bounds
    assertSingleChunk(RA.make(1, 2), 3)
  })

  it("mapNonEmpty", () => {
    deepStrictEqual(
      pipe(
        RA.make(RA.make(1, 2), RA.make(3, 4)),
        RA.flattenNonEmpty
      ),
      [1, 2, 3, 4]
    )
  })

  it("sequenceNonEmpty", () => {
    const sequence = RA.sequenceNonEmpty(O.Applicative)
    deepStrictEqual(
      sequence([O.some(1), O.some(2), O.some(3)]),
      O.some(RA.make(1, 2, 3))
    )
    deepStrictEqual(sequence([O.none(), O.some(2), O.some(3)]), O.none())
  })

  it("mapNonEmpty", () => {
    deepStrictEqual(
      pipe(
        RA.make(1, 2),
        RA.mapNonEmpty((n) => n * 2)
      ),
      [2, 4]
    )
  })

  it("mapNonEmptyWithIndex", () => {
    const add = (s: string, i: number) => s + i
    deepStrictEqual(
      pipe(RA.make("a", "b"), RA.mapNonEmptyWithIndex(add)),
      ["a0", "b1"]
    )
  })

  it("min", () => {
    deepStrictEqual(RA.min(Number.Order)([2, 1, 3]), 1)
    deepStrictEqual(RA.min(Number.Order)([3]), 3)
  })

  it("max", () => {
    deepStrictEqual(
      RA.max(Number.Order)(RA.make(1, 2, 3)),
      3
    )
    deepStrictEqual(RA.max(Number.Order)([1]), 1)
  })

  it("flatten", () => {
    deepStrictEqual(RA.flatten([[1], [2], [3]]), [1, 2, 3])
  })

  it("intercalate", () => {
    deepStrictEqual(RA.intercalate(String.Monoid)("-")([]), "")
    deepStrictEqual(RA.intercalate(String.Monoid)("-")(["a"]), "a")
    deepStrictEqual(RA.intercalate(String.Monoid)("-")(["a", "b", "c"]), "a-b-c")
    deepStrictEqual(RA.intercalate(String.Monoid)("-")(["a", "", "c"]), "a--c")
    deepStrictEqual(RA.intercalate(String.Monoid)("-")(["a", "b"]), "a-b")
    deepStrictEqual(RA.intercalate(String.Monoid)("-")(["a", "b", "c", "d"]), "a-b-c-d")
  })

  it("group", () => {
    const group = RA.group(Number.Equivalence)
    deepStrictEqual(group([1, 2, 1, 1]), [[1], [2], [1, 1]])
    deepStrictEqual(group([1, 2, 1, 1, 3]), [[1], [2], [1, 1], [3]])
  })

  it("groupBy", () => {
    deepStrictEqual(RA.groupBy((_) => "")([]), {})
    deepStrictEqual(RA.groupBy((a) => `${a}`)([1]), { "1": [1] })
    deepStrictEqual(
      RA.groupBy((s: string) => `${s.length}`)(["foo", "bar", "foobar"]),
      {
        "3": ["foo", "bar"],
        "6": ["foobar"]
      }
    )
  })

  it("reverseNonEmpty", () => {
    deepStrictEqual(RA.reverseNonEmpty([1]), [1])
    deepStrictEqual(RA.reverseNonEmpty(RA.make(1, 2, 3)), [3, 2, 1])
  })

  it("match", () => {
    const len: <A>(as: ReadonlyArray<A>) => number = RA.match(
      () => 0,
      (_, tail) => 1 + len(tail)
    )
    deepStrictEqual(len([1, 2, 3]), 3)
  })

  it("matchRight", () => {
    const len: <A>(as: ReadonlyArray<A>) => number = RA.matchRight(
      () => 0,
      (init, _) => 1 + len(init)
    )
    deepStrictEqual(len([1, 2, 3]), 3)
  })

  it("uniqNonEmpty", () => {
    const uniqNonEmpty = RA.uniqNonEmpty(String.Equivalence)
    deepStrictEqual(uniqNonEmpty(["a", "b", "A"]), ["a", "b", "A"])
  })

  it("sortBy / sortByNonEmpty", () => {
    interface X {
      readonly a: string
      readonly b: number
      readonly c: boolean
    }

    const byName = pipe(
      String.Order,
      Order.contramap((p: { readonly a: string; readonly b: number }) => p.a)
    )

    const byAge = pipe(
      Number.Order,
      Order.contramap((p: { readonly a: string; readonly b: number }) => p.b)
    )

    const sortByNameByAge = RA.sortBy(byName, byAge)

    const xs: RA.NonEmptyArray<X> = [
      { a: "a", b: 1, c: true },
      { a: "b", b: 3, c: true },
      { a: "c", b: 2, c: true },
      { a: "b", b: 2, c: true }
    ]

    deepStrictEqual(RA.sortBy()(xs), xs)
    deepStrictEqual(sortByNameByAge([]), [])
    deepStrictEqual(sortByNameByAge(xs), [
      { a: "a", b: 1, c: true },
      { a: "b", b: 2, c: true },
      { a: "b", b: 3, c: true },
      { a: "c", b: 2, c: true }
    ])

    deepStrictEqual(RA.sortBy()(new Set(xs)), xs)
    deepStrictEqual(sortByNameByAge(new Set([])), [])
    deepStrictEqual(sortByNameByAge(new Set(xs)), [
      { a: "a", b: 1, c: true },
      { a: "b", b: 2, c: true },
      { a: "b", b: 3, c: true },
      { a: "c", b: 2, c: true }
    ])

    const sortByAgeByName = RA.sortByNonEmpty(byAge, byName)
    deepStrictEqual(sortByAgeByName(xs), [
      { a: "a", b: 1, c: true },
      { a: "b", b: 2, c: true },
      { a: "c", b: 2, c: true },
      { a: "b", b: 3, c: true }
    ])
  })

  it("copy", () => {
    expect(pipe([], RA.copy)).toEqual([])
    expect(pipe([1, 2, 3], RA.copy)).toEqual([1, 2, 3])
  })

  it("intercalateNonEmpty", () => {
    expect(pipe(["a"], RA.intercalateNonEmpty(String.Semigroup)("b"))).toEqual("a")
    expect(pipe(["a1", "a2"], RA.intercalateNonEmpty(String.Semigroup)("b"))).toEqual("a1ba2")
  })

  it("join", () => {
    expect(pipe([], RA.join(", "))).toEqual("")
    expect(pipe(["a"], RA.join(", "))).toEqual("a")
    expect(pipe(["a", "b"], RA.join(", "))).toEqual("a, b")
  })

  it("chop", () => {
    const f = RA.chop<number, number>((as) => [as[0] * 2, as.slice(1)])
    const empty: ReadonlyArray<number> = []
    deepStrictEqual(f(empty), RA.empty())
    deepStrictEqual(f(RA.empty()), RA.empty())
    deepStrictEqual(f([1, 2, 3]), [2, 4, 6])
    deepStrictEqual(RA.chopNonEmpty<number, number>((as) => [as[0] * 2, as.slice(1)])([1, 2, 3]), [
      2,
      4,
      6
    ])
  })

  describe.concurrent("chunksOf", () => {
    it("should split a `ReadonlyArray` into length-n pieces", () => {
      deepStrictEqual(RA.chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
      deepStrictEqual(RA.chunksOf(2)([1, 2, 3, 4, 5, 6]), [
        [1, 2],
        [3, 4],
        [5, 6]
      ])
      deepStrictEqual(RA.chunksOf(1)([1, 2, 3, 4, 5]), [[1], [2], [3], [4], [5]])
      deepStrictEqual(RA.chunksOf(5)([1, 2, 3, 4, 5]), [[1, 2, 3, 4, 5]])
      // out of bounds
      deepStrictEqual(RA.chunksOf(0)([1, 2, 3, 4, 5]), [[1], [2], [3], [4], [5]])
      deepStrictEqual(RA.chunksOf(-1)([1, 2, 3, 4, 5]), [[1], [2], [3], [4], [5]])

      const assertSingleChunk = (input: ReadonlyArray<number>, n: number) => {
        const chunks = RA.chunksOf(n)(input)
        deepStrictEqual(chunks.length, 1)
        deepStrictEqual(chunks[0], input)
      }
      // n = length
      assertSingleChunk([1, 2], 2)
      // n out of bounds
      assertSingleChunk([1, 2], 3)
    })

    it("returns an empty array if provided an empty array", () => {
      const empty: ReadonlyArray<number> = []
      deepStrictEqual(RA.chunksOf(0)(empty), RA.empty())
      deepStrictEqual(RA.chunksOf(0)(RA.empty()), RA.empty())
      deepStrictEqual(RA.chunksOf(1)(empty), RA.empty())
      deepStrictEqual(RA.chunksOf(1)(RA.empty()), RA.empty())
      deepStrictEqual(RA.chunksOf(2)(empty), RA.empty())
      deepStrictEqual(RA.chunksOf(2)(RA.empty()), RA.empty())
    })

    it("should respect the law: chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))", () => {
      const xs: ReadonlyArray<number> = []
      const ys: ReadonlyArray<number> = [1, 2]
      deepStrictEqual(
        RA.chunksOf(2)(xs).concat(RA.chunksOf(2)(ys)),
        RA.chunksOf(2)(xs.concat(ys))
      )
      fc.assert(
        fc.property(
          fc.array(fc.integer()).filter((xs) => xs.length % 2 === 0), // Ensures `xs.length` is even
          fc.array(fc.integer()),
          fc.integer({ min: 1, max: 1 }).map((x) => x * 2), // Generates `n` to be even so that it evenly divides `xs`
          (xs, ys, n) => {
            const as = RA.chunksOf(n)(xs).concat(RA.chunksOf(n)(ys))
            const bs = RA.chunksOf(n)(xs.concat(ys))
            deepStrictEqual(as, bs)
          }
        )
      )
    })
  })

  it("makeBy", () => {
    deepStrictEqual(RA.makeBy(double)(5), [0, 2, 4, 6, 8])
    deepStrictEqual(RA.makeBy(double)(2.2), [0, 2])
  })

  it("replicate", () => {
    deepStrictEqual(RA.replicate("a")(0), ["a"])
    deepStrictEqual(RA.replicate("a")(-1), ["a"])
    deepStrictEqual(RA.replicate("a")(3), ["a", "a", "a"])
    deepStrictEqual(RA.replicate("a")(2.2), ["a", "a"])
  })

  it("range", () => {
    deepStrictEqual(RA.range(0, 0), [0])
    deepStrictEqual(RA.range(0, 1), [0, 1])
    deepStrictEqual(RA.range(1, 5), [1, 2, 3, 4, 5])
    deepStrictEqual(RA.range(10, 15), [10, 11, 12, 13, 14, 15])
    deepStrictEqual(RA.range(-1, 0), [-1, 0])
    deepStrictEqual(RA.range(-5, -1), [-5, -4, -3, -2, -1])
    // out of bound
    deepStrictEqual(RA.range(2, 1), [2])
    deepStrictEqual(RA.range(-1, -2), [-1])
  })

  it("union", () => {
    const union = RA.union(Number.Equivalence)
    const two: ReadonlyArray<number> = [1, 2]
    deepStrictEqual(pipe(two, union([3, 4])), [1, 2, 3, 4])
    deepStrictEqual(pipe(two, union([2, 3])), [1, 2, 3])
    deepStrictEqual(pipe(two, union([1, 2])), [1, 2])
    deepStrictEqual(pipe(two, union(RA.empty())), two)
    deepStrictEqual(pipe(RA.empty(), union(two)), two)
    deepStrictEqual(
      pipe(RA.empty(), union(RA.empty())),
      RA.empty()
    )
    deepStrictEqual(RA.unionNonEmpty(Number.Equivalence)([3, 4])([1, 2]), [1, 2, 3, 4])
  })

  it("getSemigroup", () => {
    const S = RA.getSemigroup<number>()
    expect(S.combine([1, 2], [2, 3])).toEqual([1, 2, 2, 3])
  })

  it("getUnionSemigroup", () => {
    const S = RA.getUnionSemigroup(Number.Equivalence)
    expect(S.combine([1, 2], [2, 3])).toEqual([1, 2, 3])
  })

  it("intersection", () => {
    const intersection = RA.intersection(Number.Equivalence)
    deepStrictEqual(pipe([1, 2], intersection([3, 4])), [])
    deepStrictEqual(pipe([1, 2], intersection([2, 3])), [2])
    deepStrictEqual(pipe([1, 2], intersection([1, 2])), [1, 2])
  })

  it("difference", () => {
    const difference = RA.difference(Number.Equivalence)
    deepStrictEqual(pipe([1, 2], difference([3, 4])), [1, 2])
    deepStrictEqual(pipe([1, 2], difference([2, 3])), [1])
    deepStrictEqual(pipe([1, 2], difference([1, 2])), [])
  })

  it("getUnionMonoid", () => {
    const M = RA.getUnionMonoid(Number.Equivalence)
    const two: ReadonlyArray<number> = [1, 2]
    deepStrictEqual(M.combine(two, [3, 4]), [1, 2, 3, 4])
    deepStrictEqual(M.combine(two, [2, 3]), [1, 2, 3])
    deepStrictEqual(M.combine(two, [1, 2]), [1, 2])

    deepStrictEqual(M.combine(M.empty, two), two)
    deepStrictEqual(M.combine(two, M.empty), two)
    deepStrictEqual(M.combine(M.empty, M.empty), M.empty)

    deepStrictEqual(M.combineAll([[1, 2], [3, 4, 5], [5, 6, 7, 1]]), [1, 2, 3, 4, 5, 6, 7])
  })

  it("getIntersectionSemigroup", () => {
    const S = RA.getIntersectionSemigroup(Number.Equivalence)
    deepStrictEqual(S.combine([3, 4], [1, 2]), [])
    deepStrictEqual(S.combine([2, 3], [1, 2]), [2])
    deepStrictEqual(S.combine([1, 2], [1, 2]), [1, 2])
  })

  it("should be safe when calling map with a binary function", () => {
    interface Foo {
      readonly bar: () => number
    }
    const f = (a: number, x?: Foo) => (x !== undefined ? `${a}${x.bar()}` : `${a}`)
    deepStrictEqual(pipe([1, 2], RA.map(f)), ["1", "2"])
  })

  it("empty", () => {
    deepStrictEqual(RA.empty.length, 0)
  })

  it("do notation", () => {
    deepStrictEqual(
      pipe(
        RA.Do,
        RA.bind("a", () => [1, 2, 3]),
        RA.map(({ a }) => a * 2)
      ),
      [2, 4, 6]
    )

    deepStrictEqual(
      pipe(
        RA.Do,
        RA.bind("a", () => [1, 2, 3]),
        RA.bind("b", () => ["a", "b"]),
        RA.map(({ a, b }) => [a, b] as const)
      ),
      [
        [1, "a"],
        [1, "b"],
        [2, "a"],
        [2, "b"],
        [3, "a"],
        [3, "b"]
      ]
    )

    deepStrictEqual(
      pipe(
        RA.Do,
        RA.bind("a", () => [1, 2, 3]),
        RA.bind("b", () => ["a", "b"]),
        RA.map(({ a, b }) => [a, b] as const),
        RA.filter(([a, b]) => (a + b.length) % 2 === 0)
      ),
      [
        [1, "a"],
        [1, "b"],
        [3, "a"],
        [3, "b"]
      ]
    )
  })

  it("every", () => {
    const isPositive: Predicate<number> = (n) => n > 0
    deepStrictEqual(pipe([1, 2, 3], RA.every(isPositive)), true)
    deepStrictEqual(pipe([1, 2, -3], RA.every(isPositive)), false)
  })

  it("foldMapNonEmpty", () => {
    deepStrictEqual(
      pipe(
        RA.make("a", "b", "c"),
        RA.foldMapNonEmpty(String.Semigroup)(identity)
      ),
      "abc"
    )
  })

  it("foldMapNonEmptyWithIndex", () => {
    deepStrictEqual(
      pipe(
        RA.make("a", "b"),
        RA.foldMapNonEmptyWithIndex(String.Semigroup)((a, i) => i + a)
      ),
      "0a1b"
    )
  })

  it("some", () => {
    const isPositive: Predicate<number> = (n) => n > 0
    deepStrictEqual(pipe([-1, -2, 3], RA.some(isPositive)), true)
    deepStrictEqual(pipe([-1, -2, -3], RA.some(isPositive)), false)
  })

  it("length", () => {
    deepStrictEqual(RA.length(RA.empty()), 0)
    deepStrictEqual(RA.length([]), 0)
    deepStrictEqual(RA.length(["a"]), 1)
  })

  it("fromOption", () => {
    deepStrictEqual(RA.fromOption(O.some("hello")), ["hello"])
    deepStrictEqual(RA.fromOption(O.none()), [])
  })

  it("fromResult", () => {
    deepStrictEqual(RA.fromEither(E.right(1)), [1])
    deepStrictEqual(RA.fromEither(E.left("a")), RA.empty())
  })

  test("product", () => {
    const product = RA.SemiProduct.product
    expect(product([], ["a", "b"])).toEqual([])
    expect(product([1, 2], [])).toEqual([])
    expect(product([1, 2], ["a", "b"])).toEqual([
      [1, "a"],
      [1, "b"],
      [2, "a"],
      [2, "b"]
    ])
  })

  test("productAll", () => {
    const productAll = RA.Product.productAll
    expect(productAll([])).toEqual([])
    expect(productAll([[1, 2, 3]])).toEqual([[1], [2], [3]])
    expect(productAll([[1, 2, 3], [4, 5]])).toEqual([[1, 4], [1, 5], [2, 4], [2, 5], [3, 4], [
      3,
      5
    ]])
  })
})
