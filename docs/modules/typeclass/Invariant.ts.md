---
title: typeclass/Invariant.ts
nav_order: 32
parent: Modules
---

## Invariant overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [make](#make)
- [type class](#type-class)
  - [Invariant (interface)](#invariant-interface)
- [utils](#utils)
  - [bindTo](#bindto)
  - [imapComposition](#imapcomposition)
  - [tupled](#tupled)

---

# constructors

## make

**Signature**

```ts
export declare const make: <F extends TypeLambda>(
  imap: <R, O, E, A, B>(self: Kind<F, R, O, E, A>, to: (a: A) => B, from: (b: B) => A) => Kind<F, R, O, E, B>
) => Invariant<F>
```

Added in v1.0.0

# type class

## Invariant (interface)

**Signature**

```ts
export interface Invariant<F extends TypeLambda> extends TypeClass<F> {
  readonly imap: {
    <A, B>(to: (a: A) => B, from: (b: B) => A): <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>
    <R, O, E, A, B>(self: Kind<F, R, O, E, A>, to: (a: A) => B, from: (b: B) => A): Kind<F, R, O, E, B>
  }
}
```

Added in v1.0.0

# utils

## bindTo

**Signature**

```ts
export declare const bindTo: <F extends TypeLambda>(
  F: Invariant<F>
) => <N extends string>(
  name: N
) => <R, O, E, A>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, { readonly [K in N]: A }>
```

Added in v1.0.0

## imapComposition

Returns a default ternary `imap` composition.

**Signature**

```ts
export declare const imapComposition: <F extends TypeLambda, G extends TypeLambda>(
  F: Invariant<F>,
  G: Invariant<G>
) => <FR, FO, FE, GR, GO, GE, A, B>(
  self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>,
  to: (a: A) => B,
  from: (b: B) => A
) => Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, B>>
```

Added in v1.0.0

## tupled

**Signature**

```ts
export declare const tupled: <F extends TypeLambda>(
  F: Invariant<F>
) => <R, O, E, A>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, [A]>
```

Added in v1.0.0
