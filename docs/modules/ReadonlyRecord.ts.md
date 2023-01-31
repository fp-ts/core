---
title: ReadonlyRecord.ts
nav_order: 13
parent: Modules
---

## ReadonlyRecord overview

This module provides utility functions for working with records in TypeScript.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [fromIterable](#fromiterable)
- [getters](#getters)
  - [get](#get)
- [models](#models)
  - [ReadonlyRecord (interface)](#readonlyrecord-interface)
- [utils](#utils)
  - [map](#map)
  - [mapWithKey](#mapwithkey)
  - [modifyOption](#modifyoption)
  - [replaceOption](#replaceoption)

---

# constructors

## fromIterable

Takes an iterable and a projection function, `f`, and returns a record.
The projection function maps each value of the iterable to a tuple of a key and a value, which is then added to the resulting record.

**Signature**

```ts
export declare const fromIterable: <A, B>(iterable: Iterable<A>, f: (a: A) => readonly [string, B]) => Record<string, B>
```

**Example**

```ts
import { fromIterable } from '@fp-ts/core/ReadonlyRecord'

const input = [1, 2, 3, 4]

assert.deepStrictEqual(
  fromIterable(input, (a) => [String(a), a * 2]),
  { '1': 2, '2': 4, '3': 6, '4': 8 }
)
```

Added in v1.0.0

# getters

## get

Retrieve a value at a particular key from a `ReadonlyRecord`, returning it wrapped in an `Option`.

**Signature**

```ts
export declare const get: (key: string) => <A>(self: ReadonlyRecord<A>) => any
```

**Example**

```ts
import { get } from '@fp-ts/core/ReadonlyRecord'
import { some, none } from '@fp-ts/core/Option'
import { pipe } from '@fp-ts/core/Function'

const person = { name: 'John Doe', age: 35 }

assert.deepStrictEqual(pipe(person, get('name')), some('John Doe'))
assert.deepStrictEqual(pipe(person, get('email')), none())
```

Added in v1.0.0

# models

## ReadonlyRecord (interface)

**Signature**

```ts
export interface ReadonlyRecord<A> {
  readonly [x: string]: A
}
```

Added in v1.0.0

# utils

## map

Maps a `ReadonlyRecord` into another `Record` by applying a transformation function to each of its values.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (self: ReadonlyRecord<A>) => Record<string, B>
```

**Example**

```ts
import { map } from '@fp-ts/core/ReadonlyRecord'
import { pipe } from '@fp-ts/core/Function'

const f = (n: number) => `-${n}-`

assert.deepStrictEqual(pipe({ a: 3, b: 5 }, map(f)), { a: '-3-', b: '-5-' })
```

Added in v1.0.0

## mapWithKey

Maps the values of a `ReadonlyRecord` to a new `Record` by applying a transformation function to each of its keys and values.

**Signature**

```ts
export declare const mapWithKey: <A, B>(f: (k: string, a: A) => B) => (self: ReadonlyRecord<A>) => Record<string, B>
```

**Example**

```ts
import { mapWithKey } from '@fp-ts/core/ReadonlyRecord'
import { pipe } from '@fp-ts/core/Function'

const f = (k: string, n: number) => `${k.toUpperCase()}-${n}`

assert.deepStrictEqual(pipe({ a: 3, b: 5 }, mapWithKey(f)), { a: 'A-3', b: 'B-5' })
```

Added in v1.0.0

## modifyOption

Apply a function to the element at the specified key, creating a new record,
or return `None` if the key doesn't exist.

**Signature**

```ts
export declare const modifyOption: <A, B>(key: string, f: (a: A) => B) => (self: ReadonlyRecord<A>) => any
```

**Example**

```ts
import { modifyOption } from '@fp-ts/core/ReadonlyRecord'
import { pipe } from '@fp-ts/core/Function'
import { some, none } from '@fp-ts/core/Option'

const f = (x: number) => x * 2

assert.deepStrictEqual(pipe({ a: 3 }, modifyOption('a', f)), some({ a: 6 }))
assert.deepStrictEqual(pipe({ a: 3 }, modifyOption('b', f)), none())
```

Added in v1.0.0

## replaceOption

Replaces a value in the record with the new value passed as parameter.

**Signature**

```ts
export declare const replaceOption: <B>(key: string, b: B) => <A>(self: ReadonlyRecord<A>) => any
```

**Example**

```ts
import { replaceOption } from '@fp-ts/core/ReadonlyRecord'
import { some, none } from '@fp-ts/core/Option'

const record = { a: 1, b: 2, c: 3 }
const replaceA = replaceOption('a', 10)

assert.deepStrictEqual(replaceA(record), some({ a: 10, b: 2, c: 3 }))
assert.deepStrictEqual(replaceA({}), none())
```

Added in v1.0.0
