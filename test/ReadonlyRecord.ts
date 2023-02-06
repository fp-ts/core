import * as E from "@fp-ts/core/Either"
import { pipe } from "@fp-ts/core/Function"
import * as O from "@fp-ts/core/Option"
import * as RR from "@fp-ts/core/ReadonlyRecord"

describe.concurrent("ReadonlyRecord", () => {
  it("exports", () => {
    expect(RR.Invariant).exist
    expect(RR.tupled).exist
    expect(RR.Covariant).exist
    expect(RR.flap).exist
    expect(RR.as).exist
    expect(RR.Compactable).exist
    expect(RR.Filterable).exist
    expect(RR.Traversable).exist
    expect(RR.traverseTap).exist
    expect(RR.TraversableFilterable).exist
    expect(RR.traverseFilter).exist
    expect(RR.traversePartition).exist
  })

  it("get", () => {
    expect(pipe({}, RR.get("a"))).toEqual(O.none())
    expect(pipe({ a: 1 }, RR.get("a"))).toEqual(O.some(1))
  })

  it("modifyOption", () => {
    expect(pipe({}, RR.replaceOption("a", 2))).toEqual(O.none())
    expect(pipe({ a: 1 }, RR.replaceOption("a", 2))).toEqual(O.some({ a: 2 }))
    expect(pipe({ a: 1 }, RR.replaceOption("a", true))).toEqual(O.some({ a: true }))
  })

  it("modifyOption", () => {
    expect(pipe({}, RR.modifyOption("a", (n: number) => n + 1))).toEqual(O.none())
    expect(pipe({ a: 1 }, RR.modifyOption("a", (n: number) => n + 1))).toEqual(O.some({ a: 2 }))
    expect(pipe({ a: 1 }, RR.modifyOption("a", (n: number) => String(n)))).toEqual(
      O.some({ a: "1" })
    )
  })

  it("map", () => {
    expect(pipe({ a: 1, b: 2 }, RR.map(n => n * 2))).toEqual({ a: 2, b: 4 })
    expect(pipe({ a: 1, b: 2 }, RR.map((n, k) => `${k}-${n}`))).toEqual({
      a: "a-1",
      b: "b-2"
    })
  })

  it("fromIterable", () => {
    const input = [1, 2, 3, 4]
    expect(RR.fromIterable(input, a => [String(a), a * 2])).toEqual({
      "1": 2,
      "2": 4,
      "3": 6,
      "4": 8
    })
  })

  it("collect", () => {
    const x = { a: 1, b: 2, c: 3 }
    assert.deepStrictEqual(RR.collect(x, (key, n) => [key, n]), [["a", 1], ["b", 2], ["c", 3]])
  })

  it("toArray", () => {
    const x = { a: 1, b: 2 }
    assert.deepStrictEqual(RR.toArray(x), [["a", 1], ["b", 2]])
  })

  it("remove", () => {
    assert.deepStrictEqual(RR.remove({ a: 1, b: 2 }, "a"), { b: 2 })
    assert.deepStrictEqual(RR.remove({ a: 1, b: 2 }, "c"), { a: 1, b: 2 })
  })

  describe("pop", () => {
    it("should return the value associated with the given key, if the key is present in the record", () => {
      const record = { a: 1, b: 2 }
      const result = RR.pop("a")(record)

      assert.deepStrictEqual(result, O.some([1, { b: 2 }]))
    })

    it("should return none if the key is not present in the record", () => {
      const record = { a: 1, b: 2 }
      const result = RR.pop("c")(record)

      assert.deepStrictEqual(result, O.none())
    })
  })

  describe("filterMap", () => {
    it("should filter the properties of an object", () => {
      const obj = { a: 1, b: 2, c: 3 }
      const filtered = RR.filterMap(obj, (value, key) => (value > 2 ? O.some(key) : O.none()))
      expect(filtered).toEqual({ c: "c" })
    })
  })

  it("compact", () => {
    const x = { a: O.some(1), b: O.none(), c: O.some(2) }
    assert.deepStrictEqual(RR.compact(x), { a: 1, c: 2 })
  })

  it("filter", () => {
    const x = { a: 1, b: 2, c: 3, d: 4 }
    assert.deepStrictEqual(RR.filter(x, (value) => value > 2), { c: 3, d: 4 })
  })

  it("partitionMap", () => {
    const f = (n: number) => (n > 2 ? E.right(n + 1) : E.left(n - 1))
    assert.deepStrictEqual(RR.partitionMap({}, f), [{}, {}])
    assert.deepStrictEqual(RR.partitionMap({ a: 1, b: 3 }, f), [{ a: 0 }, { b: 4 }])
  })

  it("partition", () => {
    const f = (n: number) => n > 2
    assert.deepStrictEqual(RR.partition({}, f), [{}, {}])
    assert.deepStrictEqual(RR.partition({ a: 1, b: 3 }, f), [{ a: 1 }, { b: 3 }])
  })

  it("separate", () => {
    assert.deepStrictEqual(
      RR.separate({ a: E.left("e"), b: E.right(1) }),
      [{ a: "e" }, { b: 1 }]
    )
    // should ignore non own properties
    const o: RR.ReadonlyRecord<E.Either<string, number>> = Object.create({ a: 1 })
    assert.deepStrictEqual(pipe(o, RR.separate), [{}, {}])
  })

  it("traverse", () => {
    assert.deepStrictEqual(
      RR.traverse(O.Applicative)({ a: 1, b: 2 }, (n: number) => (n <= 2 ? O.some(n) : O.none())),
      O.some({ a: 1, b: 2 })
    )
    assert.deepStrictEqual(
      RR.traverse(O.Applicative)((n: number) => (n <= 2 ? O.some(n) : O.none()))({ a: 1, b: 2 }),
      O.some({ a: 1, b: 2 })
    )
    assert.deepStrictEqual(
      RR.traverse(O.Applicative)({ a: 1, b: 2 }, (n: number) => (n >= 2 ? O.some(n) : O.none())),
      O.none()
    )
    assert.deepStrictEqual(
      RR.traverse(O.Applicative)((n: number) => (n >= 2 ? O.some(n) : O.none()))({ a: 1, b: 2 }),
      O.none()
    )
  })

  it("sequence", () => {
    const sequence = RR.sequence(O.Applicative)
    assert.deepStrictEqual(sequence({ a: O.some(1), b: O.some(2) }), O.some({ a: 1, b: 2 }))
    assert.deepStrictEqual(sequence({ a: O.none(), b: O.some(2) }), O.none())
  })

  it("empty", () => {
    expect(RR.empty()).toEqual({})
  })

  it("isEmpty", () => {
    assert.deepStrictEqual(RR.isEmpty({}), true)
    assert.deepStrictEqual(RR.isEmpty({ a: 3 }), false)
  })

  it("size", () => {
    assert.deepStrictEqual(RR.size({ a: "a", b: 1, c: true }), 3)
  })

  it("has", () => {
    assert.deepStrictEqual(RR.has({ a: 1, b: 2 }, "a"), true)
    assert.deepStrictEqual(RR.has({ a: 1, b: 2 }, "c"), false)
  })

  it("traversePartitionMap", () => {
    const traversePartitionMap = RR.traversePartitionMap(O.Applicative)
    const f = (s: string) =>
      s.length > 1 ? O.some(E.right(s)) : s.length > 0 ? O.some(E.left(s)) : O.none()
    assert.deepStrictEqual(traversePartitionMap({}, f), O.some([{}, {}]))
    assert.deepStrictEqual(traversePartitionMap({ "": "" }, f), O.none())
    assert.deepStrictEqual(traversePartitionMap({ a: "a" }, f), O.some([{ a: "a" }, {}]))
    assert.deepStrictEqual(traversePartitionMap({ aa: "aa" }, f), O.some([{}, { aa: "aa" }]))
    assert.deepStrictEqual(traversePartitionMap({ aa: "aa", a: "a", "": "" }, f), O.none())
    assert.deepStrictEqual(
      traversePartitionMap({ aa: "aa", a: "a", aaa: "aaa" }, f),
      O.some([{ a: "a" }, { aa: "aa", aaa: "aaa" }])
    )
  })

  it("traverseFilterMap", () => {
    const traverseFilterMap = RR.traverseFilterMap(O.Applicative)
    const f = (s: string) =>
      s.length > 1 ? O.some(O.some(s)) : s.length > 0 ? O.some(O.none()) : O.none()
    assert.deepStrictEqual(traverseFilterMap({}, f), O.some({}))
    assert.deepStrictEqual(traverseFilterMap({ "": "" }, f), O.none())
    assert.deepStrictEqual(traverseFilterMap({ a: "a" }, f), O.some({}))
    assert.deepStrictEqual(traverseFilterMap({ aa: "aa" }, f), O.some({ aa: "aa" }))
    assert.deepStrictEqual(traverseFilterMap({ aa: "aa", a: "a", "": "" }, f), O.none())
    assert.deepStrictEqual(
      traverseFilterMap({ aa: "aa", a: "a", aaa: "aaa" }, f),
      O.some({ aa: "aa", aaa: "aaa" })
    )
  })
})
