---
title: These.ts
nav_order: 17
parent: Modules
---

## These overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [algebraic operations](#algebraic-operations)
  - [divide](#divide)
  - [multiply](#multiply)
  - [subtract](#subtract)
  - [sum](#sum)
- [combinators](#combinators)
  - [tap](#tap)
- [combining](#combining)
  - [getFirstLeftMonoid](#getfirstleftmonoid)
  - [getFirstLeftSemigroup](#getfirstleftsemigroup)
  - [getFirstRightOrBothSemigroup](#getfirstrightorbothsemigroup)
  - [zipWith](#zipwith)
- [constructors](#constructors)
  - [both](#both)
  - [fail](#fail)
  - [left](#left)
  - [leftOrBoth](#leftorboth)
  - [of](#of)
  - [right](#right)
  - [rightOrBoth](#rightorboth)
  - [warn](#warn)
- [conversions](#conversions)
  - [absolve](#absolve)
  - [condemn](#condemn)
  - [fromEither](#fromeither)
  - [fromIterable](#fromiterable)
  - [fromNullable](#fromnullable)
  - [fromOption](#fromoption)
  - [fromTuple](#fromtuple)
  - [toEither](#toeither)
  - [toValidated](#tovalidated)
- [debugging](#debugging)
  - [inspectBoth](#inspectboth)
  - [inspectLeft](#inspectleft)
  - [inspectRight](#inspectright)
  - [inspectRightOrBoth](#inspectrightorboth)
- [do notation](#do-notation)
  - [Do](#do)
  - [andThenBind](#andthenbind)
  - [bind](#bind)
  - [bindEither](#bindeither)
  - [bindThese](#bindthese)
  - [bindTo](#bindto)
  - [let](#let)
- [equivalence](#equivalence)
  - [getEquivalence](#getequivalence)
- [error handling](#error-handling)
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
  - [appendElement](#appendelement)
  - [composeKleisliArrow](#composekleisliarrow)
  - [contains](#contains)
  - [flatten](#flatten)
  - [reverse](#reverse)
  - [struct](#struct)
  - [tuple](#tuple)
  - [unit](#unit)

---

# algebraic operations

## divide

**Signature**

```ts
export declare const divide: {
  <E1, E2>(self: These<readonly [E1, ...E1[]], number>, that: These<readonly [E2, ...E2[]], number>): These<
    readonly [E1 | E2, ...(E1 | E2)[]],
    number
  >
  <E2>(that: These<readonly [E2, ...E2[]], number>): <E1>(
    self: These<readonly [E1, ...E1[]], number>
  ) => These<readonly [E2 | E1, ...(E2 | E1)[]], number>
}
```

Added in v1.0.0

## multiply

**Signature**

```ts
export declare const multiply: {
  <E1, E2>(self: These<readonly [E1, ...E1[]], number>, that: These<readonly [E2, ...E2[]], number>): These<
    readonly [E1 | E2, ...(E1 | E2)[]],
    number
  >
  <E2>(that: These<readonly [E2, ...E2[]], number>): <E1>(
    self: These<readonly [E1, ...E1[]], number>
  ) => These<readonly [E2 | E1, ...(E2 | E1)[]], number>
}
```

Added in v1.0.0

## subtract

**Signature**

```ts
export declare const subtract: {
  <E1, E2>(self: These<readonly [E1, ...E1[]], number>, that: These<readonly [E2, ...E2[]], number>): These<
    readonly [E1 | E2, ...(E1 | E2)[]],
    number
  >
  <E2>(that: These<readonly [E2, ...E2[]], number>): <E1>(
    self: These<readonly [E1, ...E1[]], number>
  ) => These<readonly [E2 | E1, ...(E2 | E1)[]], number>
}
```

Added in v1.0.0

## sum

**Signature**

```ts
export declare const sum: {
  <E1, E2>(self: These<readonly [E1, ...E1[]], number>, that: These<readonly [E2, ...E2[]], number>): These<
    readonly [E1 | E2, ...(E1 | E2)[]],
    number
  >
  <E2>(that: These<readonly [E2, ...E2[]], number>): <E1>(
    self: These<readonly [E1, ...E1[]], number>
  ) => These<readonly [E2 | E1, ...(E2 | E1)[]], number>
}
```

Added in v1.0.0

# combinators

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: {
  <E1, A, E2, _>(self: These<readonly [E1, ...E1[]], A>, f: (a: A) => These<readonly [E2, ...E2[]], _>): These<
    readonly [E1 | E2, ...(E1 | E2)[]],
    A
  >
  <A, E2, _>(f: (a: A) => These<readonly [E2, ...E2[]], _>): <E1>(
    self: These<readonly [E1, ...E1[]], A>
  ) => These<readonly [E2 | E1, ...(E2 | E1)[]], A>
}
```

Added in v1.0.0

# combining

## getFirstLeftMonoid

**Signature**

```ts
export declare const getFirstLeftMonoid: <A, E>(M: Monoid<A>) => Monoid<These<readonly [E, ...E[]], A>>
```

Added in v1.0.0

## getFirstLeftSemigroup

**Signature**

```ts
export declare const getFirstLeftSemigroup: <A, E>(S: Semigroup<A>) => Semigroup<These<readonly [E, ...E[]], A>>
```

Added in v1.0.0

## getFirstRightOrBothSemigroup

**Signature**

```ts
export declare const getFirstRightOrBothSemigroup: <E, A>() => Semigroup<These<E, A>>
```

Added in v1.0.0

## zipWith

**Signature**

```ts
export declare const zipWith: {
  <E1, A, E2, B, C>(
    self: These<readonly [E1, ...E1[]], A>,
    that: These<readonly [E2, ...E2[]], B>,
    f: (a: A, b: B) => C
  ): These<readonly [E1 | E2, ...(E1 | E2)[]], C>
  <E2, B, A, C>(that: These<readonly [E2, ...E2[]], B>, f: (a: A, b: B) => C): <E1>(
    self: These<readonly [E1, ...E1[]], A>
  ) => These<readonly [E2 | E1, ...(E2 | E1)[]], C>
}
```

Added in v1.0.0

# constructors

## both

**Signature**

```ts
export declare const both: <E, A>(left: E, right: A) => These<E, A>
```

Added in v1.0.0

## fail

**Signature**

```ts
export declare const fail: <E>(e: E) => These<readonly [E, ...E[]], never>
```

Added in v1.0.0

## left

**Signature**

```ts
export declare const left: <E>(left: E) => These<E, never>
```

Added in v1.0.0

## leftOrBoth

**Signature**

```ts
export declare const leftOrBoth: <E>(onSome: LazyArg<E>) => <A>(self: O.Option<A>) => These<E, A>
```

Added in v1.0.0

## of

Alias of `right`.

**Signature**

```ts
export declare const of: <A>(right: A) => These<never, A>
```

Added in v1.0.0

## right

**Signature**

```ts
export declare const right: <A>(right: A) => These<never, A>
```

Added in v1.0.0

## rightOrBoth

**Signature**

```ts
export declare const rightOrBoth: <A>(onNone: LazyArg<A>) => <E>(self: O.Option<E>) => These<E, A>
```

Added in v1.0.0

## warn

**Signature**

```ts
export declare const warn: <E, A>(e: E, a: A) => These<readonly [E, ...E[]], A>
```

Added in v1.0.0

# conversions

## absolve

**Signature**

```ts
export declare const absolve: <E, A>(self: These<E, A>) => Either<E, A>
```

Added in v1.0.0

## condemn

**Signature**

```ts
export declare const condemn: <E, A>(self: These<E, A>) => Either<E, A>
```

Added in v1.0.0

## fromEither

**Signature**

```ts
export declare const fromEither: <E, A>(self: Either<E, A>) => These<readonly [E, ...E[]], A>
```

Added in v1.0.0

## fromIterable

**Signature**

```ts
export declare const fromIterable: <E>(onEmpty: LazyArg<E>) => <A>(collection: Iterable<A>) => These<E, A>
```

Added in v1.0.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <E>(onNullable: LazyArg<E>) => <A>(a: A) => These<E, NonNullable<A>>
```

Added in v1.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: LazyArg<E>) => <A>(self: O.Option<A>) => These<E, A>
```

Added in v1.0.0

## fromTuple

**Signature**

```ts
export declare const fromTuple: <E, A>(self: readonly [E, A]) => These<E, A>
```

Added in v1.0.0

## toEither

**Signature**

```ts
export declare const toEither: <E, A>(onBoth: (e: E, a: A) => Either<E, A>) => (self: These<E, A>) => Either<E, A>
```

Added in v1.0.0

## toValidated

**Signature**

```ts
export declare const toValidated: <E, A>(self: These<E, A>) => These<readonly [E, ...E[]], A>
```

Added in v1.0.0

# debugging

## inspectBoth

**Signature**

```ts
export declare const inspectBoth: <E, A>(onBoth: (e: E, a: A) => void) => (self: These<E, A>) => These<E, A>
```

Added in v1.0.0

## inspectLeft

**Signature**

```ts
export declare const inspectLeft: <E>(onLeft: (e: E) => void) => <A>(self: These<E, A>) => These<E, A>
```

Added in v1.0.0

## inspectRight

**Signature**

```ts
export declare const inspectRight: <A>(onRight: (a: A) => void) => <E>(self: These<E, A>) => These<E, A>
```

Added in v1.0.0

## inspectRightOrBoth

**Signature**

```ts
export declare const inspectRightOrBoth: <A>(onRightOrBoth: (a: A) => void) => <E>(self: These<E, A>) => These<E, A>
```

Added in v1.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: These<never, {}>
```

Added in v1.0.0

## andThenBind

**Signature**

```ts
export declare const andThenBind: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  that: These<readonly [E2, ...E2[]], B>
) => <E1>(
  self: These<readonly [E1, ...E1[]], A>
) => These<readonly [E2 | E1, ...(E2 | E1)[]], { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v1.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => These<readonly [E2, ...E2[]], B>
) => <E1>(
  self: These<readonly [E1, ...E1[]], A>
) => These<readonly [E2 | E1, ...(E2 | E1)[]], { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v1.0.0

## bindEither

**Signature**

```ts
export declare const bindEither: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Either<E2, B>
) => <E1>(
  self: These<readonly [E1, ...E1[]], A>
) => These<readonly [E2 | E1, ...(E2 | E1)[]], { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v1.0.0

## bindThese

**Signature**

```ts
export declare const bindThese: <N extends string, A extends object, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => These<E2, B>
) => <E1>(
  self: These<readonly [E1, ...E1[]], A>
) => These<readonly [E2 | E1, ...(E2 | E1)[]], { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v1.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(name: N) => <E, A>(self: These<E, A>) => These<E, { [K in N]: A }>
```

Added in v1.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <E>(self: These<E, A>) => These<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v1.0.0

# equivalence

## getEquivalence

**Signature**

```ts
export declare const getEquivalence: <E, A>(EE: Equivalence<E>, EA: Equivalence<A>) => Equivalence<These<E, A>>
```

Added in v1.0.0

# error handling

## firstRightOrBothOf

**Signature**

```ts
export declare const firstRightOrBothOf: <E, A>(collection: Iterable<These<E, A>>) => (self: These<E, A>) => These<E, A>
```

Added in v1.0.0

## mapLeft

Maps the `Left` side of an `These` value to a new `These` value.

**Signature**

```ts
export declare const mapLeft: {
  <E, G>(f: (e: E) => G): <A>(self: These<E, A>) => These<G, A>
  <E, A, G>(self: These<E, A>, f: (e: E) => G): These<G, A>
}
```

Added in v1.0.0

## orElse

Executes this effect and returns its value, if it succeeds, but otherwise
executes the specified effect.

**Signature**

```ts
export declare const orElse: <E1, E2, B>(
  that: (e1: E1) => These<E2, B>
) => <A>(self: These<E1, A>) => These<E1 | E2, B | A>
```

Added in v1.0.0

## orElseEither

Returns an effect that will produce the value of this effect, unless it
fails, in which case, it will produce the value of the specified effect.

**Signature**

```ts
export declare const orElseEither: <E1, E2, B>(
  that: (e1: E1) => These<E2, B>
) => <A>(self: These<E1, A>) => These<E1 | E2, Either<A, B>>
```

Added in v1.0.0

## orElseFail

Executes this effect and returns its value, if it succeeds, but otherwise
fails with the specified error.

**Signature**

```ts
export declare const orElseFail: <E2>(onLeft: LazyArg<E2>) => <E1, A>(self: These<E1, A>) => These<E2 | E1, A>
```

Added in v1.0.0

# filtering

## compact

**Signature**

```ts
export declare const compact: <E>(onNone: LazyArg<E>) => <A>(self: These<E, O.Option<A>>) => These<E, A>
```

Added in v1.0.0

## filter

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: LazyArg<E2>): <E1>(
    self: These<E1, C>
  ) => These<E2 | E1, B>
  <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: LazyArg<E2>): <E1>(self: These<E1, B>) => These<E2 | E1, B>
}
```

Added in v1.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B, E2>(
  f: (a: A) => O.Option<B>,
  onNone: LazyArg<E2>
) => <E1>(self: These<E1, A>) => These<E2 | E1, B>
```

Added in v1.0.0

# getters

## getBoth

**Signature**

```ts
export declare const getBoth: <E, A>(self: These<E, A>) => O.Option<readonly [E, A]>
```

Added in v1.0.0

## getBothOrElse

**Signature**

```ts
export declare const getBothOrElse: <E, A>(e: LazyArg<E>, a: LazyArg<A>) => (self: These<E, A>) => readonly [E, A]
```

Added in v1.0.0

## getLeft

Converts a `These` to an `Option` discarding the value (`Both` included).

**Signature**

```ts
export declare const getLeft: <E, A>(self: These<E, A>) => O.Option<E>
```

Added in v1.0.0

## getLeftOnly

Returns the error if and only if the value is a `Left` (i.e. `Both` is excluded).

**Signature**

```ts
export declare const getLeftOnly: <E, A>(self: These<E, A>) => O.Option<E>
```

Added in v1.0.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <B>(onLeft: LazyArg<B>) => <E, A>(self: These<E, A>) => B | A
```

Added in v1.0.0

## getOrNull

**Signature**

```ts
export declare const getOrNull: <E, A>(self: These<E, A>) => A | null
```

Added in v1.0.0

## getOrUndefined

**Signature**

```ts
export declare const getOrUndefined: <E, A>(self: These<E, A>) => A | undefined
```

Added in v1.0.0

## getRight

Converts a `These` to an `Option` discarding the error (`Both` included).

**Signature**

```ts
export declare const getRight: <E, A>(self: These<E, A>) => O.Option<A>
```

Added in v1.0.0

## getRightOnly

Returns the value if and only if the value is a `Right` (i.e. `Both` is excluded).

**Signature**

```ts
export declare const getRightOnly: <E, A>(self: These<E, A>) => O.Option<A>
```

Added in v1.0.0

# guards

## isBoth

Returns `true` if the these is an instance of `Both`, `false` otherwise

**Signature**

```ts
export declare const isBoth: <E, A>(self: These<E, A>) => self is Both<E, A>
```

Added in v1.0.0

## isLeft

Returns `true` if the these is an instance of `Left`, `false` otherwise

**Signature**

```ts
export declare const isLeft: <E, A>(self: These<E, A>) => self is Left<E>
```

Added in v1.0.0

## isLeftOrBoth

**Signature**

```ts
export declare const isLeftOrBoth: <E, A>(self: These<E, A>) => self is Left<E> | Both<E, A>
```

Added in v1.0.0

## isRight

Returns `true` if the these is an instance of `Right`, `false` otherwise

**Signature**

```ts
export declare const isRight: <E, A>(self: These<E, A>) => self is Right<A>
```

Added in v1.0.0

## isRightOrBoth

**Signature**

```ts
export declare const isRightOrBoth: <E, A>(self: These<E, A>) => self is Right<A> | Both<E, A>
```

Added in v1.0.0

## isThese

Returns `true` if the specified value is an instance of `These`, `false`
otherwise.

**Signature**

```ts
export declare const isThese: (u: unknown) => u is These<unknown, unknown>
```

Added in v1.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<ValidatedTypeLambda>
```

Added in v1.0.0

## Bicovariant

**Signature**

```ts
export declare const Bicovariant: bicovariant.Bicovariant<TheseTypeLambda>
```

Added in v1.0.0

## Chainable

**Signature**

```ts
export declare const Chainable: chainable.Chainable<ValidatedTypeLambda>
```

Added in v1.0.0

## Covariant

**Signature**

```ts
export declare const Covariant: covariant.Covariant<TheseTypeLambda>
```

Added in v1.0.0

## FlatMap

**Signature**

```ts
export declare const FlatMap: flatMap_.FlatMap<ValidatedTypeLambda>
```

Added in v1.0.0

## Foldable

**Signature**

```ts
export declare const Foldable: foldable.Foldable<TheseTypeLambda>
```

Added in v1.0.0

## Invariant

**Signature**

```ts
export declare const Invariant: invariant.Invariant<TheseTypeLambda>
```

Added in v1.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<ValidatedTypeLambda>
```

Added in v1.0.0

## Of

**Signature**

```ts
export declare const Of: of_.Of<TheseTypeLambda>
```

Added in v1.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<TheseTypeLambda>
```

Added in v1.0.0

## Product

**Signature**

```ts
export declare const Product: product_.Product<ValidatedTypeLambda>
```

Added in v1.0.0

## SemiAlternative

**Signature**

```ts
export declare const SemiAlternative: semiAlternative.SemiAlternative<TheseTypeLambda>
```

Added in v1.0.0

## SemiApplicative

**Signature**

```ts
export declare const SemiApplicative: semiApplicative.SemiApplicative<ValidatedTypeLambda>
```

Added in v1.0.0

## SemiCoproduct

**Signature**

```ts
export declare const SemiCoproduct: semiCoproduct.SemiCoproduct<TheseTypeLambda>
```

Added in v1.0.0

## SemiProduct

**Signature**

```ts
export declare const SemiProduct: semiProduct.SemiProduct<ValidatedTypeLambda>
```

Added in v1.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: traversable.Traversable<TheseTypeLambda>
```

Added in v1.0.0

# interop

## getOrThrow

**Signature**

```ts
export declare const getOrThrow: <E, A>(self: These<E, A>) => A
```

Added in v1.0.0

## getRightOnlyOrThrow

**Signature**

```ts
export declare const getRightOnlyOrThrow: <E, A>(self: These<E, A>) => A
```

Added in v1.0.0

## liftThrowable

Lifts a function that may throw to one returning a `These`.

**Signature**

```ts
export declare const liftThrowable: <A extends readonly unknown[], B, E>(
  f: (...a: A) => B,
  onThrow: (error: unknown) => E
) => (...a: A) => These<E, B>
```

Added in v1.0.0

# lifting

## lift2

Lifts a binary function into `These`.

**Signature**

```ts
export declare const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => {
  <E1, E2>(self: These<readonly [E1, ...E1[]], A>, that: These<readonly [E2, ...E2[]], B>): These<
    readonly [E1 | E2, ...(E1 | E2)[]],
    C
  >
  <E2>(that: These<readonly [E2, ...E2[]], B>): <E1>(
    self: These<readonly [E1, ...E1[]], A>
  ) => These<readonly [E2 | E1, ...(E2 | E1)[]], C>
}
```

Added in v1.0.0

## liftEither

**Signature**

```ts
export declare const liftEither: <A extends readonly unknown[], E, B>(
  f: (...a: A) => Either<E, B>
) => (...a: A) => These<readonly [E, ...E[]], B>
```

Added in v1.0.0

## liftNullable

**Signature**

```ts
export declare const liftNullable: <A extends readonly unknown[], B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: (...a: A) => E
) => (...a: A) => These<E, NonNullable<B>>
```

Added in v1.0.0

## liftOption

**Signature**

```ts
export declare const liftOption: <A extends readonly unknown[], B, E>(
  f: (...a: A) => O.Option<B>,
  onNone: (...a: A) => E
) => (...a: A) => These<E, B>
```

Added in v1.0.0

## liftPredicate

**Signature**

```ts
export declare const liftPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): (c: C) => These<E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): (b: B) => These<E, B>
}
```

Added in v1.0.0

## liftThese

**Signature**

```ts
export declare const liftThese: <A extends readonly unknown[], E, B>(
  f: (...a: A) => These<E, B>
) => (...a: A) => These<readonly [E, ...E[]], B>
```

Added in v1.0.0

# mapping

## as

Maps the right value of this effect to the specified constant value.

**Signature**

```ts
export declare const as: {
  <E, _, B>(self: These<E, _>, b: B): These<E, B>
  <B>(b: B): <E, _>(self: These<E, _>) => These<E, B>
}
```

Added in v1.0.0

## asUnit

Returns the effect resulting from mapping the right of this effect to unit.

**Signature**

```ts
export declare const asUnit: <E, _>(self: These<E, _>) => These<E, void>
```

Added in v1.0.0

## bimap

**Signature**

```ts
export declare const bimap: {
  <E1, E2, A, B>(f: (e: E1) => E2, g: (a: A) => B): (self: These<E1, A>) => These<E2, B>
  <E1, A, E2, B>(self: These<E1, A>, f: (e: E1) => E2, g: (a: A) => B): These<E2, B>
}
```

Added in v1.0.0

## flap

**Signature**

```ts
export declare const flap: {
  <A, E, B>(a: A, self: These<E, (a: A) => B>): These<E, B>
  <E, A, B>(self: These<E, (a: A) => B>): (a: A) => These<E, B>
}
```

Added in v1.0.0

## map

Maps the `Right` side of an `These` value to a new `These` value.

**Signature**

```ts
export declare const map: {
  <E, A, B>(self: These<E, A>, f: (a: A) => B): These<E, B>
  <A, B>(f: (a: A) => B): <E>(self: These<E, A>) => These<E, B>
}
```

Added in v1.0.0

## tupled

**Signature**

```ts
export declare const tupled: <E, A>(self: These<E, A>) => These<E, [A]>
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
) => (self: These<E, A>) => B | C | D
```

Added in v1.0.0

# predicates

## exists

**Signature**

```ts
export declare const exists: <A>(predicate: Predicate<A>) => <E>(self: These<E, A>) => boolean
```

Added in v1.0.0

# sequencing

## andThenDiscard

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const andThenDiscard: {
  <E1, A, E2, _>(self: These<readonly [E1, ...E1[]], A>, that: These<readonly [E2, ...E2[]], _>): These<
    readonly [E1 | E2, ...(E1 | E2)[]],
    A
  >
  <E2, _>(that: These<readonly [E2, ...E2[]], _>): <E1, A>(
    self: These<readonly [E1, ...E1[]], A>
  ) => These<readonly [E2 | E1, ...(E2 | E1)[]], A>
}
```

Added in v1.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <A, E2, B>(
  f: (a: A) => These<readonly [E2, ...E2[]], B>
) => <E1>(self: These<readonly [E1, ...E1[]], A>) => These<readonly [E2 | E1, ...(E2 | E1)[]], B>
```

Added in v1.0.0

## flatMapEither

**Signature**

```ts
export declare const flatMapEither: <A, E2, B>(
  f: (a: A) => Either<E2, B>
) => <E1>(self: These<readonly [E1, ...E1[]], A>) => These<readonly [E2 | E1, ...(E2 | E1)[]], B>
```

Added in v1.0.0

## flatMapNullable

**Signature**

```ts
export declare const flatMapNullable: <A, B, E2>(
  f: (a: A) => B | null | undefined,
  onNullable: (a: A) => E2
) => <E1>(self: These<readonly [E1, ...E1[]], A>) => These<readonly [E2 | E1, ...(E2 | E1)[]], NonNullable<B>>
```

Added in v1.0.0

## flatMapOption

**Signature**

```ts
export declare const flatMapOption: <A, B, E2>(
  f: (a: A) => O.Option<B>,
  onNone: (a: A) => E2
) => <E1>(self: These<readonly [E1, ...E1[]], A>) => These<readonly [E2 | E1, ...(E2 | E1)[]], B>
```

Added in v1.0.0

## flatMapThese

**Signature**

```ts
export declare const flatMapThese: <A, E2, B>(
  f: (a: A) => These<E2, B>
) => <E1>(self: These<readonly [E1, ...E1[]], A>) => These<readonly [E2 | E1, ...(E2 | E1)[]], B>
```

Added in v1.0.0

# traversing

## sequence

**Signature**

```ts
export declare const sequence: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <E, FR, FO, FE, A>(self: These<E, Kind<F, FR, FO, FE, A>>) => Kind<F, FR, FO, FE, These<E, A>>
```

Added in v1.0.0

## traverse

**Signature**

```ts
export declare const traverse: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, R, O, FE, B>(f: (a: A) => Kind<F, R, O, FE, B>) => <E>(self: These<E, A>) => Kind<F, R, O, FE, These<E, B>>
```

Added in v1.0.0

## traverseTap

**Signature**

```ts
export declare const traverseTap: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <TE, A, R, O, E, B>(self: These<TE, A>, f: (a: A) => Kind<F, R, O, E, B>): Kind<F, R, O, E, These<TE, A>>
  <A, R, O, E, B>(f: (a: A) => Kind<F, R, O, E, B>): <TE>(self: These<TE, A>) => Kind<F, R, O, E, These<TE, A>>
}
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
export declare const andThen: {
  <E1, _, E2, B>(self: These<readonly [E1, ...E1[]], _>, that: These<readonly [E2, ...E2[]], B>): These<
    readonly [E1 | E2, ...(E1 | E2)[]],
    B
  >
  <E2, B>(that: These<readonly [E2, ...E2[]], B>): <E1, _>(
    self: These<readonly [E1, ...E1[]], _>
  ) => These<readonly [E2 | E1, ...(E2 | E1)[]], B>
}
```

Added in v1.0.0

## ap

**Signature**

```ts
export declare const ap: {
  <E1, A, B, E2>(self: These<readonly [E1, ...E1[]], (a: A) => B>, that: These<readonly [E2, ...E2[]], A>): These<
    readonly [E1 | E2, ...(E1 | E2)[]],
    B
  >
  <E2, A>(that: These<readonly [E2, ...E2[]], A>): <E1, B>(
    self: These<readonly [E1, ...E1[]], (a: A) => B>
  ) => These<readonly [E2 | E1, ...(E2 | E1)[]], B>
}
```

Added in v1.0.0

## appendElement

Appends an element to the end of a tuple.

**Signature**

```ts
export declare const appendElement: {
  <E1, A extends readonly any[], E2, B>(
    self: These<readonly [E1, ...E1[]], A>,
    that: These<readonly [E2, ...E2[]], B>
  ): These<readonly [E1 | E2, ...(E1 | E2)[]], [...A, B]>
  <E2, B>(that: These<readonly [E2, ...E2[]], B>): <E1, A extends readonly any[]>(
    self: These<readonly [E1, ...E1[]], A>
  ) => These<readonly [E2 | E1, ...(E2 | E1)[]], [...A, B]>
}
```

Added in v1.0.0

## composeKleisliArrow

**Signature**

```ts
export declare const composeKleisliArrow: {
  <A, E1, B, E2, C>(afb: (a: A) => These<readonly [E1, ...E1[]], B>, bfc: (b: B) => These<readonly [E2, ...E2[]], C>): (
    a: A
  ) => These<readonly [E1 | E2, ...(E1 | E2)[]], C>
  <B, E2, C>(bfc: (b: B) => These<readonly [E2, ...E2[]], C>): <A, E1>(
    afb: (a: A) => These<readonly [E1, ...E1[]], B>
  ) => (a: A) => These<readonly [E2 | E1, ...(E2 | E1)[]], C>
}
```

Added in v1.0.0

## contains

Returns a function that checks if a `These` contains a given value using a provided `equivalence` function.

**Signature**

```ts
export declare const contains: <A>(equivalence: Equivalence<A>) => (a: A) => <E>(self: These<E, A>) => boolean
```

Added in v1.0.0

## flatten

**Signature**

```ts
export declare const flatten: <E2, E1, A>(
  self: These<readonly [E2, ...E2[]], These<readonly [E1, ...E1[]], A>>
) => These<readonly [E2 | E1, ...(E2 | E1)[]], A>
```

Added in v1.0.0

## reverse

**Signature**

```ts
export declare const reverse: <E, A>(self: These<E, A>) => These<A, E>
```

Added in v1.0.0

## struct

**Signature**

```ts
export declare const struct: <R extends Record<string, These<readonly [any, ...any[]], any>>>(
  r: R
) => These<
  readonly [
    [R[keyof R]] extends [These<readonly [infer E, ...(infer E)[]], any>] ? E : never,
    ...([R[keyof R]] extends [These<readonly [infer E, ...(infer E)[]], any>] ? E : never)[]
  ],
  { [K in keyof R]: [R[K]] extends [These<readonly [any, ...any[]], infer A>] ? A : never }
>
```

Added in v1.0.0

## tuple

**Signature**

```ts
export declare const tuple: <T extends readonly These<readonly [any, ...any[]], any>[]>(
  ...tuple: T
) => These<
  readonly [
    [T[number]] extends [These<readonly [infer E, ...(infer E)[]], any>] ? E : never,
    ...([T[number]] extends [These<readonly [infer E, ...(infer E)[]], any>] ? E : never)[]
  ],
  { [I in keyof T]: [T[I]] extends [These<readonly [any, ...any[]], infer A>] ? A : never }
>
```

Added in v1.0.0

## unit

**Signature**

```ts
export declare const unit: These<never, void>
```

Added in v1.0.0
