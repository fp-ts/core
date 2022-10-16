---
title: Semigroup.ts
nav_order: 24
parent: Modules
---

## Semigroup overview

Added in v1.0.0

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
- [type class](#type-class)
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

Added in v1.0.0

## fromCombine

**Signature**

```ts
export declare const fromCombine: <A>(combine: (that: A) => (self: A) => A) => Semigroup<A>
```

Added in v1.0.0

## max

`Semigroup` that returns last maximum of elements.

**Signature**

```ts
export declare const max: <A>(Sortable: any) => Semigroup<A>
```

Added in v1.0.0

## min

`Semigroup` that returns last minimum of elements.

**Signature**

```ts
export declare const min: <A>(Sortable: any) => Semigroup<A>
```

Added in v1.0.0

# instances

## first

Always return the first argument.

**Signature**

```ts
export declare const first: <A = never>() => Semigroup<A>
```

Added in v1.0.0

## last

Always return the last argument.

**Signature**

```ts
export declare const last: <A = never>() => Semigroup<A>
```

Added in v1.0.0

# type class

## Semigroup (interface)

**Signature**

```ts
export interface Semigroup<A> {
  readonly combine: (that: A) => (self: A) => A
  readonly combineMany: (collection: Iterable<A>) => (self: A) => A
}
```

Added in v1.0.0

# utils

## intercalate

**Signature**

```ts
export declare const intercalate: <A>(separator: A) => (Semigroup: Semigroup<A>) => Semigroup<A>
```

Added in v1.0.0

## reverse

The dual of a `Semigroup`, obtained by flipping the arguments of `combine`.

**Signature**

```ts
export declare const reverse: <A>(Semigroup: Semigroup<A>) => Semigroup<A>
```

Added in v1.0.0

## struct

Given a struct of semigroups returns a semigroup for the struct.

**Signature**

```ts
export declare const struct: <A>(semigroups: { [K in keyof A]: Semigroup<A[K]> }) => Semigroup<{
  readonly [K in keyof A]: A[K]
}>
```

Added in v1.0.0

## tuple

Given a tuple of semigroups returns a semigroup for the tuple.

**Signature**

```ts
export declare const tuple: <A extends readonly unknown[]>(
  ...semigroups: { [K in keyof A]: Semigroup<A[K]> }
) => Semigroup<Readonly<A>>
```

Added in v1.0.0
