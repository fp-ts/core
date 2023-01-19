/**
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
 * This function provides a safe way to read a value at a particular key from a record.
 *
 * @category getters
 * @since 1.0.0
 */
export const get = (key: string) =>
  <A>(self: ReadonlyRecord<A>): Option<A> =>
    Object.prototype.hasOwnProperty.call(self, key) ? O.some(self[key]) : O.none()

/**
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
