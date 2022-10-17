---
title: TraversableWithIndex.ts
nav_order: 29
parent: Modules
---

## TraversableWithIndex overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [TraversableWithIndex (interface)](#traversablewithindex-interface)
- [utils](#utils)
  - [traverseWithIndexComposition](#traversewithindexcomposition)

---

# type class

## TraversableWithIndex (interface)

**Signature**

```ts
export interface TraversableWithIndex<T extends TypeLambda, I> extends TypeClass<T> {
  readonly traverseWithIndex: <F extends TypeLambda>(
    Monoidal: Monoidal<F>
  ) => <A, S, R, O, E, B>(
    f: (a: A, i: I) => Kind<F, S, R, O, E, B>
  ) => <TS, TR, TO, TE>(self: Kind<T, TS, TR, TO, TE, A>) => Kind<F, S, R, O, E, Kind<T, TS, TR, TO, TE, B>>
}
```

Added in v1.0.0

# utils

## traverseWithIndexComposition

Returns a default `traverseWithIndex` composition.

**Signature**

```ts
export declare const traverseWithIndexComposition: <F extends TypeLambda, I, G extends TypeLambda, J>(
  TraversableWithIndexF: TraversableWithIndex<F, I>,
  TraversableWithIndexG: TraversableWithIndex<G, J>
) => <H extends TypeLambda>(
  H: Monoidal<H>
) => <A, S, R, O, E, B>(
  f: (a: A, ij: readonly [I, J]) => Kind<H, S, R, O, E, B>
) => <FS, FR, FO, FE, GS, GR, GO, GE>(
  fga: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
) => Kind<H, S, R, O, E, Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>>
```

Added in v1.0.0
