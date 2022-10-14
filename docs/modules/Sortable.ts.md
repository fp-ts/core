---
title: Sortable.ts
nav_order: 26
parent: Modules
---

## Sortable overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [fromBinary](#frombinary)
- [instances](#instances)
  - [Contravariant](#contravariant)
  - [getMonoid](#getmonoid)
  - [getSemigroup](#getsemigroup)
- [type class](#type-class)
  - [Sortable (interface)](#sortable-interface)
- [type lambdas](#type-lambdas)
  - [SortableTypeLambda (interface)](#sortabletypelambda-interface)
- [utils](#utils)
  - [between](#between)
  - [clamp](#clamp)
  - [contramap](#contramap)
  - [geq](#geq)
  - [gt](#gt)
  - [leq](#leq)
  - [lt](#lt)
  - [max](#max)
  - [min](#min)
  - [reverse](#reverse)
  - [tuple](#tuple)

---

# constructors

## fromBinary

**Signature**

```ts
export declare const fromBinary: <A>(compare: (a1: A, a2: A) => any) => Sortable<A>
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

**Signature**

```ts
export declare const getMonoid: <A>() => any
```

Added in v3.0.0

## getSemigroup

**Signature**

```ts
export declare const getSemigroup: <A>() => any
```

Added in v3.0.0

# type class

## Sortable (interface)

**Signature**

```ts
export interface Sortable<A> {
  readonly compare: (a1: A, a2: A) => Ordering
}
```

Added in v3.0.0

# type lambdas

## SortableTypeLambda (interface)

**Signature**

```ts
export interface SortableTypeLambda extends TypeLambda {
  readonly type: Sortable<this['In1']>
}
```

Added in v3.0.0

# utils

## between

Test whether a value is between a minimum and a maximum (inclusive).

**Signature**

```ts
export declare const between: <A>(O: Sortable<A>) => (low: A, hi: A) => (a: A) => boolean
```

Added in v3.0.0

## clamp

Clamp a value between a minimum and a maximum.

**Signature**

```ts
export declare const clamp: <A>(O: Sortable<A>) => (low: A, hi: A) => (a: A) => A
```

Added in v3.0.0

## contramap

**Signature**

```ts
export declare const contramap: <B, A>(f: (b: B) => A) => (self: Sortable<A>) => Sortable<B>
```

Added in v3.0.0

## geq

Test whether one value is _non-strictly greater than_ another.

**Signature**

```ts
export declare const geq: <A>(O: Sortable<A>) => (that: A) => (self: A) => boolean
```

Added in v3.0.0

## gt

Test whether one value is _strictly greater than_ another.

**Signature**

```ts
export declare const gt: <A>(O: Sortable<A>) => (that: A) => (self: A) => boolean
```

Added in v3.0.0

## leq

Test whether one value is _non-strictly less than_ another.

**Signature**

```ts
export declare const leq: <A>(O: Sortable<A>) => (that: A) => (self: A) => boolean
```

Added in v3.0.0

## lt

Test whether one value is _strictly less than_ another.

**Signature**

```ts
export declare const lt: <A>(O: Sortable<A>) => (that: A) => (self: A) => boolean
```

Added in v3.0.0

## max

Take the maximum of two values. If they are considered equal, the first argument is chosen.

**Signature**

```ts
export declare const max: <A>(O: Sortable<A>) => (that: A) => (self: A) => A
```

Added in v3.0.0

## min

Take the minimum of two values. If they are considered equal, the first argument is chosen.

**Signature**

```ts
export declare const min: <A>(O: Sortable<A>) => (that: A) => (self: A) => A
```

Added in v3.0.0

## reverse

**Signature**

```ts
export declare const reverse: <A>(Sortable: Sortable<A>) => Sortable<A>
```

Added in v3.0.0

## tuple

Given a tuple of `Compare`s returns a `Compare` for the tuple.

**Signature**

```ts
export declare const tuple: <A extends readonly unknown[]>(
  ...compares: { [K in keyof A]: Sortable<A[K]> }
) => Sortable<Readonly<A>>
```

Added in v3.0.0
