---
title: typeclass/Alternative.ts
nav_order: 8
parent: Modules
---

## Alternative overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Alternative (interface)](#alternative-interface)

---

# type class

## Alternative (interface)

**Signature**

```ts
export interface Alternative<F extends TypeLambda> extends NonEmptyAlternative<F>, Coproduct<F> {}
```

Added in v1.0.0