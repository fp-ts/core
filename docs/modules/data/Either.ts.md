---
title: data/Either.ts
nav_order: 1
parent: Modules
---

## Either overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [models](#models)
  - [Either (type alias)](#either-type-alias)
  - [Left (interface)](#left-interface)
  - [Right (interface)](#right-interface)
- [type lambdas](#type-lambdas)
  - [EitherTypeLambda (interface)](#eithertypelambda-interface)

---

# models

## Either (type alias)

**Signature**

```ts
export type Either<E, A> = Left<E> | Right<A>
```

Added in v1.0.0

## Left (interface)

**Signature**

```ts
export interface Left<out E> {
  readonly _tag: 'Left'
  readonly left: E
}
```

Added in v1.0.0

## Right (interface)

**Signature**

```ts
export interface Right<out A> {
  readonly _tag: 'Right'
  readonly right: A
}
```

Added in v1.0.0

# type lambdas

## EitherTypeLambda (interface)

**Signature**

```ts
export interface EitherTypeLambda extends TypeLambda {
  readonly type: Either<this['Out1'], this['Target']>
}
```

Added in v1.0.0
