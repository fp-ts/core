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
export declare const andThen: <F extends any>(
  F: FlatMap<F>
) => <R2, O2, E2, B>(that: any) => <R1, O1, E1, _>(self: any) => any
```

Added in v1.0.0

## composeKleisliArrow

**Signature**

```ts
export declare const composeKleisliArrow: <F extends any>(
  F: FlatMap<F>
) => <B, R2, O2, E2, C>(bfc: (b: B) => any) => <A, R1, O1, E1>(afb: (a: A) => any) => (a: A) => any
```

Added in v1.0.0

## flatten

**Signature**

```ts
export declare const flatten: <F extends any>(F: FlatMap<F>) => <R2, O2, E2, R1, O1, E1, A>(self: any) => any
```

Added in v1.0.0
