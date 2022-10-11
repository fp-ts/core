---
title: data/boolean.ts
nav_order: 5
parent: Modules
---

## boolean overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [Eq](#eq)
  - [MonoidAll](#monoidall)
  - [MonoidAny](#monoidany)
  - [Ord](#ord)
  - [SemigroupAll](#semigroupall)
  - [SemigroupAny](#semigroupany)
  - [Show](#show)
- [pattern matching](#pattern-matching)
  - [match](#match)
- [refinements](#refinements)
  - [isBoolean](#isboolean)
- [utils](#utils)
  - [all](#all)
  - [and](#and)
  - [any](#any)
  - [or](#or)

---

# instances

## Eq

**Signature**

```ts
export declare const Eq: any
```

Added in v3.0.0

## MonoidAll

`boolean` monoid under conjunction.

The `empty` value is `true`.

**Signature**

```ts
export declare const MonoidAll: any
```

Added in v3.0.0

## MonoidAny

`boolean` monoid under disjunction.

The `empty` value is `false`.

**Signature**

```ts
export declare const MonoidAny: any
```

Added in v3.0.0

## Ord

**Signature**

```ts
export declare const Ord: any
```

Added in v3.0.0

## SemigroupAll

`boolean` semigroup under conjunction.

**Signature**

```ts
export declare const SemigroupAll: any
```

**Example**

```ts
import { SemigroupAll } from '@fp-ts/core/data/boolean'
import { pipe } from '@fp-ts/core/data/Function'

assert.deepStrictEqual(pipe(true, SemigroupAll.combine(true)), true)
assert.deepStrictEqual(pipe(true, SemigroupAll.combine(false)), false)
```

Added in v3.0.0

## SemigroupAny

`boolean` semigroup under disjunction.

**Signature**

```ts
export declare const SemigroupAny: any
```

**Example**

```ts
import { SemigroupAny } from '@fp-ts/core/data/boolean'
import { pipe } from '@fp-ts/core/data/Function'

assert.deepStrictEqual(pipe(true, SemigroupAny.combine(true)), true)
assert.deepStrictEqual(pipe(true, SemigroupAny.combine(false)), true)
assert.deepStrictEqual(pipe(false, SemigroupAny.combine(false)), false)
```

Added in v3.0.0

## Show

**Signature**

```ts
export declare const Show: any
```

Added in v3.0.0

# pattern matching

## match

Defines the match over a boolean value.
Takes two thunks `onTrue`, `onFalse` and a `boolean` value.
If `value` is `false`, `onFalse()` is returned, otherwise `onTrue()`.

**Signature**

```ts
export declare const match: <A, B = A>(onFalse: any, onTrue: any) => (value: boolean) => A | B
```

**Example**

```ts
import { some, map } from '@fp-ts/core/data/Option'
import { pipe } from '@fp-ts/core/data/Function'
import { match } from '@fp-ts/core/data/boolean'

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

Added in v3.0.0

# refinements

## isBoolean

**Signature**

```ts
export declare const isBoolean: any
```

Added in v3.0.0

# utils

## all

**Signature**

```ts
export declare const all: (collection: Iterable<boolean>) => boolean
```

Added in v3.0.0

## and

**Signature**

```ts
export declare const and: (that: boolean) => (self: boolean) => boolean
```

Added in v3.0.0

## any

**Signature**

```ts
export declare const any: (collection: Iterable<boolean>) => boolean
```

Added in v3.0.0

## or

**Signature**

```ts
export declare const or: (that: boolean) => (self: boolean) => boolean
```

Added in v3.0.0
