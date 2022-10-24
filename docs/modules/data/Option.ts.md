---
title: data/Option.ts
nav_order: 2
parent: Modules
---

## Option overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [models](#models)
  - [None (interface)](#none-interface)
  - [Option (type alias)](#option-type-alias)
  - [Some (interface)](#some-interface)
- [type lambdas](#type-lambdas)
  - [OptionTypeLambda (interface)](#optiontypelambda-interface)

---

# models

## None (interface)

**Signature**

```ts
export interface None {
  readonly _tag: 'None'
}
```

Added in v1.0.0

## Option (type alias)

**Signature**

```ts
export type Option<A> = None | Some<A>
```

Added in v1.0.0

## Some (interface)

**Signature**

```ts
export interface Some<out A> {
  readonly _tag: 'Some'
  readonly value: A
}
```

Added in v1.0.0

# type lambdas

## OptionTypeLambda (interface)

**Signature**

```ts
export interface OptionTypeLambda extends TypeLambda {
  readonly type: Option<this['Target']>
}
```

Added in v1.0.0
