---
title: typeclass/Equivalence.ts
nav_order: 27
parent: Modules
---

## Equivalence overview

This module provides an implementation of the `Equivalence` type class, which defines a binary relation
that is reflexive, symmetric, and transitive. In other words, it defines a notion of equivalence between values of a certain type.
These properties are also known in mathematics as an "equivalence relation".

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [contramap](#contramap)
  - [struct](#struct)
  - [tuple](#tuple)
- [constructors](#constructors)
  - [make](#make)
  - [strict](#strict)
- [instances](#instances)
  - [Contravariant](#contravariant)
  - [Invariant](#invariant)
  - [Product](#product)
  - [SemiProduct](#semiproduct)
  - [bigint](#bigint)
  - [boolean](#boolean)
  - [getMonoid](#getmonoid)
  - [getSemigroup](#getsemigroup)
  - [number](#number)
  - [string](#string)
  - [symbol](#symbol)
- [type class](#type-class)
  - [Equivalence (interface)](#equivalence-interface)
- [type lambdas](#type-lambdas)
  - [EquivalenceTypeLambda (interface)](#equivalencetypelambda-interface)

---

# combinators

## contramap

**Signature**

```ts
export declare const contramap: {
  <B, A>(f: (b: B) => A): (self: Equivalence<A>) => Equivalence<B>
  <A, B>(self: Equivalence<A>, f: (b: B) => A): Equivalence<B>
}
```

Added in v1.0.0

## struct

Given a struct of `Equivalence`s returns a new `Equivalence` that compares values of a struct
by applying each `Equivalence` to the corresponding property of the struct.

**Signature**

```ts
export declare const struct: <R extends Record<string, Equivalence<any>>>(
  predicates: R
) => Equivalence<{ readonly [K in keyof R]: [R[K]] extends [Equivalence<infer A>] ? A : never }>
```

Added in v1.0.0

## tuple

Similar to `Promise.all` but operates on `Equivalence`s.

```
[Equivalence<A>, Equivalence<B>, ...] -> Equivalence<[A, B, ...]>
```

Given a tuple of `Equivalence`s returns a new `Equivalence` that compares values of a tuple
by applying each `Equivalence` to the corresponding element of the tuple.

**Signature**

```ts
export declare const tuple: <T extends readonly Equivalence<any>[]>(
  ...predicates: T
) => Equivalence<Readonly<{ [I in keyof T]: [T[I]] extends [Equivalence<infer A>] ? A : never }>>
```

Added in v1.0.0

# constructors

## make

**Signature**

```ts
export declare const make: <A>(isEquivalent: (self: A, that: A) => boolean) => Equivalence<A>
```

Added in v1.0.0

## strict

Return an `Equivalence` that uses strict equality (===) to compare values.

**Signature**

```ts
export declare const strict: <A>() => Equivalence<A>
```

Added in v1.0.0

# instances

## Contravariant

**Signature**

```ts
export declare const Contravariant: contravariant.Contravariant<EquivalenceTypeLambda>
```

Added in v1.0.0

## Invariant

**Signature**

```ts
export declare const Invariant: invariant.Invariant<EquivalenceTypeLambda>
```

Added in v1.0.0

## Product

**Signature**

```ts
export declare const Product: product_.Product<EquivalenceTypeLambda>
```

Added in v1.0.0

## SemiProduct

**Signature**

```ts
export declare const SemiProduct: semiProduct.SemiProduct<EquivalenceTypeLambda>
```

Added in v1.0.0

## bigint

**Signature**

```ts
export declare const bigint: Equivalence<bigint>
```

Added in v1.0.0

## boolean

**Signature**

```ts
export declare const boolean: Equivalence<boolean>
```

Added in v1.0.0

## getMonoid

**Signature**

```ts
export declare const getMonoid: <A>() => Monoid<Equivalence<A>>
```

Added in v1.0.0

## getSemigroup

**Signature**

```ts
export declare const getSemigroup: <A>() => Semigroup<Equivalence<A>>
```

Added in v1.0.0

## number

**Signature**

```ts
export declare const number: Equivalence<number>
```

Added in v1.0.0

## string

**Signature**

```ts
export declare const string: Equivalence<string>
```

Added in v1.0.0

## symbol

**Signature**

```ts
export declare const symbol: Equivalence<symbol>
```

Added in v1.0.0

# type class

## Equivalence (interface)

**Signature**

```ts
export interface Equivalence<A> {
  (self: A, that: A): boolean
}
```

Added in v1.0.0

# type lambdas

## EquivalenceTypeLambda (interface)

**Signature**

```ts
export interface EquivalenceTypeLambda extends TypeLambda {
  readonly type: Equivalence<this['Target']>
}
```

Added in v1.0.0
