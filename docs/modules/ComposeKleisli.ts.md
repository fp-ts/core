---
title: ComposeKleisli.ts
nav_order: 9
parent: Modules
---

## ComposeKleisli overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [ComposeKleisli (interface)](#composekleisli-interface)

---

# type class

## ComposeKleisli (interface)

**Signature**

```ts
export interface ComposeKleisli<F extends TypeLambda> extends TypeClass<F> {
  readonly composeKleisli: <B, S, R2, O2, E2, C>(
    bfc: (b: B) => Kind<F, S, R2, O2, E2, C>
  ) => <A, R1, O1, E1>(afb: (a: A) => Kind<F, S, R1, O1, E1, B>) => (a: A) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, C>
}
```

Added in v3.0.0
