---
title: typeclass/Equivalence.ts
nav_order: 28
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
- [constructors](#constructors)
  - [array](#array)
  - [record](#record)
  - [strict](#strict)
  - [struct](#struct)
  - [tuple](#tuple)
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
export declare const contramap: <B, A>(f: (b: B) => A) => (self: Equivalence<A>) => Equivalence<B>
```

Added in v1.0.0

# constructors

## array

Given an `Equivalence` of type `A`, returns a new `Equivalence` of type `ReadonlyArray<A>`.
The returned `Equivalence` compares arrays by first checking their length and then applying the provided `Equivalence` to each element.
If all comparisons return true, the arrays are considered equal.

**Signature**

```ts
export declare const array: <A>(equivalence: Equivalence<A>) => Equivalence<readonly A[]>
```

Added in v1.0.0

## record

Given an `Equivalence` of type `A`, returns a new `Equivalence` of type `{ readonly [x: string]: A }`.
The returned `Equivalence` compares records by first checking their number of keys and then applying the provided `Equivalence` to each value.
If all comparisons return true, the records are considered equal.

**Signature**

```ts
export declare const record: <A>(equivalence: Equivalence<A>) => Equivalence<any>
```

Added in v1.0.0

## strict

Return an `Equivalence` that uses strict equality (===) to compare values

**Signature**

```ts
export declare const strict: <A>() => Equivalence<A>
```

Added in v1.0.0

## struct

Given a struct of `Equivalence`s returns a new `Equivalence` that compares values of a struct
by applying each `Equivalence` to the corresponding property of the struct.

**Signature**

```ts
export declare const struct: <A>(equivalences: { [K in keyof A]: Equivalence<A[K]> }) => Equivalence<{
  readonly [K in keyof A]: A[K]
}>
```

Added in v1.0.0

## tuple

Given a tuple of `Equivalence`s returns a new `Equivalence` that compares values of a tuple
by applying each `Equivalence` to the corresponding element of the tuple.

**Signature**

```ts
export declare const tuple: <A extends readonly any[]>(
  ...equivalences: { readonly [K in keyof A]: Equivalence<A[K]> }
) => Equivalence<Readonly<A>>
```

Added in v1.0.0

# instances

## Contravariant

**Signature**

```ts
export declare const Contravariant: any
```

Added in v1.0.0

## Invariant

**Signature**

```ts
export declare const Invariant: any
```

Added in v1.0.0

## Product

**Signature**

```ts
export declare const Product: any
```

Added in v1.0.0

## SemiProduct

**Signature**

```ts
export declare const SemiProduct: any
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
export declare const getMonoid: <A>() => any
```

Added in v2.6.0

## getSemigroup

**Signature**

```ts
export declare const getSemigroup: <A>() => any
```

Added in v2.10.0

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
  (x: A, y: A): boolean
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