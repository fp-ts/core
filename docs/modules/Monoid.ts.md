---
title: Monoid.ts
nav_order: 23
parent: Modules
---

## Monoid overview

`Monoid` extends the power of `Semigroup` by providing an additional `empty` value.

```ts
interface Monoid<A> extends Semigroup<A> {
  readonly empty: A
}
```

This `empty` value should be an identity for the `combine` operation, which means the following equalities hold for any choice of `a`.

```ts
a |> combine(empty) = empty |> combine(a) <-> a
```

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [max](#max)
  - [min](#min)
- [model](#model)
  - [Monoid (interface)](#monoid-interface)
- [utils](#utils)
  - [combineAll](#combineall)
  - [reverse](#reverse)
  - [struct](#struct)
  - [tuple](#tuple)

---

# constructors

## max

Get a monoid where `combine` will return the maximum, based on the provided bounded order.

The `empty` value is the `bottom` value.

**Signature**

```ts
export declare const max: <A>(Bounded: any) => Monoid<A>
```

Added in v3.0.0

## min

Get a monoid where `combine` will return the minimum, based on the provided bounded order.

The `empty` value is the `top` value.

**Signature**

```ts
export declare const min: <A>(Bounded: any) => Monoid<A>
```

Added in v3.0.0

# model

## Monoid (interface)

**Signature**

```ts
export interface Monoid<A> extends Semigroup<A> {
  readonly empty: A
}
```

Added in v3.0.0

# utils

## combineAll

Given a sequence of `as`, combine them and return the total.

If `as` is empty, return the monoid `empty` value.

**Signature**

```ts
export declare const combineAll: <A>(Monoid: Monoid<A>) => (collection: Iterable<A>) => A
```

Added in v3.0.0

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
