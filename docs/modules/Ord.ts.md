---
title: Ord.ts
nav_order: 24
parent: Modules
---

## Ord overview

The `Ord` type class represents types which support comparisons with a _total order_.

Instances should satisfy the laws of total orderings:

1. Reflexivity: `a |> compare(a) <= 0`
2. Antisymmetry: if `a |> compare(b) <= 0` and `b |> compare(a) <= 0` then `a <-> b`
3. Transitivity: if `a |> compare(b) <= 0` and `b |> S.compare(c) <= 0` then `a |> compare(c) <= 0`

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Contravariant](#contravariant)
  - [contramap](#contramap)
- [constructors](#constructors)
  - [fromCompare](#fromcompare)
- [instances](#instances)
  - [Contravariant](#contravariant-1)
  - [getMonoid](#getmonoid)
  - [getSemigroup](#getsemigroup)
  - [trivial](#trivial)
- [model](#model)
  - [Ord (interface)](#ord-interface)
- [type lambdas](#type-lambdas)
  - [OrdTypeLambda (interface)](#ordtypelambda-interface)
- [utils](#utils)
  - [between](#between)
  - [clamp](#clamp)
  - [equals](#equals)
  - [geq](#geq)
  - [gt](#gt)
  - [leq](#leq)
  - [lt](#lt)
  - [max](#max)
  - [min](#min)
  - [reverse](#reverse)
  - [tuple](#tuple)

---

# Contravariant

## contramap

**Signature**

```ts
export declare const contramap: <B, A>(f: (b: B) => A) => (fa: Ord<A>) => Ord<B>
```

Added in v3.0.0

# constructors

## fromCompare

**Signature**

```ts
export declare const fromCompare: <A>(compare: (that: A) => (self: A) => any) => Ord<A>
```

Added in v3.0.0

# instances

## Contravariant

**Signature**

```ts
export declare const Contravariant: any
```

Added in v3.0.0

## getMonoid

Returns a `Monoid` such that:

- `pipe(ord1, combine(ord2))` will order first by `ord1`, and then by `ord2`
- its `empty` value is an `Ord` that always considers compared elements equal

**Signature**

```ts
export declare const getMonoid: <A>() => any
```

Added in v3.0.0

## getSemigroup

Returns a `Semigroup` such that `pipe(ord1, combine(ord2))` will order first by `ord1`,
and then by `ord2`

**Signature**

```ts
export declare const getSemigroup: <A>() => any
```

Added in v3.0.0

## trivial

**Signature**

```ts
export declare const trivial: Ord<unknown>
```

Added in v3.0.0

# model

## Ord (interface)

**Signature**

```ts
export interface Ord<A> {
  readonly compare: (that: A) => (self: A) => Ordering
}
```

Added in v3.0.0

# type lambdas

## OrdTypeLambda (interface)

**Signature**

```ts
export interface OrdTypeLambda extends TypeLambda {
  readonly type: Ord<this['In1']>
}
```

Added in v3.0.0

# utils

## between

Test whether a value is between a minimum and a maximum (inclusive).

**Signature**

```ts
export declare const between: <A>(O: Ord<A>) => (low: A, hi: A) => (a: A) => boolean
```

Added in v3.0.0

## clamp

Clamp a value between a minimum and a maximum.

**Signature**

```ts
export declare const clamp: <A>(O: Ord<A>) => (low: A, hi: A) => (a: A) => A
```

Added in v3.0.0

## equals

**Signature**

```ts
export declare const equals: <A>(O: Ord<A>) => any
```

Added in v3.0.0

## geq

Test whether one value is _non-strictly greater than_ another.

**Signature**

```ts
export declare const geq: <A>(O: Ord<A>) => (that: A) => (self: A) => boolean
```

Added in v3.0.0

## gt

Test whether one value is _strictly greater than_ another.

**Signature**

```ts
export declare const gt: <A>(O: Ord<A>) => (that: A) => (self: A) => boolean
```

Added in v3.0.0

## leq

Test whether one value is _non-strictly less than_ another.

**Signature**

```ts
export declare const leq: <A>(O: Ord<A>) => (that: A) => (self: A) => boolean
```

Added in v3.0.0

## lt

Test whether one value is _strictly less than_ another.

**Signature**

```ts
export declare const lt: <A>(O: Ord<A>) => (that: A) => (self: A) => boolean
```

Added in v3.0.0

## max

Take the maximum of two values. If they are considered equal, the first argument is chosen.

**Signature**

```ts
export declare const max: <A>(O: Ord<A>) => (that: A) => (self: A) => A
```

Added in v3.0.0

## min

Take the minimum of two values. If they are considered equal, the first argument is chosen.

**Signature**

```ts
export declare const min: <A>(O: Ord<A>) => (that: A) => (self: A) => A
```

Added in v3.0.0

## reverse

**Signature**

```ts
export declare const reverse: <A>(O: Ord<A>) => Ord<A>
```

Added in v3.0.0

## tuple

Given a tuple of `Ord`s returns an `Ord` for the tuple.

**Signature**

```ts
export declare const tuple: <A extends readonly unknown[]>(...ords: { [K in keyof A]: Ord<A[K]> }) => Ord<Readonly<A>>
```

Added in v3.0.0
