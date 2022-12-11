---
title: typeclass/SemiCoproduct.ts
nav_order: 23
parent: Modules
---

## SemiCoproduct overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [SemiCoproduct (interface)](#semicoproduct-interface)
- [utils](#utils)
  - [getSemigroup](#getsemigroup)

---

# type class

## SemiCoproduct (interface)

**Signature**

```ts
export interface SemiCoproduct<F extends TypeLambda> extends Invariant<F> {
  coproduct: <R2, O2, E2, B>(
    that: Kind<F, R2, O2, E2, B>
  ) => <R1, O1, E1, A>(self: Kind<F, R1, O1, E1, A>) => Kind<F, R1 & R2, O1 | O2, E1 | E2, A | B>

  coproductMany: <R, O, E, A>(
    collection: Iterable<Kind<F, R, O, E, A>>
  ) => (self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, A>
}
```

Added in v1.0.0

# utils

## getSemigroup

**Signature**

```ts
export declare const getSemigroup: <F extends TypeLambda>(
  F: SemiCoproduct<F>
) => <R, O, E, A>() => Semigroup<Kind<F, R, O, E, A>>
```

Added in v1.0.0
