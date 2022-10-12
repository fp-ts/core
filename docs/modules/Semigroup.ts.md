---
title: Semigroup.ts
nav_order: 25
parent: Modules
---

## Semigroup overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [constant](#constant)
  - [fromCombine](#fromcombine)
  - [max](#max)
  - [min](#min)
- [instances](#instances)
  - [first](#first)
  - [last](#last)
- [model](#model)
  - [Semigroup (interface)](#semigroup-interface)
- [utils](#utils)
  - [intercalate](#intercalate)
  - [reverse](#reverse)
  - [struct](#struct)
  - [tuple](#tuple)

---

# constructors

## constant

**Signature**

```ts
export declare const constant: <A>(a: A) => Semigroup<A>
```

Added in v3.0.0

## fromCombine

**Signature**

```ts
export declare const fromCombine: <A>(combine: (a1: A, a2: A) => A) => Semigroup<A>
```

Added in v3.0.0

## max

Get a semigroup where `combine` will return the maximum, based on the provided order.

**Signature**

```ts
export declare const max: <A>(Compare: any) => Semigroup<A>
```

Added in v3.0.0

## min

Get a semigroup where `combine` will return the minimum, based on the provided order.

**Signature**

```ts
export declare const min: <A>(Compare: any) => Semigroup<A>
```

Added in v3.0.0

# instances

## first

Always return the first argument.

**Signature**

```ts
export declare const first: <A>() => Semigroup<A>
```

Added in v3.0.0

## last

Always return the last argument.

**Signature**

```ts
export declare const last: <A>() => Semigroup<A>
```

Added in v3.0.0

# model

## Semigroup (interface)

**Signature**

```ts
export interface Semigroup<A> {
  readonly combine: (a1: A, a2: A) => A
  readonly combineAll: (startWith: A, collection: Iterable<A>) => A
}
```

Added in v3.0.0

# utils

## intercalate

You can glue items between and stay associative.

**Signature**

```ts
export declare const intercalate: <A>(separator: A) => (Semigroup: Semigroup<A>) => Semigroup<A>
```

Added in v3.0.0

## reverse

The dual of a `Semigroup`, obtained by flipping the arguments of `combine`.

**Signature**

```ts
export declare const reverse: <A>(Semigroup: Semigroup<A>) => Semigroup<A>
```

Added in v3.0.0

## struct

Given a struct of semigroups returns a semigroup for the struct.

**Signature**

```ts
export declare const struct: <A>(semigroups: { [K in keyof A]: Semigroup<A[K]> }) => Semigroup<{
  readonly [K in keyof A]: A[K]
}>
```

Added in v3.0.0

## tuple

Given a tuple of semigroups returns a semigroup for the tuple.

**Signature**

```ts
export declare const tuple: <A extends readonly unknown[]>(
  ...semigroups: { [K in keyof A]: Semigroup<A[K]> }
) => Semigroup<Readonly<A>>
```

Added in v3.0.0
