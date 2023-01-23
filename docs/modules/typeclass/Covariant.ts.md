---
title: typeclass/Covariant.ts
nav_order: 27
parent: Modules
---

## Covariant overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [make](#make)
- [mapping](#mapping)
  - [as](#as)
  - [asUnit](#asunit)
  - [flap](#flap)
- [type class](#type-class)
  - [Covariant (interface)](#covariant-interface)
- [utils](#utils)
  - [imap](#imap)
  - [let](#let)
  - [mapComposition](#mapcomposition)

---

# constructors

## make

**Signature**

```ts
export declare const make: <F extends any>(map: <A, B>(f: (a: A) => B) => <R, O, E>(self: any) => any) => Covariant<F>
```

Added in v1.0.0

# mapping

## as

**Signature**

```ts
export declare const as: <F extends any>(F: Covariant<F>) => <B>(b: B) => <R, O, E, _>(self: any) => any
```

Added in v1.0.0

## asUnit

**Signature**

```ts
export declare const asUnit: <F extends any>(F: Covariant<F>) => <R, O, E, _>(self: any) => any
```

Added in v1.0.0

## flap

**Signature**

```ts
export declare const flap: <F extends any>(F: Covariant<F>) => <A>(a: A) => <R, O, E, B>(self: any) => any
```

Added in v1.0.0

# type class

## Covariant (interface)

**Signature**

```ts
export interface Covariant<F extends TypeLambda> extends Invariant<F> {
  readonly map: <A, B>(f: (a: A) => B) => <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>
}
```

Added in v1.0.0

# utils

## imap

Returns a default `imap` implementation.

**Signature**

```ts
export declare const imap: <F extends any>(map: <A, B>(f: (a: A) => B) => <R, O, E>(self: any) => any) => any
```

Added in v1.0.0

## let

**Signature**

```ts
export declare const let: <F extends any>(
  F: Covariant<F>
) => <N extends string, A extends object, B>(name: Exclude<N, keyof A>, f: (a: A) => B) => <R, O, E>(self: any) => any
```

Added in v1.0.0

## mapComposition

Returns a default `map` composition.

**Signature**

```ts
export declare const mapComposition: <F extends any, G extends any>(
  F: Covariant<F>,
  G: Covariant<G>
) => <A, B>(f: (a: A) => B) => <FR, FO, FE, GR, GO, GE>(self: any) => any
```

Added in v1.0.0
