---
title: SemigroupKind.ts
nav_order: 25
parent: Modules
---

## SemigroupKind overview

Added in v3.0.0

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
  readonly combineKind: <S, R, O, E, A, B>(
    first: Kind<F, S, R, O, E, A>,
    second: Kind<F, S, R, O, E, A>
  ) => Kind<F, S, R, O, E, A | B>

  readonly combineKindMany: <S, R, O, E, A>(
    start: Kind<F, S, R, O, E, A>,
    others: Iterable<Kind<F, S, R, O, E, A>>
  ) => Kind<F, S, R, O, E, A>
}
```

Added in v3.0.0
