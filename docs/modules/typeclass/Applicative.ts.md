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
  - [liftMonoid](#liftmonoid)

---

# type class

## Applicative (interface)

**Signature**

```ts
export interface Applicative<F extends TypeLambda> extends SemiApplicative<F>, Product<F> {}
```

Added in v1.0.0

# utils

## liftMonoid

Lift a monoid into 'F', the inner values are combined using the provided `Monoid`.

**Signature**

```ts
export declare const liftMonoid: <F extends any>(F: Applicative<F>) => <A, R, O, E>(M: any) => any
```

Added in v1.0.0
