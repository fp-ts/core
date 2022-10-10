---
title: ReadonlyArray.ts
nav_order: 25
parent: Modules
---

## ReadonlyArray overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [append](#append)
  - [makeBy](#makeby)
  - [of](#of)
  - [prepend](#prepend)
  - [replicate](#replicate)
- [conversions](#conversions)
  - [fromIterable](#fromiterable)
  - [fromNullable](#fromnullable)
  - [fromOption](#fromoption)
  - [fromResult](#fromresult)
- [do notation](#do-notation)
  - [Do](#do)
  - [bind](#bind)
  - [bindRight](#bindright)
  - [bindTo](#bindto)
  - [let](#let)
- [error handling](#error-handling)
  - [firstSuccessOf](#firstsuccessof)
- [filtering](#filtering)
  - [compact](#compact)
  - [filter](#filter)
  - [filterMap](#filtermap)
  - [filterMapWithIndex](#filtermapwithindex)
  - [filterWithIndex](#filterwithindex)
  - [partition](#partition)
  - [partitionMap](#partitionmap)
  - [partitionMapWithIndex](#partitionmapwithindex)
  - [partitionWithIndex](#partitionwithindex)
  - [separate](#separate)
  - [traverseFilterMap](#traversefiltermap)
  - [traversePartitionMap](#traversepartitionmap)
- [folding](#folding)
  - [foldMap](#foldmap)
  - [foldMapWithIndex](#foldmapwithindex)
  - [reduce](#reduce)
  - [reduceKind](#reducekind)
  - [reduceRight](#reduceright)
  - [reduceRightWithIndex](#reducerightwithindex)
  - [reduceWithIndex](#reducewithindex)
- [instances](#instances)
  - [Alt](#alt)
  - [Alternative](#alternative)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [CategoryKind](#categorykind)
  - [Compactable](#compactable)
  - [Extendable](#extendable)
  - [Filterable](#filterable)
  - [Flattenable](#flattenable)
  - [FromIdentity](#fromidentity)
  - [FromOption](#fromoption)
  - [FromResult](#fromresult)
  - [Functor](#functor)
  - [KleisliComposable](#kleislicomposable)
  - [Monad](#monad)
  - [Traversable](#traversable)
  - [TraversableFilterable](#traversablefilterable)
  - [getEq](#geteq)
  - [getIntersectionSemigroup](#getintersectionsemigroup)
  - [getMonoid](#getmonoid)
  - [getOrd](#getord)
  - [getSemigroup](#getsemigroup)
  - [getShow](#getshow)
  - [getUnionMonoid](#getunionmonoid)
  - [getUnionSemigroup](#getunionsemigroup)
- [lifting](#lifting)
  - [lift2](#lift2)
  - [lift3](#lift3)
  - [liftNullable](#liftnullable)
  - [liftOption](#liftoption)
  - [liftPredicate](#liftpredicate)
  - [liftResult](#liftresult)
- [mapping](#mapping)
  - [as](#as)
  - [flap](#flap)
  - [map](#map)
  - [unit](#unit)
- [pattern matching](#pattern-matching)
  - [match](#match)
  - [matchLeft](#matchleft)
  - [matchRight](#matchright)
- [refinements](#refinements)
  - [isNonEmpty](#isnonempty)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
  - [flatMapNullable](#flatmapnullable)
  - [zipLeft](#zipleft)
  - [zipRight](#zipright)
- [traversing](#traversing)
  - [sequence](#sequence)
  - [traverse](#traverse)
  - [traverseWithIndex](#traversewithindex)
- [tuple sequencing](#tuple-sequencing)
  - [Zip](#zip)
  - [tupled](#tupled)
  - [zipFlatten](#zipflatten)
- [type lambdas](#type-lambdas)
  - [ReadonlyArrayTypeLambda (interface)](#readonlyarraytypelambda-interface)
- [utils](#utils)
  - [ap](#ap)
  - [chop](#chop)
  - [chunksOf](#chunksof)
  - [composeKleisli](#composekleisli)
  - [concat](#concat)
  - [deleteAt](#deleteat)
  - [difference](#difference)
  - [dropLeft](#dropleft)
  - [dropLeftWhile](#dropleftwhile)
  - [dropRight](#dropright)
  - [duplicate](#duplicate)
  - [elem](#elem)
  - [empty](#empty)
  - [every](#every)
  - [exists](#exists)
  - [extend](#extend)
  - [failures](#failures)
  - [findFirst](#findfirst)
  - [findFirstMap](#findfirstmap)
  - [findIndex](#findindex)
  - [findLast](#findlast)
  - [findLastIndex](#findlastindex)
  - [findLastMap](#findlastmap)
  - [flatMapWithIndex](#flatmapwithindex)
  - [flatten](#flatten)
  - [head](#head)
  - [idKleisli](#idkleisli)
  - [init](#init)
  - [insertAt](#insertat)
  - [intercalate](#intercalate)
  - [intersection](#intersection)
  - [intersperse](#intersperse)
  - [isEmpty](#isempty)
  - [isOutOfBound](#isoutofbound)
  - [last](#last)
  - [lookup](#lookup)
  - [mapWithIndex](#mapwithindex)
  - [modifyAt](#modifyat)
  - [orElse](#orelse)
  - [prependAll](#prependall)
  - [reverse](#reverse)
  - [rotate](#rotate)
  - [scanLeft](#scanleft)
  - [scanRight](#scanright)
  - [size](#size)
  - [some](#some)
  - [sort](#sort)
  - [sortBy](#sortby)
  - [spanLeft](#spanleft)
  - [splitAt](#splitat)
  - [successes](#successes)
  - [tail](#tail)
  - [takeLeft](#takeleft)
  - [takeLeftWhile](#takeleftwhile)
  - [takeRight](#takeright)
  - [tap](#tap)
  - [traverseFilter](#traversefilter)
  - [traversePartition](#traversepartition)
  - [unfold](#unfold)
  - [union](#union)
  - [uniq](#uniq)
  - [unzip](#unzip)
  - [updateAt](#updateat)
  - [zip](#zip)
  - [zipWith](#zipwith)

---

# constructors

## append

Append an element to the end of a `ReadonlyArray`, creating a new `NonEmptyReadonlyArray`.

**Signature**

```ts
export declare const append: <B>(end: B) => <A>(init: readonly A[]) => any
```

**Example**

```ts
import { append } from '@fp-ts/core/ReadonlyArray'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe([1, 2, 3], append(4)), [1, 2, 3, 4])
```

Added in v3.0.0

## makeBy

Return a `ReadonlyArray` of length `n` with element `i` initialized with `f(i)`.

**Note**. `n` is normalized to a non negative integer.

**Signature**

```ts
export declare const makeBy: <A>(f: (i: number) => A) => (n: number) => readonly A[]
```

**Example**

```ts
import { makeBy } from '@fp-ts/core/ReadonlyArray'
import { pipe } from '@fp-ts/core/Function'

const double = (n: number): number => n * 2
assert.deepStrictEqual(pipe(5, makeBy(double)), [0, 2, 4, 6, 8])
```

Added in v3.0.0

## of

**Signature**

```ts
export declare const of: <A>(a: A) => readonly A[]
```

Added in v3.0.0

## prepend

Prepend an element to the front of a `ReadonlyArray`, creating a new `NonEmptyReadonlyArray`.

**Signature**

```ts
export declare const prepend: <B>(head: B) => <A>(tail: readonly A[]) => any
```

**Example**

```ts
import { prepend } from '@fp-ts/core/ReadonlyArray'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe([1, 2, 3], prepend(0)), [0, 1, 2, 3])
```

Added in v3.0.0

## replicate

Create a `ReadonlyArray` containing a value repeated the specified number of times.

**Note**. `n` is normalized to a non negative integer.

**Signature**

```ts
export declare const replicate: <A>(a: A) => (n: number) => readonly A[]
```

**Example**

```ts
import { replicate } from '@fp-ts/core/ReadonlyArray'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe(3, replicate('a')), ['a', 'a', 'a'])
```

Added in v3.0.0

# conversions

## fromIterable

**Signature**

```ts
export declare const fromIterable: <A>(collection: Iterable<A>) => readonly A[]
```

Added in v3.0.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <A>(a: A) => readonly NonNullable<A>[]
```

Added in v3.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <A>(fa: any) => readonly A[]
```

Added in v3.0.0

## fromResult

Converts an `Result` to a `ReadonlyArray`.

**Signature**

```ts
export declare const fromResult: <A>(fa: any) => readonly A[]
```

Added in v3.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: readonly {}[]
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => readonly B[]
) => (self: readonly A[]) => readonly { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }[]
```

Added in v3.0.0

## bindRight

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: readonly B[]
) => (self: readonly A[]) => readonly { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }[]
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <A>(self: readonly A[]) => readonly { readonly [K in N]: A }[]
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: readonly A[]) => readonly { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }[]
```

Added in v3.0.0

# error handling

## firstSuccessOf

Returns an effect that runs each of the specified effects in order until one of them succeeds.

**Signature**

```ts
export declare const firstSuccessOf: <A>(collection: Iterable<readonly A[]>) => readonly A[]
```

Added in v3.0.0

# filtering

## compact

**Signature**

```ts
export declare const compact: <A>(foa: readonly any[]) => readonly A[]
```

Added in v3.0.0

## filter

**Signature**

```ts
export declare const filter: {
  <C extends A, B extends A, A = C>(refinement: any): (fc: readonly C[]) => readonly B[]
  <B extends A, A = B>(predicate: any): (fb: readonly B[]) => readonly B[]
}
```

Added in v3.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => any) => (self: Iterable<A>) => readonly B[]
```

Added in v3.0.0

## filterMapWithIndex

**Signature**

```ts
export declare const filterMapWithIndex: <A, B>(f: (i: number, a: A) => any) => (self: Iterable<A>) => readonly B[]
```

Added in v3.0.0

## filterWithIndex

**Signature**

```ts
export declare const filterWithIndex: {
  <C extends A, B extends A, A = C>(refinement: (i: number, a: A) => a is B): (fc: readonly C[]) => readonly B[]
  <B extends A, A = B>(predicate: (i: number, a: A) => boolean): (fb: readonly B[]) => readonly B[]
}
```

Added in v3.0.0

## partition

**Signature**

```ts
export declare const partition: {
  <C extends A, B extends A, A = C>(refinement: any): (fc: readonly C[]) => readonly [readonly C[], readonly B[]]
  <B extends A, A = B>(predicate: any): (fb: readonly B[]) => readonly [readonly B[], readonly B[]]
}
```

Added in v3.0.0

## partitionMap

**Signature**

```ts
export declare const partitionMap: <A, B, C>(
  f: (a: A) => any
) => (fa: readonly A[]) => readonly [readonly B[], readonly C[]]
```

Added in v3.0.0

## partitionMapWithIndex

**Signature**

```ts
export declare const partitionMapWithIndex: <A, B, C>(
  f: (i: number, a: A) => any
) => (fa: readonly A[]) => readonly [readonly B[], readonly C[]]
```

Added in v3.0.0

## partitionWithIndex

**Signature**

```ts
export declare const partitionWithIndex: {
  <C extends A, B extends A, A = C>(refinement: (i: number, a: A) => a is B): (
    fb: readonly C[]
  ) => readonly [readonly C[], readonly B[]]
  <B extends A, A = B>(predicate: (i: number, a: A) => boolean): (
    fb: readonly B[]
  ) => readonly [readonly B[], readonly B[]]
}
```

Added in v3.0.0

## separate

**Signature**

```ts
export declare const separate: <A, B>(fe: readonly any[]) => readonly [readonly A[], readonly B[]]
```

Added in v3.0.0

## traverseFilterMap

**Signature**

```ts
export declare const traverseFilterMap: <F extends any>(
  F: any
) => <A, S, R, O, E, B>(f: (a: A) => any) => (ta: readonly A[]) => any
```

Added in v3.0.0

## traversePartitionMap

**Signature**

```ts
export declare const traversePartitionMap: <F extends any>(
  F: any
) => <A, S, R, O, E, B, C>(f: (a: A) => any) => (wa: readonly A[]) => any
```

Added in v3.0.0

# folding

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(Monoid: any) => <A>(f: (a: A) => M) => (self: readonly A[]) => M
```

Added in v3.0.0

## foldMapWithIndex

**Signature**

```ts
export declare const foldMapWithIndex: <M>(Monoid: any) => <A>(f: (i: number, a: A) => M) => (self: readonly A[]) => M
```

Added in v3.0.0

## reduce

**Signature**

```ts
export declare const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => (self: readonly A[]) => B
```

Added in v3.0.0

## reduceKind

**Signature**

```ts
export declare const reduceKind: <F extends any>(
  Flattenable: any
) => <S, R, O, E, B, A>(fb: any, f: (b: B, a: A) => any) => (self: readonly A[]) => any
```

Added in v3.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => (self: readonly A[]) => B
```

Added in v3.0.0

## reduceRightWithIndex

**Signature**

```ts
export declare const reduceRightWithIndex: <B, A>(b: B, f: (i: number, a: A, b: B) => B) => (self: readonly A[]) => B
```

Added in v3.0.0

## reduceWithIndex

**Signature**

```ts
export declare const reduceWithIndex: <B, A>(b: B, f: (i: number, b: B, a: A) => B) => (self: readonly A[]) => B
```

Added in v3.0.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: any
```

Added in v3.0.0

## Alternative

**Signature**

```ts
export declare const Alternative: any
```

Added in v3.0.0

## Applicative

**Signature**

```ts
export declare const Applicative: any
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: any
```

Added in v3.0.0

## CategoryKind

**Signature**

```ts
export declare const CategoryKind: any
```

Added in v3.0.0

## Compactable

**Signature**

```ts
export declare const Compactable: any
```

Added in v3.0.0

## Extendable

**Signature**

```ts
export declare const Extendable: any
```

Added in v3.0.0

## Filterable

**Signature**

```ts
export declare const Filterable: any
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: any
```

Added in v3.0.0

## FromIdentity

**Signature**

```ts
export declare const FromIdentity: any
```

Added in v3.0.0

## FromOption

**Signature**

```ts
export declare const FromOption: any
```

Added in v3.0.0

## FromResult

**Signature**

```ts
export declare const FromResult: any
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: any
```

Added in v3.0.0

## KleisliComposable

**Signature**

```ts
export declare const KleisliComposable: any
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: any
```

Added in v3.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: any
```

Added in v3.0.0

## TraversableFilterable

**Signature**

```ts
export declare const TraversableFilterable: any
```

Added in v3.0.0

## getEq

Derives an `Eq` over the `ReadonlyArray` of a given element type from the `Eq` of that type. The derived `Eq` defines two
`ReadonlyArray`s as equal if all elements of both `ReadonlyArray`s are compared equal pairwise with the given `E`. In case of `ReadonlyArray`s of
different lengths, the result is non equality.

**Signature**

```ts
export declare const getEq: <A>(E: any) => any
```

**Example**

```ts
import * as S from '@fp-ts/core/string'
import { getEq } from '@fp-ts/core/ReadonlyArray'

const E = getEq(S.Eq)
assert.strictEqual(E.equals(['a', 'b'])(['a', 'b']), true)
assert.strictEqual(E.equals(['a'])([]), false)
```

Added in v3.0.0

## getIntersectionSemigroup

**Signature**

```ts
export declare const getIntersectionSemigroup: <A>(E: any) => any
```

Added in v3.0.0

## getMonoid

Returns a `Monoid` for `ReadonlyArray<A>`.

**Signature**

```ts
export declare const getMonoid: <A>() => any
```

Added in v3.0.0

## getOrd

Derives an `Ord` over the `ReadonlyArray` of a given element type from the `Ord` of that type. The ordering between two such
`ReadonlyArray`s is equal to: the first non equal comparison of each `ReadonlyArray`s elements taken pairwise in increasing order, in
case of equality over all the pairwise elements; the longest `ReadonlyArray` is considered the greatest, if both `ReadonlyArray`s have
the same length, the result is equality.

**Signature**

```ts
export declare const getOrd: <A>(O: any) => any
```

**Example**

```ts
import { getOrd } from '@fp-ts/core/ReadonlyArray'
import * as S from '@fp-ts/core/string'
import { pipe } from '@fp-ts/core/Function'

const O = getOrd(S.Ord)
assert.strictEqual(pipe(['b'], O.compare(['a'])), 1)
assert.strictEqual(pipe(['a'], O.compare(['a'])), 0)
assert.strictEqual(pipe(['a'], O.compare(['b'])), -1)
```

Added in v3.0.0

## getSemigroup

Returns a `Semigroup` for `ReadonlyArray<A>`.

**Signature**

```ts
export declare const getSemigroup: <A>() => any
```

**Example**

```ts
import { getSemigroup } from '@fp-ts/core/ReadonlyArray'
import { pipe } from '@fp-ts/core/Function'

const S = getSemigroup<number>()
assert.deepStrictEqual(pipe([1, 2], S.combine([3, 4])), [1, 2, 3, 4])
```

Added in v3.0.0

## getShow

**Signature**

```ts
export declare const getShow: <A>(S: any) => any
```

Added in v3.0.0

## getUnionMonoid

**Signature**

```ts
export declare const getUnionMonoid: <A>(E: any) => any
```

Added in v3.0.0

## getUnionSemigroup

**Signature**

```ts
export declare const getUnionSemigroup: <A>(E: any) => any
```

Added in v3.0.0

# lifting

## lift2

Lifts a binary function into `ReadonlyArray`.

**Signature**

```ts
export declare const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: readonly A[], fb: readonly B[]) => readonly C[]
```

Added in v3.0.0

## lift3

Lifts a ternary function into `ReadonlyArray`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => (fa: readonly A[], fb: readonly B[], fc: readonly C[]) => readonly D[]
```

Added in v3.0.0

## liftNullable

**Signature**

```ts
export declare const liftNullable: <A extends readonly unknown[], B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => readonly NonNullable<B>[]
```

Added in v3.0.0

## liftOption

**Signature**

```ts
export declare const liftOption: <A extends readonly unknown[], B>(f: (...a: A) => any) => (...a: A) => readonly B[]
```

Added in v3.0.0

## liftPredicate

**Signature**

```ts
export declare const liftPredicate: {
  <C extends A, B extends A, A = C>(refinement: any): (c: C) => readonly B[]
  <B extends A, A = B>(predicate: any): (b: B) => readonly B[]
}
```

Added in v3.0.0

## liftResult

**Signature**

```ts
export declare const liftResult: <A extends readonly unknown[], E, B>(f: (...a: A) => any) => (...a: A) => readonly B[]
```

Added in v3.0.0

# mapping

## as

Maps the success value of this effect to the specified constant value.

**Signature**

```ts
export declare const as: <B>(b: B) => (self: ReadonlyArray<unknown>) => readonly B[]
```

Added in v3.0.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: readonly ((a: A) => B)[]) => readonly B[]
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: readonly A[]) => readonly B[]
```

Added in v3.0.0

## unit

Returns the effect resulting from mapping the success of this effect to unit.

**Signature**

```ts
export declare const unit: (self: ReadonlyArray<unknown>) => ReadonlyArray<void>
```

Added in v3.0.0

# pattern matching

## match

**Signature**

```ts
export declare const match: <B, A, C = B>(onEmpty: any, onNonEmpty: (as: any) => C) => (as: readonly A[]) => B | C
```

Added in v3.0.0

## matchLeft

Break a `ReadonlyArray` into its first element and remaining elements.

**Signature**

```ts
export declare const matchLeft: <B, A, C = B>(
  onEmpty: any,
  onNonEmpty: (head: A, tail: readonly A[]) => C
) => (as: readonly A[]) => B | C
```

**Example**

```ts
import { matchLeft } from '@fp-ts/core/ReadonlyArray'

const len: <A>(as: ReadonlyArray<A>) => number = matchLeft(
  () => 0,
  (_, tail) => 1 + len(tail)
)
assert.strictEqual(len([1, 2, 3]), 3)
```

Added in v3.0.0

## matchRight

Break a `ReadonlyArray` into its initial elements and the last element.

**Signature**

```ts
export declare const matchRight: <B, A, C = B>(
  onEmpty: any,
  onNonEmpty: (init: readonly A[], last: A) => C
) => (as: readonly A[]) => B | C
```

Added in v3.0.0

# refinements

## isNonEmpty

Test whether a `ReadonlyArray` is non empty narrowing down the type to `NonEmptyReadonlyArray<A>`

**Signature**

```ts
export declare const isNonEmpty: <A>(as: readonly A[]) => as is any
```

Added in v3.0.0

# sequencing

## flatMap

**Signature**

```ts
export declare const flatMap: <A, B>(f: (a: A) => readonly B[]) => (self: readonly A[]) => readonly B[]
```

**Example**

```ts
import * as RA from '@fp-ts/core/ReadonlyArray'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(
  pipe(
    [1, 2, 3],
    RA.flatMap((n) => [`a${n}`, `b${n}`])
  ),
  ['a1', 'b1', 'a2', 'b2', 'a3', 'b3']
)
assert.deepStrictEqual(
  pipe(
    [1, 2, 3],
    RA.flatMap(() => [])
  ),
  []
)
```

Added in v3.0.0

## flatMapNullable

**Signature**

```ts
export declare const flatMapNullable: <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: readonly A[]) => readonly NonNullable<B>[]
```

Added in v3.0.0

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: (that: ReadonlyArray<unknown>) => <A>(self: readonly A[]) => readonly A[]
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <A>(that: readonly A[]) => (self: ReadonlyArray<unknown>) => readonly A[]
```

Added in v3.0.0

# traversing

## sequence

**Signature**

```ts
export declare const sequence: <F extends any>(F: any) => <S, R, O, E, A>(fas: readonly any[]) => any
```

Added in v3.0.0

## traverse

**Signature**

```ts
export declare const traverse: <F extends any>(
  Applicative: any
) => <A, S, R, O, E, B>(f: (a: A) => any) => (self: readonly A[]) => any
```

Added in v3.0.0

## traverseWithIndex

**Signature**

```ts
export declare const traverseWithIndex: <F extends any>(
  Applicative: any
) => <A, S, R, O, E, B>(f: (i: number, a: A) => any) => (self: readonly A[]) => any
```

Added in v3.0.0

# tuple sequencing

## Zip

**Signature**

```ts
export declare const Zip: readonly (readonly [])[]
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(self: readonly A[]) => readonly (readonly [A])[]
```

Added in v3.0.0

## zipFlatten

Sequentially zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <B>(
  fb: readonly B[]
) => <A extends readonly unknown[]>(self: readonly A[]) => readonly (readonly [...A, B])[]
```

Added in v3.0.0

# type lambdas

## ReadonlyArrayTypeLambda (interface)

**Signature**

```ts
export interface ReadonlyArrayTypeLambda extends TypeLambda {
  readonly type: ReadonlyArray<this['Out1']>
}
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <A>(fa: readonly A[]) => <B>(self: readonly ((a: A) => B)[]) => readonly B[]
```

Added in v3.0.0

## chop

A useful recursion pattern for processing a `ReadonlyArray` to produce a new `ReadonlyArray`, often used for "chopping" up the input
`ReadonlyArray`. Typically chop is called with some function that will consume an initial prefix of the `ReadonlyArray` and produce a
value and the rest of the `ReadonlyArray`.

**Signature**

```ts
export declare const chop: <A, B>(f: (as: any) => readonly [B, readonly A[]]) => (as: readonly A[]) => readonly B[]
```

**Example**

```ts
import { Eq } from '@fp-ts/core/typeclasses/Eq'
import * as N from '@fp-ts/core/number'
import * as RA from '@fp-ts/core/ReadonlyArray'
import { pipe } from '@fp-ts/core/Function'

const group = <A>(E: Eq<A>): ((as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyArray<A>>) => {
  return RA.chop((as) => pipe(as, RA.spanLeft(E.equals(as[0]))))
}
assert.deepStrictEqual(group(N.Eq)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
```

Added in v3.0.0

## chunksOf

Splits a `ReadonlyArray` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
the `ReadonlyArray`. Note that `chunksOf(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
definition of `chunksOf`; it satisfies the property that

```ts
chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))
```

whenever `n` evenly divides the length of `as`.

**Signature**

```ts
export declare const chunksOf: (n: number) => <A>(as: readonly A[]) => readonly any[]
```

**Example**

```ts
import { chunksOf } from '@fp-ts/core/ReadonlyArray'

assert.deepStrictEqual(chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
```

Added in v3.0.0

## composeKleisli

**Signature**

```ts
export declare const composeKleisli: <B, C>(
  bfc: (b: B) => readonly C[]
) => <A>(afb: (a: A) => readonly B[]) => (a: A) => readonly C[]
```

Added in v3.0.0

## concat

**Signature**

```ts
export declare const concat: <B>(that: readonly B[]) => <A>(self: readonly A[]) => readonly (B | A)[]
```

Added in v3.0.0

## deleteAt

Delete the element at the specified index, creating a new `ReadonlyArray`, or returning `None` if the index is out of bounds.

**Signature**

```ts
export declare const deleteAt: (i: number) => <A>(as: readonly A[]) => any
```

**Example**

```ts
import { deleteAt } from '@fp-ts/core/ReadonlyArray'
import { some, none } from '@fp-ts/core/Option'

assert.deepStrictEqual(deleteAt(0)([1, 2, 3]), some([2, 3]))
assert.deepStrictEqual(deleteAt(1)([]), none)
```

Added in v3.0.0

## difference

Creates a `ReadonlyArray` of values not included in the other given `ReadonlyArray` using a `Eq` for equality
comparisons. The order and references of result values are determined by the first `ReadonlyArray`.

**Signature**

```ts
export declare const difference: <A>(Eq: any) => (that: readonly A[]) => (self: readonly A[]) => readonly A[]
```

**Example**

```ts
import { difference } from '@fp-ts/core/ReadonlyArray'
import * as N from '@fp-ts/core/number'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe([1, 2], difference(N.Eq)([2, 3])), [1])
```

Added in v3.0.0

## dropLeft

Drop a max number of elements from the start of an `ReadonlyArray`, creating a new `ReadonlyArray`.

**Note**. `n` is normalized to a non negative integer.

**Signature**

```ts
export declare const dropLeft: (n: number) => <A>(as: readonly A[]) => readonly A[]
```

**Example**

```ts
import * as RA from '@fp-ts/core/ReadonlyArray'
import { pipe } from '@fp-ts/core/Function'

const input: ReadonlyArray<number> = [1, 2, 3]
assert.deepStrictEqual(pipe(input, RA.dropLeft(2)), [3])
assert.strictEqual(pipe(input, RA.dropLeft(0)), input)
assert.strictEqual(pipe(input, RA.dropLeft(-1)), input)
```

Added in v3.0.0

## dropLeftWhile

Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new `ReadonlyArray`.

**Signature**

```ts
export declare function dropLeftWhile<A, B extends A>(
  refinement: Refinement<A, B>
): (as: ReadonlyArray<A>) => ReadonlyArray<B>
export declare function dropLeftWhile<A>(
  predicate: Predicate<A>
): <B extends A>(bs: ReadonlyArray<B>) => ReadonlyArray<B>
export declare function dropLeftWhile<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => ReadonlyArray<A>
```

**Example**

```ts
import { dropLeftWhile } from '@fp-ts/core/ReadonlyArray'

assert.deepStrictEqual(dropLeftWhile((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), [2, 4, 5])
```

Added in v3.0.0

## dropRight

Drop a max number of elements from the end of an `ReadonlyArray`, creating a new `ReadonlyArray`.

**Note**. `n` is normalized to a non negative integer.

**Signature**

```ts
export declare const dropRight: (n: number) => <A>(as: readonly A[]) => readonly A[]
```

**Example**

```ts
import * as RA from '@fp-ts/core/ReadonlyArray'
import { pipe } from '@fp-ts/core/Function'

const input: ReadonlyArray<number> = [1, 2, 3]
assert.deepStrictEqual(pipe(input, RA.dropRight(2)), [1])
assert.strictEqual(pipe(input, RA.dropRight(0)), input)
assert.strictEqual(pipe(input, RA.dropRight(-1)), input)
```

Added in v3.0.0

## duplicate

**Signature**

```ts
export declare const duplicate: <A>(wa: readonly A[]) => readonly (readonly A[])[]
```

Added in v3.0.0

## elem

Tests whether a value is a member of a `ReadonlyArray`.

**Signature**

```ts
export declare const elem: <A>(E: any) => (a: A) => (as: readonly A[]) => boolean
```

**Example**

```ts
import { elem } from '@fp-ts/core/ReadonlyArray'
import * as N from '@fp-ts/core/number'
import { pipe } from '@fp-ts/core/Function'

assert.strictEqual(pipe([1, 2, 3], elem(N.Eq)(2)), true)
assert.strictEqual(pipe([1, 2, 3], elem(N.Eq)(0)), false)
```

Added in v3.0.0

## empty

**Signature**

```ts
export declare const empty: readonly never[]
```

Added in v3.0.0

## every

Check if a predicate holds true for every `ReadonlyArray` member.

**Signature**

```ts
export declare function every<A, B extends A>(
  refinement: Refinement<A, B>
): Refinement<ReadonlyArray<A>, ReadonlyArray<B>>
export declare function every<A>(predicate: Predicate<A>): Predicate<ReadonlyArray<A>>
```

**Example**

```ts
import { every } from '@fp-ts/core/ReadonlyArray'
import { pipe } from '@fp-ts/core/Function'

const isPositive = (n: number): boolean => n > 0

assert.deepStrictEqual(pipe([1, 2, 3], every(isPositive)), true)
assert.deepStrictEqual(pipe([1, 2, -3], every(isPositive)), false)
```

Added in v3.0.0

## exists

Alias of [`some`](#some)

**Signature**

```ts
export declare const exists: <A>(predicate: any) => (as: readonly A[]) => as is any
```

Added in v3.0.0

## extend

**Signature**

```ts
export declare const extend: <A, B>(f: (wa: readonly A[]) => B) => (wa: readonly A[]) => readonly B[]
```

Added in v3.0.0

## failures

Extracts from a `ReadonlyArray` of `Result` all the `Failure` elements. All the `Failure` elements are extracted in order

**Signature**

```ts
export declare const failures: <E, A>(as: readonly any[]) => readonly E[]
```

**Example**

```ts
import { failures } from '@fp-ts/core/ReadonlyArray'
import { fail, succeed } from '@fp-ts/core/Result'

assert.deepStrictEqual(failures([succeed(1), fail('foo'), succeed(2)]), ['foo'])
```

Added in v3.0.0

## findFirst

Find the first element which satisfies a predicate (or a refinement) function

**Signature**

```ts
export declare function findFirst<A, B extends A>(refinement: Refinement<A, B>): (as: ReadonlyArray<A>) => Option<B>
export declare function findFirst<A>(predicate: Predicate<A>): <B extends A>(bs: ReadonlyArray<B>) => Option<B>
export declare function findFirst<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => Option<A>
```

**Example**

```ts
import { findFirst } from '@fp-ts/core/ReadonlyArray'
import { some } from '@fp-ts/core/Option'

assert.deepStrictEqual(
  findFirst((x: { a: number; b: number }) => x.a === 1)([
    { a: 1, b: 1 },
    { a: 1, b: 2 },
  ]),
  some({ a: 1, b: 1 })
)
```

Added in v3.0.0

## findFirstMap

Find the first element returned by an option based selector function

**Signature**

```ts
export declare const findFirstMap: <A, B>(f: (a: A) => any) => (as: readonly A[]) => any
```

**Example**

```ts
import { findFirstMap } from '@fp-ts/core/ReadonlyArray'
import { some, none } from '@fp-ts/core/Option'

interface Person {
  name: string
  age?: number
}

const persons: ReadonlyArray<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]

// returns the name of the first person that has an age
assert.deepStrictEqual(findFirstMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Mary'))
```

Added in v3.0.0

## findIndex

Find the first index for which a predicate holds

**Signature**

```ts
export declare const findIndex: <A>(predicate: any) => (as: readonly A[]) => any
```

**Example**

```ts
import { findIndex } from '@fp-ts/core/ReadonlyArray'
import { some, none } from '@fp-ts/core/Option'

assert.deepStrictEqual(findIndex((n: number) => n === 2)([1, 2, 3]), some(1))
assert.deepStrictEqual(findIndex((n: number) => n === 2)([]), none)
```

Added in v3.0.0

## findLast

Find the last element which satisfies a predicate function

**Signature**

```ts
export declare function findLast<A, B extends A>(refinement: Refinement<A, B>): (as: ReadonlyArray<A>) => Option<B>
export declare function findLast<A>(predicate: Predicate<A>): <B extends A>(bs: ReadonlyArray<B>) => Option<B>
export declare function findLast<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => Option<A>
```

**Example**

```ts
import { findLast } from '@fp-ts/core/ReadonlyArray'
import { some } from '@fp-ts/core/Option'

assert.deepStrictEqual(
  findLast((x: { a: number; b: number }) => x.a === 1)([
    { a: 1, b: 1 },
    { a: 1, b: 2 },
  ]),
  some({ a: 1, b: 2 })
)
```

Added in v3.0.0

## findLastIndex

Returns the index of the last element of the list which matches the predicate

**Signature**

```ts
export declare const findLastIndex: <A>(predicate: any) => (as: readonly A[]) => any
```

**Example**

```ts
import { findLastIndex } from '@fp-ts/core/ReadonlyArray'
import { some, none } from '@fp-ts/core/Option'

interface X {
  a: number
  b: number
}
const xs: ReadonlyArray<X> = [
  { a: 1, b: 0 },
  { a: 1, b: 1 },
]
assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 1)(xs), some(1))
assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 4)(xs), none)
```

Added in v3.0.0

## findLastMap

Find the last element returned by an option based selector function

**Signature**

```ts
export declare const findLastMap: <A, B>(f: (a: A) => any) => (as: readonly A[]) => any
```

**Example**

```ts
import { findLastMap } from '@fp-ts/core/ReadonlyArray'
import { some, none } from '@fp-ts/core/Option'

interface Person {
  name: string
  age?: number
}

const persons: ReadonlyArray<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]

// returns the name of the last person that has an age
assert.deepStrictEqual(findLastMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Joey'))
```

Added in v3.0.0

## flatMapWithIndex

**Signature**

```ts
export declare const flatMapWithIndex: <A, B>(
  f: (i: number, a: A) => readonly B[]
) => (as: readonly A[]) => readonly B[]
```

Added in v3.0.0

## flatten

Removes one level of nesting

**Signature**

```ts
export declare const flatten: <A>(mma: readonly (readonly A[])[]) => readonly A[]
```

**Example**

```ts
import { flatten } from '@fp-ts/core/ReadonlyArray'

assert.deepStrictEqual(flatten([[1], [2, 3], [4]]), [1, 2, 3, 4])
```

Added in v3.0.0

## head

Get the first element of a `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.

**Signature**

```ts
export declare const head: <A>(self: readonly A[]) => any
```

**Example**

```ts
import { head } from '@fp-ts/core/ReadonlyArray'
import { some, none } from '@fp-ts/core/Option'

assert.deepStrictEqual(head([1, 2, 3]), some(1))
assert.deepStrictEqual(head([]), none)
```

Added in v3.0.0

## idKleisli

**Signature**

```ts
export declare const idKleisli: <A>() => (a: A) => readonly A[]
```

Added in v3.0.0

## init

Get all but the last element of a `ReadonlyArray`, creating a new `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.

**Signature**

```ts
export declare const init: <A>(as: readonly A[]) => any
```

**Example**

```ts
import { init } from '@fp-ts/core/ReadonlyArray'
import { some, none } from '@fp-ts/core/Option'

assert.deepStrictEqual(init([1, 2, 3]), some([1, 2]))
assert.deepStrictEqual(init([]), none)
```

Added in v3.0.0

## insertAt

Insert an element at the specified index, creating a new `ReadonlyArray`, or returning `None` if the index is out of bounds.

**Signature**

```ts
export declare const insertAt: <A>(i: number, a: A) => (as: readonly A[]) => any
```

**Example**

```ts
import { insertAt } from '@fp-ts/core/ReadonlyArray'
import { some } from '@fp-ts/core/Option'

assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
```

Added in v3.0.0

## intercalate

Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements
using the specified separator.

**Signature**

```ts
export declare const intercalate: <A>(M: any) => (middle: A) => (as: readonly A[]) => A
```

**Example**

```ts
import * as S from '@fp-ts/core/string'
import { intercalate } from '@fp-ts/core/ReadonlyArray'

assert.deepStrictEqual(intercalate(S.Monoid)('-')(['a', 'b', 'c']), 'a-b-c')
```

Added in v3.0.0

## intersection

Creates a `ReadonlyArray` of unique values that are included in all given `ReadonlyArray`s using a `Eq` for equality
comparisons. The order and references of result values are determined by the first `ReadonlyArray`.

**Signature**

```ts
export declare const intersection: <A>(E: any) => any
```

**Example**

```ts
import { intersection } from '@fp-ts/core/ReadonlyArray'
import * as N from '@fp-ts/core/number'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe([1, 2], intersection(N.Eq)([2, 3])), [2])
```

Added in v3.0.0

## intersperse

Places an element in between members of a `ReadonlyArray`

**Signature**

```ts
export declare const intersperse: <A>(middle: A) => (as: readonly A[]) => readonly A[]
```

**Example**

```ts
import { intersperse } from '@fp-ts/core/ReadonlyArray'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe([1, 2, 3, 4], intersperse(9)), [1, 9, 2, 9, 3, 9, 4])
```

Added in v3.0.0

## isEmpty

Test whether a `ReadonlyArray` is empty.

**Signature**

```ts
export declare const isEmpty: <A>(as: readonly A[]) => as is readonly []
```

**Example**

```ts
import { isEmpty } from '@fp-ts/core/ReadonlyArray'

assert.strictEqual(isEmpty([]), true)
```

Added in v3.0.0

## isOutOfBound

Test whether a `ReadonlyArray` contains a particular index

**Signature**

```ts
export declare const isOutOfBound: <A>(i: number, as: readonly A[]) => boolean
```

Added in v3.0.0

## last

Get the last element in a `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.

**Signature**

```ts
export declare const last: <A>(as: readonly A[]) => any
```

**Example**

```ts
import { last } from '@fp-ts/core/ReadonlyArray'
import { some, none } from '@fp-ts/core/Option'

assert.deepStrictEqual(last([1, 2, 3]), some(3))
assert.deepStrictEqual(last([]), none)
```

Added in v3.0.0

## lookup

This function provides a safe way to read a value at a particular index from a `ReadonlyArray`

**Signature**

```ts
export declare const lookup: (i: number) => <A>(as: readonly A[]) => any
```

**Example**

```ts
import { lookup } from '@fp-ts/core/ReadonlyArray'
import { some, none } from '@fp-ts/core/Option'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe([1, 2, 3], lookup(1)), some(2))
assert.deepStrictEqual(pipe([1, 2, 3], lookup(3)), none)
```

Added in v3.0.0

## mapWithIndex

**Signature**

```ts
export declare const mapWithIndex: <A, B>(f: (i: number, a: A) => B) => (fa: readonly A[]) => readonly B[]
```

Added in v3.0.0

## modifyAt

Apply a function to the element at the specified index, creating a new `ReadonlyArray`, or returning `None` if the index is out
of bounds.

**Signature**

```ts
export declare const modifyAt: <A>(i: number, f: any) => (as: readonly A[]) => any
```

**Example**

```ts
import { modifyAt } from '@fp-ts/core/ReadonlyArray'
import { some, none } from '@fp-ts/core/Option'

const double = (x: number): number => x * 2
assert.deepStrictEqual(modifyAt(1, double)([1, 2, 3]), some([1, 4, 3]))
assert.deepStrictEqual(modifyAt(1, double)([]), none)
```

Added in v3.0.0

## orElse

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

In case of `ReadonlyArray` concatenates the inputs into a single array.

**Signature**

```ts
export declare const orElse: <B>(that: readonly B[]) => <A>(self: readonly A[]) => readonly (B | A)[]
```

**Example**

```ts
import * as RA from '@fp-ts/core/ReadonlyArray'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe([1, 2, 3], RA.orElse([4, 5])), [1, 2, 3, 4, 5])
```

Added in v3.0.0

## prependAll

Prepend an element to every member of a `ReadonlyArray`

**Signature**

```ts
export declare const prependAll: <A>(middle: A) => (as: readonly A[]) => readonly A[]
```

**Example**

```ts
import { prependAll } from '@fp-ts/core/ReadonlyArray'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe([1, 2, 3, 4], prependAll(9)), [9, 1, 9, 2, 9, 3, 9, 4])
```

Added in v3.0.0

## reverse

Reverse a `ReadonlyArray`, creating a new `ReadonlyArray`.

**Signature**

```ts
export declare const reverse: <A>(as: readonly A[]) => readonly A[]
```

**Example**

```ts
import { reverse } from '@fp-ts/core/ReadonlyArray'

assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
```

Added in v3.0.0

## rotate

Rotate a `ReadonlyArray` by `n` steps.

**Signature**

```ts
export declare const rotate: (n: number) => <A>(as: readonly A[]) => readonly A[]
```

**Example**

```ts
import { rotate } from '@fp-ts/core/ReadonlyArray'

assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
assert.deepStrictEqual(rotate(-2)([1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])
```

Added in v3.0.0

## scanLeft

Fold a `ReadonlyArray` from the left, keeping all intermediate results instead of only the final result.

**Signature**

```ts
export declare const scanLeft: <B, A>(b: B, f: (b: B, a: A) => B) => (as: readonly A[]) => any
```

**Example**

```ts
import { scanLeft } from '@fp-ts/core/ReadonlyArray'

assert.deepStrictEqual(scanLeft(10, (b, a: number) => b - a)([1, 2, 3]), [10, 9, 7, 4])
```

Added in v3.0.0

## scanRight

Fold a `ReadonlyArray` from the right, keeping all intermediate results instead of only the final result.

**Signature**

```ts
export declare const scanRight: <B, A>(b: B, f: (a: A, b: B) => B) => (as: readonly A[]) => any
```

**Example**

```ts
import { scanRight } from '@fp-ts/core/ReadonlyArray'

assert.deepStrictEqual(scanRight(10, (a: number, b) => b - a)([1, 2, 3]), [4, 5, 7, 10])
```

Added in v3.0.0

## size

Calculate the number of elements in a `ReadonlyArray`.

**Signature**

```ts
export declare const size: <A>(as: readonly A[]) => number
```

Added in v3.0.0

## some

Check if a predicate holds true for any `ReadonlyArray` member.

**Signature**

```ts
export declare const some: <A>(predicate: any) => (as: readonly A[]) => as is any
```

**Example**

```ts
import { some } from '@fp-ts/core/ReadonlyArray'
import { pipe } from '@fp-ts/core/Function'

const isPositive = (n: number): boolean => n > 0

assert.deepStrictEqual(pipe([-1, -2, 3], some(isPositive)), true)
assert.deepStrictEqual(pipe([-1, -2, -3], some(isPositive)), false)
```

Added in v3.0.0

## sort

Sort the elements of a `ReadonlyArray` in increasing order, creating a new `ReadonlyArray`.

**Signature**

```ts
export declare const sort: <B>(O: any) => <A extends B>(as: readonly A[]) => readonly A[]
```

**Example**

```ts
import { sort } from '@fp-ts/core/ReadonlyArray'
import * as N from '@fp-ts/core/number'

assert.deepStrictEqual(sort(N.Ord)([3, 2, 1]), [1, 2, 3])
```

Added in v3.0.0

## sortBy

Sort the elements of a `ReadonlyArray` in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
etc...

**Signature**

```ts
export declare const sortBy: <B>(ords: readonly any[]) => <A extends B>(as: readonly A[]) => readonly A[]
```

**Example**

```ts
import { sortBy } from '@fp-ts/core/ReadonlyArray'
import { contramap } from '@fp-ts/core/typeclasses/Ord'
import * as S from '@fp-ts/core/string'
import * as N from '@fp-ts/core/number'
import { pipe } from '@fp-ts/core/Function'

interface Person {
  name: string
  age: number
}
const byName = pipe(
  S.Ord,
  contramap((p: Person) => p.name)
)
const byAge = pipe(
  N.Ord,
  contramap((p: Person) => p.age)
)

const sortByNameByAge = sortBy([byName, byAge])

const persons = [
  { name: 'a', age: 1 },
  { name: 'b', age: 3 },
  { name: 'c', age: 2 },
  { name: 'b', age: 2 },
]
assert.deepStrictEqual(sortByNameByAge(persons), [
  { name: 'a', age: 1 },
  { name: 'b', age: 2 },
  { name: 'b', age: 3 },
  { name: 'c', age: 2 },
])
```

Added in v3.0.0

## spanLeft

Split a `ReadonlyArray` into two parts:

1. the longest initial subarray for which all elements satisfy the specified predicate
2. the remaining elements

**Signature**

```ts
export declare function spanLeft<A, B extends A>(
  refinement: Refinement<A, B>
): (as: ReadonlyArray<A>) => readonly [init: ReadonlyArray<B>, rest: ReadonlyArray<A>]
export declare function spanLeft<A>(
  predicate: Predicate<A>
): <B extends A>(bs: ReadonlyArray<B>) => readonly [init: ReadonlyArray<B>, rest: ReadonlyArray<B>]
export declare function spanLeft<A>(
  predicate: Predicate<A>
): (as: ReadonlyArray<A>) => readonly [init: ReadonlyArray<A>, rest: ReadonlyArray<A>]
```

**Example**

```ts
import { spanLeft } from '@fp-ts/core/ReadonlyArray'

assert.deepStrictEqual(spanLeft((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), [
  [1, 3],
  [2, 4, 5],
])
```

Added in v3.0.0

## splitAt

Splits a `ReadonlyArray` into two pieces, the first piece has max `n` elements.

**Signature**

```ts
export declare const splitAt: (n: number) => <A>(as: readonly A[]) => readonly [readonly A[], readonly A[]]
```

**Example**

```ts
import { splitAt } from '@fp-ts/core/ReadonlyArray'

assert.deepStrictEqual(splitAt(2)([1, 2, 3, 4, 5]), [
  [1, 2],
  [3, 4, 5],
])
```

Added in v3.0.0

## successes

Extracts from a `ReadonlyArray` of `Result`s all the `Success` elements.

**Signature**

```ts
export declare const successes: <E, A>(as: readonly any[]) => readonly A[]
```

**Example**

```ts
import { successes } from '@fp-ts/core/ReadonlyArray'
import { succeed, fail } from '@fp-ts/core/Result'

assert.deepStrictEqual(successes([succeed(1), fail('foo'), succeed(2)]), [1, 2])
```

Added in v3.0.0

## tail

Get all but the first element of a `ReadonlyArray`, creating a new `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.

**Signature**

```ts
export declare const tail: <A>(as: readonly A[]) => any
```

**Example**

```ts
import { tail } from '@fp-ts/core/ReadonlyArray'
import { some, none } from '@fp-ts/core/Option'

assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
assert.deepStrictEqual(tail([]), none)
```

Added in v3.0.0

## takeLeft

Keep only a max number of elements from the start of an `ReadonlyArray`, creating a new `ReadonlyArray`.

**Note**. `n` is normalized to a non negative integer.

**Signature**

```ts
export declare const takeLeft: (n: number) => <A>(as: readonly A[]) => readonly A[]
```

**Example**

```ts
import * as RA from '@fp-ts/core/ReadonlyArray'
import { pipe } from '@fp-ts/core/Function'

const input: ReadonlyArray<number> = [1, 2, 3]
assert.deepStrictEqual(pipe(input, RA.takeLeft(2)), [1, 2])

// out of bounds
assert.strictEqual(pipe(input, RA.takeLeft(4)), input)
assert.strictEqual(pipe(input, RA.takeLeft(-1)), input)
```

Added in v3.0.0

## takeLeftWhile

Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new `ReadonlyArray`.

**Signature**

```ts
export declare function takeLeftWhile<A, B extends A>(
  refinement: Refinement<A, B>
): (as: ReadonlyArray<A>) => ReadonlyArray<B>
export declare function takeLeftWhile<A>(
  predicate: Predicate<A>
): <B extends A>(bs: ReadonlyArray<B>) => ReadonlyArray<B>
export declare function takeLeftWhile<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => ReadonlyArray<A>
```

**Example**

```ts
import { takeLeftWhile } from '@fp-ts/core/ReadonlyArray'

assert.deepStrictEqual(takeLeftWhile((n: number) => n % 2 === 0)([2, 4, 3, 6]), [2, 4])
```

Added in v3.0.0

## takeRight

Keep only a max number of elements from the end of an `ReadonlyArray`, creating a new `ReadonlyArray`.

**Note**. `n` is normalized to a non negative integer.

**Signature**

```ts
export declare const takeRight: (n: number) => <A>(as: readonly A[]) => readonly A[]
```

**Example**

```ts
import * as RA from '@fp-ts/core/ReadonlyArray'
import { pipe } from '@fp-ts/core/Function'

const input: ReadonlyArray<number> = [1, 2, 3]
assert.deepStrictEqual(pipe(input, RA.takeRight(2)), [2, 3])

// out of bounds
assert.strictEqual(pipe(input, RA.takeRight(4)), input)
assert.strictEqual(pipe(input, RA.takeRight(-1)), input)
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A>(f: (a: A) => ReadonlyArray<unknown>) => (self: readonly A[]) => readonly A[]
```

**Example**

```ts
import * as RA from '@fp-ts/core/ReadonlyArray'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(
  pipe(
    [1, 2, 3],
    RA.tap(() => ['a', 'b'])
  ),
  [1, 1, 2, 2, 3, 3]
)
assert.deepStrictEqual(
  pipe(
    [1, 2, 3],
    RA.tap(() => [])
  ),
  []
)
```

Added in v3.0.0

## traverseFilter

Filter values inside a context.

**Signature**

```ts
export declare const traverseFilter: <F extends any>(
  F: any
) => <B extends A, S, R, O, E, A = B>(predicate: (a: A) => any) => (self: readonly B[]) => any
```

**Example**

```ts
import { pipe } from '@fp-ts/core/Function'
import * as RA from '@fp-ts/core/ReadonlyArray'
import * as T from '@fp-ts/core/Async'

const traverseFilter = RA.traverseFilter(T.ApplicativePar)
async function test() {
  assert.deepStrictEqual(
    await pipe(
      [-1, 2, 3],
      traverseFilter((n) => T.of(n > 0))
    )(),
    [2, 3]
  )
}
test()
```

Added in v3.0.0

## traversePartition

**Signature**

```ts
export declare const traversePartition: <F extends any>(
  ApplicativeF: any
) => <B extends A, S, R, O, E, A = B>(predicate: (a: A) => any) => (self: readonly B[]) => any
```

Added in v3.0.0

## unfold

**Signature**

```ts
export declare const unfold: <B, A>(b: B, f: (b: B) => any) => readonly A[]
```

Added in v3.0.0

## union

Creates a `ReadonlyArray` of unique values, in order, from all given `ReadonlyArray`s using a `Eq` for equality comparisons.

**Signature**

```ts
export declare const union: <A>(E: any) => any
```

**Example**

```ts
import { union } from '@fp-ts/core/ReadonlyArray'
import * as N from '@fp-ts/core/number'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe([1, 2], union(N.Eq)([2, 3])), [1, 2, 3])
```

Added in v3.0.0

## uniq

Remove duplicates from a `ReadonlyArray`, keeping the first occurrence of an element.

**Signature**

```ts
export declare const uniq: <A>(E: any) => (self: readonly A[]) => readonly A[]
```

**Example**

```ts
import { uniq } from '@fp-ts/core/ReadonlyArray'
import * as N from '@fp-ts/core/number'

assert.deepStrictEqual(uniq(N.Eq)([1, 2, 1]), [1, 2])
```

Added in v3.0.0

## unzip

This function is the inverse of `zip`. Takes a `ReadonlyArray` of pairs and return two corresponding `ReadonlyArray`s.

**Signature**

```ts
export declare const unzip: <A, B>(as: readonly (readonly [A, B])[]) => readonly [readonly A[], readonly B[]]
```

**Example**

```ts
import { unzip } from '@fp-ts/core/ReadonlyArray'

assert.deepStrictEqual(
  unzip([
    [1, 'a'],
    [2, 'b'],
    [3, 'c'],
  ]),
  [
    [1, 2, 3],
    ['a', 'b', 'c'],
  ]
)
```

Added in v3.0.0

## updateAt

Change the element at the specified index, creating a new `ReadonlyArray`, or returning `None` if the index is out of bounds.

**Signature**

```ts
export declare const updateAt: <A>(i: number, a: A) => (as: readonly A[]) => any
```

**Example**

```ts
import { updateAt } from '@fp-ts/core/ReadonlyArray'
import { some, none } from '@fp-ts/core/Option'

assert.deepStrictEqual(updateAt(1, 1)([1, 2, 3]), some([1, 1, 3]))
assert.deepStrictEqual(updateAt(1, 1)([]), none)
```

Added in v3.0.0

## zip

Takes two `ReadonlyArray`s and returns a `ReadonlyArray` of corresponding pairs. If one input `ReadonlyArray` is short, excess elements of the
longer `ReadonlyArray` are discarded.

**Signature**

```ts
export declare const zip: <B>(bs: readonly B[]) => <A>(as: readonly A[]) => readonly (readonly [A, B])[]
```

**Example**

```ts
import { zip } from '@fp-ts/core/ReadonlyArray'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe([1, 2, 3], zip(['a', 'b', 'c', 'd'])), [
  [1, 'a'],
  [2, 'b'],
  [3, 'c'],
])
```

Added in v3.0.0

## zipWith

Apply a function to pairs of elements at the same index in two `ReadonlyArray`s, collecting the results in a new `ReadonlyArray`. If one
input `ReadonlyArray` is short, excess elements of the longer `ReadonlyArray` are discarded.

**Signature**

```ts
export declare const zipWith: <B, A, C>(fb: readonly B[], f: (a: A, b: B) => C) => (fa: readonly A[]) => readonly C[]
```

**Example**

```ts
import { zipWith } from '@fp-ts/core/ReadonlyArray'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(
  pipe(
    [1, 2, 3],
    zipWith(['a', 'b', 'c', 'd'], (n, s) => s + n)
  ),
  ['a1', 'b2', 'c3']
)
```

Added in v3.0.0
