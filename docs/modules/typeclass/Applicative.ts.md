---
title: typeclass/Applicative.ts
nav_order: 20
parent: Modules
---

## Applicative overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Applicative (interface)](#applicative-interface)
- [utils](#utils)
  - [getMonoid](#getmonoid)

---

# type class

## Applicative (interface)

**Signature**

```ts
export interface Applicative<F extends TypeLambda> extends SemiApplicative<F>, Product<F> {}
```

Added in v1.0.0

# utils

## getMonoid

Lift a `Monoid` into `F`, combining the inner values using the provided `Monoid`:

- `combine` is provided by {@link semiApplicative.getSemigroup}.
- `empty` is `F.of(M.empty)`

**Signature**

```ts
export declare const getMonoid: <F extends TypeLambda>(
  F: Applicative<F>
) => <A, R, O, E>(M: Monoid<A>) => Monoid<Kind<F, R, O, E, A>>
```

Added in v1.0.0
