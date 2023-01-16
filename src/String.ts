/**
 * @since 1.0.0
 */

import * as readonlyArray from "@fp-ts/core/internal/ReadonlyArray"
import type { Refinement } from "@fp-ts/core/Predicate"
import type { NonEmptyReadonlyArray } from "@fp-ts/core/ReadonlyArray"
import * as equivalence from "@fp-ts/core/typeclass/Equivalence"
import type * as monoid from "@fp-ts/core/typeclass/Monoid"
import type * as order from "@fp-ts/core/typeclass/Order"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"

/**
 * @since 1.0.0
 */
export const concat = (that: string) => (self: string): string => self + that

/**
 * `string` semigroup under concatenation.
 *
 * @example
 * import * as S from '@fp-ts/data/String'
 * import { pipe } from '@fp-ts/data/Function'
 *
 * assert.deepStrictEqual(pipe('a', S.Semigroup.combine('b')), 'ab')
 *
 * @category instances
 * @since 1.0.0
 */
export const Semigroup: semigroup.Semigroup<string> = semigroup.fromCombine(concat)

/**
 * An empty `string`.
 *
 * @since 1.0.0
 */
export const empty: "" = "" as const

/**
 * `string` monoid under concatenation.
 *
 * The `empty` value is `''`.
 *
 * @example
 * import * as S from '@fp-ts/data/String'
 * import { pipe } from '@fp-ts/data/Function'
 *
 * assert.deepStrictEqual(pipe('a', S.Monoid.combine('b')), 'ab')
 * assert.deepStrictEqual(pipe('a', S.Monoid.combine(S.Monoid.empty)), 'a')
 *
 * @category instances
 * @since 1.0.0
 */
