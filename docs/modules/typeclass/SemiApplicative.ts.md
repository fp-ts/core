---
title: typeclass/SemiApplicative.ts
nav_order: 40
parent: Modules
---

## SemiApplicative overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [lifting](#lifting)
  - [lift2](#lift2)
  - [liftSemigroup](#liftsemigroup)
- [type class](#type-class)
  - [SemiApplicative (interface)](#semiapplicative-interface)
- [utils](#utils)
  - [andThen](#andthen)
  - [andThenDiscard](#andthendiscard)
  - [ap](#ap)
  - [zipWith](#zipwith)

---

# lifting

## lift2

Lifts a binary function into `F`.

**Signature**

```ts
export declare const lift2: <F extends any>(
  F: SemiApplicative<F>
) => <A, B, C>(f: (a: A) => (b: B) => C) => <R2, O2, E2>(that: any) => <R1, O1, E1>(self: any) => any
```

Added in v1.0.0

## liftSemigroup

Lift a `Semigroup` into 'F', the inner values are combined using the provided `Semigroup`.

**Signature**

```ts
export declare const liftSemigroup: <F extends any>(F: SemiApplicative<F>) => <A, R, O, E>(S: any) => any
```

Added in v1.0.0

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
) => <R2, O2, E2, A>(that: any) => <R1, O1, E1, B>(self: any) => any
```

Added in v1.0.0

## zipWith

**Signature**

```ts
export declare const zipWith: <F extends any>(
  F: SemiApplicative<F>
) => <R2, O2, E2, B, A, C>(fb: any, f: (a: A, b: B) => C) => <R1, O1, E1>(fa: any) => any
```

Added in v1.0.0
