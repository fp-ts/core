---
title: Bounded.ts
nav_order: 4
parent: Modules
---

## Bounded overview

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
export interface Bounded<A> extends Compare<A> {
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
