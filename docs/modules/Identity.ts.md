---
title: Identity.ts
nav_order: 6
parent: Modules
---

## Identity overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [of](#of)
- [conversions](#conversions)
  - [toArray](#toarray)
  - [toArrayWith](#toarraywith)
- [do notation](#do-notation)
  - [Do](#do)
  - [andThenBind](#andthenbind)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [let](#let)
- [folding](#folding)
  - [foldMap](#foldmap)
  - [foldMapKind](#foldmapkind)
  - [reduce](#reduce)
  - [reduceKind](#reducekind)
  - [reduceRight](#reduceright)
  - [reduceRightKind](#reducerightkind)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Chainable](#chainable)
  - [Covariant](#covariant)
  - [FlatMap](#flatmap)
  - [Foldable](#foldable)
  - [Invariant](#invariant)
  - [Monad](#monad)
  - [Of](#of)
  - [Pointed](#pointed)
  - [Product](#product)
  - [SemiApplicative](#semiapplicative)
  - [SemiProduct](#semiproduct)
  - [Traversable](#traversable)
  - [getSemiAlternative](#getsemialternative)
  - [getSemiCoproduct](#getsemicoproduct)
  - [liftSemigroup](#liftsemigroup)
- [lifting](#lifting)
  - [lift2](#lift2)
- [mapping](#mapping)
  - [as](#as)
  - [asUnit](#asunit)
  - [flap](#flap)
- [models](#models)
  - [Identity (type alias)](#identity-type-alias)
- [sequencing](#sequencing)
  - [andThenDiscard](#andthendiscard)
  - [flatMap](#flatmap)
- [traversing](#traversing)
  - [sequence](#sequence)
  - [traverse](#traverse)
  - [traverseTap](#traversetap)
- [type lambdas](#type-lambdas)
  - [IdentityTypeLambda (interface)](#identitytypelambda-interface)
  - [IdentityTypeLambdaFix (interface)](#identitytypelambdafix-interface)
- [utils](#utils)
  - [andThen](#andthen)
  - [ap](#ap)
  - [composeKleisliArrow](#composekleisliarrow)
  - [element](#element)
  - [flatten](#flatten)
  - [liftMonoid](#liftmonoid)
  - [map](#map)
  - [struct](#struct)
  - [tap](#tap)
  - [tuple](#tuple)
  - [tupled](#tupled)
  - [unit](#unit)

---

# constructors

## of

**Signature**

```ts
export declare const of: <A>(a: A) => A
```

Added in v1.0.0

# conversions

## toArray

**Signature**

```ts
export declare const toArray: <A>(self: A) => A[]
```

Added in v1.0.0

## toArrayWith

**Signature**

```ts
export declare const toArrayWith: <A, B>(f: (a: A) => B) => (self: A) => B[]
```

Added in v1.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: {}
```

Added in v1.0.0

## andThenBind

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const andThenBind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  that: B
) => (self: A) => { [K in N | keyof A]: K extends keyof A ? A[K] : B }
```

Added in v1.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: A) => { [K in N | keyof A]: K extends keyof A ? A[K] : B }
```

Added in v1.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(name: N) => <A>(self: A) => { [K in N]: A }
```

Added in v1.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: A) => { [K in N | keyof A]: K extends keyof A ? A[K] : B }
```

Added in v1.0.0

# folding

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(M: any) => <A>(f: (a: A) => M) => (self: A) => M
```

Added in v1.0.0

## foldMapKind

**Signature**

```ts
export declare const foldMapKind: <G extends any>(G: any) => <A, R, O, E, B>(f: (a: A) => any) => (self: A) => any
```

Added in v1.0.0

## reduce

**Signature**

```ts
export declare const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => (self: A) => B
```

Added in v1.0.0

## reduceKind

**Signature**

```ts
export declare const reduceKind: <G extends any>(
  G: any
) => <B, A, R, O, E>(b: B, f: (b: B, a: A) => any) => (self: A) => any
```

Added in v1.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <B, A>(b: B, f: (b: B, a: A) => B) => (self: A) => B
```

Added in v1.0.0

## reduceRightKind

**Signature**

```ts
export declare const reduceRightKind: <G extends any>(
  G: any
) => <B, A, R, O, E>(b: B, f: (b: B, a: A) => any) => (self: A) => any
```

Added in v1.0.0

# instances

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

## Covariant

**Signature**

```ts
export declare const Covariant: any
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

## SemiApplicative

**Signature**

```ts
export declare const SemiApplicative: any
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

## getSemiAlternative

**Signature**

```ts
export declare const getSemiAlternative: <A>(S: any) => any
```

Added in v1.0.0

## getSemiCoproduct

**Signature**

```ts
export declare const getSemiCoproduct: <A>(S: any) => any
```

Added in v1.0.0

## liftSemigroup

**Signature**

```ts
export declare const liftSemigroup: <A>(S: any) => any
```

Added in v1.0.0

# lifting

## lift2

Lifts a binary function into `Identity`.

**Signature**

```ts
export declare const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: A, fb: B) => C
```

Added in v1.0.0

# mapping

## as

Maps the success value of this effect to the specified constant value.

**Signature**

```ts
export declare const as: <B>(b: B) => <_>(self: _) => B
```

Added in v1.0.0

## asUnit

Returns the effect resulting from mapping the success of this effect to unit.

**Signature**

```ts
export declare const asUnit: <_>(self: _) => Identity<void>
```

Added in v1.0.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: (a: A) => B) => B
```

Added in v1.0.0

# models

## Identity (type alias)

**Signature**

```ts
export type Identity<A> = A
```

Added in v1.0.0

# sequencing

## andThenDiscard

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const andThenDiscard: <_>(that: _) => <A>(self: A) => A
```

Added in v1.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <A, B>(f: (a: A) => B) => (self: A) => B
```

Added in v1.0.0

# traversing

## sequence

**Signature**

```ts
export declare const sequence: <F extends any>(F: any) => <R, O, E, A>(fas: any) => any
```

Added in v1.0.0

## traverse

**Signature**

```ts
export declare const traverse: <F extends any>(F: any) => <A, R, O, E, B>(f: (a: A) => any) => (self: A) => any
```

Added in v1.0.0

## traverseTap

**Signature**

```ts
export declare const traverseTap: <F extends any>(F: any) => <A, R, O, E, B>(f: (a: A) => any) => (self: A) => any
```

Added in v1.0.0

# type lambdas

## IdentityTypeLambda (interface)

**Signature**

```ts
export interface IdentityTypeLambda extends TypeLambda {
  readonly type: Identity<this['Target']>
}
```

Added in v1.0.0

## IdentityTypeLambdaFix (interface)

**Signature**

```ts
export interface IdentityTypeLambdaFix<A> extends TypeLambda {
  readonly type: Identity<A>
}
```

Added in v1.0.0

# utils

## andThen

**Signature**

```ts
export declare const andThen: <B>(that: B) => <_>(self: _) => B
```

Added in v1.0.0

## ap

**Signature**

```ts
export declare const ap: <A>(fa: A) => <B>(self: (a: A) => B) => B
```

Added in v1.0.0

## composeKleisliArrow

**Signature**

```ts
export declare const composeKleisliArrow: <B, C>(bfc: (b: B) => C) => <A>(afb: (a: A) => B) => (a: A) => C
```

Added in v1.0.0

## element

Adds an element to the end of a tuple.

**Signature**

```ts
export declare const element: <B>(fb: B) => <A extends readonly unknown[]>(self: A) => [...A, B]
```

Added in v1.0.0

## flatten

**Signature**

```ts
export declare const flatten: <A>(self: A) => A
```

Added in v1.0.0

## liftMonoid

**Signature**

```ts
export declare const liftMonoid: <A>(M: any) => any
```

Added in v1.0.0

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (self: A) => B
```

Added in v1.0.0

## struct

**Signature**

```ts
export declare const struct: <R extends Record<string, any>>(r: R) => { [K in keyof R]: R[K] }
```

Added in v1.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A, _>(f: (a: A) => _) => (self: A) => A
```

Added in v1.0.0

## tuple

**Signature**

```ts
export declare const tuple: <T extends readonly any[]>(...tuple: T) => { [I in keyof T]: T[I] }
```

Added in v1.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(self: A) => [A]
```

Added in v1.0.0

## unit

**Signature**

```ts
export declare const unit: void
```

Added in v1.0.0
