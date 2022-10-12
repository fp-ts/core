---
title: Eq.ts
nav_order: 11
parent: Modules
---

## Eq overview

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
  - [Eq (interface)](#eq-interface)
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
export declare const contramap: <B, A>(f: (b: B) => A) => (self: Eq<A>) => Eq<B>
```

Added in v3.0.0

# constructors

## fromEquals

**Signature**

```ts
export declare const fromEquals: <A>(equals: (that: A) => (self: A) => boolean) => Eq<A>
```

Added in v3.0.0

## fromOrd

**Signature**

```ts
export declare const fromOrd: <A>(O: any) => Eq<A>
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
export declare const EqStrict: Eq<unknown>
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

## Eq (interface)

**Signature**

```ts
export interface Eq<A> {
  readonly equals: (that: A) => (self: A) => boolean
}
```

Added in v3.0.0

# type lambdas

## EqTypeLambda (interface)

**Signature**

```ts
export interface EqTypeLambda extends TypeLambda {
  readonly type: Eq<this['In1']>
}
```

Added in v3.0.0

# utils

## struct

**Signature**

```ts
export declare const struct: <A>(eqs: { [K in keyof A]: Eq<A[K]> }) => Eq<{ readonly [K in keyof A]: A[K] }>
```

Added in v3.0.0

## tuple

Given a tuple of `Eq`s returns a `Eq` for the tuple

**Signature**

```ts
export declare const tuple: <A extends readonly unknown[]>(
  ...eqs: { [K in keyof A]: Eq<A[K]> }
) => Eq<Readonly<Readonly<A>>>
```

Added in v3.0.0
