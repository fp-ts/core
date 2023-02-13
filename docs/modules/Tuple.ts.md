---
title: Tuple.ts
nav_order: 19
parent: Modules
---

## Tuple overview

This module provides utility functions for working with tuples in TypeScript.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [getEquivalence](#getequivalence)
  - [getMonoid](#getmonoid)
  - [getOrder](#getorder)
  - [getSemigroup](#getsemigroup)
- [constructors](#constructors)
  - [tuple](#tuple)
- [getters](#getters)
  - [getFirst](#getfirst)
  - [getSecond](#getsecond)
- [instances](#instances)
  - [Bicovariant](#bicovariant)
- [mapping](#mapping)
  - [bimap](#bimap)
  - [mapFirst](#mapfirst)
  - [mapSecond](#mapsecond)
- [type lambdas](#type-lambdas)
  - [TupleTypeLambda (interface)](#tupletypelambda-interface)
- [utils](#utils)
  - [appendElement](#appendelement)
  - [swap](#swap)

---

# combinators

## getEquivalence

Given a tuple of `Equivalence`s returns a new `Equivalence` that compares values of a tuple
by applying each `Equivalence` to the corresponding element of the tuple.

**Signature**

```ts
export declare const getEquivalence: <T extends readonly equivalence.Equivalence<any>[]>(
  ...predicates: T
) => equivalence.Equivalence<
  Readonly<{ [I in keyof T]: [T[I]] extends [equivalence.Equivalence<infer A>] ? A : never }>
>
```

Added in v1.0.0

## getMonoid

This function creates and returns a new `Monoid` for a tuple of values based on the given `Monoid`s for each element in the tuple.
The returned `Monoid` combines two tuples of the same type by applying the corresponding `Monoid` passed as arguments to each element in the tuple.

The `empty` value of the returned `Monoid` is the tuple of `empty` values of the input `Monoid`s.

It is useful when you need to combine two tuples of the same type and you have a specific way of combining each element of the tuple.

**Signature**

```ts
export declare const getMonoid: <T extends readonly monoid.Monoid<any>[]>(
  ...elements: T
) => monoid.Monoid<{ readonly [I in keyof T]: [T[I]] extends [monoid.Monoid<infer A>] ? A : never }>
```

Added in v1.0.0

## getOrder

This function creates and returns a new `Order` for a tuple of values based on the given `Order`s for each element in the tuple.
The returned `Order` compares two tuples of the same type by applying the corresponding `Order` to each element in the tuple.
It is useful when you need to compare two tuples of the same type and you have a specific way of comparing each element
of the tuple.

**Signature**

```ts
export declare const getOrder: <T extends readonly order.Order<any>[]>(
  ...elements: T
) => order.Order<{ [I in keyof T]: [T[I]] extends [order.Order<infer A>] ? A : never }>
```

Added in v1.0.0

## getSemigroup

This function creates and returns a new `Semigroup` for a tuple of values based on the given `Semigroup`s for each element in the tuple.
The returned `Semigroup` combines two tuples of the same type by applying the corresponding `Semigroup` passed as arguments to each element in the tuple.

It is useful when you need to combine two tuples of the same type and you have a specific way of combining each element of the tuple.

**Signature**

```ts
export declare const getSemigroup: <T extends readonly semigroup.Semigroup<any>[]>(
  ...elements: T
) => semigroup.Semigroup<{ readonly [I in keyof T]: [T[I]] extends [semigroup.Semigroup<infer A>] ? A : never }>
```

Added in v1.0.0

# constructors

## tuple

Constructs a new tuple from the provided values.

**Signature**

```ts
export declare const tuple: <A extends readonly any[]>(...elements: A) => A
```

**Example**

```ts
import { tuple } from '@fp-ts/core/Tuple'

assert.deepStrictEqual(tuple(1, 'hello', true), [1, 'hello', true])
```

Added in v1.0.0

# getters

## getFirst

Return the first element of a tuple.

**Signature**

```ts
export declare const getFirst: <L, R>(self: readonly [L, R]) => L
```

**Example**

```ts
import { getFirst } from '@fp-ts/core/Tuple'

assert.deepStrictEqual(getFirst(['hello', 42]), 'hello')
```

Added in v1.0.0

## getSecond

Return the second element of a tuple.

**Signature**

```ts
export declare const getSecond: <L, R>(self: readonly [L, R]) => R
```

**Example**

```ts
import { getSecond } from '@fp-ts/core/Tuple'

assert.deepStrictEqual(getSecond(['hello', 42]), 42)
```

Added in v1.0.0

# instances

## Bicovariant

**Signature**

```ts
export declare const Bicovariant: bicovariant.Bicovariant<TupleTypeLambda>
```

Added in v1.0.0

# mapping

## bimap

Transforms both elements of a tuple using the given functions.

**Signature**

```ts
export declare const bimap: {
  <L1, L2, R1, R2>(f: (e: L1) => L2, g: (a: R1) => R2): (self: readonly [L1, R1]) => [L2, R2]
  <L1, R1, L2, R2>(self: readonly [L1, R1], f: (e: L1) => L2, g: (a: R1) => R2): [L2, R2]
}
```

**Example**

```ts
import { bimap } from '@fp-ts/core/Tuple'

assert.deepStrictEqual(
  bimap(
    ['hello', 42],
    (s) => s.toUpperCase(),
    (n) => n.toString()
  ),
  ['HELLO', '42']
)
```

Added in v1.0.0

## mapFirst

Transforms the first component of a tuple using a given function.

**Signature**

```ts
export declare const mapFirst: {
  <L1, L2>(f: (left: L1) => L2): <R>(self: readonly [L1, R]) => [L2, R]
  <L1, R, L2>(self: readonly [L1, R], f: (left: L1) => L2): [L2, R]
}
```

**Example**

```ts
import { mapFirst } from '@fp-ts/core/Tuple'

assert.deepStrictEqual(
  mapFirst(['hello', 42], (s) => s.toUpperCase()),
  ['HELLO', 42]
)
```

Added in v1.0.0

## mapSecond

Transforms the second component of a tuple using a given function.

**Signature**

```ts
export declare const mapSecond: {
  <R1, R2>(f: (right: R1) => R2): <L>(self: readonly [L, R1]) => [L, R2]
  <L, R1, R2>(self: readonly [L, R1], f: (right: R1) => R2): [L, R2]
}
```

**Example**

```ts
import { mapSecond } from '@fp-ts/core/Tuple'

assert.deepStrictEqual(
  mapSecond(['hello', 42], (n) => n.toString()),
  ['hello', '42']
)
```

Added in v1.0.0

# type lambdas

## TupleTypeLambda (interface)

**Signature**

```ts
export interface TupleTypeLambda extends TypeLambda {
  readonly type: [this['Out1'], this['Target']]
}
```

Added in v1.0.0

# utils

## appendElement

Appends an element to the end of a tuple.

**Signature**

```ts
export declare const appendElement: {
  <B>(that: B): <A extends readonly unknown[]>(self: A) => [...A, B]
  <A extends readonly unknown[], B>(self: A, that: B): [...A, B]
}
```

Added in v1.0.0

## swap

Swaps the two elements of a tuple.

**Signature**

```ts
export declare const swap: <L, R>(self: readonly [L, R]) => [R, L]
```

**Example**

```ts
import { swap } from '@fp-ts/core/Tuple'

assert.deepStrictEqual(swap(['hello', 42]), [42, 'hello'])
```

Added in v1.0.0
