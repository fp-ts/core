---
title: Monad.ts
nav_order: 18
parent: Modules
---

## Monad overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Monad (interface)](#monad-interface)

---

# type class

## Monad (interface)

**Signature**

```ts
export interface Monad<F extends TypeLambda> extends Pointed<F>, FlatMap<F> {}
```

Added in v1.0.0
