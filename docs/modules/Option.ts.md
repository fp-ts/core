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
  - [multiplyAll](#multiplyall)
  - [multiplyBigint](#multiplybigint)
  - [subtract](#subtract)
  - [subtractBigint](#subtractbigint)
  - [sum](#sum)
  - [sumAll](#sumall)
  - [sumBigint](#sumbigint)
- [combinators](#combinators)
  - [tap](#tap)
- [constructors](#constructors)
  - [none](#none)
  - [some](#some)
- [conversions](#conversions)
  - [fromEither](#fromeither)
  - [fromIterable](#fromiterable)
  - [fromNullable](#fromnullable)
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
- [error handling](#error-handling)
  - [firstSomeOf](#firstsomeof)
  - [getOrElse](#getorelse)
  - [orElse](#orelse)
  - [orElseEither](#orelseeither)
- [filtering](#filtering)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [separate](#separate)
- [guards](#guards)
  - [isNone](#isnone)
  - [isOption](#isoption)
  - [isSome](#issome)
- [instances](#instances)
  - [Alternative](#alternative)
  - [Applicative](#applicative)
  - [Chainable](#chainable)
  - [Compactable](#compactable)
  - [Coproduct](#coproduct)
  - [Covariant](#covariant)
  - [Filterable](#filterable)
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
  - [getFailureMonoid](#getfailuremonoid)
  - [getFailureSemigroup](#getfailuresemigroup)
  - [getFirstSomeSemigroup](#getfirstsomesemigroup)
- [interop](#interop)
  - [fromThrowable](#fromthrowable)
  - [getOrNull](#getornull)
  - [getOrThrow](#getorthrow)
  - [getOrUndefined](#getorundefined)
  - [liftThrowable](#liftthrowable)
- [lifting](#lifting)
  - [getOptionalMonoid](#getoptionalmonoid)
  - [lift2](#lift2)
  - [liftEither](#lifteither)
  - [liftNullable](#liftnullable)
  - [liftPredicate](#liftpredicate)
- [mapping](#mapping)
  - [as](#as)
  - [asUnit](#asunit)
  - [flap](#flap)
  - [map](#map)
- [models](#models)
  - [None (interface)](#none-interface)
  - [Option (type alias)](#option-type-alias)
  - [Some (interface)](#some-interface)
- [pattern matching](#pattern-matching)
  - [match](#match)
- [products](#products)
  - [zipWith](#zipwith)
- [sequencing](#sequencing)
  - [andThenDiscard](#andthendiscard)
  - [flatMap](#flatmap)
  - [flatMapEither](#flatmapeither)
  - [flatMapNullable](#flatmapnullable)
- [sorting](#sorting)
  - [liftOrder](#liftorder)
- [traversing](#traversing)
  - [sequence](#sequence)
  - [traverse](#traverse)
  - [traverseTap](#traversetap)
- [type lambdas](#type-lambdas)
  - [OptionTypeLambda (interface)](#optiontypelambda-interface)
- [utils](#utils)
  - [andThen](#andthen)
  - [ap](#ap)
  - [composeKleisliArrow](#composekleisliarrow)
  - [contains](#contains)
  - [coproductEither](#coproducteither)
  - [element](#element)
  - [exists](#exists)
  - [flatten](#flatten)
  - [of](#of)
  - [reduce](#reduce)
  - [reduceAll](#reduceall)
  - [struct](#struct)
  - [toArray](#toarray)
  - [tuple](#tuple)
  - [tupled](#tupled)
  - [unit](#unit)

---

# algebraic operations

## divide

**Signature**

```ts
export declare const divide: (that: Option<unknown>) => (self: Option<unknown>) => Option<unknown>
```

Added in v1.0.0

## multiply

**Signature**

```ts
export declare const multiply: (that: Option<unknown>) => (self: Option<unknown>) => Option<unknown>
```

Added in v1.0.0

## multiplyAll

**Signature**

```ts
export declare const multiplyAll: (self: Iterable<Option<number>>) => number
```

Added in v1.0.0

## multiplyBigint

**Signature**

```ts
export declare const multiplyBigint: (that: Option<unknown>) => (self: Option<unknown>) => Option<unknown>
```

Added in v1.0.0

## subtract

**Signature**

```ts
export declare const subtract: (that: Option<unknown>) => (self: Option<unknown>) => Option<unknown>
```

Added in v1.0.0

## subtractBigint

**Signature**

```ts
export declare const subtractBigint: (that: Option<unknown>) => (self: Option<unknown>) => Option<unknown>
```

Added in v1.0.0

## sum

**Signature**

```ts
export declare const sum: (that: Option<unknown>) => (self: Option<unknown>) => Option<unknown>
```

Added in v1.0.0

## sumAll

**Signature**

```ts
export declare const sumAll: (self: Iterable<Option<number>>) => number
```

Added in v1.0.0

## sumBigint

**Signature**

```ts
export declare const sumBigint: (that: Option<unknown>) => (self: Option<unknown>) => Option<unknown>
```

Added in v1.0.0

# combinators

## tap

Applies the provided function `f` to the value of the `Option` if it is `Some` and returns the original `Option`
unless `f` returns `None`, in which case it returns `None`.

This function is useful for performing additional computations on the value of the input `Option` without affecting its value.

**Signature**

```ts
export declare const tap: <A, _>(f: (a: A) => Option<_>) => (self: Option<A>) => Option<A>
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
export declare const fromEither: <E, A>(self: any) => Option<A>
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

## toEither

Converts an `Option` to an `Either`, allowing you to provide a value to be used in the case of a `None`.

**Signature**

```ts
export declare const toEither: <E>(onNone: any) => <A>(self: Option<A>) => any
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
export declare const toRefinement: <A, B extends A>(f: (a: A) => Option<B>) => any
```

Added in v1.0.0

# debugging

## inspectNone

Useful for debugging purposes, the `onNone` callback is is called if `self` is a `None`.

**Signature**

```ts
export declare const inspectNone: (onNone: () => void) => <A>(self: Option<A>) => Option<A>
```

Added in v1.0.0

## inspectSome

Useful for debugging purposes, the `onSome` callback is called with the value of `self` if it is a `Some`.

**Signature**

```ts
export declare const inspectSome: <A>(onSome: (a: A) => void) => (self: Option<A>) => Option<A>
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
export declare const andThenBind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  that: Option<B>
) => (self: Option<A>) => Option<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v1.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Option<B>
) => (self: Option<A>) => Option<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v1.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(name: N) => <A>(self: Option<A>) => Option<{ [K in N]: A }>
```

Added in v1.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: Option<A>) => Option<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v1.0.0

# error handling

## firstSomeOf

Given an Iterable collection of `Option`s, the function returns the first `Some` option found in the collection.

**Signature**

```ts
export declare const firstSomeOf: <A>(collection: Iterable<Option<A>>) => Option<A>
```

Added in v1.0.0

## getOrElse

Returns the value of the `Option` if it is `Some`, otherwise returns `onNone`

**Signature**

```ts
export declare const getOrElse: <B>(onNone: any) => <A>(self: Option<A>) => B | A
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

Returns the provided option `that` if `self` is `None`, otherwise returns `self`.

**Signature**

```ts
export declare const orElse: <B>(that: any) => <A>(self: Option<A>) => Option<B | A>
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
which contains information about which of the two options has been chosen.

This is useful when it's important to know whether the value was retrieved from the first option or the second option.

**Signature**

```ts
export declare const orElseEither: <B>(that: any) => <A>(self: Option<A>) => Option<any>
```

Added in v1.0.0

# filtering

## filter

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, A = C>(refinement: any): (fc: Option<C>) => Option<B>
  <B extends A, A = B>(predicate: any): (fb: Option<B>) => Option<B>
}
```

Added in v1.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => Option<B>) => (self: Option<A>) => Option<B>
```

Added in v1.0.0

## separate

**Signature**

```ts
export declare const separate: <A, B>(self: Option<any>) => [Option<A>, Option<B>]
```

Added in v1.0.0

# guards

## isNone

Returns `true` if the option is `None`, `false` otherwise.

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
export declare const isOption: (input: unknown) => input is Option<unknown>
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

Returns `true` if the option is an instance of `Some`, `false` otherwise.

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
export declare const Alternative: any
```

Added in v1.0.0

## Applicative

**Signature**

```ts
export declare const Applicative: any
```

Added in v1.0.0

## Chainable

**Signature**

```ts
export declare const Chainable: any
```

Added in v1.0.0

## Compactable

**Signature**

```ts
export declare const Compactable: any
```

Added in v1.0.0

## Coproduct

**Signature**

```ts
export declare const Coproduct: any
```

Added in v1.0.0

## Covariant

**Signature**

```ts
export declare const Covariant: any
```

Added in v1.0.0

## Filterable

**Signature**

```ts
export declare const Filterable: any
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

## getFailureMonoid

Monoid that models the combination of computations that can fail, if at least one element is `None`
then the resulting combination is `None`, otherwise if all elements are `Some` then the resulting combination
is the combination of the wrapped elements using the provided `Monoid`.

The `empty` value is `some(M.empty)`.

See also `getFailureSemigroup` if you need a `Semigroup` instead of a `Monoid`.

**Signature**

```ts
export declare const getFailureMonoid: <A>(M: any) => any
```

Added in v1.0.0

## getFailureSemigroup

Semigroup that models the combination of computations that can fail, if at least one element is `None`
then the resulting combination is `None`, otherwise if all elements are `Some` then the resulting combination
is the combination of the wrapped elements using the provided `Semigroup`.

See also `getFailureMonoid` if you need a `Monoid` instead of a `Semigroup`.

**Signature**

```ts
export declare const getFailureSemigroup: <A>(S: any) => any
```

Added in v1.0.0

## getFirstSomeSemigroup

Semigroup returning the first `Some` value encountered.

**Signature**

```ts
export declare const getFirstSomeSemigroup: <A>() => any
```

Added in v1.0.0

# interop

## fromThrowable

Converts an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in a
`Some`.

**Signature**

```ts
export declare const fromThrowable: <A>(f: () => A) => Option<A>
```

**Example**

```ts
import { none, some, fromThrowable } from '@fp-ts/core/Option'

assert.deepStrictEqual(
  fromThrowable(() => {
    throw new Error()
  }),
  none()
)
assert.deepStrictEqual(
  fromThrowable(() => 1),
  some(1)
)
```

Added in v1.0.0

## getOrNull

Returns the value of the option if it is a `Some`, otherwise returns `null`.

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

Returns the contained value if the option is `Some`, otherwise throws an error.

**Signature**

```ts
export declare const getOrThrow: (onNone?: any) => <A>(self: Option<A>) => A
```

**Example**

```ts
import { pipe } from '@fp-ts/core/Function'
import * as O from '@fp-ts/core/Option'

assert.deepStrictEqual(pipe(O.some(1), O.getOrThrow()), 1)
assert.throws(() => pipe(O.none(), O.getOrThrow()))
```

Added in v1.0.0

## getOrUndefined

Returns the value of the option if it is a `Some`, otherwise returns `undefined`.

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

## liftThrowable

A utility function that lifts a function that throws exceptions into a function that returns an `Option`.

**Signature**

```ts
export declare const liftThrowable: <A extends readonly unknown[], B>(f: (...a: A) => B) => (...a: A) => Option<B>
```

Added in v1.0.0

# lifting

## getOptionalMonoid

Monoid that models the combination of values that may be absent, elements that are `None` are ignored
while elements that are `Some` are combined using the provided `Semigroup`.

**Signature**

```ts
export declare const getOptionalMonoid: <A>(Semigroup: any) => any
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

## lift2

Applies a function to the contained value of two options, returning a new `option` of the result.
If either of the options is `None`, the result will be `None`.

**Signature**

```ts
export declare const lift2: <A, B, C>(f: (a: A) => (b: B) => C) => (that: Option<A>) => (self: Option<B>) => Option<C>
```

Added in v1.0.0

## liftEither

**Signature**

```ts
export declare const liftEither: <A extends readonly unknown[], E, B>(f: (...a: A) => any) => (...a: A) => Option<B>
```

Added in v1.0.0

## liftNullable

Returns a _smart constructor_ from a function that returns a nullable value.

**Signature**

```ts
export declare const liftNullable: <A extends readonly unknown[], B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => Option<NonNullable<B>>
```

**Example**

```ts
import { liftNullable, none, some } from '@fp-ts/core/Option'

const f = (s: string): number | undefined => {
  const n = parseFloat(s)
  return isNaN(n) ? undefined : n
}

const g = liftNullable(f)

assert.deepStrictEqual(g('1'), some(1))
assert.deepStrictEqual(g('a'), none())
```

Added in v1.0.0

## liftPredicate

Returns a _smart constructor_ based on the given predicate.

**Signature**

```ts
export declare const liftPredicate: {
  <C extends A, B extends A, A = C>(refinement: any): (c: C) => Option<B>
  <B extends A, A = B>(predicate: any): (b: B) => Option<B>
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

## as

Maps the `Some` value of this option to the specified constant value.

**Signature**

```ts
export declare const as: <B>(b: B) => <_>(self: Option<_>) => Option<B>
```

Added in v1.0.0

## asUnit

Returns the `Option` resulting from mapping the `Some` value to `void`.

This is useful when the value of the Option is not needed, but the presence or absence of the value is important.

**Signature**

```ts
export declare const asUnit: <_>(self: Option<_>) => Option<void>
```

Added in v1.0.0

## flap

**Signature**

```ts
export declare const flap: <A, B>(self: Option<(a: A) => B>) => (a: A) => Option<B>
```

Added in v1.0.0

## map

Maps the given function to the value of the `Option` if it is a `Some`, otherwise it returns `None`.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (self: Option<A>) => Option<B>
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
export declare const match: <B, A, C = B>(onNone: any, onSome: (a: A) => C) => (self: Option<A>) => B | C
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

# products

## zipWith

Zips two `Option` values together using a provided function, returning a new `Option` of the result.

**Signature**

```ts
export declare const zipWith: <B, A, C>(fb: Option<B>, f: (a: A, b: B) => C) => (fa: Option<A>) => Option<C>
```

Added in v1.0.0

# sequencing

## andThenDiscard

Sequences the specified `that` option but ignores its value.

It is useful when we want to chain multiple operations, but only care about the result of `self`.

**Signature**

```ts
export declare const andThenDiscard: <_>(that: Option<_>) => <A>(self: Option<A>) => Option<A>
```

Added in v1.0.0

## flatMap

Applies a function to the value of an `Option` and flattens the result, if the input is `Some`.

**Signature**

```ts
export declare const flatMap: <A, B>(f: (a: A) => Option<B>) => (self: Option<A>) => Option<B>
```

Added in v1.0.0

## flatMapEither

**Signature**

```ts
export declare const flatMapEither: <A, E, B>(f: (a: A) => any) => (self: Option<A>) => Option<B>
```

Added in v1.0.0

## flatMapNullable

This is `flatMap` + `fromNullable`, useful when working with optional values.

**Signature**

```ts
export declare const flatMapNullable: <A, B>(
  f: (a: A) => B | null | undefined
) => (self: Option<A>) => Option<NonNullable<B>>
```

**Example**

```ts
import { some, none, fromNullable, flatMapNullable } from '@fp-ts/core/Option'
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
    fromNullable(employee1.company),
    flatMapNullable((company) => company.address),
    flatMapNullable((address) => address.street),
    flatMapNullable((street) => street.name)
  ),
  some('high street')
)

const employee2: Employee = { company: { address: { street: {} } } }

assert.deepStrictEqual(
  pipe(
    fromNullable(employee2.company),
    flatMapNullable((company) => company.address),
    flatMapNullable((address) => address.street),
    flatMapNullable((street) => street.name)
  ),
  none()
)
```

Added in v1.0.0

# sorting

## liftOrder

The `Order` instance allows `Option` values to be compared with
`compare`, whenever there is an `Order` instance for
the type the `Option` contains.

`None` is considered to be less than any `Some` value.

**Signature**

```ts
export declare const liftOrder: <A>(O: any) => any
```

**Example**

```ts
import { none, some, liftOrder } from '@fp-ts/core/Option'
import * as N from '@fp-ts/core/Number'
import { pipe } from '@fp-ts/core/Function'

const O = liftOrder(N.Order)
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
export declare const sequence: <F extends any>(F: any) => <R, O, E, A>(fas: Option<any>) => any
```

Added in v1.0.0

## traverse

**Signature**

```ts
export declare const traverse: <F extends any>(F: any) => <A, R, O, E, B>(f: (a: A) => any) => (self: Option<A>) => any
```

Added in v1.0.0

## traverseTap

**Signature**

```ts
export declare const traverseTap: <F extends any>(
  F: any
) => <A, R, O, E, B>(f: (a: A) => any) => (self: Option<A>) => any
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

## andThen

**Signature**

```ts
export declare const andThen: <B>(that: Option<B>) => <_>(self: Option<_>) => Option<B>
```

Added in v1.0.0

## ap

**Signature**

```ts
export declare const ap: <A>(fa: Option<A>) => <B>(self: Option<(a: A) => B>) => Option<B>
```

Added in v1.0.0

## composeKleisliArrow

**Signature**

```ts
export declare const composeKleisliArrow: <B, C>(
  bfc: (b: B) => Option<C>
) => <A>(afb: (a: A) => Option<B>) => (a: A) => Option<C>
```

Added in v1.0.0

## contains

Returns a function that checks if an `Option` contains a given value using a provided `equivalence` function.

**Signature**

```ts
export declare const contains: <A>(equivalence: any) => (a: A) => (self: Option<A>) => boolean
```

Added in v1.0.0

## coproductEither

**Signature**

```ts
export declare const coproductEither: <B>(that: Option<B>) => <A>(self: Option<A>) => Option<any>
```

Added in v1.0.0

## element

Adds an element to the end of a tuple.

**Signature**

```ts
export declare const element: <B>(fb: Option<B>) => <A extends readonly unknown[]>(self: Option<A>) => Option<[...A, B]>
```

Added in v1.0.0

## exists

Returns `true` if the predicate is satisfied by the wrapped value

**Signature**

```ts
export declare const exists: <A>(predicate: any) => (self: Option<A>) => boolean
```

**Example**

```ts
import { some, none, exists } from '@fp-ts/core/Option'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(
  pipe(
    some(1),
    exists((n) => n > 0)
  ),
  true
)
assert.deepStrictEqual(
  pipe(
    some(1),
    exists((n) => n > 1)
  ),
  false
)
assert.deepStrictEqual(
  pipe(
    none(),
    exists((n) => n > 0)
  ),
  false
)
```

Added in v1.0.0

## flatten

**Signature**

```ts
export declare const flatten: <A>(self: Option<Option<A>>) => Option<A>
```

Added in v1.0.0

## of

**Signature**

```ts
export declare const of: <A>(a: A) => Option<A>
```

Added in v1.0.0

## reduce

**Signature**

```ts
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (self: Option<A>) => B
```

Added in v1.0.0

## reduceAll

Reduces an `Iterable` of `Option<A>` to a single value of type `B`, elements that are `None` are ignored.

**Signature**

```ts
export declare const reduceAll: <B, A>(b: B, f: (b: B, a: A) => B) => (self: Iterable<Option<A>>) => B
```

**Example**

```ts
import { some, none, reduceAll } from '@fp-ts/core/Option'
import { pipe } from '@fp-ts/core/Function'

const iterable = [some(1), none(), some(2), none()]
assert.deepStrictEqual(
  pipe(
    iterable,
    reduceAll(0, (b, a) => b + a)
  ),
  3
)
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

## toArray

**Signature**

```ts
export declare const toArray: <A>(self: Option<A>) => A[]
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

## tupled

**Signature**

```ts
export declare const tupled: <A>(self: Option<A>) => Option<[A]>
```

Added in v1.0.0

## unit

**Signature**

```ts
export declare const unit: Option<void>
```

Added in v1.0.0
