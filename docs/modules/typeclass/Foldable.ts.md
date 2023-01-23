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
  - [foldMap](#foldmap)
  - [foldMapKind](#foldmapkind)
  - [reduceComposition](#reducecomposition)
  - [reduceKind](#reducekind)
  - [reduceRight](#reduceright)
  - [reduceRightKind](#reducerightkind)
  - [toArray](#toarray)
  - [toArrayWith](#toarraywith)

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
export declare const foldMap: <F extends any>(
  F: Foldable<F>
) => <M>(M: any) => <A>(f: (a: A) => M) => <R, O, E>(self: any) => M
```

Added in v1.0.0

## foldMapKind

**Signature**

```ts
export declare const foldMapKind: <F extends any>(
  F: Foldable<F>
) => <G extends any>(G: any) => <A, R, O, E, B>(f: (a: A) => any) => <FR, FO, FE>(self: any) => any
```

Added in v1.0.0

## reduceComposition

Returns a default `reduce` composition.

**Signature**

```ts
export declare const reduceComposition: <F extends any, G extends any>(
  F: Foldable<F>,
  G: Foldable<G>
) => <B, A>(b: B, f: (b: B, a: A) => B) => <FR, FO, FE, GR, GO, GE>(self: any) => B
```

Added in v1.0.0

## reduceKind

**Signature**

```ts
export declare const reduceKind: <F extends any>(
  F: Foldable<F>
) => <G extends any>(G: any) => <B, A, R, O, E>(b: B, f: (b: B, a: A) => any) => <FR, FO, FE>(self: any) => any
```

Added in v1.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <F extends any>(
  F: Foldable<F>
) => <A, B>(b: B, f: (b: B, a: A) => B) => <R, O, E>(self: any) => B
```

Added in v1.0.0

## reduceRightKind

**Signature**

```ts
export declare const reduceRightKind: <F extends any>(
  F: Foldable<F>
) => <G extends any>(G: any) => <B, A, R, O, E>(b: B, f: (b: B, a: A) => any) => <FR, FO, FE>(self: any) => any
```

Added in v1.0.0

## toArray

**Signature**

```ts
export declare const toArray: <F extends any>(F: Foldable<F>) => <R, O, E, A>(self: any) => A[]
```

Added in v1.0.0

## toArrayWith

**Signature**

```ts
export declare const toArrayWith: <F extends any>(
  F: Foldable<F>
) => <A, B>(f: (a: A) => B) => <R, O, E>(self: any) => B[]
```

Added in v1.0.0
