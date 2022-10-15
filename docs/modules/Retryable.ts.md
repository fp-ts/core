---
title: Retryable.ts
nav_order: 23
parent: Modules
---

## Retryable overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Retryable (interface)](#retryable-interface)
- [utils](#utils)
  - [orElse](#orelse)

---

# type class

## Retryable (interface)

**Signature**

```ts
export interface Retryable<F extends TypeLambda> extends Functor<F> {
  readonly firstSuccessOf: <S, R1, O1, E1, A, R2, O2, E2, B>(
    first: Kind<F, S, R1, O1, E1, A>,
    second: Kind<F, S, R2, O2, E2, B>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A | B>

  readonly firstSuccessOfMany: <S, R, O, E, A>(
    start: Kind<F, S, R, O, E, A>,
    others: Iterable<Kind<F, S, R, O, E, A>>
  ) => Kind<F, S, R, O, E, A>
}
```

Added in v3.0.0

# utils

## orElse

**Signature**

```ts
export declare const orElse: <F extends any>(
  Retryable: Retryable<F>
) => <S, R2, O2, E2, B>(that: any) => <R1, O1, E1, A>(self: any) => any
```

Added in v3.0.0
