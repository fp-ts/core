---
title: string.ts
nav_order: 30
parent: Modules
---

## string overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [Eq](#eq)
  - [Monoid](#monoid)
  - [Ord](#ord)
  - [Semigroup](#semigroup)
  - [Show](#show)
- [refinements](#refinements)
  - [isString](#isstring)
- [utils](#utils)
  - [concat](#concat)
  - [concatAll](#concatall)
  - [empty](#empty)
  - [endsWith](#endswith)
  - [includes](#includes)
  - [isEmpty](#isempty)
  - [replace](#replace)
  - [size](#size)
  - [slice](#slice)
  - [split](#split)
  - [startsWith](#startswith)
  - [toLowerCase](#tolowercase)
  - [toUpperCase](#touppercase)
  - [trim](#trim)
  - [trimLeft](#trimleft)
  - [trimRight](#trimright)

---

# instances

## Eq

**Signature**

```ts
export declare const Eq: any
```

**Example**

```ts
import * as S from '@fp-ts/core/string'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe('a', S.Eq.equals('a')), true)
assert.deepStrictEqual(pipe('a', S.Eq.equals('b')), false)
```

Added in v3.0.0

## Monoid

`string` monoid under concatenation.

The `empty` value is `''`.

**Signature**

```ts
export declare const Monoid: any
```

**Example**

```ts
import * as S from '@fp-ts/core/string'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe('a', S.Monoid.combine('b')), 'ab')
assert.deepStrictEqual(pipe('a', S.Monoid.combine(S.Monoid.empty)), 'a')
```

Added in v3.0.0

## Ord

**Signature**

```ts
export declare const Ord: any
```

**Example**

```ts
import * as S from '@fp-ts/core/string'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe('a', S.Ord.compare('a')), 0)
assert.deepStrictEqual(pipe('a', S.Ord.compare('b')), -1)
assert.deepStrictEqual(pipe('b', S.Ord.compare('a')), 1)
```

Added in v3.0.0

## Semigroup

`string` semigroup under concatenation.

**Signature**

```ts
export declare const Semigroup: any
```

**Example**

```ts
import * as S from '@fp-ts/core/string'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe('a', S.Semigroup.combine('b')), 'ab')
```

Added in v3.0.0

## Show

**Signature**

```ts
export declare const Show: any
```

**Example**

```ts
import * as S from '@fp-ts/core/string'

assert.deepStrictEqual(S.Show.show('a'), '"a"')
```

Added in v3.0.0

# refinements

## isString

**Signature**

```ts
export declare const isString: any
```

**Example**

```ts
import * as S from '@fp-ts/core/string'

assert.deepStrictEqual(S.isString('a'), true)
assert.deepStrictEqual(S.isString(1), false)
```

Added in v3.0.0

# utils

## concat

**Signature**

```ts
export declare const concat: (that: string) => (self: string) => string
```

Added in v3.0.0

## concatAll

**Signature**

```ts
export declare const concatAll: (collection: Iterable<string>) => string
```

Added in v3.0.0

## empty

An empty `string`.

**Signature**

```ts
export declare const empty: ''
```

Added in v3.0.0

## endsWith

**Signature**

```ts
export declare const endsWith: (searchString: string, position?: number | undefined) => (s: string) => boolean
```

**Example**

```ts
import * as S from '@fp-ts/core/string'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe('abc', S.endsWith('c')), true)
assert.deepStrictEqual(pipe('ab', S.endsWith('c')), false)
```

Added in v3.0.0

## includes

**Signature**

```ts
export declare const includes: (searchString: string, position?: number | undefined) => (s: string) => boolean
```

**Example**

```ts
import * as S from '@fp-ts/core/string'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe('abc', S.includes('b')), true)
assert.deepStrictEqual(pipe('abc', S.includes('d')), false)
```

Added in v3.0.0

## isEmpty

Test whether a `string` is empty.

**Signature**

```ts
export declare const isEmpty: (s: string) => boolean
```

**Example**

```ts
import * as S from '@fp-ts/core/string'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe('', S.isEmpty), true)
assert.deepStrictEqual(pipe('a', S.isEmpty), false)
```

Added in v3.0.0

## replace

**Signature**

```ts
export declare const replace: (searchValue: string | RegExp, replaceValue: string) => (s: string) => string
```

**Example**

```ts
import * as S from '@fp-ts/core/string'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe('abc', S.replace('b', 'd')), 'adc')
```

Added in v3.0.0

## size

Calculate the number of characters in a `string`.

**Signature**

```ts
export declare const size: (s: string) => number
```

**Example**

```ts
import * as S from '@fp-ts/core/string'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe('abc', S.size), 3)
```

Added in v3.0.0

## slice

**Signature**

```ts
export declare const slice: (start: number, end: number) => (s: string) => string
```

**Example**

```ts
import * as S from '@fp-ts/core/string'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe('abcd', S.slice(1, 3)), 'bc')
```

Added in v3.0.0

## split

**Signature**

```ts
export declare const split: (separator: string | RegExp) => (s: string) => any
```

**Example**

```ts
import * as S from '@fp-ts/core/string'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe('abc', S.split('')), ['a', 'b', 'c'])
assert.deepStrictEqual(pipe('', S.split('')), [''])
```

Added in v3.0.0

## startsWith

**Signature**

```ts
export declare const startsWith: (searchString: string, position?: number | undefined) => (s: string) => boolean
```

**Example**

```ts
import * as S from '@fp-ts/core/string'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe('abc', S.startsWith('a')), true)
assert.deepStrictEqual(pipe('bc', S.startsWith('a')), false)
```

Added in v3.0.0

## toLowerCase

**Signature**

```ts
export declare const toLowerCase: (s: string) => string
```

**Example**

```ts
import * as S from '@fp-ts/core/string'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe('A', S.toLowerCase), 'a')
```

Added in v3.0.0

## toUpperCase

**Signature**

```ts
export declare const toUpperCase: (s: string) => string
```

**Example**

```ts
import * as S from '@fp-ts/core/string'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe('a', S.toUpperCase), 'A')
```

Added in v3.0.0

## trim

**Signature**

```ts
export declare const trim: (s: string) => string
```

**Example**

```ts
import * as S from '@fp-ts/core/string'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe(' a ', S.trim), 'a')
```

Added in v3.0.0

## trimLeft

**Signature**

```ts
export declare const trimLeft: (s: string) => string
```

**Example**

```ts
import * as S from '@fp-ts/core/string'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe(' a ', S.trimLeft), 'a ')
```

Added in v3.0.0

## trimRight

**Signature**

```ts
export declare const trimRight: (s: string) => string
```

**Example**

```ts
import * as S from '@fp-ts/core/string'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe(' a ', S.trimRight), ' a')
```

Added in v3.0.0
