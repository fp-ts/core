---
title: Semigroupal.ts
nav_order: 24
parent: Modules
---

## Semigroupal overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Semigroupal (interface)](#semigroupal-interface)
- [utils](#utils)
  - [ap](#ap)
  - [bindRight](#bindright)
  - [lift2](#lift2)
  - [lift3](#lift3)
  - [liftSemigroup](#liftsemigroup)
  - [zip](#zip)
  - [zipFlatten](#zipflatten)
  - [zipLeftPar](#zipleftpar)
  - [zipManyComposition](#zipmanycomposition)
  - [zipRightPar](#ziprightpar)
  - [zipWith](#zipwith)
  - [zipWithComposition](#zipwithcomposition)

---

# type class

## Semigroupal (interface)

**Signature**

```ts
export interface Semigroupal<F extends TypeLambda> extends Functor<F> {
  /**
   * Zips this effect with the specified effect using the
   * specified combiner function.
   */
  readonly zipWith: <S, R1, O1, E1, A, R2, O2, E2, B, C>(
    fa: Kind<F, S, R1, O1, E1, A>,
    fb: Kind<F, S, R2, O2, E2, B>,
    f: (a: A, b: B) => C
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, C>

  readonly zipMany: <S, R, O, E, A>(
    start: Kind<F, S, R, O, E, A>,
    others: Iterable<Kind<F, S, R, O, E, A>>
  ) => Kind<F, S, R, O, E, [A, ...ReadonlyArray<A>]>
}
```

Added in v1.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <F extends any>(
  Semigroupal: Semigroupal<F>
) => <S, R2, O2, E2, A>(fa: any) => <R1, O1, E1, B>(self: any) => any
```

Added in v1.0.0

## bindRight

A variant of `FlatMap.bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <F extends any>(
  Semigroupal: Semigroupal<F>
) => <N extends string, A extends object, S, R2, O2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: any
) => <R1, O1, E1>(self: any) => any
```

Added in v1.0.0

## lift2

Lifts a binary function into `F`.

**Signature**

```ts
export declare const lift2: <F extends any>(
  Semigroupal: Semigroupal<F>
) => <A, B, C>(f: (a: A, b: B) => C) => <S, R1, O1, E1, R2, O2, E2>(fa: any, fb: any) => any
```

Added in v1.0.0

## lift3

Lifts a ternary function into 'F'.

**Signature**

```ts
export declare const lift3: <F extends any>(
  Semigroupal: Semigroupal<F>
) => <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <S, R1, O1, E1, R2, O2, E2, R3, O3, E3>(fa: any, fb: any, fc: any) => any
```

Added in v1.0.0

## liftSemigroup

Lift a semigroup into 'F', the inner values are combined using the provided `Semigroup`.

**Signature**

```ts
export declare const liftSemigroup: <F extends any>(
  Semigroupal: Semigroupal<F>
) => <A, S, R, O, E>(Semigroup: any) => any
```

Added in v1.0.0

## zip

**Signature**

```ts
export declare const zip: <F extends any>(
  Semigroupal: Semigroupal<F>
) => <S, R2, O2, E2, B, A>(that: any) => <R1, O1, E1>(self: any) => any
```

Added in v1.0.0

## zipFlatten

Zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <F extends any>(
  Semigroupal: Semigroupal<F>
) => <S, R2, O2, E2, B>(that: any) => <R1, O1, E1, A extends readonly unknown[]>(self: any) => any
```

Added in v1.0.0

## zipLeftPar

Returns an effect that executes both this effect and the specified effect,
in parallel, this effect result returned. If either side fails, then the
other side will **NOT** be interrupted.

**Signature**

```ts
export declare const zipLeftPar: <F extends any>(
  Semigroupal: Semigroupal<F>
) => <S, R2, O2, E2>(that: any) => <R1, O1, E1, A>(self: any) => any
```

Added in v1.0.0

## zipManyComposition

Returns a default `zipMany` composition.

**Signature**

```ts
export declare const zipManyComposition: <F extends any, G extends any>(
  SemigroupalF: Semigroupal<F>,
  SemigroupalG: Semigroupal<G>
) => <FS, FR, FO, FE, GS, GR, GO, GE, A>(start: any, others: Iterable<any>) => any
```

Added in v1.0.0

## zipRightPar

Returns an effect that executes both this effect and the specified effect,
in parallel, returning result of provided effect. If either side fails,
then the other side will **NOT** be interrupted.

**Signature**

```ts
export declare const zipRightPar: <F extends any>(
  Semigroupal: Semigroupal<F>
) => <S, R2, O2, E2, A>(that: any) => <R1, O1, E1>(self: any) => any
```

Added in v1.0.0

## zipWith

Zips this effect with the specified effect using the
specified combiner function.

**Signature**

```ts
export declare const zipWith: <F extends any>(
  Semigroupal: Semigroupal<F>
) => <S, R2, O2, E2, B, A, C>(that: any, f: (a: A, b: B) => C) => <R1, O1, E1>(self: any) => any
```

Added in v1.0.0

## zipWithComposition

Returns a default `zipWith` composition.

**Signature**

```ts
export declare const zipWithComposition: <F extends any, G extends any>(
  SemigroupalF: Semigroupal<F>,
  SemigroupalG: Semigroupal<G>
) => <FS, FR1, FO1, FE1, GS, GR1, GO1, GE1, A, FR2, FO2, FE2, GR2, GO2, GE2, B, C>(
  fga: any,
  fgb: any,
  f: (a: A, b: B) => C
) => any
```

Added in v1.0.0
