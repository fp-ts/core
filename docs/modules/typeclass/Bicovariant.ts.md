---
title: typeclass/Bicovariant.ts
nav_order: 21
parent: Modules
---

## Bicovariant overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Bicovariant (interface)](#bicovariant-interface)
- [utils](#utils)
  - [bimapComposition](#bimapcomposition)
  - [map](#map)
  - [mapLeft](#mapleft)

---

# type class

## Bicovariant (interface)

**Signature**

```ts
export interface Bicovariant<F extends TypeLambda> extends TypeClass<F> {
  readonly bimap: <E1, E2, A, B>(
    f: (e: E1) => E2,
    g: (a: A) => B
  ) => <R, O>(self: Kind<F, R, O, E1, A>) => Kind<F, R, O, E2, B>
}
```

Added in v1.0.0

# utils

## bimapComposition

Returns a default `bimap` composition.

**Signature**

```ts
export declare const bimapComposition: <F extends any, G extends any>(
  CovariantF: any,
  BicovariantG: Bicovariant<G>
) => <E1, E2, A, B>(f: (e: E1) => E2, g: (a: A) => B) => <FR, FO, FE, GR, GO>(self: any) => any
```

Added in v1.0.0

## map

Returns a default `map` implementation.

**Signature**

```ts
export declare const map: <F extends any>(F: Bicovariant<F>) => any
```

Added in v1.0.0

## mapLeft

**Signature**

```ts
export declare const mapLeft: <F extends any>(
  F: Bicovariant<F>
) => <E1, E2>(f: (e: E1) => E2) => <R, O, A>(self: any) => any
```

Added in v1.0.0
