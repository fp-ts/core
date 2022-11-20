---
title: typeclass/TraversableFilterable.ts
nav_order: 31
parent: Modules
---

## TraversableFilterable overview

`TraversableFilterable` represents data structures which can be _partitioned_ with effects in some `Applicative` functor.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [models](#models)
  - [TraversableFilterable (interface)](#traversablefilterable-interface)
- [utils](#utils)
  - [traverseFilter](#traversefilter)
  - [traverseFilterMap](#traversefiltermap)
  - [traversePartition](#traversepartition)
  - [traversePartitionMap](#traversepartitionmap)

---

# models

## TraversableFilterable (interface)

**Signature**

```ts
export interface TraversableFilterable<T extends TypeLambda> extends TypeClass<T> {
  readonly traversePartitionMap: <F extends TypeLambda>(
    F: Applicative<F>
  ) => <A, R, O, E, B, C>(
    f: (a: A) => Kind<F, R, O, E, Either<B, C>>
  ) => <TR, TO, TE>(
    self: Kind<T, TR, TO, TE, A>
  ) => Kind<F, R, O, E, readonly [Kind<T, TR, TO, TE, B>, Kind<T, TR, TO, TE, C>]>

  readonly traverseFilterMap: <F extends TypeLambda>(
    F: Applicative<F>
  ) => <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, Option<B>>
  ) => <TR, TO, TE>(self: Kind<T, TR, TO, TE, A>) => Kind<F, R, O, E, Kind<T, TR, TO, TE, B>>
}
```

Added in v1.0.0

# utils

## traverseFilter

**Signature**

```ts
export declare const traverseFilter: <T extends TypeLambda>(
  T: TraversableFilterable<T>
) => <F extends TypeLambda>(
  F: Applicative<F>
) => <B extends A, R, O, E, A = B>(
  predicate: (a: A) => Kind<F, R, O, E, boolean>
) => <TR, TO, TE>(self: Kind<T, TR, TO, TE, B>) => Kind<F, R, O, E, Kind<T, TR, TO, TE, B>>
```

Added in v1.0.0

## traverseFilterMap

Returns a default `traverseFilterMap` implementation.

**Signature**

```ts
export declare const traverseFilterMap: <T extends TypeLambda>(
  T: Traversable<T> & compactable.Compactable<T>
) => <F>(
  F: Applicative<F>
) => <A, R, O, E, B>(
  f: (a: A) => Kind<F, R, O, E, any>
) => <TR, TO, TE>(self: Kind<T, TR, TO, TE, A>) => Kind<F, R, O, E, Kind<T, TR, TO, TE, B>>
```

Added in v1.0.0

## traversePartition

**Signature**

```ts
export declare const traversePartition: <T extends TypeLambda>(
  T: TraversableFilterable<T>
) => <F extends TypeLambda>(
  F: Applicative<F>
) => <B extends A, R, O, E, A = B>(
  predicate: (a: A) => Kind<F, R, O, E, boolean>
) => <TR, TO, TE>(
  self: Kind<T, TR, TO, TE, B>
) => Kind<F, R, O, E, readonly [Kind<T, TR, TO, TE, B>, Kind<T, TR, TO, TE, B>]>
```

Added in v1.0.0

## traversePartitionMap

Returns a default `traversePartitionMap` implementation.

**Signature**

```ts
export declare const traversePartitionMap: <T extends TypeLambda>(
  T: Traversable<T> & Covariant<T> & compactable.Compactable<T>
) => <F>(
  F: Applicative<F>
) => <A, R, O, E, B, C>(
  f: (a: A) => Kind<F, R, O, E, any>
) => <TR, TO, TE>(
  self: Kind<T, TR, TO, TE, A>
) => Kind<F, R, O, E, readonly [Kind<T, TR, TO, TE, B>, Kind<T, TR, TO, TE, C>]>
```

Added in v1.0.0
