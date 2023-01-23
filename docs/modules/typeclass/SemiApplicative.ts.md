---
title: typeclass/SemiApplicative.ts
nav_order: 40
parent: Modules
---

## SemiApplicative overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [SemiApplicative (interface)](#semiapplicative-interface)
- [utils](#utils)
  - [andThen](#andthen)
  - [andThenDiscard](#andthendiscard)
  - [ap](#ap)
  - [lift2](#lift2)
  - [lift3](#lift3)
  - [liftSemigroup](#liftsemigroup)

---

# type class

## SemiApplicative (interface)

**Signature**

```ts
export interface SemiApplicative<F extends TypeLambda> extends SemiProduct<F>, Covariant<F> {}
```

Added in v1.0.0

# utils

## andThen

**Signature**

```ts
export declare const andThen: <F extends any>(
  F: SemiApplicative<F>
) => <R2, O2, E2, B>(that: any) => <R1, O1, E1, _>(self: any) => any
```

Added in v1.0.0

## andThenDiscard

**Signature**

```ts
export declare const andThenDiscard: <F extends any>(
  F: SemiApplicative<F>
) => <R2, O2, E2, _>(that: any) => <R1, O1, E1, A>(self: any) => any
```

Added in v1.0.0

## ap

**Signature**

```ts
export declare const ap: <F extends any>(
  F: SemiApplicative<F>
) => <R2, O2, E2, A>(fa: any) => <R1, O1, E1, B>(self: any) => any
```

Added in v1.0.0

## lift2

Lifts a binary function into `F`.

**Signature**

```ts
export declare const lift2: <F extends any>(
  F: SemiApplicative<F>
) => <A, B, C>(f: (a: A, b: B) => C) => <R1, O1, E1, R2, O2, E2>(fa: any, fb: any) => any
```

Added in v1.0.0

## lift3

Lifts a ternary function into 'F'.

**Signature**

```ts
export declare const lift3: <F extends any>(
  F: SemiApplicative<F>
) => <A, B, C, D>(f: (a: A, b: B, c: C) => D) => <R1, O1, E1, R2, O2, E2, R3, O3, E3>(fa: any, fb: any, fc: any) => any
```

Added in v1.0.0

## liftSemigroup

Lift a `Semigroup` into 'F', the inner values are combined using the provided `Semigroup`.

**Signature**

```ts
export declare const liftSemigroup: <F extends any>(F: SemiApplicative<F>) => <A, R, O, E>(S: any) => any
```

Added in v1.0.0
