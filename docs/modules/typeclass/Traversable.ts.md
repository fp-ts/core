---
title: typeclass/Traversable.ts
nav_order: 43
parent: Modules
---

## Traversable overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type class](#type-class)
  - [Traversable (interface)](#traversable-interface)
- [utils](#utils)
  - [sequence](#sequence)
  - [traverseComposition](#traversecomposition)
  - [traverseTap](#traversetap)

---

# type class

## Traversable (interface)

**Signature**

```ts
export interface Traversable<T extends TypeLambda> extends TypeClass<T> {
  readonly traverse: <F extends TypeLambda>(
    F: Applicative<F>
  ) => {
    <A, R, O, E, B>(f: (a: A) => Kind<F, R, O, E, B>): <TR, TO, TE>(
      self: Kind<T, TR, TO, TE, A>
    ) => Kind<F, R, O, E, Kind<T, TR, TO, TE, B>>
    <TR, TO, TE, A, R, O, E, B>(self: Kind<T, TR, TO, TE, A>, f: (a: A) => Kind<F, R, O, E, B>): Kind<
      F,
      R,
      O,
      E,
      Kind<T, TR, TO, TE, B>
    >
  }
}
```

Added in v1.0.0

# utils

## sequence

Returns a default `sequence` implementation.

**Signature**

```ts
export declare const sequence: <T extends TypeLambda>(
  T: Traversable<T>
) => <F extends TypeLambda>(
  F: Applicative<F>
) => <TR, TO, TE, R, O, E, A>(
  self: Kind<T, TR, TO, TE, Kind<F, R, O, E, A>>
) => Kind<F, R, O, E, Kind<T, TR, TO, TE, A>>
```

Added in v1.0.0

## traverseComposition

Returns a default binary `traverse` composition.

**Signature**

```ts
export declare const traverseComposition: <T extends TypeLambda, G extends TypeLambda>(
  T: Traversable<T>,
  G: Traversable<G>
) => <F extends TypeLambda>(
  F: Applicative<F>
) => <TR, TO, TE, GR, GO, GE, A, R, O, E, B>(
  self: Kind<T, TR, TO, TE, Kind<G, GR, GO, GE, A>>,
  f: (a: A) => Kind<F, R, O, E, B>
) => Kind<F, R, O, E, Kind<T, TR, TO, TE, Kind<G, GR, GO, GE, B>>>
```

Added in v1.0.0

## traverseTap

Given a function which returns a `F` effect, thread this effect
through the running of this function on all the values in `T`,
returning an `T<A>` in a `F` context, ignoring the values
returned by the provided function.

**Signature**

```ts
export declare const traverseTap: <T extends TypeLambda>(
  T: Traversable<T>
) => <F extends TypeLambda>(
  F: Applicative<F>
) => {
  <A, R, O, E, B>(f: (a: A) => Kind<F, R, O, E, B>): <TR, TO, TE>(
    self: Kind<T, TR, TO, TE, A>
  ) => Kind<F, R, O, E, Kind<T, TR, TO, TE, A>>
  <TR, TO, TE, A, R, O, E, B>(self: Kind<T, TR, TO, TE, A>, f: (a: A) => Kind<F, R, O, E, B>): Kind<
    F,
    R,
    O,
    E,
    Kind<T, TR, TO, TE, A>
  >
}
```

Added in v1.0.0
