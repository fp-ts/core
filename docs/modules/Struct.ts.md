---
title: Struct.ts
nav_order: 15
parent: Modules
---

## Struct overview

This module provides utility functions for working with structs in TypeScript.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [getEquivalence](#getequivalence)
  - [getMonoid](#getmonoid)
  - [getOrder](#getorder)
  - [getSemigroup](#getsemigroup)
- [utils](#utils)
  - [omit](#omit)
  - [pick](#pick)

---

# combinators

## getEquivalence

Given a struct of `Equivalence`s returns a new `Equivalence` that compares values of a struct
by applying each `Equivalence` to the corresponding property of the struct.

**Signature**

```ts
export declare const getEquivalence: <A>(equivalences: {
  [K in keyof A]: equivalence.Equivalence<A[K]>
}) => equivalence.Equivalence<{ readonly [K in keyof A]: A[K] }>
```

Added in v1.0.0

## getMonoid

This function creates and returns a new `Monoid` for a struct of values based on the given `Monoid`s for each property in the struct.
The returned `Monoid` combines two structs of the same type by applying the corresponding `Monoid` passed as arguments to each property in the struct.

The `empty` value of the returned `Monoid` is a struct where each property is the `empty` value of the corresponding `Monoid` in the input `monoids` object.

It is useful when you need to combine two structs of the same type and you have a specific way of combining each property of the struct.

**Signature**

```ts
export declare const getMonoid: <A>(monoids: { readonly [K in keyof A]: monoid.Monoid<A[K]> }) => monoid.Monoid<{
  readonly [K in keyof A]: A[K]
}>
```

Added in v1.0.0

## getOrder

This function creates and returns a new `Order` for a struct of values based on the given `Order`s
for each property in the struct.

**Signature**

```ts
export declare const getOrder: <A>(orders: { readonly [K in keyof A]: order.Order<A[K]> }) => order.Order<{
  readonly [K in keyof A]: A[K]
}>
```

Added in v1.0.0

## getSemigroup

This function creates and returns a new `Semigroup` for a struct of values based on the given `Semigroup`s for each property in the struct.
The returned `Semigroup` combines two structs of the same type by applying the corresponding `Semigroup` passed as arguments to each property in the struct.

It is useful when you need to combine two structs of the same type and you have a specific way of combining each property of the struct.

**Signature**

```ts
export declare const getSemigroup: <A>(semigroups: {
  readonly [K in keyof A]: semigroup.Semigroup<A[K]>
}) => semigroup.Semigroup<{ readonly [K in keyof A]: A[K] }>
```

Added in v1.0.0

# utils

## omit

Create a new object by omitting properties of an existing object.

**Signature**

```ts
export declare const omit: <S, Keys extends readonly [keyof S, ...(keyof S)[]]>(
  ...keys: Keys
) => (s: S) => { [K in Exclude<keyof S, Keys[number]>]: S[K] }
```

Added in v1.0.0

## pick

Create a new object by picking properties of an existing object.

**Signature**

```ts
export declare const pick: <S, Keys extends readonly [keyof S, ...(keyof S)[]]>(
  ...keys: Keys
) => (s: S) => { [K in Keys[number]]: S[K] }
```

Added in v1.0.0
