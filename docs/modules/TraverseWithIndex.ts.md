---
title: TraverseWithIndex.ts
nav_order: 31
parent: Modules
---

## TraverseWithIndex overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [TraverseWithIndex (interface)](#traversewithindex-interface)
- [utils](#utils)
  - [traverseWithIndexComposition](#traversewithindexcomposition)

---

# type class

## TraverseWithIndex (interface)

**Signature**

```ts
export interface TraverseWithIndex<T extends TypeLambda, I> extends TypeClass<T> {
  readonly traverseWithIndex: <F extends TypeLambda>(
    Applicative: Applicative<F>
  ) => <A, S, R, O, E, B>(
    f: (a: A, i: I) => Kind<F, S, R, O, E, B>
  ) => <TS, TR, TO, TE>(self: Kind<T, TS, TR, TO, TE, A>) => Kind<F, S, R, O, E, Kind<T, TS, TR, TO, TE, B>>
}
```

Added in v3.0.0

# utils

## traverseWithIndexComposition

Returns a default `traverseWithIndex` composition.

**Signature**

```ts
export declare const traverseWithIndexComposition: <F extends any, I, G extends any, J>(
  TraverseWithIndexF: TraverseWithIndex<F, I>,
  TraverseWithIndexG: TraverseWithIndex<G, J>
) => <H extends any>(
  H: any
) => <A, S, R, O, E, B>(f: (a: A, ij: readonly [I, J]) => any) => <FS, FR, FO, FE, GS, GR, GO, GE>(fga: any) => any
```

Added in v3.0.0