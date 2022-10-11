---
title: data/StateT.ts
nav_order: 40
parent: Modules
---

## StateT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [StateT (interface)](#statet-interface)
  - [ap](#ap)
  - [evaluate](#evaluate)
  - [execute](#execute)
  - [flatMap](#flatmap)
  - [fromKind](#fromkind)
  - [fromState](#fromstate)
  - [map](#map)
  - [of](#of)

---

# utils

## StateT (interface)

**Signature**

```ts
export interface StateT<F extends TypeLambda, S> extends TypeLambda {
  readonly type: (s: S) => Kind<F, this['InOut1'], this['In1'], this['Out3'], this['Out2'], readonly [S, this['Out1']]>
}
```

Added in v3.0.0

## ap

**Signature**

```ts
export declare const ap: <F extends any>(F: any) => <S, FS, R2, O2, E2, A>(fa: any) => <R1, O1, E1, B>(self: any) => any
```

Added in v3.0.0

## evaluate

**Signature**

```ts
export declare const evaluate: <F extends any>(F: any) => <S>(s: S) => <FS, R, O, E, A>(self: any) => any
```

Added in v3.0.0

## execute

**Signature**

```ts
export declare const execute: <F extends any>(F: any) => <S>(s: S) => <FS, R, O, E, A>(self: any) => any
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <F extends any>(
  F: any
) => <A, S, FS, R2, O2, E2, B>(f: (a: A) => any) => <R1, O1, E1>(self: any) => any
```

Added in v3.0.0

## fromKind

**Signature**

```ts
export declare const fromKind: <F extends any>(F: any) => <FS, R, O, E, A, S>(self: any) => any
```

Added in v3.0.0

## fromState

**Signature**

```ts
export declare const fromState: <F extends any>(F: any) => <S, A, FS>(sa: any) => any
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <F extends any>(F: any) => <A, B>(f: (a: A) => B) => <S, FS, R, O, E>(self: any) => any
```

Added in v3.0.0

## of

**Signature**

```ts
export declare const of: <F extends any>(F: any) => <A, S, FS>(a: A) => any
```

Added in v3.0.0
