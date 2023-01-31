/**
 * This module provides utility functions for working with records in TypeScript.
 *
 * @since 1.0.0
 */

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
 * Takes an iterable and a projection function, `f`, and returns a record.
 * The projection function maps each value of the iterable to a tuple of a key and a value, which is then added to the resulting record.
 *
 * @param iterable - An iterable of values to be mapped to a record.
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
 * @category constructors
 * @since 1.0.0
 */
export const fromIterable = <A, B>(
  iterable: Iterable<A>,
  f: (a: A) => readonly [string, B]
): Record<string, B> => {
  const out: Record<string, B> = {}
  for (const a of iterable) {
    const [k, b] = f(a)
    out[k] = b
  }
  return out
}

/**
 * Retrieve a value at a particular key from a `ReadonlyRecord`, returning it wrapped in an `Option`.
 *
 * @param key - Key to retrieve from `ReadonlyRecord`.
 * @param self - The `ReadonlyRecord` to retrieve value from.
 *
 * @example
 * import { get } from "@fp-ts/core/ReadonlyRecord"
 * import { some, none } from "@fp-ts/core/Option"
 * import { pipe } from "@fp-ts/core/Function"
 *
 * const person = { name: "John Doe", age: 35 }
 *
 * assert.deepStrictEqual(pipe(person, get("name")), some("John Doe"))
 * assert.deepStrictEqual(pipe(person, get("email")), none())
 *
 * @category getters
 * @since 1.0.0
 */
export const get = (key: string) =>
  <A>(self: ReadonlyRecord<A>): Option<A> =>
    Object.prototype.hasOwnProperty.call(self, key) ? O.some(self[key]) : O.none()

/**
 * Replaces a value in the record with the new value passed as parameter.
 *
 * @param key - The key to search for in the record.
 * @param b - The new value to replace the existing value with.
 * @param self - The `ReadonlyRecord` to be updated.
 *
 * @example
 * import { replaceOption } from "@fp-ts/core/ReadonlyRecord"
 * import { some, none } from "@fp-ts/core/Option"
 *
 * const record = { a: 1, b: 2, c: 3 }
 * const replaceA = replaceOption('a', 10)
 *
 * assert.deepStrictEqual(replaceA(record), some({ a: 10, b: 2, c: 3 }))
 * assert.deepStrictEqual(replaceA({}), none())
 *
 * @since 1.0.0
 */
export const replaceOption = <B>(
  key: string,
  b: B
): <A>(self: ReadonlyRecord<A>) => Option<Record<string, A | B>> => modifyOption(key, () => b)

/**
 * Apply a function to the element at the specified key, creating a new record,
 * or return `None` if the key doesn't exist.
 *
 * @param key - The key of the element to modify.
 * @param f - The function to apply to the element.
 * @param self - The `ReadonlyRecord` to be updated.
 *
 * @example
 * import { modifyOption } from "@fp-ts/core/ReadonlyRecord"
 * import { pipe } from "@fp-ts/core/Function"
 * import { some, none } from "@fp-ts/core/Option"
 *
 * const f = (x: number) => x * 2
 *
 * assert.deepStrictEqual(
 *  pipe({ a: 3 }, modifyOption('a', f)),
 *  some({ a: 6 })
 * )
 * assert.deepStrictEqual(
 *  pipe({ a: 3 }, modifyOption('b', f)),
 *  none()
 * )
 *
 * @since 1.0.0
 */
export const modifyOption = <A, B>(key: string, f: (a: A) => B) =>
  (self: ReadonlyRecord<A>): Option<Record<string, A | B>> => {
    if (!Object.prototype.hasOwnProperty.call(self, key)) {
      return O.none()
    }
    const out: Record<string, A | B> = { ...self }
    out[key] = f(self[key])
    return O.some(out)
  }

/**
 * Maps the values of a `ReadonlyRecord` to a new `Record` by applying a transformation function to each of its keys and values.
 *
 * @param f - A transformation function that will be applied to each of the key/values in the `ReadonlyRecord`.
 * @param self - The `ReadonlyRecord` to be mapped.
 *
 * @example
 * import { mapWithKey } from "@fp-ts/core/ReadonlyRecord"
 * import { pipe } from "@fp-ts/core/Function"
 *
 * const f = (k: string, n: number) => `${k.toUpperCase()}-${n}`
 *
 * assert.deepStrictEqual(pipe({ a: 3, b: 5 }, mapWithKey(f)), { a: "A-3", b: "B-5" })
 *
 * @since 1.0.0
 */
export const mapWithKey = <A, B>(f: (k: string, a: A) => B) =>
  (self: ReadonlyRecord<A>): Record<string, B> => {
    const out: Record<string, B> = {}
    for (const k in self) {
      if (Object.prototype.hasOwnProperty.call(self, k)) {
        out[k] = f(k, self[k])
      }
    }
    return out
  }

/**
 * Maps a `ReadonlyRecord` into another `Record` by applying a transformation function to each of its values.
 *
 * @param f - A transformation function that will be applied to each of the values in the `ReadonlyRecord`.
 * @param self - The `ReadonlyRecord` to be mapped.
 *
 * @example
 * import { map } from "@fp-ts/core/ReadonlyRecord"
 * import { pipe } from "@fp-ts/core/Function"
 *
 * const f = (n: number) => `-${n}-`
 *
 * assert.deepStrictEqual(pipe({ a: 3, b: 5 }, map(f)), { a: "-3-", b: "-5-" })
 *
 * @since 1.0.0
 */
export const map = <A, B>(f: (a: A) => B): (self: ReadonlyRecord<A>) => Record<string, B> =>
  mapWithKey((_, a) => f(a))

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
