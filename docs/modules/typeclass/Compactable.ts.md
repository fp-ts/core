---
title: typeclass/Compactable.ts
nav_order: 24
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
export declare const compactComposition: <F extends any, G extends any>(
  F: any,
  G: Compactable<G>
) => <FR, FO, FE, GR, GO, GE, A>(self: any) => any
```

Added in v1.0.0

## separate

**Signature**

```ts
export declare const separate: <F extends any>(F: any) => <R, O, E, A, B>(self: any) => [any, any]
```

Added in v1.0.0
