---
title: Alternative.ts
nav_order: 1
parent: Modules
---

## Alternative overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Alternative (interface)](#alternative-interface)
- [utils](#utils)
  - [fromFailable](#fromfailable)

---

# type class

## Alternative (interface)

**Signature**

```ts
export interface Alternative<F extends TypeLambda> extends Failable<F> {
  /**
   * Returns a effect that will never produce anything.
   */
  readonly none: <S>() => Kind<F, S, unknown, never, never, never>
  readonly firstSuccessOfAll: <S, R, O, E, A>(iterable: Iterable<Kind<F, S, R, O, E, A>>) => Kind<F, S, R, O, E, A>
}
```

Added in v3.0.0

# utils

## fromFailable

**Signature**

```ts
export declare const fromFailable: <F extends any>(Failable: any, none: <S>() => any) => Alternative<F>
```

Added in v3.0.0
