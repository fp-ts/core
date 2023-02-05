---
title: Either.ts
nav_order: 3
parent: Modules
---

## Either overview

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
  - [getFirstRightSemigroup](#getfirstrightsemigroup)
  - [zipWith](#zipwith)
- [constructors](#constructors)
  - [left](#left)
  - [of](#of)
  - [right](#right)
- [conversions](#conversions)
  - [fromIterable](#fromiterable)
  - [fromOption](#fromoption)
  - [getLeft](#getleft)
  - [getRight](#getright)
  - [toArray](#toarray)
  - [toOption](#tooption)
  - [toRefinement](#torefinement)
- [debugging](#debugging)
  - [inspectLeft](#inspectleft)
  - [inspectRight](#inspectright)
- [do notation](#do-notation)
  - [Do](#do)
  - [andThenBind](#andthenbind)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [let](#let)
- [equivalence](#equivalence)
  - [getEquivalence](#getequivalence)
- [error handling](#error-handling)
  - [firstRightOf](#firstrightof)
  - [mapLeft](#mapleft)
  - [orElse](#orelse)
  - [orElseEither](#orelseeither)
  - [orElseFail](#orelsefail)
  - [tapError](#taperror)
- [filtering](#filtering)
  - [compact](#compact)
  - [filter](#filter)
  - [filterMap](#filtermap)
- [getters](#getters)
  - [getOrElse](#getorelse)
  - [getOrNull](#getornull)
  - [getOrUndefined](#getorundefined)
  - [lefts](#lefts)
  - [rights](#rights)
- [guards](#guards)
  - [isEither](#iseither)
  - [isLeft](#isleft)
  - [isRight](#isright)
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
  - [tupled](#tupled)
- [models](#models)
  - [Either (type alias)](#either-type-alias)
  - [Left (interface)](#left-interface)
  - [Right (interface)](#right-interface)
- [pattern matching](#pattern-matching)
  - [match](#match)
- [sequencing](#sequencing)
  - [andThenDiscard](#andthendiscard)
  - [flatMap](#flatmap)
  - [flatMapNullable](#flatmapnullable)
  - [flatMapOption](#flatmapoption)
- [traversing](#traversing)
  - [sequence](#sequence)
  - [traverse](#traverse)
  - [traverseTap](#traversetap)
- [type lambdas](#type-lambdas)
  - [EitherTypeLambda (interface)](#eithertypelambda-interface)
- [utils](#utils)
  - [andThen](#andthen)
  - [ap](#ap)
  - [appendElement](#appendelement)
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
  <E1, E2>(self: Either<E1, number>, that: Either<E2, number>): Either<E1 | E2, number>
  <E2>(that: Either<E2, number>): <E1>(self: Either<E1, number>) => Either<E2 | E1, number>
}
```

Added in v1.0.0

## multiply

**Signature**

```ts
export declare const multiply: {
  <E1, E2>(self: Either<E1, number>, that: Either<E2, number>): Either<E1 | E2, number>
  <E2>(that: Either<E2, number>): <E1>(self: Either<E1, number>) => Either<E2 | E1, number>
}
```

Added in v1.0.0

## subtract

**Signature**

```ts
export declare const subtract: {
  <E1, E2>(self: Either<E1, number>, that: Either<E2, number>): Either<E1 | E2, number>
  <E2>(that: Either<E2, number>): <E1>(self: Either<E1, number>) => Either<E2 | E1, number>
}
```

Added in v1.0.0

## sum

**Signature**

```ts
export declare const sum: {
  <E1, E2>(self: Either<E1, number>, that: Either<E2, number>): Either<E1 | E2, number>
  <E2>(that: Either<E2, number>): <E1>(self: Either<E1, number>) => Either<E2 | E1, number>
}
```

Added in v1.0.0

# combinators

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: {
  <E1, A, E2, _>(self: Either<E1, A>, f: (a: A) => Either<E2, _>): Either<E1 | E2, A>
  <A, E2, _>(f: (a: A) => Either<E2, _>): <E1>(self: Either<E1, A>) => Either<E2 | E1, A>
}
```

Added in v1.0.0

# combining

## getFirstLeftMonoid

`Monoid` returning the left-most `Left` value. If both operands are `Right`s then the inner values
are combined using the provided `Monoid`.

- `combine` is provided by {@link getFirstLeftSemigroup}.
- `empty` is `right(M.empty)`

**Signature**

```ts
export declare const getFirstLeftMonoid: <A, E>(M: Monoid<A>) => Monoid<Either<E, A>>
```

Added in v1.0.0

## getFirstLeftSemigroup

`Semigroup` returning the left-most `Left` value. If both operands are `Right`s then the inner values
are combined using the provided `Semigroup`.

```
| self       | that       | combine(self, that)     |
| ---------- | ---------- | ----------------------- |
| left(e1)   | left(e2)   | left(e1)                |
| left(e1)   | right(a2)  | left(e1)                |
| right(a1)  | left(e2)   | left(e2)                |
| right(a1)  | right(a2)  | right(combine(a1, a2))  |
```

**Signature**

```ts
export declare const getFirstLeftSemigroup: <A, E>(S: Semigroup<A>) => Semigroup<Either<E, A>>
```

Added in v1.0.0

## getFirstRightSemigroup

Semigroup returning the left-most `Right` value.

```
| self       | that       | combine(self, that) |
| ---------- | ---------- | ------------------- |
| left(e1)   | left(e2)   | left(e2)            |
| left(e1)   | right(a2)  | right(a2)           |
| right(a1)  | left(e2)   | right(a1)           |
| right(a1)  | right(a2)  | right(a1)           |
```

**Signature**

```ts
export declare const getFirstRightSemigroup: <E, A>() => Semigroup<Either<E, A>>
```

Added in v1.0.0

## zipWith

**Signature**

```ts
export declare const zipWith: {
  <E1, A, E2, B, C>(self: Either<E1, A>, that: Either<E2, B>, f: (a: A, b: B) => C): Either<E1 | E2, C>
  <E2, B, A, C>(that: Either<E2, B>, f: (a: A, b: B) => C): <E1>(self: Either<E1, A>) => Either<E2 | E1, C>
}
```

Added in v1.0.0

# constructors

## left

Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
structure.

**Signature**

```ts
export declare const left: <E>(e: E) => Either<E, never>
```

Added in v1.0.0

## of

Alias of {@link right}.

**Signature**

```ts
export declare const of: <A>(a: A) => Either<never, A>
```

Added in v1.0.0

## right

Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
of this structure.

**Signature**

```ts
export declare const right: <A>(a: A) => Either<never, A>
```

Added in v1.0.0

# conversions

## fromIterable

**Signature**

```ts
export declare const fromIterable: {
  <E>(onEmpty: LazyArg<E>): <A>(collection: Iterable<A>) => Either<E, A>
  <A, E>(collection: Iterable<A>, onEmpty: LazyArg<E>): Either<E, A>
}
```

Added in v1.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: {
  <A, E>(fa: Option<A>, onNone: () => E): Either<E, A>
  <E>(onNone: () => E): <A>(fa: Option<A>) => Either<E, A>
}
```

**Example**

```ts
import * as E from '@fp-ts/core/Either'
import * as O from '@fp-ts/core/Option'

assert.deepStrictEqual(
  E.fromOption(O.some(1), () => 'error'),
  E.right(1)
)
assert.deepStrictEqual(
  E.fromOption(O.none(), () => 'error'),
  E.left('error')
)
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

assert.deepStrictEqual(E.getLeft(E.right('ok')), O.none())
assert.deepStrictEqual(E.getLeft(E.left('err')), O.some('err'))
```

Added in v1.0.0

## getRight

Converts a `Either` to an `Option` discarding the error.

Alias of {@link toOption}.

**Signature**

```ts
export declare const getRight: <E, A>(self: Either<E, A>) => Option<A>
```

**Example**

```ts
import * as O from '@fp-ts/core/Option'
import * as E from '@fp-ts/core/Either'

assert.deepStrictEqual(E.getRight(E.right('ok')), O.some('ok'))
assert.deepStrictEqual(E.getRight(E.left('err')), O.none())
```

Added in v1.0.0

## toArray

Transforms an `Either` into an `Array`.
If the input is `Left`, an empty array is returned.
If the input is `Right`, the value is wrapped in an array.

**Signature**

```ts
export declare const toArray: <E, A>(self: Either<E, A>) => A[]
```

**Example**

```ts
import { right, left, toArray } from '@fp-ts/core/Either'

assert.deepStrictEqual(toArray(right(1)), [1])
assert.deepStrictEqual(toArray(left('error')), [])
```

Added in v1.0.0

## toOption

Converts a `Either` to an `Option` discarding the error.

**Signature**

```ts
export declare const toOption: <E, A>(self: Either<E, A>) => Option<A>
```

**Example**

```ts
import * as O from '@fp-ts/core/Option'
import * as E from '@fp-ts/core/Either'

assert.deepStrictEqual(E.toOption(E.right(1)), O.some(1))
assert.deepStrictEqual(E.toOption(E.left('a')), O.none())
```

Added in v1.0.0

## toRefinement

Returns a `Refinement` from a `Either` returning function.
This function ensures that a `Refinement` definition is type-safe.

**Signature**

```ts
export declare const toRefinement: <A, E, B extends A>(f: (a: A) => Either<E, B>) => Refinement<A, B>
```

Added in v1.0.0

# debugging

## inspectLeft

**Signature**

```ts
export declare const inspectLeft: {
  <E>(onLeft: (e: E) => void): <A>(self: Either<E, A>) => Either<E, A>
  <E, A>(self: Either<E, A>, onLeft: (e: E) => void): Either<E, A>
}
```

Added in v1.0.0

## inspectRight

**Signature**

```ts
export declare const inspectRight: {
  <A>(onRight: (a: A) => void): <E>(self: Either<E, A>) => Either<E, A>
  <E, A>(self: Either<E, A>, onRight: (a: A) => void): Either<E, A>
}
```

Added in v1.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: Either<never, {}>
```

Added in v1.0.0

## andThenBind

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const andThenBind: {
  <N extends string, A extends object, E2, B>(name: Exclude<N, keyof A>, that: Either<E2, B>): <E1>(
    self: Either<E1, A>
  ) => Either<E2 | E1, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <E1, A extends object, N extends string, E2, B>(
    self: Either<E1, A>,
    name: Exclude<N, keyof A>,
    that: Either<E2, B>
  ): Either<E1 | E2, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
}
```

Added in v1.0.0

## bind

**Signature**

```ts
export declare const bind: {
  <N extends string, A extends object, E2, B>(name: Exclude<N, keyof A>, f: (a: A) => Either<E2, B>): <E1>(
    self: Either<E1, A>
  ) => Either<E2 | E1, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <E1, A extends object, N extends string, E2, B>(
    self: Either<E1, A>,
    name: Exclude<N, keyof A>,
    f: (a: A) => Either<E2, B>
  ): Either<E1 | E2, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
}
```

Added in v1.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: {
  <N extends string>(name: N): <E, A>(self: Either<E, A>) => Either<E, { [K in N]: A }>
  <E, A, N extends string>(self: Either<E, A>, name: N): Either<E, { [K in N]: A }>
}
```

Added in v1.0.0

## let

**Signature**

```ts
export declare const let: {
  <N extends string, A extends object, B>(name: Exclude<N, keyof A>, f: (a: A) => B): <E>(
    self: Either<E, A>
  ) => Either<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <E, A extends object, N extends string, B>(self: Either<E, A>, name: Exclude<N, keyof A>, f: (a: A) => B): Either<
    E,
    { [K in N | keyof A]: K extends keyof A ? A[K] : B }
  >
}
```

Added in v1.0.0

# equivalence

## getEquivalence

**Signature**

```ts
export declare const getEquivalence: <E, A>(EE: Equivalence<E>, EA: Equivalence<A>) => Equivalence<Either<E, A>>
```

Added in v1.0.0

# error handling

## firstRightOf

**Signature**

```ts
export declare const firstRightOf: {
  <E, A>(collection: Iterable<Either<E, A>>): (self: Either<E, A>) => Either<E, A>
  <E, A>(self: Either<E, A>, collection: Iterable<Either<E, A>>): Either<E, A>
}
```

Added in v1.0.0

## mapLeft

Maps the `Left` side of an `Either` value to a new `Either` value.

**Signature**

```ts
export declare const mapLeft: {
  <E, G>(f: (e: E) => G): <A>(self: Either<E, A>) => Either<G, A>
  <E, A, G>(self: Either<E, A>, f: (e: E) => G): Either<G, A>
}
```

Added in v1.0.0

## orElse

Executes this effect and returns its value, if it succeeds, but otherwise
executes the specified effect.

**Signature**

```ts
export declare const orElse: {
  <E1, E2, B>(that: (e1: E1) => Either<E2, B>): <A>(self: Either<E1, A>) => Either<E2, B | A>
  <E1, A, E2, B>(self: Either<E1, A>, that: (e1: E1) => Either<E2, B>): Either<E2, A | B>
}
```

Added in v1.0.0

## orElseEither

Returns an effect that will produce the value of this effect, unless it
fails, in which case, it will produce the value of the specified effect.

**Signature**

```ts
export declare const orElseEither: {
  <E1, E2, B>(that: (e1: E1) => Either<E2, B>): <A>(self: Either<E1, A>) => Either<E2, Either<A, B>>
  <E1, A, E2, B>(self: Either<E1, A>, that: (e1: E1) => Either<E2, B>): Either<E2, Either<A, B>>
}
```

Added in v1.0.0

## orElseFail

Executes this effect and returns its value, if it succeeds, but otherwise
fails with the specified error.

**Signature**

```ts
export declare const orElseFail: {
  <E2>(onLeft: LazyArg<E2>): <E1, A>(self: Either<E1, A>) => Either<E2, A>
  <E1, A, E2>(self: Either<E1, A>, onLeft: LazyArg<E2>): Either<E2, A>
}
```

Added in v1.0.0

## tapError

Returns an effect that effectfully "peeks" at the failure of this effect.

**Signature**

```ts
export declare const tapError: {
  <E1, E2, _>(onLeft: (e: E1) => Either<E2, _>): <A>(self: Either<E1, A>) => Either<E1 | E2, A>
  <E1, A, E2, _>(self: Either<E1, A>, onLeft: (e: E1) => Either<E2, _>): Either<E1 | E2, A>
}
```

Added in v1.0.0

# filtering

## compact

**Signature**

```ts
export declare const compact: {
  <E2>(onNone: LazyArg<E2>): <E1, A>(self: Either<E1, Option<A>>) => Either<E2 | E1, A>
  <E1, A, E2>(self: Either<E1, Option<A>>, onNone: LazyArg<E2>): Either<E1 | E2, A>
}
```

Added in v1.0.0

## filter

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, E2, A = C>(refinement: Refinement<A, B>, onFalse: LazyArg<E2>): <E1>(
    self: Either<E1, C>
  ) => Either<E2 | E1, B>
  <B extends A, E2, A = B>(predicate: Predicate<A>, onFalse: LazyArg<E2>): <E1>(
    self: Either<E1, B>
  ) => Either<E2 | E1, B>
  <E1, C extends A, B extends A, E2, A = C>(
    self: Either<E1, C>,
    refinement: Refinement<A, B>,
    onFalse: LazyArg<E2>
  ): Either<E1 | E2, B>
  <E1, B extends A, E2, A = B>(self: Either<E1, B>, predicate: Predicate<A>, onFalse: LazyArg<E2>): Either<E1 | E2, B>
}
```

Added in v1.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: {
  <A, B, E2>(f: (a: A) => Option<B>, onNone: LazyArg<E2>): <E1>(self: Either<E1, A>) => Either<E2 | E1, B>
  <E1, A, B, E2>(self: Either<E1, A>, f: (a: A) => Option<B>, onNone: LazyArg<E2>): Either<E1 | E2, B>
}
```

Added in v1.0.0

# getters

## getOrElse

Returns the wrapped value if it's a `Right` or a default value if is a `Left`.

**Signature**

```ts
export declare const getOrElse: {
  <E, B>(onLeft: (e: E) => B): <A>(self: Either<E, A>) => B | A
  <E, A, B>(self: Either<E, A>, onLeft: (e: E) => B): A | B
}
```

**Example**

```ts
import * as E from '@fp-ts/core/Either'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(
  E.getOrElse(E.right(1), () => 0),
  1
)
assert.deepStrictEqual(
  E.getOrElse(E.left('error'), () => 0),
  0
)
```

Added in v1.0.0

## getOrNull

**Signature**

```ts
export declare const getOrNull: <E, A>(self: Either<E, A>) => A | null
```

Added in v1.0.0

## getOrUndefined

**Signature**

```ts
export declare const getOrUndefined: <E, A>(self: Either<E, A>) => A | undefined
```

Added in v1.0.0

## lefts

Return all the `Left` elements from an `Interable` of `Either`s.

**Signature**

```ts
export declare const lefts: <E, A>(self: Iterable<Either<E, A>>) => E[]
```

Added in v1.0.0

## rights

Return all the `Right` elements from an `Interable` of `Either`s.

**Signature**

```ts
export declare const rights: <E, A>(self: Iterable<Either<E, A>>) => A[]
```

Added in v1.0.0

# guards

## isEither

Returns `true` if the specified value is an instance of `Either`, `false`
otherwise.

**Signature**

```ts
export declare const isEither: (u: unknown) => u is Either<unknown, unknown>
```

Added in v1.0.0

## isLeft

Returns `true` if the either is an instance of `Left`, `false` otherwise.

**Signature**

```ts
export declare const isLeft: <E, A>(self: Either<E, A>) => self is Left<E>
```

Added in v1.0.0

## isRight

Returns `true` if the either is an instance of `Right`, `false` otherwise.

**Signature**

```ts
export declare const isRight: <E, A>(self: Either<E, A>) => self is Right<A>
```

Added in v1.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<EitherTypeLambda>
```

Added in v1.0.0

## Bicovariant

**Signature**

```ts
export declare const Bicovariant: bicovariant.Bicovariant<EitherTypeLambda>
```

Added in v1.0.0

## Chainable

**Signature**

```ts
export declare const Chainable: chainable.Chainable<EitherTypeLambda>
```

Added in v1.0.0

## Covariant

**Signature**

```ts
export declare const Covariant: covariant.Covariant<EitherTypeLambda>
```

Added in v1.0.0

## FlatMap

**Signature**

```ts
export declare const FlatMap: flatMap_.FlatMap<EitherTypeLambda>
```

Added in v1.0.0

## Foldable

**Signature**

```ts
export declare const Foldable: foldable.Foldable<EitherTypeLambda>
```

Added in v1.0.0

## Invariant

**Signature**

```ts
export declare const Invariant: invariant.Invariant<EitherTypeLambda>
```

Added in v1.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<EitherTypeLambda>
```

Added in v1.0.0

## Of

**Signature**

```ts
export declare const Of: of_.Of<EitherTypeLambda>
```

Added in v1.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<EitherTypeLambda>
```

Added in v1.0.0

## Product

**Signature**

```ts
export declare const Product: product_.Product<EitherTypeLambda>
```

Added in v1.0.0

## SemiAlternative

**Signature**

```ts
export declare const SemiAlternative: semiAlternative.SemiAlternative<EitherTypeLambda>
```

Added in v1.0.0

## SemiApplicative

**Signature**

```ts
export declare const SemiApplicative: semiApplicative.SemiApplicative<EitherTypeLambda>
```

Added in v1.0.0

## SemiCoproduct

**Signature**

```ts
export declare const SemiCoproduct: semiCoproduct.SemiCoproduct<EitherTypeLambda>
```

Added in v1.0.0

## SemiProduct

**Signature**

```ts
export declare const SemiProduct: semiProduct.SemiProduct<EitherTypeLambda>
```

Added in v1.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: traversable.Traversable<EitherTypeLambda>
```

Added in v1.0.0

## getOptionalSemigroup

Semigroup that models the combination of values that may be absent, elements that are `Left` are ignored
while elements that are `Right` are combined using the provided `Semigroup`.

**Signature**

```ts
export declare const getOptionalSemigroup: <E, A>(S: Semigroup<A>) => Semigroup<Either<E, A>>
```

Added in v1.0.0

# interop

## fromNullable

Takes a lazy default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
the provided default as a `Left`.

**Signature**

```ts
export declare const fromNullable: {
  <A, E>(onNullable: (a: A) => E): (a: A) => Either<E, NonNullable<A>>
  <A, E>(a: A, onNullable: (a: A) => E): Either<E, NonNullable<A>>
}
```

**Example**

```ts
import * as E from '@fp-ts/core/Either'

const parse = E.fromNullable(() => 'nullable')

assert.deepStrictEqual(parse(1), E.right(1))
assert.deepStrictEqual(parse(null), E.left('nullable'))
```

Added in v1.0.0

## getOrThrow

**Signature**

```ts
export declare const getOrThrow: <E, A>(self: Either<E, A>) => A
```

Added in v1.0.0

## liftNullable

**Signature**

```ts
export declare const liftNullable: <A extends readonly unknown[], B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: (...a: A) => E
) => (...a: A) => Either<E, NonNullable<B>>
```

Added in v1.0.0

## liftThrowable

Lifts a function that may throw to one returning a `Either`.

**Signature**

```ts
export declare const liftThrowable: <A extends readonly unknown[], B, E>(
  f: (...a: A) => B,
  onThrow: (error: unknown) => E
) => (...a: A) => Either<E, B>
```

Added in v1.0.0

## merge

**Signature**

```ts
export declare const merge: <E, A>(self: Either<E, A>) => E | A
```

Added in v1.0.0

# lifting

## lift2

Lifts a binary function into `Either`.

**Signature**

```ts
export declare const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => {
  <E1, E2>(self: Either<E1, A>, that: Either<E2, B>): Either<E1 | E2, C>
  <E2>(that: Either<E2, B>): <E1>(self: Either<E1, A>) => Either<E2 | E1, C>
}
```

Added in v1.0.0

## liftOption

**Signature**

```ts
export declare const liftOption: <A extends readonly unknown[], B, E>(
  f: (...a: A) => Option<B>,
  onNone: (...a: A) => E
) => (...a: A) => Either<E, B>
```

Added in v1.0.0

## liftPredicate

**Signature**

```ts
export declare const liftPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: Refinement<A, B>, onFalse: (c: C) => E): (c: C) => Either<E, B>
  <B extends A, E, A = B>(predicate: Predicate<A>, onFalse: (b: B) => E): (b: B) => Either<E, B>
}
```

**Example**

```ts
import { liftPredicate, left, right } from '@fp-ts/core/Either'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(
  pipe(
    1,
    liftPredicate(
      (n) => n > 0,
      () => 'error'
    )
  ),
  right(1)
)
assert.deepStrictEqual(
  pipe(
    -1,
    liftPredicate(
      (n) => n > 0,
      () => 'error'
    )
  ),
  left('error')
)
```

Added in v1.0.0

# mapping

## as

Maps the Right value of this effect to the specified constant value.

**Signature**

```ts
export declare const as: {
  <E, _, B>(self: Either<E, _>, b: B): Either<E, B>
  <B>(b: B): <E, _>(self: Either<E, _>) => Either<E, B>
}
```

Added in v1.0.0

## asUnit

Returns the effect Eithering from mapping the Right of this effect to unit.

**Signature**

```ts
export declare const asUnit: <E, _>(self: Either<E, _>) => Either<E, void>
```

Added in v1.0.0

## bimap

**Signature**

```ts
export declare const bimap: {
  <E1, E2, A, B>(f: (e: E1) => E2, g: (a: A) => B): (self: Either<E1, A>) => Either<E2, B>
  <E1, A, E2, B>(self: Either<E1, A>, f: (e: E1) => E2, g: (a: A) => B): Either<E2, B>
}
```

Added in v1.0.0

## flap

**Signature**

```ts
export declare const flap: {
  <A, E, B>(a: A, self: Either<E, (a: A) => B>): Either<E, B>
  <E, A, B>(self: Either<E, (a: A) => B>): (a: A) => Either<E, B>
}
```

Added in v1.0.0

## map

Maps the `Right` side of an `Either` value to a new `Either` value.

**Signature**

```ts
export declare const map: {
  <A, B>(f: (a: A) => B): <E>(self: Either<E, A>) => Either<E, B>
  <E, A, B>(self: Either<E, A>, f: (a: A) => B): Either<E, B>
}
```

Added in v1.0.0

## tupled

**Signature**

```ts
export declare const tupled: <E, A>(self: Either<E, A>) => Either<E, [A]>
```

Added in v1.0.0

# models

## Either (type alias)

**Signature**

```ts
export type Either<E, A> = Left<E> | Right<A>
```

Added in v1.0.0

## Left (interface)

**Signature**

```ts
export interface Left<E> {
  readonly _tag: 'Left'
  readonly left: E
}
```

Added in v1.0.0

## Right (interface)

**Signature**

```ts
export interface Right<A> {
  readonly _tag: 'Right'
  readonly right: A
}
```

Added in v1.0.0

# pattern matching

## match

Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
if the value is a `Right` the inner value is applied to the second function.

**Signature**

```ts
export declare const match: {
  <E, B, A, C = B>(onLeft: (e: E) => B, onRight: (a: A) => C): (self: Either<E, A>) => B | C
  <E, A, B, C = B>(self: Either<E, A>, onLeft: (e: E) => B, onRight: (a: A) => C): B | C
}
```

**Example**

```ts
import * as E from '@fp-ts/core/Either'
import { pipe } from '@fp-ts/core/Function'

const onLeft = (errors: ReadonlyArray<string>): string => `Errors: ${errors.join(', ')}`

const onRight = (value: number): string => `Ok: ${value}`

assert.deepStrictEqual(pipe(E.right(1), E.match(onLeft, onRight)), 'Ok: 1')
assert.deepStrictEqual(pipe(E.left(['error 1', 'error 2']), E.match(onLeft, onRight)), 'Errors: error 1, error 2')
```

Added in v1.0.0

# sequencing

## andThenDiscard

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const andThenDiscard: {
  <E1, A, E2, _>(self: Either<E1, A>, that: Either<E2, _>): Either<E1 | E2, A>
  <E2, _>(that: Either<E2, _>): <E1, A>(self: Either<E1, A>) => Either<E2 | E1, A>
}
```

Added in v1.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: {
  <A, E2, B>(f: (a: A) => Either<E2, B>): <E1>(self: Either<E1, A>) => Either<E2 | E1, B>
  <E1, A, E2, B>(self: Either<E1, A>, f: (a: A) => Either<E2, B>): Either<E1 | E2, B>
}
```

Added in v1.0.0

## flatMapNullable

**Signature**

```ts
export declare const flatMapNullable: {
  <A, B, E2>(f: (a: A) => B | null | undefined, onNullable: (a: A) => E2): <E1>(
    self: Either<E1, A>
  ) => Either<E2 | E1, NonNullable<B>>
  <E1, A, B, E2>(self: Either<E1, A>, f: (a: A) => B | null | undefined, onNullable: (a: A) => E2): Either<
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
  <A, B, E2>(f: (a: A) => Option<B>, onNone: (a: A) => E2): <E1>(self: Either<E1, A>) => Either<E2 | E1, B>
  <E1, A, B, E2>(self: Either<E1, A>, f: (a: A) => Option<B>, onNone: (a: A) => E2): Either<E1 | E2, B>
}
```

Added in v1.0.0

# traversing

## sequence

**Signature**

```ts
export declare const sequence: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <TE, R, O, E, A>(self: Either<TE, Kind<F, R, O, E, A>>) => Kind<F, R, O, E, Either<TE, A>>
```

Added in v1.0.0

## traverse

**Signature**

```ts
export declare const traverse: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <A, R, O, E, B>(f: (a: A) => Kind<F, R, O, E, B>): <TE>(self: Either<TE, A>) => Kind<F, R, O, E, Either<TE, B>>
  <TE, A, R, O, E, B>(self: Either<TE, A>, f: (a: A) => Kind<F, R, O, E, B>): Kind<F, R, O, E, Either<TE, B>>
}
```

Added in v1.0.0

## traverseTap

**Signature**

```ts
export declare const traverseTap: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => {
  <TE, A, R, O, E, B>(self: Either<TE, A>, f: (a: A) => Kind<F, R, O, E, B>): Kind<F, R, O, E, Either<TE, A>>
  <A, R, O, E, B>(f: (a: A) => Kind<F, R, O, E, B>): <TE>(self: Either<TE, A>) => Kind<F, R, O, E, Either<TE, A>>
}
```

Added in v1.0.0

# type lambdas

## EitherTypeLambda (interface)

**Signature**

```ts
export interface EitherTypeLambda extends TypeLambda {
  readonly type: Either<this['Out1'], this['Target']>
}
```

Added in v1.0.0

# utils

## andThen

**Signature**

```ts
export declare const andThen: {
  <E1, _, E2, B>(self: Either<E1, _>, that: Either<E2, B>): Either<E1 | E2, B>
  <E2, B>(that: Either<E2, B>): <E1, _>(self: Either<E1, _>) => Either<E2 | E1, B>
}
```

Added in v1.0.0

## ap

**Signature**

```ts
export declare const ap: {
  <E1, A, B, E2>(self: Either<E1, (a: A) => B>, that: Either<E2, A>): Either<E1 | E2, B>
  <E2, A>(that: Either<E2, A>): <E1, B>(self: Either<E1, (a: A) => B>) => Either<E2 | E1, B>
}
```

Added in v1.0.0

## appendElement

Appends an element to the end of a tuple.

**Signature**

```ts
export declare const appendElement: {
  <E1, A extends readonly any[], E2, B>(self: Either<E1, A>, that: Either<E2, B>): Either<E1 | E2, [...A, B]>
  <E2, B>(that: Either<E2, B>): <E1, A extends readonly any[]>(self: Either<E1, A>) => Either<E2 | E1, [...A, B]>
}
```

Added in v1.0.0

## composeKleisliArrow

**Signature**

```ts
export declare const composeKleisliArrow: {
  <A, E1, B, E2, C>(afb: (a: A) => Either<E1, B>, bfc: (b: B) => Either<E2, C>): (a: A) => Either<E1 | E2, C>
  <B, E2, C>(bfc: (b: B) => Either<E2, C>): <A, E1>(afb: (a: A) => Either<E1, B>) => (a: A) => Either<E2 | E1, C>
}
```

Added in v1.0.0

## contains

Returns a function that checks if an `Either` contains a given value using a provided `equivalence` function.

**Signature**

```ts
export declare const contains: <A>(isEquivalent: (self: A, that: A) => boolean) => {
  (a: A): <E>(self: Either<E, A>) => boolean
  <E>(self: Either<E, A>, a: A): boolean
}
```

Added in v1.0.0

## exists

Returns `false` if `Left` or returns the Either of the application of the given predicate to the `Right` value.

**Signature**

```ts
export declare const exists: {
  <A>(predicate: Predicate<A>): <E>(self: Either<E, A>) => boolean
  <E, A>(self: Either<E, A>, predicate: Predicate<A>): boolean
}
```

**Example**

```ts
import * as E from '@fp-ts/core/Either'

const f = E.exists((n: number) => n > 2)

assert.deepStrictEqual(f(E.left('a')), false)
assert.deepStrictEqual(f(E.right(1)), false)
assert.deepStrictEqual(f(E.right(3)), true)
```

Added in v1.0.0

## flatten

**Signature**

```ts
export declare const flatten: <E1, E2, A>(self: Either<E1, Either<E2, A>>) => Either<E1 | E2, A>
```

Added in v1.0.0

## reverse

**Signature**

```ts
export declare const reverse: <E, A>(self: Either<E, A>) => Either<A, E>
```

Added in v1.0.0

## struct

**Signature**

```ts
export declare const struct: <R extends Record<string, Either<any, any>>>(
  r: R
) => Either<
  [R[keyof R]] extends [Either<infer E, any>] ? E : never,
  { [K in keyof R]: [R[K]] extends [Either<any, infer A>] ? A : never }
>
```

Added in v1.0.0

## tuple

**Signature**

```ts
export declare const tuple: <T extends readonly Either<any, any>[]>(
  ...tuple: T
) => Either<
  [T[number]] extends [Either<infer E, any>] ? E : never,
  { [I in keyof T]: [T[I]] extends [Either<any, infer A>] ? A : never }
>
```

Added in v1.0.0

## unit

**Signature**

```ts
export declare const unit: Either<never, void>
```

Added in v1.0.0
