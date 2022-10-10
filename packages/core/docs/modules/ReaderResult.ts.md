---
title: ReaderResult.ts
nav_order: 23
parent: Modules
---

## ReaderResult overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
  - [asksReaderResult](#asksreaderresult)
  - [fail](#fail)
  - [succeed](#succeed)
- [conversions](#conversions)
  - [failReader](#failreader)
  - [fromNullable](#fromnullable)
  - [fromOption](#fromoption)
  - [fromReader](#fromreader)
  - [fromResult](#fromresult)
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
  - [getOrElseReader](#getorelsereader)
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
  - [FromIdentity](#fromidentity)
  - [FromReader](#fromreader)
  - [FromResult](#fromresult)
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
  - [liftNullable](#liftnullable)
  - [liftOption](#liftoption)
  - [liftPredicate](#liftpredicate)
  - [liftReader](#liftreader)
  - [liftResult](#liftresult)
- [mapping](#mapping)
  - [as](#as)
  - [flap](#flap)
  - [map](#map)
  - [mapBoth](#mapboth)
  - [unit](#unit)
- [model](#model)
  - [ReaderResult (interface)](#readerresult-interface)
- [pattern matching](#pattern-matching)
  - [match](#match)
  - [matchReader](#matchreader)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
  - [flatMapNullable](#flatmapnullable)
  - [flatMapOption](#flatmapoption)
  - [flatMapReader](#flatmapreader)
  - [flatMapResult](#flatmapresult)
  - [zipLeft](#zipleft)
  - [zipRight](#zipright)
- [traversing](#traversing)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [traverseNonEmptyReadonlyArray](#traversenonemptyreadonlyarray)
  - [traverseNonEmptyReadonlyArrayWithIndex](#traversenonemptyreadonlyarraywithindex)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
- [tuple sequencing](#tuple-sequencing)
  - [Zip](#zip)
  - [tupled](#tupled)
  - [zipFlatten](#zipflatten)
  - [zipWith](#zipwith)
- [type lambdas](#type-lambdas)
  - [ReaderResultTypeLambda (interface)](#readerresulttypelambda-interface)
- [utils](#utils)
  - [ap](#ap)
  - [bracket](#bracket)
  - [composeKleisli](#composekleisli)
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
export declare const ask: <R>() => ReaderResult<R, never, R>
```

Added in v3.0.0

## asks

Projects a value from the global context in a `ReaderResult`.

**Signature**

```ts
export declare const asks: <R, A>(f: (r: R) => A) => ReaderResult<R, never, A>
```

Added in v3.0.0

## asksReaderResult

**Signature**

```ts
export declare const asksReaderResult: <R1, R2, E, A>(
  f: (r1: R1) => ReaderResult<R2, E, A>
) => ReaderResult<R1 & R2, E, A>
```

Added in v3.0.0

## fail

**Signature**

```ts
export declare const fail: <E>(e: E) => ReaderResult<unknown, E, never>
```

Added in v3.0.0

## succeed

**Signature**

```ts
export declare const succeed: <A>(a: A) => ReaderResult<unknown, never, A>
```

Added in v3.0.0

# conversions

## failReader

**Signature**

```ts
export declare const failReader: <R, E>(me: any) => ReaderResult<R, E, never>
```

Added in v3.0.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <E>(onNullable: E) => <A>(a: A) => ReaderResult<unknown, E, NonNullable<A>>
```

Added in v3.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: E) => <A>(fa: any) => ReaderResult<unknown, E, A>
```

Added in v3.0.0

## fromReader

**Signature**

```ts
export declare const fromReader: <R, A>(ma: any) => ReaderResult<R, never, A>
```

Added in v3.0.0

## fromResult

**Signature**

```ts
export declare const fromResult: <E, A>(fa: any) => ReaderResult<unknown, E, A>
```

Added in v3.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: ReaderResult<unknown, never, {}>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderResult<R2, E2, B>
) => <R1, E1>(
  self: ReaderResult<R1, E1, A>
) => ReaderResult<R1 & R2, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindRight

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <N extends string, A extends object, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderResult<R2, E2, B>
) => <R1, E1>(
  self: ReaderResult<R1, E1, A>
) => ReaderResult<R1 & R2, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <R, E, A>(self: ReaderResult<R, E, A>) => ReaderResult<R, E, { readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R, E>(
  self: ReaderResult<R, E, A>
) => ReaderResult<R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

# error handling

## catchAll

Recovers from all errors.

**Signature**

```ts
export declare const catchAll: <E1, R1, E2, B>(
  onError: (e: E1) => ReaderResult<R1, E2, B>
) => <R2, A>(ma: ReaderResult<R2, E1, A>) => ReaderResult<R1 & R2, E2, B | A>
```

Added in v3.0.0

## firstSuccessOf

Returns an effect that runs each of the specified effects in order until one of them succeeds.

**Signature**

```ts
export declare const firstSuccessOf: <R, E, A>(
  startWith: ReaderResult<R, E, A>
) => (collection: Iterable<ReaderResult<R, E, A>>) => ReaderResult<R, E, A>
```

Added in v3.0.0

## flatMapError

Creates a composite effect that represents this effect followed by another
one that may depend on the error produced by this one.

**Signature**

```ts
export declare const flatMapError: <E1, R, E2>(
  f: (e: E1) => any
) => <A>(self: ReaderResult<R, E1, A>) => ReaderResult<R, E2, A>
```

Added in v3.0.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <B>(onError: B) => <R, A>(self: ReaderResult<R, unknown, A>) => any
```

Added in v3.0.0

## getOrElseReader

**Signature**

```ts
export declare const getOrElseReader: <R2, B>(onError: any) => <R1, A>(self: ReaderResult<R1, unknown, A>) => any
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
export declare const getValidatedApplicative: <E>(Semigroup: any) => any
```

Added in v3.0.0

## mapError

Returns an effect with its error channel mapped using the specified
function. This can be used to lift a "smaller" error into a "larger" error.

**Signature**

```ts
export declare const mapError: <E, G>(f: (e: E) => G) => <R, A>(self: ReaderResult<R, E, A>) => ReaderResult<R, G, A>
```

Added in v3.0.0

## tapError

Returns an effect that effectfully "peeks" at the failure of this effect.

**Signature**

```ts
export declare const tapError: <E1, R2, E2>(
  onError: (e: E1) => ReaderResult<R2, E2, unknown>
) => <R1, A>(self: ReaderResult<R1, E1, A>) => ReaderResult<R1 & R2, E1 | E2, A>
```

Added in v3.0.0

# filtering

## compact

**Signature**

```ts
export declare const compact: <E>(onNone: E) => <R, A>(self: ReaderResult<R, E, any>) => ReaderResult<R, E, A>
```

Added in v3.0.0

## filter

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: any, onFalse: E2): <R, E1>(
    ma: ReaderResult<R, E1, C>
  ) => ReaderResult<R, E2 | E1, B>
  <B extends A, E2, A = B>(predicate: any, onFalse: E2): <R, E1>(
    mb: ReaderResult<R, E1, B>
  ) => ReaderResult<R, E2 | E1, B>
}
```

Added in v3.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B, E>(
  f: (a: A) => any,
  onNone: E
) => <R>(self: ReaderResult<R, E, A>) => ReaderResult<R, E, B>
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: {
  <C extends A, B extends A, E, A = C>(refinement: any, onFalse: E): <R>(
    self: ReaderResult<R, E, C>
  ) => readonly [ReaderResult<R, E, C>, ReaderResult<R, E, B>]
  <B extends A, E, A = B>(predicate: any, onFalse: E): <R>(
    self: ReaderResult<R, E, B>
  ) => readonly [ReaderResult<R, E, B>, ReaderResult<R, E, B>]
}
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C, E>(
  f: (a: A) => any,
  onEmpty: E
) => <R>(self: ReaderResult<R, E, A>) => readonly [ReaderResult<R, E, B>, ReaderResult<R, E, C>]
```

Added in v3.0.0

## separate

**Signature**

```ts
export declare const separate: <E>(
  onEmpty: E
) => <R, A, B>(self: ReaderResult<R, E, any>) => readonly [ReaderResult<R, E, A>, ReaderResult<R, E, B>]
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
export declare const toUnion: <R, E, A>(fa: ReaderResult<R, E, A>) => any
```

Added in v3.0.0

# lifting

## lift2

Lifts a binary function into `ReaderResult`.

**Signature**

```ts
export declare const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => <R1, E1, R2, E2>(fa: ReaderResult<R1, E1, A>, fb: ReaderResult<R2, E2, B>) => ReaderResult<R1 & R2, E1 | E2, C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into `ReaderResult`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <R1, E1, R2, E2, R3, E3>(
  fa: ReaderResult<R1, E1, A>,
  fb: ReaderResult<R2, E2, B>,
  fc: ReaderResult<R3, E3, C>
) => ReaderResult<R1 & R2 & R3, E1 | E2 | E3, D>
```

Added in v3.0.0

## liftNullable

**Signature**

```ts
export declare const liftNullable: <A extends readonly unknown[], B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: E
) => (...a: A) => ReaderResult<unknown, E, NonNullable<B>>
```

Added in v3.0.0

## liftOption

**Signature**

```ts
export declare const liftOption: <A extends readonly unknown[], B, E>(
  f: (...a: A) => any,
  onNone: E
) => (...a: A) => ReaderResult<unknown, E, B>
```

Added in v3.0.0

## liftPredicate

**Signature**

```ts
export declare const liftPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: any, onFalse: E): (c: C) => ReaderResult<unknown, E, B>
  <B extends A, E, A = B>(predicate: any, onFalse: E): (b: B) => ReaderResult<unknown, E, B>
}
```

Added in v3.0.0

## liftReader

**Signature**

```ts
export declare const liftReader: <A extends readonly unknown[], R, B>(
  f: (...a: A) => any
) => (...a: A) => ReaderResult<R, never, B>
```

Added in v3.0.0

## liftResult

**Signature**

```ts
export declare const liftResult: <A extends readonly unknown[], E, B>(
  f: (...a: A) => any
) => (...a: A) => ReaderResult<unknown, E, B>
```

Added in v3.0.0

# mapping

## as

Maps the success value of this effect to the specified constant value.

**Signature**

```ts
export declare const as: <B>(b: B) => <R, E>(self: ReaderResult<R, E, unknown>) => ReaderResult<R, E, B>
```

Added in v3.0.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <R, E, B>(fab: ReaderResult<R, E, (a: A) => B>) => ReaderResult<R, E, B>
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R, E>(fa: ReaderResult<R, E, A>) => ReaderResult<R, E, B>
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
) => <R>(self: ReaderResult<R, E, A>) => ReaderResult<R, G, B>
```

Added in v3.0.0

## unit

Returns the effect resulting from mapping the success of this effect to unit.

**Signature**

```ts
export declare const unit: <R, E>(self: ReaderResult<R, E, unknown>) => ReaderResult<R, E, void>
```

Added in v3.0.0

# model

## ReaderResult (interface)

**Signature**

```ts
export interface ReaderResult<R, E, A> extends Reader<R, Result<E, A>> {}
```

Added in v3.0.0

# pattern matching

## match

**Signature**

```ts
export declare const match: <E, B, A, C = B>(onError: (e: E) => B, onSuccess: (a: A) => C) => <R>(ma: any) => any
```

Added in v3.0.0

## matchReader

**Signature**

```ts
export declare const matchReader: <E, R2, B, A, R3, C = B>(
  onError: (e: E) => any,
  onSuccess: (a: A) => any
) => <R1>(ma: any) => any
```

Added in v3.0.0

# sequencing

## flatMap

**Signature**

```ts
export declare const flatMap: <A, R2, E2, B>(
  f: (a: A) => ReaderResult<R2, E2, B>
) => <R1, E1>(self: ReaderResult<R1, E1, A>) => ReaderResult<R1 & R2, E2 | E1, B>
```

Added in v3.0.0

## flatMapNullable

**Signature**

```ts
export declare const flatMapNullable: <A, B, E2>(
  f: (a: A) => B | null | undefined,
  onNullable: E2
) => <R, E1>(self: ReaderResult<R, E1, A>) => ReaderResult<R, E2 | E1, NonNullable<B>>
```

Added in v3.0.0

## flatMapOption

**Signature**

```ts
export declare const flatMapOption: <A, B, E2>(
  f: (a: A) => any,
  onNone: E2
) => <R, E1>(self: ReaderResult<R, E1, A>) => ReaderResult<R, E2 | E1, B>
```

Added in v3.0.0

## flatMapReader

**Signature**

```ts
export declare const flatMapReader: <A, R2, B>(
  f: (a: A) => any
) => <R1, E>(ma: ReaderResult<R1, E, A>) => ReaderResult<R1 & R2, E, B>
```

Added in v3.0.0

## flatMapResult

**Signature**

```ts
export declare const flatMapResult: <A, E2, B>(
  f: (a: A) => any
) => <R, E1>(ma: ReaderResult<R, E1, A>) => ReaderResult<R, E2 | E1, B>
```

Added in v3.0.0

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: <R2, E2>(
  that: ReaderResult<R2, E2, unknown>
) => <R1, E1, A>(self: ReaderResult<R1, E1, A>) => ReaderResult<R1 & R2, E2 | E1, A>
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <R2, E2, A>(
  that: ReaderResult<R2, E2, A>
) => <R1, E1>(self: ReaderResult<R1, E1, unknown>) => ReaderResult<R1 & R2, E2 | E1, A>
```

Added in v3.0.0

# traversing

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <R, E, A>(
  arr: readonly ReaderResult<R, E, A>[]
) => ReaderResult<R, E, readonly A[]>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArray

Equivalent to `NonEmptyReadonlyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArray: <A, R, E, B>(
  f: (a: A) => ReaderResult<R, E, B>
) => (as: any) => ReaderResult<R, E, any>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArrayWithIndex

Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArrayWithIndex: <A, R, E, B>(
  f: (index: number, a: A) => ReaderResult<R, E, B>
) => (as: any) => ReaderResult<R, E, any>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, R, E, B>(
  f: (a: A) => ReaderResult<R, E, B>
) => (as: readonly A[]) => ReaderResult<R, E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, R, E, B>(
  f: (index: number, a: A) => ReaderResult<R, E, B>
) => (as: readonly A[]) => ReaderResult<R, E, readonly B[]>
```

Added in v3.0.0

# tuple sequencing

## Zip

**Signature**

```ts
export declare const Zip: ReaderResult<unknown, never, readonly []>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <R, E, A>(self: ReaderResult<R, E, A>) => ReaderResult<R, E, readonly [A]>
```

Added in v3.0.0

## zipFlatten

Sequentially zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <R2, E2, B>(
  fb: ReaderResult<R2, E2, B>
) => <R1, E1, A extends readonly unknown[]>(
  self: ReaderResult<R1, E1, A>
) => ReaderResult<R1 & R2, E2 | E1, readonly [...A, B]>
```

Added in v3.0.0

## zipWith

Sequentially zips this effect with the specified effect using the specified combiner function.

**Signature**

```ts
export declare const zipWith: <R2, E2, B, A, C>(
  that: ReaderResult<R2, E2, B>,
  f: (a: A, b: B) => C
) => <R1, E1>(self: ReaderResult<R1, E1, A>) => ReaderResult<R1 & R2, E2 | E1, C>
```

Added in v3.0.0

# type lambdas

## ReaderResultTypeLambda (interface)

**Signature**

```ts
export interface ReaderResultTypeLambda extends TypeLambda {
  readonly type: ReaderResult<this['In1'], this['Out2'], this['Out1']>
}
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <R2, E2, A>(
  fa: ReaderResult<R2, E2, A>
) => <R1, E1, B>(self: ReaderResult<R1, E1, (a: A) => B>) => ReaderResult<R1 & R2, E2 | E1, B>
```

Added in v3.0.0

## bracket

Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
whether the body action throws (\*) or returns.

(\*) i.e. returns a `Failure`

**Signature**

```ts
export declare const bracket: <R, E, A, B>(
  aquire: ReaderResult<R, E, A>,
  use: (a: A) => ReaderResult<R, E, B>,
  release: (a: A, e: any) => ReaderResult<R, E, void>
) => ReaderResult<R, E, B>
```

Added in v3.0.0

## composeKleisli

**Signature**

```ts
export declare const composeKleisli: <B, R2, E2, C>(
  bfc: (b: B) => ReaderResult<R2, E2, C>
) => <A, R1, E1>(afb: (a: A) => ReaderResult<R1, E1, B>) => (a: A) => ReaderResult<R1 & R2, E2 | E1, C>
```

Added in v3.0.0

## flatten

**Signature**

```ts
export declare const flatten: <R1, E1, R2, E2, A>(
  mma: ReaderResult<R1, E1, ReaderResult<R2, E2, A>>
) => ReaderResult<R1 & R2, E1 | E2, A>
```

Added in v3.0.0

## idKleisli

**Signature**

```ts
export declare const idKleisli: <A>() => (a: A) => ReaderResult<unknown, never, A>
```

Added in v3.0.0

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <R2, R1>(f: (r2: R2) => R1) => <E, A>(ma: ReaderResult<R1, E, A>) => ReaderResult<R2, E, A>
```

Added in v3.0.0

## orElse

**Signature**

```ts
export declare const orElse: <R2, E2, B>(
  that: ReaderResult<R2, E2, B>
) => <R1, E1, A>(self: ReaderResult<R1, E1, A>) => ReaderResult<R1 & R2, E2, B | A>
```

Added in v3.0.0

## reverse

**Signature**

```ts
export declare const reverse: <R, E, A>(ma: ReaderResult<R, E, A>) => ReaderResult<R, A, E>
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A, R2, E2>(
  f: (a: A) => ReaderResult<R2, E2, unknown>
) => <R1, E1>(self: ReaderResult<R1, E1, A>) => ReaderResult<R1 & R2, E2 | E1, A>
```

Added in v3.0.0
