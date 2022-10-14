---
title: Functor.ts
nav_order: 14
parent: Modules
---

## Functor overview

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
- [tuple sequencing](#tuple-sequencing)
  - [tupled](#tupled)
- [type class](#type-class)
  - [Functor (interface)](#functor-interface)
- [utils](#utils)
  - [mapComposition](#mapcomposition)

---

# do notation

## bindTo

**Signature**

```ts
export declare const bindTo: <F extends any>(
  Functor: Functor<F>
) => <N extends string>(name: N) => <S, R, O, E, A>(self: any) => any
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <F extends any>(
  F: Functor<F>
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
export declare const as: <F extends any>(Functor: Functor<F>) => <B>(b: B) => <S, R, O, E>(self: any) => any
```

Added in v3.0.0

## flap

**Signature**

```ts
export declare const flap: <F extends any>(Functor: Functor<F>) => <A>(a: A) => <S, R, O, E, B>(self: any) => any
```

Added in v3.0.0

## unit

**Signature**

```ts
export declare const unit: <F extends any>(Functor: Functor<F>) => <S, R, O, E>(self: any) => any
```

Added in v3.0.0

# tuple sequencing

## tupled

**Signature**

```ts
export declare const tupled: <F extends any>(Functor: Functor<F>) => <S, R, O, E, A>(self: any) => any
```

Added in v3.0.0

# type class

## Functor (interface)

**Signature**

```ts
export interface Functor<F extends TypeLambda> extends TypeClass<F> {
  readonly map: <A, B>(f: (a: A) => B) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
}
```

Added in v3.0.0

# utils

## mapComposition

Returns a default `map` composition.

**Signature**

```ts
export declare const mapComposition: <F extends any, G extends any>(
  FunctorF: Functor<F>,
  FunctorG: Functor<G>
) => <A, B>(f: (a: A) => B) => <FS, FR, FO, FE, GS, GR, GO, GE>(self: any) => any
```

Added in v3.0.0
