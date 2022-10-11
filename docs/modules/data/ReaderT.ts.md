---
title: data/ReaderT.ts
nav_order: 33
parent: Modules
---

## ReaderT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [ReaderT (interface)](#readert-interface)
  - [ap](#ap)
  - [flatMap](#flatmap)
  - [fromReader](#fromreader)
  - [map](#map)
  - [of](#of)

---

# utils

## ReaderT (interface)

**Signature**

```ts
export interface ReaderT<F extends TypeLambda, R> extends TypeLambda {
  readonly type: Reader<R, Kind<F, this['InOut1'], this['In1'], this['Out3'], this['Out2'], this['Out1']>>
}
```

Added in v3.0.0

## ap

**Signature**

```ts
export declare const ap: <F extends any>(
  Apply: any
) => <R2, S, FR2, O2, E2, A>(fa: any) => <R1, FR1, O1, E1, B>(fab: any) => any
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <F extends any>(
  Flattenable: any
) => <A, R2, S, FR2, O2, E2, B>(f: (a: A) => any) => <R1, FR1, O1, E1>(ma: any) => any
```

Added in v3.0.0

## fromReader

**Signature**

```ts
export declare const fromReader: <F extends any>(FromIdentity: any) => <R, A, S>(fa: any) => any
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <F extends any>(Functor: any) => <A, B>(f: (a: A) => B) => <R, S, FR, O, E>(fa: any) => any
```

Added in v3.0.0

## of

**Signature**

```ts
export declare const of: <F extends any>(FromIdentity: any) => <A, R, S, FR, O, E>(a: A) => any
```

Added in v3.0.0
