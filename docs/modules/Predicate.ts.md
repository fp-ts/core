---
title: Predicate.ts
nav_order: 11
parent: Modules
---

## Predicate overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [contramap](#contramap)
- [combining](#combining)
  - [productAll](#productall)
- [do notation](#do-notation)
  - [Do](#do)
  - [andThenBind](#andthenbind)
  - [bindTo](#bindto)
- [guards](#guards)
  - [isBigint](#isbigint)
  - [isBoolean](#isboolean)
  - [isDate](#isdate)
  - [isError](#iserror)
  - [isFunction](#isfunction)
  - [isNever](#isnever)
  - [isNotNull](#isnotnull)
  - [isNotNullable](#isnotnullable)
  - [isNotUndefined](#isnotundefined)
  - [isNull](#isnull)
  - [isNullable](#isnullable)
  - [isNumber](#isnumber)
  - [isObject](#isobject)
  - [isReadonlyRecord](#isreadonlyrecord)
  - [isRecord](#isrecord)
  - [isString](#isstring)
  - [isSymbol](#issymbol)
  - [isUndefined](#isundefined)
  - [isUnknown](#isunknown)
- [instances](#instances)
  - [Contravariant](#contravariant)
  - [Invariant](#invariant)
  - [Of](#of)
  - [Product](#product)
  - [SemiProduct](#semiproduct)
  - [getMonoidAll](#getmonoidall)
  - [getMonoidAny](#getmonoidany)
  - [getSemigroupAll](#getsemigroupall)
  - [getSemigroupAny](#getsemigroupany)
- [models](#models)
  - [Predicate (interface)](#predicate-interface)
  - [Refinement (interface)](#refinement-interface)
- [type lambdas](#type-lambdas)
  - [PredicateTypeLambda (interface)](#predicatetypelambda-interface)
- [utils](#utils)
  - [all](#all)
  - [and](#and)
  - [any](#any)
  - [appendElement](#appendelement)
  - [compose](#compose)
  - [not](#not)
  - [of](#of)
  - [or](#or)
  - [struct](#struct)
  - [tuple](#tuple)
  - [tupled](#tupled)
  - [unit](#unit)

---

# combinators

## contramap

**Signature**

```ts
export declare const contramap: {
  <B, A>(f: (b: B) => A): (self: Predicate<A>) => Predicate<B>
  <A, B>(self: Predicate<A>, f: (b: B) => A): Predicate<B>
}
```

Added in v1.0.0

# combining

## productAll

Similar to `Promise.all` but operates on `Predicate`s.

```
Iterable<Predicate<A>> -> Predicate<A[]>
```

Given an iterable of `Predicate<A>` returns an `Predicate<Array<A>>` that operates on arrays
by applying each predicate in the iterable in order until a predicate fails.

**Signature**

```ts
export declare const productAll: <A>(collection: Iterable<Predicate<A>>) => Predicate<readonly A[]>
```

Added in v1.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: Predicate<{}>
```

Added in v1.0.0

## andThenBind

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const andThenBind: {
  <N extends string, A extends object, B>(name: Exclude<N, keyof A>, that: Predicate<B>): (
    self: Predicate<A>
  ) => Predicate<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <A extends object, N extends string, B>(
    self: Predicate<A>,
    name: Exclude<N, keyof A>,
    that: Predicate<B>
  ): Predicate<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
}
```

Added in v1.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: {
  <N extends string>(name: N): <A>(self: Predicate<A>) => Predicate<{ readonly [K in N]: A }>
  <A, N extends string>(self: Predicate<A>, name: N): Predicate<{ readonly [K in N]: A }>
}
```

Added in v1.0.0

# guards

## isBigint

Tests if a value is a `bigint`.

**Signature**

```ts
export declare const isBigint: (input: unknown) => input is bigint
```

**Example**

```ts
import { isBigint } from '@fp-ts/core/Predicate'

assert.deepStrictEqual(isBigint(1n), true)

assert.deepStrictEqual(isBigint(1), false)
```

Added in v1.0.0

## isBoolean

Tests if a value is a `boolean`.

**Signature**

```ts
export declare const isBoolean: (input: unknown) => input is boolean
```

**Example**

```ts
import { isBoolean } from '@fp-ts/core/Predicate'

assert.deepStrictEqual(isBoolean(true), true)

assert.deepStrictEqual(isBoolean('true'), false)
```

Added in v1.0.0

## isDate

A guard that succeeds when the input is a `Date`.

**Signature**

```ts
export declare const isDate: (input: unknown) => input is Date
```

**Example**

```ts
import { isDate } from '@fp-ts/core/Predicate'

assert.deepStrictEqual(isDate(new Date()), true)

assert.deepStrictEqual(isDate(null), false)
assert.deepStrictEqual(isDate({}), false)
```

Added in v1.0.0

## isError

A guard that succeeds when the input is an `Error`.

**Signature**

```ts
export declare const isError: (input: unknown) => input is Error
```

**Example**

```ts
import { isError } from '@fp-ts/core/Predicate'

assert.deepStrictEqual(isError(new Error()), true)

assert.deepStrictEqual(isError(null), false)
assert.deepStrictEqual(isError({}), false)
```

Added in v1.0.0

## isFunction

Tests if a value is a `function`.

**Signature**

```ts
export declare const isFunction: (input: unknown) => input is Function
```

**Example**

```ts
import { isFunction } from '@fp-ts/core/Predicate'

assert.deepStrictEqual(isFunction(isFunction), true)

assert.deepStrictEqual(isFunction('function'), false)
```

Added in v1.0.0

## isNever

A guard that always fails.

**Signature**

```ts
export declare const isNever: (input: unknown) => input is never
```

**Example**

```ts
import { isNever } from '@fp-ts/core/Predicate'

assert.deepStrictEqual(isNever(null), false)
assert.deepStrictEqual(isNever(undefined), false)
assert.deepStrictEqual(isNever({}), false)
assert.deepStrictEqual(isNever([]), false)
```

Added in v1.0.0

## isNotNull

Tests if a value is not `undefined`.

**Signature**

```ts
export declare const isNotNull: <A>(input: A) => input is Exclude<A, null>
```

**Example**

```ts
import { isNotNull } from '@fp-ts/core/Predicate'

assert.deepStrictEqual(isNotNull(undefined), true)
assert.deepStrictEqual(isNotNull('null'), true)

assert.deepStrictEqual(isNotNull(null), false)
```

Added in v1.0.0

## isNotNullable

A guard that succeeds when the input is not `null` or `undefined`.

**Signature**

```ts
export declare const isNotNullable: <A>(input: A) => input is NonNullable<A>
```

**Example**

```ts
import { isNotNullable } from '@fp-ts/core/Predicate'

assert.deepStrictEqual(isNotNullable({}), true)
assert.deepStrictEqual(isNotNullable([]), true)

assert.deepStrictEqual(isNotNullable(null), false)
assert.deepStrictEqual(isNotNullable(undefined), false)
```

Added in v1.0.0

## isNotUndefined

Tests if a value is not `undefined`.

**Signature**

```ts
export declare const isNotUndefined: <A>(input: A) => input is Exclude<A, undefined>
```

**Example**

```ts
import { isNotUndefined } from '@fp-ts/core/Predicate'

assert.deepStrictEqual(isNotUndefined(null), true)
assert.deepStrictEqual(isNotUndefined('undefined'), true)

assert.deepStrictEqual(isNotUndefined(undefined), false)
```

Added in v1.0.0

## isNull

Tests if a value is `undefined`.

**Signature**

```ts
export declare const isNull: (input: unknown) => input is null
```

**Example**

```ts
import { isNull } from '@fp-ts/core/Predicate'

assert.deepStrictEqual(isNull(null), true)

assert.deepStrictEqual(isNull(undefined), false)
assert.deepStrictEqual(isNull('null'), false)
```

Added in v1.0.0

## isNullable

A guard that succeeds when the input is `null` or `undefined`.

**Signature**

```ts
export declare const isNullable: <A>(input: A) => input is Extract<A, null | undefined>
```

**Example**

```ts
import { isNullable } from '@fp-ts/core/Predicate'

assert.deepStrictEqual(isNullable(null), true)
assert.deepStrictEqual(isNullable(undefined), true)

assert.deepStrictEqual(isNullable({}), false)
assert.deepStrictEqual(isNullable([]), false)
```

Added in v1.0.0

## isNumber

Tests if a value is a `number`.

**Signature**

```ts
export declare const isNumber: (input: unknown) => input is number
```

**Example**

```ts
import { isNumber } from '@fp-ts/core/Predicate'

assert.deepStrictEqual(isNumber(2), true)

assert.deepStrictEqual(isNumber('2'), false)
```

Added in v1.0.0

## isObject

Tests if a value is an `object`.

**Signature**

```ts
export declare const isObject: (input: unknown) => input is object
```

**Example**

```ts
import { isObject } from '@fp-ts/core/Predicate'

assert.deepStrictEqual(isObject({}), true)
assert.deepStrictEqual(isObject([]), true)

assert.deepStrictEqual(isObject(null), false)
assert.deepStrictEqual(isObject(undefined), false)
```

Added in v1.0.0

## isReadonlyRecord

A guard that succeeds when the input is a readonly record.

**Signature**

```ts
export declare const isReadonlyRecord: (input: unknown) => input is {}
```

**Example**

```ts
import { isReadonlyRecord } from '@fp-ts/core/Predicate'

assert.deepStrictEqual(isReadonlyRecord({}), true)
assert.deepStrictEqual(isReadonlyRecord({ a: 1 }), true)

assert.deepStrictEqual(isReadonlyRecord([]), false)
assert.deepStrictEqual(isReadonlyRecord([1, 2, 3]), false)
assert.deepStrictEqual(isReadonlyRecord(null), false)
assert.deepStrictEqual(isReadonlyRecord(undefined), false)
```

Added in v1.0.0

## isRecord

A guard that succeeds when the input is a record.

**Signature**

```ts
export declare const isRecord: (input: unknown) => input is {}
```

**Example**

```ts
import { isRecord } from '@fp-ts/core/Predicate'

assert.deepStrictEqual(isRecord({}), true)
assert.deepStrictEqual(isRecord({ a: 1 }), true)

assert.deepStrictEqual(isRecord([]), false)
assert.deepStrictEqual(isRecord([1, 2, 3]), false)
assert.deepStrictEqual(isRecord(null), false)
assert.deepStrictEqual(isRecord(undefined), false)
```

Added in v1.0.0

## isString

Tests if a value is a `string`.

**Signature**

```ts
export declare const isString: (input: unknown) => input is string
```

**Example**

```ts
import { isString } from '@fp-ts/core/Predicate'

assert.deepStrictEqual(isString('a'), true)

assert.deepStrictEqual(isString(1), false)
```

Added in v1.0.0

## isSymbol

Tests if a value is a `symbol`.

**Signature**

```ts
export declare const isSymbol: (input: unknown) => input is symbol
```

**Example**

```ts
import { isSymbol } from '@fp-ts/core/Predicate'

assert.deepStrictEqual(isSymbol(Symbol.for('a')), true)

assert.deepStrictEqual(isSymbol('a'), false)
```

Added in v1.0.0

## isUndefined

Tests if a value is `undefined`.

**Signature**

```ts
export declare const isUndefined: (input: unknown) => input is undefined
```

**Example**

```ts
import { isUndefined } from '@fp-ts/core/Predicate'

assert.deepStrictEqual(isUndefined(undefined), true)

assert.deepStrictEqual(isUndefined(null), false)
assert.deepStrictEqual(isUndefined('undefined'), false)
```

Added in v1.0.0

## isUnknown

A guard that always succeeds.

**Signature**

```ts
export declare const isUnknown: (input: unknown) => input is unknown
```

**Example**

```ts
import { isUnknown } from '@fp-ts/core/Predicate'

assert.deepStrictEqual(isUnknown(null), true)
assert.deepStrictEqual(isUnknown(undefined), true)

assert.deepStrictEqual(isUnknown({}), true)
assert.deepStrictEqual(isUnknown([]), true)
```

Added in v1.0.0

# instances

## Contravariant

**Signature**

```ts
export declare const Contravariant: contravariant.Contravariant<PredicateTypeLambda>
```

Added in v1.0.0

## Invariant

**Signature**

```ts
export declare const Invariant: invariant.Invariant<PredicateTypeLambda>
```

Added in v1.0.0

## Of

**Signature**

```ts
export declare const Of: of_.Of<PredicateTypeLambda>
```

Added in v1.0.0

## Product

**Signature**

```ts
export declare const Product: product_.Product<PredicateTypeLambda>
```

Added in v1.0.0

## SemiProduct

**Signature**

```ts
export declare const SemiProduct: semiProduct.SemiProduct<PredicateTypeLambda>
```

Added in v1.0.0

## getMonoidAll

**Signature**

```ts
export declare const getMonoidAll: <A>() => monoid.Monoid<Predicate<A>>
```

Added in v1.0.0

## getMonoidAny

**Signature**

```ts
export declare const getMonoidAny: <A>() => monoid.Monoid<Predicate<A>>
```

Added in v1.0.0

## getSemigroupAll

**Signature**

```ts
export declare const getSemigroupAll: <A>() => semigroup.Semigroup<Predicate<A>>
```

Added in v1.0.0

## getSemigroupAny

**Signature**

```ts
export declare const getSemigroupAny: <A>() => semigroup.Semigroup<Predicate<A>>
```

Added in v1.0.0

# models

## Predicate (interface)

**Signature**

```ts
export interface Predicate<A> {
  (a: A): boolean
}
```

Added in v1.0.0

## Refinement (interface)

**Signature**

```ts
export interface Refinement<A, B extends A> {
  (a: A): a is B
}
```

Added in v1.0.0

# type lambdas

## PredicateTypeLambda (interface)

**Signature**

```ts
export interface PredicateTypeLambda extends TypeLambda {
  readonly type: Predicate<this['Target']>
}
```

Added in v1.0.0

# utils

## all

**Signature**

```ts
export declare const all: <A>(collection: Iterable<Predicate<A>>) => Predicate<A>
```

Added in v1.0.0

## and

**Signature**

```ts
export declare const and: {
  <A>(that: Predicate<A>): (self: Predicate<A>) => Predicate<A>
  <A>(self: Predicate<A>, that: Predicate<A>): Predicate<A>
}
```

Added in v1.0.0

## any

**Signature**

```ts
export declare const any: <A>(collection: Iterable<Predicate<A>>) => Predicate<A>
```

Added in v1.0.0

## appendElement

This function appends a predicate to a tuple-like predicate, allowing you to create a new predicate that includes
the original elements and the new one.

**Signature**

```ts
export declare const appendElement: {
  <A extends readonly any[], B>(self: Predicate<A>, that: Predicate<B>): Predicate<readonly [...A, B]>
  <B>(that: Predicate<B>): <A extends readonly any[]>(self: Predicate<A>) => Predicate<readonly [...A, B]>
}
```

Added in v1.0.0

## compose

**Signature**

```ts
export declare const compose: {
  <A, B extends A, C extends B>(bc: Refinement<B, C>): (ab: Refinement<A, B>) => Refinement<A, C>
  <A, B extends A, C extends B>(ab: Refinement<A, B>, bc: Refinement<B, C>): Refinement<A, C>
}
```

Added in v1.0.0

## not

**Signature**

```ts
export declare const not: <A>(self: Predicate<A>) => Predicate<A>
```

Added in v1.0.0

## of

**Signature**

```ts
export declare const of: <A>(_: A) => Predicate<A>
```

Added in v1.0.0

## or

**Signature**

```ts
export declare const or: {
  <A>(that: Predicate<A>): (self: Predicate<A>) => Predicate<A>
  <A>(self: Predicate<A>, that: Predicate<A>): Predicate<A>
}
```

Added in v1.0.0

## struct

**Signature**

```ts
export declare const struct: <R extends Record<string, Predicate<any>>>(
  predicates: R
) => Predicate<{ readonly [K in keyof R]: [R[K]] extends [Predicate<infer A>] ? A : never }>
```

Added in v1.0.0

## tuple

Similar to `Promise.all` but operates on `Predicate`s.

**Signature**

```ts
export declare const tuple: <T extends readonly Predicate<any>[]>(
  ...predicates: T
) => Predicate<Readonly<{ [I in keyof T]: [T[I]] extends [Predicate<infer A>] ? A : never }>>
```

Added in v1.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(self: Predicate<A>) => Predicate<readonly [A]>
```

Added in v1.0.0

## unit

**Signature**

```ts
export declare const unit: Predicate<void>
```

Added in v1.0.0
