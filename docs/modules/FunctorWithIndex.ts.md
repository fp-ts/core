---
title: FunctorWithIndex.ts
nav_order: 14
parent: Modules
---

## FunctorWithIndex overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [FunctorWithIndex (interface)](#functorwithindex-interface)
- [utils](#utils)
  - [mapWithIndexComposition](#mapwithindexcomposition)

---

# type class

## FunctorWithIndex (interface)

**Signature**

```ts
export interface FunctorWithIndex<F extends TypeLambda, I> extends TypeClass<F> {
  readonly mapWithIndex: <A, B>(
    f: (a: A, i: I) => B
  ) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
}
```

Added in v1.0.0

# utils

## mapWithIndexComposition

Returns a default `mapWithIndex` composition.

**Signature**

```ts
export declare const mapWithIndexComposition: <F extends TypeLambda, I, G extends TypeLambda, J>(
  FunctorF: FunctorWithIndex<F, I>,
  FunctorG: FunctorWithIndex<G, J>
) => <A, B>(
  f: (a: A, ij: readonly [I, J]) => B
) => <FS, FR, FO, FE, GS, GR, GO, GE>(
  self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
) => Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>
```

Added in v1.0.0
