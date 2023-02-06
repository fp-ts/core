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
  - [empty](#empty)
  - [fromIterable](#fromiterable)
- [conversions](#conversions)
  - [collect](#collect)
  - [toArray](#toarray)
- [filtering](#filtering)
  - [compact](#compact)
  - [filter](#filter)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
  - [separate](#separate)
  - [traverseFilterMap](#traversefiltermap)
  - [traversePartitionMap](#traversepartitionmap)
- [guards](#guards)
  - [isEmpty](#isempty)
- [instances](#instances)
  - [Covariant](#covariant)
  - [Filterable](#filterable)
  - [Invariant](#invariant)
  - [Traversable](#traversable)
  - [TraversableFilterable](#traversablefilterable)
- [mapping](#mapping)
  - [as](#as)
  - [flap](#flap)
  - [tupled](#tupled)
- [models](#models)
  - [ReadonlyRecord (interface)](#readonlyrecord-interface)
- [record](#record)
  - [pop](#pop)
- [traversing](#traversing)
  - [sequence](#sequence)
  - [traverse](#traverse)
  - [traverseTap](#traversetap)
- [type lambdas](#type-lambdas)
  - [ReadonlyRecordTypeLambda (interface)](#readonlyrecordtypelambda-interface)
- [utils](#utils)
  - [filterMap](#filtermap)
  - [get](#get)
  - [has](#has)
  - [map](#map)
  - [modifyOption](#modifyoption)
  - [remove](#remove)
  - [replaceOption](#replaceoption)
  - [size](#size)
  - [traverseFilter](#traversefilter)
  - [traversePartition](#traversepartition)

---

# constructors

## empty

Creates a new, empty record.

**Signature**

```ts
export declare const empty: <A>() => Record<string, A>
```

Added in v1.0.0

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

# conversions

## collect

Transforms the values of a `ReadonlyRecord` into an `Array` with a custom mapping function.

**Signature**

```ts
export declare const collect: {
  <A, B>(f: (key: string, a: A) => B): (self: ReadonlyRecord<A>) => B[]
  <A, B>(self: ReadonlyRecord<A>, f: (key: string, a: A) => B): B[]
}
```

**Example**

```ts
import { collect } from '@fp-ts/core/ReadonlyRecord'

const x = { a: 1, b: 2, c: 3 }
assert.deepStrictEqual(
  collect(x, (key, n) => [key, n]),
  [
    ['a', 1],
    ['b', 2],
    ['c', 3],
  ]
)
```

Added in v1.0.0

## toArray

Converts a `ReadonlyRecord` to an `Array` of key-value pairs.

**Signature**

```ts
export declare const toArray: <A>(self: ReadonlyRecord<A>) => [string, A][]
```

**Example**

```ts
import { toArray } from '@fp-ts/core/ReadonlyRecord'

const x = { a: 1, b: 2 }
assert.deepStrictEqual(toArray(x), [
  ['a', 1],
  ['b', 2],
])
```

Added in v1.0.0

# filtering

## compact

Given a `ReadonlyRecord` with `Option` values, returns a `Record` with only the `Some` values, with the same keys.

**Signature**

```ts
export declare const compact: <A>(self: ReadonlyRecord<Option<A>>) => Record<string, A>
```

**Example**

```ts
import { compact } from '@fp-ts/core/ReadonlyRecord'
import { some, none } from '@fp-ts/core/Option'

assert.deepStrictEqual(compact({ a: some(1), b: none(), c: some(2) }), { a: 1, c: 2 })
```

Added in v1.0.0

## filter

Selects properties from a record whose values match the given predicate.

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, A = C>(refinement: (a: A, key: string) => a is B): (
    self: ReadonlyRecord<C>
  ) => Record<string, B>
  <B extends A, A = B>(predicate: (a: A, key: string) => boolean): (self: ReadonlyRecord<B>) => Record<string, B>
  <C extends A, B extends A, A = C>(self: ReadonlyRecord<C>, refinement: (a: A, key: string) => a is B): Record<
    string,
    B
  >
  <B extends A, A = B>(self: ReadonlyRecord<B>, predicate: (a: A, key: string) => boolean): Record<string, B>
}
```

**Example**

```ts
import { filter } from '@fp-ts/core/ReadonlyRecord'

const x = { a: 1, b: 2, c: 3, d: 4 }
assert.deepStrictEqual(
  filter(x, (n) => n > 2),
  { c: 3, d: 4 }
)
```

Added in v1.0.0

## partition

Partitions a `ReadonlyRecord` into two separate `Record`s based on the result of a predicate function.

**Signature**

```ts
export declare const partition: {
  <C extends A, B extends A, A = C>(refinement: (a: A, key: string) => a is B): (
    self: ReadonlyRecord<C>
  ) => [Record<string, C>, Record<string, B>]
  <B extends A, A = B>(predicate: (a: A, key: string) => boolean): (
    self: ReadonlyRecord<B>
  ) => [Record<string, B>, Record<string, B>]
  <C extends A, B extends A, A = C>(self: ReadonlyRecord<C>, refinement: (a: A, key: string) => a is B): [
    Record<string, C>,
    Record<string, B>
  ]
  <B extends A, A = B>(self: ReadonlyRecord<B>, predicate: (a: A, key: string) => boolean): [
    Record<string, B>,
    Record<string, B>
  ]
}
```

**Example**

```ts
import { partition } from '@fp-ts/core/ReadonlyRecord'

assert.deepStrictEqual(
  partition({ a: 1, b: 3 }, (n) => n > 2),
  [{ a: 1 }, { b: 3 }]
)
```

Added in v1.0.0

## partitionMap

Partitions the elements of a `ReadonlyRecord` into two groups: those that match a predicate, and those that don't.

**Signature**

```ts
export declare const partitionMap: {
  <A, B, C>(f: (a: A, key: string) => Either<B, C>): (self: ReadonlyRecord<A>) => [Record<string, B>, Record<string, C>]
  <A, B, C>(self: ReadonlyRecord<A>, f: (a: A, key: string) => Either<B, C>): [Record<string, B>, Record<string, C>]
}
```

**Example**

```ts
import { partitionMap } from '@fp-ts/core/ReadonlyRecord'
import { left, right } from '@fp-ts/core/Either'

const x = { a: 1, b: 2, c: 3 }
const f = (n: number) => (n % 2 === 0 ? right(n) : left(n))
assert.deepStrictEqual(partitionMap(x, f), [{ a: 1, c: 3 }, { b: 2 }])
```

Added in v1.0.0

## separate

Partitions a `ReadonlyRecord` of `Either` values into two separate records,
one with the `Left` values and one with the `Right` values.

**Signature**

```ts
export declare const separate: <A, B>(self: ReadonlyRecord<Either<A, B>>) => [Record<string, A>, Record<string, B>]
```

**Example**

```ts
import { separate } from '@fp-ts/core/ReadonlyRecord'
import { left, right } from '@fp-ts/core/Either'

assert.deepStrictEqual(separate({ a: left('e'), b: right(1) }), [{ a: 'e' }, { b: 1 }])
```

Added in v1.0.0

## traverseFilterMap

**Signature**

```ts
export declare const traverseFilterMap: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <A, R, O, E, B>(f: (a: A) => Kind<F, R, O, E, Option<B>>): (
    self: ReadonlyRecord<A>
  ) => Kind<F, R, O, E, Record<string, B>>
  <A, R, O, E, B>(self: ReadonlyRecord<A>, f: (a: A) => Kind<F, R, O, E, Option<B>>): Kind<
    F,
    R,
    O,
    E,
    Record<string, B>
  >
}
```

Added in v1.0.0

## traversePartitionMap

**Signature**

```ts
export declare const traversePartitionMap: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <A, R, O, E, B, C>(f: (a: A) => Kind<F, R, O, E, Either<B, C>>): (
    self: ReadonlyRecord<A>
  ) => Kind<F, R, O, E, [Record<string, B>, Record<string, C>]>
  <A, R, O, E, B, C>(self: ReadonlyRecord<A>, f: (a: A) => Kind<F, R, O, E, Either<B, C>>): Kind<
    F,
    R,
    O,
    E,
    [Record<string, B>, Record<string, C>]
  >
}
```

Added in v1.0.0

# guards

## isEmpty

Determine if a `ReadonlyRecord` is empty.

**Signature**

```ts
export declare const isEmpty: <A>(self: ReadonlyRecord<A>) => self is Record<string, never>
```

**Example**

```ts
import { isEmpty } from '@fp-ts/core/ReadonlyRecord'

assert.deepStrictEqual(isEmpty({}), true)
assert.deepStrictEqual(isEmpty({ a: 3 }), false)
```

Added in v1.0.0

# instances

## Covariant

**Signature**

```ts
export declare const Covariant: covariant.Covariant<ReadonlyRecordTypeLambda>
```

Added in v1.0.0

## Filterable

**Signature**

```ts
export declare const Filterable: filterable.Filterable<ReadonlyRecordTypeLambda>
```

Added in v1.0.0

## Invariant

**Signature**

```ts
export declare const Invariant: invariant.Invariant<ReadonlyRecordTypeLambda>
```

Added in v1.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: traversable.Traversable<ReadonlyRecordTypeLambda>
```

Added in v1.0.0

## TraversableFilterable

**Signature**

```ts
export declare const TraversableFilterable: traversableFilterable.TraversableFilterable<ReadonlyRecordTypeLambda>
```

Added in v1.0.0

# mapping

## as

Maps the success value of this effect to the specified constant value.

**Signature**

```ts
export declare const as: {
  <B>(b: B): <_>(self: ReadonlyRecord<_>) => Record<string, B>
  <_, B>(self: ReadonlyRecord<_>, b: B): Record<string, B>
}
```

Added in v1.0.0

## flap

**Signature**

```ts
export declare const flap: {
  <A, B>(self: ReadonlyRecord<(a: A) => B>): (a: A) => Record<string, B>
  <A, B>(a: A, self: ReadonlyRecord<(a: A) => B>): Record<string, B>
}
```

Added in v1.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(self: ReadonlyRecord<A>) => Record<string, [A]>
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

# record

## pop

Retrieves the value of the property with the given `key` from a `ReadonlyRecord` and returns an `Option`
of a tuple with the value and the `ReadonlyRecord` with the removed property.
If the key is not present, returns `O.none`.

**Signature**

```ts
export declare const pop: {
  (key: string): <A>(self: ReadonlyRecord<A>) => Option<readonly [A, ReadonlyRecord<A>]>
  <A>(self: ReadonlyRecord<A>, key: string): Option<readonly [A, ReadonlyRecord<A>]>
}
```

**Example**

```ts
import { pop } from '@fp-ts/core/ReadonlyRecord'
import { some, none } from '@fp-ts/core/Option'

assert.deepStrictEqual(pop({ a: 1, b: 2 }, 'a'), some([1, { b: 2 }]))
assert.deepStrictEqual(pop({ a: 1, b: 2 }, 'c'), none())
```

Added in v1.0.0

# traversing

## sequence

Transforms a `ReadonlyRecord` of `Kind` values into a `Kind` of `Record` values.

**Signature**

```ts
export declare const sequence: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <R, O, E, A>(self: ReadonlyRecord<Kind<F, R, O, E, A>>) => Kind<F, R, O, E, Record<string, A>>
```

**Example**

```ts
import * as RR from '@fp-ts/core/ReadonlyRecord'
import { some, none, Applicative } from '@fp-ts/core/Option'

const sequence = RR.sequence(Applicative)

assert.deepStrictEqual(sequence({ a: some(1), b: some(2) }), some({ a: 1, b: 2 }))
assert.deepStrictEqual(sequence({ a: none(), b: some(2) }), none())
```

Added in v1.0.0

## traverse

Maps each entry of a `ReadonlyRecord` to an effect and collects the results into a new record.

**Signature**

```ts
export declare const traverse: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <A, R, O, E, B>(f: (a: A, key: string) => Kind<F, R, O, E, B>): (
    self: ReadonlyRecord<A>
  ) => Kind<F, R, O, E, Record<string, B>>
  <A, R, O, E, B>(self: ReadonlyRecord<A>, f: (a: A, key: string) => Kind<F, R, O, E, B>): Kind<
    F,
    R,
    O,
    E,
    Record<string, B>
  >
}
```

**Example**

```ts
import { traverse } from '@fp-ts/core/ReadonlyRecord'
import { some, none, Applicative } from '@fp-ts/core/Option'

assert.deepStrictEqual(
  traverse(Applicative)({ a: 1, b: 2 }, (n: number) => (n <= 2 ? some(n) : none())),
  some({ a: 1, b: 2 })
)
assert.deepStrictEqual(
  traverse(Applicative)({ a: 1, b: 2 }, (n: number) => (n >= 2 ? some(n) : none())),
  none()
)
```

Added in v1.0.0

## traverseTap

**Signature**

```ts
export declare const traverseTap: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <A, R, O, E, B>(f: (a: A) => Kind<F, R, O, E, B>): (self: ReadonlyRecord<A>) => Kind<F, R, O, E, Record<string, A>>
  <A, R, O, E, B>(self: ReadonlyRecord<A>, f: (a: A) => Kind<F, R, O, E, B>): Kind<F, R, O, E, Record<string, A>>
}
```

Added in v1.0.0

# type lambdas

## ReadonlyRecordTypeLambda (interface)

**Signature**

```ts
export interface ReadonlyRecordTypeLambda extends TypeLambda {
  readonly type: ReadonlyRecord<this['Target']>
}
```

Added in v1.0.0

# utils

## filterMap

Transforms a `ReadonlyRecord` into a `Record` by applying the function `f` to each key and value in the original `ReadonlyRecord`.
If the function returns `Some`, the key-value pair is included in the output `Record`.

**Signature**

```ts
export declare const filterMap: {
  <A, B>(f: (a: A, key: string) => Option<B>): (self: ReadonlyRecord<A>) => Record<string, B>
  <A, B>(self: ReadonlyRecord<A>, f: (a: A, key: string) => Option<B>): Record<string, B>
}
```

**Example**

```ts
import { filterMap } from '@fp-ts/core/ReadonlyRecord'
import { some, none } from '@fp-ts/core/Option'

const x = { a: 1, b: 2, c: 3 }
const f = (a: number, key: string) => (a > 2 ? some(a * 2) : none())
assert.deepStrictEqual(filterMap(x, f), { c: 6 })
```

Added in v1.0.0

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

## has

Check if a given `key` exists in a `ReadonlyRecord`.

**Signature**

```ts
export declare const has: {
  (key: string): <A>(self: ReadonlyRecord<A>) => boolean
  <A>(self: ReadonlyRecord<A>, key: string): boolean
}
```

**Example**

```ts
import { has } from '@fp-ts/core/ReadonlyRecord'

assert.deepStrictEqual(has({ a: 1, b: 2 }, 'a'), true)
assert.deepStrictEqual(has({ a: 1, b: 2 }, 'c'), false)
```

Added in v1.0.0

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

## remove

Removes a key from a `ReadonlyRecord` and returns a new `Record`

**Signature**

```ts
export declare const remove: {
  (key: string): <A>(self: ReadonlyRecord<A>) => Record<string, A>
  <A>(self: ReadonlyRecord<A>, key: string): Record<string, A>
}
```

**Example**

```ts
import { remove } from '@fp-ts/core/ReadonlyRecord'

assert.deepStrictEqual(remove({ a: 1, b: 2 }, 'a'), { b: 2 })
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

## size

Returns the number of key/value pairs in a `ReadonlyRecord`.

**Signature**

```ts
export declare const size: <A>(self: ReadonlyRecord<A>) => number
```

**Example**

```ts
import { size } from '@fp-ts/core/ReadonlyRecord'

assert.deepStrictEqual(size({ a: 'a', b: 1, c: true }), 3)
```

Added in v1.0.0

## traverseFilter

Filter values inside a context.

**Signature**

```ts
export declare const traverseFilter: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <B extends A, R, O, E, A = B>(predicate: (a: A) => Kind<F, R, O, E, boolean>): (
    self: ReadonlyRecord<B>
  ) => Kind<F, R, O, E, Record<string, B>>
  <B extends A, R, O, E, A = B>(self: ReadonlyRecord<B>, predicate: (a: A) => Kind<F, R, O, E, boolean>): Kind<
    F,
    R,
    O,
    E,
    Record<string, B>
  >
}
```

Added in v1.0.0

## traversePartition

**Signature**

```ts
export declare const traversePartition: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <B extends A, R, O, E, A = B>(predicate: (a: A) => Kind<F, R, O, E, boolean>): (
    self: ReadonlyRecord<B>
  ) => Kind<F, R, O, E, [Record<string, B>, Record<string, B>]>
  <B extends A, R, O, E, A = B>(self: ReadonlyRecord<B>, predicate: (a: A) => Kind<F, R, O, E, boolean>): Kind<
    F,
    R,
    O,
    E,
    [Record<string, B>, Record<string, B>]
  >
}
```

Added in v1.0.0
