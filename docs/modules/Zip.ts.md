---
title: Zip.ts
nav_order: 31
parent: Modules
---

## Zip overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Zip (interface)](#zip-interface)
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

# model

## Zip (interface)

**Signature**

```ts
export interface Zip<F extends TypeLambda> extends Covariant<F> {
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
export declare const ap: <F extends any>(Zip: Zip<F>) => any
```

Added in v3.0.0

## bindRight

A variant of `Flattenable.bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <F extends any>(
  Zip: Zip<F>
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
  Zip: Zip<F>
) => <A, B, C>(f: (a: A, b: B) => C) => <S, R1, O1, E1, R2, O2, E2>(fa: any, fb: any) => any
```

Added in v3.0.0

## lift3

Lifts a ternary function into 'F'.

**Signature**

```ts
export declare const lift3: <F extends any>(
  Zip: Zip<F>
) => <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <S, R1, O1, E1, R2, O2, E2, R3, O3, E3>(fa: any, fb: any, fc: any) => any
```

Added in v3.0.0

## liftSemigroup

Lift a semigroup into 'F', the inner values are combined using the provided `Semigroup`.

**Signature**

```ts
export declare const liftSemigroup: <F extends any>(Zip: Zip<F>) => <A, S, R, O, E>(Semigroup: any) => any
```

Added in v3.0.0

## zipComposition

Returns a default `zip` composition.

**Signature**

```ts
export declare const zipComposition: <F extends any, G extends any>(
  ZipF: Zip<F>,
  ZipG: Zip<G>
) => <FS, FR1, FO1, FE1, GS, GR1, GO1, GE1, A, FR2, FO2, FE2, GR2, GO2, GE2, B>(fa: any, fb: any) => any
```

Added in v3.0.0

## zipFlatten

Zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <F extends any>(
  Zip: Zip<F>
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
  Zip: Zip<F>
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
  Zip: Zip<F>
) => <S, R2, O2, E2, A>(that: any) => <R1, O1, E1>(self: any) => any
```

Added in v3.0.0

## zipWith

Zips this effect with the specified effect using the
specified combiner function.

**Signature**

```ts
export declare const zipWith: <F extends any>(
  Zip: Zip<F>
) => <S, R2, O2, E2, B, A, C>(that: any, f: (a: A, b: B) => C) => <R1, O1, E1>(self: any) => any
```

Added in v3.0.0
