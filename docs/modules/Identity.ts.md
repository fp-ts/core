---
title: Identity.ts
nav_order: 6
parent: Modules
---

## Identity overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [do notation](#do-notation)
  - [Do](#do)
  - [andThenBind](#andthenbind)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [let](#let)
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
- [models](#models)
  - [Identity (type alias)](#identity-type-alias)
- [type lambdas](#type-lambdas)
  - [IdentityTypeLambda (interface)](#identitytypelambda-interface)
  - [IdentityTypeLambdaFix (interface)](#identitytypelambdafix-interface)

---

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
export declare const andThenBind: {
  <N extends string, A extends object, B>(name: Exclude<N, keyof A>, that: B): (self: A) => {
    [K in N | keyof A]: K extends keyof A ? A[K] : B
  }
  <A extends object, N extends string, B>(self: A, name: Exclude<N, keyof A>, that: B): {
    [K in N | keyof A]: K extends keyof A ? A[K] : B
  }
}
```

Added in v1.0.0

## bind

**Signature**

```ts
export declare const bind: {
  <N extends string, A extends object, B>(name: Exclude<N, keyof A>, f: (a: A) => B): (self: A) => {
    [K in N | keyof A]: K extends keyof A ? A[K] : B
  }
  <A extends object, N extends string, B>(self: A, name: Exclude<N, keyof A>, f: (a: A) => B): {
    [K in N | keyof A]: K extends keyof A ? A[K] : B
  }
}
```

Added in v1.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: {
  <N extends string>(name: N): <A>(self: A) => { [K in N]: A }
  <A, N extends string>(self: A, name: N): { [K in N]: A }
}
```

Added in v1.0.0

## let

**Signature**

```ts
export declare const let: {
  <N extends string, A extends object, B>(name: Exclude<N, keyof A>, f: (a: A) => B): (self: A) => {
    [K in N | keyof A]: K extends keyof A ? A[K] : B
  }
  <A extends object, N extends string, B>(self: A, name: Exclude<N, keyof A>, f: (a: A) => B): {
    [K in N | keyof A]: K extends keyof A ? A[K] : B
  }
}
```

Added in v1.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<IdentityTypeLambda>
```

Added in v1.0.0

## Chainable

**Signature**

```ts
export declare const Chainable: chainable.Chainable<IdentityTypeLambda>
```

Added in v1.0.0

## Covariant

**Signature**

```ts
export declare const Covariant: covariant.Covariant<IdentityTypeLambda>
```

Added in v1.0.0

## FlatMap

**Signature**

```ts
export declare const FlatMap: flatMap_.FlatMap<IdentityTypeLambda>
```

Added in v1.0.0

## Foldable

**Signature**

```ts
export declare const Foldable: foldable.Foldable<IdentityTypeLambda>
```

Added in v1.0.0

## Invariant

**Signature**

```ts
export declare const Invariant: invariant.Invariant<IdentityTypeLambda>
```

Added in v1.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<IdentityTypeLambda>
```

Added in v1.0.0

## Of

**Signature**

```ts
export declare const Of: of_.Of<IdentityTypeLambda>
```

Added in v1.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<IdentityTypeLambda>
```

Added in v1.0.0

## Product

**Signature**

```ts
export declare const Product: product_.Product<IdentityTypeLambda>
```

Added in v1.0.0

## SemiApplicative

**Signature**

```ts
export declare const SemiApplicative: semiApplicative.SemiApplicative<IdentityTypeLambda>
```

Added in v1.0.0

## SemiProduct

**Signature**

```ts
export declare const SemiProduct: semiProduct.SemiProduct<IdentityTypeLambda>
```

Added in v1.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: traversable.Traversable<IdentityTypeLambda>
```

Added in v1.0.0

## getSemiAlternative

**Signature**

```ts
export declare const getSemiAlternative: <A>(
  S: Semigroup<A>
) => semiAlternative.SemiAlternative<IdentityTypeLambdaFix<A>>
```

Added in v1.0.0

## getSemiCoproduct

**Signature**

```ts
export declare const getSemiCoproduct: <A>(S: Semigroup<A>) => semiCoproduct.SemiCoproduct<IdentityTypeLambdaFix<A>>
```

Added in v1.0.0

# models

## Identity (type alias)

**Signature**

```ts
export type Identity<A> = A
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
