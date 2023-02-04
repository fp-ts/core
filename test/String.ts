import { pipe } from "@fp-ts/core/Function"
import * as S from "@fp-ts/core/String"
import { deepStrictEqual } from "@fp-ts/core/test/util"
import * as Order from "@fp-ts/core/typeclass/Order"

describe.concurrent("String", () => {
  it("isString", () => {
    expect(S.isString("a")).toEqual(true)
    expect(S.isString(1)).toEqual(false)
    expect(S.isString(true)).toEqual(false)
  })

  it("empty", () => {
    expect(S.empty).toEqual("")
  })

  it("Semigroup", () => {
    expect(S.Semigroup.combine("a", "b")).toEqual("ab")
    expect(S.Semigroup.combineMany("a", ["b", "c"])).toEqual("abc")
    expect(S.Semigroup.combineMany("a", [])).toEqual("a")
  })

  it("Monoid", () => {
    expect(S.Monoid.combineAll([])).toEqual("")
  })

  it("Equivalence", () => {
    expect(S.Equivalence("a", "a")).toBe(true)
    expect(S.Equivalence("a", "b")).toBe(false)
  })

  it("Order", () => {
    const lessThan = Order.lessThan(S.Order)
    const lessThanOrEqualTo = Order.lessThanOrEqualTo(S.Order)
    expect(pipe("a", lessThan("b"))).toEqual(true)
    expect(pipe("a", lessThan("a"))).toEqual(false)
    expect(pipe("a", lessThanOrEqualTo("a"))).toEqual(true)
    expect(pipe("b", lessThan("a"))).toEqual(false)
    expect(pipe("b", lessThanOrEqualTo("a"))).toEqual(false)
  })

  it("concat", () => {
    deepStrictEqual(pipe("a", S.concat("b")), "ab")
  })

  it("isEmpty", () => {
    deepStrictEqual(S.isEmpty(""), true)
    deepStrictEqual(S.isEmpty("a"), false)
  })

  it("isNonEmpty", () => {
    deepStrictEqual(S.isNonEmpty(""), false)
    deepStrictEqual(S.isNonEmpty("a"), true)
  })

  it("length", () => {
    deepStrictEqual(S.length(""), 0)
    deepStrictEqual(S.length("a"), 1)
    deepStrictEqual(S.length("aaa"), 3)
  })

  it("toUpperCase", () => {
    deepStrictEqual(S.toUpperCase("a"), "A")
  })

  it("toLowerCase", () => {
    deepStrictEqual(S.toLowerCase("A"), "a")
  })

  it("replace", () => {
    deepStrictEqual(pipe("abc", S.replace("b", "d")), "adc")
  })

  it("split", () => {
    deepStrictEqual(pipe("abc", S.split("")), ["a", "b", "c"])
    deepStrictEqual(pipe("", S.split("")), [""])
  })

  it("trim", () => {
    deepStrictEqual(pipe(" a ", S.trim), "a")
  })

  it("trimStart", () => {
    deepStrictEqual(pipe(" a ", S.trimStart), "a ")
  })

  it("trimEnd", () => {
    deepStrictEqual(pipe(" a ", S.trimEnd), " a")
  })

  it("includes", () => {
    assert.deepStrictEqual(S.includes("abc", "b"), true)
    assert.deepStrictEqual(S.includes("abc", "d"), false)
  })

  it("includesWithPosition", () => {
    assert.deepStrictEqual(S.includesWithPosition("abc", "b", 1), true)
    assert.deepStrictEqual(S.includesWithPosition("abc", "a", 1), false)
  })

  it("startsWith", () => {
    assert.deepStrictEqual(S.startsWith("abc", "a"), true)
    assert.deepStrictEqual(S.startsWith("bc", "a"), false)
  })

  it("startsWithPosition", () => {
    assert.deepStrictEqual(S.startsWithPosition("abc", "b", 1), true)
    assert.deepStrictEqual(S.startsWithPosition("bc", "a", 1), false)
  })

  it("endsWith", () => {
    assert.deepStrictEqual(S.endsWith("abc", "c"), true)
    assert.deepStrictEqual(S.endsWith("ab", "c"), false)
  })

  it("endsWithPosition", () => {
    assert.deepStrictEqual(S.endsWithPosition("abc", "b", 2), true)
    assert.deepStrictEqual(S.endsWithPosition("abc", "c", 2), false)
  })

  it("slice", () => {
    deepStrictEqual(pipe("abcd", S.slice(1, 3)), "bc")
  })

  describe.concurrent("takeLeft", () => {
    it("should take the specified number of characters from the left side of a string", () => {
      const string = "Hello, World!"

      const result = pipe(string, S.takeLeft(7))

      assert.strictEqual(result, "Hello, ")
    })

    it("should return the string for `n` larger than the string length", () => {
      const string = "Hello, World!"

      const result = pipe(string, S.takeLeft(100))

      assert.strictEqual(result, string)
    })

    it("should return the empty string for a negative `n`", () => {
      const string = "Hello, World!"

      const result = pipe(string, S.takeLeft(-1))

      assert.strictEqual(result, "")
    })

    it("should round down if `n` is a float", () => {
      const string = "Hello, World!"

      const result = pipe(string, S.takeLeft(5.5))

      assert.strictEqual(result, "Hello")
    })
  })

  describe.concurrent("takeRight", () => {
    it("should take the specified number of characters from the right side of a string", () => {
      const string = "Hello, World!"

      const result = pipe(string, S.takeRight(7))

      assert.strictEqual(result, " World!")
    })

    it("should return the string for `n` larger than the string length", () => {
      const string = "Hello, World!"

      const result = pipe(string, S.takeRight(100))

      assert.strictEqual(result, string)
    })

    it("should return the empty string for a negative `n`", () => {
      const string = "Hello, World!"

      const result = pipe(string, S.takeRight(-1))

      assert.strictEqual(result, "")
    })

    it("should round down if `n` is a float", () => {
      const string = "Hello, World!"

      const result = pipe(string, S.takeRight(6.5))

      assert.strictEqual(result, "World!")
    })
  })

  // TODO: 100% coverage tests (ask Max)
  // describe.concurrent("stripMargin", () => {
  //   it("should strip a leading prefix from each line", () => {
  //     const string = `|
  //   |Hello,
  //   |World!
  //   |`

  //     const result = pipe(string, String.stripMargin)

  //     assert.strictEqual(result, "\nHello,\nWorld!\n")
  //   })

  //   it("should strip a leading prefix from each line using a margin character", () => {
  //     const string = `$
  //   $Hello,
  //   $World!
  //   $`

  //     const result = pipe(string, String.stripMarginWith("$"))

  //     assert.strictEqual(result, "\nHello,\nWorld!\n")
  //   })
  // })
})
