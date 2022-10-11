---
title: typeclasses/Flattenable.ts
nav_order: 57
parent: Modules
---

## Flattenable overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [do notation](#do-notation)
  - [bind](#bind)
- [model](#model)
  - [Flattenable (interface)](#flattenable-interface)
- [sequencing](#sequencing)
  - [zipLeft](#zipleft)
  - [zipRight](#zipright)
- [utils](#utils)
  - [ap](#ap)
  - [composeKleisli](#composekleisli)
  - [tap](#tap)

---

# do notation

## bind

**Signature**

```ts
export declare const bind: <M extends any>(
  Flattenable: Flattenable<M>
) => <N extends string, A extends object, S, R2, O2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => any
) => <R1, O1, E1>(self: any) => any
```

Added in v3.0.0

# model

## Flattenable (interface)

**Signature**

```ts
export interface Flattenable<M extends TypeLambda> extends Functor<M> {
  readonly flatMap: <A, S, R2, O2, E2, B>(
    f: (a: A) => Kind<M, S, R2, O2, E2, B>
  ) => <R1, O1, E1>(self: Kind<M, S, R1, O1, E1, A>) => Kind<M, S, R1 & R2, O1 | O2, E1 | E2, B>
}
```

Added in v3.0.0

# sequencing

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: <F extends any>(
  Flattenable: Flattenable<F>
) => <S, R2, O2, E2>(that: any) => <R1, O1, E1, A>(self: any) => any
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <F extends any>(
  Flattenable: Flattenable<F>
) => <S, R2, O2, E2, A>(that: any) => <R1, O1, E1>(self: any) => any
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <F extends any>(Flattenable: Flattenable<F>) => any
```

Added in v3.0.0

## composeKleisli

**Signature**

```ts
export declare const composeKleisli: <F extends any>(Flattenable: Flattenable<F>) => any
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <F extends any>(
  Flattenable: Flattenable<F>
) => <A, S, R2, O2, E2>(f: (a: A) => any) => <R1, O1, E1>(self: any) => any
```

Added in v3.0.0
