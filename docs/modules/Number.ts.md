---
title: Number.ts
nav_order: 8
parent: Modules
---

## Number overview

This module provides utility functions and type class instances for working with the `number` type in TypeScript.
It includes functions for basic arithmetic operations, as well as type class instances for
`Equivalence`, `Order`, `Semigroup`, and `Monoid`.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [algebraic operations](#algebraic-operations)
  - [divide](#divide)
  - [multiply](#multiply)
  - [multiplyAll](#multiplyall)
  - [subtract](#subtract)
  - [sum](#sum)
  - [sumAll](#sumall)
- [guards](#guards)
  - [isNumber](#isnumber)
- [instances](#instances)
  - [Bounded](#bounded)
  - [Equivalence](#equivalence)
  - [MonoidMax](#monoidmax)
  - [MonoidMin](#monoidmin)
  - [MonoidMultiply](#monoidmultiply)
  - [MonoidSum](#monoidsum)
  - [Order](#order)
  - [SemigroupMax](#semigroupmax)
  - [SemigroupMin](#semigroupmin)
  - [SemigroupMultiply](#semigroupmultiply)
  - [SemigroupSum](#semigroupsum)
- [utils](#utils)
  - [decrement](#decrement)
  - [increment](#increment)
  - [sign](#sign)

---

# algebraic operations

## divide

**Signature**

```ts
export declare const divide: { (that: number): (self: number) => number; (self: number, that: number): number }
```

**Example**

```ts
import { divide } from '@fp-ts/core/Number'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe(6, divide(3)), 2)
```

Added in v1.0.0

## multiply

**Signature**

```ts
export declare const multiply: { (that: number): (self: number) => number; (self: number, that: number): number }
```

**Example**

```ts
import { multiply } from '@fp-ts/core/Number'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe(2, multiply(3)), 6)
```

Added in v1.0.0

## multiplyAll

**Signature**

```ts
export declare const multiplyAll: (collection: Iterable<number>) => number
```

Added in v1.0.0

## subtract

**Signature**

```ts
export declare const subtract: { (that: number): (self: number) => number; (self: number, that: number): number }
```

**Example**

```ts
import { subtract } from '@fp-ts/core/Number'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe(2, subtract(3)), -1)
```

Added in v1.0.0

## sum

**Signature**

```ts
export declare const sum: { (that: number): (self: number) => number; (self: number, that: number): number }
```

**Example**

```ts
import { sum } from '@fp-ts/core/Number'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe(2, sum(3)), 5)
```

Added in v1.0.0

## sumAll

**Signature**

```ts
export declare const sumAll: (collection: Iterable<number>) => number
```

Added in v1.0.0

# guards

## isNumber

Tests if a value is a `number`.

**Signature**

```ts
export declare const isNumber: (input: unknown) => input is number
```

**Example**

```ts
import { isNumber } from '@fp-ts/core/Number'

assert.deepStrictEqual(isNumber(2), true)
assert.deepStrictEqual(isNumber('2'), false)
```

Added in v1.0.0

# instances

## Bounded

**Signature**

```ts
export declare const Bounded: bounded.Bounded<number>
```

Added in v1.0.0

## Equivalence

**Signature**

```ts
export declare const Equivalence: equivalence.Equivalence<number>
```

Added in v1.0.0

## MonoidMax

**Signature**

```ts
export declare const MonoidMax: monoid.Monoid<number>
```

Added in v1.0.0

## MonoidMin

**Signature**

```ts
export declare const MonoidMin: monoid.Monoid<number>
```

Added in v1.0.0

## MonoidMultiply

`number` monoid under multiplication.

The `empty` value is `1`.

**Signature**

```ts
export declare const MonoidMultiply: monoid.Monoid<number>
```

Added in v1.0.0

## MonoidSum

`number` monoid under addition.

The `empty` value is `0`.

**Signature**

```ts
export declare const MonoidSum: monoid.Monoid<number>
```

Added in v1.0.0

## Order

**Signature**

```ts
export declare const Order: order.Order<number>
```

Added in v1.0.0

## SemigroupMax

**Signature**

```ts
export declare const SemigroupMax: semigroup.Semigroup<number>
```

Added in v1.0.0

## SemigroupMin

**Signature**

```ts
export declare const SemigroupMin: semigroup.Semigroup<number>
```

Added in v1.0.0

## SemigroupMultiply

`number` semigroup under multiplication.

**Signature**

```ts
export declare const SemigroupMultiply: semigroup.Semigroup<number>
```

**Example**

```ts
import { SemigroupMultiply } from '@fp-ts/core/Number'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(SemigroupMultiply.combine(2, 3), 6)
```

Added in v1.0.0

## SemigroupSum

`number` semigroup under addition.

**Signature**

```ts
export declare const SemigroupSum: semigroup.Semigroup<number>
```

**Example**

```ts
import { SemigroupSum } from '@fp-ts/core/Number'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(SemigroupSum.combine(2, 3), 5)
```

Added in v1.0.0

# utils

## decrement

**Signature**

```ts
export declare const decrement: (n: number) => number
```

**Example**

```ts
import { decrement } from '@fp-ts/core/Number'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe(3, decrement), 2)
```

Added in v1.0.0

## increment

**Signature**

```ts
export declare const increment: (n: number) => number
```

**Example**

```ts
import { increment } from '@fp-ts/core/Number'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe(2, increment), 3)
```

Added in v1.0.0

## sign

**Signature**

```ts
export declare const sign: (n: number) => Ordering
```

Added in v1.0.0
