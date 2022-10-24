---
title: typeclass/Applicative.ts
nav_order: 9
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
export interface Applicative<F extends TypeLambda> extends NonEmptyApplicative<F>, Product<F> {}
```

Added in v1.0.0

# utils

## liftMonoid

Lift a monoid into 'F', the inner values are combined using the provided `Monoid`.

**Signature**

```ts
export declare const liftMonoid: <F extends TypeLambda>(
  F: Applicative<F>
) => <A, R, O, E>(M: Monoid<A>) => Monoid<Kind<F, R, O, E, A>>
```

Added in v1.0.0
