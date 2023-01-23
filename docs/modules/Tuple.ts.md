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
- [utils](#utils)
  - [element](#element)
  - [getEquivalence](#getequivalence)
  - [getMonoid](#getmonoid)
  - [getOrder](#getorder)
  - [getSemigroup](#getsemigroup)
  - [nonEmptyProduct](#nonemptyproduct)
  - [product](#product)

---

# constructors

## tuple

**Signature**

```ts
export declare const tuple: <A extends readonly any[]>(...elements: A) => A
```

Added in v1.0.0

# utils

## element

Appends an element to the end of a tuple.

**Signature**

```ts
export declare const element: <B>(
  that: readonly B[]
) => <A extends readonly unknown[]>(self: readonly A[]) => [...A, B][]
```

Added in v1.0.0

## getEquivalence

**Signature**

```ts
export declare const getEquivalence: any
```

Added in v1.0.0

## getMonoid

**Signature**

```ts
export declare const getMonoid: any
```

Added in v1.0.0

## getOrder

**Signature**

```ts
export declare const getOrder: any
```

Added in v1.0.0

## getSemigroup

**Signature**

```ts
export declare const getSemigroup: any
```

Added in v1.0.0

## nonEmptyProduct

**Signature**

```ts
export declare const nonEmptyProduct: any
```

Added in v1.0.0

## product

**Signature**

```ts
export declare const product: any
```

Added in v1.0.0
