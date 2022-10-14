---
title: Foldable.ts
nav_order: 11
parent: Modules
---

## Foldable overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Foldable (interface)](#foldable-interface)
- [utils](#utils)
  - [foldMap](#foldmap)

---

# type class

## Foldable (interface)

**Signature**

```ts
export interface Foldable<F extends TypeLambda> extends TypeClass<F> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => B
  readonly reduceRight: <A, B>(b: B, f: (b: B, a: A) => B) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => B
}
```

Added in v3.0.0

# utils

## foldMap

**Signature**

```ts
export declare const foldMap: <F extends any>(
  Foldable: Foldable<F>
) => <M>(Monoid: any) => <A>(f: (a: A) => M) => <S, R, O, E>(self: any) => M
```

Added in v3.0.0
