---
title: typeclasses/Compactable.ts
nav_order: 49
parent: Modules
---

## Compactable overview

`Compactable` represents data structures which can be _compacted_/_separated_.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Compactable (interface)](#compactable-interface)
- [utils](#utils)
  - [compactComposition](#compactcomposition)
  - [separate](#separate)

---

# model

## Compactable (interface)

**Signature**

```ts
export interface Compactable<F extends TypeLambda> extends TypeClass<F> {
  readonly compact: <S, R, O, E, A>(self: Kind<F, S, R, O, E, Option<A>>) => Kind<F, S, R, O, E, A>
}
```

Added in v3.0.0

# utils

## compactComposition

Returns a default `compact` composition.

**Signature**

```ts
export declare const compactComposition: <F extends any, G extends any>(
  Functor: any,
  Compactable: Compactable<G>
) => <FS, FR, FO, FE, GS, GR, GO, GE, A>(self: any) => any
```

Added in v3.0.0

## separate

**Signature**

```ts
export declare const separate: <F extends any>(
  Functor: any,
  Compactable: Compactable<F>
) => <S, R, O, E, A, B>(self: any) => readonly [any, any]
```

Added in v3.0.0
