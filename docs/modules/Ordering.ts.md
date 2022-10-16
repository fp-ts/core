---
title: Ordering.ts
nav_order: 22
parent: Modules
---

## Ordering overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [Monoid](#monoid)
  - [Semigroup](#semigroup)
- [pattern matching](#pattern-matching)
  - [match](#match)
- [type class](#type-class)
  - [Ordering (type alias)](#ordering-type-alias)
- [utils](#utils)
  - [reverse](#reverse)
  - [sign](#sign)

---

# instances

## Monoid

**Signature**

```ts
export declare const Monoid: any
```

Added in v1.0.0

## Semigroup

**Signature**

```ts
export declare const Semigroup: any
```

Added in v1.0.0

# pattern matching

## match

**Signature**

```ts
export declare const match: <A, B, C = B>(
  onLessThan: () => A,
  onEqual: () => B,
  onGreaterThan: () => C
) => (o: Ordering) => A | B | C
```

Added in v1.0.0

# type class

## Ordering (type alias)

**Signature**

```ts
export type Ordering = -1 | 0 | 1
```

Added in v1.0.0

# utils

## reverse

**Signature**

```ts
export declare const reverse: (o: Ordering) => Ordering
```

Added in v1.0.0

## sign

**Signature**

```ts
export declare const sign: (n: number) => Ordering
```

Added in v1.0.0
