---
title: typeclass/FlatMap.ts
nav_order: 30
parent: Modules
---

## FlatMap overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [FlatMap (interface)](#flatmap-interface)
- [utils](#utils)
  - [andThen](#andthen)
  - [composeKleisliArrow](#composekleisliarrow)
  - [flatten](#flatten)

---

# type class

## FlatMap (interface)

**Signature**

```ts
export interface FlatMap<F extends TypeLambda> extends TypeClass<F> {
  readonly flatMap: <A, R2, O2, E2, B>(
    f: (a: A) => Kind<F, R2, O2, E2, B>
  ) => <R1, O1, E1>(self: Kind<F, R1, O1, E1, A>) => Kind<F, R1 & R2, O1 | O2, E1 | E2, B>
}
```

Added in v1.0.0

# utils

## andThen

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const andThen: <F extends TypeLambda>(
  F: FlatMap<F>
) => (<R1, O1, E1, _, R2, O2, E2, B>(
  self: Kind<F, R1, O1, E1, _>,
  that: Kind<F, R2, O2, E2, B>
) => Kind<F, R1 & R2, O1 | O2, E1 | E2, B>) &
  (<R2, O2, E2, B>(
    that: Kind<F, R2, O2, E2, B>
  ) => <R1, O1, E1, _>(self: Kind<F, R1, O1, E1, _>) => Kind<F, R1 & R2, O2 | O1, E2 | E1, B>)
```

Added in v1.0.0

## composeKleisliArrow

**Signature**

```ts
export declare const composeKleisliArrow: <F extends TypeLambda>(
  F: FlatMap<F>
) => (<A, R1, O1, E1, B, R2, O2, E2, C>(
  afb: (a: A) => Kind<F, R1, O1, E1, B>,
  bfc: (b: B) => Kind<F, R2, O2, E2, C>
) => (a: A) => Kind<F, R1 & R2, O1 | O2, E1 | E2, C>) &
  (<B, R2, O2, E2, C>(
    bfc: (b: B) => Kind<F, R2, O2, E2, C>
  ) => <A, R1, O1, E1>(afb: (a: A) => Kind<F, R1, O1, E1, B>) => (a: A) => Kind<F, R1 & R2, O2 | O1, E2 | E1, C>)
```

Added in v1.0.0

## flatten

**Signature**

```ts
export declare const flatten: <F extends TypeLambda>(
  F: FlatMap<F>
) => <R2, O2, E2, R1, O1, E1, A>(
  self: Kind<F, R2, O2, E2, Kind<F, R1, O1, E1, A>>
) => Kind<F, R1 & R2, O2 | O1, E2 | E1, A>
```

Added in v1.0.0
