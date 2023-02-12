---
title: typeclass/Invariant.ts
nav_order: 31
parent: Modules
---

## Invariant overview

The `Invariant` typeclass is a higher-order abstraction over types that allow mapping the contents of a type in both directions.
It is similar to the `Covariant` typeclass but provides an `imap` opration, which allows transforming a value in both directions.
This typeclass is useful when dealing with data types that can be converted to and from some other types.
The `imap` operation provides a way to convert such data types to other types that they can interact with while preserving their invariants.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [do notation](#do-notation)
  - [bindTo](#bindto)
- [type class](#type-class)
  - [Invariant (interface)](#invariant-interface)
- [utils](#utils)
  - [imapComposition](#imapcomposition)
  - [tupled](#tupled)

---

# do notation

## bindTo

**Signature**

```ts
export declare const bindTo: <F extends TypeLambda>(
  F: Invariant<F>
) => {
  <N extends string>(name: N): <R, O, E, A>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, { [K in N]: A }>
  <R, O, E, A, N extends string>(self: Kind<F, R, O, E, A>, name: N): Kind<F, R, O, E, { [K in N]: A }>
}
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

Convert a value in a singleton array in a given effect.

**Signature**

```ts
export declare const tupled: <F extends TypeLambda>(
  F: Invariant<F>
) => <R, O, E, A>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, [A]>
```

Added in v1.0.0
