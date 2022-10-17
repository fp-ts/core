---
title: SemigroupKind.ts
nav_order: 27
parent: Modules
---

## SemigroupKind overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [SemigroupKind (interface)](#semigroupkind-interface)

---

# type class

## SemigroupKind (interface)

**Signature**

```ts
export interface SemigroupKind<F extends TypeLambda> extends Functor<F> {
  readonly combineKind: <S, R2, O2, E2, B>(
    that: Kind<F, S, R2, O2, E2, B>
  ) => <R1, O1, E1, A>(self: Kind<F, S, R1, O1, E1, A>) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A | B>

  readonly combineKindMany: <S, R, O, E, A>(
    collection: Iterable<Kind<F, S, R, O, E, A>>
  ) => (self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, A>
}
```

Added in v1.0.0
