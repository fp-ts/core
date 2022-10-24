---
title: typeclass/Semigroup.ts
nav_order: 32
parent: Modules
---

## Semigroup overview

`Semigroup<A>` describes a way of combining two values of type `A` that is associative.

```ts
export interface Semigroup<A> {
  readonly combine: (that: A) => (self: A) => A
  readonly combineMany: (collection: Iterable<A>) => (self: A) => A
}
```

The combine operator must be associative, meaning that if we combine `a` with `b` and then combine the result
with `c` we must get the same value as if we combine `b` with `c` and then combine `a` with the result.

```
(a <> b) <> c === a <> (b <> c)
```

The `Semigroup` abstraction allows us to combine values of a data type to build a new value of that data type
with richer structure.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [constant](#constant)
  - [fromCombine](#fromcombine)
  - [max](#max)
  - [min](#min)
- [instances](#instances)
  - [Invariant](#invariant)
  - [NonEmptyProduct](#nonemptyproduct)
  - [Product](#product)
  - [first](#first)
  - [last](#last)
- [type class](#type-class)
  - [Semigroup (interface)](#semigroup-interface)
- [type lambdas](#type-lambdas)
  - [SemigroupTypeLambda (interface)](#semigrouptypelambda-interface)
- [utils](#utils)
  - [imap](#imap)
  - [intercalate](#intercalate)
  - [reverse](#reverse)
  - [struct](#struct)
  - [tuple](#tuple)

---

# constructors

## constant

**Signature**

```ts
export declare const constant: <A>(a: A) => Semigroup<A>
```

Added in v1.0.0

## fromCombine

Useful when `combineMany` can't be optimised.

**Signature**

```ts
export declare const fromCombine: <A>(combine: (that: A) => (self: A) => A) => Semigroup<A>
```

Added in v1.0.0

## max

`Semigroup` that returns last maximum of elements.

**Signature**

```ts
export declare const max: <A>(O: Order<A>) => Semigroup<A>
```

Added in v1.0.0

## min

`Semigroup` that returns last minimum of elements.

**Signature**

```ts
export declare const min: <A>(O: Order<A>) => Semigroup<A>
```

Added in v1.0.0

# instances

## Invariant

**Signature**

```ts
export declare const Invariant: invariant.Invariant<SemigroupTypeLambda>
```

Added in v1.0.0

## NonEmptyProduct

**Signature**

```ts
export declare const NonEmptyProduct: nonEmptyProduct.NonEmptyProduct<SemigroupTypeLambda>
```

Added in v1.0.0

## Product

**Signature**

```ts
export declare const Product: product.Product<SemigroupTypeLambda>
```

Added in v1.0.0

## first

Always return the first argument.

**Signature**

```ts
export declare const first: <A = never>() => Semigroup<A>
```

Added in v1.0.0

## last

Always return the last argument.

**Signature**

```ts
export declare const last: <A = never>() => Semigroup<A>
```

Added in v1.0.0

# type class

## Semigroup (interface)

**Signature**

```ts
export interface Semigroup<A> {
  readonly combine: (that: A) => (self: A) => A
  readonly combineMany: (collection: Iterable<A>) => (self: A) => A
}
```

Added in v1.0.0

# type lambdas

## SemigroupTypeLambda (interface)

**Signature**

```ts
export interface SemigroupTypeLambda extends TypeLambda {
  readonly type: Semigroup<this['Target']>
}
```

Added in v1.0.0

# utils

## imap

**Signature**

```ts
export declare const imap: <A, B>(to: (a: A) => B, from: (b: B) => A) => (S: Semigroup<A>) => Semigroup<B>
```

Added in v1.0.0

## intercalate

**Signature**

```ts
export declare const intercalate: <A>(separator: A) => (S: Semigroup<A>) => Semigroup<A>
```

Added in v1.0.0

## reverse

The dual of a `Semigroup`, obtained by flipping the arguments of `combine`.

**Signature**

```ts
export declare const reverse: <A>(S: Semigroup<A>) => Semigroup<A>
```

Added in v1.0.0

## struct

Given a struct of associatives returns an associative for the struct.

**Signature**

```ts
export declare const struct: <A>(semigroups: { [K in keyof A]: Semigroup<A[K]> }) => Semigroup<{
  readonly [K in keyof A]: A[K]
}>
```

Added in v1.0.0

## tuple

Given a tuple of associatives returns an associative for the tuple.

**Signature**

```ts
export declare const tuple: <A extends readonly any[]>(
  ...semigroups: { [K in keyof A]: Semigroup<A[K]> }
) => Semigroup<Readonly<A>>
```

Added in v1.0.0
