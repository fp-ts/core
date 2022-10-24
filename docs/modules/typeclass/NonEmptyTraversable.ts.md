---
title: typeclass/NonEmptyTraversable.ts
nav_order: 27
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
  - [nonEmptySequence](#nonemptysequence)
  - [nonEmptyTraverseComposition](#nonemptytraversecomposition)

---

# type class

## NonEmptyTraversable (interface)

**Signature**

```ts
export interface NonEmptyTraversable<T extends TypeLambda> extends TypeClass<T> {
  readonly nonEmptyTraverse: <F extends TypeLambda>(
    F: NonEmptyApplicative<F>
  ) => <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, B>
  ) => <TR, TO, TE>(self: Kind<T, TR, TO, TE, A>) => Kind<F, R, O, E, Kind<T, TR, TO, TE, B>>
}
```

Added in v1.0.0

# utils

## nonEmptySequence

**Signature**

```ts
export declare const nonEmptySequence: <T extends TypeLambda>(
  T: NonEmptyTraversable<T>
) => <F extends TypeLambda>(
  F: NonEmptyApplicative<F>
) => <TR, TO, TE, R, O, E, A>(
  self: Kind<T, TR, TO, TE, Kind<F, R, O, E, A>>
) => Kind<F, R, O, E, Kind<T, TR, TO, TE, A>>
```

Added in v1.0.0

## nonEmptyTraverseComposition

Returns a default `nonEmptyTraverse` composition.

**Signature**

```ts
export declare const nonEmptyTraverseComposition: <T extends TypeLambda, F extends TypeLambda>(
  T: NonEmptyTraversable<T>,
  G: NonEmptyTraversable<F>
) => <G extends TypeLambda>(
  F: NonEmptyApplicative<G>
) => <A, R, O, E, B>(
  f: (a: A) => Kind<G, R, O, E, B>
) => <TR, TO, TE, GR, GO, GE>(
  tfa: Kind<T, TR, TO, TE, Kind<F, GR, GO, GE, A>>
) => Kind<G, R, O, E, Kind<T, TR, TO, TE, Kind<F, GR, GO, GE, B>>>
```

Added in v1.0.0
