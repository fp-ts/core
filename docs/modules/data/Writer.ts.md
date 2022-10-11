---
title: data/Writer.ts
nav_order: 45
parent: Modules
---

## Writer overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [tell](#tell)
- [conversions](#conversions)
  - [toReadonlyArray](#toreadonlyarray)
- [folding](#folding)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [getters](#getters)
  - [left](#left)
  - [right](#right)
- [instances](#instances)
  - [Bifunctor](#bifunctor)
  - [Comonad](#comonad)
  - [Functor](#functor)
  - [Traversable](#traversable)
  - [getApplicative](#getapplicative)
  - [getApply](#getapply)
  - [getFlattenable](#getflattenable)
  - [getFromIdentity](#getfromidentity)
  - [getMonad](#getmonad)
- [mapping](#mapping)
  - [flap](#flap)
  - [map](#map)
  - [mapBoth](#mapboth)
- [model](#model)
  - [Writer (type alias)](#writer-type-alias)
- [traversing](#traversing)
  - [sequence](#sequence)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [traverse](#traverse)
  - [traverseNonEmptyReadonlyArray](#traversenonemptyreadonlyarray)
  - [traverseNonEmptyReadonlyArrayWithIndex](#traversenonemptyreadonlyarraywithindex)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
- [type lambdas](#type-lambdas)
  - [WriterTypeLambda (interface)](#writertypelambda-interface)
  - [WriterTypeLambdaFix (interface)](#writertypelambdafix-interface)
- [utils](#utils)
  - [censor](#censor)
  - [duplicate](#duplicate)
  - [extend](#extend)
  - [listen](#listen)
  - [listens](#listens)
  - [mapLeft](#mapleft)
  - [pass](#pass)
  - [reverse](#reverse)

---

# constructors

## tell

Appends a value to the accumulator.

**Signature**

```ts
export declare const tell: <E>(e: E) => Writer<E, void>
```

Added in v3.0.0

# conversions

## toReadonlyArray

**Signature**

```ts
export declare const toReadonlyArray: <E, A>(self: Writer<E, A>) => readonly A[]
```

Added in v3.0.0

# folding

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(_: any) => <A>(f: (a: A) => M) => <E>(self: Writer<E, A>) => M
```

Added in v3.0.0

## reduce

**Signature**

```ts
export declare const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <E>(self: Writer<E, A>) => B
```

Added in v3.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <E>(self: Writer<E, A>) => B
```

Added in v3.0.0

# getters

## left

**Signature**

```ts
export declare const left: <E, A>(self: Writer<E, A>) => E
```

Added in v3.0.0

## right

**Signature**

```ts
export declare const right: <E, A>(self: Writer<E, A>) => A
```

Added in v3.0.0

# instances

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: any
```

Added in v3.0.0

## Comonad

**Signature**

```ts
export declare const Comonad: any
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
export declare const getApplicative: <E>(Monoid: any) => any
```

Added in v3.0.0

## getApply

**Signature**

```ts
export declare const getApply: <E>(Semigroup: any) => any
```

Added in v3.0.0

## getFlattenable

**Signature**

```ts
export declare const getFlattenable: <E>(S: any) => any
```

Added in v3.0.0

## getFromIdentity

**Signature**

```ts
export declare const getFromIdentity: <E>(Monoid: any) => any
```

Added in v3.0.0

## getMonad

**Signature**

```ts
export declare const getMonad: <E>(M: any) => any
```

Added in v3.0.0

# mapping

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: Writer<E, (a: A) => B>) => Writer<E, B>
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(self: Writer<E, A>) => Writer<E, B>
```

Added in v3.0.0

## mapBoth

Returns an effect whose failure and success channels have been mapped by
the specified pair of functions, `f` and `g`.

**Signature**

```ts
export declare const mapBoth: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (self: Writer<E, A>) => Writer<G, B>
```

Added in v3.0.0

# model

## Writer (type alias)

**Signature**

```ts
export type Writer<E, A> = readonly [E, A]
```

Added in v3.0.0

# traversing

## sequence

**Signature**

```ts
export declare const sequence: <F extends any>(F: any) => <W, S, R, O, E, A>(self: Writer<W, any>) => any
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(getApplicative(M))`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <E>(
  Monoid: any
) => <A>(arr: readonly Writer<E, A>[]) => Writer<E, readonly A[]>
```

Added in v3.0.0

## traverse

**Signature**

```ts
export declare const traverse: <F extends any>(
  F: any
) => <A, S, R, O, FE, B>(f: (a: A) => any) => <E>(self: Writer<E, A>) => any
```

Added in v3.0.0

## traverseNonEmptyReadonlyArray

Equivalent to `NonEmptyReadonlyArray#traverse(getApply(S))`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArray: <E>(
  Semigroup: any
) => <A, B>(f: (a: A) => Writer<E, B>) => (as: any) => Writer<E, any>
```

Added in v3.0.0

## traverseNonEmptyReadonlyArrayWithIndex

Equivalent to `NonEmptyReadonlyArray#traverseWithIndex(getApply(M))`.

**Signature**

```ts
export declare const traverseNonEmptyReadonlyArrayWithIndex: <E>(
  Semigroup: any
) => <A, B>(f: (index: number, a: A) => Writer<E, B>) => (as: any) => Writer<E, any>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(getApplicative(M))`.

**Signature**

```ts
export declare const traverseReadonlyArray: <E>(
  Monoid: any
) => <A, B>(f: (a: A) => Writer<E, B>) => (as: readonly A[]) => Writer<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(getApplicative(M))`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <E>(
  Monoid: any
) => <A, B>(f: (index: number, a: A) => Writer<E, B>) => (as: readonly A[]) => Writer<E, readonly B[]>
```

Added in v3.0.0

# type lambdas

## WriterTypeLambda (interface)

**Signature**

```ts
export interface WriterTypeLambda extends TypeLambda {
  readonly type: Writer<this['Out2'], this['Out1']>
}
```

Added in v3.0.0

## WriterTypeLambdaFix (interface)

**Signature**

```ts
export interface WriterTypeLambdaFix<E> extends TypeLambda {
  readonly type: Writer<E, this['Out1']>
}
```

Added in v3.0.0

# utils

## censor

Modify the final accumulator value by applying a function.

**Signature**

```ts
export declare const censor: <E>(f: (e: E) => E) => <A>(self: Writer<E, A>) => Writer<E, A>
```

Added in v3.0.0

## duplicate

**Signature**

```ts
export declare const duplicate: <E, A>(self: Writer<E, A>) => Writer<E, Writer<E, A>>
```

Added in v3.0.0

## extend

**Signature**

```ts
export declare const extend: <E, A, B>(f: (self: Writer<E, A>) => B) => (self: Writer<E, A>) => Writer<E, B>
```

Added in v3.0.0

## listen

Modifies the result to include the changes to the accumulator.

**Signature**

```ts
export declare const listen: <E, A>(self: Writer<E, A>) => Writer<E, readonly [E, A]>
```

Added in v3.0.0

## listens

Projects a value from modifications made to the accumulator during an action.

**Signature**

```ts
export declare const listens: <E, B>(f: (e: E) => B) => <A>(self: Writer<E, A>) => Writer<E, readonly [A, B]>
```

Added in v3.0.0

## mapLeft

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(self: Writer<E, A>) => Writer<G, A>
```

Added in v3.0.0

## pass

Applies the returned function to the accumulator.

**Signature**

```ts
export declare const pass: <E, A>(self: Writer<E, readonly [A, (e: E) => E]>) => Writer<E, A>
```

Added in v3.0.0

## reverse

**Signature**

```ts
export declare const reverse: <E, A>(self: Writer<E, A>) => Writer<A, E>
```

Added in v3.0.0
