---
title: typeclass/Chainable.ts
nav_order: 23
parent: Modules
---

## Chainable overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [sequencing](#sequencing)
  - [andThenDiscard](#andthendiscard)
- [type class](#type-class)
  - [Chainable (interface)](#chainable-interface)
- [utils](#utils)
  - [bind](#bind)
  - [tap](#tap)

---

# sequencing

## andThenDiscard

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const andThenDiscard: <F extends any>(
  F: Chainable<F>
) => <R2, O2, E2, _>(that: any) => <R1, O1, E1, A>(self: any) => any
```

Added in v1.0.0

# type class

## Chainable (interface)

**Signature**

```ts
export interface Chainable<F extends TypeLambda> extends FlatMap<F>, Covariant<F> {}
```

Added in v1.0.0

# utils

## bind

**Signature**

```ts
export declare const bind: <F extends any>(
  F: Chainable<F>
) => <N extends string, A extends object, R2, O2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => any
) => <R1, O1, E1>(self: any) => any
```

Added in v1.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <F extends any>(
  F: Chainable<F>
) => <A, R2, O2, E2, _>(f: (a: A) => any) => <R1, O1, E1>(self: any) => any
```

Added in v1.0.0
