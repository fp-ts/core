---
title: Bounded.ts
nav_order: 2
parent: Modules
---

## Bounded overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [fromSortable](#fromsortable)
- [type class](#type-class)
  - [Bounded (interface)](#bounded-interface)
- [utils](#utils)
  - [clamp](#clamp)
  - [reverse](#reverse)

---

# constructors

## fromSortable

**Signature**

```ts
export declare const fromSortable: <A>(Sortable: compare.Sortable<A>, minimum: A, maximum: A) => Bounded<A>
```

Added in v1.0.0

# type class

## Bounded (interface)

**Signature**

```ts
export interface Bounded<A> extends Sortable<A> {
  readonly minimum: A
  readonly maximum: A
}
```

Added in v1.0.0

# utils

## clamp

Clamp a value between `minimum` and `maximum` values.

**Signature**

```ts
export declare const clamp: <A>(Bounded: Bounded<A>) => (a: A) => A
```

Added in v1.0.0

## reverse

Reverses the `Ord` of a `Bounded` and flips `maximum` and `minimum` values.

**Signature**

```ts
export declare const reverse: <A>(Bounded: Bounded<A>) => Bounded<A>
```

Added in v1.0.0
