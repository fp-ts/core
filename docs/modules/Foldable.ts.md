---
title: Foldable.ts
nav_order: 11
parent: Modules
---

## Foldable overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Foldable (interface)](#foldable-interface)
- [utils](#utils)
  - [foldMap](#foldmap)
  - [reduceComposition](#reducecomposition)
  - [reduceRightComposition](#reducerightcomposition)
  - [toReadonlyArray](#toreadonlyarray)
  - [toReadonlyArrayWith](#toreadonlyarraywith)

---

# type class

## Foldable (interface)

**Signature**

```ts
export interface Foldable<F extends TypeLambda> extends TypeClass<F> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => B

  readonly reduceRight: <A, B>(b: B, f: (b: B, a: A) => B) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => B
}
```

Added in v1.0.0

# utils

## foldMap

**Signature**

```ts
export declare const foldMap: <F extends TypeLambda>(
  Foldable: Foldable<F>
) => <M>(Monoid: Monoid<M>) => <A>(f: (a: A) => M) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => M
```

Added in v1.0.0

## reduceComposition

Returns a default `reduce` composition.

**Signature**

```ts
export declare const reduceComposition: <F extends TypeLambda, G extends TypeLambda>(
  F: Foldable<F>,
  G: Foldable<G>
) => <B, A>(
  b: B,
  f: (b: B, a: A) => B
) => <FS, FR, FO, FE, GS, GR, GO, GE>(self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>) => B
```

Added in v1.0.0

## reduceRightComposition

Returns a default `reduceRight` composition.

**Signature**

```ts
export declare const reduceRightComposition: <F extends TypeLambda, G extends TypeLambda>(
  F: Foldable<F>,
  G: Foldable<G>
) => <B, A>(
  b: B,
  f: (b: B, a: A) => B
) => <FS, FR, FO, FE, GS, GR, GO, GE>(self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>) => B
```

Added in v1.0.0

## toReadonlyArray

**Signature**

```ts
export declare const toReadonlyArray: <F extends TypeLambda>(
  Foldable: Foldable<F>
) => <S, R, O, E, A>(self: Kind<F, S, R, O, E, A>) => readonly A[]
```

Added in v1.0.0

## toReadonlyArrayWith

**Signature**

```ts
export declare const toReadonlyArrayWith: <F extends TypeLambda>(
  Foldable: Foldable<F>
) => <A, B>(f: (a: A) => B) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => readonly B[]
```

Added in v1.0.0
