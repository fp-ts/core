---
title: typeclass/Covariant.ts
nav_order: 27
parent: Modules
---

## Covariant overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [do notation](#do-notation)
  - [let](#let)
- [mapping](#mapping)
  - [as](#as)
  - [asUnit](#asunit)
  - [flap](#flap)
- [type class](#type-class)
  - [Covariant (interface)](#covariant-interface)
- [utils](#utils)
  - [imap](#imap)
  - [mapComposition](#mapcomposition)

---

# do notation

## let

**Signature**

```ts
export declare const let: <F extends TypeLambda>(
  F: Covariant<F>
) => {
  <N extends string, A extends object, B>(name: Exclude<N, keyof A>, f: (a: A) => B): <R, O, E>(
    self: Kind<F, R, O, E, A>
  ) => Kind<F, R, O, E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <R, O, E, A extends object, N extends string, B>(
    self: Kind<F, R, O, E, A>,
    name: Exclude<N, keyof A>,
    f: (a: A) => B
  ): Kind<F, R, O, E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
}
```

Added in v1.0.0

# mapping

## as

**Signature**

```ts
export declare const as: <F extends TypeLambda>(
  F: Covariant<F>
) => {
  <B>(b: B): <R, O, E, _>(self: Kind<F, R, O, E, _>) => Kind<F, R, O, E, B>
  <R, O, E, _, B>(self: Kind<F, R, O, E, _>, b: B): Kind<F, R, O, E, B>
}
```

Added in v1.0.0

## asUnit

**Signature**

```ts
export declare const asUnit: <F extends TypeLambda>(
  F: Covariant<F>
) => <R, O, E, _>(self: Kind<F, R, O, E, _>) => Kind<F, R, O, E, void>
```

Added in v1.0.0

## flap

**Signature**

```ts
export declare const flap: <F extends TypeLambda>(
  F: Covariant<F>
) => {
  <R, O, E, A, B>(self: Kind<F, R, O, E, (a: A) => B>): (a: A) => Kind<F, R, O, E, B>
  <A, R, O, E, B>(a: A, self: Kind<F, R, O, E, (a: A) => B>): Kind<F, R, O, E, B>
}
```

Added in v1.0.0

# type class

## Covariant (interface)

**Signature**

```ts
export interface Covariant<F extends TypeLambda> extends Invariant<F> {
  readonly map: {
    <A, B>(f: (a: A) => B): <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>
    <R, O, E, A, B>(self: Kind<F, R, O, E, A>, f: (a: A) => B): Kind<F, R, O, E, B>
  }
}
```

Added in v1.0.0

# utils

## imap

Returns a default `imap` implementation.

**Signature**

```ts
export declare const imap: <F extends TypeLambda>(
  map: <R, O, E, A, B>(self: Kind<F, R, O, E, A>, f: (a: A) => B) => Kind<F, R, O, E, B>
) => {
  <A, B>(to: (a: A) => B, from: (b: B) => A): <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>
  <R, O, E, A, B>(self: Kind<F, R, O, E, A>, to: (a: A) => B, from: (b: B) => A): Kind<F, R, O, E, B>
}
```

Added in v1.0.0

## mapComposition

Returns a default `map` composition.

**Signature**

```ts
export declare const mapComposition: <F extends TypeLambda, G extends TypeLambda>(
  F: Covariant<F>,
  G: Covariant<G>
) => <FR, FO, FE, GR, GO, GE, A, B>(
  self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>,
  f: (a: A) => B
) => Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, B>>
```

Added in v1.0.0
