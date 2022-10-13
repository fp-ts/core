---
title: FoldableWithIndex.ts
nav_order: 16
parent: Modules
---

## FoldableWithIndex overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [FoldableWithIndex (interface)](#foldablewithindex-interface)
- [utils](#utils)
  - [foldMapWithIndex](#foldmapwithindex)

---

# type class

## FoldableWithIndex (interface)

**Signature**

```ts
export interface FoldableWithIndex<F extends TypeLambda, I> extends TypeClass<F> {
  readonly reduceWithIndex: <A, B>(b: B, f: (b: B, a: A, i: I) => B) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => B
  readonly reduceRightWithIndex: <A, B>(
    b: B,
    f: (b: B, a: A, i: I) => B
  ) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => B
}
```

Added in v3.0.0

# utils

## foldMapWithIndex

**Signature**

```ts
export declare const foldMapWithIndex: <F extends any, I>(
  FoldableWithIndex: FoldableWithIndex<F, I>
) => <M>(Monoid: any) => <A>(f: (a: A, i: I) => M) => <S, R, O, E>(self: any) => M
```

Added in v3.0.0
