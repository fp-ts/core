---
title: Bigint.ts
nav_order: 1
parent: Modules
---

## Bigint overview

This module provides utility functions and type class instances for working with the `bigint` type in TypeScript.
It includes functions for basic arithmetic operations, as well as type class instances for
`Equivalence`, `Order`, `Semigroup`, and `Monoid`.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [guards](#guards)
  - [isBigint](#isbigint)
- [instances](#instances)
  - [Equivalence](#equivalence)
  - [MonoidMultiply](#monoidmultiply)
  - [MonoidSum](#monoidsum)
  - [Order](#order)
  - [SemigroupMultiply](#semigroupmultiply)
  - [SemigroupSum](#semigroupsum)
- [utils](#utils)
  - [decrement](#decrement)
  - [divide](#divide)
  - [increment](#increment)
  - [multiply](#multiply)
  - [subtract](#subtract)
  - [sum](#sum)

---

# guards

## isBigint

**Signature**

```ts
export declare const isBigint: (u: unknown) => u is bigint
```

Added in v1.0.0

# instances

## Equivalence

**Signature**

```ts
export declare const Equivalence: any
```

Added in v1.0.0

## MonoidMultiply

`bigint` monoid under multiplication.

The `empty` value is `1n`.

**Signature**

```ts
export declare const MonoidMultiply: any
```

Added in v1.0.0

## MonoidSum

`bigint` monoid under addition.

The `empty` value is `0n`.

**Signature**

```ts
export declare const MonoidSum: any
```

Added in v1.0.0

## Order

**Signature**

```ts
export declare const Order: any
```

Added in v1.0.0

## SemigroupMultiply

`bigint` semigroup under multiplication.

**Signature**

```ts
export declare const SemigroupMultiply: any
```

Added in v1.0.0

## SemigroupSum

`bigint` semigroup under addition.

**Signature**

```ts
export declare const SemigroupSum: any
```

Added in v1.0.0

# utils

## decrement

**Signature**

```ts
export declare const decrement: (n: bigint) => bigint
```

Added in v1.0.0

## divide

**Signature**

```ts
export declare const divide: (that: bigint) => (self: bigint) => bigint
```

Added in v1.0.0

## increment

**Signature**

```ts
export declare const increment: (n: bigint) => bigint
```

Added in v1.0.0

## multiply

**Signature**

```ts
export declare const multiply: (that: bigint) => (self: bigint) => bigint
```

Added in v1.0.0

## subtract

**Signature**

```ts
export declare const subtract: (that: bigint) => (self: bigint) => bigint
```

Added in v1.0.0

## sum

**Signature**

```ts
export declare const sum: (that: bigint) => (self: bigint) => bigint
```

Added in v1.0.0
