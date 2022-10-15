---
title: KleisliComposable.ts
nav_order: 18
parent: Modules
---

## KleisliComposable overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [KleisliComposable (interface)](#kleislicomposable-interface)

---

# type class

## KleisliComposable (interface)

**Signature**

```ts
export interface KleisliComposable<F extends TypeLambda> extends TypeClass<F> {
  readonly composeKleisli: <B, S, R2, O2, E2, C>(
    bfc: (b: B) => Kind<F, S, R2, O2, E2, C>
  ) => <A, R1, O1, E1>(afb: (a: A) => Kind<F, S, R1, O1, E1, B>) => (a: A) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, C>
}
```

Added in v3.0.0
