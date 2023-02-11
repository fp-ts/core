---
title: Boolean.ts
nav_order: 2
parent: Modules
---

## Boolean overview

This module provides utility functions and type class instances for working with the `boolean` type in TypeScript.
It includes functions for basic boolean operations, as well as type class instances for
`Equivalence`, `Order`, `Semigroup`, and `Monoid`.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [and](#and)
  - [eqv](#eqv)
  - [implies](#implies)
  - [nand](#nand)
  - [nor](#nor)
  - [not](#not)
  - [or](#or)
  - [xor](#xor)
- [guards](#guards)
  - [isBoolean](#isboolean)
- [instances](#instances)
  - [Equivalence](#equivalence)
  - [MonoidAll](#monoidall)
  - [MonoidAny](#monoidany)
  - [MonoidEqv](#monoideqv)
  - [MonoidXor](#monoidxor)
  - [Order](#order)
  - [SemigroupAll](#semigroupall)
  - [SemigroupAny](#semigroupany)
  - [SemigroupEqv](#semigroupeqv)
  - [SemigroupXor](#semigroupxor)
- [pattern matching](#pattern-matching)
  - [match](#match)
- [utils](#utils)
  - [all](#all)
  - [any](#any)

---

# combinators

## and

**Signature**

```ts
export declare const and: { (that: boolean): (self: boolean) => boolean; (self: boolean, that: boolean): boolean }
```

Added in v1.0.0

## eqv

**Signature**

```ts
export declare const eqv: { (that: boolean): (self: boolean) => boolean; (self: boolean, that: boolean): boolean }
```

Added in v1.0.0

## implies

**Signature**

```ts
export declare const implies: { (that: boolean): (self: boolean) => boolean; (self: boolean, that: boolean): boolean }
```

Added in v1.0.0

## nand

**Signature**

```ts
export declare const nand: { (that: boolean): (self: boolean) => boolean; (self: boolean, that: boolean): boolean }
```

Added in v1.0.0

## nor

**Signature**

```ts
export declare const nor: { (that: boolean): (self: boolean) => boolean; (self: boolean, that: boolean): boolean }
```

Added in v1.0.0

## not

**Signature**

```ts
export declare const not: (self: boolean) => boolean
```

Added in v1.0.0

## or

**Signature**

```ts
export declare const or: { (that: boolean): (self: boolean) => boolean; (self: boolean, that: boolean): boolean }
```

Added in v1.0.0

## xor

**Signature**

```ts
export declare const xor: { (that: boolean): (self: boolean) => boolean; (self: boolean, that: boolean): boolean }
```

Added in v1.0.0

# guards

## isBoolean

Tests if a value is a `boolean`.

**Signature**

```ts
export declare const isBoolean: (input: unknown) => input is boolean
```

**Example**

```ts
import { isBoolean } from '@fp-ts/core/Boolean'

assert.deepStrictEqual(isBoolean(true), true)
assert.deepStrictEqual(isBoolean('true'), false)
```

Added in v1.0.0

# instances

## Equivalence

**Signature**

```ts
export declare const Equivalence: equivalence.Equivalence<boolean>
```

Added in v1.0.0

## MonoidAll

`boolean` monoid under conjunction.

The `empty` value is `true`.

**Signature**

```ts
export declare const MonoidAll: monoid.Monoid<boolean>
```

Added in v1.0.0

## MonoidAny

`boolean` monoid under disjunction.

The `empty` value is `false`.

**Signature**

```ts
export declare const MonoidAny: monoid.Monoid<boolean>
```

Added in v1.0.0

## MonoidEqv

`boolean` monoid under equivalence.

The `empty` value is `true`.

**Signature**

```ts
export declare const MonoidEqv: monoid.Monoid<boolean>
```

Added in v1.0.0

## MonoidXor

`boolean` monoid under exclusive disjunction.

The `empty` value is `false`.

**Signature**

```ts
export declare const MonoidXor: monoid.Monoid<boolean>
```

Added in v1.0.0

## Order

**Signature**

```ts
export declare const Order: order.Order<boolean>
```

Added in v1.0.0

## SemigroupAll

`boolean` semigroup under conjunction.

**Signature**

```ts
export declare const SemigroupAll: semigroup.Semigroup<boolean>
```

**Example**

```ts
import { SemigroupAll } from '@fp-ts/core/Boolean'

assert.deepStrictEqual(SemigroupAll.combine(true, true), true)
assert.deepStrictEqual(SemigroupAll.combine(true, false), false)
assert.deepStrictEqual(SemigroupAll.combine(false, true), false)
assert.deepStrictEqual(SemigroupAll.combine(false, false), false)
```

Added in v1.0.0

## SemigroupAny

`boolean` semigroup under disjunction.

**Signature**

```ts
export declare const SemigroupAny: semigroup.Semigroup<boolean>
```

**Example**

```ts
import { SemigroupAny } from '@fp-ts/core/Boolean'

assert.deepStrictEqual(SemigroupAny.combine(true, true), true)
assert.deepStrictEqual(SemigroupAny.combine(true, false), true)
assert.deepStrictEqual(SemigroupAny.combine(false, true), true)
assert.deepStrictEqual(SemigroupAny.combine(false, false), false)
```

Added in v1.0.0

## SemigroupEqv

`boolean` semigroup under equivalence.

**Signature**

```ts
export declare const SemigroupEqv: semigroup.Semigroup<boolean>
```

**Example**

```ts
import { SemigroupEqv } from '@fp-ts/core/Boolean'

assert.deepStrictEqual(SemigroupEqv.combine(true, true), true)
assert.deepStrictEqual(SemigroupEqv.combine(true, false), false)
assert.deepStrictEqual(SemigroupEqv.combine(false, true), false)
assert.deepStrictEqual(SemigroupEqv.combine(false, false), true)
```

Added in v1.0.0

## SemigroupXor

`boolean` semigroup under exclusive disjunction.

**Signature**

```ts
export declare const SemigroupXor: semigroup.Semigroup<boolean>
```

**Example**

```ts
import { SemigroupXor } from '@fp-ts/core/Boolean'

assert.deepStrictEqual(SemigroupXor.combine(true, true), false)
assert.deepStrictEqual(SemigroupXor.combine(true, false), true)
assert.deepStrictEqual(SemigroupXor.combine(false, true), true)
assert.deepStrictEqual(SemigroupXor.combine(false, false), false)
```

Added in v1.0.0

# pattern matching

## match

Defines the match over a boolean value.
Takes two thunks `onTrue`, `onFalse` and a `boolean` value.
If `value` is `false`, `onFalse()` is returned, otherwise `onTrue()`.

**Signature**

```ts
export declare const match: {
  <A, B = A>(onFalse: LazyArg<A>, onTrue: LazyArg<B>): (value: boolean) => A | B
  <A, B>(value: boolean, onFalse: LazyArg<A>, onTrue: LazyArg<B>): A | B
}
```

**Example**

```ts
import { some, map } from '@fp-ts/core/Option'
import { pipe } from '@fp-ts/core/Function'
import { match } from '@fp-ts/core/Boolean'

assert.deepStrictEqual(
  pipe(
    some(true),
    map(
      match(
        () => 'false',
        () => 'true'
      )
    )
  ),
  some('true')
)
```

Added in v1.0.0

# utils

## all

**Signature**

```ts
export declare const all: (collection: Iterable<boolean>) => boolean
```

Added in v1.0.0

## any

**Signature**

```ts
export declare const any: (collection: Iterable<boolean>) => boolean
```

Added in v1.0.0
