---
title: Monoidal.ts
nav_order: 21
parent: Modules
---

## Monoidal overview

Added in v1.0.0

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
export interface Monoidal<F extends TypeLambda> extends Semigroupal<F>, Pointed<F> {
  readonly zipAll: <S, R, O, E, A>(
    collection: Iterable<Kind<F, S, R, O, E, A>>
  ) => Kind<F, S, R, O, E, ReadonlyArray<A>>
}
```

Added in v1.0.0

# utils

## liftMonoid

Lift a monoid into 'F', the inner values are combined using the provided `Monoid`.

**Signature**

```ts
export declare const liftMonoid: <F extends TypeLambda>(
  Monoidal: Monoidal<F>
) => <A, S, R, O, E>(Monoid: Monoid<A>) => Monoid<Kind<F, S, R, O, E, A>>
```

Added in v1.0.0
