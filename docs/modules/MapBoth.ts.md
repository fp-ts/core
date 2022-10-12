---
title: MapBoth.ts
nav_order: 22
parent: Modules
---

## MapBoth overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [MapBoth (interface)](#mapboth-interface)
- [utils](#utils)
  - [map](#map)
  - [mapBothComposition](#mapbothcomposition)
  - [mapLeft](#mapleft)

---

# model

## MapBoth (interface)

**Signature**

```ts
export interface MapBoth<F extends TypeLambda> extends TypeClass<F> {
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
export declare const map: <F extends any>(MapBoth: MapBoth<F>) => any
```

Added in v3.0.0

## mapBothComposition

Returns a default `mapBoth` composition.

**Signature**

```ts
export declare const mapBothComposition: <F extends any, G extends any>(
  FunctorF: any,
  MapBothG: MapBoth<G>
) => <GE, GG, A, B>(f: (e: GE) => GG, g: (a: A) => B) => <FS, FR, FO, FE, GS, GR, GO>(self: any) => any
```

Added in v3.0.0

## mapLeft

**Signature**

```ts
export declare const mapLeft: <F extends any>(
  MapBoth: MapBoth<F>
) => <E, G>(f: (e: E) => G) => <S, R, O, A>(self: any) => any
```

Added in v3.0.0
