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
  - [compact](#compact)
  - [filter](#filter)
  - [filterMapComposition](#filtermapcomposition)
  - [partition](#partition)
  - [partitionMapComposition](#partitionmapcomposition)
  - [separate](#separate)

---

# models

## Filterable (interface)

**Signature**

```ts
export interface Filterable<F extends TypeLambda> extends TypeClass<F> {
  readonly partitionMap: {
    <A, B, C>(f: (a: A) => Either<B, C>): <R, O, E>(
      self: Kind<F, R, O, E, A>
    ) => [Kind<F, R, O, E, B>, Kind<F, R, O, E, C>]
    <R, O, E, A, B, C>(self: Kind<F, R, O, E, A>, f: (a: A) => Either<B, C>): [Kind<F, R, O, E, B>, Kind<F, R, O, E, C>]
  }

  readonly filterMap: {
    <A, B>(f: (a: A) => Option<B>): <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>
    <R, O, E, A, B>(self: Kind<F, R, O, E, A>, f: (a: A) => Option<B>): Kind<F, R, O, E, B>
  }
}
```

Added in v1.0.0

# utils

## compact

**Signature**

```ts
export declare const compact: <F extends TypeLambda>(
  F: Filterable<F>
) => <R, O, E, A>(self: Kind<F, R, O, E, Option<A>>) => Kind<F, R, O, E, A>
```

Added in v1.0.0

## filter

**Signature**

```ts
export declare const filter: <F extends TypeLambda>(
  F: Filterable<F>
) => {
  <C extends A, B extends A, A = C>(refinement: (a: A) => a is B): <R, O, E>(
    self: Kind<F, R, O, E, C>
  ) => Kind<F, R, O, E, B>
  <B extends A, A = B>(predicate: (a: A) => boolean): <R, O, E>(self: Kind<F, R, O, E, B>) => Kind<F, R, O, E, B>
  <R, O, E, C extends A, B extends A, A = C>(self: Kind<F, R, O, E, C>, refinement: (a: A) => a is B): Kind<
    F,
    R,
    O,
    E,
    B
  >
  <R, O, E, B extends A, A = B>(self: Kind<F, R, O, E, B>, predicate: (a: A) => boolean): Kind<F, R, O, E, B>
}
```

Added in v1.0.0

## filterMapComposition

Returns a default binary `filterMap` composition.

**Signature**

```ts
export declare const filterMapComposition: <F extends TypeLambda, G extends TypeLambda>(
  F: Covariant<F>,
  G: Filterable<G>
) => <FR, FO, FE, GR, GO, GE, A, B>(
  self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>,
  f: (a: A) => Option<B>
) => Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, B>>
```

Added in v1.0.0

## partition

**Signature**

```ts
export declare const partition: <F extends TypeLambda>(
  F: Filterable<F>
) => {
  <C extends A, B extends A, A = C>(refinement: (a: A) => a is B): <R, O, E>(
    self: Kind<F, R, O, E, C>
  ) => [Kind<F, R, O, E, C>, Kind<F, R, O, E, B>]
  <B extends A, A = B>(predicate: (a: A) => boolean): <R, O, E>(
    self: Kind<F, R, O, E, B>
  ) => [Kind<F, R, O, E, B>, Kind<F, R, O, E, B>]
  <R, O, E, C extends A, B extends A, A = C>(self: Kind<F, R, O, E, C>, refinement: (a: A) => a is B): [
    Kind<F, R, O, E, C>,
    Kind<F, R, O, E, B>
  ]
  <R, O, E, B extends A, A = B>(self: Kind<F, R, O, E, B>, predicate: (a: A) => boolean): [
    Kind<F, R, O, E, B>,
    Kind<F, R, O, E, B>
  ]
}
```

Added in v1.0.0

## partitionMapComposition

Returns a default binary `partitionMap` composition.

**Signature**

```ts
export declare const partitionMapComposition: <F extends TypeLambda, G extends TypeLambda>(
  F: Covariant<F>,
  G: Filterable<G>
) => <FR, FO, FE, GR, GO, GE, A, B, C>(
  self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>,
  f: (a: A) => Either<B, C>
) => [Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, B>>, Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, C>>]
```

Added in v1.0.0

## separate

**Signature**

```ts
export declare const separate: <F extends TypeLambda>(
  F: Filterable<F>
) => <R, O, E, A, B>(self: Kind<F, R, O, E, Either<A, B>>) => [Kind<F, R, O, E, A>, Kind<F, R, O, E, B>]
```

Added in v1.0.0
