---
title: Option.ts
nav_order: 9
parent: Modules
---

## Option overview

The `Option` type can be interpreted in a few ways:

1. `Option<A>` is a container for an optional value of type `A`. If the value of type `A` is present, the `Option<A>` is
   an instance of `Some<A>`, containing the present value of type `A`. If the value is absent, the `Option<A>` is an
   instance of `None`.
2. Another way to view `Option` is as a representation of a possibly failing computation.
3. An option can also be thought of as a collection or foldable structure with either one or zero elements.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combining](#combining)
  - [getFirstNoneMonoid](#getfirstnonemonoid)
  - [getFirstNoneSemigroup](#getfirstnonesemigroup)
  - [getFirstSomeSemigroup](#getfirstsomesemigroup)
- [constructors](#constructors)
  - [none](#none)
  - [of](#of)
  - [some](#some)
- [conversions](#conversions)
  - [fromEither](#fromeither)
  - [fromIterable](#fromiterable)
  - [fromNullable](#fromnullable)
  - [getOrNull](#getornull)
  - [getOrUndefined](#getorundefined)
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
  - [catchAll](#catchall)
  - [firstSomeOf](#firstsomeof)
  - [getOrElse](#getorelse)
  - [orElse](#orelse)
  - [orElseEither](#orelseeither)
  - [orElseSucceed](#orelsesucceed)
- [filtering](#filtering)
  - [compact](#compact)
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
- [interop](#interop)
  - [fromThrowable](#fromthrowable)
  - [getOrThrow](#getorthrow)
  - [liftThrowable](#liftthrowable)
- [lifting](#lifting)
  - [getMonoid](#getmonoid)
  - [lift2](#lift2)
  - [lift3](#lift3)
  - [liftEither](#lifteither)
  - [liftNullable](#liftnullable)
  - [liftPredicate](#liftpredicate)
- [mapping](#mapping)
  - [as](#as)
  - [asUnit](#asunit)
  - [flap](#flap)
  - [imap](#imap)
  - [map](#map)
- [models](#models)
  - [None (type alias)](#none-type-alias)
  - [Option (type alias)](#option-type-alias)
  - [Some (type alias)](#some-type-alias)
- [pattern matching](#pattern-matching)
  - [match](#match)
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
  - [struct](#struct)
  - [tap](#tap)
  - [toArray](#toarray)
  - [tuple](#tuple)
  - [tupled](#tupled)
  - [unit](#unit)

---

# combining

## getFirstNoneMonoid

Monoid returning the left-most `None` value. If both operands are `Right`s then the inner values
are concatenated using the provided `Monoid`.

The `empty` value is `some(M.empty)`.

**Signature**

```ts
export declare const getFirstNoneMonoid: <A>(M: any) => any
```

Added in v1.0.0

## getFirstNoneSemigroup

Semigroup returning the left-most `None` value. If both operands are `Right`s then the inner values
are concatenated using the provided `Semigroup`.

**Signature**

```ts
export declare const getFirstNoneSemigroup: <A>(S: any) => any
```

Added in v1.0.0

## getFirstSomeSemigroup

Semigroup returning the left-most `Some` value.

**Signature**

```ts
export declare const getFirstSomeSemigroup: <A>() => any
```

Added in v1.0.0

# constructors

## none

**Signature**

```ts
export declare const none: <A = never>() => Option<A>
```

Added in v1.0.0

## of

**Signature**

```ts
export declare const of: <A>(a: A) => Option<A>
```

Added in v1.0.0

## some

**Signature**

```ts
export declare const some: <A>(a: A) => Option<A>
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

**Signature**

```ts
export declare const fromIterable: <A>(collection: Iterable<A>) => Option<A>
```

Added in v1.0.0

## fromNullable

Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
returns the value wrapped in a `Some`.

**Signature**

```ts
export declare const fromNullable: <A>(a: A) => Option<NonNullable<A>>
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

Extracts the value out of the structure, if it exists. Otherwise returns `null`.

**Signature**

```ts
export declare const getOrNull: <A>(self: Option<A>) => A | null
```

**Example**

```ts
import { some, none, getOrNull } from '@fp-ts/core/Option'
import { pipe } from '@fp-ts/core/Function'

assert.strictEqual(pipe(some(1), getOrNull), 1)
assert.strictEqual(pipe(none(), getOrNull), null)
```

Added in v1.0.0

## getOrUndefined

Extracts the value out of the structure, if it exists. Otherwise returns `undefined`.

**Signature**

```ts
export declare const getOrUndefined: <A>(self: Option<A>) => A | undefined
```

**Example**

```ts
import { some, none, getOrUndefined } from '@fp-ts/core/Option'
import { pipe } from '@fp-ts/core/Function'

assert.strictEqual(pipe(some(1), getOrUndefined), 1)
assert.strictEqual(pipe(none(), getOrUndefined), undefined)
```

Added in v1.0.0

## toEither

**Signature**

```ts
export declare const toEither: <E>(onNone: any) => <A>(self: Option<A>) => any
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

**Signature**

```ts
export declare const inspectNone: (onNone: () => void) => <A>(self: Option<A>) => Option<A>
```

Added in v1.0.0

## inspectSome

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

## catchAll

Lazy version of `orElse`.

**Signature**

```ts
export declare const catchAll: <B>(that: any) => <A>(self: Option<A>) => Option<B | A>
```

Added in v1.0.0

## firstSomeOf

**Signature**

```ts
export declare const firstSomeOf: <A>(collection: Iterable<Option<A>>) => (self: Option<A>) => Option<A>
```

Added in v1.0.0

## getOrElse

Extracts the value out of the structure, if it exists. Otherwise returns the given default value

**Signature**

```ts
export declare const getOrElse: <B>(onNone: any) => <A>(self: Option<A>) => B | A
```

**Example**

```ts
import { some, none, getOrElse } from '@fp-ts/core/Option'
import { pipe } from '@fp-ts/core/Function'

assert.strictEqual(
  pipe(
    some(1),
    getOrElse(() => 0)
  ),
  1
)
assert.strictEqual(
  pipe(
    none(),
    getOrElse(() => 0)
  ),
  0
)
```

Added in v1.0.0

## orElse

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

In case of `Option` returns the left-most non-`None` value.

| x       | y       | pipe(x, orElse(y) |
| ------- | ------- | ----------------- |
| none    | none    | none              |
| some(a) | none    | some(a)           |
| none    | some(b) | some(b)           |
| some(a) | some(b) | some(a)           |

**Signature**

```ts
export declare const orElse: <B>(that: Option<B>) => <A>(self: Option<A>) => Option<B | A>
```

**Example**

```ts
import * as O from '@fp-ts/core/Option'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe(O.none(), O.orElse(O.none())), O.none())
assert.deepStrictEqual(pipe(O.some('a'), O.orElse<string>(O.none())), O.some('a'))
assert.deepStrictEqual(pipe(O.none(), O.orElse(O.some('b'))), O.some('b'))
assert.deepStrictEqual(pipe(O.some('a'), O.orElse(O.some('b'))), O.some('a'))
```

Added in v1.0.0

## orElseEither

Returns an effect that will produce the value of this effect, unless it
fails, in which case, it will produce the value of the specified effect.

**Signature**

```ts
export declare const orElseEither: <B>(that: Option<B>) => <A>(self: Option<A>) => Option<any>
```

Added in v1.0.0

## orElseSucceed

Executes this effect and returns its value, if it succeeds, but otherwise
succeeds with the specified value.

**Signature**

```ts
export declare const orElseSucceed: <B>(onNone: () => B) => <A>(self: Option<A>) => Option<B | A>
```

Added in v1.0.0

# filtering

## compact

Alias of `flatten`.

**Signature**

```ts
export declare const compact: <A>(self: Option<Option<A>>) => Option<A>
```

Added in v1.0.0

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

assert.strictEqual(isNone(some(1)), false)
assert.strictEqual(isNone(none()), true)
```

Added in v1.0.0

## isOption

Returns `true` if the specified value is an instance of `Option`, `false`
otherwise.

**Signature**

```ts
export declare const isOption: (u: unknown) => u is Option<unknown>
```

**Example**

```ts
import { some, none, isOption } from '@fp-ts/core/Option'

assert.strictEqual(isOption(some(1)), true)
assert.strictEqual(isOption(none()), true)
assert.strictEqual(isOption({}), false)
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

assert.strictEqual(isSome(some(1)), true)
assert.strictEqual(isSome(none()), false)
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

## getOrThrow

**Signature**

```ts
export declare const getOrThrow: (onError: any) => <A>(self: Option<A>) => A
```

Added in v1.0.0

## liftThrowable

Lifts a function that may throw to one returning a `Option`.

**Signature**

```ts
export declare const liftThrowable: <A extends readonly unknown[], B>(f: (...a: A) => B) => (...a: A) => Option<B>
```

Added in v1.0.0

# lifting

## getMonoid

Monoid returning the left-most non-`None` value. If both operands are `Some`s then the inner values are
combined using the provided `Semigroup`

| x       | y       | combine(y)(x)       |
| ------- | ------- | ------------------- |
| none    | none    | none                |
| some(a) | none    | some(a)             |
| none    | some(a) | some(a)             |
| some(a) | some(b) | some(combine(b)(a)) |

**Signature**

```ts
export declare const getMonoid: <A>(Semigroup: any) => any
```

**Example**

```ts
import { getMonoid, some, none } from '@fp-ts/core/Option'
import * as N from '@fp-ts/core/Number'
import { pipe } from '@fp-ts/core/Function'

const M = getMonoid(N.SemigroupSum)
assert.deepStrictEqual(M.combine(none(), none()), none())
assert.deepStrictEqual(M.combine(some(1), none()), some(1))
assert.deepStrictEqual(M.combine(none(), some(1)), some(1))
assert.deepStrictEqual(M.combine(some(1), some(2)), some(3))
```

Added in v1.0.0

## lift2

Lifts a binary function into `Option`.

**Signature**

```ts
export declare const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: Option<A>, fb: Option<B>) => Option<C>
```

Added in v1.0.0

## lift3

Lifts a ternary function into `Option`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => (fa: Option<A>, fb: Option<B>, fc: Option<C>) => Option<D>
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

Maps the success value of this effect to the specified constant value.

**Signature**

```ts
export declare const as: <B>(b: B) => <_>(self: Option<_>) => Option<B>
```

Added in v1.0.0

## asUnit

Returns the effect resulting from mapping the success of this effect to unit.

**Signature**

```ts
export declare const asUnit: <_>(self: Option<_>) => Option<void>
```

Added in v1.0.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: Option<(a: A) => B>) => Option<B>
```

Added in v1.0.0

## imap

**Signature**

```ts
export declare const imap: any
```

Added in v1.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (self: Option<A>) => Option<B>
```

Added in v1.0.0

# models

## None (type alias)

**Signature**

```ts
export type None = {
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

## Some (type alias)

**Signature**

```ts
export type Some<A> = {
  readonly _tag: 'Some'
  readonly value: A
}
```

Added in v1.0.0

# pattern matching

## match

Takes a (lazy) default value, a function, and an `Option` value, if the `Option` value is `None` the default value is
returned, otherwise the function is applied to the value inside the `Some` and the result is returned.

**Signature**

```ts
export declare const match: <B, A, C = B>(onNone: any, onSome: (a: A) => C) => (self: Option<A>) => B | C
```

**Example**

```ts
import { some, none, match } from '@fp-ts/core/Option'
import { pipe } from '@fp-ts/core/Function'

assert.strictEqual(
  pipe(
    some(1),
    match(
      () => 'a none',
      (a) => `a some containing ${a}`
    )
  ),
  'a some containing 1'
)

assert.strictEqual(
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

## andThenDiscard

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const andThenDiscard: <_>(that: Option<_>) => <A>(self: Option<A>) => Option<A>
```

Added in v1.0.0

## flatMap

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
assert.strictEqual(O.compare(none(), none()), 0)
assert.strictEqual(O.compare(none(), some(1)), -1)
assert.strictEqual(O.compare(some(1), none()), 1)
assert.strictEqual(O.compare(some(1), some(2)), -1)
assert.strictEqual(O.compare(some(1), some(1)), 0)
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

assert.strictEqual(
  pipe(
    some(1),
    exists((n) => n > 0)
  ),
  true
)
assert.strictEqual(
  pipe(
    some(1),
    exists((n) => n > 1)
  ),
  false
)
assert.strictEqual(
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

## struct

**Signature**

```ts
export declare const struct: <R extends Record<string, Option<any>>>(
  r: R
) => Option<{ [K in keyof R]: [R[K]] extends [Option<infer A>] ? A : never }>
```

Added in v1.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A, _>(f: (a: A) => Option<_>) => (self: Option<A>) => Option<A>
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
