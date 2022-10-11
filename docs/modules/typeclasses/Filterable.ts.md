---
title: typeclasses/Filterable.ts
nav_order: 62
parent: Modules
---

## Filterable overview

`Filterable` represents data structures which can be _partitioned_/_filtered_.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Filterable (interface)](#filterable-interface)
- [utils](#utils)
  - [filter](#filter)
  - [filterMapComposition](#filtermapcomposition)
  - [partition](#partition)
  - [partitionMap](#partitionmap)

---

# model

## Filterable (interface)

**Signature**

```ts
export interface Filterable<F extends TypeLambda> extends TypeClass<F> {
  readonly filterMap: <A, B>(
    f: (a: A) => Option<B>
  ) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
}
```

Added in v3.0.0

# utils

## filter

**Signature**

```ts
export declare const filter: <F extends any>(
  Filterable: Filterable<F>
) => {
  <C extends A, B extends A, A = C>(refinement: any): <S, R, O, E>(self: any) => any
  <B extends A, A = B>(predicate: any): <S, R, O, E>(self: any) => any
}
```

Added in v3.0.0

## filterMapComposition

Returns a default `filterMap` composition.

**Signature**

```ts
export declare const filterMapComposition: <F extends any, G extends any>(
  FunctorF: any,
  FilterableG: Filterable<G>
) => <A, B>(f: (a: A) => any) => <FS, FR, FO, FE, GS, GR, GO, GE>(self: any) => any
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: <F extends any>(
  Filterable: Filterable<F>
) => {
  <C extends A, B extends A, A = C>(refinement: any): <S, R, O, E>(self: any) => readonly [any, any]
  <B extends A, A = B>(predicate: any): <S, R, O, E>(self: any) => readonly [any, any]
}
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <F extends any>(
  Filterable: Filterable<F>
) => <A, B, C>(f: (a: A) => any) => <S, R, O, E>(self: any) => readonly [any, any]
```

Added in v3.0.0
