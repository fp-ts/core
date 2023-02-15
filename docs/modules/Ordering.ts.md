---
title: Ordering.ts
nav_order: 10
parent: Modules
---

## Ordering overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [Monoid](#monoid)
  - [Semigroup](#semigroup)
- [model](#model)
  - [Ordering (type alias)](#ordering-type-alias)
- [pattern matching](#pattern-matching)
  - [match](#match)
- [utils](#utils)
  - [reverse](#reverse)

---

# instances

## Monoid

`Monoid` instance for `Ordering`, returns the left-most non-zero `Ordering`.

The `empty` value is `0`.

**Signature**

```ts
export declare const Monoid: monoid.Monoid<0 | 1 | -1>
```

**Example**

```ts
import { Monoid } from '@fp-ts/core/Ordering'

assert.deepStrictEqual(Monoid.combine(Monoid.empty, -1), -1)
assert.deepStrictEqual(Monoid.combine(Monoid.empty, 1), 1)
assert.deepStrictEqual(Monoid.combine(1, -1), 1)
```

Added in v1.0.0

## Semigroup

`Semigroup` instance for `Ordering`, returns the left-most non-zero `Ordering`.

**Signature**

```ts
export declare const Semigroup: semigroup.Semigroup<0 | 1 | -1>
```

**Example**

```ts
import { Semigroup } from '@fp-ts/core/Ordering'

assert.deepStrictEqual(Semigroup.combine(0, -1), -1)
assert.deepStrictEqual(Semigroup.combine(0, 1), 1)
assert.deepStrictEqual(Semigroup.combine(1, -1), 1)
```

Added in v1.0.0

# model

## Ordering (type alias)

**Signature**

```ts
export type Ordering = -1 | 0 | 1
```

Added in v1.0.0

# pattern matching

## match

Depending on the `Ordering` parameter given to it, returns a value produced by one of the 3 functions provided as parameters.

**Signature**

```ts
export declare const match: {
  <A, B, C = B>(onLessThan: LazyArg<A>, onEqual: LazyArg<B>, onGreaterThan: LazyArg<C>): (self: Ordering) => A | B | C
  <A, B, C = B>(o: Ordering, onLessThan: LazyArg<A>, onEqual: LazyArg<B>, onGreaterThan: LazyArg<C>): A | B | C
}
```

**Example**

```ts
import { match } from '@fp-ts/core/Ordering'
import { constant } from '@fp-ts/core/Function'

const toMessage = match(constant('less than'), constant('equal'), constant('greater than'))

assert.deepStrictEqual(toMessage(-1), 'less than')
assert.deepStrictEqual(toMessage(0), 'equal')
assert.deepStrictEqual(toMessage(1), 'greater than')
```

Added in v1.0.0

# utils

## reverse

Inverts the ordering of the input `Ordering`.

**Signature**

```ts
export declare const reverse: (o: Ordering) => Ordering
```

**Example**

```ts
import { reverse } from '@fp-ts/core/Ordering'

assert.deepStrictEqual(reverse(1), -1)
assert.deepStrictEqual(reverse(-1), 1)
assert.deepStrictEqual(reverse(0), 0)
```

Added in v1.0.0
