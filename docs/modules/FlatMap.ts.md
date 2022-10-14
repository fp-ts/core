---
title: FlatMap.ts
nav_order: 11
parent: Modules
---

## FlatMap overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [do notation](#do-notation)
  - [bind](#bind)
- [sequencing](#sequencing)
  - [zipLeft](#zipleft)
  - [zipRight](#zipright)
- [type class](#type-class)
  - [FlatMap (interface)](#flatmap-interface)
- [utils](#utils)
  - [composeKleisli](#composekleisli)
  - [tap](#tap)
  - [zip](#zip)

---

# do notation

## bind

**Signature**

```ts
export declare const bind: <M extends any>(
  FlatMap: FlatMap<M>
) => <N extends string, A extends object, S, R2, O2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => any
) => <R1, O1, E1>(self: any) => any
```

Added in v3.0.0

# sequencing

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: <F extends any>(
  FlatMap: FlatMap<F>
) => <S, R2, O2, E2>(that: any) => <R1, O1, E1, A>(self: any) => any
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <F extends any>(
  FlatMap: FlatMap<F>
) => <S, R2, O2, E2, A>(that: any) => <R1, O1, E1>(self: any) => any
```

Added in v3.0.0

# type class

## FlatMap (interface)

**Signature**

```ts
export interface FlatMap<M extends TypeLambda> extends Functor<M> {
  readonly flatMap: <A, S, R2, O2, E2, B>(
    f: (a: A) => Kind<M, S, R2, O2, E2, B>
  ) => <R1, O1, E1>(self: Kind<M, S, R1, O1, E1, A>) => Kind<M, S, R1 & R2, O1 | O2, E1 | E2, B>
}
```

Added in v3.0.0

# utils

## composeKleisli

**Signature**

```ts
export declare const composeKleisli: <F extends any>(Flattenable: FlatMap<F>) => any
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <F extends any>(
  FlatMap: FlatMap<F>
) => <A, S, R2, O2, E2>(f: (a: A) => any) => <R1, O1, E1>(self: any) => any
```

Added in v3.0.0

## zip

**Signature**

```ts
export declare const zip: <F extends any>(FlatMap: FlatMap<F>) => any
```

Added in v3.0.0