export const Monoid: monoid.Monoid<string> = {
  ...Semigroup,
  combineAll: (collection) => Semigroup.combineMany(collection)(empty),
  empty
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Equivalence: equivalence.Equivalence<string> = equivalence.string

/**
 * @example
 * import * as S from '@fp-ts/data/String'
 * import { pipe } from '@fp-ts/data/Function'
 *
 * assert.deepStrictEqual(pipe('a', S.Order.compare('a')), 0)
 * assert.deepStrictEqual(pipe('a', S.Order.compare('b')), -1)
 * assert.deepStrictEqual(pipe('b', S.Order.compare('a')), 1)
 *
 * @category instances
 * @since 1.0.0
 */
export const Order: order.Order<string> = {
  compare: (that) => (self) => self < that ? -1 : self > that ? 1 : 0
}

/**
 * @example
 * import * as S from '@fp-ts/data/String'
 *
 * assert.deepStrictEqual(S.isString('a'), true)
 * assert.deepStrictEqual(S.isString(1), false)
 *
 * @category guards
 * @since 1.0.0
 */
export const isString: Refinement<unknown, string> = (u: unknown): u is string =>
  typeof u === "string"

/**
 * @example
 * import * as S from '@fp-ts/data/String'
 * import { pipe } from '@fp-ts/data/Function'
 *
 * assert.deepStrictEqual(pipe('a', S.toUpperCase), 'A')
 *
 * @since 1.0.0
 */
export const toUpperCase = (s: string): string => s.toUpperCase()

/**
 * @example
 * import * as S from '@fp-ts/data/String'
 * import { pipe } from '@fp-ts/data/Function'
 *
 * assert.deepStrictEqual(pipe('A', S.toLowerCase), 'a')
 *
 * @since 1.0.0
 */
export const toLowerCase = (s: string): string => s.toLowerCase()

/**
 * @example
 * import * as S from '@fp-ts/data/String'
 * import { pipe } from '@fp-ts/data/Function'
 *
 * assert.deepStrictEqual(pipe('abc', S.replace('b', 'd')), 'adc')
 *
 * @since 1.0.0
 */
export const replace = (searchValue: string | RegExp, replaceValue: string) =>
  (s: string): string => s.replace(searchValue, replaceValue)

/**
 * @example
 * import * as S from '@fp-ts/data/String'
 * import { pipe } from '@fp-ts/data/Function'
 *
 * assert.deepStrictEqual(pipe(' a ', S.trim), 'a')
 *
 * @since 1.0.0
 */
export const trim = (s: string): string => s.trim()

/**
 * @example
 * import * as S from '@fp-ts/data/String'
 * import { pipe } from '@fp-ts/data/Function'
 *
 * assert.deepStrictEqual(pipe(' a ', S.trimLeft), 'a ')
 *
 * @since 1.0.0
 */
export const trimLeft = (s: string): string => s.trimLeft()

/**
 * @example
 * import * as S from '@fp-ts/data/String'
 * import { pipe } from '@fp-ts/data/Function'
 *
 * assert.deepStrictEqual(pipe(' a ', S.trimRight), ' a')
 *
 * @since 1.0.0
 */
export const trimRight = (s: string): string => s.trimRight()

/**
 * @example
 * import * as S from '@fp-ts/data/String'
 * import { pipe } from '@fp-ts/data/Function'
 *
 * assert.deepStrictEqual(pipe('abcd', S.slice(1, 3)), 'bc')
 *
 * @since 1.0.0
 */
export const slice = (start: number, end: number) => (s: string): string => s.slice(start, end)

/**
 * Test whether a `string` is empty.
 *
 * @example
 * import * as S from '@fp-ts/data/String'
 * import { pipe } from '@fp-ts/data/Function'
 *
 * assert.deepStrictEqual(pipe('', S.isEmpty), true)
 * assert.deepStrictEqual(pipe('a', S.isEmpty), false)
 *
 * @since 1.0.0
 */
export const isEmpty = (s: string): s is "" => s.length === 0

/**
 * Calculate the number of characters in a `string`.
 *
 * @example
 * import * as S from '@fp-ts/data/String'
 * import { pipe } from '@fp-ts/data/Function'
 *
 * assert.deepStrictEqual(pipe('abc', S.size), 3)
 *
 * @since 1.0.0
 */
export const size = (s: string): number => s.length

/**
 * @example
 * import * as S from '@fp-ts/data/String'
 * import { pipe } from '@fp-ts/data/Function'
 *
 * assert.deepStrictEqual(pipe('abc', S.split('')), ['a', 'b', 'c'])
 * assert.deepStrictEqual(pipe('', S.split('')), [''])
 *
 * @since 1.0.0
 */
export const split = (separator: string | RegExp) =>
  (s: string): NonEmptyReadonlyArray<string> => {
    const out = s.split(separator)
    return readonlyArray.isNonEmpty(out) ? out : [s]
  }

/**
 * @example
 * import * as S from '@fp-ts/data/String'
 * import { pipe } from '@fp-ts/data/Function'
 *
 * assert.deepStrictEqual(pipe('abc', S.includes('b')), true)
 * assert.deepStrictEqual(pipe('abc', S.includes('d')), false)
 *
 * @since 1.0.0
 */
export const includes = (searchString: string, position?: number) =>
  (s: string): boolean => s.includes(searchString, position)

/**
 * @example
 * import * as S from '@fp-ts/data/String'
 * import { pipe } from '@fp-ts/data/Function'
 *
 * assert.deepStrictEqual(pipe('abc', S.startsWith('a')), true)
 * assert.deepStrictEqual(pipe('bc', S.startsWith('a')), false)
 *
 * @since 1.0.0
 */
export const startsWith = (searchString: string, position?: number) =>
  (s: string): boolean => s.startsWith(searchString, position)

/**
 * @example
 * import * as S from '@fp-ts/data/String'
 * import { pipe } from '@fp-ts/data/Function'
 *
 * assert.deepStrictEqual(pipe('abc', S.endsWith('c')), true)
 * assert.deepStrictEqual(pipe('ab', S.endsWith('c')), false)
 *
 * @since 1.0.0
 */
export const endsWith = (searchString: string, position?: number) =>
  (s: string): boolean => s.endsWith(searchString, position)

/**
 * Keep the specified number of characters from the start of a string.
 *
 * If `n` is larger than the available number of characters, the string will
 * be returned whole.
 *
 * If `n` is not a positive number, an empty string will be returned.
 *
 * If `n` is a float, it will be rounded down to the nearest integer.
 *
 * @since 1.0.0
 */
export const takeLeft = (n: number) => (self: string): string => self.slice(0, Math.max(n, 0))

/**
 * Keep the specified number of characters from the end of a string.
 *
 * If `n` is larger than the available number of characters, the string will
 * be returned whole.
 *
 * If `n` is not a positive number, an empty string will be returned.
 *
 * If `n` is a float, it will be rounded down to the nearest integer.
 *
 * @since 1.0.0
 */
export const takeRight = (n: number) =>
  (s: string): string => s.slice(Math.max(0, s.length - Math.floor(n)), Infinity)

// TODO: 100% coverage tests (ask Max)
// const CR = 0x0d
// const LF = 0x0a

// /**
//  * Returns an `IterableIterator` which yields each line contained within the
//  * string, trimming off the trailing newline character.
//  *
//  * @since 1.0.0
//  */
// // export const linesIterator = (self: string): LinesIterator => linesSeparated(self, true)

// /**
//  * Returns an `IterableIterator` which yields each line contained within the
//  * string as well as the trailing newline character.
//  *
//  * @since 1.0.0
//  */
// export const linesWithSeparators = (s: string): LinesIterator => linesSeparated(s, false)

// /**
//  * For every line in this string, strip a leading prefix consisting of blanks
//  * or control characters followed by the character specified by `marginChar`
//  * from the line.
//  *
//  * @since 1.0.0
//  */
// export const stripMarginWith = (marginChar: string) =>
//   (self: string): string => {
//     let out = ""

//     for (const line of linesWithSeparators(self)) {
//       let index = 0

//       while (index < line.length && line.charAt(index) <= " ") {
//         index = index + 1
//       }

//       const stripped = index < line.length && line.charAt(index) === marginChar
//         ? line.substring(index + 1)
//         : line

//       out = out + stripped
//     }

//     return out
//   }

// /**
//  * For every line in this string, strip a leading prefix consisting of blanks
//  * or control characters followed by the `"|"` character from the line.
//  *
//  * @since 1.0.0
//  */
// export const stripMargin = (self: string): string => stripMarginWith("|")(self)

// class LinesIterator implements IterableIterator<string> {
//   private index: number
//   private readonly length: number

//   constructor(readonly s: string, readonly stripped: boolean = false) {
//     this.index = 0
//     this.length = s.length
//   }

//   next(): IteratorResult<string> {
//     if (this.done) {
//       return { done: true, value: undefined }
//     }
//     const start = this.index
//     while (!this.done && !isLineBreak(this.s[this.index]!)) {
//       this.index = this.index + 1
//     }
//     let end = this.index
//     if (!this.done) {
//       const char = this.s[this.index]!
//       this.index = this.index + 1
//       if (!this.done && isLineBreak2(char, this.s[this.index]!)) {
//         this.index = this.index + 1
//       }
//       if (!this.stripped) {
//         end = this.index
//       }
//     }
//     return { done: false, value: this.s.substring(start, end) }
//   }

//   [Symbol.iterator](): IterableIterator<string> {
//     return new LinesIterator(this.s, this.stripped)
//   }

//   private get done(): boolean {
//     return this.index >= this.length
//   }
// }

// /**
//  * Test if the provided character is a line break character (i.e. either `"\r"`
//  * or `"\n"`).
//  */
// const isLineBreak = (char: string): boolean => {
//   const code = char.charCodeAt(0)
//   return code === CR || code === LF
// }

// /**
//  * Test if the provided characters combine to form a carriage return/line-feed
//  * (i.e. `"\r\n"`).
//  */
// const isLineBreak2 = (char0: string, char1: string): boolean =>
//   char0.charCodeAt(0) === CR && char1.charCodeAt(0) === LF

// const linesSeparated = (self: string, stripped: boolean): LinesIterator =>
//   new LinesIterator(self, stripped)
