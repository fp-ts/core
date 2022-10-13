---
title: Show.ts
nav_order: 28
parent: Modules
---

## Show overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [Contravariant](#contravariant)
- [type class](#type-class)
  - [Show (interface)](#show-interface)
- [type lambdas](#type-lambdas)
  - [ShowTypeLambda (interface)](#showtypelambda-interface)
- [utils](#utils)
  - [contramap](#contramap)
  - [struct](#struct)
  - [tuple](#tuple)

---

# instances

## Contravariant

**Signature**

```ts
export declare const Contravariant: any
```

Added in v3.0.0

# type class

## Show (interface)

**Signature**

```ts
export interface Show<A> {
  readonly show: (a: A) => string
}
```

Added in v3.0.0

# type lambdas

## ShowTypeLambda (interface)

**Signature**

```ts
export interface ShowTypeLambda extends TypeLambda {
  readonly type: Show<this['In1']>
}
```

Added in v3.0.0

# utils

## contramap

**Signature**

```ts
export declare const contramap: <B, A>(f: (b: B) => A) => (self: Show<A>) => Show<B>
```

Added in v3.0.0

## struct

**Signature**

```ts
export declare const struct: <A>(shows: { [K in keyof A]: Show<A[K]> }) => Show<{ readonly [K in keyof A]: A[K] }>
```

Added in v3.0.0

## tuple

**Signature**

```ts
export declare const tuple: <A extends readonly unknown[]>(
  ...shows: { [K in keyof A]: Show<A[K]> }
) => Show<Readonly<A>>
```

Added in v3.0.0
