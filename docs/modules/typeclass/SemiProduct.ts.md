---
title: typeclass/SemiProduct.ts
nav_order: 43
parent: Modules
---

## SemiProduct overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [productMany](#productmany)
- [type class](#type-class)
  - [SemiProduct (interface)](#semiproduct-interface)
- [utils](#utils)
  - [andThenBind](#andthenbind)
  - [element](#element)
  - [nonEmptyStruct](#nonemptystruct)
  - [nonEmptyTuple](#nonemptytuple)
  - [productComposition](#productcomposition)
  - [productManyComposition](#productmanycomposition)

---

# constructors

## productMany

Returns a default `productMany` implementation (useful for tests).

**Signature**

```ts
export declare const productMany: <F extends any>(
  Covariant: any,
  product: <R1, O1, E1, A, R2, O2, E2, B>(self: any, that: any) => any
) => <R, O, E, A>(self: any, collection: Iterable<any>) => any
```

Added in v1.0.0

# type class

## SemiProduct (interface)

**Signature**

```ts
export interface SemiProduct<F extends TypeLambda> extends Invariant<F> {
  readonly product: <R1, O1, E1, A, R2, O2, E2, B>(
    self: Kind<F, R1, O1, E1, A>,
    that: Kind<F, R2, O2, E2, B>
  ) => Kind<F, R1 & R2, O1 | O2, E1 | E2, [A, B]>

  readonly productMany: <R, O, E, A>(
    self: Kind<F, R, O, E, A>,
    collection: Iterable<Kind<F, R, O, E, A>>
  ) => Kind<F, R, O, E, [A, ...Array<A>]>
}
```

Added in v1.0.0

# utils

## andThenBind

**Signature**

```ts
export declare const andThenBind: <F extends any>(
  F: SemiProduct<F>
) => <N extends string, A extends object, R2, O2, E2, B>(
  name: Exclude<N, keyof A>,
  that: any
) => <R1, O1, E1>(self: any) => any
```

Added in v1.0.0

## element

Adds an element to the end of a tuple.

**Signature**

```ts
export declare const element: <F extends any>(
  F: SemiProduct<F>
) => <R2, O2, E2, B>(that: any) => <R1, O1, E1, A extends readonly any[]>(self: any) => any
```

Added in v1.0.0

## nonEmptyStruct

**Signature**

```ts
export declare const nonEmptyStruct: <F extends any>(
  F: SemiProduct<F>
) => <R extends { readonly [x: string]: any }>(fields: EnforceNonEmptyRecord<R> & { readonly [x: string]: any }) => any
```

Added in v1.0.0

## nonEmptyTuple

**Signature**

```ts
export declare const nonEmptyTuple: <F extends any>(
  F: SemiProduct<F>
) => <T extends readonly [any, ...any[]]>(...components: T) => any
```

Added in v1.0.0

## productComposition

Returns a default `product` composition.

**Signature**

```ts
export declare const productComposition: <F extends any, G extends any>(
  F: any,
  G: SemiProduct<G>
) => <FR1, FO1, FE1, GR1, GO1, GE1, A, FR2, FO2, FE2, GR2, GO2, GE2, B>(self: any, that: any) => any
```

Added in v1.0.0

## productManyComposition

Returns a default `productMany` composition.

**Signature**

```ts
export declare const productManyComposition: <F extends any, G extends any>(
  F: any,
  G: SemiProduct<G>
) => <FR, FO, FE, GR, GO, GE, A>(self: any, collection: Iterable<any>) => any
```

Added in v1.0.0
