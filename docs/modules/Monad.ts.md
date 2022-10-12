---
title: Monad.ts
nav_order: 21
parent: Modules
---

## Monad overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Monad (interface)](#monad-interface)

---

# model

## Monad (interface)

**Signature**

```ts
export interface Monad<F extends TypeLambda> extends Succeed<F>, FlatMap<F> {}
```

Added in v3.0.0
