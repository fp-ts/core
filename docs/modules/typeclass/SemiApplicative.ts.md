---
title: typeclass/SemiApplicative.ts
nav_order: 22
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
export declare const andThen: <F extends TypeLambda>(
  F: SemiApplicative<F>
) => <R2, O2, E2, B>(
  that: Kind<F, R2, O2, E2, B>
) => <R1, O1, E1, _>(self: Kind<F, R1, O1, E1, _>) => Kind<F, R1 & R2, O2 | O1, E2 | E1, B>
```

Added in v1.0.0

## andThenDiscard

**Signature**

```ts
export declare const andThenDiscard: <F extends TypeLambda>(
  F: SemiApplicative<F>
) => <R2, O2, E2, _>(
  that: Kind<F, R2, O2, E2, _>
) => <R1, O1, E1, A>(self: Kind<F, R1, O1, E1, A>) => Kind<F, R1 & R2, O2 | O1, E2 | E1, A>
```

Added in v1.0.0

## ap

**Signature**

```ts
export declare const ap: <F extends TypeLambda>(
  F: SemiApplicative<F>
) => <R2, O2, E2, A>(
  fa: Kind<F, R2, O2, E2, A>
) => <R1, O1, E1, B>(self: Kind<F, R1, O1, E1, (a: A) => B>) => Kind<F, R1 & R2, O2 | O1, E2 | E1, B>
```

Added in v1.0.0

## lift2

Lifts a binary function into `F`.

**Signature**

```ts
export declare const lift2: <F extends TypeLambda>(
  F: SemiApplicative<F>
) => <A, B, C>(
  f: (a: A, b: B) => C
) => <R1, O1, E1, R2, O2, E2>(
  fa: Kind<F, R1, O1, E1, A>,
  fb: Kind<F, R2, O2, E2, B>
) => Kind<F, R1 & R2, O1 | O2, E1 | E2, C>
```

Added in v1.0.0

## lift3

Lifts a ternary function into 'F'.

**Signature**

```ts
export declare const lift3: <F extends TypeLambda>(
  F: SemiApplicative<F>
) => <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <R1, O1, E1, R2, O2, E2, R3, O3, E3>(
  fa: Kind<F, R1, O1, E1, A>,
  fb: Kind<F, R2, O2, E2, B>,
  fc: Kind<F, R3, O3, E3, C>
) => Kind<F, R1 & R2 & R3, O1 | O2 | O3, E1 | E2 | E3, D>
```

Added in v1.0.0

## liftSemigroup

Lift a `Semigroup` into 'F', the inner values are combined using the provided `Semigroup`.

**Signature**

```ts
export declare const liftSemigroup: <F extends TypeLambda>(
  F: SemiApplicative<F>
) => <A, R, O, E>(S: Semigroup<A>) => Semigroup<Kind<F, R, O, E, A>>
```

Added in v1.0.0
