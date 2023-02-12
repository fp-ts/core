---
title: typeclass/Monoid.ts
nav_order: 33
parent: Modules
---

## Monoid overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [array](#array)
  - [mutableArray](#mutablearray)
  - [reverse](#reverse)
  - [struct](#struct)
  - [tuple](#tuple)
- [constructors](#constructors)
  - [fromSemigroup](#fromsemigroup)
  - [max](#max)
  - [min](#min)
- [instances](#instances)
  - [bigintMultiply](#bigintmultiply)
  - [bigintSum](#bigintsum)
  - [booleanAll](#booleanall)
  - [booleanAny](#booleanany)
  - [booleanEqv](#booleaneqv)
  - [booleanXor](#booleanxor)
  - [numberMultiply](#numbermultiply)
  - [numberSum](#numbersum)
  - [string](#string)
- [type class](#type-class)
  - [Monoid (interface)](#monoid-interface)

---

# combinators

## array

Given a type `A`, this function creates and returns a `Semigroup` for `ReadonlyArray<A>`.
The returned `Monoid`'s empty value is the empty array.

**Signature**

```ts
export declare const array: <A>() => Monoid<readonly A[]>
```

Added in v1.0.0

## mutableArray

Given a type `A`, this function creates and returns a `Monoid` for `Array<A>`.
The returned `Monoid`'s `empty` value is the empty array.

**Signature**

```ts
export declare const mutableArray: <A>() => Monoid<A[]>
```

Added in v1.0.0

## reverse

The dual of a `Monoid`, obtained by swapping the arguments of `combine`.

**Signature**

```ts
export declare const reverse: <A>(M: Monoid<A>) => Monoid<A>
```

Added in v1.0.0

## struct

This function creates and returns a new `Monoid` for a struct of values based on the given `Monoid`s for each property in the struct.
The returned `Monoid` combines two structs of the same type by applying the corresponding `Monoid` passed as arguments to each property in the struct.

The `empty` value of the returned `Monoid` is a struct where each property is the `empty` value of the corresponding `Monoid` in the input `monoids` object.

It is useful when you need to combine two structs of the same type and you have a specific way of combining each property of the struct.

**Signature**

```ts
export declare const struct: <A>(monoids: { readonly [K in keyof A]: Monoid<A[K]> }) => Monoid<{
  readonly [K in keyof A]: A[K]
}>
```

Added in v1.0.0

## tuple

Similar to `Promise.all` but operates on `Monoid`s.

This function creates and returns a new `Monoid` for a tuple of values based on the given `Monoid`s for each element in the tuple.
The returned `Monoid` combines two tuples of the same type by applying the corresponding `Monoid` passed as arguments to each element in the tuple.

The `empty` value of the returned `Monoid` is the tuple of `empty` values of the input `Monoid`s.

It is useful when you need to combine two tuples of the same type and you have a specific way of combining each element of the tuple.

**Signature**

```ts
export declare const tuple: <A extends readonly any[]>(...monoids: { [K in keyof A]: Monoid<A[K]> }) => Monoid<A>
```

Added in v1.0.0

# constructors

## fromSemigroup

**Signature**

```ts
export declare const fromSemigroup: <A>(S: Semigroup<A>, empty: A) => Monoid<A>
```

Added in v1.0.0

## max

Get a monoid where `combine` will return the maximum, based on the provided bounded order.

The `empty` value is the `minimum` value.

**Signature**

```ts
export declare const max: <A>(B: Bounded<A>) => Monoid<A>
```

Added in v1.0.0

## min

Get a monoid where `combine` will return the minimum, based on the provided bounded order.

The `empty` value is the `maxBound` value.

**Signature**

```ts
export declare const min: <A>(B: Bounded<A>) => Monoid<A>
```

Added in v1.0.0

# instances

## bigintMultiply

`bigint` monoid under multiplication.

The `empty` value is `1n`.

**Signature**

```ts
export declare const bigintMultiply: Monoid<bigint>
```

Added in v1.0.0

## bigintSum

`number` monoid under addition.

The `bigint` value is `0n`.

**Signature**

```ts
export declare const bigintSum: Monoid<bigint>
```

Added in v1.0.0

## booleanAll

`boolean` monoid under conjunction.

The `empty` value is `true`.

**Signature**

```ts
export declare const booleanAll: Monoid<boolean>
```

Added in v1.0.0

## booleanAny

`boolean` monoid under disjunction.

The `empty` value is `false`.

**Signature**

```ts
export declare const booleanAny: Monoid<boolean>
```

Added in v1.0.0

## booleanEqv

`boolean` monoid under equivalence.

The `empty` value is `true`.

**Signature**

```ts
export declare const booleanEqv: Monoid<boolean>
```

Added in v1.0.0

## booleanXor

`boolean` monoid under exclusive disjunction.

The `empty` value is `false`.

**Signature**

```ts
export declare const booleanXor: Monoid<boolean>
```

Added in v1.0.0

## numberMultiply

`number` monoid under multiplication.

The `empty` value is `1`.

**Signature**

```ts
export declare const numberMultiply: Monoid<number>
```

Added in v1.0.0

## numberSum

`number` monoid under addition.

The `empty` value is `0`.

**Signature**

```ts
export declare const numberSum: Monoid<number>
```

Added in v1.0.0

## string

**Signature**

```ts
export declare const string: Monoid<string>
```

Added in v1.0.0

# type class

## Monoid (interface)

**Signature**

```ts
export interface Monoid<A> extends Semigroup<A> {
  readonly empty: A
  readonly combineAll: (collection: Iterable<A>) => A
}
```

Added in v1.0.0
