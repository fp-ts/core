/**
 * This module provides utility functions for working with records in TypeScript.
 *
 * @since 1.0.0
 */

import { dual } from "@fp-ts/core/Function"
import type { Option } from "@fp-ts/core/Option"
import * as O from "@fp-ts/core/Option"

/**
 * @category models
 * @since 1.0.0
 */
export interface ReadonlyRecord<A> {
  readonly [x: string]: A
}

/**
 * Takes an iterable and a projection function and returns a record.
 * The projection function maps each value of the iterable to a tuple of a key and a value, which is then added to the resulting record.
 *
 * @param self - An iterable of values to be mapped to a record.
 * @param f - A projection function that maps values of the iterable to a tuple of a key and a value.
 *
 * @example
 * import { fromIterable } from '@fp-ts/core/ReadonlyRecord'
 *
 * const input = [1, 2, 3, 4]
 *
 * assert.deepStrictEqual(
 *   fromIterable(input, a => [String(a), a * 2]),
 *   { '1': 2, '2': 4, '3': 6, '4': 8 }
 * )
 *
 * @dual
 * @category constructors
 * @since 1.0.0
 */
export const fromIterable: {
  <A, B>(f: (a: A) => readonly [string, B]): (self: Iterable<A>) => Record<string, B>
  <A, B>(self: Iterable<A>, f: (a: A) => readonly [string, B]): Record<string, B>
} = dual<
  <A, B>(f: (a: A) => readonly [string, B]) => (self: Iterable<A>) => Record<string, B>,
  <A, B>(self: Iterable<A>, f: (a: A) => readonly [string, B]) => Record<string, B>
>(2, <A, B>(
  self: Iterable<A>,
  f: (a: A) => readonly [string, B]
): Record<string, B> => {
  const out: Record<string, B> = {}
  for (const a of self) {
    const [k, b] = f(a)
    out[k] = b
  }
  return out
})

/**
 * Retrieve a value at a particular key from a `ReadonlyRecord`, returning it wrapped in an `Option`.
 *
 * @param self - The `ReadonlyRecord` to retrieve value from.
 * @param key - Key to retrieve from `ReadonlyRecord`.
 *
 * @example
 * import { get } from "@fp-ts/core/ReadonlyRecord"
 * import { some, none } from "@fp-ts/core/Option"
 *
 * const person = { name: "John Doe", age: 35 }
 *
 * assert.deepStrictEqual(get(person, "name"), some("John Doe"))
 * assert.deepStrictEqual(get(person, "email"), none())
 *
 * @dual
 * @category getters
 * @since 1.0.0
 */
export const get: {
  (key: string): <A>(self: ReadonlyRecord<A>) => Option<A>
  <A>(self: ReadonlyRecord<A>, key: string): Option<A>
} = dual<
  (key: string) => <A>(self: ReadonlyRecord<A>) => Option<A>,
  <A>(self: ReadonlyRecord<A>, key: string) => Option<A>
>(
  2,
  <A>(self: ReadonlyRecord<A>, key: string): Option<A> =>
    Object.prototype.hasOwnProperty.call(self, key) ? O.some(self[key]) : O.none()
)

/**
 * Apply a function to the element at the specified key, creating a new record,
 * or return `None` if the key doesn't exist.
 *
 * @param self - The `ReadonlyRecord` to be updated.
 * @param key - The key of the element to modify.
 * @param f - The function to apply to the element.
 *
 * @example
 * import { modifyOption } from "@fp-ts/core/ReadonlyRecord"
 * import { some, none } from "@fp-ts/core/Option"
 *
 * const f = (x: number) => x * 2
 *
 * assert.deepStrictEqual(
 *  modifyOption({ a: 3 }, 'a', f),
 *  some({ a: 6 })
 * )
 * assert.deepStrictEqual(
 *  modifyOption({ a: 3 }, 'b', f),
 *  none()
 * )
 *
 * @dual
 * @since 1.0.0
 */
export const modifyOption: {
  <A, B>(key: string, f: (a: A) => B): (self: ReadonlyRecord<A>) => Option<Record<string, A | B>>
  <A, B>(self: ReadonlyRecord<A>, key: string, f: (a: A) => B): Option<Record<string, A | B>>
} = dual<
  <A, B>(key: string, f: (a: A) => B) => (self: ReadonlyRecord<A>) => Option<Record<string, A | B>>,
  <A, B>(self: ReadonlyRecord<A>, key: string, f: (a: A) => B) => Option<Record<string, A | B>>
>(
  3,
  <A, B>(self: ReadonlyRecord<A>, key: string, f: (a: A) => B): Option<Record<string, A | B>> => {
    if (!Object.prototype.hasOwnProperty.call(self, key)) {
      return O.none()
    }
    const out: Record<string, A | B> = { ...self }
    out[key] = f(self[key])
    return O.some(out)
  }
)

