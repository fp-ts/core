---
title: Bifunctor.ts
nav_order: 2
parent: Modules
---

## Bifunctor overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Bifunctor (interface)](#bifunctor-interface)
- [utils](#utils)
  - [map](#map)
  - [mapBothComposition](#mapbothcomposition)
  - [mapLeft](#mapleft)

---

# type class

## Bifunctor (interface)

**Signature**

```ts
export interface Bifunctor<F extends TypeLambda> extends TypeClass<F> {
  readonly mapBoth: <E, G, A, B>(
    f: (e: E) => G,
    g: (a: A) => B
  ) => <S, R, O>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, G, B>
}
```

Added in v3.0.0

# utils

## map

Returns a default `map` implementation.

**Signature**

```ts
export declare const map: <F extends any>(Bifunctor: Bifunctor<F>) => any
```

Added in v3.0.0

## mapBothComposition

Returns a default `mapBoth` composition.

**Signature**

```ts
export declare const mapBothComposition: <F extends any, G extends any>(
  FunctorF: any,
  BifunctorG: Bifunctor<G>
) => <GE, GG, A, B>(f: (e: GE) => GG, g: (a: A) => B) => <FS, FR, FO, FE, GS, GR, GO>(self: any) => any
```

Added in v3.0.0

## mapLeft

**Signature**

```ts
export declare const mapLeft: <F extends any>(
  Bifunctor: Bifunctor<F>
) => <E, G>(f: (e: E) => G) => <S, R, O, A>(self: any) => any
```

Added in v3.0.0
