---
title: typeclass/NonEmptyTraversable.ts
nav_order: 20
parent: Modules
---

## NonEmptyTraversable overview

NonEmptyTraversable<T> describes a parameterized type T<A> that contains one or more values of type `A`.

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [NonEmptyTraversable (interface)](#nonemptytraversable-interface)
- [utils](#utils)
  - [sequenceNonEmpty](#sequencenonempty)
  - [sequenceNonEmptyComposition](#sequencenonemptycomposition)
  - [traverseNonEmptyComposition](#traversenonemptycomposition)

---

# type class

## NonEmptyTraversable (interface)

**Signature**

```ts
export interface NonEmptyTraversable<T extends TypeLambda> extends TypeClass<T> {
  readonly traverseNonEmpty: <F extends TypeLambda>(
    F: SemiApplicative<F>
  ) => <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, B>
  ) => <TR, TO, TE>(self: Kind<T, TR, TO, TE, A>) => Kind<F, R, O, E, Kind<T, TR, TO, TE, B>>

  readonly sequenceNonEmpty: <F extends TypeLambda>(
    F: SemiApplicative<F>
  ) => <TR, TO, TE, R, O, E, A>(
    self: Kind<T, TR, TO, TE, Kind<F, R, O, E, A>>
  ) => Kind<F, R, O, E, Kind<T, TR, TO, TE, A>>
}
```

Added in v1.0.0

# utils

## sequenceNonEmpty

Returns a default `sequenceNonEmpty` implementation.

**Signature**

```ts
export declare const sequenceNonEmpty: <T extends TypeLambda>(
  traverseNonEmpty: <F>(
    F: SemiApplicative<F>
  ) => <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, B>
  ) => <TR, TO, TE>(self: Kind<T, TR, TO, TE, A>) => Kind<F, R, O, E, Kind<T, TR, TO, TE, B>>
) => <F>(
  F: SemiApplicative<F>
) => <TR, TO, TE, R, O, E, A>(
  self: Kind<T, TR, TO, TE, Kind<F, R, O, E, A>>
) => Kind<F, R, O, E, Kind<T, TR, TO, TE, A>>
```

Added in v1.0.0

## sequenceNonEmptyComposition

Returns a default `sequenceNonEmpty` composition.

**Signature**

```ts
export declare const sequenceNonEmptyComposition: <T extends TypeLambda, F extends TypeLambda>(
  T: NonEmptyTraversable<T> & Covariant<T>,
  G: NonEmptyTraversable<F>
) => <G extends TypeLambda>(
  F: SemiApplicative<G>
) => <TR, TO, TE, GR, GO, GE, R, O, E, A>(
  self: Kind<T, TR, TO, TE, Kind<F, GR, GO, GE, Kind<G, R, O, E, A>>>
) => Kind<G, R, O, E, Kind<T, TR, TO, TE, Kind<F, GR, GO, GE, A>>>
```

Added in v1.0.0

## traverseNonEmptyComposition

Returns a default `traverseNonEmpty` composition.

**Signature**

```ts
export declare const traverseNonEmptyComposition: <T extends TypeLambda, F extends TypeLambda>(
  T: NonEmptyTraversable<T>,
  G: NonEmptyTraversable<F>
) => <G extends TypeLambda>(
  F: SemiApplicative<G>
) => <A, R, O, E, B>(
  f: (a: A) => Kind<G, R, O, E, B>
) => <TR, TO, TE, GR, GO, GE>(
  self: Kind<T, TR, TO, TE, Kind<F, GR, GO, GE, A>>
) => Kind<G, R, O, E, Kind<T, TR, TO, TE, Kind<F, GR, GO, GE, B>>>
```

Added in v1.0.0
