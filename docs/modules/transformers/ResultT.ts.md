---
title: transformers/ResultT.ts
nav_order: 40
parent: Modules
---

## ResultT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [ResultT (interface)](#resultt-interface)
  - [ap](#ap)
  - [bracket](#bracket)
  - [catchAll](#catchall)
  - [compact](#compact)
  - [fail](#fail)
  - [failKind](#failkind)
  - [flatMap](#flatmap)
  - [flatMapError](#flatmaperror)
  - [fromKind](#fromkind)
  - [getOrElse](#getorelse)
  - [getOrElseKind](#getorelsekind)
  - [getValidatedOrElse](#getvalidatedorelse)
  - [map](#map)
  - [mapBoth](#mapboth)
  - [mapError](#maperror)
  - [match](#match)
  - [matchKind](#matchkind)
  - [orElse](#orelse)
  - [reverse](#reverse)
  - [separate](#separate)
  - [succeed](#succeed)
  - [tapLeft](#tapleft)
  - [toUnion](#tounion)

---

# utils

## ResultT (interface)

**Signature**

```ts
export interface ResultT<F extends TypeLambda, E> extends TypeLambda {
  readonly type: Kind<F, this['InOut1'], this['In1'], this['Out3'], this['Out2'], Result<E, this['Out1']>>
}
```

Added in v3.0.0

## ap

**Signature**

```ts
export declare const ap: <F extends any>(
  Apply: any
) => <S, R2, O2, FE2, E2, A>(fa: any) => <R1, O1, FE1, E1, B>(self: any) => any
```

Added in v3.0.0

## bracket

**Signature**

```ts
export declare const bracket: <F extends any>(
  Monad: any
) => <S, R1, O1, FE1, E1, A, R2, O2, FE2, E2, B, R3, O3, FE3, E3>(
  acquire: any,
  use: (a: A) => any,
  release: (a: A, e: any) => any
) => any
```

Added in v3.0.0

## catchAll

**Signature**

```ts
export declare const catchAll: <F extends any>(
  Monad: any
) => <E1, S, R2, O2, FE2, E2, B>(onError: (e: E1) => any) => <R1, O1, FE1, A>(self: any) => any
```

Added in v3.0.0

## compact

**Signature**

```ts
export declare const compact: <F extends any>(Functor: any) => <E>(onNone: E) => <S, R, O, FE, A>(self: any) => any
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
export declare const failKind: <F extends any>(Functor: any) => <S, R, O, FE, E>(fe: any) => any
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <F extends any>(
  Monad: any
) => <A, S, R2, O2, FE2, E2, B>(f: (a: A) => any) => <R1, O1, FE1, E1>(self: any) => any
```

Added in v3.0.0

## flatMapError

Creates a composite effect that represents this effect followed by another
one that may depend on the error produced by this one.

**Signature**

```ts
export declare const flatMapError: <F extends any>(
  Monad: any
) => <E1, S, R, O, FE, E2>(f: (e: E1) => any) => <A>(self: any) => any
```

Added in v3.0.0

## fromKind

**Signature**

```ts
export declare const fromKind: <F extends any>(Functor: any) => <S, R, O, FE, A>(fa: any) => any
```

Added in v3.0.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <F extends any>(Functor: any) => <B>(onError: B) => <S, R, O, FE, A>(self: any) => any
```

Added in v3.0.0

## getOrElseKind

**Signature**

```ts
export declare const getOrElseKind: <F extends any>(
  Monad: any
) => <S, R2, O2, FE2, B>(onError: any) => <R1, O1, FE1, A>(self: any) => any
```

Added in v3.0.0

## getValidatedOrElse

**Signature**

```ts
export declare const getValidatedOrElse: <F extends any, E>(
  Monad: any,
  Semigroup: any
) => <S, R2, O2, FE2, B>(that: any) => <R1, O1, FE1, A>(self: any) => any
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
) => <E, B, A, C = B>(onError: (e: E) => B, onSuccess: (a: A) => C) => <S, R, O, FE>(self: any) => any
```

Added in v3.0.0

## matchKind

**Signature**

```ts
export declare const matchKind: <F extends any>(
  Flattenable: any
) => <E, S, R2, O2, FE2, B, A, R3, O3, FE3, C = B>(
  onError: (e: E) => any,
  onSuccess: (a: A) => any
) => <R1, O1, FE1>(self: any) => any
```

Added in v3.0.0

## orElse

**Signature**

```ts
export declare const orElse: <F extends any>(
  Monad: any
) => <S, R2, O2, FE2, E2, B>(that: any) => <R1, O1, FE1, E1, A>(self: any) => any
```

Added in v3.0.0

## reverse

**Signature**

```ts
export declare const reverse: <F extends any>(Functor: any) => <S, R, O, FE, E, A>(self: any) => any
```

Added in v3.0.0

## separate

**Signature**

```ts
export declare const separate: <F extends any>(
  Functor: any
) => <E>(onEmpty: E) => <S, R, O, FE, A, B>(self: any) => readonly [any, any]
```

Added in v3.0.0

## succeed

**Signature**

```ts
export declare const succeed: <F extends any>(FromIdentity: any) => <A, S>(a: A) => any
```

Added in v3.0.0

## tapLeft

Returns an effect that effectfully "peeks" at the failure of this effect.

**Signature**

```ts
export declare const tapLeft: <F extends any>(
  Monad: any
) => <E1, S, R2, O2, FE2, E2>(onError: (e: E1) => any) => <R1, O1, FE1, A>(self: any) => any
```

Added in v3.0.0

## toUnion

**Signature**

```ts
export declare const toUnion: <F extends any>(Functor: any) => <S, R, O, FE, E, A>(self: any) => any
```

Added in v3.0.0
