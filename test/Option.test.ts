import { pipe } from "@fp-ts/core/Function"
import * as O from "./Option"
import * as U from "./util"

const p = (n: number): boolean => n > 2

describe("Option", () => {
  describe("firstSuccessOf", () => {
    it("baseline", () => {
      U.deepStrictEqual(O.firstSuccessOf(O.none), O.none)
      U.deepStrictEqual(O.firstSuccessOf(O.none, O.some(1)), O.some(1))
    })

    // it("should accept an Iterable", () => {
    //   U.deepStrictEqual(O.firstSuccessOf(new Set([O.none, O.some(1)])), O.some(1))
    // })
  })

  it("reduce", () => {
    U.deepStrictEqual(
      pipe(
        O.none,
        O.reduce(2, (b, a) => b + a)
      ),
      2
    )
    U.deepStrictEqual(
      pipe(
        O.some(3),
        O.reduce(2, (b, a) => b + a)
      ),
      5
    )
  })

  // it("foldMap", () => {
  //   U.deepStrictEqual(pipe(O.some("a"), O.foldMap(S.Monoid)(identity)), "a")
  //   U.deepStrictEqual(pipe(O.none, O.foldMap(S.Monoid)(identity)), "")
  // })

  it("reduceRight", () => {
    const f = (a: string, acc: string) => acc + a
    U.deepStrictEqual(pipe(O.some("a"), O.reduceRight("", f)), "a")
    U.deepStrictEqual(pipe(O.none, O.reduceRight("", f)), "")
  })

  it("fromIterable", () => {
    U.deepStrictEqual(O.fromIterable([]), O.none)
    U.deepStrictEqual(O.fromIterable(["a"]), O.some("a"))
  })

  it("idKleisli", () => {
    U.deepStrictEqual(O.idKleisli<number>()(1), O.some(1))
  })

  // it("composeKleisli", () => {
  //   const g = (n: number): O.Option<number> => (n !== 0 ? O.some(n / 2) : O.none)
  //   const h = pipe(RA.head<number>, O.composeKleisli(g))
  //   U.deepStrictEqual(h([2]), O.some(1))
  //   U.deepStrictEqual(h([]), O.none)
  //   U.deepStrictEqual(h([0]), O.none)
  // })

  it("lift2", () => {
    const f = (a: number, b: number) => a + b
    const g = O.lift2(f)
    U.deepStrictEqual(g(O.none, O.none), O.none)
    U.deepStrictEqual(g(O.some(1), O.none), O.none)
    U.deepStrictEqual(g(O.none, O.some(2)), O.none)
    U.deepStrictEqual(g(O.some(1), O.some(2)), O.some(3))
  })

  it("lift3", () => {
    const f = (a: number, b: number, c: number) => a + b + c
    const g = O.lift3(f)
    U.deepStrictEqual(g(O.none, O.none, O.none), O.none)
    U.deepStrictEqual(g(O.some(1), O.none, O.none), O.none)
    U.deepStrictEqual(g(O.none, O.some(2), O.none), O.none)
    U.deepStrictEqual(g(O.none, O.none, O.some(3)), O.none)
    U.deepStrictEqual(g(O.some(1), O.some(2), O.none), O.none)
    U.deepStrictEqual(g(O.some(1), O.none, O.some(3)), O.none)
    U.deepStrictEqual(g(O.none, O.some(2), O.some(3)), O.none)
    U.deepStrictEqual(g(O.some(1), O.some(2), O.some(3)), O.some(6))
  })

  describe("pipeables", () => {
    it("map", () => {
      U.deepStrictEqual(pipe(O.some(2), O.map(U.double)), O.some(4))
      U.deepStrictEqual(pipe(O.none, O.map(U.double)), O.none)
    })

    it("ap", () => {
      U.deepStrictEqual(pipe(O.some(U.double), O.ap(O.some(2))), O.some(4))
      U.deepStrictEqual(pipe(O.some(U.double), O.ap(O.none)), O.none)
      U.deepStrictEqual(pipe(O.none, O.ap(O.some(2))), O.none)
      U.deepStrictEqual(pipe(O.none, O.ap(O.none)), O.none)
    })

    it("flatMap", () => {
      const f = (n: number) => O.some(n * 2)
      const g = () => O.none
      U.deepStrictEqual(pipe(O.some(1), O.flatMap(f)), O.some(2))
      U.deepStrictEqual(pipe(O.none, O.flatMap(f)), O.none)
      U.deepStrictEqual(pipe(O.some(1), O.flatMap(g)), O.none)
      U.deepStrictEqual(pipe(O.none, O.flatMap(g)), O.none)
    })

    it("tap", () => {
      const f = (n: number) => O.some(n * 2)
      U.deepStrictEqual(pipe(O.some(1), O.tap(f)), O.some(1))
    })

    it("duplicate", () => {
      U.deepStrictEqual(pipe(O.some(1), O.duplicate), O.some(O.some(1)))
    })

    it("flatten", () => {
      U.deepStrictEqual(pipe(O.some(O.some(1)), O.flatten), O.some(1))
    })

    it("orElse", () => {
      const assertAlt = (a: O.Option<number>, b: O.Option<number>, expected: O.Option<number>) => {
        U.deepStrictEqual(pipe(a, O.orElse(b)), expected)
      }
      assertAlt(O.some(1), O.some(2), O.some(1))
      assertAlt(O.some(1), O.none, O.some(1))
      assertAlt(O.none, O.some(2), O.some(2))
      assertAlt(O.none, O.none, O.none)
    })

    it("extend", () => {
      const f = O.getOrElse(() => 0)
      U.deepStrictEqual(pipe(O.some(2), O.extend(f)), O.some(2))
      U.deepStrictEqual(pipe(O.none, O.extend(f)), O.none)
    })

    it("compact", () => {
      U.deepStrictEqual(O.compact(O.none), O.none)
      U.deepStrictEqual(O.compact(O.some(O.none)), O.none)
      U.deepStrictEqual(O.compact(O.some(O.some("123"))), O.some("123"))
    })

    it("filterMap", () => {
      const f = (n: number) => (p(n) ? O.some(n + 1) : O.none)
      U.deepStrictEqual(pipe(O.none, O.filterMap(f)), O.none)
      U.deepStrictEqual(pipe(O.some(1), O.filterMap(f)), O.none)
      U.deepStrictEqual(pipe(O.some(3), O.filterMap(f)), O.some(4))
    })

    // it("traverse", () => {
    //   U.deepStrictEqual(
    //     pipe(
    //       O.some("hello"),
    //       O.traverse(RA.Applicative)(() => [])
    //     ),
    //     []
    //   )
    //   U.deepStrictEqual(
    //     pipe(
    //       O.some("hello"),
    //       O.traverse(RA.Applicative)((s) => [s.length])
    //     ),
    //     [O.some(5)]
    //   )
    //   U.deepStrictEqual(
    //     pipe(
    //       O.none,
    //       O.traverse(RA.Applicative)((s) => [s])
    //     ),
    //     [O.none]
    //   )
    // })

    // it("sequence", () => {
    //   const sequence = O.sequence(RA.Applicative)
    //   U.deepStrictEqual(sequence(O.some([1, 2])), [O.some(1), O.some(2)])
    //   U.deepStrictEqual(sequence(O.none), [O.none])
    // })
  })

  it("match", () => {
    const f = () => "none"
    const g = (s: string) => `some${s.length}`
    const match = O.match(f, g)
    U.deepStrictEqual(match(O.none), "none")
    U.deepStrictEqual(match(O.some("abc")), "some3")
  })

  it("toNullable", () => {
    U.deepStrictEqual(O.toNull(O.none), null)
    U.deepStrictEqual(O.toNull(O.some(1)), 1)
  })

  it("toUndefined", () => {
    U.deepStrictEqual(O.toUndefined(O.none), undefined)
    U.deepStrictEqual(O.toUndefined(O.some(1)), 1)
  })

  it("getOrElse", () => {
    U.deepStrictEqual(pipe(O.some(1), O.getOrElse(0)), 1)
    U.deepStrictEqual(pipe(O.none, O.getOrElse(0)), 0)
  })

  // it("liftEq", () => {
  //   const { equals } = O.liftEq(N.Eq)
  //   U.deepStrictEqual(equals(O.none)(O.none), true)
  //   U.deepStrictEqual(equals(O.none)(O.some(1)), false)
  //   U.deepStrictEqual(equals(O.some(1))(O.none), false)
  //   U.deepStrictEqual(equals(O.some(2))(O.some(1)), false)
  //   U.deepStrictEqual(equals(O.some(1))(O.some(2)), false)
  //   U.deepStrictEqual(equals(O.some(2))(O.some(2)), true)
  // })

  // it("getOrd", () => {
  //   const OS = O.liftOrd(S.Ord)
  //   U.deepStrictEqual(pipe(O.none, OS.compare(O.none)), 0)
  //   U.deepStrictEqual(pipe(O.some("a"), OS.compare(O.none)), 1)
  //   U.deepStrictEqual(pipe(O.none, OS.compare(O.some("a"))), -1)
  //   U.deepStrictEqual(pipe(O.some("a"), OS.compare(O.some("a"))), 0)
  //   U.deepStrictEqual(pipe(O.some("a"), OS.compare(O.some("b"))), -1)
  //   U.deepStrictEqual(pipe(O.some("b"), OS.compare(O.some("a"))), 1)
  // })

  it("flatMapNullable", () => {
    interface X {
      readonly a?: {
        readonly b?: {
          readonly c?: {
            readonly d: number
          }
        }
      }
    }
    const x1: X = { a: {} }
    const x2: X = { a: { b: {} } }
    const x3: X = { a: { b: { c: { d: 1 } } } }
    U.deepStrictEqual(
      pipe(
        O.fromNullable(x1.a),
        O.flatMapNullable((x) => x.b),
        O.flatMapNullable((x) => x.c),
        O.flatMapNullable((x) => x.d)
      ),
      O.none
    )
    U.deepStrictEqual(
      pipe(
        O.fromNullable(x2.a),
        O.flatMapNullable((x) => x.b),
        O.flatMapNullable((x) => x.c),
        O.flatMapNullable((x) => x.d)
      ),
      O.none
    )
    U.deepStrictEqual(
      pipe(
        O.fromNullable(x3.a),
        O.flatMapNullable((x) => x.b),
        O.flatMapNullable((x) => x.c),
        O.flatMapNullable((x) => x.d)
      ),
      O.some(1)
    )
  })

  // it("getMonoid", () => {
  //   const M = O.getMonoid(S.Semigroup)
  //   U.deepStrictEqual(pipe(O.none, M.combine(O.none)), O.none)
  //   U.deepStrictEqual(pipe(O.none, M.combine(O.some("a"))), O.some("a"))
  //   U.deepStrictEqual(pipe(O.some("a"), M.combine(O.none)), O.some("a"))
  //   U.deepStrictEqual(pipe(O.some("b"), M.combine(O.some("a"))), O.some("ba"))
  //   U.deepStrictEqual(pipe(O.some("a"), M.combine(O.some("b"))), O.some("ab"))
  // })

  it("fromNullable", () => {
    U.deepStrictEqual(O.fromNullable(2), O.some(2))
    U.deepStrictEqual(O.fromNullable(null), O.none)
    U.deepStrictEqual(O.fromNullable(undefined), O.none)
  })

  // it("elem", () => {
  //   U.deepStrictEqual(pipe(O.none, O.elem(N.Eq)(2)), false)
  //   U.deepStrictEqual(pipe(O.some(2), O.elem(N.Eq)(2)), true)
  //   U.deepStrictEqual(pipe(O.some(2), O.elem(N.Eq)(1)), false)
  // })

  it("isNone", () => {
    U.deepStrictEqual(O.isNone(O.none), true)
    U.deepStrictEqual(O.isNone(O.some(1)), false)
  })

  it("isSome", () => {
    U.deepStrictEqual(O.isSome(O.none), false)
    U.deepStrictEqual(O.isSome(O.some(1)), true)
  })

  it("exists", () => {
    const predicate = (a: number) => a === 2
    U.deepStrictEqual(pipe(O.none, O.exists(predicate)), false)
    U.deepStrictEqual(pipe(O.some(1), O.exists(predicate)), false)
    U.deepStrictEqual(pipe(O.some(2), O.exists(predicate)), true)
  })

  it("tryCatch", () => {
    U.deepStrictEqual(
      O.fromThrowable(() => JSON.parse("2")),
      O.some(2)
    )
    U.deepStrictEqual(
      O.fromThrowable(() => JSON.parse("(")),
      O.none
    )
  })

  // it("liftShow", () => {
  //   const Sh = O.liftShow(S.Show)
  //   U.deepStrictEqual(Sh.show(O.some("a")), `some("a")`)
  //   U.deepStrictEqual(Sh.show(O.none), `none`)
  // })

  it("do notation", () => {
    U.deepStrictEqual(
      pipe(
        O.some(1),
        O.bindTo("a"),
        O.bind("b", () => O.some("b"))
      ),
      O.some({ a: 1, b: "b" })
    )
  })

  it("apS", () => {
    U.deepStrictEqual(
      pipe(O.some(1), O.bindTo("a"), O.bindRight("b", O.some("b"))),
      O.some({ a: 1, b: "b" })
    )
  })

  it("zipFlatten", () => {
    U.deepStrictEqual(
      pipe(O.some(1), O.tupled, O.zipFlatten(O.some("b"))),
      O.some([1, "b"] as const)
    )
  })

  it("liftNullable", () => {
    const f = O.liftNullable((n: number) => (n > 0 ? n : null))
    U.deepStrictEqual(f(1), O.some(1))
    U.deepStrictEqual(f(-1), O.none)
  })

  it("liftThrowable", () => {
    const f = O.liftThrowable((s: string) => {
      const len = s.length
      if (len > 0) {
        return len
      }
      throw new Error("empty string")
    })
    U.deepStrictEqual(f("a"), O.some(1))
    U.deepStrictEqual(f(""), O.none)
  })
})
