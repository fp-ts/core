---
title: Traversable.ts
nav_order: 28
parent: Modules
---

## Traversable overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Traversable (interface)](#traversable-interface)
- [utils](#utils)
  - [sequence](#sequence)
  - [traverseComposition](#traversecomposition)

---

# type class

## Traversable (interface)

**Signature**

```ts
export interface Traversable<T extends TypeLambda> extends TypeClass<T> {
  readonly traverse: <F extends TypeLambda>(
    Monoidal: Monoidal<F>
  ) => <A, S, R, O, E, B>(
    f: (a: A) => Kind<F, S, R, O, E, B>
  ) => <TS, TR, TO, TE>(self: Kind<T, TS, TR, TO, TE, A>) => Kind<F, S, R, O, E, Kind<T, TS, TR, TO, TE, B>>
}
```

Added in v1.0.0

# utils

## sequence

**Signature**

```ts
export declare const sequence: <T extends any>(
  Traversable: Traversable<T>
) => <F extends any>(G: any) => <TS, TR, TO, TE, S, R, O, E, A>(self: any) => any
```

Added in v1.0.0

## traverseComposition

Returns a default `traverse` composition.

**Signature**

```ts
export declare const traverseComposition: <F extends any, G extends any>(
  TraversableF: Traversable<F>,
  TraversableG: Traversable<G>
) => <H extends any>(
  H: any
) => <A, S, R, O, E, B>(f: (a: A) => any) => <FS, FR, FO, FE, GS, GR, GO, GE>(fga: any) => any
```

Added in v1.0.0
