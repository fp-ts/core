---
title: typeclass/Order.ts
nav_order: 35
parent: Modules
---

## Order overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [array](#array)
  - [contramap](#contramap)
  - [struct](#struct)
  - [tuple](#tuple)
- [constructors](#constructors)
  - [make](#make)
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
- [type class](#type-class)
  - [Order (interface)](#order-interface)
- [type lambdas](#type-lambdas)
  - [OrderTypeLambda (interface)](#ordertypelambda-interface)
- [utils](#utils)
  - [between](#between)
  - [clamp](#clamp)
  - [greaterThan](#greaterthan)
  - [greaterThanOrEqualTo](#greaterthanorequalto)
  - [lessThan](#lessthan)
  - [lessThanOrEqualTo](#lessthanorequalto)
  - [max](#max)
  - [min](#min)
  - [reverse](#reverse)

---

# combinators

## array

This function creates and returns a new `Order` for an array of values based on a given `Order` for the elements of the array.
The returned `Order` compares two arrays by applying the given `Order` to each element in the arrays.
If all elements are equal, the arrays are then compared based on their length.
It is useful when you need to compare two arrays of the same type and you have a specific way of comparing each element of the array.

**Signature**

```ts
export declare const array: <A>(O: Order<A>) => Order<readonly A[]>
```

Added in v1.0.0

## contramap

**Signature**

```ts
export declare const contramap: {
  <B, A>(f: (b: B) => A): (self: Order<A>) => Order<B>
  <A, B>(self: Order<A>, f: (b: B) => A): Order<B>
}
```

Added in v1.0.0

## struct

This function creates and returns a new `Order` for a struct of values based on the given `Order`s
for each property in the struct.

**Signature**

```ts
export declare const struct: <A>(orders: { readonly [K in keyof A]: Order<A[K]> }) => Order<{
  readonly [K in keyof A]: A[K]
}>
```

Added in v1.0.0

## tuple

This function creates and returns a new `Order` for a tuple of values based on the given `Order`s for each element in the tuple.
The returned `Order` compares two tuples of the same type by applying the corresponding `Order` to each element in the tuple.
It is useful when you need to compare two tuples of the same type and you have a specific way of comparing each element
of the tuple.

**Signature**

```ts
export declare const tuple: <A extends readonly any[]>(
  ...orders: { readonly [K in keyof A]: Order<A[K]> }
) => Order<Readonly<A>>
```

Added in v1.0.0

# constructors

## make

**Signature**

```ts
export declare const make: <A>(compare: (self: A, that: A) => -1 | 0 | 1) => Order<A>
```

Added in v1.0.0

# instances

## Contravariant

**Signature**

```ts
export declare const Contravariant: contravariant.Contravariant<OrderTypeLambda>
```

Added in v1.0.0

## Invariant

**Signature**

```ts
export declare const Invariant: invariant.Invariant<OrderTypeLambda>
```

Added in v1.0.0

## Product

**Signature**

```ts
export declare const Product: product_.Product<OrderTypeLambda>
```

Added in v1.0.0

## SemiProduct

**Signature**

```ts
export declare const SemiProduct: semiProduct.SemiProduct<OrderTypeLambda>
```

Added in v1.0.0

## bigint

**Signature**

```ts
export declare const bigint: Order<bigint>
```

Added in v1.0.0

## boolean

**Signature**

```ts
export declare const boolean: Order<boolean>
```

Added in v1.0.0

## getMonoid

**Signature**

```ts
export declare const getMonoid: <A>() => Monoid<Order<A>>
```

Added in v1.0.0

## getSemigroup

**Signature**

```ts
export declare const getSemigroup: <A>() => Semigroup<Order<A>>
```

Added in v1.0.0

## number

**Signature**

```ts
export declare const number: Order<number>
```

Added in v1.0.0

## string

**Signature**

```ts
export declare const string: Order<string>
```

Added in v1.0.0

# type class

## Order (interface)

**Signature**

```ts
export interface Order<A> {
  readonly compare: (self: A, that: A) => -1 | 0 | 1
}
```

Added in v1.0.0

# type lambdas

## OrderTypeLambda (interface)

**Signature**

```ts
export interface OrderTypeLambda extends TypeLambda {
  readonly type: Order<this['Target']>
}
```

Added in v1.0.0

# utils

## between

Test whether a value is between a minimum and a maximum (inclusive).

**Signature**

```ts
export declare const between: <A>(O: Order<A>) => {
  (minimum: A, maximum: A): (a: A) => boolean
  (a: A, minimum: A, maximum: A): boolean
}
```

Added in v1.0.0

## clamp

Clamp a value between a minimum and a maximum.

**Signature**

```ts
export declare const clamp: <A>(O: Order<A>) => {
  (minimum: A, maximum: A): (a: A) => A
  (a: A, minimum: A, maximum: A): A
}
```

Added in v1.0.0

## greaterThan

Test whether one value is _strictly greater than_ another.

**Signature**

```ts
export declare const greaterThan: <A>(O: Order<A>) => { (that: A): (self: A) => boolean; (self: A, that: A): boolean }
```

Added in v1.0.0

## greaterThanOrEqualTo

Test whether one value is _non-strictly greater than_ another.

**Signature**

```ts
export declare const greaterThanOrEqualTo: <A>(O: Order<A>) => {
  (that: A): (self: A) => boolean
  (self: A, that: A): boolean
}
```

Added in v1.0.0

## lessThan

Test whether one value is _strictly less than_ another.

**Signature**

```ts
export declare const lessThan: <A>(O: Order<A>) => { (that: A): (self: A) => boolean; (self: A, that: A): boolean }
```

Added in v1.0.0

## lessThanOrEqualTo

Test whether one value is _non-strictly less than_ another.

**Signature**

```ts
export declare const lessThanOrEqualTo: <A>(O: Order<A>) => {
  (that: A): (self: A) => boolean
  (self: A, that: A): boolean
}
```

Added in v1.0.0

## max

Take the maximum of two values. If they are considered equal, the first argument is chosen.

**Signature**

```ts
export declare const max: <A>(O: Order<A>) => { (that: A): (self: A) => A; (self: A, that: A): A }
```

Added in v1.0.0

## min

Take the minimum of two values. If they are considered equal, the first argument is chosen.

**Signature**

```ts
export declare const min: <A>(O: Order<A>) => { (that: A): (self: A) => A; (self: A, that: A): A }
```

Added in v1.0.0

## reverse

**Signature**

```ts
export declare const reverse: <A>(O: Order<A>) => Order<A>
```

Added in v1.0.0
