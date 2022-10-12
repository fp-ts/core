---
title: Succeed.ts
nav_order: 29
parent: Modules
---

## Succeed overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Succeed (interface)](#succeed-interface)
- [utils](#utils)
  - [idKleisli](#idkleisli)

---

# model

## Succeed (interface)

**Signature**

```ts
export interface Succeed<F extends TypeLambda> extends TypeClass<F> {
  readonly succeed: <A, S>(a: A) => Kind<F, S, unknown, never, never, A>
}
```

Added in v3.0.0

# utils

## idKleisli

**Signature**

```ts
export declare const idKleisli: <F extends any>(Succeed: Succeed<F>) => any
```

Added in v3.0.0
