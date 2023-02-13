---
title: Result.ts
nav_order: 14
parent: Modules
---

## Result overview

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
  - [all](#all)
  - [andThenDiscard](#andthendiscard)
  - [flatMap](#flatmap)
  - [flatMapNullable](#flatmapnullable)
  - [flatMapOption](#flatmapoption)
  - [getFirstFailureMonoid](#getfirstfailuremonoid)
  - [getFirstFailureSemigroup](#getfirstfailuresemigroup)
  - [getFirstSuccessSemigroup](#getfirstsuccesssemigroup)
  - [zipWith](#zipwith)
- [constructors](#constructors)
  - [failure](#failure)
  - [success](#success)
- [conversions](#conversions)
  - [fromIterable](#fromiterable)
  - [fromOption](#fromoption)
  - [getFailure](#getfailure)
  - [getSuccess](#getsuccess)
  - [toArray](#toarray)
  - [toOption](#tooption)
  - [toRefinement](#torefinement)
- [debugging](#debugging)
  - [inspectFailure](#inspectfailure)
  - [inspectSuccess](#inspectsuccess)
- [do notation](#do-notation)
  - [Do](#do)
  - [andThenBind](#andthenbind)
  - [appendElement](#appendelement)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [let](#let)
  - [tupled](#tupled)
- [equivalence](#equivalence)
  - [getEquivalence](#getequivalence)
- [error handling](#error-handling)
  - [firstSuccessOf](#firstsuccessof)
  - [mapFailure](#mapfailure)
  - [orElse](#orelse)
  - [orElseEither](#orelseeither)
  - [orElseFail](#orelsefail)
  - [tapError](#taperror)
- [filtering](#filtering)
  - [compact](#compact)
  - [filter](#filter)
  - [filterMap](#filtermap)
- [getters](#getters)
  - [getFailures](#getfailures)
  - [getOrElse](#getorelse)
  - [getOrNull](#getornull)
  - [getOrUndefined](#getorundefined)
  - [getSuccesses](#getsuccesses)
- [guards](#guards)
  - [isFailure](#isfailure)
  - [isResult](#isresult)
  - [isSuccess](#issuccess)
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
  - [getOptionalSemigroup](#getoptionalsemigroup)
- [interop](#interop)
  - [fromNullable](#fromnullable)
  - [getOrThrow](#getorthrow)
  - [getOrThrowWith](#getorthrowwith)
  - [liftNullable](#liftnullable)
  - [liftThrowable](#liftthrowable)
  - [merge](#merge)
- [lifting](#lifting)
  - [lift2](#lift2)
  - [liftOption](#liftoption)
  - [liftPredicate](#liftpredicate)
- [mapping](#mapping)
  - [as](#as)
  - [asUnit](#asunit)
  - [bimap](#bimap)
  - [flap](#flap)
  - [map](#map)
- [models](#models)
  - [Failure (interface)](#failure-interface)
  - [Result (type alias)](#result-type-alias)
  - [Success (interface)](#success-interface)
- [pattern matching](#pattern-matching)
  - [match](#match)
- [traversing](#traversing)
  - [sequence](#sequence)
  - [traverse](#traverse)
  - [traverseTap](#traversetap)
- [type lambdas](#type-lambdas)
  - [ResultTypeLambda (interface)](#resulttypelambda-interface)
- [utils](#utils)
  - [andThen](#andthen)
  - [ap](#ap)
  - [composeKleisliArrow](#composekleisliarrow)
  - [contains](#contains)
  - [exists](#exists)
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
  <E1, E2>(self: Result<E1, number>, that: Result<E2, number>): Result<E1 | E2, number>
  <E2>(that: Result<E2, number>): <E1>(self: Result<E1, number>) => Result<E2 | E1, number>
}
```

Added in v1.0.0

## multiply

**Signature**

```ts
export declare const multiply: {
  <E1, E2>(self: Result<E1, number>, that: Result<E2, number>): Result<E1 | E2, number>
  <E2>(that: Result<E2, number>): <E1>(self: Result<E1, number>) => Result<E2 | E1, number>
}
```

Added in v1.0.0

## subtract

**Signature**

```ts
export declare const subtract: {
  <E1, E2>(self: Result<E1, number>, that: Result<E2, number>): Result<E1 | E2, number>
  <E2>(that: Result<E2, number>): <E1>(self: Result<E1, number>) => Result<E2 | E1, number>
}
```

Added in v1.0.0

## sum

**Signature**

```ts
export declare const sum: {
  <E1, E2>(self: Result<E1, number>, that: Result<E2, number>): Result<E1 | E2, number>
  <E2>(that: Result<E2, number>): <E1>(self: Result<E1, number>) => Result<E2 | E1, number>
}
```

Added in v1.0.0

# combinators

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: {
  <E1, A, E2, _>(self: Result<E1, A>, f: (a: A) => Result<E2, _>): Result<E1 | E2, A>
  <A, E2, _>(f: (a: A) => Result<E2, _>): <E1>(self: Result<E1, A>) => Result<E2 | E1, A>
}
```

Added in v1.0.0

# combining

## all

Similar to `Promise.all` but operates on `Result`s.

```
Iterable<Result<E, A>> -> Result<E, A[]>
```

Flattens a collection of `Result`s into a single `Result` that contains a list of all the `Success` values.
If there is a `Failure` value in the collection, it returns the first `Failure` found as the result.

**Signature**

```ts
export declare const all: <E, A>(collection: Iterable<Result<E, A>>) => Result<E, A[]>
```

**Example**

```ts
import * as R from '@fp-ts/core/Result'

assert.deepStrictEqual(R.all([R.success(1), R.success(2), R.success(3)]), R.success([1, 2, 3]))
assert.deepStrictEqual(R.all([R.success(1), R.failure('error'), R.success(3)]), R.failure('error'))
```

Added in v1.0.0

## andThenDiscard

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const andThenDiscard: {
  <E1, A, E2, _>(self: Result<E1, A>, that: Result<E2, _>): Result<E1 | E2, A>
  <E2, _>(that: Result<E2, _>): <E1, A>(self: Result<E1, A>) => Result<E2 | E1, A>
}
```

Added in v1.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: {
  <A, E2, B>(f: (a: A) => Result<E2, B>): <E1>(self: Result<E1, A>) => Result<E2 | E1, B>
  <E1, A, E2, B>(self: Result<E1, A>, f: (a: A) => Result<E2, B>): Result<E1 | E2, B>
}
```

Added in v1.0.0

## flatMapNullable

**Signature**

```ts
export declare const flatMapNullable: {
  <A, B, E2>(f: (a: A) => B | null | undefined, onNullable: (a: A) => E2): <E1>(
    self: Result<E1, A>
  ) => Result<E2 | E1, NonNullable<B>>
  <E1, A, B, E2>(self: Result<E1, A>, f: (a: A) => B | null | undefined, onNullable: (a: A) => E2): Result<
    E1 | E2,
    NonNullable<B>
  >
}
```

Added in v1.0.0

## flatMapOption

**Signature**

```ts
export declare const flatMapOption: {
  <A, B, E2>(f: (a: A) => Option<B>, onNone: (a: A) => E2): <E1>(self: Result<E1, A>) => Result<E2 | E1, B>
  <E1, A, B, E2>(self: Result<E1, A>, f: (a: A) => Option<B>, onNone: (a: A) => E2): Result<E1 | E2, B>
}
```

Added in v1.0.0

## getFirstFailureMonoid

`Monoid` returning the left-most `Failure` value. If both operands are `Success`s then the inner values
are combined using the provided `Monoid`.

- `combine` is provided by {@link getFirstFailureSemigroup}.
- `empty` is `success(M.empty)`

**Signature**

```ts
export declare const getFirstFailureMonoid: <A, E>(M: Monoid<A>) => Monoid<Result<E, A>>
```

Added in v1.0.0

## getFirstFailureSemigroup

`Semigroup` returning the left-most `Failure` value. If both operands are `Success`s then the inner values
are combined using the provided `Semigroup`.

```
| self        | that        | combine(self, that)      |
| ----------- | ----------- | -------------------------|
| failure(e1) | failure(e2) | failure(e1)              |
| failure(e1) | success(a2) | failure(e1)              |
| success(a1) | failure(e2) | failure(e2)              |
| success(a1) | success(a2) | success(combine(a1, a2)) |
```

**Signature**

```ts
export declare const getFirstFailureSemigroup: <A, E>(S: Semigroup<A>) => Semigroup<Result<E, A>>
```

Added in v1.0.0

## getFirstSuccessSemigroup

Semigroup returning the left-most `Success` value.

```
| self        | that        | combine(self, that) |
| ----------- | ----------- | ------------------- |
| failure(e1) | failure(e2) | failure(e2)         |
| failure(e1) | success(a2) | success(a2)         |
| success(a1) | failure(e2) | success(a1)         |
| success(a1) | success(a2) | success(a1)         |
```

**Signature**

```ts
export declare const getFirstSuccessSemigroup: <E, A>() => Semigroup<Result<E, A>>
```

Added in v1.0.0

## zipWith

**Signature**

```ts
export declare const zipWith: {
  <E1, A, E2, B, C>(self: Result<E1, A>, that: Result<E2, B>, f: (a: A, b: B) => C): Result<E1 | E2, C>
  <E2, B, A, C>(that: Result<E2, B>, f: (a: A, b: B) => C): <E1>(self: Result<E1, A>) => Result<E2 | E1, C>
}
```

Added in v1.0.0

# constructors

## failure

Constructs a new `Result` holding a `Failure` value

**Signature**

```ts
export declare const failure: <E>(e: E) => Result<E, never>
```

Added in v1.0.0

## success

Constructs a new `Result` holding a `Success` value

**Signature**

```ts
export declare const success: <A>(a: A) => Result<never, A>
```

Added in v1.0.0

# conversions

## fromIterable

**Signature**

```ts
export declare const fromIterable: {
  <E>(onEmpty: LazyArg<E>): <A>(collection: Iterable<A>) => Result<E, A>
  <A, E>(collection: Iterable<A>, onEmpty: LazyArg<E>): Result<E, A>
}
```

Added in v1.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: {
  <A, E>(fa: Option<A>, onNone: () => E): Result<E, A>
  <E>(onNone: () => E): <A>(fa: Option<A>) => Result<E, A>
}
```

**Example**

```ts
import * as R from '@fp-ts/core/Result'
import * as O from '@fp-ts/core/Option'

assert.deepStrictEqual(
  R.fromOption(O.some(1), () => 'error'),
  R.success(1)
)
assert.deepStrictEqual(
  R.fromOption(O.none(), () => 'error'),
  R.failure('error')
)
```

Added in v1.0.0

## getFailure

Converts a `Result` to an `Option` discarding the value.

**Signature**

```ts
export declare const getFailure: <E, A>(self: Result<E, A>) => Option<E>
```

**Example**

```ts
import * as O from '@fp-ts/core/Option'
import * as R from '@fp-ts/core/Result'

assert.deepStrictEqual(R.getFailure(R.success('ok')), O.none())
assert.deepStrictEqual(R.getFailure(R.failure('err')), O.some('err'))
```

Added in v1.0.0

## getSuccess

Converts a `Result` to an `Option` discarding the error.

Alias of {@link toOption}.

**Signature**

```ts
export declare const getSuccess: <E, A>(self: Result<E, A>) => Option<A>
```

**Example**

```ts
import * as O from '@fp-ts/core/Option'
import * as R from '@fp-ts/core/Result'

assert.deepStrictEqual(R.getSuccess(R.success('ok')), O.some('ok'))
assert.deepStrictEqual(R.getSuccess(R.failure('err')), O.none())
```

Added in v1.0.0

## toArray

Transforms an `Result` into an `Array`.
If the input is `Failure`, an empty array is returned.
If the input is `Success`, the value is wrapped in an array.

**Signature**

```ts
export declare const toArray: <E, A>(self: Result<E, A>) => A[]
```

**Example**

```ts
import { success, failure, toArray } from '@fp-ts/core/Result'

assert.deepStrictEqual(toArray(success(1)), [1])
assert.deepStrictEqual(toArray(failure('error')), [])
```

Added in v1.0.0

## toOption

Converts a `Result` to an `Option` discarding the error.

**Signature**

```ts
export declare const toOption: <E, A>(self: Result<E, A>) => Option<A>
```

**Example**

```ts
import * as O from '@fp-ts/core/Option'
import * as R from '@fp-ts/core/Result'

assert.deepStrictEqual(R.toOption(R.success(1)), O.some(1))
assert.deepStrictEqual(R.toOption(R.failure('a')), O.none())
```

Added in v1.0.0

## toRefinement

Returns a `Refinement` from a `Result` returning function.
This function ensures that a `Refinement` definition is type-safe.

**Signature**

```ts
export declare const toRefinement: <A, E, B extends A>(f: (a: A) => Result<E, B>) => Refinement<A, B>
```

Added in v1.0.0

# debugging

## inspectFailure

**Signature**

```ts
export declare const inspectFailure: {
  <E>(onFailure: (e: E) => void): <A>(self: Result<E, A>) => Result<E, A>
  <E, A>(self: Result<E, A>, onFailure: (e: E) => void): Result<E, A>
}
```

Added in v1.0.0

## inspectSuccess

**Signature**

```ts
export declare const inspectSuccess: {
  <A>(onSuccess: (a: A) => void): <E>(self: Result<E, A>) => Result<E, A>
  <E, A>(self: Result<E, A>, onSuccess: (a: A) => void): Result<E, A>
}
```

Added in v1.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: Result<never, {}>
```

Added in v1.0.0

## andThenBind

Extends the `Result` value with the value of another `Result` type.

If both `Result` instances are `Failure`, then the result will be the first `Failure`.

**Signature**

```ts
export declare const andThenBind: {
  <N extends string, A extends object, E2, B>(name: Exclude<N, keyof A>, that: Result<E2, B>): <E1>(
    self: Result<E1, A>
  ) => Result<E2 | E1, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <E1, A extends object, N extends string, E2, B>(
    self: Result<E1, A>,
    name: Exclude<N, keyof A>,
    that: Result<E2, B>
  ): Result<E1 | E2, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
}
```

**Example**

```ts
import * as R from '@fp-ts/core/Result'
import { pipe } from '@fp-ts/core/Function'

const result = pipe(
  R.Do,
  R.bind('a', () => R.failure('e1')),
  R.andThenBind('b', R.failure('e2'))
)

assert.deepStrictEqual(result, R.failure('e1'))
```

Added in v1.0.0

## appendElement

Appends an element to the end of a tuple.

**Signature**

```ts
export declare const appendElement: {
  <E1, A extends readonly any[], E2, B>(self: Result<E1, A>, that: Result<E2, B>): Result<E1 | E2, [...A, B]>
  <E2, B>(that: Result<E2, B>): <E1, A extends readonly any[]>(self: Result<E1, A>) => Result<E2 | E1, [...A, B]>
}
```

Added in v1.0.0

## bind

**Signature**

```ts
export declare const bind: {
  <N extends string, A extends object, E2, B>(name: Exclude<N, keyof A>, f: (a: A) => Result<E2, B>): <E1>(
    self: Result<E1, A>
  ) => Result<E2 | E1, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <E1, A extends object, N extends string, E2, B>(
    self: Result<E1, A>,
    name: Exclude<N, keyof A>,
    f: (a: A) => Result<E2, B>
  ): Result<E1 | E2, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
}
```

Added in v1.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: {
  <N extends string>(name: N): <E, A>(self: Result<E, A>) => Result<E, { [K in N]: A }>
  <E, A, N extends string>(self: Result<E, A>, name: N): Result<E, { [K in N]: A }>
}
```

Added in v1.0.0

## let

**Signature**

```ts
export declare const let: {
  <N extends string, A extends object, B>(name: Exclude<N, keyof A>, f: (a: A) => B): <E>(
    self: Result<E, A>
  ) => Result<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <E, A extends object, N extends string, B>(self: Result<E, A>, name: Exclude<N, keyof A>, f: (a: A) => B): Result<
    E,
    { [K in N | keyof A]: K extends keyof A ? A[K] : B }
  >
}
```

Added in v1.0.0

## tupled

**Signature**

```ts
export declare const tupled: <E, A>(self: Result<E, A>) => Result<E, [A]>
```

Added in v1.0.0

# equivalence

## getEquivalence

**Signature**

```ts
export declare const getEquivalence: <E, A>(EE: Equivalence<E>, EA: Equivalence<A>) => Equivalence<Result<E, A>>
```

Added in v1.0.0

# error handling

## firstSuccessOf

**Signature**

```ts
export declare const firstSuccessOf: {
  <E, A>(collection: Iterable<Result<E, A>>): (self: Result<E, A>) => Result<E, A>
  <E, A>(self: Result<E, A>, collection: Iterable<Result<E, A>>): Result<E, A>
}
```

Added in v1.0.0

## mapFailure

Maps the `Failure` side of an `Result` value to a new `Result` value.

**Signature**

```ts
export declare const mapFailure: {
  <E, G>(f: (e: E) => G): <A>(self: Result<E, A>) => Result<G, A>
  <E, A, G>(self: Result<E, A>, f: (e: E) => G): Result<G, A>
}
```

Added in v1.0.0

## orElse

Executes this effect and returns its value, if it succeeds, but otherwise
executes the specified effect.

**Signature**

```ts
export declare const orElse: {
  <E1, E2, B>(that: (e1: E1) => Result<E2, B>): <A>(self: Result<E1, A>) => Result<E2, B | A>
  <E1, A, E2, B>(self: Result<E1, A>, that: (e1: E1) => Result<E2, B>): Result<E2, A | B>
}
```

Added in v1.0.0

## orElseEither

Returns an effect that will produce the value of this effect, unless it
fails, in which case, it will produce the value of the specified effect.

**Signature**

```ts
export declare const orElseEither: {
  <E1, E2, B>(that: (e1: E1) => Result<E2, B>): <A>(self: Result<E1, A>) => Result<E2, Either<A, B>>
  <E1, A, E2, B>(self: Result<E1, A>, that: (e1: E1) => Result<E2, B>): Result<E2, Either<A, B>>
}
```

Added in v1.0.0

## orElseFail

Executes this effect and returns its value, if it succeeds, but otherwise
fails with the specified error.

**Signature**

```ts
export declare const orElseFail: {
  <E2>(onFailure: LazyArg<E2>): <E1, A>(self: Result<E1, A>) => Result<E2, A>
  <E1, A, E2>(self: Result<E1, A>, onFailure: LazyArg<E2>): Result<E2, A>
}
```

Added in v1.0.0

## tapError

Returns an effect that effectfully "peeks" at the failure of this effect.

**Signature**

```ts
export declare const tapError: {
  <E1, E2, _>(onFailure: (e: E1) => Result<E2, _>): <A>(self: Result<E1, A>) => Result<E1 | E2, A>
  <E1, A, E2, _>(self: Result<E1, A>, onFailure: (e: E1) => Result<E2, _>): Result<E1 | E2, A>
}
```

Added in v1.0.0

# filtering

## compact

**Signature**

```ts
export declare const compact: {
  <E2>(onNone: LazyArg<E2>): <E1, A>(self: Result<E1, Option<A>>) => Result<E2 | E1, A>
  <E1, A, E2>(self: Result<E1, Option<A>>, onNone: LazyArg<E2>): Result<E1 | E2, A>
}
```

Added in v1.0.0

## filter

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: LazyArg<E2>): <E1>(
    self: Result<E1, C>
  ) => Result<E2 | E1, B>
  <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: LazyArg<E2>): <E1>(
    self: Result<E1, B>
  ) => Result<E2 | E1, B>
  <E1, C extends A, B extends A, E2, A = C>(
    self: Result<E1, C>,
    refinement: Refinement<A, B>,
    onFalse: LazyArg<E2>
  ): Result<E1 | E2, B>
  <E1, B extends A, E2, A = B>(self: Result<E1, B>, predicate: Predicate<A>, onFalse: LazyArg<E2>): Result<E1 | E2, B>
}
```

Added in v1.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: {
  <A, B, E2>(f: (a: A) => Option<B>, onNone: LazyArg<E2>): <E1>(self: Result<E1, A>) => Result<E2 | E1, B>
  <E1, A, B, E2>(self: Result<E1, A>, f: (a: A) => Option<B>, onNone: LazyArg<E2>): Result<E1 | E2, B>
}
```

Added in v1.0.0

# getters

## getFailures

Return all the `Failure` elements from an `Interable` of `Result`s.

**Signature**

```ts
export declare const getFailures: <E, A>(self: Iterable<Result<E, A>>) => E[]
```

Added in v1.0.0

## getOrElse

Returns the wrapped value if it's a `Success` or a default value if is a `Failure`.

**Signature**

```ts
export declare const getOrElse: {
  <E, B>(onFailure: (e: E) => B): <A>(self: Result<E, A>) => B | A
  <E, A, B>(self: Result<E, A>, onFailure: (e: E) => B): A | B
}
```

**Example**

```ts
import * as R from '@fp-ts/core/Result'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(
  R.getOrElse(R.success(1), () => 0),
  1
)
assert.deepStrictEqual(
  R.getOrElse(R.failure('error'), () => 0),
  0
)
```

Added in v1.0.0

## getOrNull

**Signature**

```ts
export declare const getOrNull: <E, A>(self: Result<E, A>) => A | null
```

Added in v1.0.0

## getOrUndefined

**Signature**

```ts
export declare const getOrUndefined: <E, A>(self: Result<E, A>) => A | undefined
```

Added in v1.0.0

## getSuccesses

Return all the `Success` elements from an `Interable` of `Result`s.

**Signature**

```ts
export declare const getSuccesses: <E, A>(self: Iterable<Result<E, A>>) => A[]
```

Added in v1.0.0

# guards

## isFailure

Determine if a `Result` is a `Failure`.

**Signature**

```ts
export declare const isFailure: <E, A>(self: Result<E, A>) => self is Failure<E>
```

**Example**

```ts
import { isFailure, failure, success } from '@fp-ts/core/Result'

assert.deepStrictEqual(isFailure(success(1)), false)
assert.deepStrictEqual(isFailure(failure('error')), true)
```

Added in v1.0.0

## isResult

Tests if a value is a `Result`.

**Signature**

```ts
export declare const isResult: (input: unknown) => input is Result<unknown, unknown>
```

**Example**

```ts
import { isResult, failure, success } from '@fp-ts/core/Result'

assert.deepStrictEqual(isResult(success(1)), true)
assert.deepStrictEqual(isResult(failure('error')), true)
assert.deepStrictEqual(isResult({ success: 1 }), false)
```

Added in v1.0.0

## isSuccess

Determine if a `Result` is a `Success`.

**Signature**

```ts
export declare const isSuccess: <E, A>(self: Result<E, A>) => self is Success<A>
```

**Example**

```ts
import { isSuccess, failure, success } from '@fp-ts/core/Result'

assert.deepStrictEqual(isSuccess(success(1)), true)
assert.deepStrictEqual(isSuccess(failure('error')), false)
```

Added in v1.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<ResultTypeLambda>
```

Added in v1.0.0

## Bicovariant

**Signature**

```ts
export declare const Bicovariant: bicovariant.Bicovariant<ResultTypeLambda>
```

Added in v1.0.0

## Chainable

**Signature**

```ts
export declare const Chainable: chainable.Chainable<ResultTypeLambda>
```

Added in v1.0.0

## Covariant

**Signature**

```ts
export declare const Covariant: covariant.Covariant<ResultTypeLambda>
```

Added in v1.0.0

## FlatMap

**Signature**

```ts
export declare const FlatMap: flatMap_.FlatMap<ResultTypeLambda>
```

Added in v1.0.0

## Foldable

**Signature**

```ts
export declare const Foldable: foldable.Foldable<ResultTypeLambda>
```

Added in v1.0.0

## Invariant

**Signature**

```ts
export declare const Invariant: invariant.Invariant<ResultTypeLambda>
```

Added in v1.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<ResultTypeLambda>
```

Added in v1.0.0

## Of

**Signature**

```ts
export declare const Of: of_.Of<ResultTypeLambda>
```

Added in v1.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<ResultTypeLambda>
```

Added in v1.0.0

## Product

**Signature**

```ts
export declare const Product: product_.Product<ResultTypeLambda>
```

Added in v1.0.0

## SemiAlternative

**Signature**

```ts
export declare const SemiAlternative: semiAlternative.SemiAlternative<ResultTypeLambda>
```

Added in v1.0.0

## SemiApplicative

**Signature**

```ts
export declare const SemiApplicative: semiApplicative.SemiApplicative<ResultTypeLambda>
```

Added in v1.0.0

## SemiCoproduct

**Signature**

```ts
export declare const SemiCoproduct: semiCoproduct.SemiCoproduct<ResultTypeLambda>
```

Added in v1.0.0

## SemiProduct

**Signature**

```ts
export declare const SemiProduct: semiProduct.SemiProduct<ResultTypeLambda>
```

Added in v1.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: traversable.Traversable<ResultTypeLambda>
```

Added in v1.0.0

## getOptionalSemigroup

Semigroup that models the combination of values that may be absent, elements that are `Failure` are ignored
while elements that are `Success` are combined using the provided `Semigroup`.

**Signature**

```ts
export declare const getOptionalSemigroup: <E, A>(S: Semigroup<A>) => Semigroup<Result<E, A>>
```

Added in v1.0.0

# interop

## fromNullable

Takes a lazy default and a nullable value, if the value is not nully, turn it into a `Success`, if the value is nully use
the provided default as a `Failure`.

**Signature**

```ts
export declare const fromNullable: {
  <A, E>(onNullable: (a: A) => E): (a: A) => Result<E, NonNullable<A>>
  <A, E>(a: A, onNullable: (a: A) => E): Result<E, NonNullable<A>>
}
```

**Example**

```ts
import * as R from '@fp-ts/core/Result'

const parse = R.fromNullable(() => 'nullable')

assert.deepStrictEqual(parse(1), R.success(1))
assert.deepStrictEqual(parse(null), R.failure('nullable'))
```

Added in v1.0.0

## getOrThrow

Extracts the value of an `Result` or throws if the `Result` is `Failure`.

The thrown error is a default error. To configure the error thrown, see {@link getOrThrowWith}.

**Signature**

```ts
export declare const getOrThrow: <E, A>(self: Result<E, A>) => A
```

**Example**

```ts
import * as R from '@fp-ts/core/Result'

assert.deepStrictEqual(R.getOrThrow(R.success(1)), 1)
assert.throws(() => R.getOrThrow(R.failure('error')))
```

Added in v1.0.0

## getOrThrowWith

Extracts the value of an `Result` or throws if the `Result` is `Failure`.

If a default error is sufficient for your use case and you don't need to configure the thrown error, see {@link getOrThrow}.

**Signature**

```ts
export declare const getOrThrowWith: {
  <E>(onFailure: (e: E) => unknown): <A>(self: Result<E, A>) => A
  <E, A>(self: Result<E, A>, onFailure: (e: E) => unknown): A
}
```

**Example**

```ts
import * as R from '@fp-ts/core/Result'

assert.deepStrictEqual(
  R.getOrThrowWith(R.success(1), () => new Error('Unexpected Failure')),
  1
)
assert.throws(() => R.getOrThrowWith(R.failure('error'), () => new Error('Unexpected Failure')))
```

Added in v1.0.0

## liftNullable

**Signature**

```ts
export declare const liftNullable: <A extends readonly unknown[], B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: (...a: A) => E
) => (...a: A) => Result<E, NonNullable<B>>
```

Added in v1.0.0

## liftThrowable

Lifts a function that may throw to one returning a `Result`.

**Signature**

```ts
export declare const liftThrowable: <A extends readonly unknown[], B, E>(
  f: (...a: A) => B,
  onThrow: (error: unknown) => E
) => (...a: A) => Result<E, B>
```

Added in v1.0.0

## merge

**Signature**

```ts
export declare const merge: <E, A>(self: Result<E, A>) => E | A
```

Added in v1.0.0

# lifting

## lift2

Lifts a binary function into `Result`.

**Signature**

```ts
export declare const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => {
  <E1, E2>(self: Result<E1, A>, that: Result<E2, B>): Result<E1 | E2, C>
  <E2>(that: Result<E2, B>): <E1>(self: Result<E1, A>) => Result<E2 | E1, C>
}
```

Added in v1.0.0

## liftOption

**Signature**

```ts
export declare const liftOption: <A extends readonly unknown[], B, E>(
  f: (...a: A) => Option<B>,
  onNone: (...a: A) => E
) => (...a: A) => Result<E, B>
```

Added in v1.0.0

## liftPredicate

**Signature**

```ts
export declare const liftPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): (c: C) => Result<E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): (b: B) => Result<E, B>
}
```

**Example**

```ts
import { liftPredicate, failure, success } from '@fp-ts/core/Result'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(
  pipe(
    1,
    liftPredicate(
      (n) => n > 0,
      () => 'error'
    )
  ),
  success(1)
)
assert.deepStrictEqual(
  pipe(
    -1,
    liftPredicate(
      (n) => n > 0,
      () => 'error'
    )
  ),
  failure('error')
)
```

Added in v1.0.0

# mapping

## as

Maps the `Success` value to the specified constant value.

**Signature**

```ts
export declare const as: {
  <E, _, B>(self: Result<E, _>, b: B): Result<E, B>
  <B>(b: B): <E, _>(self: Result<E, _>) => Result<E, B>
}
```

Added in v1.0.0

## asUnit

**Signature**

```ts
export declare const asUnit: <E, _>(self: Result<E, _>) => Result<E, void>
```

Added in v1.0.0

## bimap

**Signature**

```ts
export declare const bimap: {
  <E1, E2, A, B>(f: (e: E1) => E2, g: (a: A) => B): (self: Result<E1, A>) => Result<E2, B>
  <E1, A, E2, B>(self: Result<E1, A>, f: (e: E1) => E2, g: (a: A) => B): Result<E2, B>
}
```

Added in v1.0.0

## flap

**Signature**

```ts
export declare const flap: {
  <A, E, B>(a: A, self: Result<E, (a: A) => B>): Result<E, B>
  <E, A, B>(self: Result<E, (a: A) => B>): (a: A) => Result<E, B>
}
```

Added in v1.0.0

## map

Maps the `Success` side of an `Result` value to a new `Result` value.

**Signature**

```ts
export declare const map: {
  <A, B>(f: (a: A) => B): <E>(self: Result<E, A>) => Result<E, B>
  <E, A, B>(self: Result<E, A>, f: (a: A) => B): Result<E, B>
}
```

Added in v1.0.0

# models

## Failure (interface)

**Signature**

```ts
export interface Failure<E> {
  readonly _tag: 'Failure'
  readonly failure: E
}
```

Added in v1.0.0

## Result (type alias)

**Signature**

```ts
export type Result<E, A> = Failure<E> | Success<A>
```

Added in v1.0.0

## Success (interface)

**Signature**

```ts
export interface Success<A> {
  readonly _tag: 'Success'
  readonly success: A
}
```

Added in v1.0.0

# pattern matching

## match

Takes two functions and an `Result` value, if the value is a `Failure` the inner value is applied to the first function,
if the value is a `Success` the inner value is applied to the second function.

**Signature**

```ts
export declare const match: {
  <E, B, A, C = B>(onFailure: (e: E) => B, onSuccess: (a: A) => C): (self: Result<E, A>) => B | C
  <E, A, B, C = B>(self: Result<E, A>, onFailure: (e: E) => B, onSuccess: (a: A) => C): B | C
}
```

**Example**

```ts
import * as R from '@fp-ts/core/Result'
import { pipe } from '@fp-ts/core/Function'

const onFailure = (errors: ReadonlyArray<string>): string => `Errors: ${errors.join(', ')}`

const onSuccess = (value: number): string => `Ok: ${value}`

assert.deepStrictEqual(pipe(R.success(1), R.match(onFailure, onSuccess)), 'Ok: 1')
assert.deepStrictEqual(
  pipe(R.failure(['error 1', 'error 2']), R.match(onFailure, onSuccess)),
  'Errors: error 1, error 2'
)
```

Added in v1.0.0

# traversing

## sequence

**Signature**

```ts
export declare const sequence: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <TE, R, O, E, A>(self: Result<TE, Kind<F, R, O, E, A>>) => Kind<F, R, O, E, Result<TE, A>>
```

Added in v1.0.0

## traverse

**Signature**

```ts
export declare const traverse: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <A, R, O, E, B>(f: (a: A) => Kind<F, R, O, E, B>): <TE>(self: Result<TE, A>) => Kind<F, R, O, E, Result<TE, B>>
  <TE, A, R, O, E, B>(self: Result<TE, A>, f: (a: A) => Kind<F, R, O, E, B>): Kind<F, R, O, E, Result<TE, B>>
}
```

Added in v1.0.0

## traverseTap

**Signature**

```ts
export declare const traverseTap: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <TE, A, R, O, E, B>(self: Result<TE, A>, f: (a: A) => Kind<F, R, O, E, B>): Kind<F, R, O, E, Result<TE, A>>
  <A, R, O, E, B>(f: (a: A) => Kind<F, R, O, E, B>): <TE>(self: Result<TE, A>) => Kind<F, R, O, E, Result<TE, A>>
}
```

Added in v1.0.0

# type lambdas

## ResultTypeLambda (interface)

**Signature**

```ts
export interface ResultTypeLambda extends TypeLambda {
  readonly type: Result<this['Out1'], this['Target']>
}
```

Added in v1.0.0

# utils

## andThen

**Signature**

```ts
export declare const andThen: {
  <E1, _, E2, B>(self: Result<E1, _>, that: Result<E2, B>): Result<E1 | E2, B>
  <E2, B>(that: Result<E2, B>): <E1, _>(self: Result<E1, _>) => Result<E2 | E1, B>
}
```

Added in v1.0.0

## ap

**Signature**

```ts
export declare const ap: {
  <E1, A, B, E2>(self: Result<E1, (a: A) => B>, that: Result<E2, A>): Result<E1 | E2, B>
  <E2, A>(that: Result<E2, A>): <E1, B>(self: Result<E1, (a: A) => B>) => Result<E2 | E1, B>
}
```

Added in v1.0.0

## composeKleisliArrow

**Signature**

```ts
export declare const composeKleisliArrow: {
  <A, E1, B, E2, C>(afb: (a: A) => Result<E1, B>, bfc: (b: B) => Result<E2, C>): (a: A) => Result<E1 | E2, C>
  <B, E2, C>(bfc: (b: B) => Result<E2, C>): <A, E1>(afb: (a: A) => Result<E1, B>) => (a: A) => Result<E2 | E1, C>
}
```

Added in v1.0.0

## contains

Returns a function that checks if an `Result` contains a given value using a provided `equivalence` function.

**Signature**

```ts
export declare const contains: <A>(isEquivalent: (self: A, that: A) => boolean) => {
  (a: A): <E>(self: Result<E, A>) => boolean
  <E>(self: Result<E, A>, a: A): boolean
}
```

Added in v1.0.0

## exists

Returns `false` if `Failure` or returns the Result of the application of the given predicate to the `Success` value.

**Signature**

```ts
export declare const exists: {
  <A>(predicate: Predicate<A>): <E>(self: Result<E, A>) => boolean
  <E, A>(self: Result<E, A>, predicate: Predicate<A>): boolean
}
```

**Example**

```ts
import * as R from '@fp-ts/core/Result'

const f = R.exists((n: number) => n > 2)

assert.deepStrictEqual(f(R.failure('a')), false)
assert.deepStrictEqual(f(R.success(1)), false)
assert.deepStrictEqual(f(R.success(3)), true)
```

Added in v1.0.0

## flatten

**Signature**

```ts
export declare const flatten: <E1, E2, A>(self: Result<E1, Result<E2, A>>) => Result<E1 | E2, A>
```

Added in v1.0.0

## reverse

**Signature**

```ts
export declare const reverse: <E, A>(self: Result<E, A>) => Result<A, E>
```

Added in v1.0.0

## struct

**Signature**

```ts
export declare const struct: <R extends Record<string, Result<any, any>>>(
  fields: R
) => Result<
  [R[keyof R]] extends [Result<infer E, any>] ? E : never,
  { [K in keyof R]: [R[K]] extends [Result<any, infer A>] ? A : never }
>
```

Added in v1.0.0

## tuple

Similar to `Promise.all` but operates on `Result`s.

```
[Result<E1, A>, Result<E1, B>, ...] -> Result<E1 \| E2 \| ..., [A, B, ...]>
```

**Signature**

```ts
export declare const tuple: <T extends readonly Result<any, any>[]>(
  ...elements: T
) => Result<
  [T[number]] extends [Result<infer E, any>] ? E : never,
  { [I in keyof T]: [T[I]] extends [Result<any, infer A>] ? A : never }
>
```

Added in v1.0.0

## unit

**Signature**

```ts
export declare const unit: Result<never, void>
```

Added in v1.0.0
