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

- [algebraic operations](#algebraic-operations)
  - [divide](#divide)
  - [multiply](#multiply)
  - [subtract](#subtract)
  - [sum](#sum)
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
  - [increment](#increment)

---

# algebraic operations

## divide

**Signature**

```ts
export declare const divide: { (that: bigint): (self: bigint) => bigint; (self: bigint, that: bigint): bigint }
```

Added in v1.0.0

## multiply

**Signature**

```ts
export declare const multiply: { (that: bigint): (self: bigint) => bigint; (self: bigint, that: bigint): bigint }
```

Added in v1.0.0

## subtract

**Signature**

```ts
export declare const subtract: { (that: bigint): (self: bigint) => bigint; (self: bigint, that: bigint): bigint }
```

Added in v1.0.0

## sum

**Signature**

```ts
export declare const sum: { (that: bigint): (self: bigint) => bigint; (self: bigint, that: bigint): bigint }
```

Added in v1.0.0

# guards

## isBigint

Tests if a value is a `bigint`.

**Signature**

```ts
export declare const isBigint: (u: unknown) => u is bigint
```

**Example**

```ts
import { isBigint } from '@fp-ts/core/Bigint'

assert.deepStrictEqual(isBigint(1n), true)
assert.deepStrictEqual(isBigint(1), false)
```

Added in v1.0.0

# instances

## Equivalence

**Signature**

```ts
export declare const Equivalence: equivalence.Equivalence<bigint>
```

Added in v1.0.0

## MonoidMultiply

`bigint` monoid under multiplication.

The `empty` value is `1n`.

**Signature**

```ts
export declare const MonoidMultiply: monoid.Monoid<bigint>
```

Added in v1.0.0

## MonoidSum

`bigint` monoid under addition.

The `empty` value is `0n`.

**Signature**

```ts
export declare const MonoidSum: monoid.Monoid<bigint>
```

Added in v1.0.0

## Order

**Signature**

```ts
export declare const Order: order.Order<bigint>
```

Added in v1.0.0

## SemigroupMultiply

`bigint` semigroup under multiplication.

**Signature**

```ts
export declare const SemigroupMultiply: semigroup.Semigroup<bigint>
```

Added in v1.0.0

## SemigroupSum

`bigint` semigroup under addition.

**Signature**

```ts
export declare const SemigroupSum: semigroup.Semigroup<bigint>
```

Added in v1.0.0

# utils

## decrement

**Signature**

```ts
export declare const decrement: (n: bigint) => bigint
```

Added in v1.0.0

## increment

**Signature**

```ts
export declare const increment: (n: bigint) => bigint
```

Added in v1.0.0
