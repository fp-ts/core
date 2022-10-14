---
title: Failable.ts
nav_order: 10
parent: Modules
---

## Failable overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Failable (interface)](#failable-interface)
- [utils](#utils)
  - [orElse](#orelse)

---

# type class

## Failable (interface)

**Signature**

```ts
export interface Failable<F extends TypeLambda> extends TypeClass<F> {
  readonly firstSuccessOf: <S, R1, O1, E1, A, R2, O2, E2, B>(
    head: Kind<F, S, R1, O1, E1, A>,
    ...tail: ReadonlyArray<Kind<F, S, R2, O2, E2, B>>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A | B>
  readonly firstSuccessOfAllWith: <S, R1, O1, E1, A, R2, O2, E2, B>(
    head: Kind<F, S, R1, O1, E1, A>,
    tail: Iterable<Kind<F, S, R2, O2, E2, B>>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A | B>
}
```

Added in v3.0.0

# utils

## orElse

**Signature**

```ts
export declare const orElse: <F extends any>(
  Failable: Failable<F>
) => <S, R2, O2, E2, B>(that: any) => <R1, O1, E1, A>(self: any) => any
```

Added in v3.0.0
