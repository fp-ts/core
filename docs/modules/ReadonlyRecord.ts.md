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
- [mapping](#mapping)
  - [map](#map)
- [models](#models)
  - [ReadonlyRecord (interface)](#readonlyrecord-interface)
- [utils](#utils)
  - [modifyOption](#modifyoption)
  - [replaceOption](#replaceoption)

---

# constructors

## fromIterable

Takes an iterable and a projection function and returns a record.
The projection function maps each value of the iterable to a tuple of a key and a value, which is then added to the resulting record.

**Signature**

```ts
export declare const fromIterable: {
  <A, B>(f: (a: A) => readonly [string, B]): (self: Iterable<A>) => Record<string, B>
  <A, B>(self: Iterable<A>, f: (a: A) => readonly [string, B]): Record<string, B>
}
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
export declare const get: {
  (key: string): <A>(self: ReadonlyRecord<A>) => Option<A>
  <A>(self: ReadonlyRecord<A>, key: string): Option<A>
}
```

**Example**

```ts
import { get } from '@fp-ts/core/ReadonlyRecord'
import { some, none } from '@fp-ts/core/Option'

const person = { name: 'John Doe', age: 35 }

assert.deepStrictEqual(get(person, 'name'), some('John Doe'))
assert.deepStrictEqual(get(person, 'email'), none())
```

Added in v1.0.0

# mapping

## map

Maps a `ReadonlyRecord` into another `Record` by applying a transformation function to each of its values.

**Signature**

```ts
export declare const map: {
  <A, B>(f: (a: A, key: string) => B): (self: ReadonlyRecord<A>) => Record<string, B>
  <A, B>(self: ReadonlyRecord<A>, f: (a: A, key: string) => B): Record<string, B>
}
```

**Example**

```ts
import { map } from '@fp-ts/core/ReadonlyRecord'

const f = (n: number) => `-${n}`

assert.deepStrictEqual(map({ a: 3, b: 5 }, f), { a: '-3', b: '-5' })

const g = (n: number, key: string) => `${key.toUpperCase()}-${n}`

assert.deepStrictEqual(map({ a: 3, b: 5 }, g), { a: 'A-3', b: 'B-5' })
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

## modifyOption

Apply a function to the element at the specified key, creating a new record,
or return `None` if the key doesn't exist.

**Signature**

```ts
export declare const modifyOption: {
  <A, B>(key: string, f: (a: A) => B): (self: ReadonlyRecord<A>) => Option<Record<string, A | B>>
  <A, B>(self: ReadonlyRecord<A>, key: string, f: (a: A) => B): Option<Record<string, A | B>>
}
```

**Example**

```ts
import { modifyOption } from '@fp-ts/core/ReadonlyRecord'
import { some, none } from '@fp-ts/core/Option'

const f = (x: number) => x * 2

assert.deepStrictEqual(modifyOption({ a: 3 }, 'a', f), some({ a: 6 }))
assert.deepStrictEqual(modifyOption({ a: 3 }, 'b', f), none())
```

Added in v1.0.0

## replaceOption

Replaces a value in the record with the new value passed as parameter.

**Signature**

```ts
export declare const replaceOption: {
  <B>(key: string, b: B): <A>(self: ReadonlyRecord<A>) => Option<Record<string, B | A>>
  <A, B>(self: ReadonlyRecord<A>, key: string, b: B): Option<Record<string, A | B>>
}
```

**Example**

```ts
import { replaceOption } from '@fp-ts/core/ReadonlyRecord'
import { some, none } from '@fp-ts/core/Option'

assert.deepStrictEqual(replaceOption({ a: 1, b: 2, c: 3 }, 'a', 10), some({ a: 10, b: 2, c: 3 }))
assert.deepStrictEqual(replaceOption({}, 'a', 10), none())
```

Added in v1.0.0
