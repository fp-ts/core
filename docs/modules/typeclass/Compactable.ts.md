---
title: typeclass/Compactable.ts
nav_order: 13
parent: Modules
---

## Compactable overview

`Compactable` represents data structures which can be _compacted_/_separated_.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [models](#models)
  - [Compactable (interface)](#compactable-interface)
- [utils](#utils)
  - [compactComposition](#compactcomposition)
  - [separate](#separate)

---

# models

## Compactable (interface)

**Signature**

```ts
export interface Compactable<F extends TypeLambda> extends TypeClass<F> {
  readonly compact: <R, O, E, A>(self: Kind<F, R, O, E, Option<A>>) => Kind<F, R, O, E, A>
}
```

Added in v1.0.0

# utils

## compactComposition

Returns a default `compact` composition.

**Signature**

```ts
export declare const compactComposition: <F extends TypeLambda, G extends TypeLambda>(
  F: Covariant<F>,
  G: Compactable<G>
) => <FR, FO, FE, GR, GO, GE, A>(
  self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, any>>
) => Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>
```

Added in v1.0.0

## separate

**Signature**

```ts
export declare const separate: <F extends TypeLambda>(
  F: Covariant<F> & Compactable<F>
) => <R, O, E, A, B>(self: Kind<F, R, O, E, any>) => readonly [Kind<F, R, O, E, A>, Kind<F, R, O, E, B>]
```

Added in v1.0.0
