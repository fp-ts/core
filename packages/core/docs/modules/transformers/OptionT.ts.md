---
title: transformers/OptionT.ts
nav_order: 35
parent: Modules
---

## OptionT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [OptionT (interface)](#optiont-interface)
  - [ap](#ap)
  - [catchAll](#catchall)
  - [flatMap](#flatmap)
  - [fromKind](#fromkind)
  - [fromResult](#fromresult)
  - [getOrElse](#getorelse)
  - [getOrElseKind](#getorelsekind)
  - [map](#map)
  - [match](#match)
  - [matchKind](#matchkind)
  - [none](#none)
  - [orElse](#orelse)
  - [some](#some)
  - [tapError](#taperror)

---

# utils

## OptionT (interface)

**Signature**

```ts
export interface OptionT<F extends TypeLambda> extends TypeLambda {
  readonly type: Kind<F, this['InOut1'], this['In1'], this['Out3'], this['Out2'], Option<this['Out1']>>
}
```

Added in v3.0.0

## ap

**Signature**

```ts
export declare const ap: <F extends any>(Apply: any) => <S, R2, O2, E2, A>(fa: any) => <R1, O1, E1, B>(self: any) => any
```

Added in v3.0.0

## catchAll

Lazy version of `orElse`.

**Signature**

```ts
export declare const catchAll: <F extends any>(
  Monad: any
) => <S, R2, O2, E2, B>(that: any) => <R1, O1, E1, A>(self: any) => any
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <F extends any>(Monad: any) => <A, S, R, O, E, B>(f: (a: A) => any) => (self: any) => any
```

Added in v3.0.0

## fromKind

**Signature**

```ts
export declare const fromKind: <F extends any>(Functor: any) => <S, R, O, E, A>(self: any) => any
```

Added in v3.0.0

## fromResult

**Signature**

```ts
export declare const fromResult: <F extends any>(FromIdentity: any) => <A, S>(e: any) => any
```

Added in v3.0.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <F extends any>(Functor: any) => <B>(onNone: B) => <S, R, O, E, A>(self: any) => any
```

Added in v3.0.0

## getOrElseKind

**Signature**

```ts
export declare const getOrElseKind: <F extends any>(
  Monad: any
) => <S, R2, O2, E2, B>(onNone: any) => <R1, O1, E1, A>(self: any) => any
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <F extends any>(Functor: any) => <A, B>(f: (a: A) => B) => <S, R, O, E>(self: any) => any
```

Added in v3.0.0

## match

**Signature**

```ts
export declare const match: <F extends any>(
  Functor: any
) => <B, A, C = B>(onNone: any, onSome: (a: A) => C) => <S, R, O, E>(self: any) => any
```

Added in v3.0.0

## matchKind

**Signature**

```ts
export declare const matchKind: <F extends any>(
  Flattenable: any
) => <S, R2, O2, E2, B, A, R3, O3, E3, C = B>(onNone: any, onSome: (a: A) => any) => <R1, O1, E1>(self: any) => any
```

Added in v3.0.0

## none

**Signature**

```ts
export declare const none: <F extends any>(FromIdentity: any) => <S>() => any
```

Added in v3.0.0

## orElse

**Signature**

```ts
export declare const orElse: <F extends any>(
  Monad: any
) => <S, R2, O2, E2, B>(that: any) => <R1, O1, E1, A>(self: any) => any
```

Added in v3.0.0

## some

**Signature**

```ts
export declare const some: <F extends any>(FromIdentity: any) => <A, S>(a: A) => any
```

Added in v3.0.0

## tapError

Returns an effect that effectfully "peeks" at the failure of this effect.

**Signature**

```ts
export declare const tapError: <F extends any>(
  Monad: any
) => <S, R2, O2, E2>(onNone: any) => <R1, O1, E1, A>(self: any) => any
```

Added in v3.0.0
