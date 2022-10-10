---
title: StateReaderAsyncResult.ts
nav_order: 29
parent: Modules
---

## StateReaderAsyncResult overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
  - [asksStateReaderAsyncResult](#asksstatereaderasyncresult)
  - [fail](#fail)
  - [failAsync](#failasync)
  - [failReader](#failreader)
  - [failState](#failstate)
  - [failSync](#failsync)
  - [fromAsync](#fromasync)
  - [fromReader](#fromreader)
  - [fromReaderAsyncResult](#fromreaderasyncresult)
  - [fromState](#fromstate)
  - [fromSync](#fromsync)
  - [get](#get)
  - [gets](#gets)
  - [modify](#modify)
  - [put](#put)
  - [sleep](#sleep)
  - [succeed](#succeed)
- [conversions](#conversions)
  - [fromAsyncResult](#fromasyncresult)
  - [fromNullable](#fromnullable)
  - [fromOption](#fromoption)
  - [fromReaderResult](#fromreaderresult)
  - [fromResult](#fromresult)
  - [fromSyncResult](#fromsyncresult)
- [do notation](#do-notation)
  - [bind](#bind)
  - [bindRight](#bindright)
  - [bindTo](#bindto)
  - [let](#let)
- [error handling](#error-handling)
  - [firstSuccessOf](#firstsuccessof)
  - [mapError](#maperror)
  - [tapError](#taperror)
- [filtering](#filtering)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
- [instances](#instances)
  - [Alt](#alt)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [Bifunctor](#bifunctor)
  - [CategoryKind](#categorykind)
  - [Flattenable](#flattenable)
  - [FromAsync](#fromasync)
  - [FromIdentity](#fromidentity)
  - [FromReader](#fromreader)
  - [FromResult](#fromresult)
  - [FromState](#fromstate)
  - [FromSync](#fromsync)
  - [Functor](#functor)
  - [KleisliComposable](#kleislicomposable)
  - [Monad](#monad)
- [lifting](#lifting)
  - [lift2](#lift2)
  - [lift3](#lift3)
  - [liftAsync](#liftasync)
  - [liftAsyncResult](#liftasyncresult)
  - [liftNullable](#liftnullable)
  - [liftOption](#liftoption)
  - [liftPredicate](#liftpredicate)
  - [liftReader](#liftreader)
  - [liftReaderAsyncResult](#liftreaderasyncresult)
  - [liftResult](#liftresult)
  - [liftState](#liftstate)
  - [liftSync](#liftsync)
  - [liftSyncResult](#liftsyncresult)
- [logging](#logging)
  - [log](#log)
- [mapping](#mapping)
  - [as](#as)
  - [flap](#flap)
  - [map](#map)
  - [mapBoth](#mapboth)
  - [unit](#unit)
- [model](#model)
  - [StateReaderAsyncResult (interface)](#statereaderasyncresult-interface)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
  - [flatMapAsync](#flatmapasync)
  - [flatMapAsyncResult](#flatmapasyncresult)
  - [flatMapNullable](#flatmapnullable)
  - [flatMapOption](#flatmapoption)
  - [flatMapReader](#flatmapreader)
  - [flatMapReaderAsyncResult](#flatmapreaderasyncresult)
  - [flatMapResult](#flatmapresult)
  - [flatMapState](#flatmapstate)
  - [flatMapSync](#flatmapsync)
  - [flatMapSyncResult](#flatmapsyncresult)
  - [zipLeft](#zipleft)
  - [zipRight](#zipright)
- [traversing](#traversing)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [traverseNonEmptyReadonlyArray](#traversenonemptyreadonlyarray)
  - [traverseNonEmptyReadonlyArrayWithIndex](#traversenonemptyreadonlyarraywithindex)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
- [tuple sequencing](#tuple-sequencing)
  - [tupled](#tupled)
  - [zipFlatten](#zipflatten)
  - [zipWith](#zipwith)
- [type lambdas](#type-lambdas)
  - [StateReaderAsyncResultTypeLambda (interface)](#statereaderasyncresulttypelambda-interface)
- [utils](#utils)
  - [ap](#ap)
  - [composeKleisli](#composekleisli)
  - [delay](#delay)
  - [evaluate](#evaluate)
  - [execute](#execute)
  - [flatten](#flatten)
  - [idKleisli](#idkleisli)
  - [local](#local)
  - [orElse](#orelse)
  - [tap](#tap)

---

# constructors

## ask

Reads the current context.

**Signature**

```ts
export declare const ask: <S, R>() => StateReaderAsyncResult<S, R, never, R>
```

Added in v3.0.0

## asks

Projects a value from the global context in a `ReaderResult`.

**Signature**

```ts
export declare const asks: <R, A, S>(f: (r: R) => A) => StateReaderAsyncResult<S, R, never, A>
```

Added in v3.0.0

## asksStateReaderAsyncResult

**Signature**

```ts
export declare const asksStateReaderAsyncResult: <R1, S, R2, E, A>(
  f: (r1: R1) => StateReaderAsyncResult<S, R2, E, A>
) => StateReaderAsyncResult<S, R1 & R2, E, A>
```

Added in v3.0.0

## fail

**Signature**

```ts
export declare const fail: <E, S>(e: E) => StateReaderAsyncResult<S, unknown, E, never>
```

Added in v3.0.0

## failAsync

**Signature**

```ts
export declare const failAsync: <E, S>(me: any) => StateReaderAsyncResult<S, unknown, E, never>
```

Added in v3.0.0

## failReader

**Signature**

```ts
export declare const failReader: <R, E, S>(me: any) => StateReaderAsyncResult<S, R, E, never>
```

Added in v3.0.0

## failState

**Signature**

```ts
export declare const failState: <S, E>(me: any) => StateReaderAsyncResult<S, unknown, E, never>
```

Added in v3.0.0

## failSync

**Signature**

```ts
export declare const failSync: <E, S>(me: any) => StateReaderAsyncResult<S, unknown, E, never>
```

Added in v3.0.0

## fromAsync

**Signature**

```ts
export declare const fromAsync: <A, S>(ma: any) => StateReaderAsyncResult<S, unknown, never, A>
```

Added in v3.0.0

## fromReader

**Signature**

```ts
export declare const fromReader: <R, A, S>(ma: any) => StateReaderAsyncResult<S, R, never, A>
```

Added in v3.0.0

## fromReaderAsyncResult

**Signature**

```ts
export declare const fromReaderAsyncResult: <R, E, A, S>(fa: any) => StateReaderAsyncResult<S, R, E, A>
```

Added in v3.0.0

## fromState

**Signature**

```ts
export declare const fromState: <S, A>(ma: any) => StateReaderAsyncResult<S, unknown, never, A>
```

Added in v3.0.0

## fromSync

**Signature**

```ts
export declare const fromSync: <A, S>(ma: any) => StateReaderAsyncResult<S, unknown, never, A>
```

Added in v3.0.0

## get

Get the current state

**Signature**

```ts
export declare const get: <S>() => StateReaderAsyncResult<S, unknown, never, S>
```

Added in v3.0.0

## gets

Get a value which depends on the current state

**Signature**

```ts
export declare const gets: <S, A>(f: (s: S) => A) => StateReaderAsyncResult<S, unknown, never, A>
```

Added in v3.0.0

## modify

Modify the state by applying a function to the current state

**Signature**

```ts
export declare const modify: <S>(f: any) => StateReaderAsyncResult<S, unknown, never, void>
```

Added in v3.0.0

## put

Set the state

**Signature**

```ts
export declare const put: <S>(s: S) => StateReaderAsyncResult<S, unknown, never, void>
```

Added in v3.0.0

## sleep

Returns an effect that suspends for the specified `duration` (in millis).

**Signature**

```ts
export declare const sleep: <S>(duration: number) => StateReaderAsyncResult<S, unknown, never, void>
```

Added in v3.0.0

## succeed

**Signature**

```ts
export declare const succeed: <A, S>(a: A) => StateReaderAsyncResult<S, unknown, never, A>
```

Added in v3.0.0

# conversions

## fromAsyncResult

**Signature**

```ts
export declare const fromAsyncResult: <E, A, S>(fa: any) => StateReaderAsyncResult<S, unknown, E, A>
```

Added in v3.0.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <E>(
  onNullable: E
) => <A, S>(a: A) => StateReaderAsyncResult<S, unknown, E, NonNullable<A>>
```

Added in v3.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: E) => <A, S, R>(fa: any) => StateReaderAsyncResult<S, R, E, A>
```

Added in v3.0.0

## fromReaderResult

**Signature**

```ts
export declare const fromReaderResult: <R, E, A, S>(fa: any) => StateReaderAsyncResult<S, R, E, A>
```

Added in v3.0.0

## fromResult

**Signature**

```ts
export declare const fromResult: <E, A, S>(self: any) => StateReaderAsyncResult<S, unknown, E, A>
```

Added in v3.0.0

## fromSyncResult

**Signature**

```ts
export declare const fromSyncResult: <E, A, S>(fa: any) => StateReaderAsyncResult<S, unknown, E, A>
```

Added in v3.0.0

# do notation

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, S, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => StateReaderAsyncResult<S, R2, E2, B>
) => <R1, E1>(
  self: StateReaderAsyncResult<S, R1, E1, A>
) => StateReaderAsyncResult<S, R1 & R2, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindRight

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <N extends string, A extends object, S, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: StateReaderAsyncResult<S, R2, E2, B>
) => <R1, E1>(
  self: StateReaderAsyncResult<S, R1, E1, A>
) => StateReaderAsyncResult<S, R1 & R2, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <S, R, E, A>(self: StateReaderAsyncResult<S, R, E, A>) => StateReaderAsyncResult<S, R, E, { readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <S, R, E>(
  self: StateReaderAsyncResult<S, R, E, A>
) => StateReaderAsyncResult<S, R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

# error handling

## firstSuccessOf

Returns an effect that runs each of the specified effects in order until one of them succeeds.

**Signature**

```ts
export declare const firstSuccessOf: <S, R, E, A>(
  startWith: StateReaderAsyncResult<S, R, E, A>
) => (collection: Iterable<StateReaderAsyncResult<S, R, E, A>>) => StateReaderAsyncResult<S, R, E, A>
```

Added in v3.0.0

## mapError

Returns an effect with its error channel mapped using the specified
function. This can be used to lift a "smaller" error into a "larger" error.

**Signature**

```ts
export declare const mapError: <E, G>(
  f: (e: E) => G
) => <S, R, A>(self: StateReaderAsyncResult<S, R, E, A>) => StateReaderAsyncResult<S, R, G, A>
```

Added in v3.0.0

## tapError

Returns an effect that effectfully "peeks" at the failure of this effect.

**Signature**

```ts
export declare const tapError: <E1, S, R2, E2>(
  onError: (e: E1) => StateReaderAsyncResult<S, R2, E2, unknown>
) => <R1, A>(self: StateReaderAsyncResult<S, R1, E1, A>) => StateReaderAsyncResult<S, R1 & R2, E1 | E2, A>
```

Added in v3.0.0

# filtering

## filter

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: any, onFalse: E2): <S, R, E1>(
    ma: StateReaderAsyncResult<S, R, E1, C>
  ) => StateReaderAsyncResult<S, R, E2 | E1, B>
  <B extends A, E2, A = B>(predicate: any, onFalse: E2): <S, R, E1>(
    mb: StateReaderAsyncResult<S, R, E1, B>
  ) => StateReaderAsyncResult<S, R, E2 | E1, B>
}
```

Added in v3.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B, E>(
  f: (a: A) => any,
  onNone: E
) => <S, R>(self: StateReaderAsyncResult<S, R, E, A>) => StateReaderAsyncResult<S, R, E, B>
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: {
  <C extends A, B extends A, E, A = C>(refinement: any, onFalse: E): <S, R>(
    self: StateReaderAsyncResult<S, R, E, C>
  ) => readonly [StateReaderAsyncResult<S, R, E, C>, StateReaderAsyncResult<S, R, E, B>]
  <B extends A, E, A = B>(predicate: any, onFalse: E): <S, R>(
    self: StateReaderAsyncResult<S, R, E, B>
  ) => readonly [StateReaderAsyncResult<S, R, E, B>, StateReaderAsyncResult<S, R, E, B>]
}
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C, E>(
  f: (a: A) => any,
  onEmpty: E
) => <S, R>(
  self: StateReaderAsyncResult<S, R, E, A>
) => readonly [StateReaderAsyncResult<S, R, E, B>, StateReaderAsyncResult<S, R, E, C>]
```

Added in v3.0.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: any
```

Added in v3.0.0

## Applicative

**Signature**

```ts
export declare const Applicative: any
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: any
```

Added in v3.0.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: any
```

Added in v3.0.0

## CategoryKind

**Signature**

```ts
export declare const CategoryKind: any
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: any
```

Added in v3.0.0

## FromAsync

**Signature**

```ts
export declare const FromAsync: any
```

Added in v3.0.0

## FromIdentity

**Signature**

```ts
export declare const FromIdentity: any
```

Added in v3.0.0

## FromReader

**Signature**

```ts
export declare const FromReader: any
```

Added in v3.0.0

## FromResult

**Signature**

```ts
export declare const FromResult: any
```

Added in v3.0.0

## FromState

**Signature**

```ts
export declare const FromState: any
```

Added in v3.0.0

## FromSync

**Signature**

```ts
export declare const FromSync: any
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: any
```

Added in v3.0.0

## KleisliComposable

**Signature**

```ts
export declare const KleisliComposable: any
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: any
```

Added in v3.0.0

# lifting

## lift2

Lifts a binary function into `StateReaderAsyncResult`.

**Signature**

```ts
export declare const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <S, R1, E1, R2, E2>(
  fa: StateReaderAsyncResult<S, R1, E1, A>,
  fb: StateReaderAsyncResult<S, R2, E2, B>
) => StateReaderAsyncResult<S, R1 & R2, E1 | E2, C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into `StateReaderAsyncResult`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <S, R1, E1, R2, E2, R3, E3>(
  fa: StateReaderAsyncResult<S, R1, E1, A>,
  fb: StateReaderAsyncResult<S, R2, E2, B>,
  fc: StateReaderAsyncResult<S, R3, E3, C>
) => StateReaderAsyncResult<S, R1 & R2 & R3, E1 | E2 | E3, D>
```

Added in v3.0.0

## liftAsync

**Signature**

```ts
export declare const liftAsync: <A extends readonly unknown[], B>(
  f: (...a: A) => any
) => <S>(...a: A) => StateReaderAsyncResult<S, unknown, never, B>
```

Added in v3.0.0

## liftAsyncResult

**Signature**

```ts
export declare const liftAsyncResult: <A extends readonly unknown[], E, B>(
  f: (...a: A) => any
) => <S>(...a: A) => StateReaderAsyncResult<S, unknown, E, B>
```

Added in v3.0.0

## liftNullable

**Signature**

```ts
export declare const liftNullable: <A extends readonly unknown[], B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: E
) => <S>(...a: A) => StateReaderAsyncResult<S, unknown, E, NonNullable<B>>
```

Added in v3.0.0

## liftOption

**Signature**

```ts
export declare const liftOption: <A extends readonly unknown[], B, E>(
  f: (...a: A) => any,
  onNone: E
) => <S>(...a: A) => StateReaderAsyncResult<S, unknown, E, B>
```

Added in v3.0.0

## liftPredicate

**Signature**

```ts
export declare const liftPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: any, onFalse: E): <S>(
    c: C
  ) => StateReaderAsyncResult<S, unknown, E, B>
  <B extends A, E, A = B>(predicate: any, onFalse: E): <S>(b: B) => StateReaderAsyncResult<S, unknown, E, B>
}
```

Added in v3.0.0

## liftReader

**Signature**

```ts
export declare const liftReader: <A extends readonly unknown[], R, B>(
  f: (...a: A) => any
) => <S>(...a: A) => StateReaderAsyncResult<S, R, never, B>
```

Added in v3.0.0

## liftReaderAsyncResult

**Signature**

```ts
export declare const liftReaderAsyncResult: <A extends readonly unknown[], R, E, B>(
  f: (...a: A) => any
) => <S>(...a: A) => StateReaderAsyncResult<S, R, E, B>
```

Added in v3.0.0

## liftResult

**Signature**

```ts
export declare const liftResult: <A extends readonly unknown[], E, B>(
  f: (...a: A) => any
) => <S>(...a: A) => StateReaderAsyncResult<S, unknown, E, B>
```

Added in v3.0.0

## liftState

**Signature**

```ts
export declare const liftState: <A extends readonly unknown[], S, B>(
  f: (...a: A) => any
) => (...a: A) => StateReaderAsyncResult<S, unknown, never, B>
```

Added in v3.0.0

## liftSync

**Signature**

```ts
export declare const liftSync: <A extends readonly unknown[], B>(
  f: (...a: A) => any
) => <S>(...a: A) => StateReaderAsyncResult<S, unknown, never, B>
```

Added in v3.0.0

## liftSyncResult

**Signature**

```ts
export declare const liftSyncResult: <A extends readonly unknown[], E, B>(
  f: (...a: A) => any
) => <S>(...a: A) => StateReaderAsyncResult<S, unknown, E, B>
```

Added in v3.0.0

# logging

## log

**Signature**

```ts
export declare const log: <S>(...x: ReadonlyArray<unknown>) => StateReaderAsyncResult<S, unknown, never, void>
```

Added in v3.0.0

# mapping

## as

Maps the success value of this effect to the specified constant value.

**Signature**

```ts
export declare const as: <B>(
  b: B
) => <S, R, E>(self: StateReaderAsyncResult<S, R, E, unknown>) => StateReaderAsyncResult<S, R, E, B>
```

Added in v3.0.0

## flap

**Signature**

```ts
export declare const flap: <A>(
  a: A
) => <S, R, E, B>(fab: StateReaderAsyncResult<S, R, E, (a: A) => B>) => StateReaderAsyncResult<S, R, E, B>
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(
  f: (a: A) => B
) => <S, R, E>(self: StateReaderAsyncResult<S, R, E, A>) => StateReaderAsyncResult<S, R, E, B>
```

Added in v3.0.0

## mapBoth

Returns an effect whose failure and success channels have been mapped by
the specified pair of functions, `f` and `g`.

**Signature**

```ts
export declare const mapBoth: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <S, R>(self: StateReaderAsyncResult<S, R, E, A>) => StateReaderAsyncResult<S, R, G, B>
```

Added in v3.0.0

## unit

Returns the effect resulting from mapping the success of this effect to unit.

**Signature**

```ts
export declare const unit: <S, R, E>(
  self: StateReaderAsyncResult<S, R, E, unknown>
) => StateReaderAsyncResult<S, R, E, void>
```

Added in v3.0.0

# model

## StateReaderAsyncResult (interface)

**Signature**

```ts
export interface StateReaderAsyncResult<S, R, E, A> {
  (s: S): ReaderAsyncResult<R, E, readonly [S, A]>
}
```

Added in v3.0.0

# sequencing

## flatMap

**Signature**

```ts
export declare const flatMap: <A, S, R2, E2, B>(
  f: (a: A) => StateReaderAsyncResult<S, R2, E2, B>
) => <R1, E1>(self: StateReaderAsyncResult<S, R1, E1, A>) => StateReaderAsyncResult<S, R1 & R2, E2 | E1, B>
```

Added in v3.0.0

## flatMapAsync

**Signature**

```ts
export declare const flatMapAsync: <A, B>(
  f: (a: A) => any
) => <S, R, E>(self: StateReaderAsyncResult<S, R, E, A>) => StateReaderAsyncResult<S, R, E, B>
```

Added in v3.0.0

## flatMapAsyncResult

**Signature**

```ts
export declare const flatMapAsyncResult: <A, E2, B>(
  f: (a: A) => any
) => <S, R, E1>(ma: StateReaderAsyncResult<S, R, E1, A>) => StateReaderAsyncResult<S, R, E2 | E1, B>
```

Added in v3.0.0

## flatMapNullable

**Signature**

```ts
export declare const flatMapNullable: <A, B, E2>(
  f: (a: A) => B | null | undefined,
  onNullable: E2
) => <S, R, E1>(self: StateReaderAsyncResult<S, R, E1, A>) => StateReaderAsyncResult<S, R, E2 | E1, NonNullable<B>>
```

Added in v3.0.0

## flatMapOption

**Signature**

```ts
export declare const flatMapOption: <A, B, E2>(
  f: (a: A) => any,
  onNone: E2
) => <S, R, E1>(self: StateReaderAsyncResult<S, R, E1, A>) => StateReaderAsyncResult<S, R, E2 | E1, B>
```

Added in v3.0.0

## flatMapReader

**Signature**

```ts
export declare const flatMapReader: <A, R2, B>(
  f: (a: A) => any
) => <S, R1, E>(ma: StateReaderAsyncResult<S, R1, E, A>) => StateReaderAsyncResult<S, R1 & R2, E, B>
```

Added in v3.0.0

## flatMapReaderAsyncResult

**Signature**

```ts
export declare const flatMapReaderAsyncResult: <A, R, E2, B>(
  f: (a: A) => any
) => <S, E1>(ma: StateReaderAsyncResult<S, R, E1, A>) => StateReaderAsyncResult<S, R, E2 | E1, B>
```

Added in v3.0.0

## flatMapResult

**Signature**

```ts
export declare const flatMapResult: <A, E2, B>(
  f: (a: A) => any
) => <S, R, E1>(ma: StateReaderAsyncResult<S, R, E1, A>) => StateReaderAsyncResult<S, R, E2 | E1, B>
```

Added in v3.0.0

## flatMapState

**Signature**

```ts
export declare const flatMapState: <A, S, B>(
  f: (a: A) => any
) => <R, E>(ma: StateReaderAsyncResult<S, R, E, A>) => StateReaderAsyncResult<S, R, E, B>
```

Added in v3.0.0

## flatMapSync

**Signature**

```ts
export declare const flatMapSync: <A, B>(
  f: (a: A) => any
) => <S, R, E>(self: StateReaderAsyncResult<S, R, E, A>) => StateReaderAsyncResult<S, R, E, B>
```

Added in v3.0.0

## flatMapSyncResult

**Signature**

```ts
export declare const flatMapSyncResult: <A, E2, B>(
  f: (a: A) => any
) => <S, R, E1>(ma: StateReaderAsyncResult<S, R, E1, A>) => StateReaderAsyncResult<S, R, E2 | E1, B>
```

Added in v3.0.0

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: <S, R2, E2>(
  second: StateReaderAsyncResult<S, R2, E2, unknown>
) => <R1, E1, A>(self: StateReaderAsyncResult<S, R1, E1, A>) => StateReaderAsyncResult<S, R1 & R2, E2 | E1, A>
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <S, R2, E2, A>(
  second: StateReaderAsyncResult<S, R2, E2, A>
) => <R1, E1>(self: StateReaderAsyncResult<S, R1, E1, unknown>) => StateReaderAsyncResult<S, R1 & R2, E2 | E1, A>
```

Added in v3.0.0

# traversing

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <S, R, E, A>(
  arr: readonly StateReaderAsyncResult<S, R, E, A>[]
) => StateReaderAsyncResult<S, R, E, readonly A[]>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArray

Equivalent to `NonEmptyReadonlyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArray: <A, S, R, E, B>(
  f: (a: A) => StateReaderAsyncResult<S, R, E, B>
) => (as: any) => StateReaderAsyncResult<S, R, E, any>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArrayWithIndex

Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArrayWithIndex: <A, S, R, E, B>(
  f: (index: number, a: A) => StateReaderAsyncResult<S, R, E, B>
) => (as: any) => StateReaderAsyncResult<S, R, E, any>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, S, R, E, B>(
  f: (a: A) => StateReaderAsyncResult<S, R, E, B>
) => (as: readonly A[]) => StateReaderAsyncResult<S, R, E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, S, R, E, B>(
  f: (index: number, a: A) => StateReaderAsyncResult<S, R, E, B>
) => (as: readonly A[]) => StateReaderAsyncResult<S, R, E, readonly B[]>
```

Added in v3.0.0

# tuple sequencing

## tupled

**Signature**

```ts
export declare const tupled: <S, R, E, A>(
  self: StateReaderAsyncResult<S, R, E, A>
) => StateReaderAsyncResult<S, R, E, readonly [A]>
```

Added in v3.0.0

## zipFlatten

Sequentially zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <S, R2, E2, B>(
  fb: StateReaderAsyncResult<S, R2, E2, B>
) => <R1, E1, A extends readonly unknown[]>(
  self: StateReaderAsyncResult<S, R1, E1, A>
) => StateReaderAsyncResult<S, R1 & R2, E2 | E1, readonly [...A, B]>
```

Added in v3.0.0

## zipWith

Sequentially zips this effect with the specified effect using the specified combiner function.

**Signature**

```ts
export declare const zipWith: <S, R2, E2, B, A, C>(
  that: StateReaderAsyncResult<S, R2, E2, B>,
  f: (a: A, b: B) => C
) => <R1, E1>(self: StateReaderAsyncResult<S, R1, E1, A>) => StateReaderAsyncResult<S, R1 & R2, E2 | E1, C>
```

Added in v3.0.0

# type lambdas

## StateReaderAsyncResultTypeLambda (interface)

**Signature**

```ts
export interface StateReaderAsyncResultTypeLambda extends TypeLambda {
  readonly type: StateReaderAsyncResult<this['InOut1'], this['In1'], this['Out2'], this['Out1']>
}
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <S, R2, E2, A>(
  fa: StateReaderAsyncResult<S, R2, E2, A>
) => <R1, E1, B>(self: StateReaderAsyncResult<S, R1, E1, (a: A) => B>) => StateReaderAsyncResult<S, R1 & R2, E2 | E1, B>
```

Added in v3.0.0

## composeKleisli

**Signature**

```ts
export declare const composeKleisli: <B, S, R2, E2, C>(
  bfc: (b: B) => StateReaderAsyncResult<S, R2, E2, C>
) => <A, R1, E1>(
  afb: (a: A) => StateReaderAsyncResult<S, R1, E1, B>
) => (a: A) => StateReaderAsyncResult<S, R1 & R2, E2 | E1, C>
```

Added in v3.0.0

## delay

Returns an effect that is delayed from this effect by the specified `duration` (in millis).

**Signature**

```ts
export declare const delay: (
  duration: number
) => <S, R, E, A>(self: StateReaderAsyncResult<S, R, E, A>) => StateReaderAsyncResult<S, R, E, A>
```

Added in v3.0.0

## evaluate

Run a computation in the `StateReaderAsyncResult` monad, discarding the final state

**Signature**

```ts
export declare const evaluate: <S>(s: S) => <R, E, A>(ma: StateReaderAsyncResult<S, R, E, A>) => any
```

Added in v3.0.0

## execute

Run a computation in the `StateReaderAsyncResult` monad discarding the result

**Signature**

```ts
export declare const execute: <S>(s: S) => <R, E, A>(ma: StateReaderAsyncResult<S, R, E, A>) => any
```

Added in v3.0.0

## flatten

**Signature**

```ts
export declare const flatten: <S, R1, E1, R2, E2, A>(
  mma: StateReaderAsyncResult<S, R1, E1, StateReaderAsyncResult<S, R2, E2, A>>
) => StateReaderAsyncResult<S, R1 & R2, E1 | E2, A>
```

Added in v3.0.0

## idKleisli

**Signature**

```ts
export declare const idKleisli: <A>() => <S>(a: A) => StateReaderAsyncResult<S, unknown, never, A>
```

Added in v3.0.0

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <R2, R1>(
  f: (r2: R2) => R1
) => <S, E, A>(ma: StateReaderAsyncResult<S, R1, E, A>) => StateReaderAsyncResult<S, R2, E, A>
```

Added in v3.0.0

## orElse

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const orElse: <S, R2, E2, B>(
  that: StateReaderAsyncResult<S, R2, E2, B>
) => <R1, E1, A>(self: StateReaderAsyncResult<S, R1, E1, A>) => StateReaderAsyncResult<S, R1 & R2, E2, B | A>
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A, S, R2, E2>(
  f: (a: A) => StateReaderAsyncResult<S, R2, E2, unknown>
) => <R1, E1>(self: StateReaderAsyncResult<S, R1, E1, A>) => StateReaderAsyncResult<S, R1 & R2, E2 | E1, A>
```

Added in v3.0.0
