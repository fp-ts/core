---
title: Option.ts
nav_order: 9
parent: Modules
---

## Option overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [algebraic operations](#algebraic-operations)
  - [divide](#divide)
  - [multiply](#multiply)
  - [multiplyCompact](#multiplycompact)
  - [subtract](#subtract)
  - [sum](#sum)
  - [sumCompact](#sumcompact)
- [combining](#combining)
  - [ap](#ap)
  - [getFailureMonoid](#getfailuremonoid)
  - [getFailureSemigroup](#getfailuresemigroup)
  - [getFirstSomeSemigroup](#getfirstsomesemigroup)
  - [zipWith](#zipwith)
- [constructors](#constructors)
  - [none](#none)
  - [of](#of)
  - [some](#some)
- [conversions](#conversions)
  - [fromEither](#fromeither)
  - [fromIterable](#fromiterable)
  - [getLeft](#getleft)
  - [getRight](#getright)
  - [toArray](#toarray)
  - [toEither](#toeither)
  - [toRefinement](#torefinement)
- [debugging](#debugging)
  - [inspectNone](#inspectnone)
  - [inspectSome](#inspectsome)
- [do notation](#do-notation)
  - [Do](#do)
  - [andThenBind](#andthenbind)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [let](#let)
- [equivalence](#equivalence)
  - [getEquivalence](#getequivalence)
- [error handling](#error-handling)
  - [firstSomeOf](#firstsomeof)
  - [getOrElse](#getorelse)
  - [orElse](#orelse)
  - [orElseEither](#orelseeither)
- [filtering](#filtering)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [partitionMap](#partitionmap)
- [folding](#folding)
  - [Foldable](#foldable)
  - [reduceCompact](#reducecompact)
- [guards](#guards)
  - [isNone](#isnone)
  - [isOption](#isoption)
  - [isSome](#issome)
- [instances](#instances)
  - [Alternative](#alternative)
  - [Applicative](#applicative)
  - [Compactable](#compactable)
  - [Coproduct](#coproduct)
  - [Filterable](#filterable)
  - [Monad](#monad)
  - [Product](#product)
  - [SemiAlternative](#semialternative)
  - [SemiApplicative](#semiapplicative)
  - [SemiCoproduct](#semicoproduct)
  - [SemiProduct](#semiproduct)
  - [Traversable](#traversable)
  - [getOptionalMonoid](#getoptionalmonoid)
- [interop](#interop)
  - [fromNullable](#fromnullable)
  - [getOrNull](#getornull)
  - [getOrThrow](#getorthrow)
  - [getOrUndefined](#getorundefined)
  - [liftNullable](#liftnullable)
  - [liftThrowable](#liftthrowable)
- [lifting](#lifting)
  - [lift2](#lift2)
  - [liftEither](#lifteither)
  - [liftPredicate](#liftpredicate)
- [mapping](#mapping)
  - [Covariant](#covariant)
  - [Invariant](#invariant)
  - [as](#as)
  - [asUnit](#asunit)
  - [flap](#flap)
  - [map](#map)
  - [tupled](#tupled)
- [models](#models)
  - [None (interface)](#none-interface)
  - [Option (type alias)](#option-type-alias)
  - [Some (interface)](#some-interface)
- [pattern matching](#pattern-matching)
  - [match](#match)
- [sequencing](#sequencing)
  - [Chainable](#chainable)
  - [FlatMap](#flatmap)
  - [andThen](#andthen)
  - [andThenDiscard](#andthendiscard)
  - [composeKleisliArrow](#composekleisliarrow)
  - [flatMap](#flatmap)
  - [flatMapEither](#flatmapeither)
  - [flatMapNullable](#flatmapnullable)
  - [flatten](#flatten)
  - [tap](#tap)
- [sorting](#sorting)
  - [getOrder](#getorder)
- [traversing](#traversing)
  - [sequence](#sequence)
  - [traverse](#traverse)
  - [traverseTap](#traversetap)
- [type lambdas](#type-lambdas)
  - [OptionTypeLambda (interface)](#optiontypelambda-interface)
- [utils](#utils)
  - [Of](#of)
  - [Pointed](#pointed)
  - [appendElement](#appendelement)
  - [contains](#contains)
  - [exists](#exists)
  - [struct](#struct)
  - [tuple](#tuple)
  - [unit](#unit)

---

# algebraic operations

## divide

**Signature**

```ts
export declare const divide: {
  (self: Option<number>, that: Option<number>): Option<number>
  (that: Option<number>): (self: Option<number>) => Option<number>
}
```

Added in v1.0.0

## multiply

**Signature**

```ts
export declare const multiply: {
  (self: Option<number>, that: Option<number>): Option<number>
  (that: Option<number>): (self: Option<number>) => Option<number>
}
```

Added in v1.0.0

## multiplyCompact

Multiply all numbers in an iterable of `Option<number>` ignoring the `None` values.

**Signature**

```ts
export declare const multiplyCompact: (self: Iterable<Option<number>>) => number
```

**Example**

```ts
import { multiplyCompact, some, none } from '@fp-ts/core/Option'

const iterable = [some(2), none(), some(3), none()]
assert.deepStrictEqual(multiplyCompact(iterable), 6)
```

Added in v1.0.0

## subtract

**Signature**

```ts
export declare const subtract: {
  (self: Option<number>, that: Option<number>): Option<number>
  (that: Option<number>): (self: Option<number>) => Option<number>
}
```

Added in v1.0.0

## sum

**Signature**

```ts
export declare const sum: {
  (self: Option<number>, that: Option<number>): Option<number>
  (that: Option<number>): (self: Option<number>) => Option<number>
}
```

Added in v1.0.0

## sumCompact

Sum all numbers in an iterable of `Option<number>` ignoring the `None` values.

**Signature**

```ts
export declare const sumCompact: (self: Iterable<Option<number>>) => number
```

**Example**

```ts
import { sumCompact, some, none } from '@fp-ts/core/Option'

const iterable = [some(2), none(), some(3), none()]
assert.deepStrictEqual(sumCompact(iterable), 5)
```

Added in v1.0.0

# combining

## ap

**Signature**

```ts
export declare const ap: {
  <A, B>(self: Option<(a: A) => B>, that: Option<A>): Option<B>
  <A>(that: Option<A>): <B>(self: Option<(a: A) => B>) => Option<B>
}
```

Added in v1.0.0

## getFailureMonoid

Monoid that models the combination of computations that can fail, if at least one element is `None`
then the resulting combination is `None`, otherwise if all elements are `Some` then the resulting combination
is the combination of the wrapped elements using the provided `Monoid`.

The `empty` value is `some(M.empty)`.

See also `getFailureSemigroup` if you need a `Semigroup` instead of a `Monoid`.

**Signature**

```ts
export declare const getFailureMonoid: <A>(M: Monoid<A>) => Monoid<Option<A>>
```

Added in v1.0.0

## getFailureSemigroup

Semigroup that models the combination of computations that can fail, if at least one element is `None`
then the resulting combination is `None`, otherwise if all elements are `Some` then the resulting combination
is the combination of the wrapped elements using the provided `Semigroup`.

See also `getFailureMonoid` if you need a `Monoid` instead of a `Semigroup`.

**Signature**

```ts
export declare const getFailureSemigroup: <A>(S: Semigroup<A>) => Semigroup<Option<A>>
```

Added in v1.0.0

## getFirstSomeSemigroup

Semigroup returning the first `Some` value encountered.

**Signature**

```ts
export declare const getFirstSomeSemigroup: <A>() => Semigroup<Option<A>>
```

Added in v1.0.0

## zipWith

Zips two `Option` values together using a provided function, returning a new `Option` of the result.

**Signature**

```ts
export declare const zipWith: {
  <A, B, C>(self: Option<A>, that: Option<B>, f: (a: A, b: B) => C): Option<C>
  <B, A, C>(that: Option<B>, f: (a: A, b: B) => C): (self: Option<A>) => Option<C>
}
```

Added in v1.0.0

# constructors

## none

Creates a new `Option` that represents the absence of a value.

This can be useful when working with optional values or to represent a computation that failed.
It returns a new `Option` object that does not contain any value.

**Signature**

```ts
export declare const none: <A = never>() => Option<A>
```

Added in v1.0.0

## of

Alias of {@link some}.

**Signature**

```ts
export declare const of: <A>(value: A) => Option<A>
```

Added in v1.0.0

## some

Creates a new `Option` that wraps the given value.

This can be useful when working with optional values or to represent a computation that succeeded with a value.

**Signature**

```ts
export declare const some: <A>(value: A) => Option<A>
```

Added in v1.0.0

# conversions

## fromEither

Converts a `Either` to an `Option` discarding the error.

**Signature**

```ts
export declare const fromEither: <E, A>(self: Either<E, A>) => Option<A>
```

**Example**

```ts
import * as O from '@fp-ts/core/Option'
import * as E from '@fp-ts/core/Either'

assert.deepStrictEqual(O.fromEither(E.right(1)), O.some(1))
assert.deepStrictEqual(O.fromEither(E.left('a')), O.none())
```

Added in v1.0.0

## fromIterable

Converts an `Iterable` of values into an `Option`. Returns the first value of the `Iterable` wrapped in a `Some`
if the `Iterable` is not empty, otherwise returns `None`.

**Signature**

```ts
export declare const fromIterable: <A>(collection: Iterable<A>) => Option<A>
```

**Example**

```ts
import { fromIterable, some, none } from '@fp-ts/core/Option'

const collection = [1, 2, 3]
assert.deepStrictEqual(fromIterable(collection), some(1))
assert.deepStrictEqual(fromIterable([]), none())
```

Added in v1.0.0

## getLeft

Converts a `Either` to an `Option` discarding the value.

**Signature**

```ts
export declare const getLeft: <E, A>(self: Either<E, A>) => Option<E>
```

**Example**

```ts
import * as O from '@fp-ts/core/Option'
import * as E from '@fp-ts/core/Either'

assert.deepStrictEqual(O.getLeft(E.right('ok')), O.none())
assert.deepStrictEqual(O.getLeft(E.left('err')), O.some('err'))
```

Added in v1.0.0

## getRight

Converts a `Either` to an `Option` discarding the error.

Alias of {@link fromEither}.

**Signature**

```ts
export declare const getRight: <E, A>(self: Either<E, A>) => Option<A>
```

**Example**

```ts
import * as O from '@fp-ts/core/Option'
import * as E from '@fp-ts/core/Either'

assert.deepStrictEqual(O.getRight(E.right('ok')), O.some('ok'))
assert.deepStrictEqual(O.getRight(E.left('err')), O.none())
```

Added in v1.0.0

## toArray

Transforms an `Option` into an `Array`.
If the input is `None`, an empty array is returned.
If the input is `Some`, the value is wrapped in an array.

**Signature**

```ts
export declare const toArray: <A>(self: Option<A>) => A[]
```

**Example**

```ts
import { some, none, toArray } from '@fp-ts/core/Option'

assert.deepStrictEqual(toArray(some(1)), [1])
assert.deepStrictEqual(toArray(none()), [])
```

Added in v1.0.0

## toEither

Converts an `Option` to an `Either`, allowing you to provide a value to be used in the case of a `None`.

**Signature**

```ts
export declare const toEither: {
  <A, E>(self: Option<A>, onNone: () => E): Either<E, A>
  <E>(onNone: () => E): <A>(self: Option<A>) => Either<E, A>
}
```

**Example**

```ts
import { pipe } from '@fp-ts/core/Function'
import * as O from '@fp-ts/core/Option'
import * as E from '@fp-ts/core/Either'

const onNone = () => 'error'
assert.deepStrictEqual(pipe(O.some(1), O.toEither(onNone)), E.right(1))
assert.deepStrictEqual(pipe(O.none(), O.toEither(onNone)), E.left('error'))
```

Added in v1.0.0

## toRefinement

Returns a `Refinement` from a `Option` returning function.
This function ensures that a `Refinement` definition is type-safe.

**Signature**

```ts
export declare const toRefinement: <A, B extends A>(f: (a: A) => Option<B>) => Refinement<A, B>
```

Added in v1.0.0

# debugging

## inspectNone

Useful for debugging purposes, the `onNone` callback is is called if `self` is a `None`.

**Signature**

```ts
export declare const inspectNone: {
  (onNone: () => void): <A>(self: Option<A>) => Option<A>
  <A>(self: Option<A>, onNone: () => void): Option<A>
}
```

Added in v1.0.0

## inspectSome

Useful for debugging purposes, the `onSome` callback is called with the value of `self` if it is a `Some`.

**Signature**

```ts
export declare const inspectSome: {
  <A>(onSome: (a: A) => void): (self: Option<A>) => Option<A>
  <A>(self: Option<A>, onSome: (a: A) => void): Option<A>
}
```

Added in v1.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: Option<{}>
```

Added in v1.0.0

## andThenBind

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const andThenBind: {
  <N extends string, A extends object, B>(name: Exclude<N, keyof A>, that: Option<B>): (
    self: Option<A>
  ) => Option<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <A extends object, N extends string, B>(self: Option<A>, name: Exclude<N, keyof A>, that: Option<B>): Option<{
    [K in N | keyof A]: K extends keyof A ? A[K] : B
  }>
}
```

Added in v1.0.0

## bind

**Signature**

```ts
export declare const bind: {
  <N extends string, A extends object, B>(name: Exclude<N, keyof A>, f: (a: A) => Option<B>): (
    self: Option<A>
  ) => Option<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <A extends object, N extends string, B>(self: Option<A>, name: Exclude<N, keyof A>, f: (a: A) => Option<B>): Option<{
    [K in N | keyof A]: K extends keyof A ? A[K] : B
  }>
}
```

Added in v1.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: {
  <N extends string>(name: N): <A>(self: Option<A>) => Option<{ [K in N]: A }>
  <A, N extends string>(self: Option<A>, name: N): Option<{ [K in N]: A }>
}
```

Added in v1.0.0

## let

**Signature**

```ts
export declare const let: {
  <N extends string, A extends object, B>(name: Exclude<N, keyof A>, f: (a: A) => B): (
    self: Option<A>
  ) => Option<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <A extends object, N extends string, B>(self: Option<A>, name: Exclude<N, keyof A>, f: (a: A) => B): Option<{
    [K in N | keyof A]: K extends keyof A ? A[K] : B
  }>
}
```

Added in v1.0.0

# equivalence

## getEquivalence

**Signature**

```ts
export declare const getEquivalence: <A>(E: Equivalence<A>) => Equivalence<Option<A>>
```

**Example**

```ts
import { none, some, getEquivalence } from '@fp-ts/core/Option'
import * as N from '@fp-ts/core/number'

const isEquivalent = getEquivalence(N.Equivalence)
assert.deepStrictEqual(isEquivalent(none(), none()), true)
assert.deepStrictEqual(isEquivalent(none(), some(1)), false)
assert.deepStrictEqual(isEquivalent(some(1), none()), false)
assert.deepStrictEqual(isEquivalent(some(1), some(2)), false)
assert.deepStrictEqual(isEquivalent(some(1), some(1)), true)
```

Added in v1.0.0

# error handling

## firstSomeOf

Given an `Iterable` collection of `Option`s, the function returns the first `Some` found in the collection.

**Signature**

```ts
export declare const firstSomeOf: <A>(collection: Iterable<Option<A>>) => Option<A>
```

Added in v1.0.0

## getOrElse

Returns the value of the `Option` if it is `Some`, otherwise returns `onNone`

**Signature**

```ts
export declare const getOrElse: {
  <B>(onNone: LazyArg<B>): <A>(self: Option<A>) => B | A
  <A, B>(self: Option<A>, onNone: LazyArg<B>): A | B
}
```

**Example**

```ts
import { some, none, getOrElse } from '@fp-ts/core/Option'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(
  pipe(
    some(1),
    getOrElse(() => 0)
  ),
  1
)
assert.deepStrictEqual(
  pipe(
    none(),
    getOrElse(() => 0)
  ),
  0
)
```

Added in v1.0.0

## orElse

Returns the provided `Option` `that` if `self` is `None`, otherwise returns `self`.

**Signature**

```ts
export declare const orElse: {
  <B>(that: LazyArg<Option<B>>): <A>(self: Option<A>) => Option<B | A>
  <A, B>(self: Option<A>, that: LazyArg<Option<B>>): Option<A | B>
}
```

**Example**

```ts
import * as O from '@fp-ts/core/Option'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(
  pipe(
    O.none(),
    O.orElse(() => O.none())
  ),
  O.none()
)
assert.deepStrictEqual(
  pipe(
    O.some('a'),
    O.orElse(() => O.none())
  ),
  O.some('a')
)
assert.deepStrictEqual(
  pipe(
    O.none(),
    O.orElse(() => O.some('b'))
  ),
  O.some('b')
)
assert.deepStrictEqual(
  pipe(
    O.some('a'),
    O.orElse(() => O.some('b'))
  ),
  O.some('a')
)
```

Added in v1.0.0

## orElseEither

Similar to `orElse`, but instead of returning a simple union, it returns an `Either` object,
which contains information about which of the two `Option`s has been chosen.

This is useful when it's important to know whether the value was retrieved from the first `Option` or the second option.

**Signature**

```ts
export declare const orElseEither: {
  <B>(that: LazyArg<Option<B>>): <A>(self: Option<A>) => Option<Either<A, B>>
  <A, B>(self: Option<A>, that: LazyArg<Option<B>>): Option<Either<A, B>>
}
```

Added in v1.0.0

# filtering

## filter

Filters an `Option` using a predicate. If the predicate is not satisfied or the `Option` is `None` returns `None`.

If you need to change the type of the `Option` in addition to filtering, see `filterMap`.

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, A = C>(self: Option<C>, refinement: (a: A) => a is B): Option<B>
  <B extends A, A = B>(self: Option<B>, predicate: (a: A) => boolean): Option<B>
  <C extends A, B extends A, A = C>(refinement: (a: A) => a is B): (self: Option<C>) => Option<B>
  <B extends A, A = B>(predicate: (a: A) => boolean): (self: Option<B>) => Option<B>
}
```

Added in v1.0.0

## filterMap

Maps over the value of an `Option` and filters out `None`s.

Useful when in addition to filtering you also want to change the type of the `Option`.

**Signature**

```ts
export declare const filterMap: {
  <A, B>(f: (a: A) => Option<B>): (self: Option<A>) => Option<B>
  <A, B>(self: Option<A>, f: (a: A) => Option<B>): Option<B>
}
```

Added in v1.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: {
  <A, B, C>(f: (a: A) => Either<B, C>): (self: Option<A>) => [Option<B>, Option<C>]
  <A, B, C>(self: Option<A>, f: (a: A) => Either<B, C>): [Option<B>, Option<C>]
}
```

Added in v1.0.0

# folding

## Foldable

**Signature**

```ts
export declare const Foldable: foldable.Foldable<OptionTypeLambda>
```

Added in v1.0.0

## reduceCompact

Reduces an `Iterable` of `Option<A>` to a single value of type `B`, elements that are `None` are ignored.

**Signature**

```ts
export declare const reduceCompact: {
  <B, A>(b: B, f: (b: B, a: A) => B): (self: Iterable<Option<A>>) => B
  <A, B>(self: Iterable<Option<A>>, b: B, f: (b: B, a: A) => B): B
}
```

**Example**

```ts
import { some, none, reduceCompact } from '@fp-ts/core/Option'
import { pipe } from '@fp-ts/core/Function'

const iterable = [some(1), none(), some(2), none()]
assert.deepStrictEqual(
  pipe(
    iterable,
    reduceCompact(0, (b, a) => b + a)
  ),
  3
)
```

Added in v1.0.0

# guards

## isNone

Returns `true` if the `Option` is `None`, `false` otherwise.

**Signature**

```ts
export declare const isNone: <A>(self: Option<A>) => self is None
```

**Example**

```ts
import { some, none, isNone } from '@fp-ts/core/Option'

assert.deepStrictEqual(isNone(some(1)), false)
assert.deepStrictEqual(isNone(none()), true)
```

Added in v1.0.0

## isOption

Checks if the specified value is an instance of `Option`, returns `true` if it is, `false` otherwise.

**Signature**

```ts
export declare const isOption: (u: unknown) => u is Option<unknown>
```

**Example**

```ts
import { some, none, isOption } from '@fp-ts/core/Option'

assert.deepStrictEqual(isOption(some(1)), true)
assert.deepStrictEqual(isOption(none()), true)
assert.deepStrictEqual(isOption({}), false)
```

Added in v1.0.0

## isSome

Returns `true` if the `Option` is an instance of `Some`, `false` otherwise.

**Signature**

```ts
export declare const isSome: <A>(self: Option<A>) => self is Some<A>
```

**Example**

```ts
import { some, none, isSome } from '@fp-ts/core/Option'

assert.deepStrictEqual(isSome(some(1)), true)
assert.deepStrictEqual(isSome(none()), false)
```

Added in v1.0.0

# instances

## Alternative

**Signature**

```ts
export declare const Alternative: alternative.Alternative<OptionTypeLambda>
```

Added in v1.0.0

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<OptionTypeLambda>
```

Added in v1.0.0

## Compactable

**Signature**

```ts
export declare const Compactable: compactable.Compactable<OptionTypeLambda>
```

Added in v1.0.0

## Coproduct

**Signature**

```ts
export declare const Coproduct: coproduct_.Coproduct<OptionTypeLambda>
```

Added in v1.0.0

## Filterable

**Signature**

```ts
export declare const Filterable: filterable.Filterable<OptionTypeLambda>
```

Added in v1.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<OptionTypeLambda>
```

Added in v1.0.0

## Product

**Signature**

```ts
export declare const Product: product_.Product<OptionTypeLambda>
```

Added in v1.0.0

## SemiAlternative

**Signature**

```ts
export declare const SemiAlternative: semiAlternative.SemiAlternative<OptionTypeLambda>
```

Added in v1.0.0

## SemiApplicative

**Signature**

```ts
export declare const SemiApplicative: semiApplicative.SemiApplicative<OptionTypeLambda>
```

Added in v1.0.0

## SemiCoproduct

**Signature**

```ts
export declare const SemiCoproduct: semiCoproduct.SemiCoproduct<OptionTypeLambda>
```

Added in v1.0.0

## SemiProduct

**Signature**

```ts
export declare const SemiProduct: semiProduct.SemiProduct<OptionTypeLambda>
```

Added in v1.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: traversable.Traversable<OptionTypeLambda>
```

Added in v1.0.0

## getOptionalMonoid

Monoid that models the combination of values that may be absent, elements that are `None` are ignored
while elements that are `Some` are combined using the provided `Semigroup`.

**Signature**

```ts
export declare const getOptionalMonoid: <A>(Semigroup: Semigroup<A>) => Monoid<Option<A>>
```

**Example**

```ts
import { getOptionalMonoid, some, none } from '@fp-ts/core/Option'
import * as N from '@fp-ts/core/Number'
import { pipe } from '@fp-ts/core/Function'

const M = getOptionalMonoid(N.SemigroupSum)
assert.deepStrictEqual(M.combine(none(), none()), none())
assert.deepStrictEqual(M.combine(some(1), none()), some(1))
assert.deepStrictEqual(M.combine(none(), some(1)), some(1))
assert.deepStrictEqual(M.combine(some(1), some(2)), some(3))
```

Added in v1.0.0

# interop

## fromNullable

Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
returns the value wrapped in a `Some`.

**Signature**

```ts
export declare const fromNullable: <A>(nullableValue: A) => Option<NonNullable<A>>
```

**Example**

```ts
import { none, some, fromNullable } from '@fp-ts/core/Option'

assert.deepStrictEqual(fromNullable(undefined), none())
assert.deepStrictEqual(fromNullable(null), none())
assert.deepStrictEqual(fromNullable(1), some(1))
```

Added in v1.0.0

## getOrNull

Returns the value of the `Option` if it is a `Some`, otherwise returns `null`.

**Signature**

```ts
export declare const getOrNull: <A>(self: Option<A>) => A | null
```

**Example**

```ts
import { some, none, getOrNull } from '@fp-ts/core/Option'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe(some(1), getOrNull), 1)
assert.deepStrictEqual(pipe(none(), getOrNull), null)
```

Added in v1.0.0

## getOrThrow

Returns the contained value if the `Option` is `Some`, otherwise throws an error.

**Signature**

```ts
export declare const getOrThrow: <A>(self: Option<A>) => A
```

**Example**

```ts
import { pipe } from '@fp-ts/core/Function'
import * as O from '@fp-ts/core/Option'

assert.deepStrictEqual(pipe(O.some(1), O.getOrThrow), 1)
assert.throws(() => pipe(O.none(), O.getOrThrow))
```

Added in v1.0.0

## getOrUndefined

Returns the value of the `Option` if it is a `Some`, otherwise returns `undefined`.

**Signature**

```ts
export declare const getOrUndefined: <A>(self: Option<A>) => A | undefined
```

**Example**

```ts
import { some, none, getOrUndefined } from '@fp-ts/core/Option'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe(some(1), getOrUndefined), 1)
assert.deepStrictEqual(pipe(none(), getOrUndefined), undefined)
```

Added in v1.0.0

## liftNullable

This API is useful for lifting a function that returns `null` or `undefined` into the `Option` context.

**Signature**

```ts
export declare const liftNullable: <A extends readonly unknown[], B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => Option<NonNullable<B>>
```

**Example**

```ts
import { liftNullable, none, some } from '@fp-ts/core/Option'

const parse = (s: string): number | undefined => {
  const n = parseFloat(s)
  return isNaN(n) ? undefined : n
}

const parseOption = liftNullable(parse)

assert.deepStrictEqual(parseOption('1'), some(1))
assert.deepStrictEqual(parseOption('not a number'), none())
```

Added in v1.0.0

## liftThrowable

A utility function that lifts a function that throws exceptions into a function that returns an `Option`.

This function is useful for any function that might throw an exception, allowing the developer to handle
the exception in a more functional way.

**Signature**

```ts
export declare const liftThrowable: <A extends readonly unknown[], B>(f: (...a: A) => B) => (...a: A) => Option<B>
```

**Example**

```ts
import { liftThrowable, some, none } from '@fp-ts/core/Option'

const parse = liftThrowable(JSON.parse)

assert.deepStrictEqual(parse('1'), some(1))
assert.deepStrictEqual(parse(''), none())
```

Added in v1.0.0

# lifting

## lift2

Lifts a binary function into `Option`.

**Signature**

```ts
export declare const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => { (self: Option<A>, that: Option<B>): Option<C>; (that: Option<B>): (self: Option<A>) => Option<C> }
```

Added in v1.0.0

## liftEither

Lifts an `Either` function to an `Option` function.

**Signature**

```ts
export declare const liftEither: <A extends readonly unknown[], E, B>(
  f: (...a: A) => Either<E, B>
) => (...a: A) => Option<B>
```

**Example**

```ts
import * as O from '@fp-ts/core/Option'
import * as E from '@fp-ts/core/Either'

const parse = (s: string) => (isNaN(+s) ? E.left(`Error: ${s} is not a number`) : E.right(+s))

const parseNumber = O.liftEither(parse)

assert.deepEqual(parseNumber('12'), O.some(12))
assert.deepEqual(parseNumber('not a number'), O.none())
```

Added in v1.0.0

## liftPredicate

Transforms a `Predicate` function into a `Some` of the input value if the predicate returns `true` or `None`
if the predicate returns `false`.

**Signature**

```ts
export declare const liftPredicate: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (c: C) => Option<B>
  <B extends A, A = B>(predicate: Predicate<A>): (b: B) => Option<B>
}
```

**Example**

```ts
import * as O from '@fp-ts/core/Option'

const getOption = O.liftPredicate((n: number) => n >= 0)

assert.deepStrictEqual(getOption(-1), O.none())
assert.deepStrictEqual(getOption(1), O.some(1))
```

Added in v1.0.0

# mapping

## Covariant

**Signature**

```ts
export declare const Covariant: covariant.Covariant<OptionTypeLambda>
```

Added in v1.0.0

## Invariant

**Signature**

```ts
export declare const Invariant: invariant.Invariant<OptionTypeLambda>
```

Added in v1.0.0

## as

Maps the `Some` value of this `Option` to the specified constant value.

**Signature**

```ts
export declare const as: { <_, B>(self: Option<_>, b: B): Option<B>; <B>(b: B): <_>(self: Option<_>) => Option<B> }
```

Added in v1.0.0

## asUnit

Returns the `Option` resulting from mapping the `Some` value to `void`.

This is useful when the value of the `Option` is not needed, but the presence or absence of the value is important.

**Signature**

```ts
export declare const asUnit: <_>(self: Option<_>) => Option<void>
```

Added in v1.0.0

## flap

**Signature**

```ts
export declare const flap: {
  <A, B>(a: A, self: Option<(a: A) => B>): Option<B>
  <A, B>(self: Option<(a: A) => B>): (a: A) => Option<B>
}
```

Added in v1.0.0

## map

Maps the `Some` side of an `Option` value to a new `Option` value.

**Signature**

```ts
export declare const map: {
  <A, B>(f: (a: A) => B): (self: Option<A>) => Option<B>
  <A, B>(self: Option<A>, f: (a: A) => B): Option<B>
}
```

Added in v1.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(self: Option<A>) => Option<[A]>
```

Added in v1.0.0

# models

## None (interface)

**Signature**

```ts
export interface None {
  readonly _tag: 'None'
}
```

Added in v1.0.0

## Option (type alias)

**Signature**

```ts
export type Option<A> = None | Some<A>
```

Added in v1.0.0

## Some (interface)

**Signature**

```ts
export interface Some<A> {
  readonly _tag: 'Some'
  readonly value: A
}
```

Added in v1.0.0

# pattern matching

## match

Matches the given `Option` and returns either the provided `onNone` value or the result of the provided `onSome`
function when passed the `Option`'s value.

**Signature**

```ts
export declare const match: {
  <B, A, C = B>(onNone: LazyArg<B>, onSome: (a: A) => C): (self: Option<A>) => B | C
  <A, B, C = B>(self: Option<A>, onNone: LazyArg<B>, onSome: (a: A) => C): B | C
}
```

**Example**

```ts
import { some, none, match } from '@fp-ts/core/Option'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(
  pipe(
    some(1),
    match(
      () => 'a none',
      (a) => `a some containing ${a}`
    )
  ),
  'a some containing 1'
)

assert.deepStrictEqual(
  pipe(
    none(),
    match(
      () => 'a none',
      (a) => `a some containing ${a}`
    )
  ),
  'a none'
)
```

Added in v1.0.0

# sequencing

## Chainable

**Signature**

```ts
export declare const Chainable: chainable.Chainable<OptionTypeLambda>
```

Added in v1.0.0

## FlatMap

**Signature**

```ts
export declare const FlatMap: flatMap_.FlatMap<OptionTypeLambda>
```

Added in v1.0.0

## andThen

**Signature**

```ts
export declare const andThen: {
  <_, B>(self: Option<_>, that: Option<B>): Option<B>
  <B>(that: Option<B>): <_>(self: Option<_>) => Option<B>
}
```

Added in v1.0.0

## andThenDiscard

Sequences the specified `that` `Option` but ignores its value.

It is useful when we want to chain multiple operations, but only care about the result of `self`.

**Signature**

```ts
export declare const andThenDiscard: {
  <A, _>(self: Option<A>, that: Option<_>): Option<A>
  <_>(that: Option<_>): <A>(self: Option<A>) => Option<A>
}
```

Added in v1.0.0

## composeKleisliArrow

**Signature**

```ts
export declare const composeKleisliArrow: {
  <A, B, C>(afb: (a: A) => Option<B>, bfc: (b: B) => Option<C>): (a: A) => Option<C>
  <B, C>(bfc: (b: B) => Option<C>): <A>(afb: (a: A) => Option<B>) => (a: A) => Option<C>
}
```

Added in v1.0.0

## flatMap

Applies a function to the value of an `Option` and flattens the result, if the input is `Some`.

**Signature**

```ts
export declare const flatMap: {
  <A, B>(f: (a: A) => Option<B>): (self: Option<A>) => Option<B>
  <A, B>(self: Option<A>, f: (a: A) => Option<B>): Option<B>
}
```

Added in v1.0.0

## flatMapEither

Applies a provided function that returns an `Either` to the contents of an `Option`, flattening the result into another `Option`.

**Signature**

```ts
export declare const flatMapEither: {
  <A, E, B>(f: (a: A) => Either<E, B>): (self: Option<A>) => Option<B>
  <A, E, B>(self: Option<A>, f: (a: A) => Either<E, B>): Option<B>
}
```

**Example**

```ts
import * as O from '@fp-ts/core/Option'
import * as E from '@fp-ts/core/Either'
import { pipe } from '@fp-ts/core/Function'

const f = (n: number) => (n > 2 ? E.left('Too big') : E.right(n + 1))

assert.deepStrictEqual(pipe(O.some(1), O.flatMapEither(f)), O.some(2))
assert.deepStrictEqual(pipe(O.some(3), O.flatMapEither(f)), O.none())
```

Added in v1.0.0

## flatMapNullable

This is `flatMap` + `fromNullable`, useful when working with optional values.

**Signature**

```ts
export declare const flatMapNullable: {
  <A, B>(f: (a: A) => B | null | undefined): (self: Option<A>) => Option<NonNullable<B>>
  <A, B>(self: Option<A>, f: (a: A) => B | null | undefined): Option<NonNullable<B>>
}
```

**Example**

```ts
import { some, none, flatMapNullable } from '@fp-ts/core/Option'
import { pipe } from '@fp-ts/core/Function'

interface Employee {
  company?: {
    address?: {
      street?: {
        name?: string
      }
    }
  }
}

const employee1: Employee = { company: { address: { street: { name: 'high street' } } } }

assert.deepStrictEqual(
  pipe(
    some(employee1),
    flatMapNullable((employee) => employee.company?.address?.street?.name)
  ),
  some('high street')
)

const employee2: Employee = { company: { address: { street: {} } } }

assert.deepStrictEqual(
  pipe(
    some(employee2),
    flatMapNullable((employee) => employee.company?.address?.street?.name)
  ),
  none()
)
```

Added in v1.0.0

## flatten

**Signature**

```ts
export declare const flatten: <A>(self: Option<Option<A>>) => Option<A>
```

Added in v1.0.0

## tap

Applies the provided function `f` to the value of the `Option` if it is `Some` and returns the original `Option`
unless `f` returns `None`, in which case it returns `None`.

This function is useful for performing additional computations on the value of the input `Option` without affecting its value.

**Signature**

```ts
export declare const tap: {
  <A, _>(self: Option<A>, f: (a: A) => Option<_>): Option<A>
  <A, _>(f: (a: A) => Option<_>): (self: Option<A>) => Option<A>
}
```

Added in v1.0.0

# sorting

## getOrder

The `Order` instance allows `Option` values to be compared with
`compare`, whenever there is an `Order` instance for
the type the `Option` contains.

`None` is considered to be less than any `Some` value.

**Signature**

```ts
export declare const getOrder: <A>(O: Order<A>) => Order<Option<A>>
```

**Example**

```ts
import { none, some, getOrder } from '@fp-ts/core/Option'
import * as N from '@fp-ts/core/Number'
import { pipe } from '@fp-ts/core/Function'

const O = getOrder(N.Order)
assert.deepStrictEqual(O.compare(none(), none()), 0)
assert.deepStrictEqual(O.compare(none(), some(1)), -1)
assert.deepStrictEqual(O.compare(some(1), none()), 1)
assert.deepStrictEqual(O.compare(some(1), some(2)), -1)
assert.deepStrictEqual(O.compare(some(1), some(1)), 0)
```

Added in v1.0.0

# traversing

## sequence

**Signature**

```ts
export declare const sequence: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <R, O, E, A>(self: Option<Kind<F, R, O, E, A>>) => Kind<F, R, O, E, Option<A>>
```

Added in v1.0.0

## traverse

**Signature**

```ts
export declare const traverse: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <A, R, O, E, B>(f: (a: A) => Kind<F, R, O, E, B>): (self: Option<A>) => Kind<F, R, O, E, Option<B>>
  <A, R, O, E, B>(self: Option<A>, f: (a: A) => Kind<F, R, O, E, B>): Kind<F, R, O, E, Option<B>>
}
```

Added in v1.0.0

## traverseTap

**Signature**

```ts
export declare const traverseTap: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <A, R, O, E, B>(self: Option<A>, f: (a: A) => Kind<F, R, O, E, B>): Kind<F, R, O, E, Option<A>>
  <A, R, O, E, B>(f: (a: A) => Kind<F, R, O, E, B>): (self: Option<A>) => Kind<F, R, O, E, Option<A>>
}
```

Added in v1.0.0

# type lambdas

## OptionTypeLambda (interface)

**Signature**

```ts
export interface OptionTypeLambda extends TypeLambda {
  readonly type: Option<this['Target']>
}
```

Added in v1.0.0

# utils

## Of

**Signature**

```ts
export declare const Of: of_.Of<OptionTypeLambda>
```

Added in v1.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<OptionTypeLambda>
```

Added in v1.0.0

## appendElement

Appends an element to the end of a tuple.

**Signature**

```ts
export declare const appendElement: {
  <A extends readonly any[], B>(self: Option<A>, that: Option<B>): Option<[...A, B]>
  <B>(that: Option<B>): <A extends readonly any[]>(self: Option<A>) => Option<[...A, B]>
}
```

Added in v1.0.0

## contains

Returns a function that checks if an `Option` contains a given value using a provided `Equivalence` instance.

**Signature**

```ts
export declare const contains: <A>(isEquivalent: (self: A, that: A) => boolean) => {
  (a: A): (self: Option<A>) => boolean
  (self: Option<A>, a: A): boolean
}
```

**Example**

```ts
import { some, none, contains } from '@fp-ts/core/Option'
import { Equivalence } from '@fp-ts/core/Number'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe(some(2), contains(Equivalence)(2)), true)
assert.deepStrictEqual(pipe(some(1), contains(Equivalence)(2)), false)
assert.deepStrictEqual(pipe(none(), contains(Equivalence)(2)), false)
```

Added in v1.0.0

## exists

Check if a value in an `Option` type meets a certain predicate.

**Signature**

```ts
export declare const exists: {
  <A>(predicate: Predicate<A>): (self: Option<A>) => boolean
  <A>(self: Option<A>, predicate: Predicate<A>): boolean
}
```

**Example**

```ts
import { some, none, exists } from '@fp-ts/core/Option'
import { pipe } from '@fp-ts/core/Function'

const isEven = (n: number) => n % 2 === 0

assert.deepStrictEqual(pipe(some(2), exists(isEven)), true)
assert.deepStrictEqual(pipe(some(1), exists(isEven)), false)
assert.deepStrictEqual(pipe(none(), exists(isEven)), false)
```

Added in v1.0.0

## struct

**Signature**

```ts
export declare const struct: <R extends Record<string, Option<any>>>(
  r: R
) => Option<{ [K in keyof R]: [R[K]] extends [Option<infer A>] ? A : never }>
```

Added in v1.0.0

## tuple

**Signature**

```ts
export declare const tuple: <T extends readonly Option<any>[]>(
  ...tuple: T
) => Option<{ [I in keyof T]: [T[I]] extends [Option<infer A>] ? A : never }>
```

Added in v1.0.0

## unit

**Signature**

```ts
export declare const unit: Option<void>
```

Added in v1.0.0
