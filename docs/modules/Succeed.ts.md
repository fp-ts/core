---
title: Succeed.ts
nav_order: 27
parent: Modules
---

## Succeed overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Succeed (interface)](#succeed-interface)

---

# type class

## Succeed (interface)

**Signature**

```ts
export interface Succeed<F extends TypeLambda> extends TypeClass<F> {
  readonly succeed: <A, S>(a: A) => Kind<F, S, unknown, never, never, A>
}
```

Added in v3.0.0
