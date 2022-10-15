---
title: Monoid.ts
nav_order: 20
parent: Modules
---

## Monoid overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [fromSemigroup](#fromsemigroup)
  - [max](#max)
  - [min](#min)
- [type class](#type-class)
  - [Monoid (interface)](#monoid-interface)
- [utils](#utils)
  - [reverse](#reverse)
  - [struct](#struct)
  - [tuple](#tuple)

---

# constructors

## fromSemigroup

**Signature**

```ts
export declare const fromSemigroup: <A>(Semigroup: any, empty: A) => Monoid<A>
```

Added in v3.0.0

## max

Get a monoid where `combine` will return the maximum, based on the provided bounded order.

The `empty` value is the `minimum` value.

**Signature**

```ts
export declare const max: <A>(Bounded: any) => Monoid<A>
```

Added in v3.0.0

## min

Get a monoid where `combine` will return the minimum, based on the provided bounded order.

The `empty` value is the `maximum` value.

**Signature**

```ts
export declare const min: <A>(Bounded: any) => Monoid<A>
```

Added in v3.0.0

# type class

## Monoid (interface)

**Signature**

```ts
export interface Monoid<A> extends Semigroup<A> {
  readonly empty: A
  readonly combineAll: (collection: Iterable<A>) => A
}
```

Added in v3.0.0

# utils

## reverse

The dual of a `Monoid`, obtained by swapping the arguments of `combine`.

**Signature**

```ts
export declare const reverse: <A>(Monoid: Monoid<A>) => Monoid<A>
```

Added in v3.0.0

## struct

Given a struct of monoids returns a monoid for the struct.

**Signature**

```ts
export declare const struct: <A>(monoids: { [K in keyof A]: Monoid<A[K]> }) => Monoid<{ readonly [K in keyof A]: A[K] }>
```

Added in v3.0.0

## tuple

Given a tuple of monoids returns a monoid for the tuple.

**Signature**

```ts
export declare const tuple: <A extends readonly unknown[]>(
  ...monoids: { [K in keyof A]: Monoid<A[K]> }
) => Monoid<Readonly<A>>
```

Added in v3.0.0
