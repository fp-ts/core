---
title: typeclasses/Ordering.ts
nav_order: 26
parent: Modules
---

## Ordering overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [Eq](#eq)
  - [Monoid](#monoid)
  - [Semigroup](#semigroup)
- [model](#model)
  - [Ordering (type alias)](#ordering-type-alias)
- [pattern matching](#pattern-matching)
  - [match](#match)
- [utils](#utils)
  - [reverse](#reverse)
  - [sign](#sign)

---

# instances

## Eq

**Signature**

```ts
export declare const Eq: any
```

Added in v3.0.0

## Monoid

**Signature**

```ts
export declare const Monoid: any
```

Added in v3.0.0

## Semigroup

**Signature**

```ts
export declare const Semigroup: any
```

Added in v3.0.0

# model

## Ordering (type alias)

**Signature**

```ts
export type Ordering = -1 | 0 | 1
```

Added in v3.0.0

# pattern matching

## match

**Signature**

```ts
export declare const match: <A, B, C = B>(
  onLessThan: any,
  onEqual: any,
  onGreaterThan: any
) => (o: Ordering) => A | B | C
```

Added in v3.0.0

# utils

## reverse

**Signature**

```ts
export declare const reverse: (o: Ordering) => Ordering
```

Added in v3.0.0

## sign

**Signature**

```ts
export declare const sign: (n: number) => Ordering
```

Added in v3.0.0
