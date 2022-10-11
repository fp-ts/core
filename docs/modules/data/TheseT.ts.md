---
title: data/TheseT.ts
nav_order: 44
parent: Modules
---

## TheseT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [TheseT (interface)](#theset-interface)
  - [ap](#ap)
  - [both](#both)
  - [fail](#fail)
  - [failKind](#failkind)
  - [flatMap](#flatmap)
  - [fromKind](#fromkind)
  - [map](#map)
  - [mapBoth](#mapboth)
  - [mapError](#maperror)
  - [match](#match)
  - [matchKind](#matchkind)
  - [reverse](#reverse)
  - [succeed](#succeed)
  - [toTuple2](#totuple2)

---

# utils

## TheseT (interface)

**Signature**

```ts
export interface TheseT<F extends TypeLambda, E> extends TypeLambda {
  readonly type: Kind<F, this['InOut1'], this['In1'], this['Out3'], this['Out2'], These<E, this['Out1']>>
}
```

Added in v3.0.0

## ap

**Signature**

```ts
export declare const ap: <F extends any, E>(
  Apply: any,
  Semigroup: any
) => <S, R2, O2, FE2, A>(fa: any) => <R1, O1, FE1, B>(self: any) => any
```

Added in v3.0.0

## both

**Signature**

```ts
export declare const both: <F extends any>(FromIdentity: any) => <E, A, S>(e: E, a: A) => any
```

Added in v3.0.0

## fail

**Signature**

```ts
export declare const fail: <F extends any>(FromIdentity: any) => <E, S>(e: E) => any
```

Added in v3.0.0

## failKind

**Signature**

```ts
export declare const failKind: <F extends any>(Functor: any) => <S, R, O, FE, E>(fl: any) => any
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <F extends any, E>(
  Monad: any,
  Semigroup: any
) => <A, S, R2, O2, FE2, B>(f: (a: A) => any) => <R1, O1, FE1>(self: any) => any
```

Added in v3.0.0

## fromKind

**Signature**

```ts
export declare const fromKind: <F extends any>(Functor: any) => <S, R, O, FE, A>(fa: any) => any
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <F extends any>(Functor: any) => <A, B>(f: (a: A) => B) => <S, R, O, FE, E>(self: any) => any
```

Added in v3.0.0

## mapBoth

Returns an effect whose failure and success channels have been mapped by
the specified pair of functions, `f` and `g`.

**Signature**

```ts
export declare const mapBoth: <F extends any>(
  Functor: any
) => <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <S, R, O, FE>(self: any) => any
```

Added in v3.0.0

## mapError

**Signature**

```ts
export declare const mapError: <F extends any>(
  Functor: any
) => <E, G>(f: (e: E) => G) => <S, R, O, FE, A>(self: any) => any
```

Added in v3.0.0

## match

**Signature**

```ts
export declare const match: <F extends any>(
  Functor: any
) => <E, B, A, C = B, D = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C,
  onBoth: (e: E, a: A) => D
) => <S, R, O, FE>(self: any) => any
```

Added in v3.0.0

## matchKind

**Signature**

```ts
export declare const matchKind: <F extends any>(
  Flattenable: any
) => <E, S, R2, O2, FE2, B, A, R3, O3, FE3, R4, O4, FE4, C = B, D = B>(
  onError: (e: E) => any,
  onSuccess: (a: A) => any,
  onBoth: (e: E, a: A) => any
) => <R1, O1, FE1>(self: any) => any
```

Added in v3.0.0

## reverse

**Signature**

```ts
export declare const reverse: <F extends any>(Functor: any) => <S, R, O, FE, E, A>(self: any) => any
```

Added in v3.0.0

## succeed

**Signature**

```ts
export declare const succeed: <F extends any>(FromIdentity: any) => <A, S>(a: A) => any
```

Added in v3.0.0

## toTuple2

**Signature**

```ts
export declare const toTuple2: <F extends any>(Functor: any) => <E, A>(e: E, a: A) => <S, R, O, FE>(self: any) => any
```

Added in v3.0.0
