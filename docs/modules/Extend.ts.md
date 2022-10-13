---
title: Extend.ts
nav_order: 12
parent: Modules
---

## Extend overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Extend (interface)](#extend-interface)

---

# type class

## Extend (interface)

**Signature**

```ts
export interface Extend<F extends TypeLambda> extends Covariant<F> {
  readonly extend: <S, R, O, E, A, B>(
    f: (self: Kind<F, S, R, O, E, A>) => B
  ) => (self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
}
```

Added in v3.0.0
