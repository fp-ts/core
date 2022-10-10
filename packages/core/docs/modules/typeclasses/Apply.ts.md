---
title: typeclasses/Apply.ts
nav_order: 44
parent: Modules
---

## Apply overview

The `Apply` class provides the `ap` which is used to apply a function to an argument under a type constructor.

`Apply` can be used to lift functions of two or more arguments to work on values wrapped with the type constructor
`f`.

Instances must satisfy the following law in addition to the `Functor` laws:

1. Associative composition: `fbc |> map(bc => ab => a => bc(ab(a))) |> ap(fab) <-> fbc |> ap(fab |> ap(fa))`

Formally, `Apply` represents a strong lax semi-monoidal endofunctor.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Apply (interface)](#apply-interface)
- [utils](#utils)
  - [apComposition](#apcomposition)
  - [bindRight](#bindright)
  - [getApplySemigroup](#getapplysemigroup)
  - [lift2](#lift2)
  - [lift3](#lift3)
  - [zipFlatten](#zipflatten)
  - [zipLeftPar](#zipleftpar)
  - [zipRightPar](#ziprightpar)
  - [zipWith](#zipwith)

---

# model

## Apply (interface)

**Signature**

```ts
export interface Apply<F extends TypeLambda> extends Functor<F> {
  readonly ap: <S, R2, O2, E2, A>(
    fa: Kind<F, S, R2, O2, E2, A>
  ) => <R1, O1, E1, B>(self: Kind<F, S, R1, O1, E1, (a: A) => B>) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, B>
}
```

Added in v3.0.0

# utils

## apComposition

Returns a default `ap` composition.

**Signature**

```ts
export declare const apComposition: <F extends any, G extends any>(
  ApplyF: Apply<F>,
  ApplyG: Apply<G>
) => <FS, FR2, FO2, FE2, GS, GR2, GO2, GE2, A>(fa: any) => <FR1, FO1, FE1, GR1, GO1, GE1, B>(self: any) => any
```

Added in v3.0.0

## bindRight

A variant of `Flattenable.bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <F extends any>(
  F: Apply<F>
) => <N extends string, A extends object, S, R2, O2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: any
) => <R1, O1, E1>(self: any) => any
```

Added in v3.0.0

## getApplySemigroup

Lift a semigroup into 'F', the inner values are combined using the provided `Semigroup`.

**Signature**

```ts
export declare const getApplySemigroup: <F extends any>(Apply: Apply<F>) => <A, S, R, O, E>(Semigroup: any) => any
```

Added in v3.0.0

## lift2

Lifts a binary function into `F`.

**Signature**

```ts
export declare const lift2: <F extends any>(
  F: Apply<F>
) => <A, B, C>(f: (a: A, b: B) => C) => <S, R1, O1, E1, R2, O2, E2>(fa: any, fb: any) => any
```

Added in v3.0.0

## lift3

Lifts a ternary function into 'F'.

**Signature**

```ts
export declare const lift3: <F extends any>(
  F: Apply<F>
) => <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <S, R1, O1, E1, R2, O2, E2, R3, O3, E3>(fa: any, fb: any, fc: any) => any
```

Added in v3.0.0

## zipFlatten

Zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <F extends any>(
  F: Apply<F>
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
  F: Apply<F>
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
  F: Apply<F>
) => <S, R2, O2, E2, A>(that: any) => <R1, O1, E1>(self: any) => any
```

Added in v3.0.0

## zipWith

Zips this effect with the specified effect using the
specified combiner function.

**Signature**

```ts
export declare const zipWith: <F extends any>(
  F: Apply<F>
) => <S, R2, O2, E2, B, A, C>(that: any, f: (a: A, b: B) => C) => <R1, O1, E1>(self: any) => any
```

Added in v3.0.0
