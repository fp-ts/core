---
title: typeclasses/Monoid.ts
nav_order: 70
parent: Modules
---

## Monoid overview

`Monoid` extends the power of `Semigroup` by providing an additional `empty` value.

```ts
interface Monoid<A> extends Semigroup<A> {
  readonly empty: A
}
```

This `empty` value should be an identity for the `combine` operation, which means the following equalities hold for any choice of `a`.

```ts
a |> combine(empty) = empty |> combine(a) <-> a
```

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [max](#max)
  - [min](#min)
- [model](#model)
  - [Monoid (interface)](#monoid-interface)
- [utils](#utils)
  - [combineAll](#combineall)
  - [reverse](#reverse)
  - [struct](#struct)
  - [tuple](#tuple)

---

# constructors

## max

Get a monoid where `combine` will return the maximum, based on the provided bounded order.

The `empty` value is the `bottom` value.

**Signature**

```ts
export declare const max: <A>(Bounded: any) => Monoid<A>
```

**Example**

```ts
import { max } from '@fp-ts/core/typeclasses/Monoid'
import * as N from '@fp-ts/core/number'
import { pipe } from '@fp-ts/core/Function'

const M = max(N.Bounded)

assert.deepStrictEqual(pipe(1, M.combine(2)), 2)
```

Added in v3.0.0

## min

Get a monoid where `combine` will return the minimum, based on the provided bounded order.

The `empty` value is the `top` value.

**Signature**

```ts
export declare const min: <A>(Bounded: any) => Monoid<A>
```

**Example**

```ts
import { min } from '@fp-ts/core/typeclasses/Monoid'
import * as N from '@fp-ts/core/number'
import { pipe } from '@fp-ts/core/Function'

const M = min(N.Bounded)

assert.deepStrictEqual(pipe(1, M.combine(2)), 1)
```

Added in v3.0.0

# model

## Monoid (interface)

**Signature**

```ts
export interface Monoid<A> extends Semigroup<A> {
  readonly empty: A
}
```

Added in v3.0.0

# utils

## combineAll

Given a sequence of `as`, combine them and return the total.

If `as` is empty, return the monoid `empty` value.

**Signature**

```ts
export declare const combineAll: <A>(Monoid: Monoid<A>) => (collection: Iterable<A>) => A
```

**Example**

```ts
import { combineAll } from '@fp-ts/core/typeclasses/Monoid'
import * as N from '@fp-ts/core/number'

assert.deepStrictEqual(combineAll(N.MonoidSum)([1, 2, 3]), 6)
assert.deepStrictEqual(combineAll(N.MonoidSum)([]), 0)
```

Added in v3.0.0

## reverse

The dual of a `Monoid`, obtained by swapping the arguments of `combine`.

**Signature**

```ts
export declare const reverse: <A>(Monoid: Monoid<A>) => Monoid<A>
```

**Example**

```ts
import { reverse } from '@fp-ts/core/typeclasses/Monoid'
import * as S from '@fp-ts/core/string'
import { pipe } from '@fp-ts/core/Function'

const M = reverse(S.Monoid)
assert.deepStrictEqual(pipe('a', M.combine('b')), 'ba')
```

Added in v3.0.0

## struct

Given a struct of monoids returns a monoid for the struct.

**Signature**

```ts
export declare const struct: <A>(monoids: { [K in keyof A]: Monoid<A[K]> }) => Monoid<{ readonly [K in keyof A]: A[K] }>
```

**Example**

```ts
import { struct } from '@fp-ts/core/typeclasses/Monoid'
import * as N from '@fp-ts/core/number'
import { pipe } from '@fp-ts/core/Function'

interface Point {
  readonly x: number
  readonly y: number
}

const M = struct<Point>({
  x: N.MonoidSum,
  y: N.MonoidSum,
})

assert.deepStrictEqual(pipe({ x: 1, y: 2 }, M.combine({ x: 3, y: 4 })), { x: 4, y: 6 })
```

Added in v3.0.0

## tuple

Given a tuple of monoids returns a monoid for the tuple.

**Signature**

```ts
export declare const tuple: <A extends readonly unknown[]>(
  ...monoids: { [K in keyof A]: Monoid<A[K]> }
) => Monoid<Readonly<A>>
```

**Example**

```ts
import { tuple } from '@fp-ts/core/typeclasses/Monoid'
import { pipe } from '@fp-ts/core/Function'
import * as B from '@fp-ts/core/boolean'
import * as N from '@fp-ts/core/number'
import * as S from '@fp-ts/core/string'

const M1 = tuple(S.Monoid, N.MonoidSum)
assert.deepStrictEqual(pipe(['a', 1], M1.combine(['b', 2])), ['ab', 3])

const M2 = tuple(S.Monoid, N.MonoidSum, B.MonoidAnd)
assert.deepStrictEqual(pipe(['a', 1, true], M2.combine(['b', 2, false])), ['ab', 3, false])
```

Added in v3.0.0
