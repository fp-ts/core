---
title: typeclass/Order.ts
nav_order: 29
parent: Modules
---

## Order overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [fromCompare](#fromcompare)
- [instances](#instances)
  - [Contravariant](#contravariant)
  - [Invariant](#invariant)
  - [NonEmptyProduct](#nonemptyproduct)
  - [Product](#product)
  - [getMonoid](#getmonoid)
  - [getSemigroup](#getsemigroup)
- [type class](#type-class)
  - [Order (interface)](#order-interface)
- [type lambdas](#type-lambdas)
  - [OrderTypeLambda (interface)](#ordertypelambda-interface)
- [utils](#utils)
  - [between](#between)
  - [clamp](#clamp)
  - [contramap](#contramap)
  - [greaterThan](#greaterthan)
  - [greaterThanOrEqualTo](#greaterthanorequalto)
  - [lessThan](#lessthan)
  - [lessThanOrEqualTo](#lessthanorequalto)
  - [max](#max)
  - [min](#min)
  - [reverse](#reverse)
  - [tuple](#tuple)

---

# constructors

## fromCompare

Main constructor.

**Signature**

```ts
export declare const fromCompare: <A>(compare: (that: A) => (self: A) => 0 | 1 | -1) => Order<A>
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

## NonEmptyProduct

**Signature**

```ts
export declare const NonEmptyProduct: nonEmptyProduct.NonEmptyProduct<OrderTypeLambda>
```

Added in v1.0.0

## Product

**Signature**

```ts
export declare const Product: product.Product<OrderTypeLambda>
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

# type class

## Order (interface)

**Signature**

```ts
export interface Order<A> {
  readonly compare: (that: A) => (self: A) => -1 | 0 | 1
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
export declare const between: <A>(O: Order<A>) => (minimum: A, maximum: A) => (a: A) => boolean
```

Added in v1.0.0

## clamp

Clamp a value between a minimum and a maximum.

**Signature**

```ts
export declare const clamp: <A>(O: Order<A>) => (minimum: A, maximum: A) => (a: A) => A
```

Added in v1.0.0

## contramap

**Signature**

```ts
export declare const contramap: <B, A>(f: (b: B) => A) => (self: Order<A>) => Order<B>
```

Added in v1.0.0

## greaterThan

Test whether one value is _strictly greater than_ another.

**Signature**

```ts
export declare const greaterThan: <A>(O: Order<A>) => (that: A) => (self: A) => boolean
```

Added in v1.0.0

## greaterThanOrEqualTo

Test whether one value is _non-strictly greater than_ another.

**Signature**

```ts
export declare const greaterThanOrEqualTo: <A>(O: Order<A>) => (that: A) => (self: A) => boolean
```

Added in v1.0.0

## lessThan

Test whether one value is _strictly less than_ another.

**Signature**

```ts
export declare const lessThan: <A>(O: Order<A>) => (that: A) => (self: A) => boolean
```

Added in v1.0.0

## lessThanOrEqualTo

Test whether one value is _non-strictly less than_ another.

**Signature**

```ts
export declare const lessThanOrEqualTo: <A>(O: Order<A>) => (that: A) => (self: A) => boolean
```

Added in v1.0.0

## max

Take the maximum of two values. If they are considered equal, the first argument is chosen.

**Signature**

```ts
export declare const max: <A>(O: Order<A>) => (that: A) => (self: A) => A
```

Added in v1.0.0

## min

Take the minimum of two values. If they are considered equal, the first argument is chosen.

**Signature**

```ts
export declare const min: <A>(O: Order<A>) => (that: A) => (self: A) => A
```

Added in v1.0.0

## reverse

**Signature**

```ts
export declare const reverse: <A>(O: Order<A>) => Order<A>
```

Added in v1.0.0

## tuple

Given a tuple of `Compare`s returns a `Compare` for the tuple.

**Signature**

```ts
export declare const tuple: <A extends readonly any[]>(...orders: { [K in keyof A]: Order<A[K]> }) => Order<Readonly<A>>
```

Added in v1.0.0
