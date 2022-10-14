---
title: Monoidal.ts
nav_order: 24
parent: Modules
---

## Monoidal overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Monoidal (interface)](#monoidal-interface)
- [utils](#utils)
  - [liftMonoid](#liftmonoid)

---

# type class

## Monoidal (interface)

**Signature**

```ts
export interface Monoidal<F extends TypeLambda> extends Zip<F>, Succeed<F> {}
```

Added in v3.0.0

# utils

## liftMonoid

Lift a monoid into 'F', the inner values are combined using the provided `Monoid`.

**Signature**

```ts
export declare const liftMonoid: <F extends any>(Monoidal: Monoidal<F>) => <A, S, R, O, E>(Monoid: any) => any
```

Added in v3.0.0
