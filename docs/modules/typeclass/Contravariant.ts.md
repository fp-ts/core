---
title: typeclass/Contravariant.ts
nav_order: 25
parent: Modules
---

## Contravariant overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [make](#make)
- [type class](#type-class)
  - [Contravariant (interface)](#contravariant-interface)
- [utils](#utils)
  - [contramapComposition](#contramapcomposition)
  - [imap](#imap)

---

# constructors

## make

**Signature**

```ts
export declare const make: <F extends any>(
  contramap: <B, A>(f: (b: B) => A) => <R, O, E>(self: any) => any
) => Contravariant<F>
```

Added in v1.0.0

# type class

## Contravariant (interface)

**Signature**

```ts
export interface Contravariant<F extends TypeLambda> extends Invariant<F> {
  readonly contramap: <B, A>(f: (b: B) => A) => <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>
}
```

Added in v1.0.0

# utils

## contramapComposition

Composing two contravariant functors yields a Covariant functor.

Returns a default `map` composition.

**Signature**

```ts
export declare const contramapComposition: <F extends any, G extends any>(
  F: Contravariant<F>,
  G: Contravariant<G>
) => <A, B>(f: (a: A) => B) => <FR, FO, FE, GR, GO, GE>(self: any) => any
```

Added in v1.0.0

## imap

Returns a default `imap` implementation.

**Signature**

```ts
export declare const imap: <F extends any>(contramap: <B, A>(f: (b: B) => A) => <R, O, E>(self: any) => any) => any
```

Added in v1.0.0
