---
title: Semigroupal.ts
nav_order: 26
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
  readonly zipWith: <S, R2, O2, E2, B, A, C>(
    that: Kind<F, S, R2, O2, E2, B>,
    f: (a: A, b: B) => C
  ) => <R1, O1, E1>(self: Kind<F, S, R1, O1, E1, A>) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, C>

  readonly zipMany: <S, R, O, E, A>(
    collection: Iterable<Kind<F, S, R, O, E, A>>
  ) => (self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, readonly [A, ...ReadonlyArray<A>]>
}
```

Added in v1.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <F extends TypeLambda>(
  Semigroupal: Semigroupal<F>
) => <S, R2, O2, E2, A>(
  fa: Kind<F, S, R2, O2, E2, A>
) => <R1, O1, E1, B>(self: Kind<F, S, R1, O1, E1, (a: A) => B>) => Kind<F, S, R1 & R2, O2 | O1, E2 | E1, B>
```

Added in v1.0.0

## bindRight

A variant of `FlatMap.bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <F extends TypeLambda>(
  Semigroupal: Semigroupal<F>
) => <N extends string, A extends object, S, R2, O2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: Kind<F, S, R2, O2, E2, B>
) => <R1, O1, E1>(
  self: Kind<F, S, R1, O1, E1, A>
) => Kind<F, S, R1 & R2, O2 | O1, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v1.0.0

## lift2

Lifts a binary function into `F`.

**Signature**

```ts
export declare const lift2: <F extends TypeLambda>(
  Semigroupal: Semigroupal<F>
) => <A, B, C>(
  f: (a: A, b: B) => C
) => <S, R1, O1, E1, R2, O2, E2>(
  fa: Kind<F, S, R1, O1, E1, A>,
  fb: Kind<F, S, R2, O2, E2, B>
) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, C>
```

Added in v1.0.0

## lift3

Lifts a ternary function into 'F'.

**Signature**

```ts
export declare const lift3: <F extends TypeLambda>(
  Semigroupal: Semigroupal<F>
) => <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <S, R1, O1, E1, R2, O2, E2, R3, O3, E3>(
  fa: Kind<F, S, R1, O1, E1, A>,
  fb: Kind<F, S, R2, O2, E2, B>,
  fc: Kind<F, S, R3, O3, E3, C>
) => Kind<F, S, R1 & R2 & R3, O1 | O2 | O3, E1 | E2 | E3, D>
```

Added in v1.0.0

## liftSemigroup

Lift a semigroup into 'F', the inner values are combined using the provided `Semigroup`.

**Signature**

```ts
export declare const liftSemigroup: <F extends TypeLambda>(
  Semigroupal: Semigroupal<F>
) => <A, S, R, O, E>(Semigroup: Semigroup<A>) => Semigroup<Kind<F, S, R, O, E, A>>
```

Added in v1.0.0

## zip

**Signature**

```ts
export declare const zip: <F extends TypeLambda>(
  Semigroupal: Semigroupal<F>
) => <S, R2, O2, E2, B, A>(
  that: Kind<F, S, R2, O2, E2, B>
) => <R1, O1, E1>(self: Kind<F, S, R1, O1, E1, A>) => Kind<F, S, R1 & R2, O2 | O1, E2 | E1, readonly [A, B]>
```

Added in v1.0.0

## zipFlatten

Zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <F extends TypeLambda>(
  Semigroupal: Semigroupal<F>
) => <S, R2, O2, E2, B>(
  that: Kind<F, S, R2, O2, E2, B>
) => <R1, O1, E1, A extends readonly unknown[]>(
  self: Kind<F, S, R1, O1, E1, A>
) => Kind<F, S, R1 & R2, O2 | O1, E2 | E1, readonly [...A, B]>
```

Added in v1.0.0

## zipLeftPar

Returns an effect that executes both this effect and the specified effect,
in parallel, this effect result returned. If either side fails, then the
other side will **NOT** be interrupted.

**Signature**

```ts
export declare const zipLeftPar: <F extends TypeLambda>(
  Semigroupal: Semigroupal<F>
) => <S, R2, O2, E2>(
  that: Kind<F, S, R2, O2, E2, unknown>
) => <R1, O1, E1, A>(self: Kind<F, S, R1, O1, E1, A>) => Kind<F, S, R1 & R2, O2 | O1, E2 | E1, A>
```

Added in v1.0.0

## zipManyComposition

Returns a default `zipMany` composition.

**Signature**

```ts
export declare const zipManyComposition: <F extends TypeLambda, G extends TypeLambda>(
  SemigroupalF: Semigroupal<F>,
  SemigroupalG: Semigroupal<G>
) => <FS, FR, FO, FE, GS, GR, GO, GE, A>(
  collection: Iterable<Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>>
) => (
  self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
) => Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, readonly [A, ...A[]]>>
```

Added in v1.0.0

## zipRightPar

Returns an effect that executes both this effect and the specified effect,
in parallel, returning result of provided effect. If either side fails,
then the other side will **NOT** be interrupted.

**Signature**

```ts
export declare const zipRightPar: <F extends TypeLambda>(
  Semigroupal: Semigroupal<F>
) => <S, R2, O2, E2, A>(
  that: Kind<F, S, R2, O2, E2, A>
) => <R1, O1, E1>(self: Kind<F, S, R1, O1, E1, unknown>) => Kind<F, S, R1 & R2, O2 | O1, E2 | E1, A>
```

Added in v1.0.0

## zipWithComposition

Returns a default `zipWith` composition.

**Signature**

```ts
export declare const zipWithComposition: <F extends TypeLambda, G extends TypeLambda>(
  SemigroupalF: Semigroupal<F>,
  SemigroupalG: Semigroupal<G>
) => <FS, FR2, FO2, FE2, GS, GR2, GO2, GE2, B, A, C>(
  that: Kind<F, FS, FR2, FO2, FE2, Kind<G, GS, GR2, GO2, GE2, B>>,
  f: (a: A, b: B) => C
) => <FR1, FO1, FE1, GR1, GO1, GE1>(
  self: Kind<F, FS, FR1, FO1, FE1, Kind<G, GS, GR1, GO1, GE1, A>>
) => Kind<F, FS, FR1 & FR2, FO2 | FO1, FE2 | FE1, Kind<G, GS, GR1 & GR2, GO2 | GO1, GE2 | GE1, C>>
```

Added in v1.0.0
