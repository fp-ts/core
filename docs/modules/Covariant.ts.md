---
title: Covariant.ts
nav_order: 11
parent: Modules
---

## Covariant overview

A `Functor` is a type constructor which supports a mapping operation `map`.

`map` can be used to turn functions `A -> B` into functions `F<A> -> F<B>` whose argument and return types use the type
constructor `F` to represent some computational context.

Instances must satisfy the following laws:

1. Identity: `map(identity) <-> identity`
2. Composition: `map(flow(ab, bc)) <-> flow(map(ab), map(bc))`

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [do notation](#do-notation)
  - [bindTo](#bindto)
  - [let](#let)
- [mapping](#mapping)
  - [as](#as)
  - [flap](#flap)
  - [unit](#unit)
- [model](#model)
  - [Covariant (interface)](#covariant-interface)
- [tuple sequencing](#tuple-sequencing)
  - [tupled](#tupled)
- [utils](#utils)
  - [mapComposition](#mapcomposition)

---

# do notation

## bindTo

**Signature**

```ts
export declare const bindTo: <F extends any>(
  Covariant: Covariant<F>
) => <N extends string>(name: N) => <S, R, O, E, A>(self: any) => any
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <F extends any>(
  F: Covariant<F>
) => <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <S, R, O, E>(self: any) => any
```

Added in v3.0.0

# mapping

## as

**Signature**

```ts
export declare const as: <F extends any>(Covariant: Covariant<F>) => <B>(b: B) => <S, R, O, E>(self: any) => any
```

Added in v3.0.0

## flap

**Signature**

```ts
export declare const flap: <F extends any>(Covariant: Covariant<F>) => <A>(a: A) => <S, R, O, E, B>(self: any) => any
```

Added in v3.0.0

## unit

**Signature**

```ts
export declare const unit: <F extends any>(Covariant: Covariant<F>) => <S, R, O, E>(self: any) => any
```

Added in v3.0.0

# model

## Covariant (interface)

**Signature**

```ts
export interface Covariant<F extends TypeLambda> extends TypeClass<F> {
  readonly map: <A, B>(f: (a: A) => B) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
}
```

Added in v3.0.0

# tuple sequencing

## tupled

**Signature**

```ts
export declare const tupled: <F extends any>(Covariant: Covariant<F>) => <S, R, O, E, A>(self: any) => any
```

Added in v3.0.0

# utils

## mapComposition

Returns a default `map` composition.

**Signature**

```ts
export declare const mapComposition: <F extends any, G extends any>(
  CovariantF: Covariant<F>,
  CovariantG: Covariant<G>
) => <A, B>(f: (a: A) => B) => <FS, FR, FO, FE, GS, GR, GO, GE>(self: any) => any
```

Added in v3.0.0
