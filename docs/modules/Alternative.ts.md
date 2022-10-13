---
title: Alternative.ts
nav_order: 1
parent: Modules
---

## Alternative overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Alternative (interface)](#alternative-interface)

---

# type class

## Alternative (interface)

**Signature**

```ts
export interface Alternative<F extends TypeLambda> extends FirstSuccessOf<F> {
  /**
   * Returns a effect that will never produce anything.
   */
  readonly never: <S>() => Kind<F, S, unknown, never, never, never>
}
```

Added in v3.0.0
