---
title: Composable.ts
nav_order: 7
parent: Modules
---

## Composable overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Composable (interface)](#composable-interface)

---

# type class

## Composable (interface)

**Signature**

```ts
export interface Composable<F extends TypeLambda> extends TypeClass<F> {
  readonly compose: <S, B, O2, E2, C>(
    bc: Kind<F, S, B, O2, E2, C>
  ) => <A, O1, E1>(ab: Kind<F, S, A, O1, E1, B>) => Kind<F, S, A, O1 | O2, E1 | E2, C>
}
```

Added in v3.0.0
