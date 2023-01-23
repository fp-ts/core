---
title: Struct.ts
nav_order: 15
parent: Modules
---

## Struct overview

This module provides utility functions for working with structs in TypeScript.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [getEquivalence](#getequivalence)
  - [getMonoid](#getmonoid)
  - [getOrder](#getorder)
  - [getSemigroup](#getsemigroup)
  - [nonEmptyProduct](#nonemptyproduct)
  - [omit](#omit)
  - [pick](#pick)
  - [product](#product)

---

# utils

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

## omit

Create a new object by omitting properties of an existing object.

**Signature**

```ts
export declare const omit: <S, Keys extends readonly [keyof S, ...(keyof S)[]]>(
  ...keys: Keys
) => (s: S) => { [K in Exclude<keyof S, Keys[number]>]: S[K] }
```

Added in v1.0.0

## pick

Create a new object by picking properties of an existing object.

**Signature**

```ts
export declare const pick: <S, Keys extends readonly [keyof S, ...(keyof S)[]]>(
  ...keys: Keys
) => (s: S) => { [K in Keys[number]]: S[K] }
```

Added in v1.0.0

## product

**Signature**

```ts
export declare const product: any
```

Added in v1.0.0
