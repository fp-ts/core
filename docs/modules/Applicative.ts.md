---
title: Applicative.ts
nav_order: 2
parent: Modules
---

## Applicative overview

Added in v3.0.0

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
export interface Applicative<F extends TypeLambda> extends Apply<F>, Succeed<F> {}
```

Added in v3.0.0

# utils

## liftMonoid

Lift a monoid into 'F', the inner values are combined using the provided `Monoid`.

**Signature**

```ts
export declare const liftMonoid: <F extends any>(Applicative: Applicative<F>) => <A, S, R, O, E>(Monoid: any) => any
```

Added in v3.0.0
