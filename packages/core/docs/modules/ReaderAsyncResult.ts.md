---
title: ReaderAsyncResult.ts
nav_order: 21
parent: Modules
---

## ReaderAsyncResult overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
  - [asksReaderAsyncResult](#asksreaderasyncresult)
  - [fail](#fail)
  - [failAsync](#failasync)
  - [failReader](#failreader)
  - [failReaderAsync](#failreaderasync)
  - [failReaderSync](#failreadersync)
  - [failSync](#failsync)
  - [fromReader](#fromreader)
  - [fromReaderAsync](#fromreaderasync)
  - [fromReaderResult](#fromreaderresult)
  - [fromReaderSync](#fromreadersync)
  - [fromSync](#fromsync)
  - [sleep](#sleep)
  - [succeed](#succeed)
- [conversions](#conversions)
  - [fromAsync](#fromasync)
  - [fromAsyncResult](#fromasyncresult)
  - [fromNullable](#fromnullable)
  - [fromOption](#fromoption)
  - [fromResult](#fromresult)
  - [fromSyncResult](#fromsyncresult)
- [do notation](#do-notation)
  - [Do](#do)
  - [bind](#bind)
  - [bindRight](#bindright)
  - [bindTo](#bindto)
  - [let](#let)
- [error handling](#error-handling)
  - [catchAll](#catchall)
  - [firstSuccessOf](#firstsuccessof)
  - [flatMapError](#flatmaperror)
  - [getOrElse](#getorelse)
  - [getOrElseReaderAsync](#getorelsereaderasync)
  - [getValidatedAlt](#getvalidatedalt)
  - [getValidatedApplicative](#getvalidatedapplicative)
  - [mapError](#maperror)
  - [tapError](#taperror)
- [filtering](#filtering)
  - [compact](#compact)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
  - [separate](#separate)
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
  - [FromSync](#fromsync)
  - [Functor](#functor)
  - [KleisliComposable](#kleislicomposable)
  - [Monad](#monad)
  - [getCompactable](#getcompactable)
  - [getFilterable](#getfilterable)
- [interop](#interop)
  - [toUnion](#tounion)
- [lifting](#lifting)
  - [lift2](#lift2)
  - [lift3](#lift3)
  - [liftAsync](#liftasync)
  - [liftAsyncResult](#liftasyncresult)
  - [liftNullable](#liftnullable)
  - [liftOption](#liftoption)
  - [liftPredicate](#liftpredicate)
  - [liftReader](#liftreader)
  - [liftReaderAsync](#liftreaderasync)
  - [liftReaderResult](#liftreaderresult)
  - [liftReaderSync](#liftreadersync)
  - [liftResult](#liftresult)
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
  - [ReaderAsyncResult (interface)](#readerasyncresult-interface)
- [pattern matching](#pattern-matching)
  - [match](#match)
  - [matchReaderAsync](#matchreaderasync)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
  - [flatMapAsync](#flatmapasync)
  - [flatMapAsyncResult](#flatmapasyncresult)
  - [flatMapNullable](#flatmapnullable)
  - [flatMapOption](#flatmapoption)
  - [flatMapReader](#flatmapreader)
  - [flatMapReaderAsync](#flatmapreaderasync)
  - [flatMapReaderResult](#flatmapreaderresult)
  - [flatMapReaderSync](#flatmapreadersync)
  - [flatMapResult](#flatmapresult)
  - [flatMapSync](#flatmapsync)
  - [flatMapSyncResult](#flatmapsyncresult)
  - [zipLeft](#zipleft)
  - [zipRight](#zipright)
- [traversing](#traversing)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [sequenceReadonlyArrayPar](#sequencereadonlyarraypar)
  - [traverseNonEmptyReadonlyArray](#traversenonemptyreadonlyarray)
  - [traverseNonEmptyReadonlyArrayPar](#traversenonemptyreadonlyarraypar)
  - [traverseNonEmptyReadonlyArrayWithIndex](#traversenonemptyreadonlyarraywithindex)
  - [traverseNonEmptyReadonlyArrayWithIndexPar](#traversenonemptyreadonlyarraywithindexpar)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayPar](#traversereadonlyarraypar)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyArrayWithIndexPar](#traversereadonlyarraywithindexpar)
- [tuple sequencing](#tuple-sequencing)
  - [Zip](#zip)
  - [tupled](#tupled)
  - [zipFlatten](#zipflatten)
  - [zipWith](#zipwith)
- [type lambdas](#type-lambdas)
  - [ReaderAsyncResultTypeLambda (interface)](#readerasyncresulttypelambda-interface)
- [utils](#utils)
  - [ap](#ap)
  - [bracket](#bracket)
  - [composeKleisli](#composekleisli)
  - [delay](#delay)
  - [flatten](#flatten)
  - [idKleisli](#idkleisli)
  - [local](#local)
  - [orElse](#orelse)
  - [reverse](#reverse)
  - [tap](#tap)

---

# constructors

## ask

Reads the current context.

**Signature**

```ts
export declare const ask: <R>() => ReaderAsyncResult<R, never, R>
```

Added in v3.0.0

## asks

Projects a value from the global context in a `ReaderResult`.

**Signature**

```ts
export declare const asks: <R, A>(f: (r: R) => A) => ReaderAsyncResult<R, never, A>
```

Added in v3.0.0

## asksReaderAsyncResult

**Signature**

```ts
export declare const asksReaderAsyncResult: <R1, R2, E, A>(
  f: (r1: R1) => ReaderAsyncResult<R2, E, A>
) => ReaderAsyncResult<R1 & R2, E, A>
```

Added in v3.0.0

## fail

**Signature**

```ts
export declare const fail: <E>(e: E) => ReaderAsyncResult<unknown, E, never>
```

Added in v3.0.0

## failAsync

**Signature**

```ts
export declare const failAsync: <E>(me: any) => ReaderAsyncResult<unknown, E, never>
```

Added in v3.0.0

## failReader

**Signature**

```ts
export declare const failReader: <R, E>(me: any) => ReaderAsyncResult<R, E, never>
```

Added in v3.0.0

## failReaderAsync

**Signature**

```ts
export declare const failReaderAsync: <R, E>(me: any) => ReaderAsyncResult<R, E, never>
```

Added in v3.0.0

## failReaderSync

**Signature**

```ts
export declare const failReaderSync: <R, E>(me: any) => ReaderAsyncResult<R, E, never>
```

Added in v3.0.0

## failSync

**Signature**

```ts
export declare const failSync: <E>(me: any) => ReaderAsyncResult<unknown, E, never>
```

Added in v3.0.0

## fromReader

**Signature**

```ts
export declare const fromReader: <R, A>(ma: any) => ReaderAsyncResult<R, never, A>
```

Added in v3.0.0

## fromReaderAsync

**Signature**

```ts
export declare const fromReaderAsync: <R, A>(ma: any) => ReaderAsyncResult<R, never, A>
```

Added in v3.0.0

## fromReaderResult

**Signature**

```ts
export declare const fromReaderResult: <R, E, A>(self: any) => ReaderAsyncResult<R, E, A>
```

Added in v3.0.0

## fromReaderSync

**Signature**

```ts
export declare const fromReaderSync: <R, A>(ma: any) => ReaderAsyncResult<R, never, A>
```

Added in v3.0.0

## fromSync

**Signature**

```ts
export declare const fromSync: <A>(ma: any) => ReaderAsyncResult<unknown, never, A>
```

Added in v3.0.0

## sleep

Returns an effect that suspends for the specified `duration` (in millis).

**Signature**

```ts
export declare const sleep: (duration: number) => ReaderAsyncResult<unknown, never, void>
```

Added in v3.0.0

## succeed

**Signature**

```ts
export declare const succeed: <A>(a: A) => ReaderAsyncResult<unknown, never, A>
```

Added in v3.0.0

# conversions

## fromAsync

**Signature**

```ts
export declare const fromAsync: <A>(ma: any) => ReaderAsyncResult<unknown, never, A>
```

Added in v3.0.0

## fromAsyncResult

**Signature**

```ts
export declare const fromAsyncResult: <E, A>(fa: any) => ReaderAsyncResult<unknown, E, A>
```

Added in v3.0.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <E>(onNullable: E) => <A>(a: A) => ReaderAsyncResult<unknown, E, NonNullable<A>>
```

Added in v3.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: E) => <A, R>(fa: any) => ReaderAsyncResult<R, E, A>
```

Added in v3.0.0

## fromResult

**Signature**

```ts
export declare const fromResult: <E, A>(fa: any) => ReaderAsyncResult<unknown, E, A>
```

Added in v3.0.0

## fromSyncResult

**Signature**

```ts
export declare const fromSyncResult: <E, A>(fa: any) => ReaderAsyncResult<unknown, E, A>
```

Added in v3.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: ReaderAsyncResult<unknown, never, {}>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderAsyncResult<R2, E2, B>
) => <R1, E1>(
  self: ReaderAsyncResult<R1, E1, A>
) => ReaderAsyncResult<R1 & R2, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindRight

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <N extends string, A extends object, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderAsyncResult<R2, E2, B>
) => <R1, E1>(
  self: ReaderAsyncResult<R1, E1, A>
) => ReaderAsyncResult<R1 & R2, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <R, E, A>(self: ReaderAsyncResult<R, E, A>) => ReaderAsyncResult<R, E, { readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R, E>(
  self: ReaderAsyncResult<R, E, A>
) => ReaderAsyncResult<R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

# error handling

## catchAll

Recovers from all errors.

**Signature**

```ts
export declare const catchAll: <E1, R2, E2, B>(
  onError: (e: E1) => ReaderAsyncResult<R2, E2, B>
) => <R1, A>(ma: ReaderAsyncResult<R1, E1, A>) => ReaderAsyncResult<R1 & R2, E2, B | A>
```

Added in v3.0.0

## firstSuccessOf

Returns an effect that runs each of the specified effects in order until one of them succeeds.

**Signature**

```ts
export declare const firstSuccessOf: <R, E, A>(
  startWith: ReaderAsyncResult<R, E, A>
) => (collection: Iterable<ReaderAsyncResult<R, E, A>>) => ReaderAsyncResult<R, E, A>
```

Added in v3.0.0

## flatMapError

Creates a composite effect that represents this effect followed by another
one that may depend on the error produced by this one.

**Signature**

```ts
export declare const flatMapError: <E1, R, E2>(
  f: (e: E1) => any
) => <A>(self: ReaderAsyncResult<R, E1, A>) => ReaderAsyncResult<R, E2, A>
```

Added in v3.0.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <B>(onError: B) => <R, A>(self: ReaderAsyncResult<R, unknown, A>) => any
```

Added in v3.0.0

## getOrElseReaderAsync

**Signature**

```ts
export declare const getOrElseReaderAsync: <R2, B>(
  onError: any
) => <R1, A>(self: ReaderAsyncResult<R1, unknown, A>) => any
```

Added in v3.0.0

## getValidatedAlt

The default [`Alt`](#semigroupkind) instance returns the last error, if you want to
get all errors you need to provide a way to combine them via a `Semigroup`.

**Signature**

```ts
export declare const getValidatedAlt: <E>(Semigroup: any) => any
```

Added in v3.0.0

## getValidatedApplicative

The default [`Applicative`](#applicative) instance returns the first error, if you want to
get all errors you need to provide a way to combine them via a `Semigroup`.

**Signature**

```ts
export declare const getValidatedApplicative: <E>(Apply: any, Semigroup: any) => any
```

Added in v3.0.0

## mapError

Returns an effect with its error channel mapped using the specified
function. This can be used to lift a "smaller" error into a "larger" error.

**Signature**

```ts
export declare const mapError: <E, G>(
  f: (e: E) => G
) => <R, A>(self: ReaderAsyncResult<R, E, A>) => ReaderAsyncResult<R, G, A>
```

Added in v3.0.0

## tapError

Returns an effect that effectfully "peeks" at the failure of this effect.

**Signature**

```ts
export declare const tapError: <E1, R2, E2>(
  onError: (e: E1) => ReaderAsyncResult<R2, E2, unknown>
) => <R1, A>(self: ReaderAsyncResult<R1, E1, A>) => ReaderAsyncResult<R1 & R2, E1 | E2, A>
```

Added in v3.0.0

# filtering

## compact

**Signature**

```ts
export declare const compact: <E>(onNone: E) => <R, A>(self: ReaderAsyncResult<R, E, any>) => ReaderAsyncResult<R, E, A>
```

Added in v3.0.0

## filter

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: any, onFalse: E2): <R, E1>(
    ma: ReaderAsyncResult<R, E1, C>
  ) => ReaderAsyncResult<R, E2 | E1, B>
  <B extends A, E2, A = B>(predicate: any, onFalse: E2): <R, E1>(
    mb: ReaderAsyncResult<R, E1, B>
  ) => ReaderAsyncResult<R, E2 | E1, B>
}
```

Added in v3.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B, E>(
  f: (a: A) => any,
  onNone: E
) => <R>(self: ReaderAsyncResult<R, E, A>) => ReaderAsyncResult<R, E, B>
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: {
  <C extends A, B extends A, E, A = C>(refinement: any, onFalse: E): <R>(
    self: ReaderAsyncResult<R, E, C>
  ) => readonly [ReaderAsyncResult<R, E, C>, ReaderAsyncResult<R, E, B>]
  <B extends A, E, A = B>(predicate: any, onFalse: E): <R>(
    self: ReaderAsyncResult<R, E, B>
  ) => readonly [ReaderAsyncResult<R, E, B>, ReaderAsyncResult<R, E, B>]
}
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C, E>(
  f: (a: A) => any,
  onEmpty: E
) => <R>(self: ReaderAsyncResult<R, E, A>) => readonly [ReaderAsyncResult<R, E, B>, ReaderAsyncResult<R, E, C>]
```

Added in v3.0.0

## separate

**Signature**

```ts
export declare const separate: <E>(
  onEmpty: E
) => <R, A, B>(self: ReaderAsyncResult<R, E, any>) => readonly [ReaderAsyncResult<R, E, A>, ReaderAsyncResult<R, E, B>]
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

## getCompactable

**Signature**

```ts
export declare const getCompactable: <E>(onNone: E) => any
```

Added in v3.0.0

## getFilterable

**Signature**

```ts
export declare const getFilterable: <E>(onEmpty: E) => any
```

Added in v3.0.0

# interop

## toUnion

**Signature**

```ts
export declare const toUnion: <R, E, A>(fa: ReaderAsyncResult<R, E, A>) => any
```

Added in v3.0.0

# lifting

## lift2

Lifts a binary function into `ReaderAsyncResult`.

**Signature**

```ts
export declare const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <R1, E1, R2, E2>(
  fa: ReaderAsyncResult<R1, E1, A>,
  fb: ReaderAsyncResult<R2, E2, B>
) => ReaderAsyncResult<R1 & R2, E1 | E2, C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into `ReaderAsyncResult`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <R1, E1, R2, E2, R3, E3>(
  fa: ReaderAsyncResult<R1, E1, A>,
  fb: ReaderAsyncResult<R2, E2, B>,
  fc: ReaderAsyncResult<R3, E3, C>
) => ReaderAsyncResult<R1 & R2 & R3, E1 | E2 | E3, D>
```

Added in v3.0.0

## liftAsync

**Signature**

```ts
export declare const liftAsync: <A extends readonly unknown[], B>(
  f: (...a: A) => any
) => (...a: A) => ReaderAsyncResult<unknown, never, B>
```

Added in v3.0.0

## liftAsyncResult

**Signature**

```ts
export declare const liftAsyncResult: <A extends readonly unknown[], E, B>(
  f: (...a: A) => any
) => (...a: A) => ReaderAsyncResult<unknown, E, B>
```

Added in v3.0.0

## liftNullable

**Signature**

```ts
export declare const liftNullable: <A extends readonly unknown[], B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: E
) => (...a: A) => ReaderAsyncResult<unknown, E, NonNullable<B>>
```

Added in v3.0.0

## liftOption

**Signature**

```ts
export declare const liftOption: <A extends readonly unknown[], B, E>(
  f: (...a: A) => any,
  onNone: E
) => (...a: A) => ReaderAsyncResult<unknown, E, B>
```

Added in v3.0.0

## liftPredicate

**Signature**

```ts
export declare const liftPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: any, onFalse: E): (c: C) => ReaderAsyncResult<unknown, E, B>
  <B extends A, E, A = B>(predicate: any, onFalse: E): (b: B) => ReaderAsyncResult<unknown, E, B>
}
```

Added in v3.0.0

## liftReader

**Signature**

```ts
export declare const liftReader: <A extends readonly unknown[], R, B>(
  f: (...a: A) => any
) => (...a: A) => ReaderAsyncResult<R, never, B>
```

Added in v3.0.0

## liftReaderAsync

**Signature**

```ts
export declare const liftReaderAsync: <A extends readonly unknown[], R, B>(
  f: (...a: A) => any
) => (...a: A) => ReaderAsyncResult<R, never, B>
```

Added in v3.0.0

## liftReaderResult

**Signature**

```ts
export declare const liftReaderResult: <A extends readonly unknown[], R, E, B>(
  f: (...a: A) => any
) => (...a: A) => ReaderAsyncResult<R, E, B>
```

Added in v3.0.0

## liftReaderSync

**Signature**

```ts
export declare const liftReaderSync: <A extends readonly unknown[], R, B>(
  f: (...a: A) => any
) => (...a: A) => ReaderAsyncResult<R, never, B>
```

Added in v3.0.0

## liftResult

**Signature**

```ts
export declare const liftResult: <A extends readonly unknown[], E, B>(
  f: (...a: A) => any
) => (...a: A) => ReaderAsyncResult<unknown, E, B>
```

Added in v3.0.0

## liftSync

**Signature**

```ts
export declare const liftSync: <A extends readonly unknown[], B>(
  f: (...a: A) => any
) => (...a: A) => ReaderAsyncResult<unknown, never, B>
```

Added in v3.0.0

## liftSyncResult

**Signature**

```ts
export declare const liftSyncResult: <A extends readonly unknown[], E, B>(
  f: (...a: A) => any
) => (...a: A) => ReaderAsyncResult<unknown, E, B>
```

Added in v3.0.0

# logging

## log

**Signature**

```ts
export declare const log: <A extends readonly unknown[]>(...x: A) => ReaderAsyncResult<unknown, never, void>
```

Added in v3.0.0

# mapping

## as

Maps the success value of this effect to the specified constant value.

**Signature**

```ts
export declare const as: <B>(b: B) => <R, E>(self: ReaderAsyncResult<R, E, unknown>) => ReaderAsyncResult<R, E, B>
```

Added in v3.0.0

## flap

**Signature**

```ts
export declare const flap: <A>(
  a: A
) => <R, E, B>(fab: ReaderAsyncResult<R, E, (a: A) => B>) => ReaderAsyncResult<R, E, B>
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R, E>(fa: ReaderAsyncResult<R, E, A>) => ReaderAsyncResult<R, E, B>
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
) => <R>(self: ReaderAsyncResult<R, E, A>) => ReaderAsyncResult<R, G, B>
```

Added in v3.0.0

## unit

Returns the effect resulting from mapping the success of this effect to unit.

**Signature**

```ts
export declare const unit: <R, E>(self: ReaderAsyncResult<R, E, unknown>) => ReaderAsyncResult<R, E, void>
```

Added in v3.0.0

# model

## ReaderAsyncResult (interface)

**Signature**

```ts
export interface ReaderAsyncResult<R, E, A> {
  (r: R): AsyncResult<E, A>
}
```

Added in v3.0.0

# pattern matching

## match

**Signature**

```ts
export declare const match: <E, B, A, C = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C
) => <R>(ma: ReaderAsyncResult<R, E, A>) => any
```

Added in v3.0.0

## matchReaderAsync

**Signature**

```ts
export declare const matchReaderAsync: <E, R2, B, A, R3, C = B>(
  onError: (e: E) => any,
  onSuccess: (a: A) => any
) => <R1>(ma: ReaderAsyncResult<R1, E, A>) => any
```

Added in v3.0.0

# sequencing

## flatMap

**Signature**

```ts
export declare const flatMap: <A, R2, E2, B>(
  f: (a: A) => ReaderAsyncResult<R2, E2, B>
) => <R1, E1>(self: ReaderAsyncResult<R1, E1, A>) => ReaderAsyncResult<R1 & R2, E2 | E1, B>
```

Added in v3.0.0

## flatMapAsync

**Signature**

```ts
export declare const flatMapAsync: <A, B>(
  f: (a: A) => any
) => <R, E>(self: ReaderAsyncResult<R, E, A>) => ReaderAsyncResult<R, E, B>
```

Added in v3.0.0

## flatMapAsyncResult

**Signature**

```ts
export declare const flatMapAsyncResult: <A, E2, B>(
  f: (a: A) => any
) => <R, E1>(ma: ReaderAsyncResult<R, E1, A>) => ReaderAsyncResult<R, E2 | E1, B>
```

Added in v3.0.0

## flatMapNullable

**Signature**

```ts
export declare const flatMapNullable: <A, B, E2>(
  f: (a: A) => B | null | undefined,
  onNullable: E2
) => <R, E1>(self: ReaderAsyncResult<R, E1, A>) => ReaderAsyncResult<R, E2 | E1, NonNullable<B>>
```

Added in v3.0.0

## flatMapOption

**Signature**

```ts
export declare const flatMapOption: <A, B, E2>(
  f: (a: A) => any,
  onNone: E2
) => <R, E1>(self: ReaderAsyncResult<R, E1, A>) => ReaderAsyncResult<R, E2 | E1, B>
```

Added in v3.0.0

## flatMapReader

**Signature**

```ts
export declare const flatMapReader: <A, R2, B>(
  f: (a: A) => any
) => <R1, E>(ma: ReaderAsyncResult<R1, E, A>) => ReaderAsyncResult<R1 & R2, E, B>
```

Added in v3.0.0

## flatMapReaderAsync

**Signature**

```ts
export declare const flatMapReaderAsync: <A, R2, B>(
  f: (a: A) => any
) => <R1, E>(ma: ReaderAsyncResult<R1, E, A>) => ReaderAsyncResult<R1 & R2, E, B>
```

Added in v3.0.0

## flatMapReaderResult

**Signature**

```ts
export declare const flatMapReaderResult: <A, R2, E2, B>(
  f: (a: A) => any
) => <R1, E1>(ma: ReaderAsyncResult<R1, E1, A>) => ReaderAsyncResult<R1 & R2, E2 | E1, B>
```

Added in v3.0.0

## flatMapReaderSync

**Signature**

```ts
export declare const flatMapReaderSync: <A, R2, B>(
  f: (a: A) => any
) => <R1, E>(ma: ReaderAsyncResult<R1, E, A>) => ReaderAsyncResult<R1 & R2, E, B>
```

Added in v3.0.0

## flatMapResult

**Signature**

```ts
export declare const flatMapResult: <A, E2, B>(
  f: (a: A) => any
) => <R, E1>(ma: ReaderAsyncResult<R, E1, A>) => ReaderAsyncResult<R, E2 | E1, B>
```

Added in v3.0.0

## flatMapSync

**Signature**

```ts
export declare const flatMapSync: <A, B>(
  f: (a: A) => any
) => <R, E>(self: ReaderAsyncResult<R, E, A>) => ReaderAsyncResult<R, E, B>
```

Added in v3.0.0

## flatMapSyncResult

**Signature**

```ts
export declare const flatMapSyncResult: <A, E2, B>(
  f: (a: A) => any
) => <R, E1>(ma: ReaderAsyncResult<R, E1, A>) => ReaderAsyncResult<R, E2 | E1, B>
```

Added in v3.0.0

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: <R2, E2>(
  that: ReaderAsyncResult<R2, E2, unknown>
) => <R1, E1, A>(self: ReaderAsyncResult<R1, E1, A>) => ReaderAsyncResult<R1 & R2, E2 | E1, A>
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <R2, E2, A>(
  that: ReaderAsyncResult<R2, E2, A>
) => <R1, E1>(self: ReaderAsyncResult<R1, E1, unknown>) => ReaderAsyncResult<R1 & R2, E2 | E1, A>
```

Added in v3.0.0

# traversing

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <R, E, A>(
  arr: readonly ReaderAsyncResult<R, E, A>[]
) => ReaderAsyncResult<R, E, readonly A[]>
```

Added in v3.0.0

## sequenceReadonlyArrayPar

Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.

**Signature**

```ts
export declare const sequenceReadonlyArrayPar: <R, E, A>(
  arr: readonly ReaderAsyncResult<R, E, A>[]
) => ReaderAsyncResult<R, E, readonly A[]>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArray

Equivalent to `NonEmptyReadonlyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArray: <A, R, E, B>(
  f: (a: A) => ReaderAsyncResult<R, E, B>
) => (as: any) => ReaderAsyncResult<R, E, any>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArrayPar

Equivalent to `NonEmptyReadonlyArray#traverse(ApplyPar)`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArrayPar: <A, R, E, B>(
  f: (a: A) => ReaderAsyncResult<R, E, B>
) => (as: any) => ReaderAsyncResult<R, E, any>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArrayWithIndex

Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArrayWithIndex: <A, R, E, B>(
  f: (index: number, a: A) => ReaderAsyncResult<R, E, B>
) => (as: any) => ReaderAsyncResult<R, E, any>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArrayWithIndexPar

Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(ApplyPar)`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArrayWithIndexPar: <A, R, E, B>(
  f: (index: number, a: A) => ReaderAsyncResult<R, E, B>
) => (as: any) => ReaderAsyncResult<R, E, any>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, R, E, B>(
  f: (a: A) => ReaderAsyncResult<R, E, B>
) => (as: readonly A[]) => ReaderAsyncResult<R, E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayPar

Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayPar: <A, R, E, B>(
  f: (a: A) => ReaderAsyncResult<R, E, B>
) => (as: readonly A[]) => ReaderAsyncResult<R, E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, R, E, B>(
  f: (index: number, a: A) => ReaderAsyncResult<R, E, B>
) => (as: readonly A[]) => ReaderAsyncResult<R, E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndexPar

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndexPar: <A, R, E, B>(
  f: (index: number, a: A) => ReaderAsyncResult<R, E, B>
) => (as: readonly A[]) => ReaderAsyncResult<R, E, readonly B[]>
```

Added in v3.0.0

# tuple sequencing

## Zip

**Signature**

```ts
export declare const Zip: ReaderAsyncResult<unknown, never, readonly []>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <R, E, A>(self: ReaderAsyncResult<R, E, A>) => ReaderAsyncResult<R, E, readonly [A]>
```

Added in v3.0.0

## zipFlatten

Sequentially zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <R2, E2, B>(
  fb: ReaderAsyncResult<R2, E2, B>
) => <R1, E1, A extends readonly unknown[]>(
  self: ReaderAsyncResult<R1, E1, A>
) => ReaderAsyncResult<R1 & R2, E2 | E1, readonly [...A, B]>
```

Added in v3.0.0

## zipWith

Sequentially zips this effect with the specified effect using the specified combiner function.

**Signature**

```ts
export declare const zipWith: <R2, E2, B, A, C>(
  that: ReaderAsyncResult<R2, E2, B>,
  f: (a: A, b: B) => C
) => <R1, E1>(self: ReaderAsyncResult<R1, E1, A>) => ReaderAsyncResult<R1 & R2, E2 | E1, C>
```

Added in v3.0.0

# type lambdas

## ReaderAsyncResultTypeLambda (interface)

**Signature**

```ts
export interface ReaderAsyncResultTypeLambda extends TypeLambda {
  readonly type: ReaderAsyncResult<this['In1'], this['Out2'], this['Out1']>
}
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <R2, E2, A>(
  fa: ReaderAsyncResult<R2, E2, A>
) => <R1, E1, B>(self: ReaderAsyncResult<R1, E1, (a: A) => B>) => ReaderAsyncResult<R1 & R2, E2 | E1, B>
```

Added in v3.0.0

## bracket

Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
whether the body action throws (\*) or returns.

(\*) i.e. returns a `Failure`

**Signature**

```ts
export declare const bracket: <R1, E1, A, R2, E2, B, R3, E3>(
  acquire: ReaderAsyncResult<R1, E1, A>,
  use: (a: A) => ReaderAsyncResult<R2, E2, B>,
  release: (a: A, e: any) => ReaderAsyncResult<R3, E3, void>
) => ReaderAsyncResult<R1 & R2 & R3, E1 | E2 | E3, B>
```

Added in v3.0.0

## composeKleisli

**Signature**

```ts
export declare const composeKleisli: <B, R2, E2, C>(
  bfc: (b: B) => ReaderAsyncResult<R2, E2, C>
) => <A, R1, E1>(afb: (a: A) => ReaderAsyncResult<R1, E1, B>) => (a: A) => ReaderAsyncResult<R1 & R2, E2 | E1, C>
```

Added in v3.0.0

## delay

Returns an effect that is delayed from this effect by the specified `duration` (in millis).

**Signature**

```ts
export declare const delay: (
  duration: number
) => <R, E, A>(self: ReaderAsyncResult<R, E, A>) => ReaderAsyncResult<R, E, A>
```

Added in v3.0.0

## flatten

**Signature**

```ts
export declare const flatten: <R1, E1, R2, E2, A>(
  mma: ReaderAsyncResult<R1, E1, ReaderAsyncResult<R2, E2, A>>
) => ReaderAsyncResult<R1 & R2, E1 | E2, A>
```

Added in v3.0.0

## idKleisli

**Signature**

```ts
export declare const idKleisli: <A>() => (a: A) => ReaderAsyncResult<unknown, never, A>
```

Added in v3.0.0

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <R2, R1>(
  f: (r2: R2) => R1
) => <E, A>(ma: ReaderAsyncResult<R1, E, A>) => ReaderAsyncResult<R2, E, A>
```

Added in v3.0.0

## orElse

**Signature**

```ts
export declare const orElse: <R2, E2, B>(
  that: ReaderAsyncResult<R2, E2, B>
) => <R1, E1, A>(self: ReaderAsyncResult<R1, E1, A>) => ReaderAsyncResult<R1 & R2, E2, B | A>
```

Added in v3.0.0

## reverse

**Signature**

```ts
export declare const reverse: <R, E, A>(ma: ReaderAsyncResult<R, E, A>) => ReaderAsyncResult<R, A, E>
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A, R2, E2>(
  f: (a: A) => ReaderAsyncResult<R2, E2, unknown>
) => <R1, E1>(self: ReaderAsyncResult<R1, E1, A>) => ReaderAsyncResult<R1 & R2, E2 | E1, A>
```

Added in v3.0.0
