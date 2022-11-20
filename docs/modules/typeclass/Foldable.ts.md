---
title: typeclass/Foldable.ts
nav_order: 16
parent: Modules
---

## Foldable overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Foldable (interface)](#foldable-interface)
- [utils](#utils)
  - [foldMap](#foldmap)
  - [foldMapKind](#foldmapkind)
  - [reduceComposition](#reducecomposition)
  - [reduceKind](#reducekind)
  - [reduceRight](#reduceright)
  - [reduceRightKind](#reducerightkind)
  - [toReadonlyArray](#toreadonlyarray)
  - [toReadonlyArrayWith](#toreadonlyarraywith)

---

# type class

## Foldable (interface)

**Signature**

```ts
export interface Foldable<F extends TypeLambda> extends TypeClass<F> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <R, O, E>(self: Kind<F, R, O, E, A>) => B
}
```

Added in v1.0.0

# utils

## foldMap

**Signature**

```ts
export declare const foldMap: <F extends TypeLambda>(
  F: Foldable<F>
) => <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <R, O, E>(self: Kind<F, R, O, E, A>) => M
```

Added in v1.0.0

## foldMapKind

**Signature**

```ts
export declare const foldMapKind: <F extends TypeLambda>(
  F: Foldable<F>
) => <G extends TypeLambda>(
  G: Coproduct<G>
) => <A, R, O, E, B>(
  f: (a: A) => Kind<G, R, O, E, B>
) => <FR, FO, FE>(self: Kind<F, FR, FO, FE, A>) => Kind<G, R, O, E, B>
```

Added in v1.0.0

## reduceComposition

Returns a default `reduce` composition.

**Signature**

```ts
export declare const reduceComposition: <F extends TypeLambda, G extends TypeLambda>(
  F: Foldable<F>,
  G: Foldable<G>
) => <B, A>(
  b: B,
  f: (b: B, a: A) => B
) => <FR, FO, FE, GR, GO, GE>(self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>) => B
```

Added in v1.0.0

## reduceKind

**Signature**

```ts
export declare const reduceKind: <F extends TypeLambda>(
  F: Foldable<F>
) => <G extends TypeLambda>(
  G: Monad<G>
) => <B, A, R, O, E>(
  b: B,
  f: (b: B, a: A) => Kind<G, R, O, E, B>
) => <FR, FO, FE>(self: Kind<F, FR, FO, FE, A>) => Kind<G, R, O, E, B>
```

Added in v1.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <F extends TypeLambda>(
  F: Foldable<F>
) => <A, B>(b: B, f: (b: B, a: A) => B) => <R, O, E>(self: Kind<F, R, O, E, A>) => B
```

Added in v1.0.0

## reduceRightKind

**Signature**

```ts
export declare const reduceRightKind: <F extends TypeLambda>(
  F: Foldable<F>
) => <G extends TypeLambda>(
  G: Monad<G>
) => <B, A, R, O, E>(
  b: B,
  f: (b: B, a: A) => Kind<G, R, O, E, B>
) => <FR, FO, FE>(self: Kind<F, FR, FO, FE, A>) => Kind<G, R, O, E, B>
```

Added in v1.0.0

## toReadonlyArray

**Signature**

```ts
export declare const toReadonlyArray: <F extends TypeLambda>(
  F: Foldable<F>
) => <R, O, E, A>(self: Kind<F, R, O, E, A>) => readonly A[]
```

Added in v1.0.0

## toReadonlyArrayWith

**Signature**

```ts
export declare const toReadonlyArrayWith: <F extends TypeLambda>(
  F: Foldable<F>
) => <A, B>(f: (a: A) => B) => <R, O, E>(self: Kind<F, R, O, E, A>) => readonly B[]
```

Added in v1.0.0
