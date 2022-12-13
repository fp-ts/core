---
title: typeclass/Coproduct.ts
nav_order: 9
parent: Modules
---

## Coproduct overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Coproduct (interface)](#coproduct-interface)
- [utils](#utils)
  - [getMonoid](#getmonoid)

---

# type class

## Coproduct (interface)

**Signature**

```ts
export interface Coproduct<F extends TypeLambda> extends SemiCoproduct<F> {
  readonly zero: <A>() => Kind<F, unknown, never, never, A>

  readonly coproductAll: <R, O, E, A>(collection: Iterable<Kind<F, R, O, E, A>>) => Kind<F, R, O, E, A>
}
```

Added in v1.0.0

# utils

## getMonoid

**Signature**

```ts
export declare const getMonoid: <F extends TypeLambda>(F: Coproduct<F>) => <R, O, E, A>() => Monoid<Kind<F, R, O, E, A>>
```

Added in v1.0.0
