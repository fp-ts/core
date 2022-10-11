---
title: data/WriterT.ts
nav_order: 49
parent: Modules
---

## WriterT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [WriterT (interface)](#writert-interface)
  - [ap](#ap)
  - [censor](#censor)
  - [flatMap](#flatmap)
  - [fromAsync](#fromasync)
  - [fromKind](#fromkind)
  - [fromSync](#fromsync)
  - [fst](#fst)
  - [listen](#listen)
  - [listens](#listens)
  - [map](#map)
  - [mapBoth](#mapboth)
  - [mapLeft](#mapleft)
  - [of](#of)
  - [pass](#pass)
  - [reverse](#reverse)
  - [snd](#snd)
  - [tell](#tell)

---

# utils

## WriterT (interface)

**Signature**

```ts
export interface WriterT<F extends TypeLambda, W> extends TypeLambda {
  readonly type: Kind<F, this['InOut1'], this['In1'], this['Out3'], this['Out2'], Writer<W, this['Out1']>>
}
```

Added in v3.0.0

## ap

**Signature**

```ts
export declare const ap: <F extends any, W>(
  Apply: any,
  Semigroup: any
) => <S, R2, O2, E2, A>(fa: any) => <R1, O1, E1, B>(self: any) => any
```

Added in v3.0.0

## censor

Modify the final accumulator value by applying a function

**Signature**

```ts
export declare const censor: <F extends any>(Functor: any) => <W>(f: (w: W) => W) => <S, R, O, E, A>(self: any) => any
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <F extends any, W>(
  Flattenable: any,
  Semigroup: any
) => <A, S, R1, FO1, E1, B>(f: (a: A) => any) => <R2, FO2, E2>(self: any) => any
```

Added in v3.0.0

## fromAsync

**Signature**

```ts
export declare const fromAsync: <F extends any>(Functor: any, FromAsync: any) => <W>(w: W) => <A, S>(fa: any) => any
```

Added in v3.0.0

## fromKind

**Signature**

```ts
export declare const fromKind: <F extends any>(Functor: any) => <W>(w: W) => <S, R, O, E, A>(fa: any) => any
```

Added in v3.0.0

## fromSync

**Signature**

```ts
export declare const fromSync: <F extends any>(Functor: any, FromSync: any) => <W>(w: W) => <A, S>(fa: any) => any
```

Added in v3.0.0

## fst

**Signature**

```ts
export declare const fst: <F extends any>(Functor: any) => <S, R, O, E, W>(self: any) => any
```

Added in v3.0.0

## listen

Modifies the result to include the changes to the accumulator

**Signature**

```ts
export declare const listen: <F extends any>(Functor: any) => <S, R, O, E, W, A>(self: any) => any
```

Added in v3.0.0

## listens

Projects a value from modifications made to the accumulator during an action

**Signature**

```ts
export declare const listens: <F extends any>(
  Functor: any
) => <W, B>(f: (w: W) => B) => <S, R, O, E, A>(self: any) => any
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <F extends any>(Functor: any) => <A, B>(f: (a: A) => B) => <S, R, O, E, W>(self: any) => any
```

Added in v3.0.0

## mapBoth

**Signature**

```ts
export declare const mapBoth: <F extends any>(
  Functor: any
) => <W, X, A, B>(f: (w: W) => X, g: (a: A) => B) => <S, R, O, E>(self: any) => any
```

Added in v3.0.0

## mapLeft

**Signature**

```ts
export declare const mapLeft: <F extends any>(
  Functor: any
) => <W, X>(f: (w: W) => X) => <S, R, O, E, A>(self: any) => any
```

Added in v3.0.0

## of

**Signature**

```ts
export declare const of: <F extends any, W>(FromIdentity: any, Monoid: any) => <A, S>(a: A) => any
```

Added in v3.0.0

## pass

Applies the returned function to the accumulator

**Signature**

```ts
export declare const pass: <F extends any>(Functor: any) => <S, R, O, E, W, A>(self: any) => any
```

Added in v3.0.0

## reverse

**Signature**

```ts
export declare const reverse: <F extends any>(Functor: any) => <S, R, O, E, W, A>(self: any) => any
```

Added in v3.0.0

## snd

**Signature**

```ts
export declare const snd: <F extends any>(Functor: any) => <S, R, O, E, A>(self: any) => any
```

Added in v3.0.0

## tell

**Signature**

```ts
export declare const tell: <F extends any>(FromIdentity: any) => <W, S>(w: W) => any
```

Added in v3.0.0
