---
title: typeclass/Bounded.ts
nav_order: 23
parent: Modules
---

## Bounded overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [max](#max)
  - [min](#min)
- [instances](#instances)
  - [number](#number)
- [type class](#type-class)
  - [Bounded (interface)](#bounded-interface)
- [type lambdas](#type-lambdas)
  - [BoundedTypeLambda (interface)](#boundedtypelambda-interface)
- [utils](#utils)
  - [clamp](#clamp)
  - [reverse](#reverse)

---

# constructors

## max

`Monoid` that returns last maximum of elements.

**Signature**

```ts
export declare const max: <A>(B: Bounded<A>) => Monoid<A>
```

Added in v1.0.0

## min

`Monoid` that returns last minimum of elements.

**Signature**

```ts
export declare const min: <A>(B: Bounded<A>) => Monoid<A>
```

Added in v1.0.0

# instances

## number

**Signature**

```ts
export declare const number: Bounded<number>
```

Added in v1.0.0

# type class

## Bounded (interface)

**Signature**

```ts
export interface Bounded<A> extends Order<A> {
  readonly maxBound: A
  readonly minBound: A
}
```

Added in v1.0.0

# type lambdas

## BoundedTypeLambda (interface)

**Signature**

```ts
export interface BoundedTypeLambda extends TypeLambda {
  readonly type: Bounded<this['Target']>
}
```

Added in v1.0.0

# utils

## clamp

Clamp a value between `minBound` and `maxBound` values.

**Signature**

```ts
export declare const clamp: <A>(B: Bounded<A>) => (a: A) => A
```

Added in v1.0.0

## reverse

Reverses the `Order` of a `Bounded` and flips `maxBound` and `minBound` values.

**Signature**

```ts
export declare const reverse: <A>(B: Bounded<A>) => Bounded<A>
```

Added in v1.0.0
