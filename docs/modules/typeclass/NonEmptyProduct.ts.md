---
title: typeclass/NonEmptyProduct.ts
nav_order: 26
parent: Modules
---

## NonEmptyProduct overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [productMany](#productmany)
- [type class](#type-class)
  - [NonEmptyProduct (interface)](#nonemptyproduct-interface)
- [utils](#utils)
  - [bindKind](#bindkind)
  - [productComposition](#productcomposition)
  - [productFlatten](#productflatten)
  - [productManyComposition](#productmanycomposition)
  - [struct](#struct)
  - [tuple](#tuple)

---

# constructors

## productMany

Returns a default `productMany` implementation (useful for tests).

**Signature**

```ts
export declare const productMany: <F extends TypeLambda>(
  Covariant: Covariant<F>,
  product: <R2, O2, E2, B>(
    that: Kind<F, R2, O2, E2, B>
  ) => <R1, O1, E1, A>(self: Kind<F, R1, O1, E1, A>) => Kind<F, R1 & R2, O2 | O1, E2 | E1, readonly [A, B]>
) => <R, O, E, A>(
  collection: Iterable<Kind<F, R, O, E, A>>
) => (self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, readonly [A, ...A[]]>
```

Added in v1.0.0

# type class

## NonEmptyProduct (interface)

**Signature**

```ts
export interface NonEmptyProduct<F extends TypeLambda> extends Invariant<F> {
  readonly product: <R2, O2, E2, B>(
    that: Kind<F, R2, O2, E2, B>
  ) => <R1, O1, E1, A>(self: Kind<F, R1, O1, E1, A>) => Kind<F, R1 & R2, O1 | O2, E1 | E2, readonly [A, B]>

  readonly productMany: <R, O, E, A>(
    collection: Iterable<Kind<F, R, O, E, A>>
  ) => (self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, readonly [A, ...ReadonlyArray<A>]>
}
```

Added in v1.0.0

# utils

## bindKind

**Signature**

```ts
export declare const bindKind: <F extends TypeLambda>(
  F: NonEmptyProduct<F>
) => <N extends string, A extends object, R2, O2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: Kind<F, R2, O2, E2, B>
) => <R1, O1, E1>(
  self: Kind<F, R1, O1, E1, A>
) => Kind<F, R1 & R2, O2 | O1, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v1.0.0

## productComposition

Returns a default `product` composition.

**Signature**

```ts
export declare const productComposition: <F extends TypeLambda, G extends TypeLambda>(
  F: NonEmptyApplicative<F>,
  G: NonEmptyProduct<G>
) => <FR2, FO2, FE2, GR2, GO2, GE2, B>(
  that: Kind<F, FR2, FO2, FE2, Kind<G, GR2, GO2, GE2, B>>
) => <FR1, FO1, FE1, GR1, GO1, GE1, A>(
  self: Kind<F, FR1, FO1, FE1, Kind<G, GR1, GO1, GE1, A>>
) => Kind<F, FR1 & FR2, FO2 | FO1, FE2 | FE1, Kind<G, GR1 & GR2, GO2 | GO1, GE2 | GE1, readonly [A, B]>>
```

Added in v1.0.0

## productFlatten

**Signature**

```ts
export declare const productFlatten: <F extends TypeLambda>(
  F: NonEmptyProduct<F>
) => <R2, O2, E2, B>(
  that: Kind<F, R2, O2, E2, B>
) => <R1, O1, E1, A extends readonly any[]>(
  self: Kind<F, R1, O1, E1, A>
) => Kind<F, R1 & R2, O2 | O1, E2 | E1, readonly [...A, B]>
```

Added in v1.0.0

## productManyComposition

Returns a default `productMany` composition.

**Signature**

```ts
export declare const productManyComposition: <F extends TypeLambda, G extends TypeLambda>(
  F: NonEmptyApplicative<F>,
  G: NonEmptyProduct<G>
) => <FR, FO, FE, GR, GO, GE, A>(
  collection: Iterable<Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>>
) => (
  self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>
) => Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, readonly [A, ...A[]]>>
```

Added in v1.0.0

## struct

**Signature**

```ts
export declare const struct: <F extends TypeLambda>(
  F: NonEmptyProduct<F>
) => <R extends Record<string, Kind<F, any, any, any, any>>>(
  r: EnforceNonEmptyRecord<R> & Record<string, Kind<F, any, any, any, any>>
) => Kind<
  F,
  [R[keyof R]] extends [Kind<F, infer R, any, any, any>] ? R : never,
  [R[keyof R]] extends [Kind<F, any, infer O, any, any>] ? O : never,
  [R[keyof R]] extends [Kind<F, any, any, infer E, any>] ? E : never,
  { readonly [K in keyof R]: [R[K]] extends [Kind<F, any, any, any, infer A>] ? A : never }
>
```

Added in v1.0.0

## tuple

**Signature**

```ts
export declare const tuple: <F extends TypeLambda>(
  F: NonEmptyProduct<F>
) => <T extends [Kind<F, any, any, any, any>, ...Kind<F, any, any, any, any>[]]>(
  ...tuple: T
) => Kind<
  F,
  [T[number]] extends [Kind<F, infer R, any, any, any>] ? R : never,
  [T[number]] extends [Kind<F, any, infer O, any, any>] ? O : never,
  [T[number]] extends [Kind<F, any, any, infer E, any>] ? E : never,
  Readonly<{ [I in keyof T]: [T[I]] extends [Kind<F, any, any, any, infer A>] ? A : never }>
>
```

Added in v1.0.0
