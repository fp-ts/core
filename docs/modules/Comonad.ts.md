---
title: Comonad.ts
nav_order: 6
parent: Modules
---

## Comonad overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Comonad (interface)](#comonad-interface)

---

# type class

## Comonad (interface)

**Signature**

```ts
export interface Comonad<F extends TypeLambda> extends Extend<F> {
  readonly extract: <S, R, O, E, A>(self: Kind<F, S, R, O, E, A>) => A
}
```

Added in v3.0.0
