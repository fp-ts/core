---
title: These.ts
nav_order: 17
parent: Modules
---

## These overview

A data structure providing "inclusive-or" as opposed to `Either`'s "exclusive-or".

If you interpret `Either<E, A>` as suggesting the computation may either fail or succeed (exclusively), then
`These<E, A>` may fail, succeed, or do both at the same time.

There are a few ways to interpret the `Both` case:

1. You can think of a computation that has a non-fatal error.
2. You can think of a computation that went as far as it could before erroring.
3. You can think of a computation that keeps track of errors as it completes.

Another way you can think of `These<E, A>` is saying that we want to handle `E` kind of data, `A` kind of data, or
both `E` and `A` kind of data at the same time. This is particularly useful when it comes to displaying UI's.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [algebraic operations](#algebraic-operations)
  - [divide](#divide)
  - [multiply](#multiply)
  - [subtract](#subtract)
  - [sum](#sum)
- [combining](#combining)
  - [getFirstLeftMonoid](#getfirstleftmonoid)
  - [getFirstLeftSemigroup](#getfirstleftsemigroup)
  - [getFirstRightOrBothSemigroup](#getfirstrightorbothsemigroup)
- [constructors](#constructors)
  - [both](#both)
  - [fail](#fail)
  - [left](#left)
  - [leftOrBoth](#leftorboth)
  - [of](#of)
  - [right](#right)
  - [rightOrBoth](#rightorboth)
  - [succeed](#succeed)
  - [warn](#warn)
- [conversions](#conversions)
  - [absolve](#absolve)
  - [condemn](#condemn)
  - [fromEither](#fromeither)
  - [fromIterable](#fromiterable)
  - [fromNullable](#fromnullable)
  - [fromOption](#fromoption)
  - [fromThese](#fromthese)
  - [fromTuple](#fromtuple)
  - [toEither](#toeither)
- [debugging](#debugging)
  - [inspectBoth](#inspectboth)
  - [inspectLeft](#inspectleft)
  - [inspectRight](#inspectright)
  - [inspectRightOrBoth](#inspectrightorboth)
- [do notation](#do-notation)
  - [Do](#do)
  - [andThenBind](#andthenbind)
  - [andThenBindEither](#andthenbindeither)
  - [andThenBindThese](#andthenbindthese)
  - [bind](#bind)
  - [bindEither](#bindeither)
  - [bindThese](#bindthese)
  - [bindTo](#bindto)
  - [let](#let)
- [error handling](#error-handling)
  - [catchAll](#catchall)
  - [firstRightOrBothOf](#firstrightorbothof)
  - [mapLeft](#mapleft)
  - [orElse](#orelse)
  - [orElseEither](#orelseeither)
  - [orElseFail](#orelsefail)
- [filtering](#filtering)
  - [compact](#compact)
  - [filter](#filter)
  - [filterMap](#filtermap)
- [getters](#getters)
  - [getBoth](#getboth)
  - [getBothOrElse](#getbothorelse)
  - [getLeft](#getleft)
  - [getLeftOnly](#getleftonly)
  - [getOrElse](#getorelse)
  - [getOrNull](#getornull)
  - [getOrUndefined](#getorundefined)
  - [getRight](#getright)
  - [getRightOnly](#getrightonly)
- [guards](#guards)
  - [isBoth](#isboth)
  - [isLeft](#isleft)
  - [isLeftOrBoth](#isleftorboth)
  - [isRight](#isright)
  - [isRightOrBoth](#isrightorboth)
  - [isThese](#isthese)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Bicovariant](#bicovariant)
  - [Chainable](#chainable)
  - [Covariant](#covariant)
  - [FlatMap](#flatmap)
  - [Foldable](#foldable)
  - [Invariant](#invariant)
  - [Monad](#monad)
  - [Of](#of)
  - [Pointed](#pointed)
  - [Product](#product)
  - [SemiAlternative](#semialternative)
  - [SemiApplicative](#semiapplicative)
  - [SemiCoproduct](#semicoproduct)
  - [SemiProduct](#semiproduct)
  - [Traversable](#traversable)
- [interop](#interop)
  - [fromThrowable](#fromthrowable)
  - [getOrThrow](#getorthrow)
  - [getRightOnlyOrThrow](#getrightonlyorthrow)
  - [liftThrowable](#liftthrowable)
- [lifting](#lifting)
  - [lift2](#lift2)
  - [liftEither](#lifteither)
  - [liftNullable](#liftnullable)
  - [liftOption](#liftoption)
  - [liftPredicate](#liftpredicate)
  - [liftThese](#liftthese)
- [mapping](#mapping)
  - [as](#as)
  - [asUnit](#asunit)
  - [bimap](#bimap)
  - [flap](#flap)
  - [map](#map)
  - [tupled](#tupled)
- [model](#model)
  - [Both (interface)](#both-interface)
  - [These (type alias)](#these-type-alias)
  - [Validated (type alias)](#validated-type-alias)
- [pattern matching](#pattern-matching)
  - [match](#match)
- [predicates](#predicates)
  - [exists](#exists)
- [sequencing](#sequencing)
  - [andThenDiscard](#andthendiscard)
  - [flatMap](#flatmap)
  - [flatMapEither](#flatmapeither)
  - [flatMapNullable](#flatmapnullable)
  - [flatMapOption](#flatmapoption)
  - [flatMapThese](#flatmapthese)
- [traversing](#traversing)
  - [sequence](#sequence)
  - [traverse](#traverse)
  - [traverseTap](#traversetap)
- [type lambdas](#type-lambdas)
  - [TheseTypeLambda (interface)](#thesetypelambda-interface)
  - [ValidatedTypeLambda (interface)](#validatedtypelambda-interface)
- [utils](#utils)
  - [andThen](#andthen)
  - [ap](#ap)
  - [composeKleisliArrow](#composekleisliarrow)
  - [contains](#contains)
  - [element](#element)
  - [flatten](#flatten)
  - [reverse](#reverse)
  - [struct](#struct)
  - [tap](#tap)
  - [tuple](#tuple)
  - [unit](#unit)

---

# algebraic operations

## divide

**Signature**

```ts
export declare const divide: <E2>(that: any) => <E1>(self: any) => any
```

Added in v1.0.0

## multiply

**Signature**

```ts
export declare const multiply: <E2>(that: any) => <E1>(self: any) => any
```

Added in v1.0.0

## subtract

**Signature**

```ts
export declare const subtract: <E2>(that: any) => <E1>(self: any) => any
```

Added in v1.0.0

## sum

**Signature**

```ts
export declare const sum: <E2>(that: any) => <E1>(self: any) => any
```

Added in v1.0.0

# combining

## getFirstLeftMonoid

**Signature**

```ts
export declare const getFirstLeftMonoid: <A, E>(M: any) => any
```

Added in v1.0.0

## getFirstLeftSemigroup

**Signature**

```ts
export declare const getFirstLeftSemigroup: <A, E>(S: any) => any
```

Added in v1.0.0

## getFirstRightOrBothSemigroup

**Signature**

```ts
export declare const getFirstRightOrBothSemigroup: <E, A>() => any
```

Added in v1.0.0

# constructors

## both

**Signature**

```ts
export declare const both: <E, A>(left: E, right: A) => any
```

Added in v1.0.0

## fail

**Signature**

```ts
export declare const fail: <E>(e: E) => any
```

Added in v1.0.0

## left

**Signature**

```ts
export declare const left: <E>(left: E) => any
```

Added in v1.0.0

## leftOrBoth

**Signature**

```ts
export declare const leftOrBoth: <E>(e: any) => <A>(self: any) => any
```

Added in v1.0.0

## of

Alias of `right`.

**Signature**

```ts
export declare const of: <A>(right: A) => any
```

Added in v1.0.0

## right

**Signature**

```ts
export declare const right: <A>(right: A) => any
```

Added in v1.0.0

## rightOrBoth

**Signature**

```ts
export declare const rightOrBoth: <A>(a: () => A) => <E>(self: any) => any
```

Added in v1.0.0

## succeed

Alias of `right`.

**Signature**

```ts
export declare const succeed: <A>(a: A) => any
```

Added in v1.0.0

## warn

**Signature**

```ts
export declare const warn: <E, A>(e: E, a: A) => any
```

Added in v1.0.0

# conversions

## absolve

**Signature**

```ts
export declare const absolve: <E, A>(self: any) => any
```

Added in v1.0.0

## condemn

**Signature**

```ts
export declare const condemn: <E, A>(self: any) => any
```

Added in v1.0.0

## fromEither

**Signature**

```ts
export declare const fromEither: <E, A>(self: any) => any
```

Added in v1.0.0

## fromIterable

**Signature**

```ts
export declare const fromIterable: <E>(onEmpty: any) => <A>(collection: Iterable<A>) => any
```

Added in v1.0.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <E>(onNullable: any) => <A>(a: A) => any
```

Added in v1.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: any) => <A>(self: any) => any
```

Added in v1.0.0

## fromThese

**Signature**

```ts
export declare const fromThese: <E, A>(self: any) => any
```

Added in v1.0.0

## fromTuple

**Signature**

```ts
export declare const fromTuple: <E, A>(self: readonly [E, A]) => any
```

Added in v1.0.0

## toEither

**Signature**

```ts
export declare const toEither: <E, A>(onBoth: (e: E, a: A) => any) => (self: any) => any
```

Added in v1.0.0

# debugging

## inspectBoth

**Signature**

```ts
export declare const inspectBoth: <E, A>(onBoth: (e: E, a: A) => void) => (self: any) => any
```

Added in v1.0.0

## inspectLeft

**Signature**

```ts
export declare const inspectLeft: <E>(onLeft: (e: E) => void) => <A>(self: any) => any
```

Added in v1.0.0

## inspectRight

**Signature**

```ts
export declare const inspectRight: <A>(onRight: (a: A) => void) => <E>(self: any) => any
```

Added in v1.0.0

## inspectRightOrBoth

**Signature**

```ts
export declare const inspectRightOrBoth: <A>(onRightOrBoth: (a: A) => void) => <E>(self: any) => any
```

Added in v1.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: any
```

Added in v1.0.0

## andThenBind

**Signature**

```ts
export declare const andThenBind: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  that: any
) => <E1>(self: any) => any
```

Added in v1.0.0

## andThenBindEither

**Signature**

```ts
export declare const andThenBindEither: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  that: any
) => <E1>(self: any) => any
```

Added in v1.0.0

## andThenBindThese

**Signature**

```ts
export declare const andThenBindThese: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  that: any
) => <E1>(self: any) => any
```

Added in v1.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => any
) => <E1>(self: any) => any
```

Added in v1.0.0

## bindEither

**Signature**

```ts
export declare const bindEither: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => any
) => <E1>(self: any) => any
```

Added in v1.0.0

## bindThese

**Signature**

```ts
export declare const bindThese: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => any
) => <E1>(self: any) => any
```

Added in v1.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(name: N) => <E, A>(self: any) => any
```

Added in v1.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <E>(self: any) => any
```

Added in v1.0.0

# error handling

## catchAll

Recovers from all errors.

**Signature**

```ts
export declare const catchAll: <E1, E2, B>(onLeft: (e: E1) => any) => <A>(self: any) => any
```

Added in v1.0.0

## firstRightOrBothOf

**Signature**

```ts
export declare const firstRightOrBothOf: <E, A>(collection: Iterable<any>) => (self: any) => any
```

Added in v1.0.0

## mapLeft

Returns an effect with its error channel mapped using the specified
function. This can be used to lift a "smaller" error into a "larger" error.

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(self: any) => any
```

Added in v1.0.0

## orElse

Executes this effect and returns its value, if it succeeds, but otherwise
executes the specified effect.

**Signature**

```ts
export declare const orElse: <E2, B>(that: any) => <E1, A>(self: any) => any
```

Added in v1.0.0

## orElseEither

Returns an effect that will produce the value of this effect, unless it
fails, in which case, it will produce the value of the specified effect.

**Signature**

```ts
export declare const orElseEither: <E2, B>(that: any) => <E1, A>(self: any) => any
```

Added in v1.0.0

## orElseFail

Executes this effect and returns its value, if it succeeds, but otherwise
fails with the specified error.

**Signature**

```ts
export declare const orElseFail: <E2>(onLeft: any) => <E1, A>(self: any) => any
```

Added in v1.0.0

# filtering

## compact

**Signature**

```ts
export declare const compact: <E>(onNone: any) => <A>(self: any) => any
```

Added in v1.0.0

## filter

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: any, onFalse: any): <E1>(self: any) => any
  <B extends A, E2, A = B>(predicate: any, onFalse: any): <E1>(self: any) => any
}
```

Added in v1.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B, E2>(f: (a: A) => any, onNone: any) => <E1>(self: any) => any
```

Added in v1.0.0

# getters

## getBoth

**Signature**

```ts
export declare const getBoth: <E, A>(self: any) => any
```

Added in v1.0.0

## getBothOrElse

**Signature**

```ts
export declare const getBothOrElse: <E, A>(e: any, a: any) => (self: any) => readonly [E, A]
```

Added in v1.0.0

## getLeft

**Signature**

```ts
export declare const getLeft: <E, A>(self: any) => any
```

Added in v1.0.0

## getLeftOnly

Returns the `E` value if and only if the value is constructed with `Left`

**Signature**

```ts
export declare const getLeftOnly: <E, A>(self: any) => any
```

Added in v1.0.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <B>(onLeft: any) => <E, A>(self: any) => B | A
```

Added in v1.0.0

## getOrNull

**Signature**

```ts
export declare const getOrNull: <E, A>(self: any) => A | null
```

Added in v1.0.0

## getOrUndefined

**Signature**

```ts
export declare const getOrUndefined: <E, A>(self: any) => A | undefined
```

Added in v1.0.0

## getRight

**Signature**

```ts
export declare const getRight: <E, A>(self: any) => any
```

Added in v1.0.0

## getRightOnly

Returns the `A` value if and only if the value is constructed with `Right`

**Signature**

```ts
export declare const getRightOnly: <E, A>(self: any) => any
```

Added in v1.0.0

# guards

## isBoth

Returns `true` if the these is an instance of `Both`, `false` otherwise

**Signature**

```ts
export declare const isBoth: <E, A>(self: any) => self is Both<E, A>
```

Added in v1.0.0

## isLeft

Returns `true` if the these is an instance of `Left`, `false` otherwise

**Signature**

```ts
export declare const isLeft: <E, A>(self: any) => self is any
```

Added in v1.0.0

## isLeftOrBoth

**Signature**

```ts
export declare const isLeftOrBoth: <E, A>(self: any) => self is any
```

Added in v1.0.0

## isRight

Returns `true` if the these is an instance of `Right`, `false` otherwise

**Signature**

```ts
export declare const isRight: <E, A>(self: any) => self is any
```

Added in v1.0.0

## isRightOrBoth

**Signature**

```ts
export declare const isRightOrBoth: <E, A>(self: any) => self is any
```

Added in v1.0.0

## isThese

Returns `true` if the specified value is an instance of `These`, `false`
otherwise.

**Signature**

```ts
export declare const isThese: (u: unknown) => u is any
```

Added in v1.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: any
```

Added in v1.0.0

## Bicovariant

**Signature**

```ts
export declare const Bicovariant: any
```

Added in v1.0.0

## Chainable

**Signature**

```ts
export declare const Chainable: any
```

Added in v1.0.0

## Covariant

**Signature**

```ts
export declare const Covariant: any
```

Added in v1.0.0

## FlatMap

**Signature**

```ts
export declare const FlatMap: any
```

Added in v1.0.0

## Foldable

**Signature**

```ts
export declare const Foldable: any
```

Added in v1.0.0

## Invariant

**Signature**

```ts
export declare const Invariant: any
```

Added in v1.0.0

## Monad

**Signature**

```ts
export declare const Monad: any
```

Added in v1.0.0

## Of

**Signature**

```ts
export declare const Of: any
```

Added in v1.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: any
```

Added in v1.0.0

## Product

**Signature**

```ts
export declare const Product: any
```

Added in v1.0.0

## SemiAlternative

**Signature**

```ts
export declare const SemiAlternative: any
```

Added in v1.0.0

## SemiApplicative

**Signature**

```ts
export declare const SemiApplicative: any
```

Added in v1.0.0

## SemiCoproduct

**Signature**

```ts
export declare const SemiCoproduct: any
```

Added in v1.0.0

## SemiProduct

**Signature**

```ts
export declare const SemiProduct: any
```

Added in v1.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: any
```

Added in v1.0.0

# interop

## fromThrowable

Constructs a new `These` from a function that might throw.

**Signature**

```ts
export declare const fromThrowable: <A, E>(f: () => A, onThrow: (error: unknown) => E) => any
```

Added in v1.0.0

## getOrThrow

**Signature**

```ts
export declare const getOrThrow: <E>(onLeft?: (e: E) => Error) => <A>(self: any) => A
```

Added in v1.0.0

## getRightOnlyOrThrow

**Signature**

```ts
export declare const getRightOnlyOrThrow: <E>(onLeft: (e: E) => unknown) => <A>(self: any) => A
```

Added in v1.0.0

## liftThrowable

Lifts a function that may throw to one returning a `These`.

**Signature**

```ts
export declare const liftThrowable: <A extends readonly unknown[], B, E>(
  f: (...a: A) => B,
  onThrow: (error: unknown) => E
) => (...a: A) => any
```

Added in v1.0.0

# lifting

## lift2

**Signature**

```ts
export declare const lift2: <A, B, C>(f: (a: A) => (b: B) => C) => <E2>(that: any) => <E1>(self: any) => any
```

Added in v1.0.0

## liftEither

**Signature**

```ts
export declare const liftEither: <A extends readonly unknown[], E, B>(f: (...a: A) => any) => (...a: A) => any
```

Added in v1.0.0

## liftNullable

**Signature**

```ts
export declare const liftNullable: <A extends readonly unknown[], B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: (...a: A) => E
) => (...a: A) => any
```

Added in v1.0.0

## liftOption

**Signature**

```ts
export declare const liftOption: <A extends readonly unknown[], B, E>(
  f: (...a: A) => any,
  onNone: (...a: A) => E
) => (...a: A) => any
```

Added in v1.0.0

## liftPredicate

**Signature**

```ts
export declare const liftPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: any, onFalse: any): (c: C) => any
  <B extends A, E, A = B>(predicate: any, onFalse: any): (b: B) => any
}
```

Added in v1.0.0

## liftThese

**Signature**

```ts
export declare const liftThese: <A extends readonly unknown[], E, B>(f: (...a: A) => any) => (...a: A) => any
```

Added in v1.0.0

# mapping

## as

Maps the right value of this effect to the specified constant value.

**Signature**

```ts
export declare const as: <B>(b: B) => <E, _>(self: any) => any
```

Added in v1.0.0

## asUnit

Returns the effect resulting from mapping the right of this effect to unit.

**Signature**

```ts
export declare const asUnit: <E, _>(self: any) => any
```

Added in v1.0.0

## bimap

Returns an effect whose left and right channels have been mapped by
the specified pair of functions, `f` and `g`.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (self: any) => any
```

Added in v1.0.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(self: any) => any
```

Added in v1.0.0

## map

Returns an effect whose right is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(self: any) => any
```

Added in v1.0.0

## tupled

**Signature**

```ts
export declare const tupled: <E, A>(self: any) => any
```

Added in v1.0.0

# model

## Both (interface)

**Signature**

```ts
export interface Both<E, A> {
  readonly _tag: 'Both'
  readonly left: E
  readonly right: A
}
```

Added in v1.0.0

## These (type alias)

**Signature**

```ts
export type These<E, A> = Either<E, A> | Both<E, A>
```

Added in v1.0.0

## Validated (type alias)

**Signature**

```ts
export type Validated<E, A> = These<NonEmptyReadonlyArray<E>, A>
```

Added in v1.0.0

# pattern matching

## match

**Signature**

```ts
export declare const match: <E, B, A, C = B, D = B>(
  onLeft: (e: E) => B,
  onRight: (a: A) => C,
  onBoth: (e: E, a: A) => D
) => (self: any) => B | C | D
```

Added in v1.0.0

# predicates

## exists

**Signature**

```ts
export declare const exists: <A>(predicate: any) => <E>(self: any) => boolean
```

Added in v1.0.0

# sequencing

## andThenDiscard

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const andThenDiscard: <E2, _>(that: any) => <E1, A>(self: any) => any
```

Added in v1.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <A, E2, B>(f: (a: A) => any) => <E1>(self: any) => any
```

Added in v1.0.0

## flatMapEither

**Signature**

```ts
export declare const flatMapEither: <A, E2, B>(f: (a: A) => any) => <E1>(self: any) => any
```

Added in v1.0.0

## flatMapNullable

**Signature**

```ts
export declare const flatMapNullable: <A, B, E2>(
  f: (a: A) => B | null | undefined,
  onNullable: (a: A) => E2
) => <E1>(self: any) => any
```

Added in v1.0.0

## flatMapOption

**Signature**

```ts
export declare const flatMapOption: <A, B, E2>(f: (a: A) => any, onNone: (a: A) => E2) => <E1>(self: any) => any
```

Added in v1.0.0

## flatMapThese

**Signature**

```ts
export declare const flatMapThese: <A, E2, B>(f: (a: A) => any) => <E1>(self: any) => any
```

Added in v1.0.0

# traversing

## sequence

**Signature**

```ts
export declare const sequence: <F extends any>(F: any) => <E, FR, FO, FE, A>(self: any) => any
```

Added in v1.0.0

## traverse

**Signature**

```ts
export declare const traverse: <F extends any>(F: any) => <A, R, O, FE, B>(f: (a: A) => any) => <E>(self: any) => any
```

Added in v1.0.0

## traverseTap

**Signature**

```ts
export declare const traverseTap: <F extends any>(F: any) => <A, R, O, E, B>(f: (a: A) => any) => <TE>(self: any) => any
```

Added in v1.0.0

# type lambdas

## TheseTypeLambda (interface)

**Signature**

```ts
export interface TheseTypeLambda extends TypeLambda {
  readonly type: These<this['Out1'], this['Target']>
}
```

Added in v1.0.0

## ValidatedTypeLambda (interface)

**Signature**

```ts
export interface ValidatedTypeLambda extends TypeLambda {
  readonly type: Validated<this['Out1'], this['Target']>
}
```

Added in v3.0.0

# utils

## andThen

**Signature**

```ts
export declare const andThen: <E2, B>(that: any) => <E1, _>(self: any) => any
```

Added in v1.0.0

## ap

**Signature**

```ts
export declare const ap: <E2, A>(fa: any) => <E1, B>(self: any) => any
```

Added in v1.0.0

## composeKleisliArrow

**Signature**

```ts
export declare const composeKleisliArrow: <B, E2, C>(bfc: (b: B) => any) => <A, E1>(afb: (a: A) => any) => (a: A) => any
```

Added in v1.0.0

## contains

Returns a function that checks if a `These` contains a given value using a provided `equivalence` function.

**Signature**

```ts
export declare const contains: <A>(equivalence: any) => (a: A) => <E>(self: any) => boolean
```

Added in v1.0.0

## element

Adds an element to the end of a tuple.

**Signature**

```ts
export declare const element: <E2, B>(that: any) => <E1, A extends readonly any[]>(self: any) => any
```

Added in v1.0.0

## flatten

**Signature**

```ts
export declare const flatten: <E2, E1, A>(self: any) => any
```

Added in v1.0.0

## reverse

**Signature**

```ts
export declare const reverse: <E, A>(self: any) => any
```

Added in v1.0.0

## struct

**Signature**

```ts
export declare const struct: <R extends Record<string, any>>(r: R) => any
```

Added in v1.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A, E2, _>(f: (a: A) => any) => <E1>(self: any) => any
```

Added in v1.0.0

## tuple

**Signature**

```ts
export declare const tuple: <T extends readonly any[]>(...tuple: T) => any
```

Added in v1.0.0

## unit

**Signature**

```ts
export declare const unit: any
```

Added in v1.0.0
