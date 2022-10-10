---
title: number.ts
nav_order: 15
parent: Modules
---

## number overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [Bounded](#bounded)
  - [Eq](#eq)
  - [MonoidMultiply](#monoidmultiply)
  - [MonoidSum](#monoidsum)
  - [Ord](#ord)
  - [SemigroupMultiply](#semigroupmultiply)
  - [SemigroupSum](#semigroupsum)
  - [Show](#show)
- [refinements](#refinements)
  - [isNumber](#isnumber)
- [utils](#utils)
  - [multiply](#multiply)
  - [multiplyAll](#multiplyall)
  - [sub](#sub)
  - [sum](#sum)
  - [sumAll](#sumall)

---

# instances

## Bounded

**Signature**

```ts
export declare const Bounded: any
```

Added in v3.0.0

## Eq

**Signature**

```ts
export declare const Eq: any
```

Added in v3.0.0

## MonoidMultiply

`number` monoid under multiplication.

The `empty` value is `1`.

**Signature**

```ts
export declare const MonoidMultiply: any
```

Added in v3.0.0

## MonoidSum

`number` monoid under addition.

The `empty` value is `0`.

**Signature**

```ts
export declare const MonoidSum: any
```

Added in v3.0.0

## Ord

**Signature**

```ts
export declare const Ord: any
```

Added in v3.0.0

## SemigroupMultiply

`number` semigroup under multiplication.

**Signature**

```ts
export declare const SemigroupMultiply: any
```

**Example**

```ts
import { SemigroupMultiply } from '@fp-ts/core/number'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe(2, SemigroupMultiply.combine(3)), 6)
```

Added in v3.0.0

## SemigroupSum

`number` semigroup under addition.

**Signature**

```ts
export declare const SemigroupSum: any
```

**Example**

```ts
import { SemigroupSum } from '@fp-ts/core/number'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe(2, SemigroupSum.combine(3)), 5)
```

Added in v3.0.0

## Show

**Signature**

```ts
export declare const Show: any
```

Added in v3.0.0

# refinements

## isNumber

**Signature**

```ts
export declare const isNumber: any
```

Added in v3.0.0

# utils

## multiply

**Signature**

```ts
export declare const multiply: (that: number) => (self: number) => number
```

Added in v3.0.0

## multiplyAll

**Signature**

```ts
export declare const multiplyAll: (collection: Iterable<number>) => number
```

Added in v3.0.0

## sub

**Signature**

```ts
export declare const sub: (that: number) => (self: number) => number
```

Added in v3.0.0

## sum

**Signature**

```ts
export declare const sum: (that: number) => (self: number) => number
```

Added in v3.0.0

## sumAll

**Signature**

```ts
export declare const sumAll: (collection: Iterable<number>) => number
```

Added in v3.0.0
