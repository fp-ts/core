---
title: String.ts
nav_order: 14
parent: Modules
---

## String overview

This module provides utility functions and type class instances for working with the `string` type in TypeScript.
It includes functions for basic string manipulation, as well as type class instances for
`Equivalence`, `Order`, `Semigroup`, and `Monoid`.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [guards](#guards)
  - [isString](#isstring)
- [instances](#instances)
  - [Equivalence](#equivalence)
  - [Monoid](#monoid)
  - [Order](#order)
  - [Semigroup](#semigroup)
- [utils](#utils)
  - [concat](#concat)
  - [empty](#empty)
  - [endsWith](#endswith)
  - [endsWithPosition](#endswithposition)
  - [includes](#includes)
  - [includesWithPosition](#includeswithposition)
  - [isEmpty](#isempty)
  - [isNonEmpty](#isnonempty)
  - [length](#length)
  - [replace](#replace)
  - [slice](#slice)
  - [split](#split)
  - [startsWith](#startswith)
  - [startsWithPosition](#startswithposition)
  - [takeLeft](#takeleft)
  - [takeRight](#takeright)
  - [toLowerCase](#tolowercase)
  - [toUpperCase](#touppercase)
  - [trim](#trim)
  - [trimEnd](#trimend)
  - [trimStart](#trimstart)

---

# guards

## isString

Tests if a value is a `string`.

**Signature**

```ts
export declare const isString: Refinement<unknown, string>
```

**Example**

```ts
import { isString } from '@fp-ts/core/String'

assert.deepStrictEqual(isString('a'), true)
assert.deepStrictEqual(isString(1), false)
```

Added in v1.0.0

# instances

## Equivalence

**Signature**

```ts
export declare const Equivalence: equivalence.Equivalence<string>
```

Added in v1.0.0

## Monoid

`string` monoid under concatenation.

The `empty` value is `''`.

**Signature**

```ts
export declare const Monoid: monoid.Monoid<string>
```

Added in v1.0.0

## Order

**Signature**

```ts
export declare const Order: order.Order<string>
```

Added in v1.0.0

## Semigroup

`string` semigroup under concatenation.

**Signature**

```ts
export declare const Semigroup: semigroup.Semigroup<string>
```

Added in v1.0.0

# utils

## concat

**Signature**

```ts
export declare const concat: { (that: string): (self: string) => string; (self: string, that: string): string }
```

Added in v1.0.0

## empty

The empty string `""`.

**Signature**

```ts
export declare const empty: ''
```

Added in v1.0.0

## endsWith

**Signature**

```ts
export declare const endsWith: {
  (searchString: string): (self: string) => boolean
  (self: string, searchString: string): boolean
}
```

**Example**

```ts
import * as S from '@fp-ts/core/String'

assert.deepStrictEqual(S.endsWith('abc', 'c'), true)
assert.deepStrictEqual(S.endsWith('ab', 'c'), false)
```

Added in v1.0.0

## endsWithPosition

**Signature**

```ts
export declare const endsWithPosition: {
  (searchString: string, position: number): (self: string) => boolean
  (self: string, searchString: string, position: number): boolean
}
```

**Example**

```ts
import * as S from '@fp-ts/core/String'

assert.deepStrictEqual(S.endsWithPosition('abc', 'b', 2), true)
assert.deepStrictEqual(S.endsWithPosition('abc', 'c', 2), false)
```

Added in v1.0.0

## includes

Returns `true` if `searchString` appears as a substring of `self`, at one or more positions that are
greater than or equal to `0`; otherwise, returns `false`.

**Signature**

```ts
export declare const includes: {
  (searchString: string): (self: string) => boolean
  (self: string, searchString: string): boolean
}
```

**Example**

```ts
import * as S from '@fp-ts/core/String'

assert.deepStrictEqual(S.includes('abc', 'b'), true)
assert.deepStrictEqual(S.includes('abc', 'd'), false)
```

Added in v1.0.0

## includesWithPosition

Returns `true` if `searchString` appears as a substring of `self`, at one or more positions that are
greater than or equal to `position`; otherwise, returns `false`.

**Signature**

```ts
export declare const includesWithPosition: {
  (searchString: string, position: number): (self: string) => boolean
  (self: string, searchString: string, position: number): boolean
}
```

**Example**

```ts
import * as S from '@fp-ts/core/String'

assert.deepStrictEqual(S.includesWithPosition('abc', 'b', 1), true)
assert.deepStrictEqual(S.includesWithPosition('abc', 'a', 1), false)
```

Added in v1.0.0

## isEmpty

Test whether a `string` is empty.

**Signature**

```ts
export declare const isEmpty: (self: string) => self is ''
```

**Example**

```ts
import * as S from '@fp-ts/core/String'

assert.deepStrictEqual(S.isEmpty(''), true)
assert.deepStrictEqual(S.isEmpty('a'), false)
```

Added in v1.0.0

## isNonEmpty

Test whether a `string` is non empty.

**Signature**

```ts
export declare const isNonEmpty: (self: string) => boolean
```

Added in v1.0.0

## length

Calculate the number of characters in a `string`.

**Signature**

```ts
export declare const length: (self: string) => number
```

**Example**

```ts
import * as S from '@fp-ts/core/String'

assert.deepStrictEqual(S.length('abc'), 3)
```

Added in v1.0.0

## replace

**Signature**

```ts
export declare const replace: {
  (searchValue: string | RegExp, replaceValue: string): (self: string) => string
  (self: string, searchValue: string | RegExp, replaceValue: string): string
}
```

**Example**

```ts
import * as S from '@fp-ts/core/String'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe('abc', S.replace('b', 'd')), 'adc')
```

Added in v1.0.0

## slice

**Signature**

```ts
export declare const slice: {
  (start: number, end: number): (self: string) => string
  (self: string, start: number, end: number): string
}
```

**Example**

```ts
import * as S from '@fp-ts/core/String'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe('abcd', S.slice(1, 3)), 'bc')
```

Added in v1.0.0

## split

**Signature**

```ts
export declare const split: {
  (separator: string | RegExp): (self: string) => readonly [string, ...string[]]
  (self: string, separator: string | RegExp): readonly [string, ...string[]]
}
```

**Example**

```ts
import * as S from '@fp-ts/core/String'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe('abc', S.split('')), ['a', 'b', 'c'])
assert.deepStrictEqual(pipe('', S.split('')), [''])
```

Added in v1.0.0

## startsWith

Returns `true` if the sequence of elements of `searchString` is the
same as the corresponding elements of `s` starting at
position. Otherwise returns false.

**Signature**

```ts
export declare const startsWith: {
  (searchString: string): (self: string) => boolean
  (self: string, searchString: string): boolean
}
```

**Example**

```ts
import * as S from '@fp-ts/core/String'

assert.deepStrictEqual(S.startsWith('abc', 'a'), true)
assert.deepStrictEqual(S.startsWith('bc', 'a'), false)
```

Added in v1.0.0

## startsWithPosition

**Signature**

```ts
export declare const startsWithPosition: {
  (searchString: string, position: number): (self: string) => boolean
  (self: string, searchString: string, position: number): boolean
}
```

**Example**

```ts
import * as S from '@fp-ts/core/String'

assert.deepStrictEqual(S.startsWithPosition('abc', 'b', 1), true)
assert.deepStrictEqual(S.startsWithPosition('bc', 'a', 1), false)
```

Added in v1.0.0

## takeLeft

Keep the specified number of characters from the start of a string.

If `n` is larger than the available number of characters, the string will
be returned whole.

If `n` is not a positive number, an empty string will be returned.

If `n` is a float, it will be rounded down to the nearest integer.

**Signature**

```ts
export declare const takeLeft: { (n: number): (self: string) => string; (self: string, n: number): string }
```

**Example**

```ts
import * as S from '@fp-ts/core/String'

assert.deepStrictEqual(S.takeLeft('Hello World', 5), 'Hello')
```

Added in v1.0.0

## takeRight

Keep the specified number of characters from the end of a string.

If `n` is larger than the available number of characters, the string will
be returned whole.

If `n` is not a positive number, an empty string will be returned.

If `n` is a float, it will be rounded down to the nearest integer.

**Signature**

```ts
export declare const takeRight: { (n: number): (self: string) => string; (self: string, n: number): string }
```

**Example**

```ts
import * as S from '@fp-ts/core/String'

assert.deepStrictEqual(S.takeRight('Hello World', 5), 'World')
```

Added in v1.0.0

## toLowerCase

**Signature**

```ts
export declare const toLowerCase: (self: string) => string
```

**Example**

```ts
import * as S from '@fp-ts/core/String'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe('A', S.toLowerCase), 'a')
```

Added in v1.0.0

## toUpperCase

**Signature**

```ts
export declare const toUpperCase: (self: string) => string
```

**Example**

```ts
import * as S from '@fp-ts/core/String'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe('a', S.toUpperCase), 'A')
```

Added in v1.0.0

## trim

**Signature**

```ts
export declare const trim: (self: string) => string
```

**Example**

```ts
import * as S from '@fp-ts/core/String'

assert.deepStrictEqual(S.trim(' a '), 'a')
```

Added in v1.0.0

## trimEnd

**Signature**

```ts
export declare const trimEnd: (self: string) => string
```

**Example**

```ts
import * as S from '@fp-ts/core/String'

assert.deepStrictEqual(S.trimEnd(' a '), ' a')
```

Added in v1.0.0

## trimStart

**Signature**

```ts
export declare const trimStart: (self: string) => string
```

**Example**

```ts
import * as S from '@fp-ts/core/String'

assert.deepStrictEqual(S.trimStart(' a '), 'a ')
```

Added in v1.0.0