/**
 * Replaces a value in the record with the new value passed as parameter.
 *
 * @param self - The `ReadonlyRecord` to be updated.
 * @param key - The key to search for in the record.
 * @param b - The new value to replace the existing value with.
 *
 * @example
 * import { replaceOption } from "@fp-ts/core/ReadonlyRecord"
 * import { some, none } from "@fp-ts/core/Option"
 *
 * assert.deepStrictEqual(
 *   replaceOption({ a: 1, b: 2, c: 3 }, 'a', 10),
 *   some({ a: 10, b: 2, c: 3 })
 * )
 * assert.deepStrictEqual(replaceOption({}, 'a', 10), none())
 *
 * @dual
 * @since 1.0.0
 */
export const replaceOption: {
  <B>(key: string, b: B): <A>(self: ReadonlyRecord<A>) => Option<Record<string, B | A>>
  <A, B>(self: ReadonlyRecord<A>, key: string, b: B): Option<Record<string, A | B>>
} = dual<
  <B>(key: string, b: B) => <A>(self: ReadonlyRecord<A>) => Option<Record<string, A | B>>,
  <A, B>(self: ReadonlyRecord<A>, key: string, b: B) => Option<Record<string, A | B>>
>(
  3,
  <A, B>(self: ReadonlyRecord<A>, key: string, b: B): Option<Record<string, A | B>> =>
    modifyOption(self, key, () => b)
)

/**
 * Maps the values of a `ReadonlyRecord` to a new `Record` by applying a transformation function to each of its keys and values.
 *
 * @param self - The `ReadonlyRecord` to be mapped.
 * @param f - A transformation function that will be applied to each of the key/values in the `ReadonlyRecord`.
 *
 * @example
 * import { mapWithKey } from "@fp-ts/core/ReadonlyRecord"
 *
 * const f = (k: string, n: number) => `${k.toUpperCase()}-${n}`
 *
 * assert.deepStrictEqual(mapWithKey({ a: 3, b: 5 }, f), { a: "A-3", b: "B-5" })
 *
 * @dual
 * @category mapping
 * @since 1.0.0
 */
export const mapWithKey: {
  <A, B>(f: (k: string, a: A) => B): (self: ReadonlyRecord<A>) => Record<string, B>
  <A, B>(self: ReadonlyRecord<A>, f: (k: string, a: A) => B): Record<string, B>
} = dual<
  <A, B>(f: (k: string, a: A) => B) => (self: ReadonlyRecord<A>) => Record<string, B>,
  <A, B>(self: ReadonlyRecord<A>, f: (k: string, a: A) => B) => Record<string, B>
>(
  2,
  <A, B>(self: ReadonlyRecord<A>, f: (k: string, a: A) => B): Record<string, B> => {
    const out: Record<string, B> = {}
    for (const k in self) {
      if (Object.prototype.hasOwnProperty.call(self, k)) {
        out[k] = f(k, self[k])
      }
    }
    return out
  }
)

/**
 * Maps a `ReadonlyRecord` into another `Record` by applying a transformation function to each of its values.
 *
 * @param self - The `ReadonlyRecord` to be mapped.
 * @param f - A transformation function that will be applied to each of the values in the `ReadonlyRecord`.
 *
 * @example
 * import { map } from "@fp-ts/core/ReadonlyRecord"
 *
 * const f = (n: number) => `-${n}-`
 *
 * assert.deepStrictEqual(map({ a: 3, b: 5 }, f), { a: "-3-", b: "-5-" })
 *
 * @dual
 * @category mapping
 * @since 1.0.0
 */
export const map: {
  <A, B>(f: (a: A) => B): (self: ReadonlyRecord<A>) => Record<string, B>
  <A, B>(self: ReadonlyRecord<A>, f: (a: A) => B): Record<string, B>
} = dual<
  <A, B>(f: (a: A) => B) => (self: ReadonlyRecord<A>) => Record<string, B>,
  <A, B>(self: ReadonlyRecord<A>, f: (a: A) => B) => Record<string, B>
>(
  2,
  <A, B>(self: ReadonlyRecord<A>, f: (a: A) => B): Record<string, B> =>
    mapWithKey(self, (_, a) => f(a))
)

/*

  TODO:

  - size
  - isEmpty
  - collect
  - toArray
  - has
  - remove
  - pop
  - empty
  - filterMapWithIndex
  - filterMap
  - filterWithIndex
  - filter
  - partition
  - partitionWithIndex
  - partitionMap
  - partitionMapWithIndex
  - traverseWithKey
  - traverse
  - sequence
  - compact
  - separate
  - traverseFilterMap
  - traversePartitionMap

*/
