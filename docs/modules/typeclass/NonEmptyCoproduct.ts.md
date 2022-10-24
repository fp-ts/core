---
title: typeclass/NonEmptyCoproduct.ts
nav_order: 25
parent: Modules
---

## NonEmptyCoproduct overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [NonEmptyCoproduct (interface)](#nonemptycoproduct-interface)
- [utils](#utils)
  - [coproductEither](#coproducteither)
  - [getSemigroup](#getsemigroup)

---

# type class

## NonEmptyCoproduct (interface)

**Signature**

```ts
export interface NonEmptyCoproduct<F extends TypeLambda> extends Invariant<F> {
  readonly coproduct: <R2, O2, E2, B>(
    that: Kind<F, R2, O2, E2, B>
  ) => <R1, O1, E1, A>(self: Kind<F, R1, O1, E1, A>) => Kind<F, R1 & R2, O1 | O2, E1 | E2, A | B>

  readonly coproductMany: <R, O, E, A>(
    collection: Iterable<Kind<F, R, O, E, A>>
  ) => (self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, A>
}
```

Added in v1.0.0

# utils

## coproductEither

**Signature**

```ts
export declare const coproductEither: <F extends TypeLambda>(
  F: NonEmptyCoproduct<F>
) => <R2, O2, E2, B>(
  that: Kind<F, R2, O2, E2, B>
) => <R1, O1, E1, A>(self: Kind<F, R1, O1, E1, A>) => Kind<F, R1 & R2, O2 | O1, E2 | E1, any>
```

Added in v1.0.0

## getSemigroup

**Signature**

```ts
export declare const getSemigroup: <F extends TypeLambda>(
  F: NonEmptyCoproduct<F>
) => <A>() => Semigroup<Kind<F, unknown, never, never, A>>
```

Added in v1.0.0
