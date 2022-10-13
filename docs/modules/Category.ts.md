---
title: Category.ts
nav_order: 5
parent: Modules
---

## Category overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Category (interface)](#category-interface)

---

# type class

## Category (interface)

**Signature**

```ts
export interface Category<F extends TypeLambda> extends Compose<F> {
  readonly id: <S, R>() => Kind<F, S, R, never, never, R>
}
```

Added in v3.0.0
