import { pipe } from "@fp-ts/core/Function"
import * as _ from "@fp-ts/core/Identity"
import * as O from "@fp-ts/core/Option"
import * as String from "@fp-ts/core/String"
import * as U from "./util"

describe.concurrent("Identity", () => {
  it("instances and derived exports", () => {
    expect(_.Invariant).exist
    expect(_.bindTo).exist

    expect(_.Covariant).exist
    expect(_.let).exist

    expect(_.Of).exist
    expect(_.Do).exist

    expect(_.Pointed).exist

    expect(_.FlatMap).exist

    expect(_.Chainable).exist
    expect(_.bind).exist

    expect(_.Monad).exist

    expect(_.SemiProduct).exist

    expect(_.Product).exist

    expect(_.SemiApplicative).exist

    expect(_.Applicative).exist

    expect(_.Foldable).exist

    expect(_.Traversable).exist
  })

  it("of", () => {
    U.deepStrictEqual(_.Of.of("a"), "a")
  })

  it("SemiProduct", () => {
    U.deepStrictEqual(_.SemiProduct.productMany("a", ["b", "c"]), ["a", "b", "c"])
  })

  it("Product", () => {
    U.deepStrictEqual(_.Product.productAll([]), [])
    U.deepStrictEqual(_.Product.productAll(["a", "b", "c"]), ["a", "b", "c"])
  })

  it("flatMap", () => {
    U.deepStrictEqual(
      pipe("a", _.Chainable.flatMap((a) => a + "b")),
      "ab"
    )
  })

  it("product", () => {
    const product = _.SemiProduct.product
    U.deepStrictEqual(product("a", "b"), ["a", "b"])
  })

  it("getSemiCoproduct", () => {
    const F = _.getSemiCoproduct(String.Semigroup)
    U.deepStrictEqual(F.coproduct("a", "b"), "ab")
    U.deepStrictEqual(F.coproductMany("a", ["b", "c"]), "abc")
  })

  it("getSemiAlternative", () => {
    const F = _.getSemiAlternative(String.Semigroup)
    U.deepStrictEqual(F.coproduct("a", "b"), "ab")
    U.deepStrictEqual(F.coproductMany("a", ["b", "c"]), "abc")
  })

  it("reduce", () => {
    U.deepStrictEqual(pipe("b", _.Foldable.reduce("a", (b, a) => b + a)), "ab")
  })

  it("traverse", () => {
    U.deepStrictEqual(pipe(1, _.Traversable.traverse(O.Applicative)(O.some)), O.some(1))
    U.deepStrictEqual(pipe(1, _.Traversable.traverse(O.Applicative)(() => O.none())), O.none())
  })
})
