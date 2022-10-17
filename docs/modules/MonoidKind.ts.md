---
title: MonoidKind.ts
nav_order: 21
parent: Modules
---

## MonoidKind overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [MonoidKind (interface)](#monoidkind-interface)
- [utils](#utils)
  - [fromSemigroupKind](#fromsemigroupkind)

---

# type class

## MonoidKind (interface)

**Signature**

```ts
export interface MonoidKind<F extends TypeLambda> extends SemigroupKind<F> {
  /**
   * Returns a effect that will never produce anything.
   */
  readonly emptyKind: <S>() => Kind<F, S, unknown, never, never, never>

  readonly combineKindAll: <S, R, O, E, A>(collection: Iterable<Kind<F, S, R, O, E, A>>) => Kind<F, S, R, O, E, A>
}
```

Added in v1.0.0

# utils

## fromSemigroupKind

**Signature**

```ts
export declare const fromSemigroupKind: <F extends TypeLambda>(
  SemigroupKind: SemigroupKind<F>,
  emptyKind: <S>() => Kind<F, S, unknown, never, never, never>
) => MonoidKind<F>
```

Added in v1.0.0
