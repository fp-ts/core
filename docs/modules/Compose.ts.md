---
title: Compose.ts
nav_order: 8
parent: Modules
---

## Compose overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Compose (interface)](#compose-interface)

---

# model

## Compose (interface)

**Signature**

```ts
export interface Compose<F extends TypeLambda> extends TypeClass<F> {
  readonly compose: <S, B, O2, E2, C>(
    bc: Kind<F, S, B, O2, E2, C>
  ) => <A, O1, E1>(ab: Kind<F, S, A, O1, E1, B>) => Kind<F, S, A, O1 | O2, E1 | E2, C>
}
```

Added in v3.0.0
