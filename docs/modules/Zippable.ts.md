---
title: Zippable.ts
nav_order: 31
parent: Modules
---

## Zippable overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [fromBinary](#frombinary)
  - [fromFlatMap](#fromflatmap)
- [type class](#type-class)
  - [Zippable (interface)](#zippable-interface)
- [utils](#utils)
  - [ap](#ap)
  - [bindRight](#bindright)
  - [lift2](#lift2)
  - [lift3](#lift3)
  - [liftSemigroup](#liftsemigroup)
  - [zipComposition](#zipcomposition)
  - [zipFlatten](#zipflatten)
  - [zipLeftPar](#zipleftpar)
  - [zipRightPar](#ziprightpar)
  - [zipWith](#zipwith)

---

# constructors

## fromBinary

**Signature**

```ts
export declare const fromBinary: <F extends any>(
  Functor: any,
  zip: <S, R1, O1, E1, A, R2, O2, E2, B>(fa: any, fb: any) => any
) => Zippable<F>
```

Added in v3.0.0

## fromFlatMap

**Signature**

```ts
export declare const fromFlatMap: <F extends any>(FlatMap: any) => Zippable<F>
```

Added in v3.0.0

# type class

## Zippable (interface)

**Signature**

```ts
export interface Zippable<F extends TypeLambda> extends Functor<F> {
  readonly zip: <S, R1, O1, E1, A, R2, O2, E2, B>(
    fa: Kind<F, S, R1, O1, E1, A>,
    fb: Kind<F, S, R2, O2, E2, B>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, readonly [A, B]>
}
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <F extends any>(
  Zippable: Zippable<F>
) => <S, R2, O2, E2, A>(fa: any) => <R1, O1, E1, B>(self: any) => any
```

Added in v3.0.0

## bindRight

A variant of `Flattenable.bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <F extends any>(
  Zippable: Zippable<F>
) => <N extends string, A extends object, S, R2, O2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: any
) => <R1, O1, E1>(self: any) => any
```

Added in v3.0.0

## lift2

Lifts a binary function into `F`.

**Signature**

```ts
export declare const lift2: <F extends any>(
  Zippable: Zippable<F>
) => <A, B, C>(f: (a: A, b: B) => C) => <S, R1, O1, E1, R2, O2, E2>(fa: any, fb: any) => any
```

Added in v3.0.0

## lift3

Lifts a ternary function into 'F'.

**Signature**

```ts
export declare const lift3: <F extends any>(
  Zippable: Zippable<F>
) => <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <S, R1, O1, E1, R2, O2, E2, R3, O3, E3>(fa: any, fb: any, fc: any) => any
```

Added in v3.0.0

## liftSemigroup

Lift a semigroup into 'F', the inner values are combined using the provided `Semigroup`.

**Signature**

```ts
export declare const liftSemigroup: <F extends any>(Zippable: Zippable<F>) => <A, S, R, O, E>(Semigroup: any) => any
```

Added in v3.0.0

## zipComposition

Returns a default `zip` composition.

**Signature**

```ts
export declare const zipComposition: <F extends any, G extends any>(
  ZippableF: Zippable<F>,
  ZippableG: Zippable<G>
) => <FS, FR1, FO1, FE1, GS, GR1, GO1, GE1, A, FR2, FO2, FE2, GR2, GO2, GE2, B>(fa: any, fb: any) => any
```

Added in v3.0.0

## zipFlatten

Zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <F extends any>(
  Zippable: Zippable<F>
) => <S, R2, O2, E2, B>(that: any) => <R1, O1, E1, A extends readonly unknown[]>(self: any) => any
```

Added in v3.0.0

## zipLeftPar

Returns an effect that executes both this effect and the specified effect,
in parallel, this effect result returned. If either side fails, then the
other side will **NOT** be interrupted.

**Signature**

```ts
export declare const zipLeftPar: <F extends any>(
  Zippable: Zippable<F>
) => <S, R2, O2, E2>(that: any) => <R1, O1, E1, A>(self: any) => any
```

Added in v3.0.0

## zipRightPar

Returns an effect that executes both this effect and the specified effect,
in parallel, returning result of provided effect. If either side fails,
then the other side will **NOT** be interrupted.

**Signature**

```ts
export declare const zipRightPar: <F extends any>(
  Zippable: Zippable<F>
) => <S, R2, O2, E2, A>(that: any) => <R1, O1, E1>(self: any) => any
```

Added in v3.0.0

## zipWith

Zips this effect with the specified effect using the
specified combiner function.

**Signature**

```ts
export declare const zipWith: <F extends any>(
  Zippable: Zippable<F>
) => <S, R2, O2, E2, B, A, C>(that: any, f: (a: A, b: B) => C) => <R1, O1, E1>(self: any) => any
```

Added in v3.0.0