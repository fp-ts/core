---
title: typeclass/Of.ts
nav_order: 17
parent: Modules
---

## Of overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Of (interface)](#of-interface)
- [utils](#utils)
  - [Do](#do)
  - [ofComposition](#ofcomposition)
  - [unit](#unit)

---

# type class

## Of (interface)

**Signature**

```ts
export interface Of<F extends TypeLambda> extends TypeClass<F> {
  readonly of: <A>(a: A) => Kind<F, unknown, never, never, A>
}
```

Added in v1.0.0

# utils

## Do

**Signature**

```ts
export declare const Do: <F extends TypeLambda>(F: Of<F>) => Kind<F, unknown, never, never, {}>
```

Added in v1.0.0

## ofComposition

Returns a default `of` composition.

**Signature**

```ts
export declare const ofComposition: <F extends TypeLambda, G extends TypeLambda>(
  F: Of<F>,
  G: Of<G>
) => <A>(a: A) => Kind<F, unknown, never, never, Kind<G, unknown, never, never, A>>
```

Added in v1.0.0

## unit

**Signature**

```ts
export declare const unit: <F extends TypeLambda>(F: Of<F>) => Kind<F, unknown, never, never, void>
```

Added in v1.0.0
