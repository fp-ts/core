---
title: typeclass/Invariant.ts
nav_order: 13
parent: Modules
---

## Invariant overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Invariant (interface)](#invariant-interface)
- [utils](#utils)
  - [bindTo](#bindto)
  - [imapComposition](#imapcomposition)
  - [tupled](#tupled)

---

# type class

## Invariant (interface)

**Signature**

```ts
export interface Invariant<F extends TypeLambda> extends TypeClass<F> {
  imap: <A, B>(to: (a: A) => B, from: (b: B) => A) => <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>
}
```

Added in v1.0.0

# utils

## bindTo

**Signature**

```ts
export declare const bindTo: <F extends TypeLambda>(
  F: Invariant<F>
) => <N extends string>(name: N) => <R, O, E, A>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, { [K in N]: A }>
```

Added in v1.0.0

## imapComposition

Returns a default `imap` composition.

**Signature**

```ts
export declare const imapComposition: <F extends TypeLambda, G extends TypeLambda>(
  F: Invariant<F>,
  G: Invariant<G>
) => <A, B>(
  to: (a: A) => B,
  from: (b: B) => A
) => <FR, FO, FE, GR, GO, GE>(
  self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>
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
