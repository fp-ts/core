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
  - [fromRetryable](#fromretryable)

---

# type class

## Alternative (interface)

**Signature**

```ts
export interface Alternative<F extends TypeLambda> extends Retryable<F> {
  /**
   * Returns a effect that will never produce anything.
   */
  readonly none: <S>() => Kind<F, S, unknown, never, never, never>

  readonly firstSuccessOfAll: <S, R, O, E, A>(collection: Iterable<Kind<F, S, R, O, E, A>>) => Kind<F, S, R, O, E, A>
}
```

Added in v3.0.0

# utils

## fromRetryable

**Signature**

```ts
export declare const fromRetryable: <F extends any>(Retryable: any, none: <S>() => any) => Alternative<F>
```

Added in v3.0.0
