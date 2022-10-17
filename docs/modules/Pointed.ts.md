---
title: Pointed.ts
nav_order: 24
parent: Modules
---

## Pointed overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Pointed (interface)](#pointed-interface)

---

# type class

## Pointed (interface)

**Signature**

```ts
export interface Pointed<F extends TypeLambda> extends TypeClass<F> {
  readonly of: <A, S>(a: A) => Kind<F, S, unknown, never, never, A>
}
```

Added in v1.0.0
