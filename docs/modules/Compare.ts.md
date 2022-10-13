---
title: Compare.ts
nav_order: 7
parent: Modules
---

## Compare overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [fromCompare](#fromcompare)
- [instances](#instances)
  - [Contravariant](#contravariant)
  - [getMonoid](#getmonoid)
  - [getSemigroup](#getsemigroup)
  - [trivial](#trivial)
- [type class](#type-class)
  - [Compare (interface)](#compare-interface)
- [type lambdas](#type-lambdas)
  - [CompareTypeLambda (interface)](#comparetypelambda-interface)
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

## fromCompare

**Signature**

```ts
export declare const fromCompare: <A>(compare: (a1: A, a2: A) => any) => Compare<A>
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

## trivial

**Signature**

```ts
export declare const trivial: Compare<unknown>
```

Added in v3.0.0

# type class

## Compare (interface)

**Signature**

```ts
export interface Compare<A> {
  readonly compare: (a1: A, a2: A) => Ordering
}
```

Added in v3.0.0

# type lambdas

## CompareTypeLambda (interface)

**Signature**

```ts
export interface CompareTypeLambda extends TypeLambda {
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

## contramap

**Signature**

```ts
export declare const contramap: <B, A>(f: (b: B) => A) => (self: Compare<A>) => Compare<B>
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

Given a tuple of `Compare`s returns a `Compare` for the tuple.

**Signature**

```ts
export declare const tuple: <A extends readonly unknown[]>(
  ...compares: { [K in keyof A]: Compare<A[K]> }
) => Compare<Readonly<A>>
```

Added in v3.0.0
