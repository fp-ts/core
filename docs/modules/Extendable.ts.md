---
title: Extendable.ts
nav_order: 9
parent: Modules
---

## Extendable overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Extendable (interface)](#extendable-interface)

---

# type class

## Extendable (interface)

**Signature**

```ts
export interface Extendable<F extends TypeLambda> extends Functor<F> {
  readonly extend: <S, R, O, E, A, B>(
    f: (self: Kind<F, S, R, O, E, A>) => B
  ) => (self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
}
```

Added in v1.0.0
