---
title: typeclass/SemiProduct.ts
nav_order: 42
parent: Modules
---

## SemiProduct overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [productMany](#productmany)
- [do notation](#do-notation)
  - [andThenBind](#andthenbind)
- [type class](#type-class)
  - [SemiProduct (interface)](#semiproduct-interface)
- [utils](#utils)
  - [appendElement](#appendelement)
  - [nonEmptyStruct](#nonemptystruct)
  - [nonEmptyTuple](#nonemptytuple)
  - [productComposition](#productcomposition)
  - [productManyComposition](#productmanycomposition)

---

# constructors

## productMany

Returns a default `productMany` implementation.

**Signature**

```ts
export declare const productMany: <F extends TypeLambda>(
  map: {
    <A, B>(f: (a: A) => B): <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>
    <R, O, E, A, B>(self: Kind<F, R, O, E, A>, f: (a: A) => B): Kind<F, R, O, E, B>
  },
  product: <R1, O1, E1, A, R2, O2, E2, B>(
    self: Kind<F, R1, O1, E1, A>,
    that: Kind<F, R2, O2, E2, B>
  ) => Kind<F, R1 & R2, O1 | O2, E1 | E2, [A, B]>
) => <R, O, E, A>(self: Kind<F, R, O, E, A>, collection: Iterable<Kind<F, R, O, E, A>>) => Kind<F, R, O, E, [A, ...A[]]>
```

Added in v1.0.0

# do notation

## andThenBind

**Signature**

```ts
export declare const andThenBind: <F extends TypeLambda>(
  F: SemiProduct<F>
) => {
  <N extends string, A extends object, R2, O2, E2, B>(name: Exclude<N, keyof A>, that: Kind<F, R2, O2, E2, B>): <
    R1,
    O1,
    E1
  >(
    self: Kind<F, R1, O1, E1, A>
  ) => Kind<F, R1 & R2, O2 | O1, E2 | E1, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
  <R1, O1, E1, A extends object, N extends string, R2, O2, E2, B>(
    self: Kind<F, R1, O1, E1, A>,
    name: Exclude<N, keyof A>,
    that: Kind<F, R2, O2, E2, B>
  ): Kind<F, R1 & R2, O1 | O2, E1 | E2, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
}
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

## appendElement

Appends an element to the end of a tuple.

**Signature**

```ts
export declare const appendElement: <F extends TypeLambda>(
  F: SemiProduct<F>
) => {
  <R2, O2, E2, B>(that: Kind<F, R2, O2, E2, B>): <R1, O1, E1, A extends readonly any[]>(
    self: Kind<F, R1, O1, E1, A>
  ) => Kind<F, R1 & R2, O2 | O1, E2 | E1, [...A, B]>
  <R1, O1, E1, A extends readonly any[], R2, O2, E2, B>(
    self: Kind<F, R1, O1, E1, A>,
    that: Kind<F, R2, O2, E2, B>
  ): Kind<F, R1 & R2, O1 | O2, E1 | E2, [...A, B]>
}
```

Added in v1.0.0

## nonEmptyStruct

**Signature**

```ts
export declare const nonEmptyStruct: <F extends TypeLambda>(
  F: SemiProduct<F>
) => <R extends { readonly [x: string]: Kind<F, any, any, any, any> }>(
  fields: EnforceNonEmptyRecord<R> & { readonly [x: string]: Kind<F, any, any, any, any> }
) => Kind<
  F,
  [R[keyof R]] extends [Kind<F, infer R, any, any, any>] ? R : never,
  [R[keyof R]] extends [Kind<F, any, infer O, any, any>] ? O : never,
  [R[keyof R]] extends [Kind<F, any, any, infer E, any>] ? E : never,
  { [K in keyof R]: [R[K]] extends [Kind<F, any, any, any, infer A>] ? A : never }
>
```

Added in v1.0.0

## nonEmptyTuple

**Signature**

```ts
export declare const nonEmptyTuple: <F extends TypeLambda>(
  F: SemiProduct<F>
) => <T extends readonly [Kind<F, any, any, any, any>, ...Kind<F, any, any, any, any>[]]>(
  ...elements: T
) => Kind<
  F,
  [T[number]] extends [Kind<F, infer R, any, any, any>] ? R : never,
  [T[number]] extends [Kind<F, any, infer O, any, any>] ? O : never,
  [T[number]] extends [Kind<F, any, any, infer E, any>] ? E : never,
  { [I in keyof T]: [T[I]] extends [Kind<F, any, any, any, infer A>] ? A : never }
>
```

Added in v1.0.0

## productComposition

Returns a default `product` composition.

**Signature**

```ts
export declare const productComposition: <F extends TypeLambda, G extends TypeLambda>(
  F: SemiApplicative<F>,
  G: SemiProduct<G>
) => <FR1, FO1, FE1, GR1, GO1, GE1, A, FR2, FO2, FE2, GR2, GO2, GE2, B>(
  self: Kind<F, FR1, FO1, FE1, Kind<G, GR1, GO1, GE1, A>>,
  that: Kind<F, FR2, FO2, FE2, Kind<G, GR2, GO2, GE2, B>>
) => Kind<F, FR1 & FR2, FO1 | FO2, FE1 | FE2, Kind<G, GR1 & GR2, GO1 | GO2, GE1 | GE2, [A, B]>>
```

Added in v1.0.0

## productManyComposition

Returns a default `productMany` composition.

**Signature**

```ts
export declare const productManyComposition: <F extends TypeLambda, G extends TypeLambda>(
  F: SemiApplicative<F>,
  G: SemiProduct<G>
) => <FR, FO, FE, GR, GO, GE, A>(
  self: Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>,
  collection: Iterable<Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, A>>>
) => Kind<F, FR, FO, FE, Kind<G, GR, GO, GE, [A, ...A[]]>>
```

Added in v1.0.0
