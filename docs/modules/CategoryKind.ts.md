---
title: CategoryKind.ts
nav_order: 5
parent: Modules
---

## CategoryKind overview

Kleisli categories.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [CategoryKind (interface)](#categorykind-interface)

---

# type class

## CategoryKind (interface)

**Signature**

```ts
export interface CategoryKind<F extends TypeLambda> extends KleisliComposable<F> {
  readonly idKind: <A>() => <S>(a: A) => Kind<F, S, unknown, never, never, A>
}
```

Added in v3.0.0
