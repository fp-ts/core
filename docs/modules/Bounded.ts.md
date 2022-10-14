---
title: Bounded.ts
nav_order: 5
parent: Modules
---

## Bounded overview

Added in v3.0.0

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
export declare const fromSortable: <A>(Sortable: any, top: A, bottom: A) => Bounded<A>
```

Added in v3.0.0

# type class

## Bounded (interface)

**Signature**

```ts
export interface Bounded<A> extends Sortable<A> {
  readonly top: A
  readonly bottom: A
}
```

Added in v3.0.0

# utils

## clamp

Clamp a value between `bottom` and `top` values.

**Signature**

```ts
export declare const clamp: <A>(B: Bounded<A>) => (a: A) => A
```

Added in v3.0.0

## reverse

Reverses the `Ord` of a `Bounded` and flips `top` and `bottom` values.

**Signature**

```ts
export declare const reverse: <A>(Bounded: Bounded<A>) => Bounded<A>
```

Added in v3.0.0
