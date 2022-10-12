---
title: Equals.ts
nav_order: 12
parent: Modules
---

## Equals overview

The `Eq` type class represents types which support decidable equality.

Instances must satisfy the following laws:

1. Reflexivity: `a |> equals(a) === true`
2. Symmetry: `a |> equals(b) === b |> equals(a)`
3. Transitivity: if `a |> equals(b) === true` and `b |> equals(c) === true`, then `a |> equals(c) === true`

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Contravariant](#contravariant)
  - [contramap](#contramap)
- [constructors](#constructors)
  - [fromEquals](#fromequals)
  - [fromOrd](#fromord)
- [instances](#instances)
  - [Contravariant](#contravariant-1)
  - [EqStrict](#eqstrict)
  - [getMonoid](#getmonoid)
  - [getSemigroup](#getsemigroup)
- [model](#model)
  - [Equals (interface)](#equals-interface)
- [type lambdas](#type-lambdas)
  - [EqTypeLambda (interface)](#eqtypelambda-interface)
- [utils](#utils)
  - [struct](#struct)
  - [tuple](#tuple)

---

# Contravariant

## contramap

**Signature**

```ts
export declare const contramap: <B, A>(f: (b: B) => A) => (self: Equals<A>) => Equals<B>
```

Added in v3.0.0

# constructors

## fromEquals

**Signature**

```ts
export declare const fromEquals: <A>(equals: (that: A) => (self: A) => boolean) => Equals<A>
```

Added in v3.0.0

## fromOrd

**Signature**

```ts
export declare const fromOrd: <A>(Ord: any) => Equals<A>
```

Added in v3.0.0

# instances

## Contravariant

**Signature**

```ts
export declare const Contravariant: any
```

Added in v3.0.0

## EqStrict

**Signature**

```ts
export declare const EqStrict: Equals<unknown>
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

# model

## Equals (interface)

**Signature**

```ts
export interface Equals<A> {
  readonly equals: (that: A) => (self: A) => boolean
}
```

Added in v3.0.0

# type lambdas

## EqTypeLambda (interface)

**Signature**

```ts
export interface EqTypeLambda extends TypeLambda {
  readonly type: Equals<this['In1']>
}
```

Added in v3.0.0

# utils

## struct

**Signature**

```ts
export declare const struct: <A>(eqs: { [K in keyof A]: Equals<A[K]> }) => Equals<{ readonly [K in keyof A]: A[K] }>
```

Added in v3.0.0

## tuple

Given a tuple of `Eq`s returns a `Eq` for the tuple

**Signature**

```ts
export declare const tuple: <A extends readonly unknown[]>(
  ...eqs: { [K in keyof A]: Equals<A[K]> }
) => Equals<Readonly<Readonly<A>>>
```

Added in v3.0.0
