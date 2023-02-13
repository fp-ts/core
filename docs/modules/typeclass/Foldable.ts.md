---
title: typeclass/Foldable.ts
nav_order: 31
parent: Modules
---

## Foldable overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Foldable (interface)](#foldable-interface)
- [utils](#utils)
  - [combineMap](#combinemap)
  - [coproductMapKind](#coproductmapkind)
  - [reduceComposition](#reducecomposition)
  - [reduceKind](#reducekind)
  - [toArray](#toarray)
  - [toArrayMap](#toarraymap)

---

# type class

## Foldable (interface)

**Signature**

```ts
export interface Foldable<F extends TypeLambda> extends TypeClass<F> {
  readonly reduce: {
    <A, B>(b: B, f: (b: B, a: A) => B): <R, O, E>(self: Kind<F, R, O, E, A>) => B
    <R, O, E, A, B>(self: Kind<F, R, O, E, A>, b: B, f: (b: B, a: A) => B): B
  }
}
```

Added in v1.0.0

# utils

## combineMap

**Signature**

```ts
export declare const combineMap: <F extends TypeLambda>(
  F: Foldable<F>
) => <M>(M: Monoid<M>) => {
  <A>(f: (a: A) => M): <R, O, E>(self: Kind<F, R, O, E, A>) => M
  <R, O, E, A>(self: Kind<F, R, O, E, A>, f: (a: A) => M): M
}
```

Added in v1.0.0

## coproductMapKind

**Signature**

```ts
export declare const coproductMapKind: <F extends TypeLambda>(
  F: Foldable<F>
) => <G extends TypeLambda>(
  G: Coproduct<G>
) => {
  <A, R, O, E, B>(f: (a: A) => Kind<G, R, O, E, B>): <FR, FO, FE>(self: Kind<F, FR, FO, FE, A>) => Kind<G, R, O, E, B>
  <FR, FO, FE, A, R, O, E, B>(self: Kind<F, FR, FO, FE, A>, f: (a: A) => Kind<G, R, O, E, B>): Kind<G, R, O, E, B>
}
```

Added in v1.0.0

## reduceComposition

Returns a default ternary `reduce` composition.

**Signature**

```ts
export declare const reduceComposition: <F extends TypeLambda, G extends TypeLambda>(
  F: Foldable<F>,
  G: Foldable<G>
) => <FR, FO, FE, GR, GO, GE, A, B>(self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>, b: B, f: (b: B, a: A) => B) => B
```

Added in v1.0.0

## reduceKind

**Signature**

```ts
export declare const reduceKind: <F extends TypeLambda>(
  F: Foldable<F>
) => <G extends TypeLambda>(
  G: Monad<G>
) => {
  <B, A, R, O, E>(b: B, f: (b: B, a: A) => Kind<G, R, O, E, B>): <FR, FO, FE>(
    self: Kind<F, FR, FO, FE, A>
  ) => Kind<G, R, O, E, B>
  <FR, FO, FE, A, B, R, O, E>(self: Kind<F, FR, FO, FE, A>, b: B, f: (b: B, a: A) => Kind<G, R, O, E, B>): Kind<
    G,
    R,
    O,
    E,
    B
  >
}
```

Added in v1.0.0

## toArray

**Signature**

```ts
export declare const toArray: <F extends TypeLambda>(F: Foldable<F>) => <R, O, E, A>(self: Kind<F, R, O, E, A>) => A[]
```

Added in v1.0.0

## toArrayMap

**Signature**

```ts
export declare const toArrayMap: <F extends TypeLambda>(
  F: Foldable<F>
) => {
  <A, B>(f: (a: A) => B): <R, O, E>(self: Kind<F, R, O, E, A>) => B[]
  <R, O, E, A, B>(self: Kind<F, R, O, E, A>, f: (a: A) => B): B[]
}
```

Added in v1.0.0
