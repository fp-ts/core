---
title: Compare.ts
nav_order: 7
parent: Modules
---

## Compare overview

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
  - [Compare (interface)](#compare-interface)
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
export declare const contramap: <B, A>(f: (b: B) => A) => (fa: Compare<A>) => Compare<B>
```

Added in v3.0.0

# constructors

## fromCompare

**Signature**

```ts
export declare const fromCompare: <A>(compare: (that: A) => (self: A) => any) => Compare<A>
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
export declare const trivial: Compare<unknown>
```

Added in v3.0.0

# model

## Compare (interface)

**Signature**

```ts
export interface Compare<A> {
  readonly compare: (that: A) => (self: A) => Ordering
}
```

Added in v3.0.0

# type lambdas

## OrdTypeLambda (interface)

**Signature**

```ts
export interface OrdTypeLambda extends TypeLambda {
  readonly type: Compare<this['In1']>
}
```

Added in v3.0.0

# utils

## between

Test whether a value is between a minimum and a maximum (inclusive).

**Signature**

```ts
export declare const between: <A>(O: Compare<A>) => (low: A, hi: A) => (a: A) => boolean
```

Added in v3.0.0

## clamp

Clamp a value between a minimum and a maximum.

**Signature**

```ts
export declare const clamp: <A>(O: Compare<A>) => (low: A, hi: A) => (a: A) => A
```

Added in v3.0.0

## equals

**Signature**

```ts
export declare const equals: <A>(O: Compare<A>) => any
```

Added in v3.0.0

## geq

Test whether one value is _non-strictly greater than_ another.

**Signature**

```ts
export declare const geq: <A>(O: Compare<A>) => (that: A) => (self: A) => boolean
```

Added in v3.0.0

## gt

Test whether one value is _strictly greater than_ another.

**Signature**

```ts
export declare const gt: <A>(O: Compare<A>) => (that: A) => (self: A) => boolean
```

Added in v3.0.0

## leq

Test whether one value is _non-strictly less than_ another.

**Signature**

```ts
export declare const leq: <A>(O: Compare<A>) => (that: A) => (self: A) => boolean
```

Added in v3.0.0

## lt

Test whether one value is _strictly less than_ another.

**Signature**

```ts
export declare const lt: <A>(O: Compare<A>) => (that: A) => (self: A) => boolean
```

Added in v3.0.0

## max

Take the maximum of two values. If they are considered equal, the first argument is chosen.

**Signature**

```ts
export declare const max: <A>(O: Compare<A>) => (that: A) => (self: A) => A
```

Added in v3.0.0

## min

Take the minimum of two values. If they are considered equal, the first argument is chosen.

**Signature**

```ts
export declare const min: <A>(O: Compare<A>) => (that: A) => (self: A) => A
```

Added in v3.0.0

## reverse

**Signature**

```ts
export declare const reverse: <A>(O: Compare<A>) => Compare<A>
```

Added in v3.0.0

## tuple

Given a tuple of `Ord`s returns an `Ord` for the tuple.

**Signature**

```ts
export declare const tuple: <A extends readonly unknown[]>(
  ...ords: { [K in keyof A]: Compare<A[K]> }
) => Compare<Readonly<A>>
```

Added in v3.0.0
