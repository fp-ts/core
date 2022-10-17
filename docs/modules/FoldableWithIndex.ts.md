---
title: FoldableWithIndex.ts
nav_order: 12
parent: Modules
---

## FoldableWithIndex overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [FoldableWithIndex (interface)](#foldablewithindex-interface)
- [utils](#utils)
  - [foldMapWithIndex](#foldmapwithindex)
  - [reduceRightWithIndexComposition](#reducerightwithindexcomposition)
  - [reduceWithIndexComposition](#reducewithindexcomposition)
  - [toReadonlyArray](#toreadonlyarray)
  - [toReadonlyArrayWith](#toreadonlyarraywith)

---

# type class

## FoldableWithIndex (interface)

**Signature**

```ts
export interface FoldableWithIndex<F extends TypeLambda, I> extends TypeClass<F> {
  readonly reduceWithIndex: <A, B>(b: B, f: (b: B, a: A, i: I) => B) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => B

  readonly reduceRightWithIndex: <A, B>(
    b: B,
    f: (b: B, a: A, i: I) => B
  ) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => B
}
```

Added in v1.0.0

# utils

## foldMapWithIndex

**Signature**

```ts
export declare const foldMapWithIndex: <F extends TypeLambda, I>(
  FoldableWithIndex: FoldableWithIndex<F, I>
) => <M>(Monoid: Monoid<M>) => <A>(f: (a: A, i: I) => M) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => M
```

Added in v1.0.0

## reduceRightWithIndexComposition

Returns a default `reduceRightWithIndex` composition.

**Signature**

```ts
export declare const reduceRightWithIndexComposition: <F extends TypeLambda, I, G extends TypeLambda, J>(
  F: FoldableWithIndex<F, I>,
  G: FoldableWithIndex<G, J>
) => <B, A>(
  b: B,
  f: (b: B, a: A, ij: readonly [I, J]) => B
) => <FS, FR, FO, FE, GS, GR, GO, GE>(self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>) => B
```

Added in v1.0.0

## reduceWithIndexComposition

Returns a default `reduceWithIndex` composition.

**Signature**

```ts
export declare const reduceWithIndexComposition: <F extends TypeLambda, I, G extends TypeLambda, J>(
  F: FoldableWithIndex<F, I>,
  G: FoldableWithIndex<G, J>
) => <B, A>(
  b: B,
  f: (b: B, a: A, ij: readonly [I, J]) => B
) => <FS, FR, FO, FE, GS, GR, GO, GE>(self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>) => B
```

Added in v1.0.0

## toReadonlyArray

**Signature**

```ts
export declare const toReadonlyArray: <F extends TypeLambda, I>(
  FoldableWithIndex: FoldableWithIndex<F, I>
) => <S, R, O, E, A>(self: Kind<F, S, R, O, E, A>) => readonly A[]
```

Added in v1.0.0

## toReadonlyArrayWith

**Signature**

```ts
export declare const toReadonlyArrayWith: <F extends TypeLambda, I>(
  FoldableWithIndex: FoldableWithIndex<F, I>
) => <A, B>(f: (a: A, i: I) => B) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => readonly B[]
```

Added in v1.0.0
