---
title: typeclass/Filterable.ts
nav_order: 29
parent: Modules
---

## Filterable overview

`Filterable` represents data structures which can be _partitioned_/_filtered_.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [models](#models)
  - [Filterable (interface)](#filterable-interface)
- [utils](#utils)
  - [filter](#filter)
  - [filterMapComposition](#filtermapcomposition)
  - [partition](#partition)
  - [partitionMap](#partitionmap)

---

# models

## Filterable (interface)

**Signature**

```ts
export interface Filterable<F extends TypeLambda> extends TypeClass<F> {
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>
}
```

Added in v1.0.0

# utils

## filter

**Signature**

```ts
export declare const filter: <F extends any>(
  F: Filterable<F>
) => {
  <C extends A, B extends A, A = C>(refinement: (a: A) => a is B): <R, O, E>(self: any) => any
  <B extends A, A = B>(predicate: (a: A) => boolean): <R, O, E>(self: any) => any
}
```

Added in v1.0.0

## filterMapComposition

Returns a default `filterMap` composition.

**Signature**

```ts
export declare const filterMapComposition: <F extends any, G extends any>(
  F: any,
  G: Filterable<G>
) => <A, B>(f: (a: A) => any) => <FR, FO, FE, GR, GO, GE>(self: any) => any
```

Added in v1.0.0

## partition

**Signature**

```ts
export declare const partition: <F extends any>(
  F: Filterable<F>
) => {
  <C extends A, B extends A, A = C>(refinement: (a: A) => a is B): <R, O, E>(self: any) => [any, any]
  <B extends A, A = B>(predicate: (a: A) => boolean): <R, O, E>(self: any) => [any, any]
}
```

Added in v1.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <F extends any>(
  F: Filterable<F>
) => <A, B, C>(f: (a: A) => any) => <R, O, E>(self: any) => [any, any]
```

Added in v1.0.0