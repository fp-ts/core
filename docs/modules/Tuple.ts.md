---
title: Tuple.ts
nav_order: 18
parent: Modules
---

## Tuple overview

This module provides utility functions for working with tuples in TypeScript.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [tuple](#tuple)
- [instances](#instances)
  - [getEquivalence](#getequivalence)
  - [getMonoid](#getmonoid)
  - [getOrder](#getorder)
  - [getSemigroup](#getsemigroup)
- [utils](#utils)
  - [appendElement](#appendelement)

---

# constructors

## tuple

**Signature**

```ts
export declare const tuple: <A extends readonly any[]>(...elements: A) => A
```

Added in v1.0.0

# instances

## getEquivalence

Given a tuple of `Equivalence`s returns a new `Equivalence` that compares values of a tuple
by applying each `Equivalence` to the corresponding element of the tuple.

**Signature**

```ts
export declare const getEquivalence: any
```

Added in v1.0.0

## getMonoid

This function creates and returns a new `Monoid` for a tuple of values based on the given `Monoid`s for each element in the tuple.
The returned `Monoid` combines two tuples of the same type by applying the corresponding `Monoid` passed as arguments to each element in the tuple.

The `empty` value of the returned `Monoid` is the tuple of `empty` values of the input `Monoid`s.

It is useful when you need to combine two tuples of the same type and you have a specific way of combining each element of the tuple.

**Signature**

```ts
export declare const getMonoid: any
```

Added in v1.0.0

## getOrder

This function creates and returns a new `Order` for a tuple of values based on the given `Order`s for each element in the tuple.
The returned `Order` compares two tuples of the same type by applying the corresponding `Order` to each element in the tuple.
It is useful when you need to compare two tuples of the same type and you have a specific way of comparing each element
of the tuple.

**Signature**

```ts
export declare const getOrder: any
```

Added in v1.0.0

## getSemigroup

This function creates and returns a new `Semigroup` for a tuple of values based on the given `Semigroup`s for each element in the tuple.
The returned `Semigroup` combines two tuples of the same type by applying the corresponding `Semigroup` passed as arguments to each element in the tuple.

It is useful when you need to combine two tuples of the same type and you have a specific way of combining each element of the tuple.

**Signature**

```ts
export declare const getSemigroup: any
```

Added in v1.0.0

# utils

## appendElement

Appends an element to the end of a tuple.

**Signature**

```ts
export declare const appendElement: <B>(that: B) => <A extends readonly unknown[]>(self: A) => [...A, B]
```

Added in v1.0.0
