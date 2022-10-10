---
title: typeclasses/Bounded.ts
nav_order: 46
parent: Modules
---

## Bounded overview

The `Bounded` type class represents totally ordered types that have an upper and lower boundary.

Instances should satisfy the following law in addition to the `Ord` laws:

- Bounded: `bottom <= a <= top`

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Bounded (interface)](#bounded-interface)
- [utils](#utils)
  - [clamp](#clamp)
  - [reverse](#reverse)

---

# model

## Bounded (interface)

**Signature**

```ts
export interface Bounded<A> extends Ord<A> {
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
export declare const clamp: <A>(B: Bounded<A>) => any
```

Added in v3.0.0

## reverse

Reverses the `Ord` of a `Bounded` and flips `top` and `bottom` values.

**Signature**

```ts
export declare const reverse: <A>(B: Bounded<A>) => Bounded<A>
```

Added in v3.0.0
