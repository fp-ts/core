---
title: These.ts
nav_order: 33
parent: Modules
---

## These overview

A data structure providing "inclusive-or" as opposed to `Result`'s "exclusive-or".

If you interpret `Result<E, A>` as suggesting the computation may either fail or of (exclusively), then
`These<E, A>` may fail, of, or do both at the same time.

There are a few ways to interpret the both case:

- You can think of a computation that has a non-fatal error.
- You can think of a computation that went as far as it could before erroring.
- You can think of a computation that keeps track of errors as it completes.

Another way you can think of `These<E, A>` is saying that we want to handle `E` kind of data, `A` kind of data, or
both `E` and `A` kind of data at the same time. This is particularly useful when it comes to displaying UI's.

(description adapted from https://package.elm-lang.org/packages/joneshf/elm-these)

Adapted from https://github.com/purescript-contrib/purescript-these

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [both](#both)
  - [fail](#fail)
  - [failureOrBoth](#failureorboth)
  - [fromOptions](#fromoptions)
  - [succeed](#succeed)
  - [successOrBoth](#successorboth)
- [conversions](#conversions)
  - [fromNullable](#fromnullable)
  - [fromOption](#fromoption)
  - [toOption](#tooption)
  - [toReadonlyArray](#toreadonlyarray)
  - [toTuple2](#totuple2)
- [error handling](#error-handling)
  - [mapError](#maperror)
- [folding](#folding)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [instances](#instances)
  - [Bifunctor](#bifunctor)
  - [FromIdentity](#fromidentity)
  - [FromResult](#fromresult)
  - [FromThese](#fromthese)
  - [Functor](#functor)
  - [Traversable](#traversable)
  - [getApplicative](#getapplicative)
  - [getApply](#getapply)
  - [getEq](#geteq)
  - [getFlattenable](#getflattenable)
  - [getMonad](#getmonad)
  - [getSemigroup](#getsemigroup)
  - [getShow](#getshow)
- [lifting](#lifting)
  - [liftNullable](#liftnullable)
  - [liftOption](#liftoption)
  - [liftPredicate](#liftpredicate)
  - [liftResult](#liftresult)
- [mapping](#mapping)
  - [as](#as)
  - [flap](#flap)
  - [map](#map)
  - [mapBoth](#mapboth)
  - [unit](#unit)
- [model](#model)
  - [Both (interface)](#both-interface)
  - [These (type alias)](#these-type-alias)
- [pattern matching](#pattern-matching)
  - [match](#match)
- [refinements](#refinements)
  - [isBoth](#isboth)
  - [isFailure](#isfailure)
  - [isSuccess](#issuccess)
- [traversing](#traversing)
  - [sequence](#sequence)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [traverse](#traverse)
  - [traverseNonEmptyReadonlyArray](#traversenonemptyreadonlyarray)
  - [traverseNonEmptyReadonlyArrayWithIndex](#traversenonemptyreadonlyarraywithindex)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
- [tuple sequencing](#tuple-sequencing)
  - [Zip](#zip)
- [type lambdas](#type-lambdas)
  - [TheseTypeLambda (interface)](#thesetypelambda-interface)
- [utils](#utils)
  - [elem](#elem)
  - [exists](#exists)
  - [getFailure](#getfailure)
  - [getFailureOnly](#getfailureonly)
  - [getSuccess](#getsuccess)
  - [getSuccessOnly](#getsuccessonly)
  - [reverse](#reverse)

---

# constructors

## both

**Signature**

```ts
export declare const both: <E, A>(failure: E, success: A) => any
```

Added in v3.0.0

## fail

**Signature**

```ts
export declare const fail: <E>(failure: E) => any
```

Added in v3.0.0

## failureOrBoth

**Signature**

```ts
export declare const failureOrBoth: <E>(e: E) => <A>(ma: any) => any
```

**Example**

```ts
import { failureOrBoth, fail, both } from '@fp-ts/core/These'
import { none, some } from '@fp-ts/core/Option'

assert.deepStrictEqual(failureOrBoth('a')(none), fail('a'))
assert.deepStrictEqual(failureOrBoth('a')(some(1)), both('a', 1))
```

Added in v3.0.0

## fromOptions

Takes a pair of `Option`s and attempts to create a `These` from them

**Signature**

```ts
export declare const fromOptions: <E, A>(fe: any, fa: any) => any
```

**Example**

```ts
import { fromOptions, fail, succeed, both } from '@fp-ts/core/These'
import { none, some } from '@fp-ts/core/Option'

assert.deepStrictEqual(fromOptions(none, none), none)
assert.deepStrictEqual(fromOptions(some('a'), none), some(fail('a')))
assert.deepStrictEqual(fromOptions(none, some(1)), some(succeed(1)))
assert.deepStrictEqual(fromOptions(some('a'), some(1)), some(both('a', 1)))
```

Added in v3.0.0

## succeed

**Signature**

```ts
export declare const succeed: <A>(success: A) => any
```

Added in v3.0.0

## successOrBoth

**Signature**

```ts
export declare const successOrBoth: <A>(a: A) => <E>(me: any) => any
```

**Example**

```ts
import { successOrBoth, succeed, both } from '@fp-ts/core/These'
import { none, some } from '@fp-ts/core/Option'

assert.deepStrictEqual(successOrBoth(1)(none), succeed(1))
assert.deepStrictEqual(successOrBoth(1)(some('a')), both('a', 1))
```

Added in v3.0.0

# conversions

## fromNullable

**Signature**

```ts
export declare const fromNullable: <E>(onNullable: E) => <A>(a: A) => any
```

Added in v3.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: E) => <A>(fa: any) => any
```

Added in v3.0.0

## toOption

**Signature**

```ts
export declare const toOption: <E, A>(self: any) => any
```

Added in v3.0.0

## toReadonlyArray

**Signature**

```ts
export declare const toReadonlyArray: <E, A>(self: any) => readonly A[]
```

Added in v3.0.0

## toTuple2

**Signature**

```ts
export declare const toTuple2: <E, A>(e: E, a: A) => (fa: any) => readonly [E, A]
```

**Example**

```ts
import { toTuple2, fail, succeed, both } from '@fp-ts/core/These'

const f = toTuple2('a', 1)
assert.deepStrictEqual(f(fail('b')), ['b', 1])
assert.deepStrictEqual(f(succeed(2)), ['a', 2])
assert.deepStrictEqual(f(both('b', 2)), ['b', 2])
```

Added in v3.0.0

# error handling

## mapError

Returns an effect with its error channel mapped using the specified
function. This can be used to lift a "smaller" error into a "larger" error.

**Signature**

```ts
export declare const mapError: <E, G>(f: (e: E) => G) => <A>(self: any) => any
```

Added in v3.0.0

# folding

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(Monoid: any) => <A>(f: (a: A) => M) => <E>(self: any) => M
```

Added in v3.0.0

## reduce

**Signature**

```ts
export declare const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <E>(self: any) => B
```

Added in v3.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <E>(self: any) => B
```

Added in v3.0.0

# instances

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: any
```

Added in v3.0.0

## FromIdentity

**Signature**

```ts
export declare const FromIdentity: any
```

Added in v3.0.0

## FromResult

**Signature**

```ts
export declare const FromResult: any
```

Added in v3.0.0

## FromThese

**Signature**

```ts
export declare const FromThese: any
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: any
```

Added in v3.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: any
```

Added in v3.0.0

## getApplicative

**Signature**

```ts
export declare const getApplicative: <E>(Semigroup: any) => any
```

Added in v3.0.0

## getApply

**Signature**

```ts
export declare const getApply: <E>(Semigroup: any) => any
```

Added in v3.0.0

## getEq

**Signature**

```ts
export declare const getEq: <E, A>(EE: any, EA: any) => any
```

Added in v3.0.0

## getFlattenable

**Signature**

```ts
export declare const getFlattenable: <E>(S: any) => any
```

Added in v3.0.0

## getMonad

**Signature**

```ts
export declare const getMonad: <E>(S: any) => any
```

Added in v3.0.0

## getSemigroup

**Signature**

```ts
export declare const getSemigroup: <E, A>(SemigroupE: any, SemigroupA: any) => any
```

Added in v3.0.0

## getShow

**Signature**

```ts
export declare const getShow: <E, A>(ShowE: any, ShowA: any) => any
```

Added in v3.0.0

# lifting

## liftNullable

**Signature**

```ts
export declare const liftNullable: <A extends readonly unknown[], B, E>(
  f: (...a: A) => B | null | undefined,
  onNullable: E
) => (...a: A) => any
```

Added in v3.0.0

## liftOption

**Signature**

```ts
export declare const liftOption: <A extends readonly unknown[], B, E>(
  f: (...a: A) => any,
  onNone: E
) => (...a: A) => any
```

Added in v3.0.0

## liftPredicate

**Signature**

```ts
export declare const liftPredicate: {
  <C extends A, B extends A, E, A = C>(refinement: any, onFalse: E): (c: C) => any
  <B extends A, E, A = B>(predicate: any, onFalse: E): (b: B) => any
}
```

Added in v3.0.0

## liftResult

**Signature**

```ts
export declare const liftResult: <A extends readonly unknown[], E, B>(f: (...a: A) => any) => (...a: A) => any
```

Added in v3.0.0

# mapping

## as

Maps the success value of this effect to the specified constant value.

**Signature**

```ts
export declare const as: <B>(b: B) => <E>(self: any) => any
```

Added in v3.0.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: any) => any
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: any) => any
```

Added in v3.0.0

## mapBoth

Returns an effect whose failure and success channels have been mapped by
the specified pair of functions, `f` and `g`.

**Signature**

```ts
export declare const mapBoth: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (self: any) => any
```

Added in v3.0.0

## unit

Returns the effect resulting from mapping the success of this effect to unit.

**Signature**

```ts
export declare const unit: <E>(self: any) => any
```

Added in v3.0.0

# model

## Both (interface)

**Signature**

```ts
export interface Both<E, A> {
  readonly _tag: 'Both'
  readonly failure: E
  readonly success: A
}
```

Added in v3.0.0

## These (type alias)

**Signature**

```ts
export type These<E, A> = Result<E, A> | Both<E, A>
```

Added in v3.0.0

# pattern matching

## match

**Signature**

```ts
export declare const match: <E, B, A, C = B, D = B>(
  onError: (e: E) => B,
  onSuccess: (a: A) => C,
  onBoth: (e: E, a: A) => D
) => (fa: any) => B | C | D
```

Added in v3.0.0

# refinements

## isBoth

Returns `true` if the these is an instance of `Both`, `false` otherwise

**Signature**

```ts
export declare const isBoth: <E, A>(fa: any) => fa is Both<E, A>
```

Added in v3.0.0

## isFailure

Returns `true` if the these is an instance of `Failure`, `false` otherwise

**Signature**

```ts
export declare const isFailure: <E>(fa: any) => fa is any
```

Added in v3.0.0

## isSuccess

Returns `true` if the these is an instance of `Success`, `false` otherwise

**Signature**

```ts
export declare const isSuccess: <A>(fa: any) => fa is any
```

Added in v3.0.0

# traversing

## sequence

**Signature**

```ts
export declare const sequence: <F extends any>(F: any) => <E, FS, FR, FO, FE, A>(fa: any) => any
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(getApplicative(S))`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <E>(S: any) => <A>(arr: readonly any[]) => any
```

Added in v3.0.0

## traverse

**Signature**

```ts
export declare const traverse: <F extends any>(F: any) => <A, S, R, O, FE, B>(f: (a: A) => any) => <E>(ta: any) => any
```

Added in v3.0.0

## traverseNonEmptyReadonlyArray

Equivalent to `NonEmptyReadonlyArray#traverse(getApply(S))`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArray: <E>(S: any) => <A, B>(f: (a: A) => any) => (as: any) => any
```

Added in v3.0.0

## traverseNonEmptyReadonlyArrayWithIndex

Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(getApply(S))`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArrayWithIndex: <E>(
  S: any
) => <A, B>(f: (index: number, a: A) => any) => (as: any) => any
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(getApplicative(S))`.

**Signature**

```ts
export declare const traverseReadonlyArray: <E>(S: any) => <A, B>(f: (a: A) => any) => (as: readonly A[]) => any
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(getApplicative(S))`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <E>(
  S: any
) => <A, B>(f: (index: number, a: A) => any) => (as: readonly A[]) => any
```

Added in v3.0.0

# tuple sequencing

## Zip

**Signature**

```ts
export declare const Zip: any
```

Added in v3.0.0

# type lambdas

## TheseTypeLambda (interface)

**Signature**

```ts
export interface TheseTypeLambda extends TypeLambda {
  readonly type: These<this['Out2'], this['Out1']>
}
```

Added in v3.0.0

# utils

## elem

**Signature**

```ts
export declare const elem: <A>(E: any) => (a: A) => <E>(ma: any) => boolean
```

Added in v3.0.0

## exists

**Signature**

```ts
export declare const exists: <A>(predicate: any) => (ma: any) => boolean
```

Added in v3.0.0

## getFailure

Converts a `These` to an `Option` discarding the success.

**Signature**

```ts
export declare const getFailure: <E, A>(self: any) => any
```

**Example**

```ts
import * as T from '@fp-ts/core/These'
import * as O from '@fp-ts/core/Option'

assert.deepStrictEqual(T.getFailure(T.succeed(1)), O.none)
assert.deepStrictEqual(T.getFailure(T.fail('err')), O.some('err'))
assert.deepStrictEqual(T.getFailure(T.both('err', 1)), O.some('err'))
```

Added in v3.0.0

## getFailureOnly

Returns the `E` value if and only if the value is constructed with `Success`

**Signature**

```ts
export declare const getFailureOnly: <E, A>(fa: any) => any
```

**Example**

```ts
import { getFailureOnly, fail, succeed, both } from '@fp-ts/core/These'
import { none, some } from '@fp-ts/core/Option'

assert.deepStrictEqual(getFailureOnly(fail('a')), some('a'))
assert.deepStrictEqual(getFailureOnly(succeed(1)), none)
assert.deepStrictEqual(getFailureOnly(both('a', 1)), none)
```

Added in v3.0.0

## getSuccess

Converts a `These` to an `Option` discarding the error.

**Signature**

```ts
export declare const getSuccess: <E, A>(self: any) => any
```

**Example**

```ts
import * as T from '@fp-ts/core/These'
import * as O from '@fp-ts/core/Option'

assert.deepStrictEqual(T.getSuccess(T.succeed(1)), O.some(1))
assert.deepStrictEqual(T.getSuccess(T.fail('err')), O.none)
assert.deepStrictEqual(T.getSuccess(T.both('err', 1)), O.some(1))
```

Added in v3.0.0

## getSuccessOnly

Returns the `A` value if and only if the value is constructed with `Success`

**Signature**

```ts
export declare const getSuccessOnly: <E, A>(fa: any) => any
```

**Example**

```ts
import { getSuccessOnly, fail, succeed, both } from '@fp-ts/core/These'
import { none, some } from '@fp-ts/core/Option'

assert.deepStrictEqual(getSuccessOnly(fail('a')), none)
assert.deepStrictEqual(getSuccessOnly(succeed(1)), some(1))
assert.deepStrictEqual(getSuccessOnly(both('a', 1)), none)
```

Added in v3.0.0

## reverse

**Signature**

```ts
export declare const reverse: <E, A>(fa: any) => any
```

Added in v3.0.0
